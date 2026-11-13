// Jefes dirigidos por datos: fases (por % de vida) con patrones de ataques tomados de una biblioteca.
// Tipos de ataque: charge, jump, shoot, rain, summon, lines, taunt. Ver data/stages/*.js para ejemplos.
(function () {
  const CV = window.CV, G = CV.Game, B = CV.Boss = {};
  const GRAVB = 800, sfx = n => CV.audio.sfx(n);

  B.start = function () {
    const st = G.stage, d = st.boss, ar = G.arena, p = G.player;
    ar.active = true; G.cp = { x: ar.x0 + 8, y: p.y };
    const sp = G.bossSpawn || { x: ar.x1 - 60, y: (G.level.h - 2) * 16 };
    const an = (d.anchors || [[.75, .4]])[0];
    G.boss = { def: d, x: sp.x - d.w / 2, y: sp.y - d.h, w: d.w, h: d.h, vx: 0, vy: 0, face: -1, hp: d.hp, phase: 0, state: 'idle', wait: 1.6, st: 0, sub: 0, pi: 0, t: 0, anim: 0, flash: 0, inv: 0, floor: sp.y, ax: an[0], ay: an[1], dir: -1, ammoT: 0, stun: 0 };
    CV.audio.play(st.music, 1.2);
    if (!G.bossIntroSeen) { G.bossIntroSeen = true; G.openDialog(st.dialogs && st.dialogs.bossIntro); }
    sfx('roar'); G.shake = 6;
    const L = { melee: 'LOS GOLPES', ranged: 'LOS DISPAROS' }, m = d.mul || {}, wk = Object.keys(m).filter(k => m[k] > 1), rs = Object.keys(m).filter(k => m[k] < 1);
    if (wk.length || rs.length) G.setBanner((wk.length ? 'DÉBIL A ' + L[wk[0]] : '') + (wk.length && rs.length ? ' · ' : '') + (rs.length ? 'RESISTE ' + L[rs[0]] : ''), '#a7f070');
  };
  B.hurt = function (dmg, kind) {
    const b = G.boss; if (!b || b.dying || b.inv > 0) return;
    const d0 = b.def;
    // fuera de la ventana vulnerable (barra amarilla) el jefe resiste: recibe 'armor' del daño (por defecto 60%)
    // cada jefe tiene debilidades/fortalezas: def.mul = { melee: x, ranged: y } multiplica el daño según el tipo de arma
    if (b.shield && !b.vuln) { // escudo: las balas rebotan; un golpe cuerpo a cuerpo lo rompe
      if (kind === 'ranged') { b.shHit = (b.shHit || 0) + 1; if (b.shHit % 3 === 1) sfx('empty'); G.fx(b.x + b.w / 2 + CV.rand(-b.w / 2, b.w / 2), b.y + b.h / 2 + CV.rand(-b.h / 2, b.h / 2), 3, '#73eff7', { speed: 120, life: .25 }); if (!G.shieldTip) { G.shieldTip = true; G.setBanner('¡ESCUDO! LAS BALAS REBOTAN: ROMPELO A GOLPES O ESPERÁ', '#73eff7'); } return; }
      b.shield = false; b.shT = 0; sfx('boom'); G.shake = Math.max(G.shake, 5); G.fx(b.x + b.w / 2, b.y + b.h / 2, 24, ['#73eff7', '#ffffff'], { speed: 150, life: .5, grav: 0 });
    }
    const T = d0.tier === undefined ? .5 : d0.tier, km = (d0.mul && d0.mul[kind]) || 1;
    b.hp -= dmg * km * (b.vuln ? 2 : (d0.armor === undefined ? .95 - .35 * T : d0.armor)); b.flash = .08; sfx('hit');
    if (km > 1) G.fx(b.x + b.w / 2, b.y + b.h / 2, 4, '#a7f070', { speed: 110, life: .3 });
    G.fx(b.x + b.w / 2 + CV.rand(-b.w / 3, b.w / 3), b.y + b.h / 2 + CV.rand(-b.h / 3, b.h / 3), 5, '#ffffff', { speed: 80, life: .25 });
    if (b.hp <= 0 && d0.revive && !b.revived) { // falsa victoria: cae, parece que ganaste... y unos segundos después vuelve "recauchutado"
      b.hp = 0; b.fake = .001; b.fk = 0; b.fkA = 1; b.inv = 99; b.state = 'idle'; b.vuln = false; b.shield = false; b.vx = 0; b.vy = -160; G.lines = []; G.projs = G.projs.filter(q => q.from === 'p');
      for (const e of G.enemies) if (e.summoned || e.pdx) G.killEnemy(e, 1, true);
      CV.audio.stop(); sfx('roar'); sfx('boom'); G.shake = 12;
      G.fx(b.x + b.w / 2, b.y + b.h / 2, 40, ['#ffa300', '#ffe14a', '#f4f4f4'], { speed: 170, life: .8 });
      return;
    }
    if (b.hp <= 0) {
      b.hp = 0; b.dying = .001; G.lines = []; G.projs = G.projs.filter(q => q.from === 'p');
      for (const e of G.enemies) if (e.summoned || e.pdx) G.killEnemy(e, 1, true);
      CV.audio.stop(); sfx('roar');
    }
  };
  function end(b, rest) {
    const d = b.def, a = b.a || {};
    b.state = 'idle'; b.wait = (rest !== undefined ? rest : (a.rest !== undefined ? a.rest : (d.rest || 1))) * (1.15 - .35 * tier(d)); b.vuln = false; b.vx = 0;
    if (d.mode === 'hover') roam(b);
  }
  const tier = d => d.tier === undefined ? .5 : d.tier;
  function roam(b, far) { // elige otro punto de vuelo (el más lejano si está esquivando)
    const an = (b.def.anchors || [[.5, .4]]).filter(q => q[0] !== b.ax || q[1] !== b.ay); if (!an.length) return;
    const pick = far ? an.slice().sort((q, r) => Math.abs(r[0] - b.ax) - Math.abs(q[0] - b.ax))[0] : CV.pick(an);
    b.ax = pick[0]; b.ay = pick[1]; b.roamT = CV.rand(1.3, 2.3) * (2.6 - 1.6 * tier(b.def)) * (b.def.slow || 1);
  }
  function minions(b, a, n) {
    const ar = G.arena, pcx = G.player.x + 5, mid = (ar.x0 + ar.x1) / 2, alive = G.enemies.filter(e => e.summoned).length;
    n = Math.min(n, (a.max || 4) + 1 + Math.round(2 * tier(b.def)) - alive); if (n <= 0) return;
    for (let i = 0; i < n; i++) {
      const id = CV.pick(a.ids), ex = pcx < mid ? ar.x1 - 24 - i * 20 : ar.x0 + 24 + i * 20;
      const e = G.spawnEnemy(id, ex, b.floor - (CV.enemies[id] && CV.enemies[id].ai === 'flyer' ? 70 : 4), { summoned: true });
      if (e) G.fx(ex, b.floor - 12, 10, ['#f4f4f4', '#ffe14a'], { speed: 70, life: .4, grav: 0 });
    }
    sfx('portal');
  }
  function next(b) {
    const d = b.def, ph = d.phases[b.phase], p = G.player, pat = b.revived && d.revive.pattern ? d.revive.pattern : ph.pattern;
    const name = pat[b.pi++ % pat.length], a = d.attacks[name];
    if (!a) { console.warn('Ataque de jefe no definido:', name); b.wait = 1; return; }
    b.a = a; b.state = a.type; b.st = 0; b.sub = 0; b.dir = b.face = (p.x + 5 < b.x + b.w / 2) ? -1 : 1;
  }
  function fire(b, a) {
    const p = G.player, ox = b.x + b.w / 2 + b.face * (a.ox === undefined ? b.w * .3 : a.ox), oy = b.y + (a.oy === undefined ? b.h * .35 : a.oy);
    const tx = p.x + 5, ty = p.y + 7, n = a.n || 1, sp = a.speed || 140, pr = a.proj || {};
    for (let i = 0; i < n; i++) {
      let vx, vy;
      if (a.aim === 'arc') { const tt = (a.tt || 1.1) * (1 + (i - (n - 1) / 2) * .22), gr = pr.grav || 300; vx = (tx - ox) / tt; vy = (ty - oy) / tt - .5 * gr * tt; }
      else { const ang = Math.atan2(ty - oy, tx - ox) + (i - (n - 1) / 2) * (a.spread || .28); vx = Math.cos(ang) * sp; vy = Math.sin(ang) * sp; }
      G.projs.push(Object.assign({ from: 'e', x: ox, y: oy, vx, vy, grav: a.aim === 'arc' ? 300 : 0, w: 6, h: 6, dmg: 1, col: '#ffffff', life: 4 }, pr));
    }
    sfx(a.sfx || 'shoot');
  }
  function mkLines(b, a) {
    const p = G.player, ar = G.arena, fl = b.floor, pcx = p.x + 5, pcy = p.y + 7, kind = CV.pick(a.kinds || ['floor']);
    const base = { t: 0, warn: a.warn || .9, live: a.live || .6, col: a.col || '#e03c32', thick: a.thick || 4, label: a.labels ? CV.pick(a.labels) : null };
    const push = (x1, y1, x2, y2) => G.lines.push(Object.assign({ x1, y1, x2, y2 }, base));
    if (kind === 'floor') { const len = CV.rand(70, 120), x1 = CV.clamp(pcx - len / 2 + CV.rand(-20, 20), ar.x0 + 4, ar.x1 - len - 4); push(x1, fl - 3, x1 + len, fl - 3); }
    else if (kind === 'beam') { const x = pcx + CV.rand(-6, 6); push(x, G.cam.y - 4, x, fl); }
    else if (kind === 'diag') { const d = Math.random() < .5 ? -1 : 1, k = (fl - pcy) / 100; push(pcx - d * 80, pcy - 115, pcx + d * 70 * k, fl); }
    else if (kind === 'zig') { const d = Math.random() < .5 ? -1 : 1, x1 = pcx - d * 60; push(x1, fl - 3, pcx + d * 30, fl - 3); push(pcx + d * 30, fl - 3, pcx + d * 30, G.cam.y - 4); }
    else if (kind === 'pillar') { const x = b.sub % 2 ? pcx + CV.rand(-10, 10) : CV.rand(ar.x0 + 10, ar.x1 - 10); push(x, fl - (a.height || 70), x, fl); }
    else if (kind === 'high') { const y = fl - CV.rand(34, 48); push(ar.x0, y, ar.x1, y); }
  }

  B.update = function (dt) {
    const b = G.boss; if (!b) { updLines(dt); return; }
    const d = b.def, p = G.player, ar = G.arena, ph = d.phases[b.phase];
    b.t += dt; b.anim += dt; if (b.flash > 0) b.flash -= dt; if (b.inv > 0) b.inv -= dt; if (b.stun > 0) b.stun -= dt;
    if (b.fake) { // falsa victoria (ver B.hurt): cae y desaparece, se abre un portal, el portal se cierra en la cara, confusión... y revive
      const rv = d.revive; b.fake += dt; const f = b.fake;
      if (!b.fk) { // 1) se desploma como una derrota de verdad
        b.vy += GRAVB * dt; b.y = Math.min(b.floor - b.h * .55, b.y + b.vy * dt); b.fkA = Math.max(0, 1 - f / 2.2);
        if (f < 2 && Math.random() < .4) { G.fx(b.x + CV.rand(0, b.w), b.y + CV.rand(0, b.h), 8, ['#ffa300', '#ffe14a', '#f4f4f4'], { speed: 90, life: .5 }); G.shake = Math.max(G.shake, 4); if (Math.random() < .3) sfx('boom'); }
        if (f >= 2.8) { // 2) portal de salida y música de victoria, como en cualquier etapa
          const pos = G.portalPos || { x: (ar.x0 + ar.x1) / 2, y: b.floor };
          b.fk = 1; b.fkT = 0; G.portal = { x: pos.x, y: pos.y, t: 0, fake: true }; sfx('portal'); G.setBanner('¡PORTAL ABIERTO!', '#b78cff'); CV.audio.play(CV.music.hub, 1.2);
          G.fx(pos.x, pos.y - 20, 24, ['#b78cff', '#73eff7', '#ffffff'], { speed: 120, life: .7, grav: 0 });
        }
      } else if (b.fk === 1) { // 3) al ir a entrar, el portal se cierra y la música se corta
        b.fkT += dt; const po = G.portal;
        if (!po || b.fkT > 45 || (po.t > .6 && Math.abs(p.x + 5 - po.x) < 12 && Math.abs(p.y + p.h - po.y) < 34)) {
          if (po) { G.fx(po.x, po.y - 20, 30, ['#b78cff', '#73eff7', '#1a1c2c'], { speed: 60, life: .5, grav: 0 }); G.portal = null; }
          CV.audio.stop(); sfx('empty'); sfx('glitch'); G.pdx.glitch = Math.max(G.pdx.glitch || 0, .3); b.fk = 2; b.fc = 0;
          b.x = (ar.x0 + ar.x1) / 2 - b.w / 2; b.y = b.floor - b.h - 70;
        }
      } else { // 4) unos segundos largos de confusión; después tiembla todo y vuelve
        const c0 = b.fc; b.fc += dt; const c = b.fc, at = x => c0 < x && c >= x;
        if (at(1.4)) G.say(p, '...¿Y el portal?', 2.2);
        if (at(4.4)) G.say(p, '...¿Por qué se paró la música?', 2.6);
        if (at(7.8)) G.say(p, '¿Hola? ...Mejor que no conteste nadie.', 2.6);
        if (c > 9.5) {
          G.shake = Math.max(G.shake, (c - 9.5) * 4); b.fkA = Math.min(1, (c - 9.5) / 3.5) * (Math.floor(b.t * 16) % 2 ? 1 : .4);
          if (Math.random() < .12) { sfx('glitch'); G.pdx.glitch = Math.max(G.pdx.glitch || 0, .25); }
          if (Math.random() < .5) G.fx(b.x + CV.rand(0, b.w), b.y + CV.rand(0, b.h), 3, ['#ff77a8', '#73eff7'], { speed: 60, life: .5, grav: -120 });
        }
        if (at(11)) G.say(p, 'Ay, no.', 1.8);
        if (c >= 13.2) {
          b.fake = 0; b.fk = 0; b.fkA = 1; b.revived = true; b.hp = d.hp * (rv.hp || .5); b.inv = 2.8; b.state = 'idle'; b.wait = 2.2; b.vy = 0; b.pi = 0; b.title = rv.name; b.dash = .6;
          if (d.mode !== 'hover') b.y = b.floor - b.h;
          G.shake = 16; sfx('roar'); sfx('glitch'); G.pdx.glitch = 1.2;
          G.setBanner(rv.banner || '¡¡RECAUCHUTADO!!', '#ff77a8'); if (rv.say) G.say(b, rv.say, 3.4);
          G.fx(b.x + b.w / 2, b.y + b.h / 2, 40, ['#ff77a8', '#73eff7', '#ffffff', '#ffe14a'], { speed: 160, life: .9, grav: 0 });
          CV.audio.play(G.stage.music, 1.55);
          // segunda vuelta: se repone al viajero (comida y munición) para que la pelea larga quede pareja
          for (let k = 0; k < (rv.refill === undefined ? 2 : rv.refill); k++) G.pickups.push({ type: 'heal', id: G.stage.heals[G.stage.heals.length - 1], x: p.x + 5 + (k ? 26 : -26), y: G.cam.y, vy: 0, float: false, t: 1 });
          G.pickups.push({ type: 'ammo', id: 'ammo', x: p.x + 5, y: G.cam.y, vy: 0, float: false, t: 1 });
        }
      }
      updLines(dt); return;
    }
    if (b.dying) {
      b.dying += dt;
      if (Math.random() < .35) { G.fx(b.x + CV.rand(0, b.w), b.y + CV.rand(0, b.h), 10, ['#ffa300', '#ffe14a', '#f4f4f4'], { speed: 100, life: .5 }); G.shake = Math.max(G.shake, 4); if (Math.random() < .4) sfx('boom'); }
      if (b.dying > 2.4) { G.boss = null; done(); }
      updLines(dt); return;
    }
    if (b.phase < d.phases.length - 1 && b.hp / d.hp <= ph.until) {
      b.phase++; const np = d.phases[b.phase];
      b.inv = 1.4; b.state = 'idle'; b.wait = 1.5; b.vuln = false; b.vx = 0; b.pi = 0; G.lines = []; G.shake = 9; sfx('roar');
      if (b.def.mode !== 'hover') b.y = b.floor - b.h;
      if (np.say) G.say(b, np.say, 2.8);
      CV.audio.play(G.stage.music, 1.2 + .12 * b.phase);
      updLines(dt); return;
    }
    const cx = b.x + b.w / 2, pcx = p.x + 5, sp = (ph.speed || 1) * (b.revived ? (d.revive.speed || 1.25) : 1), hover = d.mode === 'hover', a = b.a;
    // refuerzos automáticos cada tanto (si el jefe tiene algún ataque de invocación)
    b.minT = (b.minT || 0) + dt * sp;
    if (b.minT > (d.minionEvery || 15 - 7 * tier(d))) { b.minT = 0; const sa = Object.values(d.attacks).find(q => q.type === 'summon'); if (sa) minions(b, sa, 1 + (b.phase > 0 ? 1 : 0)); }
    // esquive: si viene un disparo o un golpe y no está vulnerable, se corre (con un instante de invulnerabilidad)
    b.dgCd = (b.dgCd || 0) - dt; if (b.dash > 0) b.dash -= dt;
    if (!b.vuln && b.dgCd <= 0 && d.dodge !== false && (hover ? ['idle', 'shoot', 'radial', 'rain', 'summon', 'lines'].indexOf(b.state) >= 0 : b.state === 'idle' && b.stun <= 0)) {
      const threat = G.projs.some(q => q.from === 'p' && Math.abs(q.y - (b.y + b.h / 2)) < b.h / 2 + 12 && (cx - q.x) * q.vx > 0 && Math.abs(cx - q.x) < 80) || (p.atkT > 0 && Math.abs(pcx - cx) < b.w / 2 + 36 && p.y + p.h > b.y - 10 && p.y < b.y + b.h + 10);
      if (threat) {
        if (Math.random() < (d.dodgeChance || .1 + .5 * tier(d))) {
          b.dgCd = (2.8 - 1.1 * tier(d)) / sp; b.inv = Math.max(b.inv, .28); sfx('roll');
          if (hover) { roam(b, tier(d) > .4); b.dash = .5; }
          else {
            let dir = cx < pcx ? -1 : 1, over = false;
            if ((dir < 0 && b.x - ar.x0 < 56) || (dir > 0 && ar.x1 - b.x - b.w < 56)) { dir = -dir; over = true; }
            b.back = b.wait; b.state = 'dodge'; b.vy = over ? -340 : -210; b.vx = dir * (over ? 230 : 150);
          }
        } else b.dgCd = .6;
      }
    }
    if (hover && ['idle', 'shoot', 'radial', 'rain', 'summon', 'lines'].indexOf(b.state) >= 0) { // vuela de punto en punto también mientras ataca
      b.roamT = (b.roamT === undefined ? 1.5 : b.roamT) - dt * sp; if (b.roamT <= 0) roam(b);
      const tx = ar.x0 + b.ax * (ar.x1 - ar.x0) - b.w / 2, ty = b.floor - b.ay * 150 - b.h + Math.sin(b.anim * 2.2) * 5, k = Math.min(1, dt * (b.dash > 0 ? 8 : 1.5 + 1.3 * tier(d)) / (d.slow || 1));
      b.x += (tx - b.x) * k; b.y += (ty - b.y) * k;
    }
    switch (b.state) {
      case 'dodge':
        b.vy += GRAVB * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.face = pcx < cx ? -1 : 1;
        if (b.vy > 0 && b.y + b.h >= b.floor) { b.y = b.floor - b.h; b.vx = 0; b.state = 'idle'; b.wait = Math.min(b.back || .5, .6); G.fx(cx, b.floor, 6, '#e8e0d0', { speed: 50, life: .3, grav: 0 }); }
        break;
      case 'idle':
        b.face = pcx < cx ? -1 : 1;
        if (hover) {
        } else if (d.walk && Math.abs(pcx - cx) > 60 && b.stun <= 0) b.x += b.face * d.walk * sp * dt;
        b.wait -= dt * sp; if (b.wait <= 0) next(b);
        break;
      case 'charge': {
        b.st += dt; const tele = (a.tele || .7) / sp;
        if (b.st < tele) { if (hover) b.y += ((p.y + p.h - b.h + (a.dy || 0)) - b.y) * Math.min(1, dt * 5); }
        else {
          b.x += b.dir * a.speed * sp * dt;
          if (a.trail) { b.trT = (b.trT || 0) - dt; if (b.trT <= 0) { b.trT = .1; G.lines.push({ x1: cx - 9, y1: b.floor - 3, x2: cx + 9, y2: b.floor - 3, t: 0, warn: .3, live: a.trail, col: a.trailCol || '#ff7a3d', thick: 4 }); } }
          if (!hover && Math.random() < .5) G.fx(cx - b.dir * b.w / 2, b.floor, 1, '#e8e0d0', { speed: 30, life: .3, grav: 0 });
          if (b.x <= ar.x0 + 3 || b.x + b.w >= ar.x1 - 3) { G.shake = 7; sfx('boom'); b.stun = a.rest || 1.1; end(b); }
        }
        break;
      }
      case 'jump':
        b.st += dt;
        if (b.sub === 0) {
          if (b.st > (a.tele || .45) / sp) {
            b.sub = 1; const pw = a.power || 330, tx = CV.clamp(pcx - b.w / 2, ar.x0 + 4, ar.x1 - b.w - 4);
            b.vy = -pw; b.vx = (tx - b.x) / (2 * pw / GRAVB); sfx('jump');
          }
        } else {
          b.vy += GRAVB * dt; b.x += b.vx * dt; b.y += b.vy * dt;
          if (b.vy > 0 && b.y + b.h >= b.floor) {
            b.y = b.floor - b.h; G.shake = 8; sfx('boom'); G.fx(cx, b.floor, 14, '#e8e0d0', { speed: 90, life: .4, grav: 0 });
            for (const dir of [-1, 1]) G.projs.push(Object.assign({ from: 'e', x: cx + dir * b.w / 2, y: b.floor - 5, vx: dir * (a.wave || 150), vy: 0, grav: 0, w: 10, h: 10, dmg: 1, col: '#f4f4f4', life: 1.5, ghost: true, wave: true }, a.waveProj));
            end(b);
          }
        }
        break;
      case 'shoot': {
        b.st += dt; const every = (a.every || .4) / sp;
        if (b.st >= (a.tele || .45) + b.sub * every) { b.face = pcx < cx ? -1 : 1; fire(b, a); b.sub++; if (b.sub >= (a.count || 1) + (b.phase > 0 && tier(d) > .4 ? 1 : 0)) end(b); }
        break;
      }
      case 'radial': {
        b.st += dt; const every = (a.every || .7) / sp;
        if (b.st >= (a.tele || .5) + b.sub * every) {
          const n = a.n || 10, spd = a.speed || 95;
          for (let i = 0; i < n; i++) { const ang = i / n * 6.2832 + b.sub * (a.twist || .31); G.projs.push(Object.assign({ from: 'e', x: cx, y: b.y + b.h * .45, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, grav: 0, w: 6, h: 6, dmg: 1, col: '#ffffff', life: 4, ghost: true }, a.proj)); }
          sfx(a.sfx || 'zap'); b.sub++; if (b.sub >= (a.count || 2)) end(b);
        }
        break;
      }
      case 'rain': {
        b.st += dt; const every = (a.every || .25) / sp;
        if (b.st >= .4 + b.sub * every) {
          const x = b.sub % 2 ? pcx + CV.rand(-24, 24) : CV.rand(ar.x0 + 12, ar.x1 - 12);
          G.projs.push(Object.assign({ from: 'e', x, y: G.cam.y - 10, vx: 0, vy: a.speed || 170, grav: 0, w: 8, h: 8, dmg: 1, col: '#c2c3c7', life: 4, delay: a.warn || .6, floorY: b.floor }, a.proj));
          b.sub++; if (b.sub % 3 === 0) sfx('zap');
          if (b.sub >= (a.count || 6)) end(b);
        }
        break;
      }
      case 'summon':
        b.st += dt;
        if (b.sub === 0 && b.st > .5) {
          b.sub = 1; minions(b, a, (a.n || 2) + (b.phase > 0 ? 1 : 0)); b.minT = 0;
        }
        if (b.st > 1.1) end(b);
        break;
      case 'lines': {
        b.st += dt; const every = (a.every || .5) / sp;
        if (b.st >= .4 + b.sub * every) { mkLines(b, a); sfx('move'); b.sub++; if (b.sub >= (a.n || 2)) end(b); }
        break;
      }
      case 'taunt':
        if (b.sub === 0) { b.sub = 1; G.say(b, CV.pick(a.say), a.dur || 2); }
        b.st += dt; b.vuln = true;
        if (hover) b.y += ((b.floor - b.h - 6) - b.y) * Math.min(1, dt * 3);
        if (b.st > (a.dur || 2)) end(b, .4);
        break;
      default: end(b);
    }
    b.x = CV.clamp(b.x, ar.x0 + 2, ar.x1 - b.w - 2);
    if (!p.dead && CV.overlap(b, p)) G.hurtPlayer(d.contact || 1, pcx < cx ? -1 : 1);
    // red de seguridad: si el jugador se queda sin munición y sin opciones, cae una caja
    b.ammoT += dt;
    // escudo anti-balas de los jefes débiles a los disparos: se prende y apaga por turnos (dura más en las etapas avanzadas)
    if (d.shield !== false && (d.shield || tier(d) >= .85 || (d.mul && d.mul.ranged > 1))) { // débiles a disparos y todos los jefes de cierre (último de cada rama y tramo final)
      b.shT = (b.shT === undefined ? -5 : b.shT) + (b.shield ? -dt : dt);
      if (b.shield && (b.shT <= 0 || b.vuln)) { b.shield = false; b.shT = 0; }
      else if (!b.shield && !b.vuln && b.shT >= 6.5 - 2.5 * tier(d)) { b.shield = true; b.shT = 3.5 + 3 * tier(d); sfx('portal'); }
    }
    // comida de auxilio: si el viajero anda con poca vida y no hay comida a la vista, cae una (más seguido en las etapas tempranas)
    b.healT = (b.healT || 0) + dt;
    if (b.healT > (d.healEvery || 16 + 16 * tier(d))) { b.healT = 0; if (p.hp <= p.maxHp * .6 && !G.pickups.some(k => k.type === 'heal' && k.x > ar.x0)) G.pickups.push({ type: 'heal', id: G.stage.heals[0], x: CV.rand(ar.x0 + 30, ar.x1 - 30), y: G.cam.y, vy: 0, float: false, t: 1 }); }
    if (b.ammoT > (d.ammoEvery || 12)) { b.ammoT = 0; if (!G.pickups.some(k => k.type === 'ammo')) G.pickups.push({ type: 'ammo', id: 'ammo', x: CV.rand(ar.x0 + 30, ar.x1 - 30), y: G.cam.y, vy: 0, float: false, t: 1 }); }
    updLines(dt);
  };
  function updLines(dt) {
    const p = G.player, px = p.x + 5, py = p.y + 7;
    for (const l of G.lines) {
      const was = l.t < l.warn; l.t += dt;
      if (was && l.t >= l.warn) sfx('zap');
      if (l.t >= l.warn && !p.dead && p.inv <= 0) {
        const dx = l.x2 - l.x1, dy = l.y2 - l.y1, len2 = dx * dx + dy * dy || 1, u = CV.clamp(((px - l.x1) * dx + (py - l.y1) * dy) / len2, 0, 1);
        const ex = l.x1 + u * dx - px, ey = l.y1 + u * dy - py;
        if (ex * ex + ey * ey < (l.thick + 5) * (l.thick + 5)) G.hurtPlayer(1, p.face * -1);
      }
    }
    G.lines = G.lines.filter(l => l.t < l.warn + l.live);
  }
  function done() {
    const st = G.stage, ar = G.arena;
    ar.active = false; ar.cleared = true; G.enemies = G.enemies.filter(e => !e.summoned);
    CV.audio.play(st.music);
    G.openDialog(st.dialogs && st.dialogs.bossDefeat, () => {
      const pos = G.portalPos || { x: (ar.x0 + ar.x1) / 2, y: (G.level.h - 2) * 16 };
      G.portal = { x: pos.x, y: pos.y, t: 0 }; sfx('portal'); G.setBanner('¡PORTAL ABIERTO!', '#b78cff');
      G.fx(pos.x, pos.y - 20, 24, ['#b78cff', '#73eff7', '#ffffff'], { speed: 120, life: .7, grav: 0 });
    });
  }
})();
