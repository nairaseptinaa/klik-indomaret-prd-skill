'use strict';
/* Prototipe Pesan Antar Klik Indomaret. Bukan aplikasi resmi.
   Data tiruan, tanpa server. Mengacu ke README.md (PRD): FR1-FR8, UXR1-UXR8. */
const KEY = 'ki-prototype-v1';
const TOKO = 'Indomaret Contoh Raya';
const ONGKIR = 8000;
const PRODUK = [
  { id: 'p1', nama: 'Susu UHT Cokelat 200 ml', kat: 'Minuman', harga: 6500, stok: 24, lain: 30 },
  { id: 'p2', nama: 'Mi Instan Goreng, isi 5', kat: 'Makanan', harga: 14500, stok: 40, lain: 25 },
  { id: 'p3', nama: 'Roti Tawar Gandum', kat: 'Makanan', harga: 18900, stok: 4, lain: 9 },
  { id: 'p4', nama: 'Air Mineral 600 ml', kat: 'Minuman', harga: 3500, stok: 120, lain: 80 },
  { id: 'p5', nama: 'Sabun Mandi Cair 450 ml', kat: 'Kebutuhan Rumah', harga: 21900, stok: 6, lain: 8 },
  { id: 'p6', nama: 'Telur Ayam, 10 butir', kat: 'Makanan', harga: 24500, stok: 12, lain: 15 },
  { id: 'p7', nama: 'Pasta Gigi 120 g', kat: 'Kebutuhan Rumah', harga: 12500, stok: 15, lain: 10 },
  { id: 'p9', nama: 'Sabun Mandi Batang, isi 3', kat: 'Kebutuhan Rumah', harga: 9900, stok: 20, lain: 12 }
];
const SUB = { p5: 'p9' };
const KAT = ['Semua', 'Makanan', 'Minuman', 'Kebutuhan Rumah'];
const ALAMAT = [
  { id: 'a1', label: 'Kos', teks: 'Jl. Contoh Raya No. 12, Malang' },
  { id: 'a2', label: 'Rumah', teks: 'Jl. Mawar No. 5, Lumajang' }
];
const TAHAP = ['Diterima', 'Dikemas', 'Dalam pengiriman', 'Tiba'];
const TAHAP_INFO = ['Toko menerima pesananmu.', 'Barang sedang disiapkan.', 'Kurir membawa pesananmu.', 'Pesanan sudah tiba.'];
const FAQ = [
  ['Apa arti estimasi tiba?', 'Estimasi berupa rentang waktu. Bila lewat dari rentang itu, kamu akan dikabari dan bisa memilih menunggu, menghubungi toko, atau membatalkan.'],
  ['Bagaimana bila barang kosong?', 'Barang yang kosong ditandai sebelum kamu membayar. Kamu memilih mengganti atau menghapusnya, jadi pesanan tidak berubah tanpa persetujuanmu.'],
  ['Kapan uangku kembali bila pesanan dibatalkan?', 'Status pengembalian dana tampil di Detail Pesanan. Pada prototipe ini nilainya contoh.']
];

const defaults = () => ({ cart: [], orders: [], tickets: [], wallet: false, alamat: 'a1', offset: 0, habis: {}, demo: { error: false, late: true }, notif: { status: true, telat: true, promo: false } });
function load() { try { const r = localStorage.getItem(KEY); return r ? Object.assign(defaults(), JSON.parse(r)) : defaults(); } catch (e) { return defaults(); } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* penyimpanan tidak tersedia */ } }
let S = load();
let D = { slot: 'asap', errored: false, q: '', kat: 'Semua', ptab: 'aktif' };
const now = () => Date.now() + S.offset * 60000;
const $ = (s, el = document) => el.querySelector(s);
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rp = n => 'Rp' + Math.round(n).toLocaleString('id-ID');
const hm = ms => new Date(ms).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
const P = id => PRODUK.find(p => p.id === id);
const stokOf = p => (S.habis[p.id] ? 0 : p.stok);
const cartCount = () => S.cart.reduce((a, c) => a + c.qty, 0);

const IC = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  shop: '<path d="M4 7h16l-1.5 12a1 1 0 0 1-1 .9h-11a1 1 0 0 1-1-.9z"/><path d="M8 7a4 4 0 0 1 8 0"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.8L21 7H6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>'
};
const ico = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;

