Buatkan source code lengkap untuk aplikasi Undangan Digital Online Statis (Web Undangan) yang interaktif, mewah, dan responsif (mobile-first). Aplikasi ini akan di-host di Cloudflare Pages (tanpa VPS/database backend).

### 1. KEBUTUHAN UTAMA (Dynamic Guest Name)
- Nama tamu yang diundang HARUS dinamis menggunakan parameter URL/Route (Query Parameter).
- Contoh URL: `https://domainku.com/?to=Budi+Suryana+&+Istri` atau `https://domainku.com/invitation?to=Budi+Suryana`
- Jika parameter `to` ada, tampilkan nama tersebut secara elegan di Cover/Landing awal (contoh: "Kepada Yth. Bapak/Ibu/Saudara/i: Budi Suryana").
- Jika parameter `to` kosong, berikan fallback nama default seperti "Tamu Undangan".
- Sediakan fungsi tombol "Salin Link Undangan" di halaman tersendiri/admin sederhana atau script generator URL agar saya bisa dengan mudah membuat link khusus untuk tiap tamu.

### 2. TEKNOLOGI & ARCHITECTURE
- Framework/Library: HTML5, Tailwind CSS (via CDN), Alpine.js / Vanilla JS untuk interaktivitas ringan, GSAP / AOS (Animate On Scroll) untuk animasi visual.
- Deployment target: Cloudflare Pages / Static Hosting.
- Tidak memerlukan database backend.

### 3. FITUR & STRUKTUR HALAMAN

A. Cover / Opening Overlay (Full Screen Screen Lock)
- Tampilan pembuka yang mengunci layar sebelum dibuka.
- Menampilkan tulisan "Undangan Pernikahan", Nama Mempelai, serta Nama Tamu yang Diundang (dari URL parameter `to`).
- Tombol "Buka Undangan" dengan icon sampul/amplop.
- Ketika tombol diklik:
  1. Halaman cover melakukan animasi fade-out / slide-up yang mulus.
  2. Musik latar (Background Music / Audio) otomatis terputar (Auto-play dengan fallback untuk browser restriction).
  3. Mengaktifkan fitur scroll halaman utama.

B. Background Music Player (Floating Action Button)
- Tombol melayang (Floating Button) di pojok bawah untuk Mute / Unmute musik latar.
- Animasi piringan hitam / icon musik berputar saat lagu menyala.

C. Hero Section
- Foto/Ilustrasi Utama Mempelai dengan latar belakang estetik.
- Nama Pasangan Mempelai (misal: Romeo & Juliet).
- Hitung Mundur Waktu (Countdown Timer) interaktif menuju hari H (Hari, Jam, Menit, Detik).

D. Profile Mempelai Section
- Foto dan Profil Singkat Mempelai Pria & Wanita.
- Informasi Orang Tua / Keluarga.
- Link ke akun Instagram masing-masing mempelai.

E. Detail Acara (Event Details)
- Kartu Informasi Acara:
  1. Akad Nikah / Pemberkatan (Waktu, Tanggal, Lokasi).
  2. Resepsi (Waktu, Tanggal, Lokasi).
- Tombol "Simpan ke Google Calendar".
- Tombol "Petunjuk Lokasi" yang membuka Google Maps secara langsung.
- Peta Interaktif (Embed Google Maps iframe).

F. Digital Envelope / Amplop Digital (Hadiah)
- Tab / Accordion berisi pilihan Rekening Bank dan E-Wallet.
- Fitur "Copy to Clipboard" untuk menyalin nomor rekening dengan notifikasi toast (misal: "Nomor rekening berhasil disalin!").
- Alamat pengiriman hadiah fisik jika ada.

G. Gallery & Our Story
- Grid foto galeri dengan efek Lightbox (bisa diklik untuk diperbesar).
- Timeline perjalanan cinta / Our Story sederhana.

H. Buku Tamu / Ucapan (RSVP Simpel)
- Karena tidak menggunakan backend/VPS, buatkan integrasi ucapan menggunakan salah satu opsi mudah:
  - Form interaktif yang mengirimkan data ucapan langsung ke WhatsApp Pengantin via format pesan otomatis.
  - ATAU integrasi dengan layanan gratis tanpa backend seperti Google Sheets (via Google Forms API / Apps Script) atau Supabase gratis jika memungkinkan, dengan fallback ke WhatsApp.

I. Footer
- Penutup ucapan terima kasih.
- Copyright & credit developer.

### 4. DESAIN & AESTHETIC (WOUW FACTOR)
- Tema Visual: Modern Elegant / Luxury Rustic (Gunakan kombinasi warna Emerald Green & Gold / Cream & Terracotta / Slate Gray & Rose Gold).
- Tipografi: Kombinasi Serif mewah untuk Judul (misal: Playfair Display / Cormorant Garamond) dan Sans-Serif bersih untuk Teks (misal: Plus Jakarta Sans / Inter).
- Animasi: Micro-interactions yang halus, efek Parallax, smooth scroll, serta animasi kemunculan elemen saat di-scroll (AOS/GSAP).
- Fully Responsive: Tampilan sempurna di Layar HP (Mobile-first), Tablet, dan Desktop.

### 5. OUTPUT YANG DIHARAPKAN
- Berikan struktur file lengkap (misal: `index.html`, `style.css`, `script.js`).
- Pastikan kode siap digunakan langsung tanpa perlu build step kompleks (bisa langsung upload ke Cloudflare Pages / GitHub Repository).
- Tuliskan komentar pada kode untuk memudahkan kustomisasi tanggal, nama mempelai, link audio, dan nomor rekening.