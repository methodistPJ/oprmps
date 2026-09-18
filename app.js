const GAS_URL = "https://script.google.com/macros/s/AKfycbyhPN_YBVpTp_fKne4BAlxIkyBA9wtT3QjIFkAsi-ZxX6m69IkUlw3KeRgzfG-xy6-vbQ/exec";
const JATA_URL = "https://i.ibb.co/fYY58Rh2/JATA-NEGARA-PNG.png";
// Shared frame contract for selection, preview and native PDF (millimetres).
const PHOTO_FRAMES = Object.freeze({
  hero: { width: 197, height: 82, outputWidth: 1576, outputHeight: 656 },
  gallery: { width: 188 / 3, height: 30, outputWidth: 1128, outputHeight: 540 }
});

const FORM_TYPES = {
  umum: {
    title: "OPR Umum",
    description: "Laporan program lengkap dengan objektif, kekuatan dan penambahbaikan.",
    fields: [
      field("tajukProgram", "Tajuk Program / Aktiviti", "text", true, "Cth: PROGRAM KECEMERLANGAN MURID", "wide"),
      field("tarikhPelaksanaan", "Tarikh Pelaksanaan", "text", true, "Cth: 11 OGOS 2026"),
      field("masa", "Masa Pelaksanaan", "text", true, "Cth: 8.00 PAGI - 12.00 TENGAH HARI"),
      field("penglibatan", "Penglibatan", "text", true, "Cth: 80 MURID TAHUN 6"),
      field("lokasi", "Lokasi", "text", true, "Cth: DEWAN SEKOLAH"),
      field("pelibatan", "Penglibatan Pihak Luar / Kerjasama", "text", false, "Cth: PIBG / AGENSI LUAR", "wide"),
      field("objektif", "Objektif Program", "textarea", true, "1. ...\n2. ...", "wide", "objektif", "number"),
      field("kekuatan", "Kekuatan Program", "textarea", true, "● ...", "wide", "kekuatan", "bullet"),
      field("penambahbaikan", "Penambahbaikan & Cadangan", "textarea", true, "● ...", "wide", "penambahbaikan", "bullet")
    ]
  },
  perancangan: {
    title: "OPR Perancangan",
    description: "Perancangan teratur sebelum program dilaksanakan.",
    fields: [
      field("tajukProgram", "Tajuk Program / Aktiviti", "text", true, "Cth: PROGRAM KECEMERLANGAN MURID", "wide"),
      field("tarikhPelaksanaan", "Tarikh Pelaksanaan", "text", true, "Cth: 11 OGOS 2026"),
      field("penglibatan", "Penglibatan", "text", true, "Cth: GURU DAN MURID"),
      field("lokasi", "Lokasi", "text", true, "Cth: DEWAN SEKOLAH"),
      field("sumberKewangan", "Sumber Kewangan", "text", false, "Cth: PCG / PIBG"),
      field("senaraiAjk", "Senarai AJK", "textarea", false, "Pengerusi: ...", "wide", "ajk", "ajk"),
      field("objektif", "Objektif", "textarea", true, "1. ...\n2. ...", "wide", "objektif", "number"),
      field("outputProgram", "Output Program", "textarea", false, "● ...", "wide", "output", "bullet")
    ]
  },
  pelaksanaan: {
    title: "OPR Pelaksanaan",
    description: "Catatan pelaksanaan program dan penglibatan sebenar.",
    fields: [
      field("tajukProgram", "Tajuk Program / Aktiviti", "text", true, "Cth: PROGRAM KECEMERLANGAN MURID", "wide"),
      field("tarikhPelaksanaan", "Tarikh / Tempoh Pelaksanaan", "text", true, "Cth: 11 - 14 OGOS 2026"),
      field("lokasi", "Lokasi", "text", true, "Cth: DEWAN SEKOLAH"),
      field("penglibatan", "Penglibatan", "text", true, "Cth: 80 MURID TAHUN 6"),
      field("perincianProgram", "Perincian Program", "textarea", true, "● ...", "wide", "perincian", "bullet")
    ]
  },
  pemantauan: {
    title: "OPR Pemantauan & Penilaian",
    description: "Penilaian hasil, kekangan dan cadangan penambahbaikan.",
    fields: [
      field("tajukProgram", "Tajuk Program / Aktiviti", "text", true, "Cth: PROGRAM KECEMERLANGAN MURID", "wide"),
      field("tarikhPelaksanaan", "Tarikh / Tempoh Pelaksanaan", "text", true, "Cth: 11 - 14 OGOS 2026"),
      field("penglibatan", "Penglibatan", "text", true, "Cth: 80 MURID TAHUN 6"),
      field("lokasi", "Lokasi", "text", true, "Cth: DEWAN SEKOLAH"),
      field("senaraiAjk", "Senarai AJK", "textarea", false, "Pengerusi: ...", "wide", "ajk", "ajk"),
      field("outputProgram", "Output Program", "textarea", false, "● ...", "wide", "output", "bullet"),
      field("kekanganProgram", "Kekangan Program", "textarea", false, "● ...", "wide", null, "bullet"),
      field("penambahbaikan", "Cadangan & Penambahbaikan", "textarea", false, "● ...", "wide", "penambahbaikan", "bullet")
    ]
  },
  susulan: {
    title: "OPR Tindakan Susulan",
    description: "Tindakan lanjutan dan hasil yang disasarkan.",
    fields: [
      field("tajukProgram", "Tajuk Program / Aktiviti", "text", true, "Cth: PROGRAM KECEMERLANGAN MURID", "wide"),
      field("tarikhPelaksanaan", "Tarikh / Tempoh Pelaksanaan", "text", true, "Cth: 11 - 14 OGOS 2026"),
      field("penglibatan", "Penglibatan", "text", true, "Cth: 80 MURID TAHUN 6"),
      field("lokasi", "Lokasi", "text", true, "Cth: DEWAN SEKOLAH"),
      field("senaraiAjk", "Senarai AJK", "textarea", false, "Pengerusi: ...", "wide", "ajk", "ajk"),
      field("penambahbaikan", "Cadangan & Penambahbaikan", "textarea", false, "● ...", "wide", "penambahbaikan", "bullet"),
      field("outputProgram", "Output Program", "textarea", false, "● ...", "wide", "output", "bullet")
    ]
  }
};

