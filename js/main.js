// Arranque: carga los archivos de etapa listados en data/timeline.js y corre el bucle principal.
(function () {
  const CV = window.CV, STEP = 1 / 60;
  const canvas = document.getElementById('game'), g = canvas.getContext('2d');
  g.imageSmoothingEnabled = false;
  function resize() {
    let s = Math.min(window.innerWidth / CV.W, window.innerHeight / CV.H); if (s >= 1) s = Math.floor(s);
    canvas.style.width = CV.W * s + 'px'; canvas.style.height = CV.H * s + 'px';
  }
  window.addEventListener('resize', resize); resize();

  CV.fadeT = 0;
  CV.setScene = function (sc, arg) { CV.scene = sc; CV.fadeT = .35; if (sc.enter) sc.enter(arg || {}); };
  function tick() {
    CV.input.update();
    if (CV.input.pressed('mute')) CV.audio.toggleMute();
    CV.scene.update(STEP);
    if (CV.fadeT > 0) CV.fadeT -= STEP;
  }
  function render() {
    g.imageSmoothingEnabled = false;
    CV.scene.draw(g);
    if (CV.fadeT > 0) { g.fillStyle = 'rgba(13,16,33,' + Math.min(1, CV.fadeT / .35) + ')'; g.fillRect(0, 0, CV.W, CV.H); }
    if (CV.audio.muted) CV.text(g, 'SIN SONIDO (M)', CV.W - 4, CV.H - 10, { align: 'right', color: '#566c86' });
  }
  let last = 0, acc = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    acc += Math.min(.1, (t - last) / 1000); last = t;
    let n = 0; while (acc >= STEP && n < 5) { tick(); acc -= STEP; n++; }
    if (n === 5) acc = 0;
    if (n) render();
  }
  // Para pruebas automatizadas: avanza n cuadros a mano.
  CV.step = n => { for (let i = 0; i < (n || 1); i++) tick(); render(); };

  function loadStages(cb) {
    const files = CV.timeline.stages.filter(s => s.file).map(s => s.file); let i = 0;
    (function next() {
      if (i >= files.length) return cb();
      const s = document.createElement('script'); s.src = 'data/stages/' + files[i++] + '.js';
      s.onload = next; s.onerror = () => { console.warn('No se pudo cargar', s.src); next(); };
      document.head.appendChild(s);
    })();
  }
  loadStages(() => {
    CV.save.load();
    const q = new URLSearchParams(location.search);
    if (q.get('sheet')) CV.setScene(CV.Sheet);
    else if (q.get('stage') && CV.stages[q.get('stage')]) CV.setScene(CV.Game, { id: q.get('stage'), edit: !!q.get('edit') });
    else CV.setScene(CV.Title);
    CV.ready = true;
    if (!q.get('manual')) requestAnimationFrame(frame);
  });
})();