/* ---------- logika pesanan ---------- */
const isLate = o => o.status === 'aktif' && now() > o.estEnd;
const lateMin = o => Math.max(1, Math.floor((now() - o.estEnd) / 60000));
function syncOrders() { S.orders.forEach(o => { if (o.status === 'aktif' && now() >= o.deliverAt) o.status = 'selesai'; }); }
function tahap(o) { if (o.status === 'selesai') return 3; const m = (now() - o.placedAt) / 60000; return m < 3 ? 0 : m < 15 ? 1 : 2; }
function slots() {
  const t = new Date(now()); const out = [];
  const first = Math.ceil((now() + 45 * 60000) / (30 * 60000)) * 30 * 60000;
  for (let i = 0; i < 4; i++) {
    const s = first + i * 30 * 60000, e = s + 30 * 60000;
    if (new Date(e).getHours() >= 22 && new Date(e).getDate() === t.getDate()) break;
    if (new Date(e).getDate() !== t.getDate()) break;
    out.push({ id: 's' + i, s, e });
  }
  return out;
}
function estimate() {
  if (D.slot === 'asap') return { s: now() + 45 * 60000, e: now() + 75 * 60000 };
  const sl = slots().find(x => x.id === D.slot); return sl ? { s: sl.s, e: sl.e } : { s: now() + 45 * 60000, e: now() + 75 * 60000 };
}
function cartLines() {
  return S.cart.map(c => { const p = P(c.id); const st = stokOf(p); return { c, p, st, kosong: st === 0, lebih: st > 0 && c.qty > st }; });
}
function totals() { const sub = cartLines().reduce((a, l) => a + l.p.harga * l.c.qty, 0); return { sub, total: sub + (sub ? ONGKIR : 0) }; }

/* ---------- komponen ---------- */
function page(title, body, o = {}) {
  const n = cartCount();
  return `<header class="top"><div class="top-l">${o.back ? `<button class="icon" data-act="back" aria-label="Kembali">${ico('back')}</button>` : ''}<h1 tabindex="-1">${esc(title)}</h1></div>
<div class="top-r"><button class="chip-btn" data-act="demo">Mode demo</button><a class="icon cart" href="#/keranjang" aria-label="Keranjang, ${n} barang">${ico('cart')}${n ? `<b>${n}</b>` : ''}</a></div></header>
<main>${body}</main>${o.nav === false ? '' : tabs(o.active)}`;
}
function tabs(active) {
  const late = S.orders.some(isLate);
  const items = [['beranda', 'Beranda', 'home'], ['belanja', 'Belanja', 'shop'], ['pesanan', 'Pesanan Saya', 'box'], ['bantuan', 'Bantuan', 'help'], ['akun', 'Akun', 'user']];
  return `<nav class="tabs" aria-label="Menu utama">${items.map(([id, l, i]) => `<a href="#/${id}"${active === id ? ' aria-current="page"' : ''}>${ico(i)}${l}${id === 'pesanan' && late ? '<span class="dot" role="img" aria-label="Ada pesanan terlambat"></span>' : ''}</a>`).join('')}</nav>`;
}
function stokTag(p) {
  const s = stokOf(p);
  return s === 0 ? `<span class="tag out">Kosong di ${TOKO}</span>` : s <= 5 ? `<span class="tag low">Sisa ${s} di ${TOKO}</span>` : `<span class="tag">Tersedia di ${TOKO}</span>`;
}
function prodRow(p) {
  const s = stokOf(p);
  return `<div class="row"><a class="grow" href="#/produk/${p.id}" style="color:inherit;text-decoration:none"><div class="t">${esc(p.nama)}</div><div class="price">${rp(p.harga)}</div>${stokTag(p)}</a>
<button class="btn sm${s ? '' : ' ghost'}" data-act="add" data-arg="${p.id}" ${s ? '' : 'disabled'} aria-label="Tambah ${esc(p.nama)} ke keranjang">Tambah</button></div>`;
}
function etaBlock(o) {
  const pct = Math.min(100, Math.max(4, ((now() - o.placedAt) / (o.estEnd - o.placedAt)) * 100));
  return `<div class="eta"><div class="eta-bar" role="img" aria-label="Kemajuan menuju batas estimasi"><span style="width:${pct}%"></span></div><div class="eta-t"><span>Mulai ${hm(o.estStart)}</span><span>Batas ${hm(o.estEnd)}</span></div></div>`;
}
function orderRow(o) {
  const late = isLate(o);
  const st = o.status === 'batal' ? 'Dibatalkan' : o.status === 'selesai' ? 'Sudah tiba' : late ? `Terlambat ${lateMin(o)} menit` : TAHAP[tahap(o)];
  return `<a class="row" href="#/lacak/${o.id}"><div class="grow"><div class="t">Pesanan ${o.id}</div><div class="sub">${o.items.length} jenis barang, ${rp(o.total)}</div>
<div class="sub">${o.status === 'aktif' ? `Tiba ${hm(o.estStart)} sampai ${hm(o.estEnd)}` : new Date(o.placedAt).toLocaleDateString('id-ID')}</div></div>
<span class="tag ${late || o.status === 'batal' ? 'out' : ''}">${st}</span></a>`;
}

