/* Música de fondo (YouTube IFrame API).
 * Arranca cuando se toca el sello del sobre (el navegador exige un toque del usuario).
 * Expone window.Musica.play(). El botón redondo silencia / reactiva. */
(() => {
  const cfg = (window.CONFIG && window.CONFIG.musica) || {};
  const btn = document.getElementById('musica');
  window.Musica = { play() {}, toggle() {}, pause() {} };
  if (!cfg.videoId || !btn) return;

  let player = null;
  let listo = false;
  let quiereSonar = false;
  let sonando = false;
  let fade = null;

  btn.hidden = false;

  function marcar(v) {
    sonando = v;
    btn.classList.toggle('suena', v);
  }

  function subirVolumen() {
    clearInterval(fade);
    let vol = 0;
    const meta = cfg.volumen || 55;
    player.setVolume(0);
    fade = setInterval(() => {
      vol = Math.min(meta, vol + 5);
      player.setVolume(vol);
      if (vol >= meta) clearInterval(fade);
    }, 120);
  }

  function arrancar() {
    try {
      player.playVideo();
      subirVolumen();
      marcar(true);
    } catch (_) { /* nada */ }
  }

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player('yt-player', {
      width: 200,
      height: 200,
      videoId: cfg.videoId,
      playerVars: {
        controls: 0, disablekb: 1, fs: 0, rel: 0, modestbranding: 1,
        playsinline: 1, loop: 1, playlist: cfg.videoId, start: cfg.inicio || 0
      },
      events: {
        onReady() { listo = true; if (quiereSonar) arrancar(); },
        onStateChange(e) {
          if (e.data === YT.PlayerState.ENDED) player.playVideo();
          if (e.data === YT.PlayerState.PLAYING) marcar(true);
          if (e.data === YT.PlayerState.PAUSED) marcar(false);
        },
        // video privado, sin permiso de reproducción incrustada, etc.
        onError() { btn.hidden = true; }
      }
    });
  };

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.async = true;
  tag.onerror = () => { btn.hidden = true; };
  document.head.appendChild(tag);

  window.Musica = {
    play() {
      quiereSonar = true;
      if (listo) arrancar();
    },
    pause() {
      quiereSonar = false;
      if (listo && sonando) { player.pauseVideo(); marcar(false); }
    },
    toggle() {
      if (!listo) { quiereSonar = !quiereSonar; return; }
      if (sonando) { player.pauseVideo(); marcar(false); } else { arrancar(); }
    }
  };

  btn.addEventListener('click', () => window.Musica.toggle());
})();
