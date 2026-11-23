# Keadaan layar dan alur

## Keadaan per layar

| Layar | Normal | Loading | Kosong | Error | Terlambat / khusus |
|---|---|---|---|---|---|
| Beranda | Pencarian, pesanan berjalan, produk sering dibeli | Kerangka daftar | Tanpa pesanan berjalan: bagian itu disembunyikan | Banner "Gagal memuat" dengan Coba lagi | Kartu pesanan berjalan berwarna peringatan bila terlambat |
| Belanja | Daftar produk dengan stok per toko | Kerangka daftar | "Produk tidak ditemukan" dan tombol Tampilkan semua produk | Coba lagi, hasil sebelumnya tetap terlihat | Barang kosong ditandai dan tombol Tambah dinonaktifkan |
| Keranjang | Barang, status ketersediaan, total | - | "Keranjang masih kosong" dan tombol Mulai belanja | Jumlah disesuaikan dengan stok | Barang kosong: pilih ganti atau hapus, tombol lanjut diblokir dengan penjelasan |
| Pembayaran | Alamat, jam, estimasi, dompet, total | Tombol Bayar menampilkan proses | Tanpa jadwal tersisa: tawarkan Secepatnya atau besok | Layar error dengan Coba lagi, keranjang tersimpan | Dompet belum terhubung: tombol Bayar nonaktif dengan penjelasan |
| Pelacakan | Tahap, rentang estimasi, waktu pembaruan, kontak | Tahap terakhir yang diketahui tetap tampil | - | Tampilkan data terakhir dan waktu pembaruannya | Pemberitahuan terlambat dengan tiga pilihan |
| Pesanan Saya | Daftar Aktif dan Riwayat | Kerangka daftar | Teks dan tombol Mulai belanja | Coba lagi | Penanda titik merah pada tab bila ada pesanan terlambat |
| Bantuan | Kontak, komplain, FAQ | - | Komplain kosong: penjelasan cara mengajukan | - | Kontak kurir hanya aktif bila ada pesanan dikirim, dengan penjelasan |

## Alur utama

1. **Normal:** Belanja > Keranjang > Pembayaran (alamat, jam, dompet, bayar) > Pelacakan > Tiba.
2. **Barang kosong:** Keranjang menandai barang > pengguna pilih ganti atau hapus > lanjut ke Pembayaran. Pesanan tidak diproses sebelum ada pilihan.
3. **Error bayar:** Bayar gagal > layar error (uang belum terpotong, keranjang aman) > Coba lagi > Pelacakan.
4. **Terlambat:** Estimasi terlewat > pemberitahuan di Pelacakan, penanda di tab, dan notifikasi push > pilih tetap menunggu (estimasi baru), hubungi toko atau kurir, atau batalkan (konfirmasi > status pengembalian dana).
5. **Komplain:** Detail pesanan > Ajukan komplain > status tiket di halaman pesanan dan Bantuan.

## Aturan navigasi

- 5 tab: Beranda, Belanja, Pesanan Saya, Bantuan, Akun. Keranjang berupa ikon di pojok atas.
- Tombol hubungi toko, kurir, dan CS ada langsung di Pelacakan dan Detail Pesanan.
- Kedalaman maksimum 3 tingkat dari Beranda. Setiap layar bertingkat punya tombol Kembali.
- Layar error tidak boleh menjadi jalan buntu: selalu ada Coba lagi dan jalan kembali.
