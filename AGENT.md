# AGENT.md

Panduan untuk agen AI yang bekerja di repositori ini.

## Proyek

Prototipe perancangan ulang alur **Pesan Antar Klik Indomaret** (tugas Rekayasa Interaksi, Informatika UMM). Sumber kebenaran adalah PRD di `README.md`. Proyek ini usulan desain akademik, bukan produk resmi Indomaret.

## Baca ini dulu

1. `README.md`: PRD, terutama bagian 6 (User Needs), 7 (FR dan UXR), 8 (User Stories).
2. `skills/klik-indomaret-ux/SKILL.md`: alur kerja dan aturan UX. Ikuti skill ini untuk setiap perubahan layar, teks, atau alur.

## Struktur

| Lokasi | Isi |
|---|---|
| `web/index.html`, `web/assets/` | Prototipe (HTML, CSS, JavaScript murni, tanpa build) |
| `skills/klik-indomaret-ux/` | UX Skill dan referensinya |
| `.github/workflows/pages.yml` | Deployment GitHub Pages dari folder `web/` |
| `CHANGELOG.md` | Riwayat perubahan |

## Perintah

- Jalankan lokal: `python3 -m http.server -d web 8000`, buka `http://localhost:8000`.
- Cek sintaks: `node --check web/assets/app.js`.
- Tidak ada langkah build dan tidak ada dependensi npm. Jangan menambahkan framework tanpa alasan yang tercatat di PRD.

## Aturan kerja

- Setiap perubahan harus merujuk ke US, FR, atau UXR di PRD. Bila tidak ada yang cocok, tanyakan apakah PRD perlu diubah, jangan menambah fitur sendiri.
- Teks antarmuka berbahasa Indonesia sehari-hari, kalimat biasa (sentence case), kosakata mengikuti `references/ux-writing.md`.
- Setiap layar menangani keadaan loading, kosong, error, dan terlambat bila relevan (`references/states-and-flows.md`).
- Aksesibilitas minimal: kontras teks cukup, fokus keyboard terlihat, target sentuh minimal 44 px, label pada kontrol, dan `prefers-reduced-motion` dihormati.
- Data prototipe bersifat tiruan. Jangan mengklaim cara kerja sistem internal Indomaret, jangan memakai logo atau aset resmi, dan jangan menambah pelacakan atau pengiriman data ke pihak ketiga.
- Simpan keadaan hanya di `localStorage` dengan `try/catch`. Jangan menyimpan data pribadi sungguhan.

## Definisi selesai

- [ ] Perubahan merujuk ke ID di PRD
- [ ] Checklist di `SKILL.md` terpenuhi dan UXR terkait dicek (`references/test-cases.md`)
- [ ] `node --check web/assets/app.js` lolos dan halaman dapat dibuka tanpa error di konsol
- [ ] `CHANGELOG.md` diperbarui (bagian Unreleased atau versi baru)
- [ ] Bila PRD di `README.md` berubah, `skills/klik-indomaret-ux/references/PRD.md` ikut diperbarui

## Hal yang tidak boleh dilakukan

- Mengubah target UXR agar tampak tercapai.
- Menghapus tombol bantuan, opsi batal, atau persetujuan item demi tampilan yang lebih ringkas.
- Menghilangkan isi keranjang atau alamat saat terjadi error.
