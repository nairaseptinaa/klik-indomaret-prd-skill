---
name: klik-indomaret-ux
description: Panduan untuk merancang, menulis kode, mereview, atau menguji layar dan fitur alur Pesan Antar Klik Indomaret sesuai PRD. Gunakan skill ini setiap kali pengguna menyebut Klik Indomaret, pesan antar, pelacakan pesanan, checkout, estimasi tiba, notifikasi keterlambatan, stok kosong, komplain atau refund, atau meminta wireframe, UI, kode, teks antarmuka, user story, atau test case untuk alur tersebut, meskipun PRD tidak disebut secara eksplisit.
---

# Klik Indomaret: Pesan Antar (berbasis PRD)

Skill ini membuat setiap hasil kerja (desain, kode, teks, review, test) konsisten dengan PRD. Pengguna intinya adalah mahasiswa yang memesan kebutuhan harian dan paling kecewa saat estimasi tidak ditepati, stok berubah tanpa kabar, dan tidak ada jalan menghubungi siapa pun.

## Alur kerja

1. **Baca PRD** (`references/PRD.md`). Bagian terpenting: User Needs (6), Requirement (7), User Stories (8), Struktur Informasi (9).
2. **Petakan tugas ke ID.** Tulis di awal jawaban: tugas ini menyentuh US, FR, UXR yang mana. Bila tidak ada yang cocok, katakan bahwa tugas di luar lingkup PRD dan tanyakan apakah PRD perlu diubah.
3. **Pilih referensi yang relevan** (lihat tabel di bawah), lalu kerjakan.
4. **Verifikasi** dengan checklist dan `references/test-cases.md`. Laporkan UXR yang terpenuhi dan yang belum.

| Bila tugasnya... | Baca |
|---|---|
| menulis teks, tombol, pesan error, notifikasi | `references/ux-writing.md` |
| merancang atau membuat layar dan alur | `references/states-and-flows.md` |
| menguji atau mereview hasil | `references/test-cases.md` |

## Aturan inti (turunan dari PRD)

- **Estimasi jujur.** Tampilkan estimasi tiba sebagai rentang waktu, bukan janji tunggal. Jangan tampilkan slot jam yang tidak dapat dipenuhi (FR1).
- **Status satu layar.** Layar pelacakan menampilkan tahap, estimasi, dan waktu pembaruan tanpa menggulir (FR2, UXR2).
- **Keterlambatan adalah kejadian utama.** Bila estimasi terlewat, tampilkan pemberitahuan dengan tiga pilihan: tetap menunggu, hubungi toko atau kurir, atau batalkan dengan pengembalian dana (FR3).
- **Tidak ada perubahan pesanan tanpa persetujuan.** Barang kosong ditandai sebelum pesanan diproses, dan pengguna memilih ganti atau hapus (FR4).
- **Bantuan dalam 2 langkah.** Tombol hubungi toko, kurir, dan CS ada di Pelacakan dan Detail Pesanan (FR5, UXR5).
- **Error tidak menghapus kerja pengguna.** Simpan keranjang dan alamat, sediakan Coba lagi (FR6).
- **Bahasa awam.** Tanpa kode teknis. Setiap pesan error menyebut apa yang terjadi, apakah uang aman, dan langkah berikutnya.
- **Navigasi.** Patuhi PRD bagian 9: 5 tab utama dan ikon Keranjang, maksimal 3 tingkat dari Beranda.
- **Jangan menyembunyikan jalan keluar.** Tombol bantuan, batal, dan komplain tidak boleh dihapus demi tampilan ringkas.

## Keadaan yang wajib ditangani di setiap layar

Loading, kosong, error, dan terlambat. Bila salah satunya tidak relevan, sebutkan alasannya.

## Format keluaran

Untuk setiap tugas, kembalikan:

1. **Rujukan PRD:** daftar US, FR, dan UXR yang terkait.
2. **Hasil kerja:** desain, kode, teks, atau test case yang diminta.
3. **Checklist UXR:** tabel `UXR | Terpenuhi? | Bukti`.
4. **Asumsi dan pertanyaan terbuka:** hal yang tidak ada di PRD.

## Checklist cepat

- [ ] Estimasi berupa rentang dan realistis
- [ ] Status terbaru terlihat dalam satu layar
- [ ] Ada jalan keluar saat terlambat (menunggu, hubungi, batalkan)
- [ ] Barang kosong tidak menghilang tanpa persetujuan
- [ ] Kontak toko, kurir, dan CS dapat dicapai maksimal 2 langkah
- [ ] Error memberi langkah pemulihan dan data tidak hilang
- [ ] Bahasa mudah dipahami dan kosakata konsisten
- [ ] Target sentuh 44 px, kontras cukup, fokus keyboard terlihat

## Prototipe acuan

Folder `web/` di akar repositori adalah implementasi acuan. Bila skill dipakai untuk mengubah UI, ubah kode di sana, jalankan `node --check web/assets/app.js`, dan catat perubahan di `CHANGELOG.md`.

## Batasan

- PRD adalah usulan desain akademik, bukan spesifikasi resmi Indomaret. Jangan mengklaim cara kerja sistem internal Indomaret.
- Angka (jumlah ulasan, target UXR) belum divalidasi dengan pengguna nyata. Tandai sebagai target, bukan fakta.