const SUGGESTIONS = {
  ajk: ["Pengerusi: Rozani binti Muri\nNaib Pengerusi: Harsharanjit Kaur a/p Tejinder Singh\nPenyelaras: \nAJK: "],
  objektif: [
    "1. Meningkatkan kefahaman dan penglibatan peserta dalam program yang dilaksanakan.\n2. Memperkukuh kerjasama serta pelaksanaan aktiviti secara terancang.\n3. Memastikan hasil program dapat dimanfaatkan oleh kumpulan sasaran.",
    "1. Meningkatkan keupayaan peserta dalam pelaksanaan program.\n2. Mengukuhkan kerjasama antara pihak berkaitan.\n3. Memastikan hasil program memberi impak kepada sasaran."
  ],
  kekuatan: [
    "● Penglibatan aktif peserta sepanjang program.\n● Kerjasama baik daripada jawatankuasa pelaksana.\n● Pengisian program tersusun dan menepati objektif.",
    "● Komitmen tinggi jawatankuasa dan peserta.\n● Pengurusan program mengikut perancangan.\n● Suasana pelaksanaan kondusif dan berkesan."
  ],
  penambahbaikan: [
    "● Memperkemas hebahan awal kepada semua peserta.\n● Menambah baik pengurusan masa dan dokumentasi program.",
    "● Menyediakan hebahan lebih awal.\n● Memperkemas instrumen maklum balas dan dokumentasi."
  ],
  output: [
    "● Program dilaksanakan mengikut perancangan.\n● Peserta mendapat manfaat daripada pengisian yang disampaikan.\n● Dokumentasi dan tindakan susulan disediakan.",
    "● Sasaran program menerima input yang diperlukan.\n● Laporan dan dokumentasi disimpan untuk tindakan susulan."
  ],
  perincian: [
    "● Pendaftaran dan taklimat peserta.\n● Pelaksanaan aktiviti utama mengikut atur cara.\n● Refleksi dan rumusan program bersama peserta.",
    "● Taklimat awal dan pembahagian peranan.\n● Aktiviti utama dilaksanakan secara berfasa.\n● Rumusan serta tindakan susulan direkodkan."
  ]
};

const state = {
  field: "",
  type: "umum",
  images: createImageState(),
  removedPhotos: [],
  records: [],
  officers: [],
  connection: null,
  loadError: "",
  dataLoading: true,
  isSubmitting: false,
  editId: "",
  archiveView: "pegawai"
};

let cropperInstance = null;
let activeImageIndex = null;
let homeScrollFrame = null;
const $ = selector => document.querySelector(selector);
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

function field(name, label, type, required, placeholder, width = "", suggestion = null, structured = null) {
  return { name, label, type, required, placeholder, width, suggestion, structured };
}

function createImageState() {
  return Object.fromEntries([1, 2, 3, 4].map(index => [index, {
    dataUrl: "",
    changed: false,
    sourceUrl: "",
    originalSource: "",
    cropData: null
  }]));
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#home") history.replaceState(null, "", window.location.pathname + window.location.search);
  document.documentElement.classList.add("home-mode");
  document.body.classList.add("home-mode");
  $("[name=tarikhLaporan]").value = today();
  $("#month-label").textContent = new Intl.DateTimeFormat("ms-MY", { month: "long", year: "numeric" }).format(new Date());
  bindEvents();
  bootstrapApp();
  window.addEventListener("resize", fitPreview);
  if (window.ResizeObserver) new ResizeObserver(fitPreview).observe($("#preview-shell"));
});

function bindEvents() {
  $(".brand").addEventListener("click", returnToLanding);
  $("#retry-bootstrap").addEventListener("click", bootstrapApp);
  document.querySelectorAll("[data-nav]").forEach(button => button.addEventListener("click", () => navigate(button.dataset.nav)));
  $(".menu-button")?.addEventListener("click", () => $(".topbar nav").classList.toggle("open"));
  $("#new-opr").addEventListener("click", () => scrollToHomeSection("fields"));
  $("#view-stats").addEventListener("click", () => scrollToHomeSection("stats"));
  document.querySelectorAll("[data-scroll-section]").forEach(button => button.addEventListener("click", () => scrollToHomeSection(button.dataset.scrollSection)));
  window.addEventListener("scroll", queueHomeSectionUpdate, { passive: true });
  document.querySelectorAll(".field-card").forEach(card => card.addEventListener("click", () => chooseField(card.dataset.field)));
  $("#type-back").addEventListener("click", handleTypeBack);
  $("#form-back").addEventListener("click", handleFormBack);
  $("#opr-form").addEventListener("input", handleFormInput);
  $("#opr-form").addEventListener("keydown", handleStructuredKey);
  $("[name=namaPegawai]").addEventListener("input", filterOfficers);
  $("[name=namaPegawai]").addEventListener("focus", filterOfficers);
  $("[name=namaPegawai]").addEventListener("blur", () => setTimeout(() => $("#officer-options").hidden = true, 160));
  $("#reset-form").addEventListener("click", resetForm);
  $("#submit-opr").addEventListener("click", submitRecord);
  $("#download-preview").addEventListener("click", triggerPrint);
  document.querySelectorAll("input[data-image]").forEach(input => input.addEventListener("change", processAndUploadImage));
  document.querySelectorAll("[data-remove-photo]").forEach(button => button.addEventListener("click", () => removePhoto(Number(button.dataset.removePhoto))));
  document.querySelectorAll("[data-edit-photo]").forEach(button => button.addEventListener("click", () => openImageEditor(Number(button.dataset.editPhoto))));
  $("#close-image-editor").addEventListener("click", closeImageEditor);
  $("#crop-cancel").addEventListener("click", closeImageEditor);
  $("#crop-reset").addEventListener("click", () => cropperInstance?.reset());
  $("#crop-apply").addEventListener("click", applyImageCrop);
  $("#close-save-progress").addEventListener("click", closeSaveProgress);
  $("#archive-search").addEventListener("input", renderArchive);
  $("#archive-field").addEventListener("change", renderArchive);
  $("#archive-date").addEventListener("change", renderArchive);
  document.querySelectorAll("[data-archive-view]").forEach(button => button.addEventListener("click", () => {
    state.archiveView = button.dataset.archiveView;
    document.querySelectorAll("[data-archive-view]").forEach(item => item.classList.toggle("active", item === button));
    renderArchive();
  }));
  $("#close-dialog").addEventListener("click", () => $("#status-dialog").close());
}

async function bootstrapApp() {
  const loader = $("#app-loader");
  const status = $("#app-loader-status");
  const detail = $("#app-loader-detail");
  const retry = $("#retry-bootstrap");
  loader.hidden = false;
  loader.className = "app-loader";
  loader.setAttribute("aria-busy", "true");
  status.textContent = "Menyelaraskan data dan akses portal…";
  detail.textContent = "OPR Command Centre";
  retry.hidden = true;

  const connected = await loadRecords();
  if (!connected) {
    loader.classList.add("connection-error");
    loader.setAttribute("aria-busy", "false");
    status.textContent = "Sambungan data belum berjaya.";
    detail.textContent = state.loadError || "Semak deployment Google Apps Script.";
    retry.hidden = false;
    return;
  }

  const connection = state.connection || {};
  loader.classList.add("connected");
  loader.setAttribute("aria-busy", "false");
  status.textContent = "Portal sedia digunakan.";
  detail.textContent = `${connection.recordCount ?? state.records.length} rekod · ${connection.officerCount ?? state.officers.length} pegawai`;
  await delay(420);
  document.body.classList.remove("booting");
  document.body.classList.add("app-ready");
  loader.classList.add("leaving");
  setTimeout(() => { loader.hidden = true; }, 650);
}

function returnToLanding(event) {
  event?.preventDefault();
  const main = document.querySelector("main");
  main.classList.add("is-transitioning");
  setTimeout(() => {
    state.editId = "";
    $("#edit-banner").hidden = true;
    show("home");
    history.replaceState(null, "", window.location.pathname);
    $(".topbar nav").classList.remove("open");
    main.classList.remove("is-transitioning");
    scrollToHomeSection("landing", false);
    if (!state.dataLoading) loadRecords();
  }, 170);
}

