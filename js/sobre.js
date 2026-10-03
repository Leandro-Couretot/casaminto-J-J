/* Animación del sobre: al tocar el sello se rompe, se abre la solapa y el sobre
 * se funde directo con la invitación (la carta solo asoma un poco para mostrar lo que hay adentro). */
(() => {
  const stage  = document.getElementById('stage');
  const seal   = document.getElementById('seal');
  const invite = document.getElementById('invite');
  const skip   = document.getElementById('skip');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;

  function reveal() {
    invite.classList.add('visible');
    invite.removeAttribute('aria-hidden');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    stage.classList.add('enter', 'gone');   // el sobre se acerca y se desvanece
    stage.setAttribute('aria-hidden', 'true');
  }

  function openEnvelope() {
    if (started) return;
    started = true;
    seal.disabled = true;
    if (window.Musica) window.Musica.play();   // el toque habilita el audio

    if (reduce) { reveal(); return; }

    stage.classList.add('breaking');                       // se rompe el sello
    setTimeout(() => stage.classList.add('open'),   350);   // se abre la solapa
    setTimeout(() => stage.classList.add('rising'), 950);   // la carta asoma: se ve lo que hay adentro
    setTimeout(reveal,                             2150);   // pasa directo a la invitación
  }

  seal.addEventListener('click', openEnvelope);
  skip.addEventListener('click', () => {
    if (started) return;
    started = true;
    if (window.Musica) window.Musica.play();
    reveal();
  });
})();
