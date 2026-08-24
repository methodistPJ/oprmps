const CONFIG = {
  spreadsheetId: '11tnkDyYjkUsY7e388MJQ-hw-3MynBD0fkxdPAYPxLHc',
  responseSheet: 'RESPONDOPR',
  officerSheet: 'PEGAWAI',
  imageRootId: '17TOx9gmvcfkRfWa68xSv3jzp3LWwBoH-',
  pdfFolders: {
    'Pentadbiran': '1EcohzMJuDGD75ltR9--yd9cN9l5U_KhP',
    'Kurikulum': '1-XwwFjkBr8FDwuG8VtyQZFvvUo6wTiYV',
    'Hal Ehwal Murid': '106p3fbJ35Yv0q6poWWd2N9Leg4LYYQil',
    'Kokurikulum': '1t8ewL_qSGNxC_iwaYLYspUgeHsmq0lwR'
  }
};

const NEEDED = [
  'Timestamp', 'Bidang', 'Tajuk Program', 'Tarikh Pelaksanaan', 'Masa',
  'Penglibatan', 'Pelibatan', 'Objektif Program', 'Kekuatan', 'Penambahbaikan',
  'Gambar 1', 'Kapsyen Gambar 1', 'Gambar 2', 'Kapsyen Gambar 2',
  'Gambar 3', 'Kapsyen Gambar 3', 'Gambar 4', 'Kapsyen Gambar 4',
  'Lokasi', 'Senarai AJK', 'Sumber Kewangan', 'Output Program',
  'Perincian Program', 'Kekangan Program', 'Nama Pegawai Pelapor',
  'Jawatan Pegawai', 'Tarikh Laporan', 'Pautan PDF', 'Jenis OPR',
  'Hero Fokus X', 'Hero Fokus Y'
];

function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : '';
    if (action === 'getInitialData') {
      return out({ status: 'success', records: records(), officers: officers() });
    }
    if (action === 'getRecord') {
      const record = recordByRow(Number(e.parameter.rowId));
      return out({ status: 'success', record: record, photos: imageData(record.imageUrls) });
    }
    return out({ status: 'success', message: 'OPR MPS aktif' });
  } catch (error) {
    return out({ status: 'error', message: error.message });
  }
}

