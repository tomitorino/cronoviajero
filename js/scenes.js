// Escenas fuera del nivel: título, mapa temporal (hub), epílogo y hoja de sprites (debug).
(function () {
  const CV = window.CV, W = CV.W, H = CV.H;
  const sfx = n => CV.audio.sfx(n);
  const R = CV.rng(42), STARS = []; for (let i = 0; i < 90; i++) STARS.push([R() * W | 0, R() * H | 0, R()]);
  function space(g, t, c1, c2) {
    for (let y = 0; y < H; y += 8) { g.fillStyle = CV.hexLerp(c1, c2, y / H); g.fillRect(0, y, W, 8); }
    for (const s of STARS) { if ((s[2] * 10 + t * 2) % 3 < 2.6) { g.fillStyle = s[2] > .7 ? '#f4f4f4' : '#566c86'; g.fillRect(s[0], s[1], 1, 1); } }
  }

  // ---------- título ----------
  const Title = CV.Title = {
    enter() { this.t = 0; this.sel = 0; this.opts = CV.save.exists() ? ['CONTINUAR', 'NUEVA PARTIDA', 'VER LA INTRO'] : ['NUEVA PARTIDA']; this.confirm = false; CV.audio.play(CV.music.hub, .85); },
    update(dt) {
      const In = CV.input; this.t += dt;
      if (In.pressed('up', 'down')) { this.sel = (this.sel + (In.pressed('up') ? this.opts.length - 1 : 1)) % this.opts.length; this.confirm = false; sfx('move'); }
      if (In.pressed('ok', 'attack')) {
        sfx('select');
        const o = this.opts[this.sel];
        if (o === 'NUEVA PARTIDA' && CV.save.exists() && !this.confirm) { this.confirm = true; return; }
        if (o === 'VER LA INTRO') { CV.setScene(CV.Cutscene, { id: 'intro', next: CV.Title }); return; }
        if (o === 'NUEVA PARTIDA') { CV.save.reset(); CV.save.write(); CV.setScene(CV.Cutscene, { id: 'intro' }); return; }
        CV.setScene(CV.Hub);
      }
    },
    draw(g) {
      const t = this.t; space(g, t, '#0d1021', '#3a1e4d');
      CV.drawPortal(g, 300, 150, t); CV.drawPortal(g, 78, 142, t + 1.3);
      const hx = 78 + ((t * 40) % 300), arc = Math.sin(((t * 40) % 300) / 300 * 3.14) * 46;
      CV.spr(g, 'hero', 'jump0', hx, 112 - arc, { scale: 2, rot: t * 2 });
      CV.text(g, 'CRONOVIAJERO', W / 2 + 2, 30, { align: 'center', scale: 4, color: '#5d275d', shadow: false });
      CV.text(g, 'CRONOVIAJERO', W / 2, 28, { align: 'center', scale: 4, color: '#ffcd75', shadow: '#b13e53' });
      CV.text(g, 'Y LA MÁQUINA DEL TIEMPO FUERA DE GARANTÍA', W / 2, 66, { align: 'center', color: '#73eff7' });
      this.opts.forEach((o, i) => CV.text(g, (this.sel === i ? '→ ' : '  ') + o, W / 2, (this.opts.length > 2 ? 148 : 158) + i * 13, { align: 'center', color: this.sel === i ? '#f4f4f4' : '#566c86' }));
      if (this.confirm) CV.text(g, '¿BORRAR EL PROGRESO? ENTER DE NUEVO PARA CONFIRMAR', W / 2, 190, { align: 'center', color: '#e03c32' });
      else CV.text(g, 'MOVER: FLECHAS/WASD  SALTO: ESPACIO  ATAQUE: X', W / 2, 192, { align: 'center', color: '#566c86' }); CV.text(g, 'RODAR: C  ARMA: Q/E  PAUSA: ESC', W / 2, 203, { align: 'center', color: '#566c86' });
    }
  };

  // ---------- mapa temporal ----------
  const ROWS = { europa: 0, asia: 1, norteamerica: 2, latam: 3 };
  function layout() {
    const pos = {}, idx = {};
    for (const s of CV.timeline.stages) {
      const i = idx[s.branch] = (idx[s.branch] === undefined ? 0 : idx[s.branch] + 1);
      if (s.branch === 'tronco') pos[s.id] = { x: 22 + i * 30, y: 100 };
      else if (s.branch === 'final') pos[s.id] = { x: 302 + i * 30, y: 100 };
      else pos[s.id] = { x: 124 + i * 34, y: 52 + ROWS[s.branch] * 32 };
    }
    return pos;
  }
  const Hub = CV.Hub = {
    enter() {
      CV.audio.play(CV.music.hub); this.t = 0; this.msg = null; this.pos = layout();
      const sd = CV.save.data, P = CV.progress, st = CV.timeline.stages;
      const open = st.find(s => P.status(s) === 'open');
      this.cur = (sd.cursor && this.pos[sd.cursor]) ? sd.cursor : (open || st[0]).id;
      if (open && P.status(st.find(s => s.id === this.cur)) === 'done' && sd.justDone !== this.cur) this.cur = this.cur;
    },
    stage() { return CV.timeline.stages.find(s => s.id === this.cur); },
    nav(dx, dy) {
      const c = this.pos[this.cur]; let best = null, bs = 1e9;
      for (const id in this.pos) {
        if (id === this.cur) continue; const q = this.pos[id], ex = q.x - c.x, ey = q.y - c.y;
        if (dx && Math.sign(ex) !== dx) continue; if (dy && Math.sign(ey) !== dy) continue;
        const sc = dx ? Math.abs(ex) + Math.abs(ey) * 3 : Math.abs(ey) + Math.abs(ex) * 3;
        if (sc < bs) { bs = sc; best = id; }
      }
      if (best) { this.cur = best; this.msg = null; sfx('move'); }
    },
    update(dt) {
      const In = CV.input, P = CV.progress; this.t += dt;
      if (In.pressed('left')) this.nav(-1, 0); if (In.pressed('right')) this.nav(1, 0);
      if (In.pressed('up')) this.nav(0, -1); if (In.pressed('down')) this.nav(0, 1);
      if (In.pressed('pause', 'back')) { sfx('select'); CV.setScene(CV.Title); return; }
      if (In.pressed('ok', 'attack')) {
        const s = this.stage(), stt = P.status(s);
        if (stt === 'open' || stt === 'done') { CV.save.data.cursor = s.id; CV.save.write(); sfx('portal'); CV.setScene(CV.Game, { id: s.id }); }
        else { sfx('empty'); this.msg = stt === 'soon' ? 'PRÓXIMAMENTE: ESTA ETAPA TODAVÍA NO EXISTE (EN ESTA LÍNEA TEMPORAL)' : s.branch === 'final' ? 'BLOQUEADA: NECESITÁS ' + P.needPieces() + ' PIEZAS DE LA MÁQUINA' : 'BLOQUEADA: COMPLETÁ ANTES LAS ETAPAS ANTERIORES'; }
      }
    },
    draw(g) {
      const t = this.t, P = CV.progress, tl = CV.timeline, pos = this.pos;
      space(g, t, '#0d1021', '#1b1d3a');
      g.fillStyle = 'rgba(86,108,134,.14)'; for (let x = 0; x < W; x += 16) g.fillRect(x, 26, 1, 138); for (let y = 26; y < 166; y += 16) g.fillRect(0, y, W, 1);
      CV.text(g, 'MAPA TEMPORAL', 8, 6, { scale: 2, color: '#ffcd75' });
      const pcs = P.pieces(), have = pcs.filter(x => x.have).length;
      CV.text(g, 'PIEZAS', W - 62, 5, { align: 'right', color: '#94b0c2' });
      pcs.forEach((pc, i) => { const x = W - 56 + i * 13, c = tl.branches[pc.branch].color; g.fillStyle = '#1a1c2c'; g.fillRect(x, 3, 11, 11); g.fillStyle = pc.have ? c : '#333c57'; g.fillRect(x + 1, 4, 9, 9); if (pc.have) CV.text(g, '★', x + 3, 5, { color: '#1a1c2c', shadow: false }); });
      CV.text(g, have + '/4 (TRAMO FINAL: ' + P.needPieces() + ')', W - 6, 16, { align: 'right', color: '#566c86' });
      // rieles
      const rail = (a, b, col) => { CV.line(g, a.x, a.y, b.x, b.y, '#1a1c2c', 4); CV.line(g, a.x, a.y, b.x, b.y, col, 2); };
      const by = b => tl.stages.filter(s => s.branch === b);
      const tr = by('tronco'), fi = by('final');
      for (let i = 0; i < tr.length - 1; i++) rail(pos[tr[i].id], pos[tr[i + 1].id], tl.branches.tronco.color);
      for (let i = 0; i < fi.length - 1; i++) rail(pos[fi[i].id], pos[fi[i + 1].id], tl.branches.final.color);
      for (const b of tl.regions) {
        const l = by(b), col = tl.branches[b].color;
        rail(pos[tr[tr.length - 1].id], pos[l[0].id], col); rail(pos[l[l.length - 1].id], pos[fi[0].id], col);
        for (let i = 0; i < l.length - 1; i++) rail(pos[l[i].id], pos[l[i + 1].id], col);
        CV.text(g, tl.branches[b].name, pos[l[0].id].x + 10, pos[l[0].id].y - 14, { color: col });
        // pulso de "flujo temporal"
        const u = (t * .25 + ROWS[b] * .2) % 1, a = pos[l[0].id], z = pos[l[l.length - 1].id]; g.fillStyle = '#f4f4f4'; g.fillRect(Math.round(a.x + (z.x - a.x) * u), a.y - 1, 2, 2);
      }
      CV.text(g, 'TRONCO', 8, 80, { color: tl.branches.tronco.color }); CV.text(g, 'FINAL', 318, 80, { color: tl.branches.final.color });
      // nodos
      for (const s of tl.stages) {
        const q = pos[s.id], stt = P.status(s), col = tl.branches[s.branch].color, x = q.x, y = q.y;
        g.fillStyle = '#1a1c2c'; g.fillRect(x - 6, y - 6, 12, 12);
        if (stt === 'done') { g.fillStyle = '#ffcd75'; g.fillRect(x - 5, y - 5, 10, 10); CV.text(g, '✓', x - 3, y - 4, { color: '#1a1c2c', shadow: false }); }
        else if (stt === 'open') { g.fillStyle = Math.floor(t * 4) % 2 ? '#f4f4f4' : col; g.fillRect(x - 5, y - 5, 10, 10); g.fillStyle = col; g.fillRect(x - 3, y - 3, 6, 6); }
        else if (stt === 'locked') { g.fillStyle = '#566c86'; g.fillRect(x - 5, y - 5, 10, 10); g.fillStyle = '#1a1c2c'; g.fillRect(x - 2, y - 1, 5, 4); g.fillRect(x - 1, y - 3, 3, 1); g.fillRect(x - 1, y - 3, 1, 2); g.fillRect(x + 1, y - 3, 1, 2); }
        else { g.fillStyle = '#333c57'; g.fillRect(x - 5, y - 5, 10, 10); g.fillStyle = '#1a1c2c'; g.fillRect(x - 4, y - 4, 8, 8); CV.text(g, '?', x - 2, y - 3, { color: '#566c86', shadow: false }); }
        CV.text(g, s.code, x, y + 8, { align: 'center', color: stt === 'soon' ? '#333c57' : '#94b0c2' });
      }
      // cursor
      const c = pos[this.cur], bob = Math.floor(t * 3) % 2;
      g.fillStyle = '#f4f4f4'; for (const [dx, dy] of [[-8, -8], [5, -8], [-8, 5], [5, 5]]) { g.fillRect(c.x + dx, c.y + dy, 3, 1); g.fillRect(c.x + (dx < 0 ? dx : dx + 2), c.y + dy + (dy < 0 ? 0 : -2), 1, 3); }
      CV.spr(g, 'hero', bob ? 'walk0' : 'idle', c.x - 8, c.y - 24 - bob);
      // panel de información
      const s = this.stage(), stt = P.status(s), col = tl.branches[s.branch].color;
      CV.panel(g, 4, 166, W - 8, 47, '#1a1c2c', col);
      CV.text(g, s.code + ' ' + s.name, 10, 170, { color: col, shadow: false });
      CV.text(g, s.year, W - 10, 170, { align: 'right', color: '#94b0c2', shadow: false });
      if (this.msg) CV.wrap(this.msg, 60).forEach((l, i) => CV.text(g, l, 10, 182 + i * 10, { color: '#e03c32', shadow: false }));
      else CV.wrap(s.blurb, 60).slice(0, 2).forEach((l, i) => CV.text(g, l, 10, 181 + i * 10, { color: '#f4f4f4', shadow: false }));
      const label = { done: '✓ COMPLETADA - ENTER: REJUGAR', open: '→ ENTER: VIAJAR', locked: 'BLOQUEADA', soon: 'PRÓXIMAMENTE' }[stt];
      CV.text(g, label, 10, 203, { color: { done: '#ffcd75', open: '#a7f070', locked: '#566c86', soon: '#566c86' }[stt], shadow: false });
      const sd = CV.stages[s.id];
      if (sd) { const tot = CV.levelRows(sd.level).join('').split('c').length - 1, got = (CV.save.data.collect[s.id] || []).length; CV.text(g, 'JEFE: ' + s.boss + '   ' + got + '/' + tot, W - 10, 203, { align: 'right', color: '#94b0c2', shadow: false }); }
      else CV.text(g, 'JEFE: ' + s.boss, W - 10, 203, { align: 'right', color: '#566c86', shadow: false });
    }
  };

  // ---------- epílogo ----------
  CV.Ending = {
    // 'lines' puede ser una lista de líneas o una lista de páginas (listas de líneas)
    enter(arg) { this.t = 0; this.pages = Array.isArray(arg.lines[0]) ? arg.lines : [arg.lines]; this.pi = 0; this.lines = this.pages[0]; CV.audio.play(CV.music.hub, .8); },
    update(dt) { this.t += dt; if (this.t > 1.5 && CV.input.pressed('ok', 'attack')) { sfx('select'); if (this.pi < this.pages.length - 1) { this.lines = this.pages[++this.pi]; this.t = 0; } else CV.setScene(CV.Hub); } },
    draw(g) {
      const t = this.t; space(g, t, '#0d1021', '#3a1e4d'); CV.drawPortal(g, W / 2, 70, t);
      CV.spr(g, 'hero', 'idle', W / 2 - 16, 26 + Math.sin(t * 2) * 3, { scale: 2 });
      let y = 82;
      this.lines.forEach((l, i) => { if (t > .6 + i * .9) { CV.wrap(l, 58).forEach(w => { CV.text(g, w, W / 2, y, { align: 'center', color: i === 0 ? '#ffcd75' : '#f4f4f4' }); y += 10; }); y += 4; } else y += 14; });
      if (t > 1.5 && Math.floor(t * 2) % 2) CV.text(g, this.pi < this.pages.length - 1 ? 'ENTER: SEGUIR' : 'ENTER: VOLVER AL MAPA', W / 2, 207, { align: 'center', color: '#73eff7' });
    }
  };

  // ---------- hoja de sprites (index.html?sheet=1) ----------
  CV.Sheet = {
    enter() { this.page = 0; }, update() { if (CV.input.pressed('right', 'ok')) this.page++; if (CV.input.pressed('left')) this.page = Math.max(0, this.page - 1); },
    draw(g) {
      g.fillStyle = '#566c86'; g.fillRect(0, 0, W, H);
      const names = Object.keys(CV.spriteDefs); let x = 4, y = 4, rowH = 0, pg = 0;
      for (const n of names) {
        const s = CV.sprite(n), sc = s.h > 20 ? 2 : 2, w = s.w * sc + 4, h = s.h * sc + 4;
        if (x + w > W) { x = 4; y += rowH; rowH = 0; }
        if (y + h > H) { pg++; x = 4; y = 4; rowH = 0; }
        if (pg === this.page) CV.spr(g, n, 'idle', x, y, { scale: sc });
        x += w; rowH = Math.max(rowH, h);
      }
    }
  };
})();
