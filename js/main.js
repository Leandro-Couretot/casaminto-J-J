/* Datos configurables, pop ups, copiar al portapapeles y animaciones al hacer scroll */
(() => {
  const C = window.CONFIG;
  const VALORES = {
    alquilerNombre: C.alquilerAuto.nombre,
    alquilerCodigo: C.alquilerAuto.codigo,
    alquilerDetalle: C.alquilerAuto.detalle
  };

  // Datos bancarios: una tarjeta por cuenta, con alias y CBU copiables
  const cont = document.getElementById('banco-cuentas');
  if (cont) {
    C.banco.cuentas.forEach((cta) => {
      const bloque = document.createElement('div');
      bloque.className = 'cuenta';
      const campos = [['Alias', cta.alias, 'Copiar alias', ''], ['CBU', cta.cbu, 'Copiar CBU', ' cbu']];
      bloque.innerHTML = `<h4>${cta.titulo}</h4>` + campos.map(([et, val, txt, cls]) => `
        <div class="dato">
          <small>${et}</small>
          <strong class="${cls.trim()}">${val}</strong>
          <button class="btn" type="button" data-copy-text="${val}">${txt}</button>
        </div>`).join('');
      cont.appendChild(bloque);
    });
  }

  // Contacto de Kavaci Travel (WhatsApp, correo, Instagram)
  const cv = C.kavaci;
  if (cv) {
    const destinos = {
      whatsapp: 'https://wa.me/' + cv.whatsapp,
      correo: 'mailto:' + cv.correo,
      instagram: 'https://www.instagram.com/' + cv.instagram + '/'
    };
    document.querySelectorAll('[data-contacto]').forEach((a) => { a.href = destinos[a.dataset.contacto]; });
    const datos = document.getElementById('kavaci-datos');
    if (datos) {
      datos.innerHTML = [cv.telefono, cv.correo, '@' + cv.instagram].map((t) => '<span>' + t + '</span>').join('');
    }
  }

  // Links
  document.querySelectorAll('[data-link]').forEach((a) => {
    a.href = C.links[a.dataset.link] || '#';
  });

  // Textos configurables
  document.querySelectorAll('[data-text]').forEach((el) => {
    const v = VALORES[el.dataset.text];
    if (v) el.textContent = el.closest('.info') && el.tagName === 'STRONG' ? v + '.' : v;
  });

  // Pop ups
  document.querySelectorAll('[data-modal]').forEach((btn) => {
    btn.addEventListener('click', () => document.getElementById(btn.dataset.modal).showModal());
  });
  document.querySelectorAll('dialog.modal').forEach((dlg) => {
    dlg.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => dlg.close()));
    // Click en el fondo oscuro cierra el pop up
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  });

  // Copiar
  async function copiar(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch (_) {
      const t = document.createElement('textarea');
      t.value = texto;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { /* nada */ }
      t.remove();
      return ok;
    }
  }
  document.querySelectorAll('[data-copy], [data-copy-text]').forEach((btn) => {
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      const ok = await copiar(btn.dataset.copyText || VALORES[btn.dataset.copy]);
      btn.textContent = ok ? '¡Copiado!' : 'Copialo a mano';
      btn.classList.toggle('copiado', ok);
      setTimeout(() => { btn.textContent = original; btn.classList.remove('copiado'); }, 1800);
    });
  });

  // Si se toca el reproductor de Spotify, se pausa la música de fondo para que no suenen dos a la vez
  const spotify = document.getElementById('spotify');
  if (spotify) {
    // el reproductor usa la misma playlist que el botón (js/config.js → links.playlist)
    const pl = (C.links.playlist || '').match(/playlist\/([A-Za-z0-9]+)/);
    if (pl) spotify.src = 'https://open.spotify.com/embed/playlist/' + pl[1] + '?utm_source=generator&theme=0';
    window.addEventListener('blur', () => {
      setTimeout(() => {
        if (document.activeElement === spotify && window.Musica) window.Musica.pause();
      }, 0);
    });
  }

  // Aparición progresiva (una sola vez) + iconos que se animan solo mientras se ven
  const REVEAL = [
    '.sec:not(.portada) h2', '.lugar .fotos', '.t-sub', '.t-body', '.t-fecha', '.t-lugar',
    '.sec .btn', '.agenda', '.evt', '.dress .icono', '.gramofono', '.cierre .monograma'
  ].join(',');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.sec:not(.portada)').forEach((sec) => {
    let i = 0;
    sec.querySelectorAll(REVEAL).forEach((el) => {
      // evita animar dos veces un elemento dentro de otro ya animado
      if (el.parentElement.closest('.reveal')) return;
      el.classList.add('reveal');
      el.style.setProperty('--d', Math.min(i * 0.08, 0.24) + 's');
      i += 1;
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  const movibles = document.querySelectorAll('.anim, .anim-box');

  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach((el) => el.classList.add('shown'));
    movibles.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const ioReveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('shown');
      ioReveal.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach((el) => ioReveal.observe(el));

  const ioMove = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting));
  }, { threshold: 0.2 });
  movibles.forEach((el) => ioMove.observe(el));
})();
