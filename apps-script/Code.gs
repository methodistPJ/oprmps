/** SK Methodist PJ — OPR Command Centre
 * Deploy as Web app: Execute as Me; access: anyone in the school who needs it.
 */
const CONFIG = {
  spreadsheetId: '11tnkDyYjkUsY7e388MJQ-hw-3MynBD0fkxdPAYPxLHc',
  responseSheet: 'OPR_RECORDS',
  officerSheet: 'MASTER_PEGAWAI',
  imageRootId: '17TOx9gmvcfkRfWa68xSv3jzp3LWwBoH-',
  pdfFolders: {
    'Pentadbiran': '1EcohzMJuDGD75ltR9--yd9cN9l5U_KhP',
    'Kurikulum': '1-XwwFjkBr8FDwuG8VtyQZFvvUo6wTiYV',
    'Hal Ehwal Murid': '106p3fbJ35Yv0q6poWWd2N9Leg4LYYQil',
    'Kokurikulum': '1t8ewL_qSGNxC_iwaYLYspUgeHsmq0lwR'
  }
};
const HEADERS = ['opr_id','timestamp','updated_at','bidang','jenis_opr','tajuk_program','tarikh_pelaksanaan','penglibatan','lokasi','nama_pegawai','jawatan_pegawai','tarikh_laporan','pdf_url','image_folder_url','record_json'];

function doGet(e) {
  try {
    const action = String(e?.parameter?.action || '');
    if (action === 'getInitialData') return json({status:'success', records:getRecords(), officers:getOfficers()});
    if (action === 'getRecord') return json({status:'success', record:getRecord(String(e.parameter.oprId || ''))});
    return json({status:'success', message:'OPR Command Centre SK Methodist PJ aktif'});
  } catch (error) { return json({status:'error', message:error.message || String(error)}); }
}

function doPost(e) {
  let lock;
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.action !== 'saveRecord') throw new Error('Tindakan tidak sah.');
    lock = LockService.getScriptLock();
    if (!lock.tryLock(30000)) throw new Error('Sistem sedang menerima laporan lain. Sila cuba sekali lagi.');
    return json(saveRecord(body));
  } catch (error) { return json({status:'error', message:error.message || String(error)}); }
  finally { if (lock && lock.hasLock()) lock.releaseLock(); }
}

function saveRecord(payload) {
  const record = payload.record || {};
  validateRecord(record);
  const sheet = getResponseSheet();
  const now = new Date().toISOString();
  const id = record.oprId || makeId();
  const imageFolder = getProgramImageFolder(record.bidang, id, record.tajukProgram);
  const images = saveImages(payload.photos || {}, imageFolder, id);
  const pdf = savePdf(payload.pdfBase64, record.bidang, id, record.tajukProgram);
  const stored = Object.assign({}, record, {oprId:id, timestamp:record.timestamp || now, updatedAt:now, imageUrls:images, pdfUrl:pdf ? pdf.getUrl() : '', imageFolderUrl:imageFolder.getUrl()});
  const row = [id, stored.timestamp, now, record.bidang, record.jenisOpr, record.tajukProgram, record.tarikhPelaksanaan, record.penglibatan, record.lokasi, record.namaPegawai, record.jawatanPegawai, record.tarikhLaporan, stored.pdfUrl, stored.imageFolderUrl, JSON.stringify(stored)];
  const rowNo = findRow(sheet, id);
  rowNo ? sheet.getRange(rowNo, 1, 1, HEADERS.length).setValues([row]) : sheet.appendRow(row);
  CacheService.getScriptCache().remove('opr-records');
  return {status:'success', oprId:id, pdfUrl:stored.pdfUrl, imageFolderUrl:stored.imageFolderUrl};
}

function validateRecord(record) {
  ['bidang','jenisOpr','tajukProgram','tarikhPelaksanaan','penglibatan','lokasi','namaPegawai','jawatanPegawai','tarikhLaporan'].forEach(key => {
    if (!String(record[key] || '').trim()) throw new Error(`Medan ${key} diperlukan.`);
  });
  if (!CONFIG.pdfFolders[record.bidang]) throw new Error('Bidang tidak sah.');
}

function getResponseSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  let sh = ss.getSheetByName(CONFIG.responseSheet);
  if (!sh) { sh = ss.insertSheet(CONFIG.responseSheet); sh.getRange(1,1,1,HEADERS.length).setValues([HEADERS]); sh.setFrozenRows(1); }
  return sh;
}

function getRecords() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('opr-records');
  if (cached) return JSON.parse(cached);
  const sh = getResponseSheet();
  if (sh.getLastRow() < 2) return [];
  const records = sh.getRange(2, 1, sh.getLastRow()-1, HEADERS.length).getValues().map(row => {
    try { return JSON.parse(row[14]); } catch (_) { return {oprId:row[0], timestamp:row[1], bidang:row[3], jenisOpr:row[4], tajukProgram:row[5], tarikhPelaksanaan:row[6], penglibatan:row[7], lokasi:row[8], namaPegawai:row[9], jawatanPegawai:row[10], tarikhLaporan:row[11], pdfUrl:row[12]}; }
  }).sort((a,b) => String(b.timestamp).localeCompare(String(a.timestamp)));
  cache.put('opr-records', JSON.stringify(records), 300);
  return records;
}

function getRecord(id) { return getRecords().find(x => x.oprId === id) || null; }
function getOfficers() {
  const sh = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(CONFIG.officerSheet);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2,1,sh.getLastRow()-1,Math.min(3,sh.getLastColumn())).getValues().map(r=>({nama:r[0],jawatan:r[1],bidang:r[2]}));
}

function getProgramImageFolder(field, id, title) {
  const root = DriveApp.getFolderById(CONFIG.imageRootId);
  const fieldFolder = getOrCreateFolder(root, safeName(field));
  return getOrCreateFolder(fieldFolder, `${id}_${safeName(title)}`);
}
function getOrCreateFolder(parent, name) { const found = parent.getFoldersByName(name); return found.hasNext() ? found.next() : parent.createFolder(name); }
function saveImages(photos, folder, id) {
  return Object.keys(photos).sort().map(key => {
    if (!photos[key]) return null;
    const blob = dataUrlBlob(photos[key], `${id}_gambar-${key}.jpg`);
    return folder.createFile(blob).getUrl();
  }).filter(Boolean);
}
function savePdf(base64, field, id, title) {
  if (!base64) return null;
  return DriveApp.getFolderById(CONFIG.pdfFolders[field]).createFile(dataUrlBlob(base64, `${id}_${safeName(title)}.pdf`));
}
function dataUrlBlob(dataUrl, name) { const parts = String(dataUrl).split(','); if (parts.length !== 2) throw new Error('Fail tidak sah.'); const mime = (parts[0].match(/data:(.*?);base64/) || [,'application/octet-stream'])[1]; return Utilities.newBlob(Utilities.base64Decode(parts[1]), mime, name); }
function findRow(sheet, id) { if (sheet.getLastRow()<2) return 0; const values=sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues().flat(); const index=values.indexOf(id); return index<0?0:index+2; }
function makeId() { return `OPR-${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy')}-${Utilities.getUuid().slice(0,8).toUpperCase()}`; }
function safeName(value) { return String(value || 'Tanpa Tajuk').replace(/[\\/:*?"<>|]/g,'').replace(/\s+/g,' ').trim().slice(0,90); }
function json(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
