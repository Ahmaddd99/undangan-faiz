/* ==========================================================================
   UNDANGAN DIGITAL ONLINE STATIS - ENGINE & INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. DYNAMIC GUEST NAME FROM URL QUERY PARAMETER (?to=...)
  // ------------------------------------------------------------------------
  function initDynamicGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest');

    if (guestName) {
      // Replace '+' or '%20' with space
      guestName = decodeURIComponent(guestName.replace(/\+/g, ' ')).trim();
    } else {
      guestName = 'Tamu Undangan';
    }

    const coverGuestEl = document.getElementById('cover-guest-name');
    const heroGuestEl = document.getElementById('hero-guest-name');

    if (coverGuestEl) coverGuestEl.textContent = guestName;
    if (heroGuestEl) heroGuestEl.textContent = guestName;

    return guestName;
  }

  const currentGuestName = initDynamicGuestName();


  // ------------------------------------------------------------------------
  // 2. OPENING COVER OVERLAY & SCROLL UNLOCK
  // ------------------------------------------------------------------------
  const openingCover = document.getElementById('opening-cover');
  const btnOpenInvitation = document.getElementById('btn-open-invitation');

  if (btnOpenInvitation && openingCover) {
    btnOpenInvitation.addEventListener('click', () => {
      // 1. Smooth Fade-Out & Slide Up Animation
      openingCover.classList.add('opened');
      document.body.classList.remove('cover-locked');

      // 2. Refresh AOS Animations
      setTimeout(() => {
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }, 500);
    });
  }


  // ------------------------------------------------------------------------
  // 3. COUNTDOWN TIMER
  // ------------------------------------------------------------------------
  // Target Wedding Date: September 4, 2026 08:00:00
  const weddingDate = new Date('2026-09-04T08:00:00+07:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (distance < 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ------------------------------------------------------------------------
  // 4. GOOGLE CALENDAR LINK GENERATOR
  // ------------------------------------------------------------------------
  function setupCalendarButtons() {
    const akadBtn = document.getElementById('btn-cal-akad');
    const resepsiBtn = document.getElementById('btn-cal-resepsi');

    const akadUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Faiz+%26+Fatimah&dates=20260905T020000Z/20260905T050000Z&details=Akad+Nikah+Muhammad+Faiz+Nur+Furqoni+%26+Siti+Fatimatuzzahro&location=Masjid+Al+Ahyar+Palasari,+Kec.+Cijeruk,+Kabupaten+Bogor,+Jawa+Barat+16740";
    const resepsiUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Faiz+%26+Fatimah&dates=20260904T010000Z/20260904T040000Z&details=Resepsi+Pernikahan+Muhammad+Faiz+Nur+Furqoni+%26+Siti+Fatimatuzzahro&location=Majlis+Ibnu+Mukhtari+Kp+Pondok+menteng,+Jl.+Tapos+LBC+RT01/02+No.71+Citapen,+Ciawi,+Kab.+Bogor";

    if (akadBtn) akadBtn.href = akadUrl;
    if (resepsiBtn) resepsiBtn.href = resepsiUrl;
  }
  setupCalendarButtons();


  // ------------------------------------------------------------------------
  // 5. CLIPBOARD COPY & TOAST SYSTEM
  // ------------------------------------------------------------------------
  window.copyToClipboard = function(text, label = 'Teks') {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} berhasil disalin!`);
      }).catch(err => {
        fallbackCopyText(text, label);
      });
    } else {
      fallbackCopyText(text, label);
    }
  };

  function fallbackCopyText(text, label) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`${label} berhasil disalin!`);
    } catch (err) {
      showToast('Gagal menyalin teks');
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }


  // ------------------------------------------------------------------------
  // 6. LIGHTBOX MODAL (QR CODE VIEWER)
  // ------------------------------------------------------------------------
  window.openLightbox = function(imgSrc, caption) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    if (modal && modalImg) {
      modalImg.src = imgSrc;
      if (modalCaption) {
        if (caption) {
          modalCaption.textContent = caption;
          modalCaption.classList.remove('hidden');
        } else {
          modalCaption.textContent = '';
          modalCaption.classList.add('hidden');
        }
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  window.closeLightbox = function() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };


  // ------------------------------------------------------------------------
  // 7. BUKU TAMU / LIVE RSVP ENGINE (shared lewat Google Sheets)
  // ------------------------------------------------------------------------
  // Ucapan tamu disimpan di satu Google Sheet lewat Apps Script Web App,
  // supaya SEMUA pengunjung undangan melihat daftar yang sama - bukan cuma
  // tersimpan di browser masing-masing (localStorage tidak dipakai lagi
  // untuk ini). Panduan setup ada di assets/docs/guestbook-apps-script.gs.
  //
  // >>> GANTI URL DI BAWAH INI dengan Web App URL hasil deploy kamu <<<
  const RSVP_API_URL = 'https://script.google.com/macros/s/AKfycby0sr4mtsO82ktnJuCvdErsgbDLtNL3FuXDnC9bsDmk6j9YuMjeaUZ72qvszvq4A1ba9w/exec';

  function isRsvpApiConfigured() {
    return !!RSVP_API_URL && RSVP_API_URL.indexOf('PASTE_') === -1;
  }

  // Ucapan bawaan/default TIDAK di-hardcode di sini lagi - semuanya (baik
  // ucapan contoh maupun ucapan asli tamu) hidup di satu Google Sheet yang
  // sama, jadi bisa dikelola/diedit langsung dari Sheet tanpa sentuh kode.
  // Cara mengisi ucapan bawaan pertama kali: lihat seedDefaults() di
  // assets/docs/guestbook-apps-script.gs.
  let remoteRSVPs = [];

  function timeAgo(id) {
    const ts = Number(id);
    if (!ts || isNaN(ts)) return 'Baru saja';
    const diffSec = Math.floor((Date.now() - ts) / 1000);
    if (diffSec < 60) return 'Baru saja';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} menit yang lalu`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} jam yang lalu`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} hari yang lalu`;
  }

  async function fetchRemoteRSVPs() {
    if (!isRsvpApiConfigured()) {
      return { ok: false, reason: 'not_configured', data: [] };
    }
    try {
      const res = await fetch(RSVP_API_URL, { method: 'GET' });
      const json = await res.json();
      if (json && json.ok && Array.isArray(json.data)) {
        return { ok: true, data: json.data };
      }
      throw new Error((json && json.error) || 'Format respons tidak dikenali.');
    } catch (err) {
      console.warn('Gagal memuat ucapan dari server:', err);
      return { ok: false, reason: 'error', data: [] };
    }
  }

  function renderRSVPWallMessage(text) {
    const rsvpWall = document.getElementById('rsvp-wall');
    const rsvpCount = document.getElementById('rsvp-count');
    if (rsvpWall) {
      rsvpWall.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">${escapeHtml(text)}</p>`;
    }
    if (rsvpCount) rsvpCount.textContent = '0 Ucapan';
  }

  function renderRSVPMessages(list) {
    const rsvpWall = document.getElementById('rsvp-wall');
    const rsvpCount = document.getElementById('rsvp-count');
    if (!rsvpWall) return;

    if (rsvpCount) rsvpCount.textContent = `${list.length} Ucapan`;

    rsvpWall.innerHTML = list.map(item => {
      let badgeBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
      if (item.status === "Ragu-ragu") badgeBg = "bg-amber-100 text-amber-800 border-amber-300";
      if (item.status === "Tidak Hadir") badgeBg = "bg-rose-100 text-rose-800 border-rose-300";

      const dateLabel = item.date || timeAgo(item.id);

      return `
        <div class="glass-card p-5 rounded-2xl border border-amber-400/20 shadow-sm transition hover:shadow-md">
          <div class="flex items-center justify-between gap-2 mb-2">
            <h4 class="font-serif-title font-bold text-emerald-950 text-base">${escapeHtml(item.name)}</h4>
            <span class="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border ${badgeBg}">
              ${escapeHtml(item.status)}
            </span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed mb-3">${escapeHtml(item.message)}</p>
          <div class="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
            <span><i data-lucide="users" class="w-3 h-3 inline mr-1"></i>${escapeHtml(item.guests || '1 Person')}</span>
            <span>${escapeHtml(dateLabel)}</span>
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  async function loadAndRenderRSVPs() {
    if (isRsvpApiConfigured()) {
      renderRSVPWallMessage('Memuat ucapan...');
    }

    const result = await fetchRemoteRSVPs();
    remoteRSVPs = result.data;

    if (!result.ok) {
      const msg = result.reason === 'not_configured'
        ? 'Buku tamu online belum aktif.'
        : 'Gagal memuat ucapan. Coba refresh halaman ya.';
      renderRSVPWallMessage(msg);
      return;
    }

    if (remoteRSVPs.length === 0) {
      renderRSVPWallMessage('Jadilah yang pertama memberi ucapan & doa!');
      return;
    }

    renderRSVPMessages(remoteRSVPs);
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSubmitBtn = rsvpForm ? rsvpForm.querySelector('button[type="submit"]') : null;

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const status = document.getElementById('rsvp-status').value;
      const guests = document.getElementById('rsvp-guests').value;
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name || !message) {
        showToast('Mohon isi nama dan ucapan Anda.');
        return;
      }

      if (!isRsvpApiConfigured()) {
        showToast('Buku tamu online belum aktif. Silakan kirim via WhatsApp ya!');
        return;
      }

      const originalBtnHtml = rsvpSubmitBtn ? rsvpSubmitBtn.innerHTML : '';
      if (rsvpSubmitBtn) {
        rsvpSubmitBtn.disabled = true;
        rsvpSubmitBtn.classList.add('opacity-60', 'cursor-not-allowed');
        rsvpSubmitBtn.innerHTML = '<span>Mengirim...</span>';
      }

      try {
        const res = await fetch(RSVP_API_URL, {
          method: 'POST',
          // text/plain menghindari CORS preflight yang tidak didukung Apps Script.
          // Isinya tetap JSON - dibaca manual lewat e.postData.contents di server.
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ name, status, guests, message })
        });
        const json = await res.json();

        if (!json || !json.ok) {
          throw new Error((json && json.error) || 'Gagal mengirim ucapan.');
        }

        remoteRSVPs.unshift({ id: json.id || Date.now(), name, status, guests, message });
        renderRSVPMessages(remoteRSVPs);
        rsvpForm.reset();
        showToast('Terima kasih! Ucapan Anda telah disimpan.');
      } catch (err) {
        console.warn('Gagal mengirim ucapan ke server:', err);
        showToast('Gagal mengirim. Coba lagi atau pakai tombol WhatsApp ya.');
      } finally {
        if (rsvpSubmitBtn) {
          rsvpSubmitBtn.disabled = false;
          rsvpSubmitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
          rsvpSubmitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  // WhatsApp RSVP Button Forwarding
  const btnRsvpWa = document.getElementById('btn-rsvp-wa');
  if (btnRsvpWa) {
    btnRsvpWa.addEventListener('click', () => {
      const name = document.getElementById('rsvp-name').value.trim() || currentGuestName;
      const status = document.getElementById('rsvp-status').value;
      const guests = document.getElementById('rsvp-guests').value;
      const message = document.getElementById('rsvp-message').value.trim() || 'Selamat atas pernikahan Faiz & Fatimah!';

      const waMessage = `Halo Faiz %26 Fatimah,%0A%0ASaya *${encodeURIComponent(name)}* mengonfirmasi bahwa saya *${encodeURIComponent(status)}* (Jumlah: ${encodeURIComponent(guests)}).%0A%0AUcapan %26 Doa:%0A"${encodeURIComponent(message)}"%0A%0ATerima kasih!`;
      
      const waNumber = "6285890766221"; // Mempelai WhatsApp Number
      window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
    });
  }

  loadAndRenderRSVPs();


  // ------------------------------------------------------------------------
  // 8. HOST HELPER: GUEST LINK GENERATOR MODAL & ADMIN MODE
  // ------------------------------------------------------------------------
  const generatorModal = document.getElementById('generator-modal');
  const btnOpenGenerator = document.getElementById('btn-open-generator');
  const btnCloseGenerator = document.getElementById('btn-close-generator');
  
  const genGuestNameInput = document.getElementById('gen-guest-name');
  const genGuestPhoneInput = document.getElementById('gen-guest-phone');
  const genResultUrl = document.getElementById('gen-result-url');
  const genResultWaText = document.getElementById('gen-result-wa-text');
  
  const btnCopyGenUrl = document.getElementById('btn-copy-gen-url');
  const btnShareGenWa = document.getElementById('btn-share-gen-wa');

  // ADMIN MODE CHECK: Only reveal generator button if URL parameter has ?admin=true / ?mode=admin / ?admin=1
  function checkAdminMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.has('admin') || 
                    urlParams.get('mode') === 'admin' || 
                    urlParams.get('admin') === 'true' || 
                    urlParams.get('to') === 'admin';

    if (isAdmin && btnOpenGenerator) {
      btnOpenGenerator.classList.remove('hidden');
    }
  }
  checkAdminMode();

  function updateGeneratorFields() {
    const nameVal = genGuestNameInput ? (genGuestNameInput.value.trim() || 'Budi Suryana') : 'Budi Suryana';
    const baseUrl = window.location.origin + window.location.pathname;
    const generatedUrl = `${baseUrl}?to=${encodeURIComponent(nameVal)}`;

    const waTemplate = `Assalamu'alaikum Wr. Wb. / Yth. Bapak/Ibu/Saudara/i *${nameVal}*,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Pernikahan kami (Faiz & Fatimah).

Berikut link undangan digital kami:
${generatedUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima Kasih.
Wassalamu'alaikum Wr. Wb.`;

    if (genResultUrl) genResultUrl.value = generatedUrl;
    if (genResultWaText) genResultWaText.value = waTemplate;
  }

  if (btnOpenGenerator && generatorModal) {
    btnOpenGenerator.addEventListener('click', () => {
      generatorModal.classList.remove('hidden');
      updateGeneratorFields();
    });
  }

  if (btnCloseGenerator && generatorModal) {
    btnCloseGenerator.addEventListener('click', () => {
      generatorModal.classList.add('hidden');
    });
  }

  if (genGuestNameInput) {
    genGuestNameInput.addEventListener('input', updateGeneratorFields);
  }

  if (genGuestPhoneInput) {
    genGuestPhoneInput.addEventListener('input', updateGeneratorFields);
  }

  if (btnCopyGenUrl) {
    btnCopyGenUrl.addEventListener('click', () => {
      if (genResultUrl && genResultUrl.value) {
        copyToClipboard(genResultUrl.value, 'Link Undangan');
      }
    });
  }

  if (btnShareGenWa) {
    btnShareGenWa.addEventListener('click', () => {
      if (genResultWaText && genResultWaText.value) {
        const text = encodeURIComponent(genResultWaText.value);
        let rawPhone = genGuestPhoneInput ? genGuestPhoneInput.value.trim() : '';
        
        // Clean phone number (replace leading 0 with 62)
        if (rawPhone) {
          rawPhone = rawPhone.replace(/\D/g, ''); // remove non-digits
          if (rawPhone.startsWith('0')) {
            rawPhone = '62' + rawPhone.slice(1);
          }
        }

        if (rawPhone) {
          // Send directly to guest's WhatsApp number
          window.open(`https://wa.me/${rawPhone}?text=${text}`, '_blank');
        } else {
          // Open general WhatsApp share sheet
          window.open(`https://wa.me/?text=${text}`, '_blank');
        }
      }
    });
  }


  // ------------------------------------------------------------------------
  // 9. INITIALIZE LIBRARIES (LUCIDE & AOS)
  // ------------------------------------------------------------------------
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }

});