function scrollToHomeSection(name, smooth = true) {
  const section = document.querySelector(`[data-home-section="${name}"]`);
  if (!section) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: smooth && !reduceMotion ? "smooth" : "auto", block: "start" });
  setActiveHomeDot(name);
}

function queueHomeSectionUpdate() {
  if (!document.body.classList.contains("home-mode") || homeScrollFrame) return;
  homeScrollFrame = requestAnimationFrame(() => {
    homeScrollFrame = null;
    const viewportAnchor = window.innerHeight * .48;
    const sections = [...document.querySelectorAll("[data-home-section]")];
    const active = sections.reduce((closest, section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - viewportAnchor);
      return !closest || distance < closest.distance ? { section, distance } : closest;
    }, null);
    if (active) setActiveHomeDot(active.section.dataset.homeSection);
  });
}

function setActiveHomeDot(name) {
  document.querySelectorAll(".section-dots [data-scroll-section]").forEach(button => {
    const active = button.dataset.scrollSection === name;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "true" : "false");
  });
}

function handleFormBack() {
  state.editId = "";
  $("#edit-banner").hidden = true;
  if (state.field === "Kurikulum") {
    chooseField("Kurikulum");
    return;
  }
  navigate("new");
}

function handleTypeBack() {
  if (state.field) {
    navigate("new");
    return;
  }
  navigate("home");
}

function navigate(target) {
  if (target === "new") {
    state.editId = "";
    state.field = "";
    $("#edit-banner").hidden = true;
    $("#selected-field-label").textContent = "OPR BAHARU";
    $("#type-heading").textContent = "Pilih bidang";
    $("#type-lede").textContent = "Pilih bidang untuk memulakan OPR baharu.";
    $("#type-grid").innerHTML = "";
    $("#type-grid").classList.add("field-selection");
    ["Pentadbiran", "Kurikulum", "Hal Ehwal Murid", "Kokurikulum"].forEach(name => {
      $("#type-grid").append(typeCard(name, "Pilih bidang ini untuk meneruskan.", () => chooseField(name)));
    });
    show("type");
    return;
  }
  show(target);
  if (target === "archive") renderArchive();
}

function show(id) {
  document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
  $(`#${id}-view`).classList.add("active");
  const homeMode = id === "home";
  document.documentElement.classList.toggle("home-mode", homeMode);
  document.body.classList.toggle("home-mode", homeMode);
  document.querySelectorAll(".nav-link").forEach(button => button.classList.toggle("active", button.dataset.nav === id || (id === "type" && button.dataset.nav === "new")));
  window.scrollTo({ top: 0, behavior: "auto" });
  if (homeMode) setActiveHomeDot("landing");
}

function chooseField(name) {
  state.field = name;
  $("#type-grid").classList.remove("field-selection");
  $("#selected-field-label").textContent = name.toUpperCase();
  if (name !== "Kurikulum") {
    selectType("umum");
    return;
  }
  $("#type-heading").textContent = "Pilih jenis OPR";
  $("#type-lede").textContent = "Bidang Kurikulum mempunyai lima format laporan.";
  $("#type-grid").innerHTML = "";
  Object.entries(FORM_TYPES).forEach(([key, item]) => $("#type-grid").append(typeCard(item.title, item.description, () => selectType(key))));
  show("type");
}

