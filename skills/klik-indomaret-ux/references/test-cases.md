# Test case per UXR

Jalankan pada prototipe di `web/`. Gunakan **Mode demo** untuk memajukan waktu atau memicu kondisi.

| ID | UXR | Langkah | Hasil yang diharapkan |
|---|---|---|---|
| TC01 | UXR1 | Isi keranjang, buka Pembayaran, pilih jam | Estimasi tampil sebagai rentang. Hanya jadwal yang bisa dipenuhi yang muncul. |
| TC02 | UXR1 | Minta 5 pengguna menyebut perkiraan tiba dari layar Pelacakan | Minimal 4 dari 5 menjawab benar tanpa bantuan (uji pengguna). |
| TC03 | UXR2 | Buka Pelacakan pesanan aktif di layar 360 px | Tahap, rentang estimasi, dan waktu pembaruan terlihat tanpa menggulir ke bawah untuk status utama. |
| TC04 | UXR3 | Buat pesanan, Mode demo > Maju 3 jam | Muncul pemberitahuan terlambat, penanda di tab Pesanan Saya, dan tiga pilihan. Tiap pilihan dicapai dengan 1 sampai 2 ketukan. |
| TC05 | UXR3 | Pilih "Tetap menunggu 30 menit lagi" | Estimasi baru tampil dan pemberitahuan terlambat hilang. |
| TC06 | UXR4 | Tambah Sabun Mandi Cair, Mode demo > kosongkan stok | Keranjang menandai barang kosong. Tombol lanjut diblokir dengan penjelasan. Pilihan ganti dan hapus tersedia. |
| TC07 | UXR4 | Pilih "Ganti ke Sabun Mandi Batang" | Barang diganti, penanda hilang, tombol lanjut aktif. |
| TC08 | UXR5 | Dari Pelacakan, tekan Toko, Kurir, atau Chat CS | Tombol tersedia di halaman yang sama (1 langkah) dan dialog kontak terbuka. |
| TC09 | UXR5 | Ajukan komplain lalu buka Bantuan | Status tiket tampil di Pesanan dan di Komplain saya. |
| TC10 | UXR6 | Mode demo > nyalakan gagal kirim, lalu Bayar | Layar error menyebut uang belum terpotong. Keranjang tetap ada. Coba lagi berhasil. |
| TC11 | UXR7 | Buka detail pesanan | Bukti transaksi (nomor, waktu, metode, total) terlihat dalam 2 langkah dari Pesanan Saya. |
| TC12 | UXR7 | Buka Belanja, Detail Produk, Pembayaran | Keterangan "harga bisa berbeda di toko tertentu" muncul di ketiganya. |
| TC13 | UXR8 | Hubungkan dompet, muat ulang halaman | Dompet tetap terhubung. Bayar dapat dilakukan dalam maksimal 3 langkah dari keranjang. |
| TC14 | Umum | Tekan Tab di keyboard pada tiap layar | Fokus terlihat jelas dan urutannya wajar. Semua tombol berlabel. |
| TC15 | Umum | Aktifkan pengaturan kurangi gerakan di sistem | Tidak ada animasi. |

Catat hasil dengan format `TC | Lulus/Gagal | Catatan`.
