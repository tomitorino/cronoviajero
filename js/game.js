// Escena de juego: jugador, física, combate, IA de enemigos, ítems, paradojas y mecánicas de etapa.
(function () {
  const CV = window.CV, T = 16, W = CV.W, H = CV.H;
  const G = CV.Game = {};
  const RUN = 112, GRAV = 900, JUMP = 310, JUMP2 = 270;
  const sfx = n => CV.audio.sfx(n);

  // ---------- inicio de etapa ----------
  G.enter = function (arg) {
    const id = arg.id, st = CV.stages[id], sd = CV.save.data;
    G.id = id; G.stage = st;
    let ov = null;
    if (arg.edit) { try { ov = JSON.parse(localStorage.getItem('cv_editor_' + id)); } catch (e) { } }
    const L = G.level = CV.buildLevel(st, ov);
    G.bg = CV.buildBg(st.bg);
    G.enemies = []; G.projs = []; G.pickups = []; G.npcs = []; G.decors = []; G.parts = []; G.bubbles = []; G.lines = []; G.corpses = []; G.checks = [];
    G.boss = null; G.bossSpawn = null; G.portal = null; G.portalPos = null; G.arena = null; G.swing = null;
    G.time = 0; G.shake = 0; G.hitstop = 0; G.hurtFlash = 0; G.banner = null;
    G.pdx = { v: 0, cool: 0, glitch: 0, spawnT: 0, count: 0 };
    CV.save.apply();
    G.collected = {}; G.totalCollect = 0; G.state = 'card'; G.cardT = 0; G.dialog = null; G.paused = false; G.pauseSel = 0;
    G.bossIntroSeen = false;
    const p = G.player = {
      x: 32, y: 32, w: 10, h: 14, vx: 0, vy: 0, face: 1, onGround: false, hp: 6 + CV.save.hearts(), maxHp: 6 + CV.save.hearts(), coyote: 0, buffer: 0, jumps: 0,
      rollT: 0, rollCd: 0, atkT: 0, atkCd: 0, inv: 0, dead: 0, drop: 0, anim: 0, weapons: sd.weapons.filter(w => CV.weapons[w]), wi: 0, ammo: {}
    };
    if (!p.weapons.length) p.weapons = ['garrote'];
    G.sortWeapons();
    p.weapons.forEach((w, i) => { if (CV.weapons[w].tech <= st.tech) p.wi = i; });
    for (const k in CV.weapons) if (CV.weapons[k].type === 'ranged') p.ammo[k] = CV.weapons[k].ammo;
    let healI = 0, ci = 0;
    for (const s of L.spawns) {
      const d = s.def, px = s.x * T, py = s.y * T;
      if (d.player) { p.x = px + 3; p.y = py + 2; }
      else if (d.enemy) G.spawnEnemy(d.enemy, px + 8, py + T);
      else if (d.weapon) G.pickups.push(mkPick('weapon', d.weapon, px + 8, py + 8, true, { rift: d.rift }));
      else if (d.heal) G.pickups.push(mkPick('heal', st.heals[healI++ % st.heals.length], px + 8, py + 9, true));
      else if (d.ammo) G.pickups.push(mkPick('ammo', 'ammo', px + 8, py + 9, true));
      else if (d.collect) {
        const idx = ci++; G.totalCollect++;
        if ((sd.collect[id] || []).indexOf(idx) >= 0) G.collected[idx] = true;
        else G.pickups.push(mkPick('collect', idx, px + 8, py + 8, true));
      }
      else if (d.npc) G.npcs.push({ def: st.npcs[d.npc], x: px + 2, y: py, w: 12, h: 16, face: -1, said: 0, gift: false, near: false });
      else if (d.decor) G.decors.push({ spr: d.decor, x: px + 8, y: py + T, front: d.front });
      else if (d.check) G.checks.push({ x: px + 8, y: py + T, on: false });
      else if (d.arena) G.arena = { x0: px, x1: L.w * T, active: false, cleared: false };
      else if (d.boss) G.bossSpawn = { x: px + 8, y: py + T };
      else if (d.portal) G.portalPos = { x: px + 8, y: py + T };
    }
    // menos regalos: fuera de la arena del jefe queda solo la mitad de las comidas y cajas de munición del mapa
    for (const ty of ['heal', 'ammo']) {
      const c = G.pickups.filter(k => k.type === ty && (!G.arena || k.x < G.arena.x0)).sort((a, b) => a.x - b.x);
      const tr = G.stage.boss && G.stage.boss.tier !== undefined ? G.stage.boss.tier : .5, keep = tr < .25 ? 2 : 3; // camino al jefe con poca ayuda: queda 1 de cada 2 al principio y 1 de cada 3 después // gradual: al principio no se recorta nada, después 1 de cada 3, al final la mitad
      c.forEach((k, i) => { if (i % keep !== (ty === 'heal' ? 1 : 0)) k.cut = true; });
    }
    G.pickups = G.pickups.filter(k => !k.cut);
    G.cp = { x: p.x, y: p.y }; G.safe = { x: p.x, y: p.y };
    G.cam = { x: 0, y: 0 }; camera(1, true);
    G.zanja = st.mechanic && st.mechanic.type === 'zanja' ? { x: -400, active: false, col: -1, def: st.mechanic } : null;
    CV.audio.play(st.music);
  };
  function mkPick(type, id, x, y, float, extra) { return Object.assign({ type, id, x, y, vy: float ? 0 : -160, float, t: Math.random() * 6 }, extra); }
  G.sortWeapons = function () {
    const p = G.player, cur = p.weapons[p.wi];
    p.weapons.sort((a, b) => CV.weapons[a].tech - CV.weapons[b].tech);
    p.wi = Math.max(0, p.weapons.indexOf(cur));
  };
  G.spawnEnemy = function (id, cx, bottom, o) {
    const d = CV.enemies[id]; if (!d) { console.warn('Enemigo no definido:', id); return null; }
    const w = d.w || 12, h = d.h || 14;
    const e = Object.assign({ def: d, x: cx - w / 2, y: bottom - h, w, h, vx: 0, vy: 0, face: -1, hp: d.hp || 3, t: Math.random() * 5, state: '', st: 0, cd: CV.rand(.5, d.cooldown || 1.5), flash: 0, stun: 0, onGround: false }, o);
    e.baseY = e.y; e.homeX = e.x;
    // cuanto más avanzada la época, más enemigos cuerpo a cuerpo llevan además un arma de fuego (0% hasta tech 1, 100% en tech 9)
    const tech = G.stage ? G.stage.tech || 0 : 0;
    if (!d.mini && !d.proj && d.ai !== 'kamikaze' && d.gun !== false) { G.gunAcc = (G.gunAcc || 0) + CV.clamp((tech - 1) / 8, 0, 1); if (G.gunAcc >= 1) { G.gunAcc -= 1; e.gun = CV.rand(1, 2.5); } }
    if (d.mini) { e.hp = Math.round(e.hp * 1.35); e.mcd = 1.5; e.lcd = 3; } // minijefes: más vida, disparan en abanico y pegan saltos
    G.enemies.push(e); return e;
  };

  // ---------- helpers ----------
  G.fx = function (x, y, n, col, o) {
    o = o || {};
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, s = (o.speed || 60) * (.3 + Math.random() * .7);
      G.parts.push({ x, y, vx: Math.cos(a) * s + (o.vx || 0), vy: Math.sin(a) * s + (o.vy || 0), life: (o.life || .4) * (.5 + Math.random() * .5), col: Array.isArray(col) ? CV.pick(col) : col, size: o.size || 1 + (Math.random() * 2 | 0), grav: o.grav === undefined ? 200 : o.grav });
    }
  };
  G.say = function (owner, text, life) { G.bubbles = G.bubbles.filter(b => b.owner !== owner); G.bubbles.push({ owner, text, t: 0, life: life || 2.2 }); };
  G.setBanner = function (text, color) { G.banner = { text, t: 0, color: color || '#ffcd75' }; };
  const kindAt = (tx, ty) => { const L = G.level; if (tx < 0 || tx >= L.w) return 1; if (ty < 0 || ty >= L.h) return 0; return L.kind[L.grid[ty][tx]] || 0; };
  G.kindAt = kindAt;
  G.move = function (b, dt) {
    b.hitWall = false;
    b.x += b.vx * dt;
    let x0 = Math.floor(b.x / T), x1 = Math.floor((b.x + b.w - .01) / T), y0 = Math.floor(b.y / T), y1 = Math.floor((b.y + b.h - .01) / T);
    for (let ty = y0; ty <= y1; ty++) {
      if (b.vx > 0 && kindAt(x1, ty) === 1) { b.x = x1 * T - b.w; b.vx = 0; b.hitWall = true; break; }
      if (b.vx < 0 && kindAt(x0, ty) === 1) { b.x = (x0 + 1) * T; b.vx = 0; b.hitWall = true; break; }
    }
    const prevB = b.y + b.h;
    b.y += b.vy * dt; b.onGround = false; b.onOneway = false;
    x0 = Math.floor(b.x / T); x1 = Math.floor((b.x + b.w - .01) / T); y0 = Math.floor(b.y / T); y1 = Math.floor((b.y + b.h - .01) / T);
    if (b.vy >= 0) {
      let land = false, solid = false;
      for (let tx = x0; tx <= x1; tx++) {
        const k = kindAt(tx, y1);
        if (k === 1) { land = true; solid = true; }
        else if (k === 2 && !(b.drop > 0) && prevB <= y1 * T + .5) land = true;
      }
      if (land) { b.y = y1 * T - b.h; b.vy = 0; b.onGround = true; b.onOneway = !solid; }
    } else {
      for (let tx = x0; tx <= x1; tx++) if (kindAt(tx, y0) === 1) { b.y = (y0 + 1) * T; b.vy = 0; break; }
    }
  };
  function groundAhead(e) {
    const fx = e.face > 0 ? e.x + e.w + 2 : e.x - 2, k = kindAt(Math.floor(fx / T), Math.floor((e.y + e.h + 2) / T));
    return k === 1 || k === 2;
  }
  function freeSpot(x, y) { let n = 0; while (kindAt(Math.floor(x / T), Math.floor((y - 4) / T)) === 1 && n++ < 6) y -= T; return y; }

  // ---------- diálogos ----------
  G.openDialog = function (lines, cb) { if (!lines || !lines.length) { if (cb) cb(); return; } G.dialog = { lines, i: 0, c: 0, cb }; };
  function updDialog(dt) {
    const d = G.dialog, line = d.lines[d.i], n = line.text.length, c0 = d.c | 0;
    d.c += dt * 48;
    if ((d.c | 0) > c0 && d.c < n && (d.c | 0) % 3 === 0) sfx('talk');
    if (CV.input.pressed('ok', 'attack')) {
      if (d.c < n) d.c = n;
      else { d.i++; d.c = 0; if (d.i >= d.lines.length) { G.dialog = null; if (d.cb) d.cb(); } }
    }
  }

  // ---------- bucle ----------
  G.update = function (dt) {
    const In = CV.input;
    updParts(dt);
    for (const b of G.bubbles) b.t += dt;
    G.bubbles = G.bubbles.filter(b => b.t < b.life);
    if (G.banner) { G.banner.t += dt; if (G.banner.t > 2.4) G.banner = null; }
    if (G.shake > 0) G.shake = Math.max(0, G.shake - 30 * dt);
    if (G.hurtFlash > 0) G.hurtFlash -= dt;
    if (G.pdx.glitch > 0) G.pdx.glitch -= dt;
    if (G.state === 'card') {
      G.cardT += dt;
      if (G.cardT > 2.6 || (G.cardT > .4 && In.pressed('ok', 'attack'))) { G.state = 'play'; G.openDialog(G.stage.dialogs && G.stage.dialogs.intro); }
      return;
    }
    if (G.state === 'results') {
      G.resT += dt;
      if (G.resT > .8 && In.pressed('ok', 'attack')) { sfx('select'); if (G.stage.id === 'findeltiempo' && CV.Cutscene) CV.setScene(CV.Cutscene, { id: 'outro' }); else if (G.res.epilogue) CV.setScene(CV.Ending, { lines: G.res.epilogue }); else CV.setScene(CV.Hub); }
      return;
    }
    if (G.dialog) { updDialog(dt); return; }
    if (In.pressed('pause')) { G.paused = !G.paused; G.pauseSel = 0; G.inv = false; sfx('select'); }
    else if (In.pressed('inv')) { G.inv = !(G.paused && G.inv); G.paused = G.inv; G.pauseSel = 0; sfx('select'); }
    if (G.paused) {
      const pl = G.player;
      if (G.inv) { // inventario: elegir arma
        const n = pl.weapons.length;
        if (In.pressed('up')) { pl.wi = (pl.wi + n - 1) % n; sfx('move'); }
        if (In.pressed('down')) { pl.wi = (pl.wi + 1) % n; sfx('move'); }
        if (In.pressed('attack')) { const id = pl.weapons[pl.wi], a0 = CV.weapons[id].ammo;
          if (CV.save.upgrade(id)) { sfx('heal'); if (a0) pl.ammo[id] += CV.weapons[id].ammo - a0; } else sfx('hurt'); }
        if (In.pressed('ok', 'back')) { G.inv = false; G.paused = In.pressed('back'); sfx('select'); }
        return;
      }
      if (In.pressed('up')) { G.pauseSel = (G.pauseSel + 2) % 3; sfx('move'); }
      if (In.pressed('down')) { G.pauseSel = (G.pauseSel + 1) % 3; sfx('move'); }
      if (In.pressed('ok')) { sfx('select'); if (G.pauseSel === 0) G.paused = false; else if (G.pauseSel === 1) G.inv = true; else CV.setScene(CV.Hub); }
      return;
    }
    if (G.hitstop > 0) { G.hitstop -= dt; return; }
    G.time += dt;
    const am = G.stage.ambient;
    if (am && Math.random() < (am.rate || .15)) G.parts.push({ x: G.cam.x + Math.random() * (W + 60) - 30, y: am.vy < 0 ? G.cam.y + H * (.4 + Math.random() * .6) : G.cam.y - 4, vx: (am.vx || 0) + CV.rand(-8, 8), vy: am.vy || 20, life: am.life || 5, col: CV.pick(am.col), size: am.size || 1, grav: 0 });
    updPlayer(dt); updEnemies(dt); CV.Boss.update(dt); updProjs(dt); updPickups(dt); updWorld(dt); updParadox(dt); updZanja(dt);
    for (const c of G.corpses) { c.vy += GRAV * dt; c.x += c.vx * dt; c.y += c.vy * dt; c.rot += c.vr * dt; }
    G.corpses = G.corpses.filter(c => c.y < G.cam.y + H + 60);
    if (G.swing) { G.swing.t -= dt; if (G.swing.t <= 0) G.swing = null; }
    camera(dt);
  };
  function camera(dt, snap) {
    const p = G.player, L = G.level, c = G.cam;
    let tx = p.x + p.w / 2 - W / 2 + p.face * 26, ty = p.y - H * .55;
    let minX = 0, maxX = L.w * T - W;
    if (G.arena && G.arena.active) { minX = G.arena.x0; maxX = G.arena.x1 - W; }
    tx = CV.clamp(tx, minX, Math.max(minX, maxX)); ty = CV.clamp(ty, 0, Math.max(0, L.h * T - H));
    const k = snap ? 1 : Math.min(1, dt * 6);
    c.x += (tx - c.x) * k; c.y += (ty - c.y) * k;
  }
  function updParts(dt) {
    for (const q of G.parts) { q.life -= dt; q.vy += q.grav * dt; q.x += q.vx * dt; q.y += q.vy * dt; }
    if (G.parts.length > 400) G.parts.splice(0, G.parts.length - 400);
    G.parts = G.parts.filter(q => q.life > 0);
  }

  // ---------- jugador ----------
  function updPlayer(dt) {
    const p = G.player, In = CV.input, L = G.level;
    p.anim += dt;
    if (p.inv > 0) p.inv -= dt; if (p.atkT > 0) p.atkT -= dt; if (p.atkCd > 0) p.atkCd -= dt; if (p.rollCd > 0) p.rollCd -= dt; if (p.drop > 0) p.drop -= dt;
    if (p.dead) { p.dead += dt; p.vy += GRAV * dt; p.y += p.vy * dt; p.x += p.vx * dt; if (p.dead > 1.5) respawn(); return; }
    const dir = (In.down('right') ? 1 : 0) - (In.down('left') ? 1 : 0);
    const jHeld = In.down('jump') || In.down('up');
    if (In.pressed('jump', 'up')) p.buffer = .12; else p.buffer -= dt;
    if (p.onGround) { p.coyote = .1; p.jumps = 0; } else p.coyote -= dt;
    if (p.rollT > 0) { p.rollT -= dt; p.vx = p.face * 200; }
    else {
      const tgt = dir * RUN, acc = (p.onGround ? 1100 : 760) * dt;
      if (p.vx < tgt) p.vx = Math.min(tgt, p.vx + acc); else if (p.vx > tgt) p.vx = Math.max(tgt, p.vx - acc);
      if (dir) p.face = dir;
      if (In.pressed('roll') && p.onGround && p.rollCd <= 0) {
        p.rollT = .34; p.rollCd = .65; p.inv = Math.max(p.inv, .36); sfx('roll'); G.fx(p.x + 5, p.y + 13, 5, '#e8e0d0', { speed: 30, life: .3, grav: 0 });
      }
    }
    if (p.buffer > 0) {
      if (In.down('down') && p.onGround && p.onOneway) { p.drop = .2; p.buffer = 0; p.onGround = false; p.coyote = 0; }
      else if (p.coyote > 0) { p.vy = -JUMP; p.coyote = 0; p.buffer = 0; p.jumps = 1; p.rollT = 0; sfx('jump'); G.fx(p.x + 5, p.y + 14, 4, '#e8e0d0', { speed: 25, life: .25, grav: 0 }); }
      else if (p.jumps < 2) { p.vy = -JUMP2; p.jumps = 2; p.buffer = 0; sfx('djump'); for (let i = -2; i <= 2; i++) G.parts.push({ x: p.x + 5 + i * 3, y: p.y + 14, vx: i * 14, vy: 20, life: .3, col: '#b9f3ff', size: 2, grav: 0 }); }
    }
    if (!jHeld && p.vy < -80) p.vy += 1500 * dt;
    p.vy = Math.min(430, p.vy + GRAV * dt);
    const wasG = p.onGround, vy0 = p.vy;
    G.move(p, dt);
    if (G.arena && G.arena.active && p.x < G.arena.x0 + 2) p.x = G.arena.x0 + 2;
    if (p.onGround && !wasG && vy0 > 220) G.fx(p.x + 5, p.y + 14, 5, '#e8e0d0', { speed: 35, life: .25, grav: 0 });
    const swd = In.pressed('swap') ? 1 : In.pressed('swapPrev') ? -1 : 0; // E: arma siguiente, Q: arma anterior
    if (swd && p.weapons.length > 1) { p.wi = (p.wi + swd + p.weapons.length) % p.weapons.length; sfx('move'); const w = CV.weapons[p.weapons[p.wi]]; if (w.tech > G.stage.tech) G.say(p, '¡Anacrónica! Genera paradoja', 1.4); }
    if (In.down('attack') && p.atkCd <= 0 && p.rollT <= 0) G.attack();
    // pinches
    const tx0 = Math.floor((p.x + 2) / T), tx1 = Math.floor((p.x + p.w - 2) / T), ty1 = Math.floor((p.y + p.h - 1) / T);
    if (p.inv <= 0 && (kindAt(tx0, ty1) === 3 || kindAt(tx1, ty1) === 3)) { G.hurtPlayer(1, -p.face); if (!p.dead) p.vy = -230; }
    // caída al vacío
    if (p.y > L.h * T + 24) {
      p.hp -= 1; sfx('hurt'); G.hurtFlash = .2; G.shake = 4;
      if (p.hp <= 0) { p.hp = 0; p.dead = .001; p.vy = -200; p.vx = 0; }
      else { const s = safeSpot(); p.x = s.x; p.y = s.y; p.vx = p.vy = 0; p.inv = 1.5; }
    }
    if (p.onGround && !p.onOneway && kindAt(Math.floor((p.x + 5) / T), Math.floor((p.y + p.h + 2) / T)) === 1 && kindAt(Math.floor((p.x + 5) / T), Math.floor((p.y + p.h - 2) / T)) !== 3) G.safe = { x: p.x, y: p.y };
    if (G.arena && !G.arena.active && !G.arena.cleared && p.x > G.arena.x0 + 28) CV.Boss.start();
  }
  function safeSpot() {
    const z = G.zanja, s = { x: G.safe.x, y: G.safe.y };
    if (z && z.active && s.x < z.x + 56) {
      for (let tx = Math.floor((z.x + 64) / T); tx < G.level.w; tx++) for (let ty = 2; ty < G.level.h; ty++) {
        if (kindAt(tx, ty) === 1 && kindAt(tx, ty - 1) === 0 && kindAt(tx, ty - 2) === 0) return { x: tx * T + 3, y: ty * T - 14 };
      }
    }
    return s;
  }
  function respawn() {
    const p = G.player;
    p.hp = p.maxHp; p.dead = 0; p.vx = p.vy = 0; p.inv = 1.5; p.rollT = 0;
    G.pdx.v = 0; G.projs = []; G.lines = [];
    if (G.boss || (G.arena && G.arena.active)) { G.boss = null; G.arena.active = false; G.enemies = G.enemies.filter(e => !e.summoned && !e.pdx); CV.audio.play(G.stage.music); }
    const z = G.zanja;
    if (z && z.active) {
      const nx = Math.min(z.x, G.cp.x - 14 * T), c0 = Math.max(0, Math.floor(nx / T));
      for (let y = 0; y < G.level.h; y++) for (let x = c0; x < G.level.w; x++) G.level.grid[y][x] = G.level.orig[y][x];
      z.x = nx; z.col = c0 - 1;
    }
    p.x = G.cp.x; p.y = G.cp.y; G.safe = { x: p.x, y: p.y };
    for (const k in p.ammo) p.ammo[k] = Math.max(p.ammo[k], Math.ceil(CV.weapons[k].ammo / 2));
    camera(1, true);
  }
  G.hurtPlayer = function (dmg, dir) {
    const p = G.player;
    if (p.inv > 0 || p.dead || G.state !== 'play') return;
    p.hp -= dmg; p.inv = 1.1; p.vx = dir * 140; p.vy = -170; p.rollT = 0; G.shake = 4; G.hurtFlash = .15; sfx('hurt');
    if (p.hp <= 0) { p.hp = 0; p.dead = .001; p.vy = -280; sfx('die'); }
  };
  G.attack = function () {
    const p = G.player, w = CV.weapons[p.weapons[p.wi]], st = G.stage;
    const diff = Math.max(0, w.tech - st.tech), mul = 1 + .25 * diff;
    if (w.type === 'ranged') {
      if (p.ammo[w.id] <= 0) {
        p.atkCd = .3; sfx('empty'); G.say(p, '¡Sin munición!', 1);
        let best = -1; p.weapons.forEach((id, i) => { if (CV.weapons[id].type === 'melee') best = i; }); if (best >= 0) p.wi = best;
        return;
      }
      p.ammo[w.id]--;
      const pr = w.proj || {};
      G.projs.push({ from: 'p', x: p.x + 5 + p.face * 9, y: p.y + 7, vx: p.face * (pr.speed || 300), vy: (pr.vy || 0) + (pr.spread ? CV.rand(-pr.spread, pr.spread) : 0), grav: pr.grav || 0, w: pr.w || 4, h: pr.h || 2, dmg: w.dmg * mul, pierce: pr.pierce || 0, col: pr.col || '#ffffff', col2: pr.col2, spr: pr.spr, life: pr.life || 1.2, hit: [] });
      sfx(w.sfx || 'shoot');
      G.fx(p.x + 5 + p.face * 12, p.y + 7, w.smoke ? 8 : 2, w.smoke ? ['#f4f4f4', '#c2c3c7'] : '#ffe14a', { speed: 30, life: w.smoke ? .5 : .12, grav: w.smoke ? -30 : 0 });
      if (w.kick) p.vx -= p.face * w.kick;
    } else {
      const hb = { x: p.face > 0 ? p.x + 2 : p.x - w.reach - 2, y: p.y - 7, w: w.reach + 10, h: p.h + 10 };
      G.swing = { t: .14, face: p.face, reach: w.reach, thrust: w.thrust };
      sfx('swing');
      for (const e of G.enemies) if (!e.dead && CV.overlap(hb, e)) G.hurtEnemy(e, w.dmg * mul, p.face);
      if (G.boss && CV.overlap(hb, G.boss)) CV.Boss.hurt(w.dmg * mul, 'melee');
      for (const q of G.projs) if (q.from === 'e' && !q.ghost && !(q.delay > 0) && CV.overlap(hb, { x: q.x - q.w / 2, y: q.y - q.h / 2, w: q.w, h: q.h })) { q.life = 0; G.fx(q.x, q.y, 4, '#ffffff', { speed: 50, life: .2 }); sfx('hit'); }
    }
    p.atkCd = w.cd; p.atkT = .16;
    if (diff > 0) { G.pdx.v += (1 + diff * .5) * w.cd * 6 * (st.paradoxRate || 1) * (G.boss && !G.boss.dying ? 3 : 1); G.pdx.cool = 2.5; }
  };

  // ---------- enemigos ----------
  G.hurtEnemy = function (e, dmg, dir) {
    if (e.dead) return;
    e.hp -= dmg; e.flash = .12; G.hitstop = .02; sfx('hit');
    G.fx(e.x + e.w / 2, e.y + e.h / 2, 4, '#ffffff', { speed: 70, life: .2 });
    if (!e.def.heavy) { e.vx = dir * 150; e.vy = Math.min(e.vy, -90); e.stun = Math.max(e.stun, .45); e.state = ''; e.hopT = 0; e.tele = false; }
    if (e.hp <= 0) kill(e, dir);
  };
  function kill(e, dir, quiet) {
    const d = e.def, p = G.player; e.dead = true;
    G.corpses.push({ spr: d.sprite, x: e.x + e.w / 2, y: e.y + e.h, vx: dir * 70, vy: -230, rot: 0, vr: dir * 9, scale: d.scale || 1, flip: e.face < 0 });
    G.fx(e.x + e.w / 2, e.y + e.h / 2, 8, ['#ffffff', '#ffe14a'], { speed: 80, life: .35 });
    if (quiet) return;
    sfx('die');
    const cx = e.x + e.w / 2, cy = e.y + e.h / 2, dr = e.drop || d.drop;
    if (dr && dr.weapon && (d.mini || Math.random() < (dr.chance || .35)) && (p.weapons.indexOf(dr.weapon) < 0)) G.pickups.push(mkPick('weapon', dr.weapon, cx, cy, false));
    else if (d.mini) G.pickups.push(mkPick('heal', G.stage.heals[G.stage.heals.length - 1], cx, cy, false));
    else {
      const r = Math.random(), ranged = p.weapons.some(w => CV.weapons[w].type === 'ranged');
      const bd = G.stage.boss || {}, hc = e.summoned && bd.minionHeal ? bd.minionHeal : .08 - .04 * (bd.tier || 0); // los minions de algunos jefes sueltan más comida
      if (r < hc) G.pickups.push(mkPick('heal', G.stage.heals[0], cx, cy, false));
      else if (r < hc + (e.summoned ? .09 : .06) && ranged) G.pickups.push(mkPick('ammo', 'ammo', cx, cy, false));
    }
    if (d.mini) { G.setBanner('¡MINI-JEFE DERROTADO!'); G.shake = 6; }
  }
  G.killEnemy = kill;
  function bark(e) {
    const d = e.def;
    if (d.barks && Math.random() < (d.barkChance || .5) && G.time - (e.lastBark || -9) > 4) { G.say(e, CV.pick(d.barks), 1.9); e.lastBark = G.time; }
  }
  function shootAt(e, pr) {
    const p = G.player, ox = e.x + e.w / 2 + e.face * 6, oy = e.y + e.h * .4, tx = p.x + 5, ty = p.y + 7, sp = pr.speed || 120;
    let vx, vy;
    if (pr.grav) { const tt = Math.max(.45, Math.abs(tx - ox) / sp); vx = (tx - ox) / tt; vy = (ty - oy) / tt - .5 * pr.grav * tt; }
    else if (pr.aim) { const a = Math.atan2(ty - oy, tx - ox); vx = Math.cos(a) * sp; vy = Math.sin(a) * sp; }
    else { vx = e.face * sp; vy = 0; }
    G.projs.push(Object.assign({ from: 'e', x: ox, y: oy, vx, vy, grav: 0, w: 5, h: 5, dmg: 1, col: '#ffffff', life: 3 }, pr));
    sfx(pr.sfx || 'shoot');
  }
  G.shootAt = shootAt;
  function boom(e) {
    const p = G.player, d = e.def; e.dead = true; G.shake = Math.max(G.shake, 4); sfx('boom');
    G.fx(e.x + e.w / 2, e.y + e.h / 2, 16, d.boomCols || ['#ffa300', '#ffe14a', '#f4f4f4'], { speed: 110, life: .45 });
    if (d.boomSay) G.say(p, d.boomSay, 1.6);
    if (Math.abs(p.x + 5 - e.x - e.w / 2) < 24 && Math.abs(p.y + 7 - e.y - e.h / 2) < 26) G.hurtPlayer(d.dmg || 1, p.x < e.x ? -1 : 1);
  }
  function patrol(e, sp) { if (e.hitWall || (e.onGround && !groundAhead(e))) e.face = -e.face; e.vx = e.face * sp; }
  function updEnemies(dt) {
    const p = G.player, L = G.level;
    for (const e of G.enemies) {
      const d = e.def; e.t += dt; if (e.flash > 0) e.flash -= dt;
      const cx = e.x + e.w / 2, dx = p.x + 5 - cx, dist = Math.abs(dx), dy = (p.y + p.h) - (e.y + e.h);
      if (dist > W * 1.1 && !e.summoned && !e.pdx) continue;
      const see = !p.dead && dist < (d.sight || 120) && Math.abs(dy) < (d.sightY || 50), sp = d.speed || 40;
      if (e.stun > 0) { e.stun -= dt; e.vx *= .9; }
      else if (e.hopT > 0) { e.hopT -= dt; e.vx = 0; if (e.hopT <= 0) { e.vy = -d.jump; e.vx = e.face * (d.chase || sp); } }
      else if (e.flee > 0) { e.flee -= dt; e.face = dx < 0 ? 1 : -1; e.vx = e.face * sp * 2.4; if (e.hitWall && e.onGround) e.vy = -250; }
      else switch (d.ai) {
        case 'flyer': {
          const ty = see ? p.y - (d.hover === undefined ? 26 : d.hover) : e.baseY;
          e.y += ((ty + Math.sin(e.t * 3) * 8) - e.y) * Math.min(1, dt * 1.6);
          if (see) { e.face = dx < 0 ? -1 : 1; e.vx = dist > (d.keep || 6) ? e.face * sp : 0; if (!e.agro) { e.agro = true; bark(e); } }
          else { e.agro = false; if (Math.abs(e.x - e.homeX) > 50) e.face = e.x > e.homeX ? -1 : 1; e.vx = e.face * sp * .4; }
          e.x += e.vx * dt;
          if (d.proj && see) { e.cd -= dt; if (e.cd <= 0) { e.cd = d.cooldown || 2; shootAt(e, d.proj); } }
          break;
        }
        case 'ranged':
          if (see) {
            e.face = dx < 0 ? -1 : 1; e.vx = 0; e.cd -= dt; e.tele = e.cd < .35;
            if (e.cd <= 0) { e.cd = d.cooldown || 2; e.tele = false; shootAt(e, d.proj); bark(e); }
          } else { e.tele = false; patrol(e, sp); }
          break;
        case 'chase':
          if (see) {
            e.face = dx < 0 ? -1 : 1; e.vx = dist > 5 ? e.face * (d.chase || sp * 1.6) : 0;
            if (d.jump && e.onGround && (e.hitWall || (dy < -20 && Math.random() < .04))) e.hopT = .4;
            if (!e.agro) { e.agro = true; bark(e); }
            if (!d.fearless && !d.mini && e.onGround && !groundAhead(e)) e.vx = 0;
          } else { e.agro = false; patrol(e, sp); }
          break;
        case 'charger':
          if (e.state === 'tele') { e.vx = 0; e.st -= dt; if (e.st <= 0) { e.state = 'run'; e.st = d.runTime || 1.4; } }
          else if (e.state === 'run') {
            e.vx = e.face * (d.charge || 200); e.st -= dt;
            if (e.onGround && Math.random() < .4) G.fx(e.x + e.w / 2, e.y + e.h, 1, '#e8e0d0', { speed: 20, life: .25, grav: 0 });
            if (e.hitWall || e.st <= 0 || (!d.fearless && e.onGround && !groundAhead(e))) { e.state = 'rest'; e.st = d.rest || .9; e.vx = 0; }
          }
          else if (e.state === 'rest') { e.vx = 0; e.st -= dt; if (e.st <= 0) e.state = ''; }
          else if (see && Math.abs(dy) < 26) { e.face = dx < 0 ? -1 : 1; e.state = 'tele'; e.st = d.tele || .5; bark(e); }
          else patrol(e, sp);
          break;
        case 'kamikaze':
          if (e.state === 'fuse') { e.vx = 0; e.st -= dt; if (e.st <= 0) { e.state = 'dash'; e.st = d.runTime || 1.3; } }
          else if (e.state === 'dash') { e.vx = e.face * (d.charge || 190); e.st -= dt; if (e.hitWall || e.st <= 0) boom(e); }
          else if (see) { e.face = dx < 0 ? -1 : 1; e.state = 'fuse'; e.st = d.tele || .6; bark(e); }
          else patrol(e, sp);
          break;
        default: patrol(e, sp);
      }
      const busy = e.stun > 0 || e.flee > 0 || e.state === 'tele' || e.state === 'run' || e.state === 'fuse' || e.state === 'dash';
      if (e.gun !== undefined && see && !busy) { // arma extra de la época: tiro apuntado con un breve aviso
        e.gun -= dt; if (e.gun < .3) e.tele = true;
        if (e.gun <= 0) { const tk = G.stage.tech || 0; e.gun = CV.rand(2.1, 3.3) - tk * .08; e.tele = false; e.face = dx < 0 ? -1 : 1; shootAt(e, Object.assign({ aim: true, speed: 130 + tk * 9, w: 5, h: 3, col: tk >= 8 ? '#73eff7' : '#ffcd75', sfx: tk >= 8 ? 'laser' : 'shoot' }, G.stage.gunProj)); }
      }
      else if (e.gun !== undefined && !d.mini && d.ai !== 'ranged') e.tele = false;
      if (d.mini && see && !(e.stun > 0)) {
        e.mcd -= dt; e.lcd -= dt; if (e.mcd < .4) e.tele = true;
        if (e.mcd <= 0) { // abanico de tres tiros
          e.mcd = 2.6; e.tele = false; e.face = dx < 0 ? -1 : 1; const tk = G.stage.tech || 0, ox = e.x + e.w / 2 + e.face * 8, oy = e.y + e.h * .4, a0 = Math.atan2(p.y + 7 - oy, p.x + 5 - ox), spd = 120 + tk * 8;
          for (let k = -1; k <= 1; k++) G.projs.push({ from: 'e', x: ox, y: oy, vx: Math.cos(a0 + k * .3) * spd, vy: Math.sin(a0 + k * .3) * spd, grav: 0, w: 6, h: 6, dmg: 1, col: '#ffa300', col2: '#ffe14a', life: 3 });
          sfx('bang');
        }
        if (e.lcd <= 0 && e.onGround) { e.lcd = CV.rand(3.2, 4.6); e.vy = -300; e.rush = .9; G.fx(e.x + e.w / 2, e.y + e.h, 8, '#e8e0d0', { speed: 60, life: .3, grav: 0 }); } // salto hacia el jugador
        if (e.rush > 0) { e.rush -= dt; e.vx = (dx < 0 ? -1 : 1) * Math.max(Math.abs(e.vx), (d.chase || 40) * 2.6); }
      }
      if (d.clumsy && e.onGround && e.stun <= 0 && Math.random() < .005) { e.stun = 1.3; e.vx = 0; e.dizzy = 1.3; G.say(e, CV.pick(d.clumsyBarks || ['¡Ups!']), 1.2); }
      if (e.dizzy > 0) e.dizzy -= dt;
      if (e.dead) continue;
      if (d.ai !== 'flyer') { e.vy = Math.min(430, e.vy + GRAV * dt); G.move(e, dt); }
      if (!p.dead && p.inv <= 0 && !(e.stun > 0) && CV.overlap(e, p)) {
        if (d.steal && !e.stole) {
          const w = CV.weapons[p.weapons[p.wi]], k = w.type === 'ranged' && p.ammo[w.id] > 0 ? w.id : Object.keys(p.ammo).find(a => p.weapons.indexOf(a) >= 0 && p.ammo[a] > 0);
          if (k) { p.ammo[k] = Math.floor(p.ammo[k] * .6); e.stole = true; e.flee = 3; p.inv = .6; sfx('coin'); G.say(e, CV.pick(d.stealBarks || ['¡Gracias!']), 1.8); G.say(p, '¡Mi munición!', 1.4); }
          else { G.hurtPlayer(d.dmg || 1, dx < 0 ? -1 : 1); }
        } else if (!(e.flee > 0)) { G.hurtPlayer(d.dmg || 1, dx < 0 ? -1 : 1); if (d.ai === 'kamikaze') boom(e); }
      }
      if (e.y > L.h * T + 60 || (G.zanja && e.x < G.zanja.x - 60)) e.gone = true;
    }
    G.enemies = G.enemies.filter(e => !e.dead && !e.gone);
  }

  // ---------- proyectiles ----------
  function updProjs(dt) {
    const p = G.player;
    for (const q of G.projs) {
      if (q.delay > 0) { q.delay -= dt; continue; }
      q.life -= dt; q.vy += (q.grav || 0) * dt; q.x += q.vx * dt; q.y += q.vy * dt;
      if (q.life <= 0) continue;
      if (!q.ghost && kindAt(Math.floor(q.x / T), Math.floor(q.y / T)) === 1) { if (q.bounce > 0 && q.vy > 0) { q.bounce--; q.y -= 5; q.vy = -Math.abs(q.vy) * .75 - 50; continue; } q.life = 0; G.fx(q.x, q.y, 3, q.col || '#fff', { speed: 40, life: .2 }); continue; }
      const hb = { x: q.x - q.w / 2, y: q.y - q.h / 2, w: q.w, h: q.h };
      if (q.from === 'p') {
        for (const e of G.enemies) {
          if (e.dead || q.hit.indexOf(e) >= 0 || !CV.overlap(hb, e)) continue;
          G.hurtEnemy(e, q.dmg, q.vx < 0 ? -1 : 1); q.hit.push(e);
          if (q.pierce-- <= 0) { q.life = 0; break; }
        }
        const b = G.boss;
        if (q.life > 0 && b && !b.dying && q.hit.indexOf(b) < 0 && CV.overlap(hb, b)) { CV.Boss.hurt(q.dmg, 'ranged'); q.hit.push(b); if (q.pierce-- <= 0) q.life = 0; }
      } else if (!p.dead && CV.overlap(hb, p)) {
        if (p.inv <= 0) { G.hurtPlayer(q.dmg || 1, q.vx < 0 ? -1 : 1); if (!q.keep) q.life = 0; }
      }
    }
    G.projs = G.projs.filter(q => q.life > 0 && q.y < G.level.h * T + 40);
  }

  // ---------- ítems ----------
  function updPickups(dt) {
    const p = G.player, sd = CV.save.data;
    for (const k of G.pickups) {
      k.t += dt;
      if (!k.float && !k.ground) {
        k.vy += GRAV * dt; k.y += k.vy * dt;
        if (k.vy > 0 && kindAt(Math.floor(k.x / T), Math.floor((k.y + 6) / T)) >= 1 && kindAt(Math.floor(k.x / T), Math.floor((k.y + 6) / T)) < 3) { k.y = Math.floor((k.y + 6) / T) * T - 6; k.ground = true; }
        if (k.y > G.level.h * T + 30) k.got = true;
      }
      if (p.dead || k.t < .25 || Math.abs(p.x + 5 - k.x) > 11 || Math.abs(p.y + 7 - k.y) > 13) continue;
      k.got = true;
      if (k.type === 'heal') {
        const it = CV.items[k.id] || { name: k.id, heal: 2 };
        p.hp = Math.min(p.maxHp, p.hp + it.heal); sfx('heal'); G.say(p, '+' + it.name, 1.2); G.fx(k.x, k.y, 8, ['#a7f070', '#f4f4f4'], { speed: 50, life: .4, grav: -40 });
      } else if (k.type === 'ammo') {
        for (const a in p.ammo) p.ammo[a] = Math.min(CV.weapons[a].ammo, p.ammo[a] + Math.ceil(CV.weapons[a].ammo * .5));
        sfx('pick'); G.say(p, '+Munición', 1);
      } else if (k.type === 'weapon') {
        const w = CV.weapons[k.id];
        if (p.weapons.indexOf(k.id) < 0) { p.weapons.push(k.id); if (sd.weapons.indexOf(k.id) < 0) { sd.weapons.push(k.id); CV.save.write(); } }
        p.wi = p.weapons.indexOf(k.id); G.sortWeapons();
        if (w.type === 'ranged') p.ammo[k.id] = w.ammo;
        sfx('weapon'); G.setBanner('¡ARMA: ' + w.name + '!');
        if (w.tech > G.stage.tech) G.say(p, '¡Esto no es de esta época! Ojo con la paradoja...', 3);
        G.fx(k.x, k.y, 12, ['#ffe14a', '#f4f4f4'], { speed: 70, life: .5 });
      } else if (k.type === 'collect') {
        G.collected[k.id] = true; sfx('coin');
        G.setBanner(G.stage.collectible.name + ' ' + Object.keys(G.collected).length + '/' + G.totalCollect, '#73eff7');
        G.fx(k.x, k.y, 10, ['#73eff7', '#f4f4f4'], { speed: 60, life: .4 });
      }
    }
    G.pickups = G.pickups.filter(k => !k.got);
  }

  // ---------- NPCs, checkpoints, portal ----------
  function updWorld(dt) {
    const p = G.player;
    for (const n of G.npcs) {
      const near = Math.abs(p.x - n.x) < 38 && Math.abs(p.y - n.y) < 34;
      n.face = p.x < n.x ? -1 : 1;
      if (near && !n.near) {
        const ls = n.def.lines; G.say(n, ls[n.said % ls.length], 4.2); n.said++; sfx('talk');
        if (!n.gift && n.def.gift) {
          n.gift = true; const gf = n.def.gift;
          G.pickups.push(mkPick(gf.weapon ? 'weapon' : gf.ammo ? 'ammo' : 'heal', gf.weapon || gf.heal || 'ammo', n.x + 6 + n.face * 14, n.y - 4, false));
        }
      }
      n.near = near;
    }
    for (const c of G.checks) if (!c.on && Math.abs(p.x + 5 - c.x) < 10 && Math.abs(p.y + p.h - c.y) < 24) {
      c.on = true; G.cp = { x: c.x - 5, y: c.y - 14 }; sfx('check'); G.setBanner('PUNTO DE CONTROL', '#73eff7'); G.fx(c.x, c.y - 20, 10, ['#73eff7', '#ffffff'], { speed: 60, life: .5 });
    }
    if (G.portal) {
      G.portal.t += dt;
      if (Math.random() < .3) G.fx(G.portal.x + CV.rand(-10, 10), G.portal.y - CV.rand(0, 36), 1, ['#b78cff', '#73eff7'], { speed: 10, life: .6, grav: -40 });
      if (!p.dead && !G.portal.fake && G.portal.t > .6 && Math.abs(p.x + 5 - G.portal.x) < 10 && Math.abs(p.y + p.h - G.portal.y) < 34) G.complete();
    }
  }

  // ---------- paradojas ----------
  function updParadox(dt) {
    const x = G.pdx;
    if (x.cool > 0) x.cool -= dt; else x.v = Math.max(0, x.v - 6 * dt);
    if (x.v >= 100) {
      x.v = 0; x.glitch = 1.6; x.spawnT = .7; x.count++; sfx('glitch'); G.shake = 10;
      G.setBanner('¡¡PARADOJA TEMPORAL!!', '#ff77a8'); CV.save.data.paradojas++;
      const b = G.boss; // en la arena, la paradoja le devuelve vida al jefe
      if (b && !b.dying && b.hp < b.def.hp) {
        b.hp = Math.min(b.def.hp, b.hp + b.def.hp * .2); b.flash = .4;
        G.setBanner('¡PARADOJA! EL JEFE RECUPERA VIDA', '#ff77a8'); G.say(b, CV.pick(['¡El tiempo está de mi lado!', '¡Gracias por el anacronismo!', '¡Como nuevo!']), 2.2);
        G.fx(b.x + b.w / 2, b.y + b.h / 2, 20, ['#a7f070', '#ff77a8', '#ffffff'], { speed: 90, life: .7, grav: -60 });
      }
    }
    if (x.spawnT > 0) { x.spawnT -= dt; if (x.spawnT <= 0) spawnParadox(); }
  }
  function spawnParadox() {
    const p = G.player, pool = Object.keys(CV.enemies).filter(k => CV.enemies[k].stage !== G.id && !CV.enemies[k].mini && CV.enemies[k].paradox !== false);
    if (!pool.length) return;
    let minX = 16, maxX = G.level.w * T - 16;
    if (G.arena && G.arena.active) { minX = G.arena.x0 + 16; maxX = G.arena.x1 - 16; }
    for (let i = 0; i < 3; i++) {
      const d = CV.enemies[CV.pick(pool)];
      const x = CV.clamp(p.x + (i % 2 ? 1 : -1) * CV.rand(55, 120), minX, maxX), y = freeSpot(x, p.y + p.h - (d.ai === 'flyer' ? 50 : 20));
      const e = G.spawnEnemy(d.id, x, y, { pdx: true }); if (!e) continue;
      G.fx(x, y - 8, 14, ['#ff77a8', '#73eff7', '#ffffff'], { speed: 90, life: .5, grav: 0 });
    }
    sfx('portal');
  }
  G.triggerParadox = () => { G.pdx.v = 100; G.pdx.cool = 1; };

  // ---------- mecánica: la zanja que avanza ----------
  function updZanja(dt) {
    const z = G.zanja; if (!z) return;
    const p = G.player, d = z.def;
    if (!z.active) { if (p.x > (d.startCol || 20) * T) { z.active = true; z.x = p.x - 20 * T; G.setBanner(d.banner || '¡LA ZANJA AVANZA!', '#ef7d57'); sfx('roar'); } return; }
    const limit = (G.arena ? G.arena.x0 : G.level.w * T) - 3 * T;
    if (z.x < limit) {
      z.x += (d.speed || 20) * dt;
      if (p.x - z.x > 22 * T) z.x = p.x - 22 * T;
      z.x = Math.min(z.x, limit);
    }
    const col = Math.floor(z.x / T) - 1;
    while (z.col < col) {
      z.col++;
      if (z.col >= 0 && z.col < G.level.w) for (let y = 0; y < G.level.h; y++) G.level.grid[y][z.col] = ' ';
      G.fx(z.col * T + 8, (G.level.h - 2) * T, 6, ['#8b5a2b', '#5a3a1a'], { speed: 60, life: .5, vy: -60 });
    }
  }

  // ---------- fin de etapa ----------
  G.complete = function () {
    const sd = CV.save.data, id = G.id, first = !sd.completed[id];
    sd.completed[id] = true;
    const got = Object.keys(G.collected).map(Number), h0 = CV.save.hearts();
    sd.collect[id] = Array.from(new Set((sd.collect[id] || []).concat(got))).sort((a, b) => a - b);
    for (const w of G.player.weapons) if (sd.weapons.indexOf(w) < 0) sd.weapons.push(w);
    CV.save.write();
    const piece = CV.progress.pieces().find(x => x.giver && x.giver.id === id);
    G.res = { collect: sd.collect[id].length, total: G.totalCollect, paradojas: G.pdx.count, time: G.time, piece: piece ? piece.branch : null, epilogue: first && G.stage.epilogue ? G.stage.epilogue : null, heart: CV.save.hearts() > h0 };
    G.state = 'results'; G.resT = 0; sfx('portal'); CV.audio.play(CV.music.hub, 1.3);
  };
})();