function typeCard(title, description, onClick) {
  const button = document.createElement("button");
  button.className = "type-card";
  button.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(description)}</span><p>Teruskan →</p>`;
  button.addEventListener("click", onClick);
  return button;
}

function selectType(type) {
  state.type = type;
  state.images = createImageState();
  state.removedPhotos = [];
  $("#opr-form").reset();
  $("[name=tarikhLaporan]").value = today();
  $("#form-field-label").textContent = `${state.field.toUpperCase()} · ${FORM_TYPES[type].title.toUpperCase()}`;
  $("#form-title").textContent = FORM_TYPES[type].title === "OPR Umum" ? "Borang Laporan OPR" : FORM_TYPES[type].title;
  renderFields();
  refreshPhotoControls();
  renderPreview();
  show("form");
}

function renderFields() {
  const container = $("#dynamic-fields");
  container.innerHTML = "";
  FORM_TYPES[state.type].fields.forEach(config => {
    const wrapper = document.createElement("div");
    wrapper.className = `field-wrap ${config.width}`.trim();
    if (config.type === "textarea") {
      wrapper.innerHTML = `<div class="textarea-heading"><label for="field-${config.name}">${escapeHtml(config.label)}${config.required ? " *" : ""}</label>${config.suggestion ? `<button type="button" class="suggestion-button" data-suggest="${config.name}">✦ Cadangan</button>` : ""}</div><div class="textarea-shell"><textarea id="field-${config.name}" name="${config.name}" rows="3" ${config.required ? "required" : ""} data-structured="${config.structured || ""}" placeholder="${escapeHtml(config.placeholder)}"></textarea><button type="button" class="clear-field" data-clear="${config.name}" aria-label="Kosongkan ${escapeHtml(config.label)}">×</button></div>`;
    } else {
      wrapper.innerHTML = `<label for="field-${config.name}">${escapeHtml(config.label)}${config.required ? " *" : ""}</label><input id="field-${config.name}" name="${config.name}" type="${config.type}" ${config.required ? "required" : ""} placeholder="${escapeHtml(config.placeholder)}">`;
    }
    container.append(wrapper);
  });
  container.querySelectorAll("[data-suggest]").forEach(button => button.addEventListener("click", () => applySuggestion(button.dataset.suggest)));
  container.querySelectorAll("[data-clear]").forEach(button => button.addEventListener("click", () => clearField(button.dataset.clear)));
}

function handleFormInput(event) {
  const input = event.target;
  if (input.matches("textarea[data-structured]") && input.value) ensureStructuredPrefix(input);
  renderPreview();
}

function ensureStructuredPrefix(input) {
  const kind = input.dataset.structured;
  if (!kind || kind === "ajk") return;
  const matcher = kind === "number" ? /^\d+\.\s*/ : /^[●•\-*]\s*/;
  if (!input.value.trimStart().match(matcher)) {
    const cursor = input.selectionStart;
    const prefix = kind === "number" ? "1. " : "● ";
    input.value = prefix + input.value.trimStart();
    input.setSelectionRange(cursor + prefix.length, cursor + prefix.length);
  }
}

function handleStructuredKey(event) {
  const input = event.target;
  if (!input.matches("textarea[data-structured]")) return;
  const kind = input.dataset.structured;
  if (!kind || kind === "ajk") return;
  if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.isComposing && !input.value.trim()) {
    const prefix = kind === "number" ? "1. " : "● ";
    input.value = prefix;
    input.setSelectionRange(prefix.length, prefix.length);
  }
  if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  const start = input.selectionStart;
  const currentLine = input.value.slice(0, start).split("\n").pop();
  let nextPrefix = "● ";
  if (kind === "number") {
    const match = currentLine.match(/^(\s*)(\d+)\.\s*/);
    nextPrefix = match ? `${match[1]}${Number(match[2]) + 1}. ` : "1. ";
  } else {
    const match = currentLine.match(/^(\s*)[●•\-*]\s*/);
    nextPrefix = match ? `${match[1]}● ` : "● ";
  }
  input.setRangeText(`\n${nextPrefix}`, start, input.selectionEnd, "end");
  renderPreview();
}

function applySuggestion(name) {
  const config = FORM_TYPES[state.type].fields.find(item => item.name === name);
  const values = SUGGESTIONS[config?.suggestion] || [];
  const input = $(`[name="${name}"]`);
  if (!input || !values.length) return;
  input.value = values[Math.floor(Math.random() * values.length)];
  input.focus();
  renderPreview();
}

function clearField(name) {
  const input = $(`[name="${name}"]`);
  if (!input) return;
  input.value = "";
  input.focus();
  renderPreview();
}

function formData() {
  const data = { bidang: state.field, jenisOpr: state.type, rowId: state.editId || "", heroPosition: { x: 50, y: 50 } };
  new FormData($("#opr-form")).forEach((value, key) => data[key] = value);
  return data;
}

function previewSections(data) {
  const metadata = new Set(["tajukProgram", "tarikhPelaksanaan", "masa", "penglibatan", "lokasi", "pelibatan"]);
  return FORM_TYPES[state.type].fields
    .filter(config => !metadata.has(config.name))
    .map(config => `<section class="report-section"><h3>${escapeHtml(config.label.toUpperCase())}</h3><p>${escapeHtml(data[config.name] || "")}</p></section>`)
    .join("");
}

function renderPreview() {
  if (!state.field) return;
  const data = formData();
  const meta = [
    ["TARIKH", data.tarikhPelaksanaan],
    ...(state.type === "umum" ? [["MASA", data.masa]] : []),
    ["PENGLIBATAN", data.penglibatan],
    ["LOKASI", data.lokasi],
    ...(data.pelibatan ? [["KERJASAMA", data.pelibatan]] : [])
  ];
  const gallery = [2, 3, 4].filter(index => state.images[index].dataUrl);
  $("#opr-preview").innerHTML = `<div id="print-content" class="print-content">
    <header class="report-header">
      <img class="report-emblem report-jata" src="${JATA_URL}" alt="Jata Negara">
      <div><h2>LAPORAN RINGKAS PROGRAM / AKTIVITI (ONE PAGE REPORT)</h2><strong>SK METHODIST PJ</strong><small>“UPHOLD THE TRUTH”</small></div>
      <img class="report-emblem report-school-logo" src="assets/logo-mps.png" alt="Logo SK Methodist PJ">
    </header>
    <section class="report-hero">
      ${state.images[1].dataUrl ? `<img src="${state.images[1].dataUrl}" alt="Gambar utama program">` : ""}
      <div><h1>${escapeHtml(data.tajukProgram || "")}</h1><span>${escapeHtml(FORM_TYPES[state.type].title.toUpperCase())} · ${escapeHtml(state.field.toUpperCase())}</span></div>
    </section>
    <section class="report-meta">${meta.map(([label, value]) => `<div><small>${label}</small><strong>${escapeHtml(value || "")}</strong></div>`).join("")}</section>
    <div class="report-sections">${previewSections(data)}</div>
    ${gallery.length ? `<section class="report-gallery"><h3>📸 LAMPIRAN BERGAMBAR</h3><div>${gallery.map(index => `<figure><img src="${state.images[index].dataUrl}" alt="Gambar ${index}"></figure>`).join("")}</div></section>` : ""}
    <footer class="report-footer"><div><b>Disediakan oleh:</b> ${escapeHtml(data.namaPegawai || "")} (${escapeHtml(data.jawatanPegawai || "")})<br><b>Tarikh Laporan:</b> ${escapeHtml(formatDisplayDate(data.tarikhLaporan))}</div><span>Digital Hub SK Methodist PJ | OPR Dashboard</span></footer>
  </div>`;
  const content = $("#print-content");
  content.style.setProperty("--hero-ratio", `${PHOTO_FRAMES.hero.width} / ${PHOTO_FRAMES.hero.height}`);
  content.style.setProperty("--gallery-ratio", `${PHOTO_FRAMES.gallery.width} / ${PHOTO_FRAMES.gallery.height}`);
  requestAnimationFrame(() => {
    fitReportToSinglePage();
    fitPreview();
  });
}

function fitReportToSinglePage() {
  const area = $("#opr-preview");
  const content = $("#print-content");
  const notice = $("#report-fit-notice");
  if (!area || !content || area.clientHeight <= 0 || !area.getClientRects().length) return { scale: 1, tooLong: false };
  content.style.transform = "none";
  content.style.width = "100%";
  // Scale the whole report uniformly; never change a selected photo frame.
  const requiredScale = Math.min(1, (area.clientHeight - 1) / content.scrollHeight);
  const minimumReadableScale = 0.76;
  const scale = Math.max(minimumReadableScale, requiredScale);
  const tooLong = requiredScale < minimumReadableScale;
  content.style.width = `${100 / scale}%`;
  content.style.transform = `scale(${scale})`;
  if (notice) notice.hidden = !tooLong;
  return { scale, tooLong };
}

function fitPreview() {
  const shell = $("#preview-shell");
  const area = $("#opr-preview");
  if (!shell || !area) return;
  area.style.transform = "none";
  const scale = Math.min(1, shell.clientWidth / (area.offsetWidth || 794));
  area.style.transform = `scale(${scale})`;
  shell.style.height = `${area.offsetHeight * scale}px`;
}

function processAndUploadImage(event) {
  const file = event.target.files?.[0];
  const index = Number(event.target.dataset.image);
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showDialog("Fail tidak sah", "Sila pilih fail gambar yang sah.");
    event.target.value = "";
    return;
  }
  if (file.size > 15 * 1024 * 1024) {
    showDialog("Gambar terlalu besar", "Had maksimum gambar ialah 15 MB.");
    event.target.value = "";
    return;
  }
  const image = state.images[index];
  if (image.sourceUrl?.startsWith("blob:")) URL.revokeObjectURL(image.sourceUrl);
  image.sourceUrl = URL.createObjectURL(file);
  image.originalSource = image.sourceUrl;
  image.cropData = null;
  openImageEditor(index, image.sourceUrl);
}

function openImageEditor(index, sourceOverride = "") {
  const imageState = state.images[index];
  const source = sourceOverride || imageState.originalSource || imageState.sourceUrl || imageState.dataUrl;
  if (!source) return;
  activeImageIndex = index;
  $("#image-editor-modal").hidden = false;
  const image = $("#cropper-image");
  image.src = source;
  cropperInstance?.destroy();
  const frame = index === 1 ? PHOTO_FRAMES.hero : PHOTO_FRAMES.gallery;
  cropperInstance = new Cropper(image, {
    aspectRatio: frame.width / frame.height,
    viewMode: 1,
    dragMode: "move",
    autoCropArea: 1,
    responsive: true,
    background: false,
    guides: true,
    center: true,
    movable: true,
    zoomable: false,
    zoomOnWheel: false,
    zoomOnTouch: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    scalable: false,
    rotatable: false,
    toggleDragModeOnDblclick: false,
    ready() {
      if (imageState.cropData) cropperInstance.setData(imageState.cropData);
    }
  });
}

function closeImageEditor() {
  $("#image-editor-modal").hidden = true;
  cropperInstance?.destroy();
  cropperInstance = null;
  activeImageIndex = null;
}

function applyImageCrop() {
  if (!cropperInstance || !activeImageIndex) return;
  const index = activeImageIndex;
  const frame = index === 1 ? PHOTO_FRAMES.hero : PHOTO_FRAMES.gallery;
  const cropData = cropperInstance.getData();
  const canvas = cropperInstance.getCroppedCanvas({
    width: frame.outputWidth,
    height: frame.outputHeight,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "high",
    fillColor: "#ffffff"
  });
  const image = state.images[index];
  image.dataUrl = canvas.toDataURL("image/jpeg", 0.8);
  image.cropData = cropData;
  image.changed = true;
  state.removedPhotos = state.removedPhotos.filter(value => value !== index);
  closeImageEditor();
  refreshPhotoControls(`Gambar ${index} sedia digunakan${index === 1 ? " sebagai hero utama" : ""}.`);
  renderPreview();
}

function removePhoto(index) {
  const image = state.images[index];
  if (!image.dataUrl) return;
  image.dataUrl = "";
  image.changed = false;
  image.originalSource = "";
  image.cropData = null;
  if (!state.removedPhotos.includes(index)) state.removedPhotos.push(index);
  const input = $(`[data-image="${index}"]`);
  if (input) input.value = "";
  refreshPhotoControls(`Gambar ${index} akan dibuang apabila laporan disimpan.`);
  renderPreview();
}

function refreshPhotoControls(message = "") {
  [1, 2, 3, 4].forEach(index => {
    const actions = $(`[data-photo-card="${index}"] .photo-actions`);
    if (actions) actions.hidden = !state.images[index].dataUrl;
  });
  const status = $("#photo-status");
  status.hidden = !message;
  status.textContent = message;
}

function filterOfficers() {
  const query = $("[name=namaPegawai]").value.toLowerCase();
  const box = $("#officer-options");
  if (state.dataLoading) {
    box.innerHTML = '<p class="picker-loading"><i></i> Memuatkan senarai pegawai…</p>';
    box.hidden = false;
    return;
  }
  if (state.loadError) {
    box.innerHTML = '<p>Senarai pegawai belum dapat disambungkan.</p><button type="button" class="picker-retry">Cuba semula</button>';
    box.hidden = false;
    box.querySelector(".picker-retry").addEventListener("mousedown", async event => {
      event.preventDefault();
      await loadRecords();
      filterOfficers();
    });
    return;
  }
  const matches = state.officers.filter(person => `${person.nama} ${person.jawatan}`.toLowerCase().includes(query)).slice(0, 12);
  box.innerHTML = matches.length ? matches.map((person, index) => `<button type="button" data-officer="${index}"><strong>${escapeHtml(person.nama)}</strong><small>${escapeHtml(person.jawatan || "")}</small></button>`).join("") : "<p>Tiada pegawai sepadan.</p>";
  box.hidden = false;
  box.querySelectorAll("button").forEach((button, index) => button.addEventListener("mousedown", event => {
    event.preventDefault();
    selectOfficer(matches[index]);
  }));
}

function selectOfficer(person) {
  $("[name=namaPegawai]").value = person.nama;
  $("[name=jawatanPegawai]").value = person.jawatan || "";
  $("#officer-options").hidden = true;
  renderPreview();
}

function resetForm() {
  if (!confirm("Adakah anda pasti untuk mengosongkan borang?")) return;
  state.images = createImageState();
  state.removedPhotos = [];
  state.editId = "";
  $("#opr-form").reset();
  $("[name=tarikhLaporan]").value = today();
  $("#edit-banner").hidden = true;
  document.querySelectorAll("input[data-image]").forEach(input => input.value = "");
  refreshPhotoControls();
  renderPreview();
}

async function triggerPrint() {
  renderPreview();
  await nextFrame();
  const fit = fitReportToSinglePage();
  if (fit.tooLong) {
    showDialog("Laporan terlalu panjang", "Sila ringkaskan isi laporan supaya kekal dalam satu halaman A4.");
    return;
  }
  const button = $("#download-preview");
  const originalLabel = button.textContent;
  button.disabled = true;
  button.classList.add("is-loading");
  button.setAttribute("aria-busy", "true");
  button.textContent = "Menjana PDF…";
  try {
    const pdfBlob = await generatePdfBlob();
    downloadBlob(pdfBlob, pdfFileName(formData()));
  } catch (error) {
    console.error(error);
    showDialog("PDF tidak dapat dijana", error.message || "Sila cuba semula.");
  } finally {
    button.disabled = false;
    button.classList.remove("is-loading");
    button.removeAttribute("aria-busy");
    button.textContent = originalLabel;
  }
}

async function waitForPreviewImages() {
  const images = [...document.querySelectorAll("#opr-preview img")].filter(image => image.src);
  await Promise.all(images.map(image => image.complete ? Promise.resolve() : new Promise(resolve => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
    setTimeout(resolve, 5000);
  })));
}

const pdfImageCache = new Map();

function normalizePdfText(value = "") {
  return String(value)
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00a0/g, " ")
    .trim();
}

async function imageSourceToDataUrl(source) {
  if (!source) return "";
  if (source.startsWith("data:")) return source;
  if (pdfImageCache.has(source)) return pdfImageCache.get(source);
  const promise = fetch(source, { cache: "force-cache" })
    .then(response => {
      if (!response.ok) throw new Error(`Gambar tidak dapat dimuatkan (${response.status}).`);
      return response.blob();
    })
    .then(blobToDataUrl);
  pdfImageCache.set(source, promise);
  try {
    return await promise;
  } catch (error) {
    pdfImageCache.delete(source);
    throw error;
  }
}

function imageDimensions(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("Format gambar tidak dapat dibaca untuk PDF."));
    image.src = dataUrl;
  });
}

async function drawContainedPdfImage(pdf, source, x, y, width, height, alias) {
  if (!source) return;
  const dataUrl = await imageSourceToDataUrl(source);
  const dimensions = await imageDimensions(dataUrl);
  const ratio = Math.min(width / dimensions.width, height / dimensions.height);
  const drawWidth = dimensions.width * ratio;
  const drawHeight = dimensions.height * ratio;
  pdf.addImage(dataUrl, undefined, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight, alias, "FAST");
}

function roundedBox(pdf, x, y, width, height, radius = 1.8, fill = [250, 252, 254]) {
  pdf.setDrawColor(203, 213, 225);
  pdf.setFillColor(...fill);
  pdf.setLineWidth(0.25);
  pdf.roundedRect(x, y, width, height, radius, radius, "FD");
}

function reportMeta(data) {
  return [
    ["TARIKH", data.tarikhPelaksanaan],
    ...(state.type === "umum" ? [["MASA", data.masa]] : []),
    ["PENGLIBATAN", data.penglibatan],
    ["LOKASI", data.lokasi],
    ...(data.pelibatan ? [["KERJASAMA", data.pelibatan]] : [])
  ];
}

function reportSections(data) {
  const metadata = new Set(["tajukProgram", "tarikhPelaksanaan", "masa", "penglibatan", "lokasi", "pelibatan"]);
  return FORM_TYPES[state.type].fields
    .filter(config => !metadata.has(config.name))
    .map(config => ({ label: config.label.toUpperCase(), value: normalizePdfText(data[config.name] || "") }));
}

function paragraphLines(pdf, value, width) {
  const sourceLines = normalizePdfText(value).split(/\r?\n/);
  return sourceLines.flatMap(rawLine => {
    const line = rawLine.trim();
    if (!line) return [{ text: "", bullet: false }];
    const bullet = /^[\u2022\u25cf]\s*/.test(line);
    const text = bullet ? line.replace(/^[\u2022\u25cf]\s*/, "") : line;
    const lines = pdf.splitTextToSize(text, Math.max(8, width - (bullet ? 4 : 0)));
    return lines.map((part, index) => ({ text: part, bullet: bullet && index === 0, indent: bullet }));
  });
}

function sectionHeight(pdf, section, width, bodyFont, lineHeight) {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(bodyFont);
  const lines = paragraphLines(pdf, section.value, width - 5);
  return Math.max(10.5, 6.2 + Math.max(1, lines.length) * lineHeight);
}

function measureNativePdfLayout(pdf, data, options) {
  const sections = reportSections(data);
  const sectionHeights = sections.map(section => sectionHeight(pdf, section, options.contentWidth, options.bodyFont, options.lineHeight));
  const galleryHeight = options.gallery.length ? options.galleryHeight : 0;
  const total = options.marginTop + options.headerHeight + 3 + options.heroHeight + 2.5 + options.metaHeight + 2.5
    + sectionHeights.reduce((sum, height) => sum + height, 0) + Math.max(0, sections.length - 1) * options.sectionGap
    + (galleryHeight ? 2.5 + galleryHeight : 0) + 2.5 + options.footerHeight + options.marginBottom;
  return { sections, sectionHeights, total };
}

function fitNativePdfLayout(pdf, data, gallery) {
  const options = {
    marginX: 6.5,
    marginTop: 6.5,
    marginBottom: 5.5,
    contentWidth: 197,
    headerHeight: 22,
    heroHeight: PHOTO_FRAMES.hero.height,
    metaHeight: 15,
    galleryHeight: PHOTO_FRAMES.gallery.height + 8,
    footerHeight: 10,
    sectionGap: 1.8,
    bodyFont: 7.2,
    lineHeight: 3.05,
    gallery
  };
  let measured = measureNativePdfLayout(pdf, data, options);
  while (measured.total > 297 && options.bodyFont > 5.8) {
    options.bodyFont -= 0.2;
    options.lineHeight -= 0.08;
    measured = measureNativePdfLayout(pdf, data, options);
  }
  if (measured.total > 297) throw new Error("Laporan terlalu panjang untuk satu halaman A4. Sila ringkaskan isi laporan.");
  return { ...options, ...measured };
}

function drawPdfParagraph(pdf, value, x, y, width, fontSize, lineHeight) {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(fontSize);
  pdf.setTextColor(51, 65, 85);
  const lines = paragraphLines(pdf, value, width);
  lines.forEach((line, index) => {
    const lineY = y + index * lineHeight;
    if (line.bullet) {
      pdf.setFillColor(51, 65, 85);
      pdf.circle(x + 0.8, lineY - 0.75, 0.48, "F");
    }
    pdf.text(line.text, x + (line.indent ? 3 : 0), lineY);
  });
}

async function generatePdfBlob() {
  const fit = fitReportToSinglePage();
  if (fit.tooLong) throw new Error("Laporan terlalu panjang untuk satu halaman A4. Sila ringkaskan isi laporan.");
  await document.fonts.ready;
  await waitForPreviewImages();

  const data = formData();
  const gallery = [2, 3, 4].filter(index => state.images[index].dataUrl);
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true, putOnlyUsedFonts: true });
  pdf.setProperties({
    title: normalizePdfText(data.tajukProgram || "Laporan OPR"),
    subject: `${FORM_TYPES[state.type].title} - ${state.field}`,
    author: "SK Methodist PJ",
    creator: "OPR Command Centre"
  });

  const layout = fitNativePdfLayout(pdf, data, gallery);
  const x = layout.marginX;
  const width = layout.contentWidth;
  let y = layout.marginTop;

  const [jataData, logoData] = await Promise.all([
    imageSourceToDataUrl(JATA_URL),
    imageSourceToDataUrl("assets/logo-mps.png")
  ]);
  await drawContainedPdfImage(pdf, jataData, x + 7, y + 1.2, 17, 17.5, "jata-negara");
  await drawContainedPdfImage(pdf, logoData, x + width - 25, y + 0.5, 18, 19, "logo-sekolah");

  const centerX = 105;
  pdf.setTextColor(11, 20, 39);
  pdf.setFont("times", "bold");
  pdf.setFontSize(11.5);
  pdf.text("LAPORAN RINGKAS PROGRAM / AKTIVITI (ONE PAGE REPORT)", centerX, y + 7, { align: "center" });
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10.5);
  pdf.text("SK METHODIST PJ", centerX, y + 12.2, { align: "center" });
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(7);
  pdf.setTextColor(100, 116, 139);
  pdf.text('"UPHOLD THE TRUTH"', centerX, y + 16.4, { align: "center" });
  pdf.setDrawColor(203, 213, 225);
  pdf.setLineWidth(0.28);
  pdf.line(x, y + layout.headerHeight, x + width, y + layout.headerHeight);
  y += layout.headerHeight + 3;

  pdf.setFillColor(15, 23, 42);
  pdf.roundedRect(x, y, width, layout.heroHeight, 2.2, 2.2, "F");
  if (state.images[1].dataUrl) {
    await drawContainedPdfImage(pdf, state.images[1].dataUrl, x, y, width, layout.heroHeight, "hero-program");
  }
  const overlayHeight = Math.min(22, layout.heroHeight * 0.32);
  pdf.saveGraphicsState();
  if (pdf.GState) pdf.setGState(new pdf.GState({ opacity: 0.78 }));
  pdf.setFillColor(2, 6, 23);
  pdf.rect(x, y + layout.heroHeight - overlayHeight, width, overlayHeight, "F");
  pdf.restoreGraphicsState();
  pdf.setDrawColor(30, 41, 59);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(x, y, width, layout.heroHeight, 2.2, 2.2, "S");

  const heroTitle = normalizePdfText(data.tajukProgram || "").toUpperCase();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.setTextColor(255, 255, 255);
  const titleLines = pdf.splitTextToSize(heroTitle, width - 8).slice(0, 2);
  const titleStart = y + layout.heroHeight - 8.5 - Math.max(0, titleLines.length - 1) * 5;
  pdf.text(titleLines, x + 4, titleStart, { lineHeightFactor: 1.05 });
  pdf.setFontSize(6.5);
  pdf.setTextColor(219, 234, 254);
  pdf.text(`${FORM_TYPES[state.type].title.toUpperCase()} - ${normalizePdfText(state.field).toUpperCase()}`, x + 4, y + layout.heroHeight - 3.4);
  y += layout.heroHeight + 2.5;

  const metadata = reportMeta(data);
  roundedBox(pdf, x, y, width, layout.metaHeight, 1.4, [248, 250, 252]);
  const metaWidth = width / metadata.length;
  metadata.forEach(([label, value], index) => {
    const cellX = x + metaWidth * index;
    if (index) {
      pdf.setDrawColor(203, 213, 225);
      pdf.line(cellX, y, cellX, y + layout.metaHeight);
    }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(5.6);
    pdf.setTextColor(100, 116, 139);
    pdf.text(label, cellX + metaWidth / 2, y + 4, { align: "center" });
    pdf.setFontSize(7.2);
    pdf.setTextColor(30, 41, 59);
    const valueLines = pdf.splitTextToSize(normalizePdfText(value || ""), metaWidth - 4).slice(0, 3);
    pdf.text(valueLines, cellX + metaWidth / 2, y + 7.8, { align: "center", lineHeightFactor: 1.05 });
  });
  y += layout.metaHeight + 2.5;

  layout.sections.forEach((section, index) => {
    const height = layout.sectionHeights[index];
    roundedBox(pdf, x, y, width, height, 1.7, [250, 252, 254]);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    pdf.setTextColor(30, 41, 59);
    pdf.text(section.label, x + 2.5, y + 3.8);
    pdf.setDrawColor(223, 231, 239);
    pdf.setLineWidth(0.2);
    pdf.line(x + 2.5, y + 5.2, x + width - 2.5, y + 5.2);
    drawPdfParagraph(pdf, section.value, x + 2.5, y + 8.2, width - 5, layout.bodyFont, layout.lineHeight);
    y += height + layout.sectionGap;
  });
  if (layout.sections.length) y -= layout.sectionGap;

  if (gallery.length) {
    y += 2.5;
    roundedBox(pdf, x, y, width, layout.galleryHeight, 1.7, [255, 255, 255]);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    pdf.setTextColor(30, 41, 59);
    pdf.text("LAMPIRAN BERGAMBAR", x + 2.5, y + 4.2);
    const gap = 2;
    const imageY = y + 6;
    const imageHeight = layout.galleryHeight - 8;
    const imageWidth = (width - 5 - gap * 2) / 3;
    for (let slot = 0; slot < 3; slot += 1) {
      const imageX = x + 2.5 + slot * (imageWidth + gap);
      pdf.setDrawColor(226, 232, 240);
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(imageX, imageY, imageWidth, imageHeight, 1, 1, "FD");
      const index = gallery[slot];
      if (index) {
        await drawContainedPdfImage(pdf, state.images[index].dataUrl, imageX, imageY, imageWidth, imageHeight, `gallery-${slot}`);
      }
    }
    y += layout.galleryHeight;
  }

  y += 2.5;
  pdf.setDrawColor(203, 213, 225);
  pdf.line(x, y, x + width, y);
  y += 3.2;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text(`Disediakan oleh: ${normalizePdfText(data.namaPegawai || "")} (${normalizePdfText(data.jawatanPegawai || "")})`, x + 2, y);
  pdf.text(`Tarikh Laporan: ${normalizePdfText(formatDisplayDate(data.tarikhLaporan))}`, x + 2, y + 3.3);
  pdf.setFontSize(5.8);
  pdf.setTextColor(148, 163, 184);
  pdf.text("Digital Hub SK Methodist PJ | OPR Dashboard", x + width - 2, y + 1.6, { align: "right" });

  return pdf.output("blob");
}

async function submitRecord() {
  if (state.isSubmitting) return;
  if (!$("#opr-form").reportValidity()) return;
  const button = $("#submit-opr");
  const label = button.querySelector("span");
  button.disabled = true;
  state.isSubmitting = true;
  label.textContent = state.editId ? "Mengemas kini laporan…" : "Menyediakan laporan…";
  showSaveProgress();
  let step = "images";
  try {
    setSaveStep("images", "active");
    await waitForPreviewImages();
    setSaveStep("images", "done");

    step = "pdf";
    setSaveStep("pdf", "active");
    const pdfBlob = await generatePdfBlob();
    const pdfBase64 = await blobToDataUrl(pdfBlob);
    setSaveStep("pdf", "done");

    step = "drive";
    setSaveStep("drive", "active");
    const changedPhotos = {};
    [1, 2, 3, 4].forEach(index => {
      if (state.images[index].changed) changedPhotos[index] = state.images[index].dataUrl;
    });
    const result = await requestJson(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ record: formData(), photos: changedPhotos, removedPhotos: state.removedPhotos, pdfBase64 })
    }, 120000);
    if (result.status !== "success") throw new Error(result.message || "Rekod gagal disimpan.");
    setSaveStep("drive", "done");

    step = "done";
    setSaveStep("done", "active");
    state.editId = String(result.rowId);
    state.removedPhotos = [];
    [1, 2, 3, 4].forEach(index => state.images[index].changed = false);
    $("#edit-banner").hidden = false;
    $("#edit-banner").textContent = "MODE EDIT · Rekod ini telah disimpan. Simpan semula akan mengemas kini rekod yang sama.";
    downloadBlob(pdfBlob, pdfFileName(formData()));
    await loadRecords();
    setSaveStep("done", "done");
    $("#save-progress-message").textContent = "Laporan berjaya disimpan dan PDF telah dimuat turun.";
    $("#save-progress-message").className = "success-message";
    $("#save-progress-message").hidden = false;
    $("#close-save-progress").hidden = false;
  } catch (error) {
    console.error(error);
    progressError(step, error.message || "Proses tidak dapat diselesaikan. Sila cuba lagi.");
  } finally {
    state.isSubmitting = false;
    button.disabled = false;
    label.textContent = state.editId ? "Kemaskini Laporan & Muat Turun PDF" : "Simpan Laporan & Muat Turun PDF";
  }
}

function showSaveProgress() {
  $("#save-progress-modal").hidden = false;
  $("#save-progress-message").hidden = true;
  $("#save-progress-message").className = "";
  $("#close-save-progress").hidden = true;
  document.querySelectorAll("[data-step]").forEach((item, index) => {
    item.className = "";
    item.removeAttribute("aria-current");
    item.querySelector("i").textContent = String(index + 1);
  });
}

function setSaveStep(step, status) {
  const item = document.querySelector(`[data-step="${step}"]`);
  if (!item) return;
  item.className = status;
  if (status === "active") item.setAttribute("aria-current", "step");
  else item.removeAttribute("aria-current");
}

function progressError(step, message) {
  setSaveStep(step, "error");
  $("#save-progress-message").textContent = message;
  $("#save-progress-message").className = "error-message";
  $("#save-progress-message").hidden = false;
  $("#close-save-progress").hidden = false;
}

function closeSaveProgress() {
  $("#save-progress-modal").hidden = true;
}

async function loadRecords() {
  state.dataLoading = true;
  state.loadError = "";
  try {
    const data = await requestJson(`${GAS_URL}?action=getInitialData&_=${Date.now()}`, { cache: "no-store" }, 20000);
    if (data.status !== "success") throw new Error(data.message);
    const recordData = data.records || data.respon;
    const officerData = data.officers || data.pegawai;
    if (!Array.isArray(recordData) || !Array.isArray(officerData)) throw new Error("Sumber data portal tidak lengkap.");
    state.records = recordData;
    state.officers = officerData;
    state.connection = data.connection || {
      responseSheet: "RESPONDOPR",
      officerSheet: "PEGAWAI",
      respondOprConnected: true,
      pegawaiConnected: true,
      recordCount: recordData.length,
      officerCount: officerData.length
    };
    if (state.connection.respondOprConnected === false || state.connection.pegawaiConnected === false) throw new Error("Sumber data portal belum bersambung sepenuhnya.");
    state.loadError = "";
  } catch (error) {
    console.warn("Data OPR tidak dapat dimuatkan", error);
    state.records = [];
    state.officers = [];
    state.connection = null;
    state.loadError = error.message || "Data tidak dapat dimuatkan.";
  } finally {
    state.dataLoading = false;
  }
  renderHome();
  syncArchiveMonthOptions();
  renderArchive();
  if (document.activeElement === $("[name=namaPegawai]")) filterOfficers();
  return !state.loadError;
}

function renderHome() {
  const rows = [...state.records].sort((a, b) => dateValue(b.timestamp) - dateValue(a.timestamp));
  $("#stat-total").textContent = rows.length;
  $("#stat-officers").textContent = state.officers.length;
  const now = new Date();
  $("#stat-month").textContent = rows.filter(row => {
    const date = new Date(row.timestamp);
    return !Number.isNaN(date.getTime()) && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  $("#recent-list").innerHTML = state.loadError
    ? `<p class="empty-state data-error">Sambungan data belum tersedia. ${escapeHtml(state.loadError)}</p>`
    : (rows.slice(0, 4).map(row => `<div class="recent-row"><div><strong>${escapeHtml(row.tajukProgram || "Tanpa tajuk")}</strong><small>${escapeHtml(row.bidang || "")} · ${escapeHtml(row.namaPegawai || "")}</small></div>${row.pdfUrl ? `<a class="recent-pdf" href="${escapeHtml(row.pdfUrl)}" target="_blank" rel="noopener" aria-label="Buka PDF ${escapeHtml(row.tajukProgram || "laporan")}"><span>▣</span> PDF</a>` : `<span class="recent-pdf unavailable">PDF belum tersedia</span>`}</div>`).join("") || "<p class=\"empty-state\">Belum ada OPR direkodkan.</p>");
}

function renderArchive() {
  const query = $("#archive-search")?.value?.toLowerCase() || "";
  const fieldFilter = $("#archive-field")?.value || "";
  const monthFilter = $("#archive-date")?.value || "";
  const rows = state.records.filter(row => {
    const haystack = `${row.tajukProgram || ""} ${row.namaPegawai || ""} ${row.bidang || ""}`.toLowerCase();
    return (!fieldFilter || row.bidang === fieldFilter) && (!monthFilter || toMonth(row.timestamp) === monthFilter) && haystack.includes(query);
  });
  const key = state.archiveView === "pegawai" ? "namaPegawai" : "bidang";
  const groups = {};
  rows.forEach(row => (groups[row[key] || "Tidak dinyatakan"] ??= []).push(row));
  $("#archive-list").innerHTML = Object.entries(groups).map(([name, list]) => `<section class="archive-group"><h2>${escapeHtml(name)} <small>${list.length} rekod</small></h2>${list.map(row => `<div class="archive-row"><small>${formatDisplayDate(row.timestamp)}</small><div><strong>${escapeHtml(row.tajukProgram || "Tanpa tajuk")}</strong><small>${escapeHtml(row.namaPegawai || "")} · ${escapeHtml(FORM_TYPES[row.jenisOpr]?.title || "OPR Umum")}</small></div><span class="badge">${escapeHtml(row.bidang || "")}</span><div class="archive-actions">${row.pdfUrl ? `<a href="${escapeHtml(row.pdfUrl)}" target="_blank" rel="noopener">PDF</a>` : ""}<button data-edit="${escapeHtml(row.rowId)}">Edit</button></div></div>`).join("")}</section>`).join("") || "<p class=\"empty-state\">Tiada rekod sepadan.</p>";
  bindEditButtons();
}

function syncArchiveMonthOptions() {
  const select = $("#archive-date");
  const selected = select.value;
  const months = [...new Set(state.records.map(row => toMonth(row.timestamp)).filter(value => /^\d{4}-\d{2}$/.test(value)))].sort().reverse();
  select.innerHTML = `<option value="">Semua bulan</option>${months.map(value => {
    const [year, month] = value.split("-").map(Number);
    const label = new Intl.DateTimeFormat("ms-MY", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
    return `<option value="${value}">${escapeHtml(label)}</option>`;
  }).join("")}`;
  select.value = months.includes(selected) ? selected : "";
}

function bindEditButtons() {
  document.querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click", () => editRecord(button.dataset.edit)));
}

async function editRecord(rowId) {
  const buttons = [...document.querySelectorAll(`[data-edit="${rowId}"]`)];
  buttons.forEach(button => { button.disabled = true; button.textContent = "Membuka…"; });
  try {
    const data = await requestJson(`${GAS_URL}?action=getRecord&rowId=${encodeURIComponent(rowId)}`, { cache: "no-store" }, 20000);
    if (data.status !== "success" || !data.record) throw new Error(data.message || "Rekod tidak ditemui.");
    const record = data.record;
    state.field = record.bidang;
    state.editId = String(record.rowId);
    selectType(FORM_TYPES[record.jenisOpr] ? record.jenisOpr : "umum");
    state.editId = String(record.rowId);
    Object.entries(record).forEach(([name, value]) => {
      const input = $(`[name="${name}"]`);
      if (input) input.value = name === "tarikhLaporan" ? formatInputDate(value) : (value || "");
    });
    state.images = createImageState();
    (data.photos || []).forEach((imageData, offset) => {
      const index = offset + 1;
      state.images[index] = { dataUrl: imageData || "", changed: false, sourceUrl: "", originalSource: imageData || "" };
    });
    state.removedPhotos = [];
    $("#edit-banner").hidden = false;
    $("#edit-banner").textContent = "MODE EDIT · Rekod lama akan dikemas kini apabila disimpan.";
    refreshPhotoControls("Gambar sedia ada telah dimuatkan. Reposition hanya jika perlu.");
    renderPreview();
    show("form");
  } catch (error) {
    showDialog("Rekod tidak dapat dibuka", error.message || "Sila cuba lagi.");
  } finally {
    buttons.forEach(button => { button.disabled = false; button.textContent = "Edit"; });
  }
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatInputDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toISOString().slice(0, 10);
}

function formatDisplayDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat("ms-MY", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function dateValue(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function toMonth(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || "").slice(0, 7);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function pdfFileName(data) {
  return `OPR_${safeFilePart(data.tajukProgram)}_${safeFilePart(data.namaPegawai)}_${data.tarikhLaporan || "LAPORAN"}.pdf`;
}

function safeFilePart(value) {
  return String(value || "OPR").normalize("NFKD").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 55) || "OPR";
}

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function requestJson(url, options = {}, timeout = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Sambungan Apps Script mengambil masa terlalu lama.");
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function showDialog(title, message) {
  $("#status-content").innerHTML = `<h2>${escapeHtml(title)}</h2><p>${escapeHtml(message)}</p>`;
  $("#status-dialog").showModal();
}
