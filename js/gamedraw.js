// Render de la escena de juego: mundo, entidades, efectos, HUD retro, diálogos y overlays.
(function () {
  const CV = window.CV, G = CV.Game, T = 16, W = CV.W, H = CV.H;

  CV.drawPortal = function (g, x, y, t) {
    const cols = ['#1a1c2c', '#5d275d', '#6a4c93', '#b78cff', '#73eff7', '#f4f4f4'];
    for (let r = 14, i = 0; r > 0; r -= 2, i++) {
      g.fillStyle = cols[(i + Math.floor(t * 8)) % cols.length];
      const ry = r * 1.5;
      for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(Math.sqrt(1 - (dy * dy) / (ry * ry)) * r); g.fillRect(Math.round(x - w), Math.round(y - 22 + dy), w * 2, 1); }
    }
    for (let i = 0; i < 6; i++) { const a = t * 3 + i * 1.047; g.fillStyle = i % 2 ? '#73eff7' : '#f4f4f4'; g.fillRect(Math.round(x + Math.cos(a) * 17), Math.round(y - 22 + Math.sin(a) * 25), 2, 2); }
  };

  function drawEnemy(g, e, t) {
    const d = e.def, sc = d.scale || 1, s = CV.sprite(d.sprite);
    let fr = 'idle';
    if (Math.abs(e.vx) > 4 || d.ai === 'flyer') fr = CV.animFrame(d.sprite, 'walk', e.t * (d.animSpeed || 8));
    const warn = e.state === 'tele' || e.state === 'fuse' || e.tele || e.hopT > 0;
    const ox = warn ? (Math.random() * 3 | 0) - 1 : 0;
    const white = e.flash > 0 || (e.state === 'fuse' && Math.floor(e.t * 16) % 2 === 0);
    const x = e.x + e.w / 2 - s.w * sc / 2 + ox, y = e.y + e.h - s.h * sc;
    if (e.pdx) { CV.spr(g, d.sprite, fr, x + (Math.floor(t * 14) % 3) - 1, y, { flip: e.face < 0, white: true, scale: sc, alpha: .35 }); }
    CV.spr(g, d.sprite, fr, x, y, { flip: e.face < 0, white, scale: sc });
    if (warn) CV.text(g, '!', e.x + e.w / 2 - 2, y - 10, { color: '#ffe14a' });
    if (e.dizzy > 0) CV.text(g, '*', e.x + e.w / 2 - 2 + Math.sin(t * 10) * 5, y - 8, { color: '#ffe14a' });
    if (d.mini) {
      const bw = 28, bx = Math.round(e.x + e.w / 2 - bw / 2), by = Math.round(y - 6);
      g.fillStyle = '#1a1c2c'; g.fillRect(bx - 1, by - 1, bw + 2, 4); g.fillStyle = '#e03c32'; g.fillRect(bx, by, Math.max(0, bw * e.hp / d.hp), 2);
    }
  }
  function drawBoss(g, b, t) {
    const d = b.def, sc = d.scale || 2, s = CV.sprite(d.sprite);
    let fr = 'idle';
    if (b.state !== 'idle' && s.anims.a) fr = 'a0';
    else if (s.anims.walk && b.state === 'idle') fr = CV.animFrame(d.sprite, 'walk', b.anim * 5);
    const tele = (b.state === 'charge' && b.st < (b.a.tele || .7)) || (b.state === 'jump' && b.sub === 0) || b.dying;
    const ox = tele ? (Math.random() * 5 | 0) - 2 : 0;
    if (b.fake) { if (!(b.fkA > .02)) return; g.globalAlpha = b.fkA; }
    const white = b.flash > 0 || (b.inv > 0 && !b.fake && Math.floor(t * 20) % 2 === 0) || (b.dying && Math.floor(t * 14) % 2 === 0);
    if (!s.bnd) { // filas realmente dibujadas del sprite, para alinear el dibujo con la caja de golpe
      const c = s.frames.idle.c, px = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let top = c.height, bot = -1;
      for (let yy = 0; yy < c.height; yy++) for (let xx = 0; xx < c.width; xx++) if (px[(yy * c.width + xx) * 4 + 3]) { if (yy < top) top = yy; bot = yy; break; }
      s.bnd = bot < 0 ? { top: 0, bot: c.height - 1 } : { top, bot };
    }
    // voladores: el dibujo va centrado en la caja; de piso: los pies del dibujo sobre el borde inferior de la caja
    const x = b.x + b.w / 2 - s.w * sc / 2 + ox + (d.offX || 0) * b.face, y = (d.mode === 'hover' ? b.y + b.h / 2 - (s.bnd.top + s.bnd.bot + 1) / 2 * sc : b.y + b.h - (s.bnd.bot + 1) * sc) + (d.offY || 0);
    CV.spr(g, d.sprite, fr, x, y, { flip: b.face < 0, white, scale: sc });
    g.globalAlpha = 1;
    if (b.shield && !b.dying) { // escudo anti-balas: aro que parpadea cuando está por caerse
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2, rx = b.w / 2 + 9, ry = b.h / 2 + 9, blink = b.shT < 1 && Math.floor(t * 10) % 2;
      if (!blink) { g.strokeStyle = '#73eff7'; g.lineWidth = 2; g.globalAlpha = .55 + .25 * Math.sin(t * 6); g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); g.stroke(); g.globalAlpha = .12; g.fillStyle = '#73eff7'; g.fill(); g.globalAlpha = 1; }
    }
    if (tele && !b.dying) CV.text(g, '!', b.x + b.w / 2 - 5, b.y - 16, { color: '#ffe14a', scale: 2 });
    if (b.vuln || b.stun > 0) for (let i = 0; i < 3; i++) CV.text(g, '★', b.x + b.w / 2 - 3 + Math.cos(t * 5 + i * 2.1) * 16, b.y - 6 + Math.sin(t * 5 + i * 2.1) * 4, { color: '#ffe14a' });
  }
  function drawPlayer(g, p, t) {
    if (p.inv > 0 && !p.dead && p.rollT <= 0 && Math.floor(t * 24) % 2) return;
    const x = p.x - 3, y = p.y - 2; let fr = 'idle', rot = 0;
    if (p.dead) rot = p.dead * 12;
    else if (p.rollT > 0) rot = p.face * (.34 - p.rollT) * 24;
    else if (p.atkT > 0) fr = 'attack0';
    else if (!p.onGround) fr = 'jump0';
    else if (Math.abs(p.vx) > 12) fr = CV.animFrame('hero', 'walk', p.anim * 11);
    CV.spr(g, 'hero', fr, x, y, { flip: p.face < 0, rot });
    if (rot) return;
    const w = CV.weapons[p.weapons[p.wi]], hx = Math.round(p.x + 5 + p.face * 4), hy = Math.round(p.y + 8), k = p.atkT > 0 ? 1 - p.atkT / .16 : -1;
    let ang = 0, off = 0;
    if (w.type === 'melee') { if (w.thrust) { ang = 0; off = k >= 0 ? Math.sin(k * 3.14) * 7 : -3; } else ang = k >= 0 ? -1.4 + k * 2.2 : -1.0; }
    else off = k >= 0 ? -2 : 0;
    g.save(); g.translate(hx, hy); g.scale(p.face, 1); g.rotate(ang); g.drawImage(CV.sprite(w.spr).frames.idle.c, -3 + off, -4); g.restore();
    const s = G.swing;
    if (s && !s.thrust) {
      const kk = 1 - s.t / .14; g.fillStyle = '#ffffff';
      for (let i = 0; i < 7; i++) { const a = -1.3 + kk * 2.0 * (i / 6); g.globalAlpha = .3 + .7 * (i / 6); g.fillRect(Math.round(hx + Math.cos(a) * (s.reach - 2) * s.face), Math.round(hy + Math.sin(a) * (s.reach - 2)), 2, 2); }
      g.globalAlpha = 1;
    }
  }
  function drawProj(g, q, t) {
    if (q.delay > 0) {
      if (Math.floor(t * 12) % 2) CV.text(g, '!', q.x - 2, q.floorY - 12, { color: '#e03c32' });
      g.fillStyle = 'rgba(26,28,44,.5)'; g.fillRect(Math.round(q.x - 5), q.floorY - 2, 10, 2); return;
    }
    const x = Math.round(q.x), y = Math.round(q.y);
    if (q.spr) { const s = CV.sprite(q.spr); CV.spr(g, q.spr, 'idle', q.x - s.w / 2, q.y - s.h / 2, { flip: q.vx < 0 && !q.spin, rot: q.spin ? t * 12 : 0 }); return; }
    if (q.wave) { g.fillStyle = q.col; g.fillRect(x - 3, y - 5, 6, 10); g.fillStyle = 'rgba(244,244,244,.5)'; g.fillRect(x - 5, y - 1, 10, 6); return; }
    g.fillStyle = q.col; g.fillRect(x - (q.w >> 1), y - (q.h >> 1), q.w, q.h);
    if (q.col2) { g.fillStyle = q.col2; g.fillRect(x - (q.w >> 1) + 1, y - (q.h >> 1) + (q.h > 2 ? 1 : 0), Math.max(1, q.w - 2), Math.max(1, q.h - 2)); }
  }
  function drawLine(g, l, t) {
    const dx = l.x2 - l.x1, dy = l.y2 - l.y1, len = Math.sqrt(dx * dx + dy * dy) || 1;
    if (l.t < l.warn) {
      const blink = l.warn - l.t < .3 ? Math.floor(t * 30) % 2 : 1; if (!blink) return;
      for (let s = 0; s < len; s += 3) {
        const on = (Math.floor(s / 6) + Math.floor(t * 8)) % 2, x = Math.round(l.x1 + dx * s / len), y = Math.round(l.y1 + dy * s / len);
        g.fillStyle = '#1a1c2c'; g.fillRect(x - 2, y - 2, 5, 5);
        g.fillStyle = on ? l.col : '#ffffff'; g.fillRect(x - 1, y - 1, 3, 3);
      }
    } else {
      CV.line(g, l.x1, l.y1, l.x2, l.y2, l.col, l.thick + 2); CV.line(g, l.x1, l.y1, l.x2, l.y2, '#ffffff', Math.max(1, l.thick - 3));
      if (l.label) CV.text(g, l.label, l.x1 + dx / 2, l.y1 + dy / 2 - 12, { align: 'center', color: '#ffffff' });
    }
  }
  function drawPickup(g, k, t) {
    const bob = k.float ? Math.sin(k.t * 3) * 2 : 0, x = k.x, y = k.y + bob;
    if (k.type === 'weapon') {
      if (k.rift) for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? '#ff77a8' : '#73eff7'; g.fillRect(Math.round(x - 12 + Math.random() * 20), Math.round(y - 9 + Math.random() * 16), 4, 1); }
      CV.panel(g, Math.round(x - 11), Math.round(y - 7), 22, 14, k.rift ? '#5d275d' : '#333c57', Math.floor(t * 6) % 2 ? '#ffe14a' : '#f4f4f4');
      CV.spr(g, CV.weapons[k.id].spr, 'idle', x - 8, y - 4);
    } else if (k.type === 'heal') CV.spr(g, (CV.items[k.id] || {}).spr || 'i_carne', 'idle', x - 5, y - 5);
    else if (k.type === 'ammo') CV.spr(g, 'i_ammo', 'idle', x - 5, y - 5);
    else { CV.spr(g, G.stage.collectible.spr, 'idle', x - 5, y - 5); if (Math.floor(t * 5 + k.x) % 4 === 0) { g.fillStyle = '#ffffff'; g.fillRect(Math.round(x + 3), Math.round(y - 6), 1, 3); g.fillRect(Math.round(x + 2), Math.round(y - 5), 3, 1); } }
  }
  function drawBubble(g, b) {
    const o = b.owner, cam = G.cam, lines = CV.wrap(b.text, 24), w = lines.reduce((m, l) => Math.max(m, l.length), 0) * 6 + 7, h = lines.length * 10 + 5;
    const ox = o.x + o.w / 2 - cam.x, oy = o.y - cam.y - (o.def && o.def.scale ? 6 : 4);
    const x = Math.round(CV.clamp(ox - w / 2, 2, W - w - 2)), y = Math.round(Math.max(2, oy - h - 5));
    CV.panel(g, x, y, w, h, '#f4f4f4', '#1a1c2c');
    g.fillStyle = '#1a1c2c'; g.fillRect(CV.clamp(Math.round(ox) - 1, x + 3, x + w - 6), y + h, 4, 2); g.fillStyle = '#f4f4f4'; g.fillRect(CV.clamp(Math.round(ox), x + 4, x + w - 5), y + h - 1, 2, 2);
    lines.forEach((l, i) => CV.text(g, l, x + 4, y + 4 + i * 10, { color: '#1a1c2c', shadow: false }));
  }
  function drawHud(g, t) {
    const p = G.player, st = G.stage, w = CV.weapons[p.weapons[p.wi]];
    for (let i = 0; i < p.maxHp; i++) CV.text(g, '♥', 6 + i * 8, 5, { color: i < p.hp ? '#e03c32' : '#4a3040' });
    CV.panel(g, 5, 15, 22, 14, '#1a1c2c', w.tech > st.tech ? '#ff77a8' : '#94b0c2');
    CV.spr(g, w.spr, 'idle', 8, 18);
    CV.text(g, w.name, 31, 16, { color: '#f4f4f4' });
    CV.text(g, w.type === 'ranged' ? 'x' + p.ammo[w.id] : '∞', 31, 24, { color: w.type === 'ranged' && p.ammo[w.id] <= 3 ? '#e03c32' : '#ffcd75' });
    if (p.weapons.length > 1) CV.text(g, (p.wi + 1) + '/' + p.weapons.length, 66, 24, { color: '#566c86' });
    // barra de paradoja
    const pv = G.pdx.v / 100, hot = pv > .7 && Math.floor(t * 10) % 2;
    CV.text(g, 'PARADOJA', 6, 36, { color: hot ? '#ffffff' : '#b78cff' });
    g.fillStyle = '#1a1c2c'; g.fillRect(57, 36, 60, 7); g.fillStyle = '#3a2a55'; g.fillRect(58, 37, 58, 5);
    g.fillStyle = hot ? '#ffffff' : '#b13e9a'; g.fillRect(58, 37, Math.round(58 * pv), 5);
    g.fillStyle = hot ? '#ff77a8' : '#ff77a8'; g.fillRect(58, 37, Math.round(58 * pv), 2);
    // coleccionables
    if (G.totalCollect) { CV.spr(g, st.collectible.spr, 'idle', W - 46, 3); CV.text(g, Object.keys(G.collected).length + '/' + G.totalCollect, W - 6, 5, { align: 'right', color: '#73eff7' }); }
    const b = G.boss;
    if (b && !(b.fake > 1.2)) { // durante la falsa victoria la barra del jefe desaparece
      const bw = 220, bx = (W - bw) / 2, by = H - 12;
      CV.text(g, b.title || b.def.name, W / 2, by - 10, { align: 'center', color: b.revived ? '#ff77a8' : '#ffcd75' });
      const bm = b.def.mul || {}, bl = { melee: 'GOLPES', ranged: 'BALAS' };
      for (const k in bm) if (bm[k] > 1) CV.text(g, '+' + bl[k], bx - 5, by, { align: 'right', color: '#a7f070' }); else if (bm[k] < 1) CV.text(g, '-' + bl[k], bx + bw + 5, by, { color: '#94b0c2' });
      g.fillStyle = '#1a1c2c'; g.fillRect(bx - 2, by - 1, bw + 4, 8); g.fillStyle = '#4a2030'; g.fillRect(bx, by + 1, bw, 4);
      g.fillStyle = b.vuln ? '#ffe14a' : '#e03c32'; g.fillRect(bx, by + 1, Math.round(bw * b.hp / b.def.hp), 4);
      g.fillStyle = '#1a1c2c'; for (const ph of b.def.phases) if (ph.until) g.fillRect(Math.round(bx + bw * ph.until), by + 1, 1, 4);
    }
  }
  function drawDialog(g) {
    const d = G.dialog, line = d.lines[d.i], y = H - 62;
    CV.panel(g, 6, y, W - 12, 56, '#1a1c2c', '#f4f4f4'); g.fillStyle = '#333c57'; g.fillRect(10, y + 4, 40, 48);
    const spr = line.spr || (line.who === 'Viajero' || !line.who ? 'hero' : null);
    if (spr) { const s = CV.sprite(spr), sc = s.h >= 32 ? 1 : 2; CV.spr(g, spr, 'idle', 30 - s.w * sc / 2, y + 28 - s.h * sc / 2, { scale: sc }); }
    CV.text(g, line.who || 'Viajero', 56, y + 6, { color: line.color || '#ffcd75', shadow: false });
    CV.wrap(line.text.slice(0, d.c | 0), 52).forEach((l, i) => CV.text(g, l, 56, y + 18 + i * 10, { shadow: false }));
    if (d.c >= line.text.length && Math.floor(G.cardT * 0 + performance.now() / 300) % 2) CV.text(g, '↓', W - 20, y + 44, { color: '#ffcd75', shadow: false });
  }

  G.draw = function (g) {
    const cam = G.cam, L = G.level, p = G.player, t = G.time, st = G.stage;
    let sx = 0, sy = 0;
    if (G.shake > 0) { sx = (Math.random() * 2 - 1) * G.shake | 0; sy = (Math.random() * 2 - 1) * G.shake * .6 | 0; }
    const cx = Math.round(cam.x) + sx, cy = Math.round(cam.y) + sy;
    CV.drawBg(g, G.bg, cam.x, t);
    g.save(); g.translate(-cx, -cy);
    const dec = d => { const s = CV.sprite(d.spr); CV.spr(g, d.spr, 'idle', d.x - s.w / 2, d.y - s.h); };
    for (const d of G.decors) if (!d.front && d.x > cx - 40 && d.x < cx + W + 40) dec(d);
    const z = G.zanja, gy = (L.h - 2) * T;
    if (z && z.active) { g.fillStyle = '#2b1a10'; g.fillRect(cx - 4, gy + 10, z.x - cx + 4, 60); g.fillStyle = '#4a2f1a'; g.fillRect(cx - 4, gy + 8, z.x - cx + 4, 3); }
    CV.drawTiles(g, L, cx, cy);
    if (z && z.active && z.x > cx - 60) {
      const zs = z.def.sprite;
      for (let i = 0; i < 2; i++) { const bx = z.x + 4 + i * 14, bob = Math.floor(t * 6 + i) % 2; if (zs) CV.spr(g, zs, bob ? 'walk0' : 'idle', bx, gy - 16 + bob); g.fillStyle = '#c2c3c7'; g.fillRect(Math.round(bx + 13), gy - 6 - bob * 5, 3, 3); g.fillStyle = '#8b5a2b'; g.fillRect(Math.round(bx + 14), gy - 10 - bob * 5, 1, 5); }
      const sgn = z.def.sign || 'ZANJA EN OBRA', sw = sgn.length * 6 + 7;
      CV.panel(g, Math.round(z.x - sw / 2 + 10), gy - 42, sw, 13, '#ffcd75', '#5a3a1a'); CV.text(g, sgn, z.x - sw / 2 + 14, gy - 39, { color: '#5a3a1a', shadow: false });
      g.fillStyle = '#5a3a1a'; g.fillRect(Math.round(z.x + 9), gy - 29, 2, 13);
    }
    for (const c of G.checks) {
      g.fillStyle = '#566c86'; g.fillRect(c.x - 1, c.y - 26, 2, 26); g.fillStyle = c.on ? '#73eff7' : '#94b0c2';
      const wv = c.on ? Math.floor(t * 6) % 2 : 0; g.fillRect(c.x + 1, c.y - 26 + wv, 9, 6); g.fillStyle = c.on ? '#f4f4f4' : '#566c86'; g.fillRect(c.x + 3, c.y - 24 + wv, 4, 2);
    }
    if (G.portal) CV.drawPortal(g, G.portal.x, G.portal.y, G.portal.t);
    for (const k of G.pickups) drawPickup(g, k, t);
    for (const n of G.npcs) { CV.spr(g, n.def.sprite, 'idle', n.x - 2, n.y + (Math.floor(t * 2 + n.x) % 2 ? 0 : 0), { flip: n.face < 0 }); if (!n.near && !n.talked && Math.floor(t * 3) % 2) CV.text(g, '!', n.x + 4, n.y - 10, { color: '#a7f070' }); }
    for (const e of G.enemies) if (e.x > cx - 60 && e.x < cx + W + 60) drawEnemy(g, e, t);
    for (const c of G.corpses) { const s = CV.sprite(c.spr); CV.spr(g, c.spr, 'idle', c.x - s.w * c.scale / 2, c.y - s.h * c.scale, { flip: c.flip, rot: c.rot, scale: c.scale }); }
    if (G.boss) drawBoss(g, G.boss, t);
    drawPlayer(g, p, t);
    for (const q of G.projs) drawProj(g, q, t);
    for (const l of G.lines) drawLine(g, l, t);
    for (const q of G.parts) { g.fillStyle = q.col; g.fillRect(Math.round(q.x), Math.round(q.y), q.size, q.size); }
    for (const d of G.decors) if (d.front && d.x > cx - 40 && d.x < cx + W + 40) dec(d);
    g.restore();
    for (const b of G.bubbles) drawBubble(g, b);
    if (G.state !== 'card') drawHud(g, t);
    if (G.banner) { const b = G.banner, a = b.t < .2 ? b.t / .2 : b.t > 2 ? (2.4 - b.t) / .4 : 1; g.globalAlpha = Math.max(0, a); g.fillStyle = 'rgba(26,28,44,.75)'; g.fillRect(0, 50, W, 15); CV.text(g, b.text, W / 2, 54, { align: 'center', color: b.color }); g.globalAlpha = 1; }
    if (G.hurtFlash > 0) { g.fillStyle = 'rgba(224,60,50,.28)'; g.fillRect(0, 0, W, H); }
    if (G.pdx.glitch > 0) glitch(g, G.pdx.glitch);
    if (G.state === 'card') {
      const k = Math.min(1, G.cardT / .3); g.fillStyle = 'rgba(13,16,33,' + (.82 * k) + ')'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#ffcd75'; g.fillRect(0, 70, W * k, 2); g.fillRect(W - W * k, 138, W * k, 2);
      const tw = st.title.length * 18; CV.text(g, st.title, W / 2, 84, { align: 'center', scale: tw > W - 16 ? 2 : 3, color: '#f4f4f4' });
      CV.text(g, st.subtitle || '', W / 2, 116, { align: 'center', color: '#ffcd75' });
      if (st.boss) CV.text(g, 'JEFE: ' + st.boss.name, W / 2, 148, { align: 'center', color: '#e03c32' });
    }
    if (G.dialog) drawDialog(g);
    if (G.paused && G.inv) drawInventory(g);
    else if (G.paused) {
      g.fillStyle = 'rgba(13,16,33,.8)'; g.fillRect(0, 0, W, H); CV.text(g, 'PAUSA', W / 2, 26, { align: 'center', scale: 2, color: '#ffcd75' });
      ['CONTINUAR', 'INVENTARIO', 'VOLVER AL MAPA TEMPORAL'].forEach((s, i) => CV.text(g, (G.pauseSel === i ? '→ ' : '  ') + s, W / 2, 56 + i * 13, { align: 'center', color: G.pauseSel === i ? '#f4f4f4' : '#566c86' }));
      ['MOVER: FLECHAS / WASD', 'SALTAR: ESPACIO / Z / ↑  (DOBLE SALTO EN EL AIRE)', 'ATACAR: X / J     RODAR: C / SHIFT', 'ARMA ANTERIOR: Q   SIGUIENTE: E   INVENTARIO: I', 'BAJAR PLATAFORMA: ↓ + SALTO     SILENCIAR: M', 'GAMEPAD: A SALTO, X ATAQUE, B RODAR, Y ARMA'].forEach((s, i) => CV.text(g, s, W / 2, 110 + i * 12, { align: 'center', color: '#94b0c2' }));
    }
    if (G.state === 'results') {
      const r = G.res; g.fillStyle = 'rgba(13,16,33,.85)'; g.fillRect(0, 0, W, H);
      CV.text(g, '¡ETAPA COMPLETADA!', W / 2, 26, { align: 'center', scale: 2, color: '#ffcd75' });
      CV.text(g, st.title, W / 2, 52, { align: 'center' });
      const mm = Math.floor(r.time / 60), ss = Math.floor(r.time % 60);
      [[st.collectible ? st.collectible.name.toUpperCase() : 'COLECCIONABLES', r.collect + '/' + r.total], ['PARADOJAS PROVOCADAS', '' + r.paradojas], ['TIEMPO', mm + ':' + (ss < 10 ? '0' : '') + ss]].forEach((row, i) => {
        if (G.resT > .2 + i * .25) { CV.text(g, row[0], 90, 76 + i * 14, { color: '#94b0c2' }); CV.text(g, row[1], W - 90, 76 + i * 14, { align: 'right', color: '#73eff7' }); }
      });
      if (r.piece && G.resT > 1.1) { CV.text(g, '★ ¡PIEZA DE LA MÁQUINA RECUPERADA! ★', W / 2, 128, { align: 'center', color: '#a7f070' }); CV.text(g, '(RAMA ' + CV.timeline.branches[r.piece].name + ')', W / 2, 140, { align: 'center', color: '#566c86' }); }
      if (G.resT > 1) { const nx = CV.save.HEART_EVERY - CV.save.relics() % CV.save.HEART_EVERY;
        CV.text(g, r.heart ? '♥ ¡+1 CORAZÓN MÁXIMO! ♥' : CV.save.hearts() < 4 ? 'PRÓXIMO CORAZÓN: FALTAN ' + nx + ' RELIQUIAS' : 'CORAZONES AL MÁXIMO', W / 2, 158, { align: 'center', color: r.heart ? '#e03c32' : '#566c86' }); }
      if (G.resT > .8 && Math.floor(G.resT * 2) % 2) CV.text(g, 'ENTER PARA CONTINUAR', W / 2, 180, { align: 'center' });
    }
  };
  // ---------- inventario ----------
  function drawInventory(g) {
    const p = G.player, st = G.stage, sv = CV.save;
    g.fillStyle = 'rgba(13,16,33,.92)'; g.fillRect(0, 0, W, H);
    CV.text(g, 'INVENTARIO', 10, 6, { scale: 2, color: '#ffcd75' });
    CV.text(g, 'ÉPOCA ACTUAL: NIVEL TEC. ' + st.tech, W - 10, 10, { align: 'right', color: '#94b0c2' });
    CV.text(g, 'ARMA', 34, 28, { color: '#566c86' }); CV.text(g, 'NV', 116, 28, { color: '#566c86' }); CV.text(g, 'DAÑO', 146, 28, { color: '#566c86' }); CV.text(g, 'ALCANCE', 186, 28, { color: '#566c86' }); CV.text(g, 'MUNICIÓN', 238, 28, { color: '#566c86' }); CV.text(g, 'ÉPOCA', W - 10, 28, { align: 'right', color: '#566c86' });
    const n = p.weapons.length, rh = n > 9 ? 13 : 14;
    p.weapons.forEach((id, i) => {
      const w = CV.weapons[id], y = 38 + i * rh, diff = Math.max(0, w.tech - st.tech), sel = i === p.wi, ana = diff > 0;
      if (sel) { g.fillStyle = '#29366f'; g.fillRect(6, y - 2, W - 12, rh - 1); CV.text(g, '→', 8, y + 1, { color: '#ffcd75' }); }
      CV.spr(g, w.spr, 'idle', 16, y);
      CV.text(g, w.name.toUpperCase(), 34, y + 1, { color: ana ? '#ff77a8' : '#f4f4f4' });
      const dmg = Math.round(w.dmg * (1 + .25 * diff) * 10) / 10, lv = sv.level(id);
      for (let k = 0; k < 3; k++) CV.text(g, '★', 116 + k * 7, y + 1, { color: k < lv ? '#ffcd75' : '#333c57' });
      CV.text(g, '' + dmg + (ana ? '↑' : ''), 146, y + 1, { color: ana ? '#ff77a8' : '#a7f070' });
      CV.text(g, w.type === 'melee' ? (w.reach > 28 ? 'MEDIO' : 'CORTO') : (w.proj.grav > 200 ? 'ARCO' : 'LARGO'), 186, y + 1, { color: '#94b0c2' });
      CV.text(g, w.type === 'melee' ? '∞' : p.ammo[id] + '/' + w.ammo, 238, y + 1, { color: w.type !== 'melee' && p.ammo[id] <= 3 ? '#e03c32' : '#ffcd75' });
      CV.text(g, ana ? 'ANACRÓNICA +' + diff : 'DE ÉPOCA', W - 10, y + 1, { align: 'right', color: ana ? '#ff77a8' : '#566c86' });
    });
    const y2 = 184, nx = sv.HEART_EVERY - sv.relics() % sv.HEART_EVERY;
    g.fillStyle = '#566c86'; g.fillRect(6, y2 - 6, W - 12, 1);
    CV.text(g, 'ANACRÓNICA: PEGA MÁS Y LLENA LA PARADOJA (TRIPLE CONTRA JEFES)', W / 2, y2 - 2, { align: 'center', color: '#ff77a8' });
    CV.text(g, 'VIDA MÁX: ' + p.maxHp + ' ♥   RELIQUIAS: ' + sv.relics() + (sv.hearts() < 4 ? ' (PRÓXIMO ♥ EN ' + nx + ')' : ' (♥ AL MÁXIMO)'), W / 2, y2 + 9, { align: 'center', color: '#94b0c2' });
    const c = sv.cost(p.weapons[p.wi]), can = c !== undefined && sv.points() >= c;
    CV.text(g, 'PUNTOS: ' + sv.points() + '   ' + (c === undefined ? 'ARMA AL MÁXIMO' : 'X: MEJORAR (' + c + ' PTS)') + '   ↑↓ ELEGIR   ENTER: VOLVER', W / 2, y2 + 20, { align: 'center', color: can ? '#a7f070' : '#f4f4f4' });
  }
  function glitch(g, k) {
    const c = g.canvas;
    for (let i = 0; i < 9; i++) { const y = Math.random() * H | 0, h = 3 + Math.random() * 18 | 0, dx = (Math.random() * 2 - 1) * 26 * Math.min(1, k) | 0; g.drawImage(c, 0, y, W, h, dx, y, W, h); }
    for (let i = 0; i < 4; i++) { g.fillStyle = CV.pick(['rgba(255,119,168,.25)', 'rgba(115,239,247,.25)', 'rgba(255,255,255,.18)']); g.fillRect(0, Math.random() * H | 0, W, 1 + Math.random() * 6 | 0); }
    if (Math.random() < .15) { g.globalCompositeOperation = 'difference'; g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over'; }
  }
})();
