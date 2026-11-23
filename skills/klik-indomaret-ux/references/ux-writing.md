# Panduan teks antarmuka

Teks adalah bagian dari desain. Tujuannya satu: pengguna paham apa yang terjadi dan apa yang harus dilakukan.

## Prinsip

1. **Bahasa sehari-hari.** Kalimat biasa (huruf besar hanya di awal kalimat), kata kerja aktif, tanpa istilah teknis.
2. **Tombol menyebut hasilnya.** "Bayar Rp45.000", bukan "Submit". Nama aksi sama di seluruh alur: tombol "Batalkan pesanan" menghasilkan pesan "Pesanan dibatalkan".
3. **Error menjelaskan, tidak meminta maaf berlebihan, dan tidak samar.** Sebut apa yang terjadi, apa dampaknya pada uang dan data, dan langkah berikutnya.
4. **Kosong adalah ajakan.** Layar kosong menjelaskan fungsinya dan memberi satu tombol tindakan.
5. **Jangan berjanji.** Pakai rentang dan kata "perkiraan". Jangan pakai kata "pasti" atau "dijamin" untuk waktu tiba.
6. **Jangan menyalahkan pengguna atau pihak lain.** Jelaskan keadaan, bukan penyebab yang belum diketahui.

## Kosakata baku

| Pakai | Hindari |
|---|---|
| Pesanan Saya | Order, Transaksi, Aktivitas |
| Pelacakan pesanan | Tracking, Status order |
| Bantuan | Help center, Pusat layanan |
| Batalkan pesanan | Cancel, Hentikan |
| Ajukan komplain | Laporkan, Submit ticket |
| Pengembalian dana | Refund (boleh sebagai istilah pendamping di FAQ) |
| Coba lagi | Retry, Ulangi |
| Perkiraan tiba | ETA, Estimasi sampai |
| Kosong di toko ini | Out of stock, Habis terjual |

## Contoh sebelum dan sesudah

| Situasi | Sebelum | Sesudah |
|---|---|---|
| Error checkout | "Terjadi gangguan sistem." | "Pesanan belum terkirim. Koneksi terputus saat mengirim. Uangmu belum terpotong dan keranjang tetap aman. [Coba lagi]" |
| Terlambat | "Pesanan sedang diproses." | "Terlambat 12 menit dari estimasi. Pilih langkah berikutnya: tetap menunggu, hubungi toko, atau batalkan." |
| Barang kosong | "Item tidak tersedia." | "Barang ini kosong di Indomaret Contoh Raya. Pesananmu tidak diproses sebelum kamu memilih. [Ganti ke ...] [Hapus dari keranjang]" |
| Keranjang kosong | "Tidak ada data." | "Keranjang masih kosong. Pilih produk dulu, lalu kembali ke sini untuk membayar. [Mulai belanja]" |
| Pembatalan | "Yakin?" | "Batalkan pesanan KI123456? Pesanan dihentikan dan pengembalian dana diajukan. [Ya, batalkan pesanan] [Tidak, lanjutkan pesanan]" |
| Harga | (tidak ada keterangan) | "Harga bisa berbeda di toko tertentu. Harga akhir selalu tampil sebelum kamu membayar." |

## Notifikasi push

- Judul menyebut kejadian, isi menyebut tindakan. Contoh: judul "Pesanan melewati estimasi", isi "Sudah lewat 15 menit. Buka untuk menunggu, menghubungi toko, atau membatalkan."
- Maksimal satu notifikasi per kejadian status. Jangan mengirim promo di saluran yang sama dengan notifikasi pesanan.
