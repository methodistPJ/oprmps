const GAS_URL = "https://script.google.com/macros/s/AKfycbyhPN_YBVpTp_fKne4BAlxIkyBA9wtT3QjIFkAsi-ZxX6m69IkUlw3KeRgzfG-xy6-vbQ/exec";
const JATA_URL = "https://i.ibb.co/fYY58Rh2/JATA-NEGARA-PNG.png";

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
    originalSource: ""
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
  status.textContent = "Menyambungkan RESPONDOPR & PEGAWAI…";
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
  status.textContent = "RESPONDOPR & PEGAWAI bersambung.";
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
  requestAnimationFrame(() => {
    fitReportToSinglePage();
    fitPreview();
  });
}

function fitHeroForSinglePage() {
  const area = $("#opr-preview");
  const hero = area?.querySelector(".report-hero");
  if (!area || !hero) return;
  hero.style.height = "";
  const overflow = area.scrollHeight - area.clientHeight;
  if (overflow > 0) hero.style.height = `${Math.max(150, hero.offsetHeight - overflow - 8)}px`;
}

function fitReportToSinglePage() {
  const area = $("#opr-preview");
  const content = $("#print-content");
  const notice = $("#report-fit-notice");
  if (!area || !content || area.clientHeight <= 0 || !area.getClientRects().length) return { scale: 1, tooLong: false };
  content.style.transform = "none";
  content.style.width = "100%";
  fitHeroForSinglePage();
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
  if (!shell || !area || area.classList.contains("pdf-capture")) return;
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
  cropperInstance = new Cropper(image, {
    aspectRatio: index === 1 ? 16 / 9 : 4 / 3,
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
    toggleDragModeOnDblclick: false
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
  const canvas = cropperInstance.getCroppedCanvas({
    width: index === 1 ? 1280 : 900,
    height: index === 1 ? 720 : 675,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "high",
    fillColor: "#ffffff"
  });
  const image = state.images[index];
  image.dataUrl = canvas.toDataURL("image/jpeg", 0.8);
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

function addSelectableTextLayer(pdf, area) {
  const areaRect = area.getBoundingClientRect();
  const xScale = 210 / areaRect.width;
  const yScale = 297 / areaRect.height;
  const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(255, 255, 255);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    const value = String(node.nodeValue || "").replace(/\s+/g, " ").trim().replace(/[\u{1F000}-\u{1FAFF}]/gu, "");
    if (!parent || !value) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const rect = range.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const fontSize = Math.max(2.2, parseFloat(getComputedStyle(parent).fontSize || "8") * yScale);
    pdf.setFontSize(fontSize);
    pdf.text(pdf.splitTextToSize(value, Math.max(4, rect.width * xScale)), Math.max(0, (rect.left - areaRect.left) * xScale), Math.max(fontSize, (rect.top - areaRect.top) * yScale + fontSize), { lineHeightFactor: 1.15 });
  }
}

async function generatePdfBlob() {
  const area = $("#opr-preview");
  const fit = fitReportToSinglePage();
  if (fit.tooLong) throw new Error("Laporan terlalu panjang untuk satu halaman A4. Sila ringkaskan isi laporan.");
  await nextFrame();
  await document.fonts.ready;
  await waitForPreviewImages();
  const oldTransform = area.style.transform;
  area.classList.add("pdf-capture");
  area.style.transform = "none";
  try {
    const canvas = await html2canvas(area, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      width: area.offsetWidth,
      height: area.offsetHeight,
      windowWidth: area.offsetWidth,
      windowHeight: area.offsetHeight
    });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    addSelectableTextLayer(pdf, area);
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 210, 297, undefined, "FAST");
    return pdf.output("blob");
  } finally {
    area.classList.remove("pdf-capture");
    area.style.transform = oldTransform;
    fitPreview();
  }
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
    if (!Array.isArray(recordData) || !Array.isArray(officerData)) throw new Error("Respons GAS tidak mengandungi data RESPONDOPR dan PEGAWAI.");
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
    if (state.connection.respondOprConnected === false || state.connection.pegawaiConnected === false) throw new Error("Tab RESPONDOPR atau PEGAWAI belum bersambung.");
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
