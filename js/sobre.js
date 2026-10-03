/* Animación del sobre: al tocar el sello se abre y la carta revela la invitación */
(() => {
  const stage  = document.getElementById('stage');
  const seal   = document.getElementById('seal');
  const letter = document.getElementById('letter');
  const invite = document.getElementById('invite');
  const skip   = document.getElementById('skip');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;

  function reveal() {
    invite.classList.add('visible');
    invite.removeAttribute('aria-hidden');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    stage.classList.add('gone');
    stage.setAttribute('aria-hidden', 'true');
  }

  // La carta crece hasta cubrir toda la pantalla
  function grow() {
    const r   = letter.getBoundingClientRect();
    const ty0 = new DOMMatrix(getComputedStyle(letter).transform).m42;
    const vw  = innerWidth, vh = innerHeight;
    const s   = Math.max(vw / r.width, vh / r.height) * 1.04;
    const dx  = vw / 2 - (r.left + r.width / 2);
    const dy  = vh / 2 - (r.top + r.height / 2);

    stage.classList.add('grow');
    letter.style.transitionDuration = '.9s';
    letter.style.transform = `translate(${dx}px, ${ty0 + dy}px) scale(${s})`;
  }

  function openEnvelope() {
    if (started) return;
    started = true;
    seal.disabled = true;

    if (reduce) { reveal(); return; }

    stage.classList.add('breaking');                         // se rompe el sello
    setTimeout(() => stage.classList.add('open'),    350);   // se abre la solapa
    setTimeout(() => stage.classList.add('rising'), 1350);   // sube la carta
    setTimeout(grow,                                2550);   // la carta llena la pantalla
    setTimeout(reveal,                              3450);   // aparece la invitación
  }

  seal.addEventListener('click', openEnvelope);
  skip.addEventListener('click', () => { started = true; reveal(); });
})();
