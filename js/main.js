/* Datos configurables, pop ups, copiar al portapapeles y animaciones al hacer scroll */
(() => {
  const C = window.CONFIG;
  const VALORES = {
    alquilerNombre: C.alquilerAuto.nombre,
    alquilerCodigo: C.alquilerAuto.codigo,
    bancoAlias: C.banco.alias
  };

  // Links
  document.querySelectorAll('[data-link]').forEach((a) => {
    a.href = C.links[a.dataset.link] || '#';
  });

  // Textos configurables
  document.querySelectorAll('[data-text]').forEach((el) => {
    const v = VALORES[el.dataset.text];
    if (v) el.textContent = el.closest('.info') ? v + '.' : v;
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
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      const ok = await copiar(VALORES[btn.dataset.copy]);
      btn.textContent = ok ? '¡Copiado!' : 'Copialo a mano';
      btn.classList.toggle('copiado', ok);
      setTimeout(() => { btn.textContent = original; btn.classList.remove('copiado'); }, 1800);
    });
  });

  // Animaciones al entrar en pantalla
  const items = document.querySelectorAll('.anim, .reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting));
    }, { threshold: 0.25 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in-view'));
  }
})();
