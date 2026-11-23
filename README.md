# PRD: Perancangan Ulang Alur Pesan Antar Klik Indomaret

| | |
|---|---|
| Versi | 1.0.0 |
| Tanggal | 22 November 2026 |
| Penulis | Naira Septina Kiswandani (NIM 202310370311375) |
| Mata kuliah | Rekayasa Interaksi (UX), Informatika UMM |
| Status | Draf untuk tugas perkuliahan, usulan desain (bukan dokumen resmi Indomaret) |

## 1. Ringkasan

Dokumen ini menjabarkan kebutuhan produk untuk merancang ulang alur **Pesan Antar** pada aplikasi Klik Indomaret. Fokusnya satu: pengguna harus bisa **mempercayai janji aplikasi** (estimasi tiba, stok, status pesanan) dan punya **jalan keluar** saat pesanan bermasalah.

## 2. Latar Belakang dan Masalah

Sumber data: sekitar 30 ulasan pengguna Klik Indomaret di Google Play Store (Juli sampai September 2026). Angka di bawah adalah hitungan kasar dan perlu divalidasi lewat wawancara pengguna.

| Tema masalah | Perkiraan jumlah ulasan |
|---|---|
| Pengiriman terlambat atau tidak sesuai jam/estimasi yang dipilih | 14 |
| Stok tampil tersedia tetapi kosong setelah bayar, atau barang dihapus tanpa kabar | 8 |
| Sulit menghubungi toko, kurir, atau CS (tidak ada live chat, jawaban template) | 8 |
| Error, loading lama, "gangguan sistem", tombol tidak merespons | 6 |
| Harga aplikasi berbeda dari toko, bukti transaksi tidak muncul | 2 |
| Dompet digital terputus setiap login | 2 |

**Aspek UX (bukan operasional murni):** yang dirancang ulang adalah cara aplikasi *menyampaikan* informasi dan memberi kendali, bukan kinerja kurir atau stok toko.

## 3. Tujuan dan Indikator Keberhasilan

| Tujuan | Indikator | Target |
|---|---|---|
| Estimasi tiba dapat dipercaya | Pengguna menyebutkan perkiraan tiba dari layar pelacakan tanpa bantuan | Minimal 4 dari 5 responden uji |
| Pengguna tidak cemas saat menunggu | Status terbaru terlihat dalam satu layar tanpa menggulir | 100% layar pelacakan |
| Pengguna dikabari saat terlambat | Notifikasi setelah estimasi terlewat | Maksimal 15 menit |
| Bantuan mudah dijangkau | Langkah dari halaman pesanan ke kontak toko, kurir, atau CS | Maksimal 2 langkah |
| Pemulihan saat error | Keranjang dan data checkout tidak hilang, pemulihan dengan 1 ketukan | 100% kasus error checkout |

## 4. Pengguna

**Persona acuan (diringkas dari pola ulasan, ganti dengan persona hasil wawancara bila ada):** Dina, 21 tahun, mahasiswa yang jarang sempat keluar belanja. Ia memakai pesan antar untuk kebutuhan harian, mengecek harga dan stok di aplikasi dulu, dan membayar dengan dompet digital. Ia butuh estimasi yang jujur, kabar proaktif, dan kanal komplain yang mudah.

## 5. User Journey dan Moment of Truth

| Tahap | Tujuan | Pain point utama | Peluang |
|---|---|---|---|
| Before | Menemukan produk dengan stok dan harga jelas | Aplikasi lambat, stok tidak akurat, harga bisa berbeda | Stok per toko akurat, keterangan harga |
| During | Menyelesaikan pesanan dan tahu kapan tiba | Estimasi meleset, status "diproses" tanpa penjelasan, tidak ada kontak | Estimasi jujur, notifikasi keterlambatan, tombol hubungi |
| After | Menerima pesanan lengkap atau mendapat penyelesaian | Pesanan dibatalkan sepihak, komplain tidak ditanggapi | Kabar sebelum barang dihapus, status refund, tiket komplain |

**Moment of Truth:** tahap During, saat pengguna sudah membayar lalu menunggu dan pesanan melewati estimasi tanpa kabar.

## 6. User Needs

| ID | User Need |
|---|---|
| UN1 | Estimasi waktu tiba yang jujur dan dapat dipercaya |
| UN2 | Kabar status pesanan yang jelas dan terus diperbarui |
| UN3 | Dikabari lebih awal saat terlambat, dengan pilihan tindakan |
| UN4 | Kepastian ketersediaan barang sebelum membayar, dan kabar sebelum barang dihapus |
| UN5 | Akses bantuan cepat dari halaman pesanan |
| UN6 | Pemulihan mudah saat terjadi error |
| UN7 | Kepercayaan bahwa harga dan bukti transaksi dapat diandalkan, serta status komplain dan refund |
| UN8 | Pembayaran praktis tanpa mengulang pengaturan |

## 7. Requirement

### 7.1 Functional Requirement (FR)

