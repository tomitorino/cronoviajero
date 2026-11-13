// Audio 100% generado por código: efectos + secuenciador chiptune por pasos.
// Formato de música (en los datos): { bpm, drums:'k.h.s.h.', tracks:[{wave,vol,notes:'a4 _ c5 - ...'}] }
//   cada token = una semicorchea; 'c#4' nota, '_' prolonga la nota anterior, '-' silencio.
//   drums: k bombo, s redoblante, h hi-hat, '.' nada.
(function () {
  const CV = window.CV;
  const SFX = {
    jump: ['square', 280, 560, .12, .1], djump: ['square', 420, 840, .12, .09], roll: ['triangle', 220, 90, .15, .12],
    swing: ['noise', 0, 0, .08, .1, 1800], shoot: ['square', 700, 200, .1, .08], bang: ['noise', 0, 0, .28, .3, 500],
    rifle: ['noise', 0, 0, .14, .2, 900], laser: ['sawtooth', 1400, 300, .14, .08], hit: ['square', 220, 90, .07, .12],
    hurt: ['sawtooth', 300, 70, .3, .16], die: ['square', 400, 60, .3, .1], pick: ['square', 660, 1320, .1, .09],
    heal: ['triangle', 440, 880, .25, .16], weapon: ['square', 330, 990, .35, .1], portal: ['sine', 200, 1200, .8, .14],
    glitch: ['sawtooth', 90, 1800, .6, .12], roar: ['sawtooth', 140, 50, .6, .2], boom: ['noise', 0, 0, .35, .3, 300],
    select: ['square', 520, 780, .07, .07], move: ['square', 440, 440, .03, .05], talk: ['square', 600, 620, .025, .035],
    check: ['triangle', 520, 1040, .3, .14], empty: ['square', 120, 100, .06, .09], zap: ['sawtooth', 900, 120, .2, .1],
    coin: ['square', 990, 1480, .12, .08]
  };
  const NN = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  function freq(tok) {
    const m = /^([a-g])(#?)(\d)$/.exec(tok); if (!m) return 0;
    return 440 * Math.pow(2, (NN[m[1]] + (m[2] ? 1 : 0) + (+m[3] + 1) * 12 - 69) / 12);
  }
  const A = CV.audio = {
    ctx: null, muted: false, cur: null, speed: 1, step: 0, next: 0,
    init() {
      if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
      try {
        const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
        const c = this.ctx = new C();
        this.master = c.createGain(); this.master.gain.value = this.muted ? 0 : .7; this.master.connect(c.destination);
        this.mus = c.createGain(); this.mus.gain.value = .75; this.mus.connect(this.master);
        const n = c.sampleRate, buf = c.createBuffer(1, n, n), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        this.nbuf = buf;
        setInterval(() => this.tick(), 25);
      } catch (e) { this.ctx = null; }
    },
    toggleMute() { this.muted = !this.muted; if (this.master) this.master.gain.value = this.muted ? 0 : .7; },
    noise(t, d, v, fc, dest) {
      const c = this.ctx, src = c.createBufferSource(); src.buffer = this.nbuf;
      const f = c.createBiquadFilter(); f.type = fc > 1000 ? 'highpass' : 'lowpass'; f.frequency.value = fc;
      const g = c.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      src.connect(f); f.connect(g); g.connect(dest || this.master); src.start(t); src.stop(t + d + .02);
    },
    sfx(n) {
      const c = this.ctx; if (!c || this.muted || c.state !== 'running') return;
      const s = SFX[n]; if (!s) return; const t = c.currentTime;
      if (s[0] === 'noise') return this.noise(t, s[3], s[4], s[5]);
      const o = c.createOscillator(), g = c.createGain(); o.type = s[0];
      o.frequency.setValueAtTime(s[1], t); o.frequency.exponentialRampToValueAtTime(Math.max(20, s[2]), t + s[3]);
      g.gain.setValueAtTime(s[4], t); g.gain.exponentialRampToValueAtTime(.001, t + s[3]);
      o.connect(g); g.connect(this.master); o.start(t); o.stop(t + s[3] + .02);
    },
    tone(f, t, d, w, v) {
      const c = this.ctx, o = c.createOscillator(), g = c.createGain(); o.type = w; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(v, t + .008);
      g.gain.setValueAtTime(v * .75, t + d * .6); g.gain.linearRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(this.mus); o.start(t); o.stop(t + d + .02);
    },
    kick(t) {
      const c = this.ctx, o = c.createOscillator(), g = c.createGain(); o.type = 'sine';
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + .1);
      g.gain.setValueAtTime(.3, t); g.gain.exponentialRampToValueAtTime(.001, t + .12);
      o.connect(g); g.connect(this.mus); o.start(t); o.stop(t + .14);
    },
    play(m, speed) {
      speed = speed || 1;
      if (!m) { this.cur = null; return; }
      if (this.cur === m && this.speed === speed) return;
      const same = this.cur === m;
      this.cur = m; this.speed = speed;
      if (!same) { this.step = 0; this.next = 0; }
      if (!m._p) m._p = m.tracks.map(tr => ({ wave: tr.wave || 'square', vol: tr.vol || .05, n: tr.notes.trim().split(/\s+/) }));
    },
    stop() { this.cur = null; },
    tick() {
      const c = this.ctx, m = this.cur; if (!c || !m || c.state !== 'running') return;
      if (this.next < c.currentTime) this.next = c.currentTime + .03;
      const sd = 60 / m.bpm / 4 / this.speed;
      while (this.next < c.currentTime + .12) {
        for (const tr of m._p) {
          const L = tr.n.length, tok = tr.n[this.step % L];
          if (tok === '-' || tok === '_') continue;
          let len = 1; while (tr.n[(this.step + len) % L] === '_' && len < 16) len++;
          const f = freq(tok); if (f) this.tone(f, this.next, sd * len * .92, tr.wave, tr.vol);
        }
        if (m.drums) {
          const ch = m.drums[this.step % m.drums.length];
          if (ch === 'k') this.kick(this.next); else if (ch === 's') this.noise(this.next, .09, .09, 1500, this.mus); else if (ch === 'h') this.noise(this.next, .03, .035, 6000, this.mus);
        }
        this.step++; this.next += sd;
      }
    }
  };
})();