function doPost(e) {
  let lock;
  try {
    const payload = JSON.parse(e.postData.contents);
    lock = LockService.getScriptLock();
    if (!lock.tryLock(30000)) throw new Error('Sistem sedang menyimpan laporan lain. Sila cuba sebentar lagi.');
    return out(save(payload));
  } catch (error) {
    return out({ status: 'error', message: error.message });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function responseSheet() {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(CONFIG.responseSheet);
  if (!sheet) throw new Error('Tab RESPONDOPR tidak ditemui.');
  let headers = headersOf(sheet);
  const legacy = headers.indexOf('Sasaran');
  if (legacy >= 0) {
    sheet.getRange(1, legacy + 1).setValue('Penglibatan');
    headers[legacy] = 'Penglibatan';
  }
  NEEDED.forEach(function (name) {
    if (!headers.includes(name)) {
      sheet.getRange(1, headers.length + 1).setValue(name);
      headers.push(name);
    }
  });
  return sheet;
}

function headersOf(sheet) {
  return sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0].map(String);
}

function records() {
  const sheet = responseSheet();
  const headers = headersOf(sheet);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues()
    .map(function (row, index) { return readRecord(row, headers, index + 2); })
    .reverse();
}

function recordByRow(rowId) {
  const sheet = responseSheet();
  if (!rowId || rowId < 2 || rowId > sheet.getLastRow()) throw new Error('Rekod OPR tidak ditemui.');
  const headers = headersOf(sheet);
  return readRecord(sheet.getRange(rowId, 1, 1, headers.length).getValues()[0], headers, rowId);
}

function readRecord(row, headers, rowId) {
  const value = function (name) { return row[headers.indexOf(name)] || ''; };
  return {
    rowId: rowId,
    timestamp: value('Timestamp'),
    bidang: value('Bidang'),
    jenisOpr: value('Jenis OPR') || 'umum',
    tajukProgram: value('Tajuk Program'),
    tarikhPelaksanaan: value('Tarikh Pelaksanaan'),
    masa: value('Masa'),
    penglibatan: value('Penglibatan'),
    pelibatan: value('Pelibatan'),
    objektif: value('Objektif Program'),
    kekuatan: value('Kekuatan'),
    penambahbaikan: value('Penambahbaikan'),
    lokasi: value('Lokasi'),
    senaraiAjk: value('Senarai AJK'),
    sumberKewangan: value('Sumber Kewangan'),
    outputProgram: value('Output Program'),
    perincianProgram: value('Perincian Program'),
    kekanganProgram: value('Kekangan Program'),
    namaPegawai: value('Nama Pegawai Pelapor'),
    jawatanPegawai: value('Jawatan Pegawai'),
    tarikhLaporan: value('Tarikh Laporan'),
    pdfUrl: value('Pautan PDF'),
    heroPosition: { x: value('Hero Fokus X') === '' ? 50 : value('Hero Fokus X'), y: value('Hero Fokus Y') === '' ? 50 : value('Hero Fokus Y') },
    imageUrls: ['Gambar 1', 'Gambar 2', 'Gambar 3', 'Gambar 4'].map(value)
  };
}

function officers() {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(CONFIG.officerSheet);
  if (!sheet) throw new Error('Tab PEGAWAI tidak ditemui.');
  const headers = headersOf(sheet);
  const name = headers.indexOf('NAMA');
  const title = headers.indexOf('JAWATAN');
  if (name < 0 || title < 0) throw new Error('Header NAMA atau JAWATAN dalam tab PEGAWAI tidak ditemui.');
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues()
    .map(function (row) { return { nama: row[name], jawatan: row[title] }; })
    .filter(function (item) { return item.nama; });
}

function save(payload) {
  const data = payload.record || {};
  if (!data.bidang || !CONFIG.pdfFolders[data.bidang] || !data.tajukProgram || !data.namaPegawai) {
    throw new Error('Maklumat OPR belum lengkap.');
  }

  const sheet = responseSheet();
  const headers = headersOf(sheet);
  const requestedRow = Number(data.rowId) || 0;
  const target = requestedRow > 1 && requestedRow <= sheet.getLastRow() ? requestedRow : sheet.getLastRow() + 1;
  const old = target <= sheet.getLastRow() ? recordByRow(target) : null;
  const imageFolder = reportFolder(data.bidang, target, data.tajukProgram);
  const photos = payload.photos || {};
  const removedPhotos = (payload.removedPhotos || []).map(Number);
  const oldImages = old ? old.imageUrls : ['', '', '', ''];
  const images = [1, 2, 3, 4].map(function (index) {
    if (removedPhotos.includes(index)) {
      trashFile(oldImages[index - 1]);
      return '';
    }
    return photos[index] ? replaceImage(photos[index], imageFolder, oldImages[index - 1], index) : oldImages[index - 1];
  });
  const pdfUrl = payload.pdfBase64
    ? replacePdf(payload.pdfBase64, data.bidang, clean(data.tajukProgram) + '.pdf', old && old.pdfUrl)
    : (old ? old.pdfUrl : '');

  const map = {
    'Timestamp': old ? old.timestamp : new Date(),
    'Bidang': data.bidang,
    'Jenis OPR': data.jenisOpr || 'umum',
    'Tajuk Program': data.tajukProgram,
    'Tarikh Pelaksanaan': data.tarikhPelaksanaan,
    'Masa': data.masa,
    'Penglibatan': data.penglibatan,
    'Pelibatan': data.pelibatan,
    'Objektif Program': data.objektif,
    'Kekuatan': data.kekuatan,
    'Penambahbaikan': data.penambahbaikan,
    'Lokasi': data.lokasi,
    'Senarai AJK': data.senaraiAjk,
    'Sumber Kewangan': data.sumberKewangan,
    'Output Program': data.outputProgram,
    'Perincian Program': data.perincianProgram,
    'Kekangan Program': data.kekanganProgram,
    'Nama Pegawai Pelapor': data.namaPegawai,
    'Jawatan Pegawai': data.jawatanPegawai,
    'Tarikh Laporan': data.tarikhLaporan,
    'Pautan PDF': pdfUrl,
    'Gambar 1': images[0], 'Gambar 2': images[1],
    'Gambar 3': images[2], 'Gambar 4': images[3],
    'Hero Fokus X': data.heroPosition && data.heroPosition.x !== undefined ? data.heroPosition.x : 50,
    'Hero Fokus Y': data.heroPosition && data.heroPosition.y !== undefined ? data.heroPosition.y : 50
  };
  sheet.getRange(target, 1, 1, headers.length).setValues([headers.map(function (header) {
    return Object.prototype.hasOwnProperty.call(map, header) ? map[header] : (old ? valueOf(old, header) : '');
  })]);
  return { status: 'success', rowId: target, pdfUrl: pdfUrl };
}

function valueOf(record, header) {
  const reverse = {
    'Timestamp': 'timestamp', 'Bidang': 'bidang', 'Jenis OPR': 'jenisOpr',
    'Tajuk Program': 'tajukProgram', 'Tarikh Pelaksanaan': 'tarikhPelaksanaan', 'Masa': 'masa',
    'Penglibatan': 'penglibatan', 'Pelibatan': 'pelibatan', 'Objektif Program': 'objektif',
    'Kekuatan': 'kekuatan', 'Penambahbaikan': 'penambahbaikan', 'Lokasi': 'lokasi',
    'Senarai AJK': 'senaraiAjk', 'Sumber Kewangan': 'sumberKewangan', 'Output Program': 'outputProgram',
    'Perincian Program': 'perincianProgram', 'Kekangan Program': 'kekanganProgram',
    'Nama Pegawai Pelapor': 'namaPegawai', 'Jawatan Pegawai': 'jawatanPegawai',
    'Tarikh Laporan': 'tarikhLaporan', 'Pautan PDF': 'pdfUrl'
  };
  return reverse[header] ? record[reverse[header]] : '';
}

function reportFolder(field, rowId, title) {
  const root = DriveApp.getFolderById(CONFIG.imageRootId);
  const fieldFolder = findOrCreateFolder(root, clean(field));
  return findOrCreateFolder(fieldFolder, rowId + '_' + clean(title));
}

function findOrCreateFolder(parent, name) {
  const matches = parent.getFoldersByName(name);
  return matches.hasNext() ? matches.next() : parent.createFolder(name);
}

function replaceImage(dataUrl, folder, previousUrl, index) {
  trashFile(previousUrl);
  return folder.createFile(dataBlob(dataUrl, 'gambar-' + index + '.jpg')).getUrl();
}

function replacePdf(dataUrl, field, name, previousUrl) {
  trashFile(previousUrl);
  return DriveApp.getFolderById(CONFIG.pdfFolders[field]).createFile(dataBlob(dataUrl, name)).getUrl();
}

function trashFile(url) {
  const id = fileId(url);
  if (!id) return;
  try { DriveApp.getFileById(id).setTrashed(true); } catch (ignore) {}
}

function imageData(urls) {
  return (urls || []).map(function (url) {
    const id = fileId(url);
    if (!id) return '';
    try {
      const blob = DriveApp.getFileById(id).getBlob();
      return 'data:' + (blob.getContentType() || 'image/jpeg') + ';base64,' + Utilities.base64Encode(blob.getBytes());
    } catch (ignore) {
      return '';
    }
  });
}

function fileId(url) {
  const match = String(url || '').match(/[?&]id=([^&]+)/) || String(url || '').match(/\/d\/([^/]+)/);
  return match ? match[1] : '';
}

function dataBlob(dataUrl, name) {
  const parts = String(dataUrl).split(',');
  const type = (parts[0].match(/data:(.*?);base64/) || [, 'image/jpeg'])[1];
  return Utilities.newBlob(Utilities.base64Decode(parts[1]), type, name);
}

function clean(value) {
  return String(value || 'OPR').replace(/[\\/:*?"<>|]/g, '').slice(0, 80);
}

function out(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