| ID | Kebutuhan | Menjawab |
|---|---|---|
| FR1 | Sistem menghitung estimasi tiba dan menampilkannya sebagai rentang waktu. Slot jam hanya menampilkan jadwal yang dapat dipenuhi. | UN1 |
| FR2 | Halaman pelacakan menampilkan tahap (diterima, dikemas, dikirim, tiba) dan mengirim notifikasi push pada setiap perubahan status. | UN2 |
| FR3 | Notifikasi otomatis bila estimasi terlewat, berisi opsi tetap menunggu, hubungi toko atau kurir, atau batalkan dengan pengembalian dana. | UN3 |
| FR4 | Stok ditampilkan per toko secara terkini. Bila barang kosong, sistem meminta persetujuan pengganti atau pembatalan item sebelum pesanan diproses. | UN4 |
| FR5 | Tombol hubungi toko, kurir, dan CS (chat atau telepon) di halaman pesanan, serta tiket komplain yang dapat dilacak. | UN5, UN7 |
| FR6 | Penanganan error: simpan keranjang dan alamat, tombol Coba Lagi, indikator status koneksi atau server. | UN6 |
| FR7 | Riwayat transaksi menampilkan bukti pembelian digital dan keterangan bila harga dapat berbeda per toko. | UN7 |
| FR8 | Koneksi dompet digital tersimpan antar sesi login. | UN8 |

### 7.2 UX Requirement (UXR)

| ID | Kriteria pengalaman yang dapat diuji | FR |
|---|---|---|
| UXR1 | Minimal 4 dari 5 pengguna uji menyebutkan perkiraan waktu tiba dari layar pelacakan tanpa bantuan. | FR1 |
| UXR2 | Status terbaru terlihat dalam 1 layar tanpa menggulir, dengan bahasa awam dan petunjuk visual per tahap. | FR2 |
| UXR3 | Notifikasi muncul maksimal 15 menit setelah estimasi terlewat. Pengguna memilih tindakan dalam 2 ketukan. | FR3 |
| UXR4 | Ketersediaan terlihat di halaman produk dan keranjang. Pengguna menyetujui penggantian atau pembatalan sebelum pesanan diproses. | FR4 |
| UXR5 | Kanal bantuan dapat dicapai maksimal 2 langkah dari halaman pesanan. Status tiket terlihat oleh pengguna. | FR5 |
| UXR6 | Pesan error berbahasa awam dengan langkah berikutnya yang jelas. Keranjang tidak hilang saat gagal, pemulihan 1 ketukan. | FR6 |
| UXR7 | Bukti transaksi dapat dibuka dari riwayat pesanan dalam maksimal 2 langkah. Harga tidak mengejutkan pengguna saat membayar. | FR7 |
| UXR8 | Pengguna tidak perlu menghubungkan ulang dompet pada setiap sesi. Pembayaran selesai dalam maksimal 3 langkah dari keranjang. | FR8 |

## 8. User Stories dan Kriteria Penerimaan

| ID | User Story | Kriteria penerimaan |
|---|---|---|
| US1 | Sebagai pengguna pesan antar, saya ingin melihat estimasi waktu tiba yang jujur dan slot jam yang dapat dipenuhi, agar saya dapat merencanakan waktu. | Estimasi tampil sebelum bayar. Slot yang tidak dapat dipenuhi tidak ditampilkan. |
| US2 | Sebagai pengguna pesan antar, saya ingin memantau status pesanan di satu layar, agar saya tidak cemas saat menunggu. | Status per tahap, estimasi, dan waktu pembaruan terlihat. |
| US3 | Sebagai pengguna pesan antar, saya ingin dinotifikasi saat pesanan terlambat dengan pilihan tindakan, agar saya tetap memegang kendali. | Notifikasi memuat tiga pilihan: menunggu, hubungi, batalkan. |
| US4 | Sebagai pengguna pesan antar, saya ingin melihat stok sebelum membayar dan dimintai persetujuan bila ada barang kosong, agar pesanan tidak berubah tanpa sepengetahuan saya. | Barang kosong ditandai. Penggantian atau pembatalan perlu persetujuan. |
| US5 | Sebagai pengguna pesan antar, saya ingin menghubungi toko, kurir, atau CS dari halaman pesanan, agar masalah diselesaikan cepat. | Tombol kontak terlihat di Pelacakan dan Detail Pesanan. |
| US6 | Sebagai pengguna pesan antar, saya ingin pesan error yang jelas dengan tombol Coba Lagi tanpa kehilangan keranjang, agar tidak mengulang dari awal. | Keranjang dan alamat tersimpan. Coba Lagi memulihkan proses. |
| US7 | Sebagai pengguna pesan antar, saya ingin melihat status komplain dan pengembalian dana, agar yakin uang saya aman. | Status tiket dan refund dapat dilihat dari Detail Pesanan. |
| US8 | Sebagai pengguna pesan antar, saya ingin dompet digital tersimpan dan bukti transaksi mudah dibuka, agar pembayaran praktis. | Dompet tidak terputus antar sesi. Bukti tersedia di riwayat. |

