# OPR Command Centre — SK Methodist PJ

Portal GitHub Pages untuk mencipta, melihat dan mengarkibkan OPR bagi Pentadbiran, Kurikulum, HEM dan Kokurikulum.

## Penyediaan

1. Muat naik fail dalam `apps-script/` ke projek Google Apps Script baharu yang terikat kepada akaun yang boleh mengakses Sheet serta folder Drive.
2. Deploy sebagai **Web app** dan salin URL `/exec`.
3. Masukkan URL tersebut ke dalam pemboleh ubah `GAS_URL` di baris atas `app.js`.
4. Terbitkan root repo ini melalui GitHub Pages.

Apps Script akan mencipta tab `OPR_RECORDS` secara automatik. Tab `MASTER_PEGAWAI` adalah pilihan; gunakan lajur `nama`, `jawatan`, `bidang`.

## Struktur Drive

PDF disimpan terus ke folder bidang yang ditetapkan. Gambar disimpan di bawah folder gambar induk, dengan subfolder bidang dan seterusnya subfolder bagi setiap OPR.
