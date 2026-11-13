// CRONOVIAJERO — núcleo: namespace, registros de datos, utilidades, guardado y progresión.
(function () {
  const CV = window.CV = {
    W: 384, H: 216, T: 16,
    stages: {}, enemies: {}, weapons: {}, items: {}, spriteDefs: {}, music: {}, timeline: null
  };

  // ---------- utilidades ----------
  CV.clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  CV.rand = (a, b) => b === undefined ? Math.random() * (a === undefined ? 1 : a) : a + Math.random() * (b - a);
  CV.pick = a => a[Math.random() * a.length | 0];
  CV.overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  CV.rng = seed => () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  CV.mkCanvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  CV.hexLerp = (a, b, t) => {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const ch = s => Math.round(((pa >> s) & 255) + (((pb >> s) & 255) - ((pa >> s) & 255)) * t);
    return '#' + ((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1);
  };
  CV.line = (g, x1, y1, x2, y2, col, th) => {
    x1 = Math.round(x1); y1 = Math.round(y1); x2 = Math.round(x2); y2 = Math.round(y2); th = th || 1;
    g.fillStyle = col;
    const dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1), sx = x1 < x2 ? 1 : -1, sy = y1 < y2 ? 1 : -1;
    let err = dx - dy, n = 0;
    while (n++ < 2000) {
      g.fillRect(x1 - (th >> 1), y1 - (th >> 1), th, th);
      if (x1 === x2 && y1 === y2) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x1 += sx; }
      if (e2 < dx) { err += dx; y1 += sy; }
    }
  };
  CV.disc = (g, cx, cy, r, col) => {
    g.fillStyle = col; cx = Math.round(cx); cy = Math.round(cy);
    for (let dy = -r; dy <= r; dy++) { const w = Math.round(Math.sqrt(r * r - dy * dy)); g.fillRect(cx - w, cy + dy, w * 2, 1); }
  };

  // ---------- registros de datos (lo que usan los archivos de data/) ----------
  CV.defineSprites = o => Object.assign(CV.spriteDefs, o);
  CV.defineWeapons = o => { for (const k in o) { o[k].id = k; CV.weapons[k] = o[k]; } };
  CV.defineItems = o => { for (const k in o) { o[k].id = k; CV.items[k] = o[k]; } };
  CV.defineEnemies = (o, stageId) => { for (const k in o) { o[k].id = k; o[k].stage = stageId; CV.enemies[k] = o[k]; } };
  CV.BOSS_HP = 1; // multiplicador global extra de vida de jefes (subir = peleas más largas)
  // la vida del jefe crece con la historia: tronco 1.2-1.5, ramas 1.7-2.5 según la posición, tramo final 2.6-3
  CV.bossScale = id => {
    const ss = CV.timeline ? CV.timeline.stages : [], s = ss.find(x => x.id === id); if (!s) return 2;
    const i = ss.filter(x => x.branch === s.branch).indexOf(s);
    return s.branch === 'tronco' ? 1.2 + .15 * i : s.branch === 'final' ? 2.6 + .2 * i : 1.5 + .25 * i;
  };
  // dificultad gradual (0 a 1): cuánto esquiva, resiste, se mueve e invoca un jefe, y cuánta comida/munición hay en la etapa
  CV.bossTier = id => {
    const ss = CV.timeline ? CV.timeline.stages : [], s = ss.find(x => x.id === id); if (!s) return .5;
    const i = ss.filter(x => x.branch === s.branch).indexOf(s);
    return s.branch === 'tronco' ? .08 * i : s.branch === 'final' ? .9 + .05 * i : .2 + .17 * i;
  };
  CV.stage = def => {
    CV.stages[def.id] = def;
    if (def.boss && !def.boss.baseHp) { def.boss.baseHp = def.boss.hp; def.boss.hp = Math.round(def.boss.hp * CV.BOSS_HP * CV.bossScale(def.id)); if (def.boss.tier === undefined) def.boss.tier = CV.bossTier(def.id); }
    if (def.sprites) CV.defineSprites(def.sprites);
    if (def.items) CV.defineItems(def.items);
    if (def.enemies) CV.defineEnemies(def.enemies, def.id);
  };

  // ---------- guardado ----------
  const KEY = 'cronoviajero_save_v1';
  CV.save = {
    data: null,
    fresh() { return { completed: {}, collect: {}, weapons: ['garrote'], upg: {}, paradojas: 0, cursor: null }; },
    load() {
      try { const s = JSON.parse(localStorage.getItem(KEY)); this.data = s && s.completed ? Object.assign(this.fresh(), s) : this.fresh(); }
      catch (e) { this.data = this.fresh(); }
    },
    write() { try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (e) { } },
    // mejoras del viajero: +1 corazón máximo cada HEART_EVERY coleccionables (hasta +4)
    HEART_EVERY: 6,
    relics() { let n = 0; for (const k in this.data.collect) n += this.data.collect[k].length; return n; },
    hearts() { return Math.min(4, Math.floor(this.relics() / this.HEART_EVERY)); },
    // mejoras de armas: cada reliquia es además 1 punto para gastar. Niveles 0..3, costo 2/4/6.
    UPG_COST: [2, 4, 6],
    level(id) { return this.data.upg[id] || 0; },
    points() { let n = this.relics(); for (const k in this.data.upg) for (let i = 0; i < this.data.upg[k]; i++) n -= this.UPG_COST[i]; return n; },
    cost(id) { return this.UPG_COST[this.level(id)]; },
    upgrade(id) { const c = this.cost(id); if (c === undefined || this.points() < c) return false; this.data.upg[id] = this.level(id) + 1; this.write(); this.apply(); return true; },
    // recalcula daño / munición / alcance de CV.weapons según el nivel: +15% daño, +20% munición, +4 px de alcance por nivel
    apply() {
      for (const id in CV.weapons) {
        const w = CV.weapons[id], l = this.level(id); if (!w.base) w.base = { dmg: w.dmg, ammo: w.ammo, reach: w.reach };
        w.dmg = Math.round(w.base.dmg * (1 + .15 * l) * 10) / 10;
        if (w.base.ammo) w.ammo = Math.round(w.base.ammo * (1 + .2 * l));
        if (w.base.reach) w.reach = w.base.reach + 4 * l;
      }
    },
    exists() { try { return !!localStorage.getItem(KEY); } catch (e) { return false; } },
    reset() { this.data = this.fresh(); try { localStorage.removeItem(KEY); } catch (e) { } }
  };

  // ---------- progresión por ramas ----------
  // Una etapa "no implementada" (sin archivo de datos) se muestra como PRÓXIMAMENTE y no bloquea a las siguientes.
  // La pieza de cada rama la entrega la última etapa implementada de esa rama.
  CV.progress = {
    impl: s => !!CV.stages[s.id],
    done: id => !!CV.save.data.completed[id],
    branchStages: b => CV.timeline.stages.filter(s => s.branch === b),
    pieceGiver(b) { const l = this.branchStages(b).filter(this.impl); return l.length ? l[l.length - 1] : null; },
    pieces() { return CV.timeline.regions.map(b => { const g = this.pieceGiver(b); return { branch: b, giver: g, have: !!g && this.done(g.id) }; }); },
    needPieces() { return Math.min(3, this.pieces().filter(p => p.giver).length); },
    status(s) {
      const P = this;
      if (!P.impl(s)) return 'soon';
      if (P.done(s.id)) return 'done';
      for (const o of P.branchStages(s.branch)) { if (o === s) break; if (P.impl(o) && !P.done(o.id)) return 'locked'; }
      if (s.branch !== 'tronco' && !P.branchStages('tronco').filter(P.impl).every(o => P.done(o.id))) return 'locked';
      // si ya se entró al tramo final con menos piezas (antes de que existiera otra rama), no se vuelve a bloquear
      if (s.branch === 'final' && !P.branchStages('final').some(o => P.done(o.id)) && P.pieces().filter(x => x.have).length < P.needPieces()) return 'locked';
      return 'open';
    }
  };
})();