/* ---------- halaman ---------- */
const views = {
  beranda() {
    const aktif = S.orders.filter(o => o.status === 'aktif');
    const lacak = aktif.length ? `<h2>Pesanan berjalan</h2><div class="list">${aktif.map(orderRow).join('')}</div>` : '';
    const rec = PRODUK.slice(0, 4).map(prodRow).join('');
    return page('Klik Indomaret', `<form class="search" data-form="cari" role="search"><input type="search" name="q" placeholder="Cari produk" aria-label="Cari produk"><button class="btn" type="submit">Cari</button></form>
<p class="sub">Dikirim dari ${TOKO}, sekitar 0,8 km dari alamatmu.</p>${lacak}
<div class="gap"><h2>Sering dibeli</h2><div class="list">${rec}</div></div>
<p class="foot">Prototipe tugas kuliah (Rekayasa Interaksi UMM). Bukan aplikasi resmi Indomaret.</p>`, { active: 'beranda' });
  },
  belanja() {
    const q = D.q.trim().toLowerCase();
    const res = PRODUK.filter(p => (D.kat === 'Semua' || p.kat === D.kat) && p.nama.toLowerCase().includes(q));
    return page('Belanja', `<form class="search" data-form="cari" role="search"><input type="search" name="q" value="${esc(D.q)}" placeholder="Cari produk" aria-label="Cari produk"><button class="btn" type="submit">Cari</button></form>
<div class="chips" role="group" aria-label="Kategori">${KAT.map(k => `<button class="chip" data-act="kat" data-arg="${k}" aria-pressed="${D.kat === k}">${k}</button>`).join('')}</div>
${res.length ? `<div class="list">${res.map(prodRow).join('')}</div>` : `<div class="empty">${ico('shop')}<p><b>Produk tidak ditemukan</b></p><p class="sub">Coba kata kunci lain atau pilih kategori Semua.</p><button class="btn ghost" data-act="kat" data-arg="Semua">Tampilkan semua produk</button></div>`}
<p class="note">Harga bisa berbeda di toko tertentu. Harga akhir selalu tampil sebelum kamu membayar.</p>`, { active: 'belanja' });
  },
  produk(id) {
    const p = P(id); if (!p) return views.belanja();
    const s = stokOf(p);
    return page('Detail produk', `<div class="list"><div class="row" style="display:block"><h2>${esc(p.nama)}</h2><div class="price" style="font-size:1.25rem">${rp(p.harga)}</div></div>
<div class="row"><span>${TOKO} (toko pengirim)</span>${stokTag(p)}</div><div class="row"><span>Indomaret Melati</span><span class="sub">${p.lain} tersedia, tidak melayani pesan antar ke alamatmu</span></div></div>
<p class="note">Harga bisa berbeda di toko tertentu. Harga akhir tampil lagi di halaman pembayaran.</p>
<button class="btn block" data-act="add" data-arg="${p.id}" ${s ? '' : 'disabled'}>${s ? 'Tambah ke keranjang' : 'Kosong di toko pengirim'}</button>
${s ? '' : '<p class="note">Barang ini belum bisa dipesan antar dari toko terdekat.</p>'}`, { back: true, active: 'belanja' });
  },
  keranjang() {
    const L = cartLines();
    if (!L.length) return page('Keranjang', `<div class="empty">${ico('cart')}<p><b>Keranjang masih kosong</b></p><p class="sub">Pilih produk dulu, lalu kembali ke sini untuk membayar.</p><a class="btn" href="#/belanja">Mulai belanja</a></div>`, { back: true });
    const bad = L.filter(l => l.kosong).length;
    const rows = L.map(({ c, p, st, kosong, lebih }) => {
      const sub = SUB[p.id] && P(SUB[p.id]) && stokOf(P(SUB[p.id])) > 0 ? P(SUB[p.id]) : null;
      return `<div class="row" style="align-items:flex-start"><div class="grow"><div class="t">${esc(p.nama)}</div><div class="price">${rp(p.harga)}</div>
${kosong ? `<div class="alert bad" role="alert"><b>Barang ini kosong di ${TOKO}.</b> Pesananmu tidak akan diproses sebelum kamu memilih.
<div class="actions">${sub ? `<button class="btn sm" data-act="swap" data-arg="${p.id}">Ganti ke ${esc(sub.nama)}</button>` : ''}<button class="btn sm danger" data-act="rm" data-arg="${p.id}">Hapus dari keranjang</button></div></div>` : lebih ? `<div class="alert">Stok hanya ${st}. Jumlah disesuaikan.</div>` : stokTag(p)}</div>
${kosong ? '' : `<div class="qty"><button data-act="qty" data-arg="${p.id}:-1" aria-label="Kurangi ${esc(p.nama)}">&minus;</button><span aria-live="polite">${c.qty}</span><button data-act="qty" data-arg="${p.id}:1" aria-label="Tambah ${esc(p.nama)}">+</button></div>`}</div>`;
    }).join('');
    const t = totals();
    return page('Keranjang', `<div class="list">${rows}</div>
<div class="list gap" style="padding:12px 14px"><div class="sum"><span>Subtotal</span><span>${rp(t.sub)}</span></div><div class="sum"><span>Ongkos kirim</span><span>${rp(ONGKIR)}</span></div><div class="sum total"><span>Total</span><span>${rp(t.total)}</span></div></div>
<div class="gap">${bad ? `<p class="alert bad">Ada ${bad} barang kosong. Pilih ganti atau hapus dulu untuk lanjut.</p>` : ''}<a class="btn block" href="#/checkout" ${bad ? 'aria-disabled="true" data-act="blok"' : ''}>Lanjut ke pembayaran</a></div>`, { back: true });
  },
  checkout() {
    if (!S.cart.length) return views.keranjang();
    if (cartLines().some(l => l.kosong)) { location.hash = '#/keranjang'; return ''; }
    const sl = slots(); if (D.slot !== 'asap' && !sl.find(x => x.id === D.slot)) D.slot = 'asap';
    const e = estimate(), t = totals();
    const opt = (id, name, desc, chk) => `<label class="opt"><input type="radio" name="slot" value="${id}" ${chk ? 'checked' : ''} data-act="slot"><span><b>${name}</b><br><span class="sub">${desc}</span></span></label>`;
    return page('Pembayaran', `<h2>Alamat pengiriman</h2><div class="list">${ALAMAT.map(a => `<label class="opt"><input type="radio" name="alamat" value="${a.id}" ${S.alamat === a.id ? 'checked' : ''} data-act="alamat"><span><b>${a.label}</b><br><span class="sub">${a.teks}</span></span></label>`).join('')}</div>
<div class="gap"><h2>Jam tiba</h2><div class="list">${opt('asap', 'Secepatnya', 'Perkiraan tiba 45 sampai 75 menit', D.slot === 'asap')}${sl.map(x => opt(x.id, `${hm(x.s)} sampai ${hm(x.e)}`, 'Hanya jadwal yang bisa dipenuhi toko', D.slot === x.id)).join('')}</div>
${sl.length ? '' : '<p class="note">Jadwal berikutnya belum tersedia karena toko hampir tutup. Pilih Secepatnya atau pesan lagi besok pagi.</p>'}
<p class="alert good" style="margin-top:8px"><b>Estimasi tiba: ${hm(e.s)} sampai ${hm(e.e)}.</b> Kalau lewat, kamu dikabari dan bisa memilih langkah berikutnya.</p></div>
<div class="gap"><h2>Pembayaran</h2><div class="list">${S.wallet ? `<div class="row"><div class="grow"><div class="t">Dompet digital</div><div class="sub">Terhubung dan tetap tersimpan di sesi berikutnya</div></div><span class="tag">Terhubung</span></div>` : `<div class="row"><div class="grow"><div class="t">Dompet digital</div><div class="sub">Belum terhubung. Cukup sekali.</div></div><button class="btn sm" data-act="wallet">Hubungkan</button></div>`}</div></div>
<div class="list gap" style="padding:12px 14px"><div class="sum"><span>Subtotal</span><span>${rp(t.sub)}</span></div><div class="sum"><span>Ongkos kirim</span><span>${rp(ONGKIR)}</span></div><div class="sum total"><span>Total</span><span>${rp(t.total)}</span></div></div>
<p class="note">Harga bisa berbeda di toko tertentu. Harga di atas sudah final untuk ${TOKO}.</p>
<button class="btn block" data-act="bayar" ${S.wallet ? '' : 'disabled'}>Bayar ${rp(t.total)}</button>${S.wallet ? '' : '<p class="note">Hubungkan dompet digital dulu untuk membayar.</p>'}`, { back: true, nav: false });
  },
  galat() {
    return page('Pembayaran', `<div class="empty">${ico('help')}<h2>Pesanan belum terkirim</h2><p>Koneksi terputus saat mengirim pesanan. Uangmu belum terpotong dan keranjang tetap aman.</p>
<div class="actions"><button class="btn" data-act="bayar">Coba lagi</button><a class="btn ghost" href="#/keranjang">Kembali ke keranjang</a></div></div>`, { nav: false });
  },
  pesanan() {
    const aktif = S.orders.filter(o => o.status === 'aktif').reverse(), riw = S.orders.filter(o => o.status !== 'aktif').reverse();
    const L = D.ptab === 'aktif' ? aktif : riw;
    return page('Pesanan Saya', `<div class="seg" role="group" aria-label="Jenis pesanan"><button data-act="ptab" data-arg="aktif" aria-pressed="${D.ptab === 'aktif'}">Aktif (${aktif.length})</button><button data-act="ptab" data-arg="riwayat" aria-pressed="${D.ptab === 'riwayat'}">Riwayat (${riw.length})</button></div>
${L.length ? `<div class="list">${L.map(orderRow).join('')}</div>` : `<div class="empty">${ico('box')}<p><b>${D.ptab === 'aktif' ? 'Belum ada pesanan aktif' : 'Belum ada riwayat'}</b></p><p class="sub">Pesanan yang kamu buat tampil di sini lengkap dengan statusnya.</p><a class="btn" href="#/belanja">Mulai belanja</a></div>`}`, { active: 'pesanan' });
  },
  lacak(id) {
    const o = S.orders.find(x => x.id === id); if (!o) return views.pesanan();
    const late = isLate(o), idx = tahap(o);
    const cls = o.status === 'batal' ? 'cancel' : o.status === 'selesai' ? 'done' : late ? 'late' : '';
    const head = o.status === 'batal' ? 'Pesanan dibatalkan' : o.status === 'selesai' ? 'Pesanan sudah tiba' : late ? `Terlambat ${lateMin(o)} menit dari estimasi` : TAHAP[idx];
    const sub = o.status === 'aktif' ? (late ? 'Pesanan melewati estimasi. Pilih langkah berikutnya di bawah.' : TAHAP_INFO[idx]) : '';
    const lateBox = late ? `<div class="actions" role="group" aria-label="Pilihan saat pesanan terlambat"><button class="btn" data-act="tunggu" data-arg="${o.id}">Tetap menunggu 30 menit lagi</button><button class="btn ghost" data-act="kontak" data-arg="toko">Hubungi toko atau kurir</button><button class="btn danger" data-act="batal" data-arg="${o.id}">Batalkan dan ajukan pengembalian dana</button></div>` : '';
    const steps = o.status === 'batal' ? '' : `<ol class="steps" aria-label="Tahap pesanan">${TAHAP.map((t, i) => `<li class="${i < idx ? 'done' : ''}${i === idx ? ' now' : ''}"${i === idx ? ' aria-current="step"' : ''}>${t}</li>`).join('')}</ol>`;
    const eta = o.status === 'aktif' ? `<p style="margin:10px 0 0">Perkiraan tiba <b>${hm(o.estStart)} sampai ${hm(o.estEnd)}</b></p>${etaBlock(o)}<p class="sub" style="margin:4px 0 0">Diperbarui ${hm(now())}</p>` : '';
    const refund = o.refund ? `<p class="alert good" style="margin-top:12px"><b>Pengembalian dana: ${o.refund}.</b> Perkiraan 1 sampai 3 hari kerja (angka contoh).</p>` : '';
    const tk = S.tickets.filter(t => t.orderId === o.id);
    return page(`Pesanan ${o.id}`, `<section class="status ${cls}" aria-live="polite"><p class="big">${head}</p><p class="sub" style="margin:0">${sub}</p>${eta}${steps}${lateBox}${refund}</section>
<div class="contact" role="group" aria-label="Hubungi"><button class="btn ghost" data-act="kontak" data-arg="toko">${ico('phone')}Toko</button><button class="btn ghost" data-act="kontak" data-arg="kurir">${ico('phone')}Kurir</button><button class="btn ghost" data-act="kontak" data-arg="cs">${ico('chat')}Chat CS</button></div>
<div class="gap"><h2>Barang</h2><div class="list">${o.items.map(i => `<div class="row"><span>${esc(i.nama)} x${i.qty}</span><span>${rp(i.harga * i.qty)}</span></div>`).join('')}</div></div>
<div class="gap"><h2>Bukti transaksi</h2><div class="list" style="padding:12px 14px"><div class="sum"><span>Nomor</span><span>${o.id}</span></div><div class="sum"><span>Waktu bayar</span><span>${new Date(o.placedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span></div><div class="sum"><span>Metode</span><span>Dompet digital</span></div><div class="sum"><span>Alamat</span><span>${esc(o.alamat)}</span></div><div class="sum total"><span>Total</span><span>${rp(o.total)}</span></div></div></div>
${tk.length ? `<div class="gap"><h2>Komplain</h2><div class="list">${tk.map(t => `<div class="row"><div class="grow"><div class="t">${esc(t.jenis)}</div><div class="sub">${tkStatus(t)}</div></div></div>`).join('')}</div></div>` : ''}
<div class="actions gap"><a class="btn ghost" href="#/komplain/${o.id}">Ajukan komplain</a>${o.status === 'aktif' && !late ? `<button class="btn danger" data-act="batal" data-arg="${o.id}">Batalkan pesanan</button>` : ''}</div>`, { back: true, active: 'pesanan' });
  },
  komplain(id) {
    const o = S.orders.find(x => x.id === id); if (!o) return views.bantuan();
    return page('Ajukan komplain', `<p>Pesanan ${o.id}</p><form data-form="komplain" data-arg="${o.id}"><label for="jenis">Masalahnya apa?</label><select id="jenis" name="jenis"><option>Pesanan terlambat</option><option>Barang kurang</option><option>Barang salah</option><option>Pengembalian dana belum masuk</option><option>Lainnya</option></select>
<label for="teks">Ceritakan singkat</label><textarea id="teks" name="teks" placeholder="Contoh: pesanan belum tiba padahal sudah lewat estimasi"></textarea>
<p class="note">Kamu bisa memantau status komplain di halaman pesanan dan di menu Bantuan.</p><button class="btn block" type="submit">Kirim komplain</button></form>`, { back: true });
  },
  bantuan() {
    const aktif = S.orders.find(o => o.status === 'aktif');
    const tk = S.tickets.slice().reverse();
    return page('Bantuan', `<h2>Hubungi</h2><div class="list">
<button class="row" style="width:100%;border:0;background:#fff;text-align:left" data-act="kontak" data-arg="toko"><span class="grow"><span class="t">Toko pengirim</span><br><span class="sub">${TOKO}</span></span>${ico('phone')}</button>
<button class="row" style="width:100%;border:0;background:#fff;text-align:left" data-act="kontak" data-arg="kurir" ${aktif ? '' : 'disabled'}><span class="grow"><span class="t">Kurir</span><br><span class="sub">${aktif ? `Untuk pesanan ${aktif.id}` : 'Tersedia saat ada pesanan yang sedang dikirim'}</span></span>${ico('phone')}</button>
<button class="row" style="width:100%;border:0;background:#fff;text-align:left" data-act="kontak" data-arg="cs"><span class="grow"><span class="t">Chat dengan CS</span><br><span class="sub">Ditangani petugas, bukan jawaban template</span></span>${ico('chat')}</button></div>
<div class="gap"><h2>Komplain saya</h2>${tk.length ? `<div class="list">${tk.map(t => `<a class="row" href="#/lacak/${t.orderId}"><div class="grow"><div class="t">${esc(t.jenis)}</div><div class="sub">Pesanan ${t.orderId}</div></div><span class="tag">${tkStatus(t)}</span></a>`).join('')}</div>` : `<p class="sub">Belum ada komplain. Kalau ada masalah, buka pesananmu lalu pilih Ajukan komplain.</p>`}</div>
<div class="gap"><h2>Pertanyaan umum</h2><div class="list">${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p class="sub" style="margin-top:8px">${a}</p></details>`).join('')}</div></div>`, { active: 'bantuan' });
  },
  akun() {
    const sw = (k, l) => `<div class="sw"><span>${l}</span><button class="btn sm ${S.notif[k] ? '' : 'ghost'}" data-act="notif" data-arg="${k}" aria-pressed="${S.notif[k]}">${S.notif[k] ? 'Aktif' : 'Mati'}</button></div>`;
    return page('Akun', `<div class="list"><div class="row"><div class="grow"><div class="t">Dina</div><div class="sub">Akun contoh</div></div></div></div>
<div class="gap"><h2>Alamat tersimpan</h2><div class="list">${ALAMAT.map(a => `<div class="row"><div class="grow"><div class="t">${a.label}</div><div class="sub">${a.teks}</div></div></div>`).join('')}</div></div>
<div class="gap"><h2>Dompet digital</h2><div class="list"><div class="sw"><span>${S.wallet ? 'Terhubung. Tidak perlu dihubungkan ulang saat login.' : 'Belum terhubung'}</span><button class="btn sm ${S.wallet ? 'danger' : ''}" data-act="wallet">${S.wallet ? 'Putuskan' : 'Hubungkan'}</button></div></div></div>
<div class="gap"><h2>Notifikasi</h2><div class="list">${sw('status', 'Perubahan status pesanan')}${sw('telat', 'Pesanan melewati estimasi')}${sw('promo', 'Promo dan voucher')}</div></div>
<div class="gap"><h2>Member dan poin</h2><div class="list"><div class="row"><span class="sub">Belum termasuk dalam prototipe ini.</span></div></div></div>`, { active: 'akun' });
  }
};
function tkStatus(t) { const m = (now() - t.at) / 60000; return m < 10 ? 'Diterima' : m < 30 ? 'Sedang ditinjau' : 'Selesai ditinjau'; }

/* ---------- aksi ---------- */
const live = m => { $('#live').textContent = ''; setTimeout(() => { $('#live').textContent = m; }, 30); };
function modal(html) { const d = $('#dlg'); d.innerHTML = html; if (!d.open) d.showModal(); }
function closeModal() { const d = $('#dlg'); if (d.open) d.close(); }
function go(h) { location.hash = h; }
function addToCart(id) {
  const p = P(id), s = stokOf(p); if (!s) return;
  const c = S.cart.find(x => x.id === id);
  if (c) { if (c.qty >= s) { live(`Stok hanya ${s}.`); return; } c.qty++; } else S.cart.push({ id, qty: 1 });
  save(); live(`${p.nama} masuk keranjang.`); render(true);
}
function placeOrder() {
  if (S.demo.error && !D.errored) { D.errored = true; go('#/galat'); return; }
  D.errored = false;
  const e = estimate(), t = totals(), placedAt = now();
  const o = { id: 'KI' + String(Math.floor(100000 + Math.random() * 900000)), items: S.cart.map(c => ({ id: c.id, qty: c.qty, nama: P(c.id).nama, harga: P(c.id).harga })), total: t.total, alamat: ALAMAT.find(a => a.id === S.alamat).teks, placedAt, estStart: e.s, estEnd: e.e, deliverAt: S.demo.late ? e.e + 240 * 60000 : Math.round((e.s + e.e) / 2), status: 'aktif', refund: null };
  S.orders.push(o); S.cart = []; save(); live('Pesanan diterima.'); go('#/lacak/' + o.id);
}
function kontak(who) {
  const m = {
    toko: ['Hubungi toko', `${TOKO}. Prototipe: tombol ini akan membuka telepon ke toko.`],
    kurir: ['Hubungi kurir', 'Prototipe: tombol ini akan membuka telepon atau chat ke kurir yang membawa pesananmu.'],
    cs: ['Chat dengan CS', 'Prototipe: di sini kamu menulis pesan dan dibalas petugas. Target balasan pertama maksimal 10 menit (contoh).']
  }[who];
  modal(`<h2>${m[0]}</h2><p>${m[1]}</p>${who === 'cs' ? '<label for="cs">Pesanmu</label><textarea id="cs"></textarea>' : ''}<div class="actions">${who === 'cs' ? '<button class="btn" data-act="closeok">Kirim pesan</button>' : '<button class="btn" data-act="closeok">Hubungi sekarang</button>'}<button class="btn ghost" data-act="close">Tutup</button></div>`);
}
function demoDialog() {
  modal(`<h2>Mode demo</h2><p class="sub">Waktu simulasi: <b>${hm(now())}</b>. Tombol ini hanya untuk mencoba skenario dengan cepat.</p>
<div class="actions"><button class="btn sm ghost" data-act="maju" data-arg="15">Maju 15 menit</button><button class="btn sm ghost" data-act="maju" data-arg="60">Maju 60 menit</button><button class="btn sm ghost" data-act="maju" data-arg="180">Maju 3 jam</button>
<button class="btn sm ghost" data-act="dmo" data-arg="late" aria-pressed="${S.demo.late}">Pesanan baru terlambat: ${S.demo.late ? 'Ya' : 'Tidak'}</button>
<button class="btn sm ghost" data-act="dmo" data-arg="error" aria-pressed="${S.demo.error}">Gagal kirim saat bayar: ${S.demo.error ? 'Ya' : 'Tidak'}</button>
<button class="btn sm ghost" data-act="habis">${S.habis.p5 ? 'Stok sabun cair: dikosongkan' : 'Kosongkan stok sabun cair 450 ml'}</button>
<button class="btn sm danger" data-act="reset">Reset semua data</button><button class="btn sm" data-act="close">Tutup</button></div>`);
}
const acts = {
  back() { history.length > 1 ? history.back() : go('#/beranda'); },
  add(a) { addToCart(a); },
  qty(a) { const [id, d] = a.split(':'); const c = S.cart.find(x => x.id === id); if (!c) return; c.qty += +d; if (c.qty < 1) S.cart = S.cart.filter(x => x.id !== id); else { const s = stokOf(P(id)); if (c.qty > s) c.qty = s; } save(); render(true); },
  rm(a) { S.cart = S.cart.filter(x => x.id !== a); save(); live('Barang dihapus dari keranjang.'); render(true); },
  swap(a) { const c = S.cart.find(x => x.id === a); if (!c) return; const n = SUB[a]; S.cart = S.cart.filter(x => x.id !== a); const ex = S.cart.find(x => x.id === n); if (ex) ex.qty += c.qty; else S.cart.push({ id: n, qty: c.qty }); save(); live('Barang diganti.'); render(true); },
  blok() { live('Pilih ganti atau hapus barang kosong dulu.'); },
  kat(a) { D.kat = a; if (R().name !== 'belanja') go('#/belanja'); else render(true); },
  ptab(a) { D.ptab = a; render(true); },
  slot(a, el) { D.slot = el.value; render(true); },
  alamat(a, el) { S.alamat = el.value; save(); },
  wallet() { S.wallet = !S.wallet; save(); live(S.wallet ? 'Dompet digital terhubung.' : 'Dompet digital diputus.'); render(true); },
  bayar() { placeOrder(); },
  tunggu(a) { const o = S.orders.find(x => x.id === a); o.estStart = now(); o.estEnd = now() + 30 * 60000; o.deliverAt = Math.max(o.deliverAt, o.estEnd - 5 * 60000); save(); live('Estimasi baru sudah tampil.'); render(true); },
  batal(a) { modal(`<h2>Batalkan pesanan ${a}?</h2><p>Pesanan dihentikan dan pengembalian dana diajukan. Kamu bisa memantau statusnya di halaman pesanan.</p><div class="actions"><button class="btn danger" data-act="batalok" data-arg="${a}">Ya, batalkan pesanan</button><button class="btn ghost" data-act="close">Tidak, lanjutkan pesanan</button></div>`); },
  batalok(a) { const o = S.orders.find(x => x.id === a); o.status = 'batal'; o.refund = 'Diproses'; save(); closeModal(); live('Pesanan dibatalkan. Pengembalian dana diproses.'); render(true); },
  kontak(a) { kontak(a); },
  close() { closeModal(); },
  closeok() { closeModal(); live('Permintaan terkirim (simulasi).'); },
  demo() { demoDialog(); },
  maju(a) { S.offset += +a; save(); demoDialog(); render(true); },
  dmo(a) { S.demo[a] = !S.demo[a]; save(); demoDialog(); },
  habis() { S.habis.p5 = true; save(); demoDialog(); render(true); },
  reset() { S = defaults(); D = { slot: 'asap', errored: false, q: '', kat: 'Semua', ptab: 'aktif' }; save(); closeModal(); go('#/beranda'); render(); },
  notif(a) { S.notif[a] = !S.notif[a]; save(); render(true); }
};
document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el || el.tagName === 'INPUT') return; if (el.disabled) return; if (el.tagName === 'A' && el.dataset.act === 'blok') e.preventDefault(); (acts[el.dataset.act] || (() => {}))(el.dataset.arg, el); });
document.addEventListener('change', e => { const el = e.target.closest('input[data-act]'); if (el) acts[el.dataset.act](el.dataset.arg, el); });
document.addEventListener('submit', e => {
  const f = e.target.closest('[data-form]'); if (!f) return; e.preventDefault(); const d = new FormData(f);
  if (f.dataset.form === 'cari') { D.q = String(d.get('q') || ''); D.kat = 'Semua'; go('#/belanja'); render(true); }
  if (f.dataset.form === 'komplain') { S.tickets.push({ id: 'T' + Date.now(), orderId: f.dataset.arg, jenis: String(d.get('jenis')), teks: String(d.get('teks') || ''), at: now() }); save(); live('Komplain terkirim.'); go('#/lacak/' + f.dataset.arg); }
});
$('#dlg').addEventListener('click', e => { if (e.target === $('#dlg')) closeModal(); });

/* ---------- router ---------- */
function R() { const h = location.hash.replace(/^#\/?/, '') || 'beranda'; const [name, arg] = h.split('/'); return { name, arg }; }
function render(keep) {
  syncOrders(); save();
  const { name, arg } = R(), y = window.scrollY;
  $('#app').innerHTML = (views[name] || views.beranda)(arg);
  if (keep) window.scrollTo(0, y); else { window.scrollTo(0, 0); const h = $('#app h1'); if (h) h.focus({ preventScroll: true }); }
}
window.addEventListener('hashchange', () => render(false));
setInterval(() => { if (!$('#dlg').open && ['beranda', 'pesanan', 'lacak'].includes(R().name) && !document.activeElement.matches('input,textarea,select')) render(true); }, 15000);
render(false);