## 9. Struktur Informasi (ringkas)

```
[BERANDA]
 ├── BELANJA: Pencarian, Kategori > Daftar Produk, Detail Produk (stok, harga), Promo
 ├── KERANJANG (ikon di semua halaman): Isi + status stok, Checkout (Alamat, Jam + estimasi, Pembayaran, Konfirmasi), Layar Error + Coba Lagi
 ├── PESANAN SAYA: Pesanan Aktif > Pelacakan (notifikasi terlambat, persetujuan item), Riwayat > Detail > Bukti
 ├── BANTUAN: Hubungi Toko/Kurir/CS, Komplain > Status Tiket > Refund, FAQ
 └── AKUN: Profil, Alamat, Dompet Digital, Pengaturan Notifikasi, Member dan Poin
```

Navigasi: bottom navigation 5 tab (Beranda, Belanja, Pesanan Saya, Bantuan, Akun) dan ikon Keranjang di pojok atas. Kedalaman maksimum 3 tingkat dari Beranda.

## 10. Ruang Lingkup

**Dalam lingkup:** alur Pesan Antar dari pencarian hingga komplain dan pengembalian dana, notifikasi status, penanganan error checkout, penyimpanan dompet digital.

**Di luar lingkup:** kinerja kurir dan operasional toko, program member dan poin (hanya ditempatkan di struktur), pembayaran COD, sistem inventori internal Indomaret.

## 11. Asumsi, Risiko, dan Pertanyaan Terbuka

- Estimasi tiba yang jujur bergantung pada data toko dan kurir yang mungkin tidak tersedia. Perlu konfirmasi kelayakan teknis.
- Data masalah berasal dari ulasan Play Store (bias ke pengguna yang kecewa). Perlu validasi dengan wawancara dan usability test pada pengguna nyata.
- Pertanyaan terbuka: batas waktu keterlambatan yang memicu notifikasi, dan kebijakan pengembalian dana otomatis.

## 12. Sumber

Ulasan pengguna Klik Indomaret di Google Play Store (Juli sampai September 2026), Worksheet 7 (User Journey) dan Worksheet 8 (UX Requirements) mata kuliah Rekayasa Interaksi.

## 13. Prototipe Web dan Deployment

Prototipe ini mengimplementasikan alur Pesan Antar sesuai PRD (data tiruan, tanpa server). Dibuat dengan HTML, CSS, dan JavaScript tanpa build, dengan bantuan UX Skill di repositori ini.

- **Kode sumber:** folder [`web/`](web)
- **Deployment:** GitHub Pages, di `https://nairaseptinaa.github.io/klik-indomaret-prd-skill/` (aktif setelah Pages diaktifkan)
- **Menjalankan lokal:** `python3 -m http.server -d web 8000`, lalu buka `http://localhost:8000`

Tekan **Mode demo** di pojok kanan atas untuk mempercepat waktu, memicu error bayar, atau mengosongkan stok. Daftar skenario uji lengkap ada di [`skills/klik-indomaret-ux/references/test-cases.md`](skills/klik-indomaret-ux/references/test-cases.md).

### Mengaktifkan deployment

1. Buka **Settings > Pages** di repositori.
2. Pada **Source**, pilih **GitHub Actions**.
3. Push ke branch `main`. Workflow `.github/workflows/pages.yml` akan men-deploy folder `web/`.

## 14. UX Skill

Folder [`skills/klik-indomaret-ux/`](skills/klik-indomaret-ux) berisi skill agar asisten AI mengerjakan desain, kode, review, dan test sesuai PRD ini. Panduan agen ada di [`AGENT.md`](AGENT.md).

| Berkas | Fungsi |
|---|---|
| `SKILL.md` | Alur kerja, aturan inti, format keluaran, checklist |
| `references/PRD.md` | Salinan PRD yang dibaca skill |
| `references/ux-writing.md` | Aturan teks antarmuka, kosakata baku, contoh sebelum dan sesudah |
| `references/states-and-flows.md` | Keadaan tiap layar dan alur utama (normal, terlambat, kosong, error, komplain) |
| `references/test-cases.md` | Test case per UXR |
| `evals/evals.json` | Contoh permintaan untuk menguji skill |

Cara memakai: salin `skills/klik-indomaret-ux/` ke direktori skill pada tool AI (misalnya `.claude/skills/`), lalu minta tugas seperti "Buat layar Pelacakan Pesanan" atau "Review halaman checkout". Bila PRD di `README.md` diubah, perbarui `references/PRD.md`.

## 15. Struktur Repositori

```
.
├── README.md                   PRD (dokumen ini)
├── CHANGELOG.md                riwayat perubahan
├── AGENT.md                    panduan untuk agen AI
├── web/                        kode sumber prototipe
│   ├── index.html
│   └── assets/ (style.css, app.js)
├── skills/klik-indomaret-ux/   UX Skill (SKILL.md, references, evals)
└── .github/workflows/pages.yml deployment GitHub Pages
```
