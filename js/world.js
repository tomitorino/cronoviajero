// Mundo: niveles como tilemaps de texto, tiles procedurales por "receta" y fondos parallax generados.
(function () {
  const CV = window.CV, T = 16, BW = 512, H = 216;

  // ---------- leyenda base del formato de niveles ----------
  // Cada etapa puede agregar letras propias en stage.level.legend.
  CV.LEGEND = {
    '#': { tile: 'solid' }, 'B': { tile: 'solid' }, '=': { tile: 'oneway' }, '^': { tile: 'hazard' },
    'P': { player: 1 }, 'O': { portal: 1 }, 'c': { collect: 1 }, 'h': { heal: 1 }, 'm': { ammo: 1 },
    'F': { check: 1 }, '[': { arena: 1 }, 'X': { boss: 1 }
  };
  const KIND = { solid: 1, oneway: 2, hazard: 3 };

  // Une los segmentos en una sola grilla. Cada segmento se alinea abajo; una fila terminada en '*'
  // repite su último caracter hasta el ancho del segmento (ej. '#*' = fila entera de piso).
  CV.levelRows = function (L) {
    const Hh = L.height || 14;
    if (L.map) return L.map.slice();
    const rows = []; for (let i = 0; i < Hh; i++) rows.push('');
    for (const seg of L.segments) {
      const w = seg.reduce((m, r) => Math.max(m, r.endsWith('*') ? r.length - 1 : r.length), 0), pad = Hh - seg.length;
      for (let y = 0; y < Hh; y++) {
        let r = y < pad ? '' : seg[y - pad];
        if (r.endsWith('*')) { const ch = r[r.length - 2] || ' '; r = r.slice(0, -1); while (r.length < w) r += ch; }
        rows[y] += r.padEnd(w, ' ');
      }
    }
    return rows;
  };

  CV.buildLevel = function (stage, overrideRows) {
    const L = stage.level, legend = Object.assign({}, CV.LEGEND, L.legend);
    const rows = overrideRows || CV.levelRows(L);
    const w = rows.reduce((m, r) => Math.max(m, r.length), 0), h = rows.length;
    const grid = [], spawns = [], kind = {}, tiles = {};
    for (const ch in legend) if (legend[ch].tile) kind[ch] = KIND[legend[ch].tile];
    for (let y = 0; y < h; y++) {
      const r = rows[y].padEnd(w, ' ').split('');
      for (let x = 0; x < w; x++) {
        const ch = r[x]; if (ch === ' ' || ch === '.') { r[x] = ' '; continue; }
        const d = legend[ch];
        if (!d) { console.warn('Nivel', stage.id, 'caracter desconocido', ch, 'en', x, y); r[x] = ' '; continue; }
        if (!d.tile) { spawns.push({ x, y, def: d, ch }); r[x] = ' '; }
      }
      grid.push(r);
    }
    for (const ch in kind) tiles[ch] = CV.tileSet(ch, (stage.tiles || {})[ch], kind[ch]);
    return { w, h, grid, orig: grid.map(r => r.slice()), kind, tiles, spawns, legend };
  };

  // ---------- tiles procedurales ----------
  function solidTile(r, exposed, seed) {
    const c = CV.mkCanvas(T, T), g = c.getContext('2d'), R = CV.rng(seed);
    const px = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x, y, w, h); };
    const dk = r.dark, lt = r.light;
    px(0, 0, T, T, r.base);
    switch (r.pattern) {
      case 'brick':
        for (let y = 0; y < 16; y += 4) { px(0, y + 3, 16, 1, dk); const off = (y / 4 % 2) * 4; for (let x = off; x < 16; x += 8) px(x, y, 1, 3, dk); if (R() < .6) px(1 + (R() * 12 | 0), y, 3, 1, lt); }
        break;
      case 'stone':
        px(0, 7, 16, 1, dk); px(0, 15, 16, 1, dk); px(7, 0, 1, 7, dk); px(15, 8, 1, 7, dk);
        px(0, 0, 7, 1, lt); px(8, 0, 8, 1, lt); px(0, 8, 15, 1, lt);
        for (let i = 0; i < 4; i++) px(R() * 16 | 0, R() * 16 | 0, 1, 1, dk);
        break;
      case 'metal':
        px(0, 0, 16, 1, lt); px(0, 0, 1, 16, lt); px(0, 15, 16, 1, dk); px(15, 0, 1, 16, dk);
        px(2, 2, 1, 1, lt); px(13, 2, 1, 1, lt); px(2, 13, 1, 1, dk); px(13, 13, 1, 1, dk); px(4, 8, 8, 1, dk);
        if (r.glow && R() < .5) px(5, 5, 6, 1, r.glow);
        break;
      case 'wood':
        px(0, 4, 16, 1, dk); px(0, 9, 16, 1, dk); px(0, 14, 16, 1, dk);
        for (let i = 0; i < 4; i++) px(R() * 12 | 0, R() * 16 | 0, 3, 1, lt);
        break;
      case 'pave':
        px(0, 7, 16, 1, dk); px(0, 15, 16, 1, dk); px(7, 0, 1, 16, dk); px(15, 0, 1, 16, dk);
        for (let i = 0; i < 3; i++) px(R() * 16 | 0, R() * 16 | 0, 1, 1, lt);
        break;
      default:
        for (let i = 0; i < 14; i++) px(R() * 16 | 0, R() * 16 | 0, 1 + (R() * 2 | 0), 1, dk);
        for (let i = 0; i < 7; i++) px(R() * 16 | 0, R() * 16 | 0, 1, 1, lt);
    }
    if (exposed && r.top) {
      const th = r.topH || 3; px(0, 0, 16, th, r.top);
      if (r.topLight) for (let x = 0; x < 16; x++) if (R() < .4) px(x, 0, 1, 1, r.topLight);
      for (let x = 0; x < 16; x++) { if (r.topDark) px(x, th - 1 + (R() < .4 ? 1 : 0), 1, 1, r.topDark); else if (R() < .45) px(x, th, 1, 1, r.top); }
    }
    return c;
  }
  function platTile(r) {
    const c = CV.mkCanvas(T, T), g = c.getContext('2d');
    g.fillStyle = r.base; g.fillRect(0, 0, 16, 5); g.fillStyle = r.light; g.fillRect(0, 0, 16, 1);
    g.fillStyle = r.dark; g.fillRect(0, 4, 16, 1); g.fillRect(3, 5, 2, 2); g.fillRect(11, 5, 2, 2); g.fillRect(7, 1, 1, 3);
    return c;
  }
  function spikeTile(r) {
    const c = CV.mkCanvas(T, T), g = c.getContext('2d');
    for (let s = 0; s < 4; s++) for (let y = 0; y < 8; y++) {
      const w = Math.ceil((y + 1) / 2); g.fillStyle = y < 2 ? r.light : r.base; g.fillRect(s * 4 + 2 - (w >> 1), 8 + y, w, 1);
    }
    g.fillStyle = r.dark; g.fillRect(0, 15, 16, 1);
    return c;
  }
  CV.tileSet = function (ch, r, kind) {
    r = Object.assign({ pattern: 'dirt', base: '#6a6a7a', dark: '#4a4a5a', light: '#8a8a9a' }, r);
    const s = ch.charCodeAt(0);
    if (kind === 1) return { top: [0, 1, 2].map(i => solidTile(r, true, s * 31 + i)), body: [0, 1, 2].map(i => solidTile(r, false, s * 77 + i + 9)) };
    const c = kind === 2 ? platTile(r) : spikeTile(r);
    return { top: [c, c, c], body: [c, c, c] };
  };
  CV.drawTiles = function (g, L, cx, cy, vw, vh) {
    const x0 = Math.max(0, Math.floor(cx / T)), x1 = Math.min(L.w - 1, Math.floor((cx + (vw || CV.W)) / T));
    const y0 = Math.max(0, Math.floor(cy / T)), y1 = Math.min(L.h - 1, Math.floor((cy + (vh || CV.H)) / T));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const ch = L.grid[y][x]; if (ch === ' ') continue;
      const ts = L.tiles[ch]; if (!ts) continue;
      const exposed = y === 0 || L.kind[L.grid[y - 1][x]] !== 1;
      g.drawImage((exposed ? ts.top : ts.body)[(x * 7 + y * 3) % 3], x * T, y * T);
    }
  };

  // ---------- fondos parallax ----------
  const disc = CV.disc;
  const GEN = {
    stars(g, o, R) { for (let i = 0; i < (o.n || 60); i++) { g.fillStyle = R() < .2 ? (o.color2 || '#ffffff') : (o.color || '#cfd8ff'); g.fillRect(R() * BW | 0, R() * (o.maxY || 130) | 0, 1, 1); } },
    sun(g, o) { disc(g, o.x, o.y, o.r, o.color); if (o.color2) disc(g, o.x, o.y, o.r - 3, o.color2); },
    clouds(g, o, R) {
      for (let i = 0; i < (o.n || 6); i++) {
        const x = R() * (BW - 60) | 0, y = (o.y || 20) + R() * (o.h || 50) | 0, w = 22 + R() * 30 | 0;
        g.fillStyle = o.color; g.fillRect(x, y, w, 4); g.fillRect(x + 4, y - 3, w - 10, 3); g.fillRect(x + 8, y + 4, w - 14, 2);
      }
    },
    mountains(g, o, R) {
      const n = o.n || 9, pts = []; for (let i = 0; i < n; i++) pts.push(R());
      for (let x = 0; x < BW; x++) {
        const t = x / BW * n, i = t | 0, f = t - i, hh = pts[i % n] * (1 - f) + pts[(i + 1) % n] * f, y = Math.round(o.base - hh * o.amp - ((x % 9) < 3 ? 1 : 0));
        g.fillStyle = o.color; g.fillRect(x, y, 1, H - y);
        if (o.snow && hh > .62) { g.fillStyle = o.snow; g.fillRect(x, y, 1, Math.max(1, (hh - .62) * o.amp * .8 | 0)); }
      }
    },
    mesas(g, o, R) { // mesetas del desierto: cerros de cima plana con laderas escalonadas
      const n = o.n || 3;
      for (let i = 0; i < n; i++) {
        const h = (o.h || 50) * (.6 + R() * .4) | 0, top = 16 + R() * 26 | 0, cx = (i + .2 + R() * .6) * BW / n | 0;
        for (const ox of [0, -BW, BW]) for (let y = 0; y < h; y++) {
          const X = cx + ox, Y = o.base - h + y, half = (top >> 1) + (y < h * .55 ? (y / 6 | 0) : (y / 6 | 0) + ((y - h * .55) * .9 | 0));
          g.fillStyle = o.color; g.fillRect(X - half, Y, half * 2, 1);
          g.fillStyle = o.shade || o.color; g.fillRect(X + (half >> 1), Y, half - (half >> 1), 1);
          if (y % 9 === 4) { g.fillStyle = 'rgba(0,0,0,.1)'; g.fillRect(X - half, Y, half * 2, 1); }
        }
      }
      g.fillStyle = o.shade || o.color; g.fillRect(0, o.base, BW, H - o.base);
    },
    pyramids(g, o, R) {
      const n = o.n || 3;
      for (let i = 0; i < n; i++) {
        const h = (o.h || 80) * (.55 + R() * .45) | 0, cx = (i + .2 + R() * .6) * BW / n | 0;
        for (const ox of [0, -BW, BW]) for (let y = 0; y < h; y++) {
          const X = cx + ox, Y = o.base - h + y;
          g.fillStyle = o.color; g.fillRect(X - y, Y, y + 1, 1);
          g.fillStyle = o.shade || o.color; g.fillRect(X + 1, Y, y, 1);
          if (y % 6 === 5) { g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(X - y, Y, y * 2 + 1, 1); }
        }
      }
      g.fillStyle = o.shade || o.color; g.fillRect(0, o.base, BW, H - o.base);
    },
    hills(g, o, R) {
      const p1 = R() * 6.28, p2 = R() * 6.28, a = o.f1 || 2, b = o.f2 || 5;
      for (let x = 0; x < BW; x++) {
        const u = x / BW * 6.2832, hh = (Math.sin(u * a + p1) * .6 + Math.sin(u * b + p2) * .4 + 1) / 2, y = Math.round(o.base - hh * o.amp);
        g.fillStyle = o.color; g.fillRect(x, y, 1, H - y);
        if (o.top) { g.fillStyle = o.top; g.fillRect(x, y, 1, 2); }
      }
    },
    flat(g, o) { g.fillStyle = o.color; g.fillRect(0, o.base, BW, H - o.base); if (o.top) { g.fillStyle = o.top; g.fillRect(0, o.base, BW, 2); } },
    trees(g, o, R) {
      const n = o.n || 8; if (o.ground) { g.fillStyle = o.ground; g.fillRect(0, o.base, BW, H - o.base); }
      for (let i = 0; i < n; i++) {
        const x = (i + R() * .7) * BW / n | 0, b = o.base + (R() * 4 | 0), h = (o.h || 30) * (.7 + R() * .6) | 0;
        for (const ox of [0, -BW]) {
          const X = x + ox; g.fillStyle = o.color2 || o.color;
          if (o.kind === 'palm') {
            g.fillRect(X, b - h, 2, h); g.fillStyle = o.color;
            g.fillRect(X - 9, b - h, 20, 2); g.fillRect(X - 7, b - h - 2, 16, 2); g.fillRect(X - 11, b - h + 2, 5, 2); g.fillRect(X + 8, b - h + 2, 5, 2); g.fillRect(X - 3, b - h - 4, 8, 2);
          } else if (o.kind === 'pine') {
            g.fillRect(X, b - (h / 5 | 0), 2, h / 5 | 0); g.fillStyle = o.color;
            for (let k = 0; k < 4; k++) g.fillRect(X - 2 - k * 2, b - h + k * (h / 5 | 0), 6 + k * 4, (h / 5 | 0) + 1);
          } else {
            g.fillRect(X - 2, b - (h >> 1), 5, h >> 1);
            disc(g, X, b - h * .6, h * .42 | 0, o.color); disc(g, X - h * .32, b - h * .5, h * .3 | 0, o.color); disc(g, X + h * .32, b - h * .5, h * .3 | 0, o.color);
          }
        }
      }
    },
    city(g, o, R) {
      let x = 0;
      while (x < BW) {
        const w = 14 + R() * 22 | 0, h = (o.min || 30) + R() * ((o.max || 90) - (o.min || 30)) | 0, ww = Math.min(w, BW - x), y = o.base - h;
        g.fillStyle = o.color; g.fillRect(x, y, ww, H - y);
        if (o.win) for (let wy = y + 3; wy < o.base - 4; wy += 5) for (let wx = x + 2; wx < x + ww - 3; wx += 4) {
          if (R() < (o.lit || .3)) { g.fillStyle = Array.isArray(o.win) ? o.win[R() * o.win.length | 0] : o.win; g.fillRect(wx, wy, 2, 2); }
        }
        if (R() < .3) { g.fillStyle = o.color; g.fillRect(x + (ww >> 1), y - 8, 1, 8); }
        if (o.tank && R() < .35 && ww > 12) { g.fillStyle = o.color; g.fillRect(x + 3, y - 6, 7, 4); g.fillRect(x + 4, y - 2, 1, 2); g.fillRect(x + 8, y - 2, 1, 2); }
        if (o.neon && R() < .55 && ww > 10) { g.fillStyle = o.neon[R() * o.neon.length | 0]; g.fillRect(x + 2, y + 6, 2, Math.min(22, h - 10)); if (R() < .5) g.fillRect(x + 5, y + 4, ww - 8, 1); }
        x += w + (o.gap ? R() * o.gap | 0 : 0);
      }
      g.fillStyle = o.color; g.fillRect(0, o.base, BW, H - o.base);
    },
    arches(g, o) {
      const per = o.period || 32, rows = o.rows || 2, ah = o.ah || 20, x0 = o.x0 || 0, x1 = o.x1 || BW;
      g.fillStyle = o.color; g.fillRect(x0, o.base - rows * ah - 3, x1 - x0, rows * ah + 3 + (H - o.base));
      g.globalCompositeOperation = 'destination-out';
      for (let r = 0; r < rows; r++) for (let x = x0; x + per <= x1; x += per) {
        const y = o.base - (r + 1) * ah;
        g.fillRect(x + 6, y + 7, per - 12, ah - 7); g.fillRect(x + 8, y + 5, per - 16, 2); g.fillRect(x + 11, y + 3, per - 22, 2);
      }
      g.globalCompositeOperation = 'source-over';
      if (o.ground) { g.fillStyle = o.ground; g.fillRect(0, o.base, BW, H - o.base); }
    },
    pagodas(g, o, R) {
      const n = o.n || 3;
      for (let i = 0; i < n; i++) {
        const x = (i + .2 + R() * .5) * BW / n | 0, tiers = 3 + (R() * 2 | 0), th = o.th || 9;
        for (const ox of [0, -BW]) {
          const X = x + ox;
          for (let k = 0; k < tiers; k++) {
            const w = 26 - k * 5, y = o.base - (k + 1) * th;
            g.fillStyle = o.color; g.fillRect(X - (w >> 1), y + 3, w, th - 3);
            g.fillStyle = o.roof || o.color; g.fillRect(X - (w >> 1) - 4, y + 1, w + 8, 2); g.fillRect(X - (w >> 1) - 5, y, 2, 1); g.fillRect(X + (w >> 1) + 3, y, 2, 1);
          }
          g.fillStyle = o.roof || o.color; g.fillRect(X, o.base - tiers * th - 5, 1, 6);
        }
      }
      if (o.ground) { g.fillStyle = o.ground; g.fillRect(0, o.base, BW, H - o.base); }
    },
    temples(g, o, R) {
      const n = o.n || 3;
      for (let i = 0; i < n; i++) {
        const x = (i + .15 + R() * .5) * BW / n | 0, b = o.base, cols = 4 + (R() * 3 | 0), w = cols * 8 + 4, h = o.h || 34;
        for (const ox of [0, -BW]) {
          const X = x + ox; g.fillStyle = o.color;
          g.fillRect(X - 3, b - 4, w + 6, 4); g.fillRect(X - 3, b - h - 4, w + 6, 4);
          for (let k = 0; k < cols; k++) g.fillRect(X + 2 + k * 8, b - h, 4, h);
          for (let k = 0; k < 9; k++) g.fillRect(X - 3 + k * (w + 6) / 18, b - h - 5 - k, (w + 6) - k * (w + 6) / 9, 1);
        }
      }
      if (o.ground) { g.fillStyle = o.ground; g.fillRect(0, o.base, BW, H - o.base); }
    },
    volcano(g, o) {
      const cx = o.x, b = o.base, h = o.h || 70, w = o.w || 100;
      for (let y = 0; y < h; y++) { const half = 8 + (w / 2 - 8) * y / h; g.fillStyle = o.color; g.fillRect(cx - half, b - h + y, half * 2, 1); }
      g.fillRect(0, b, BW, H - b);
      g.fillStyle = o.lava; g.fillRect(cx - 7, b - h, 14, 3); g.fillRect(cx - 4, b - h + 3, 2, 9); g.fillRect(cx + 3, b - h + 3, 2, 5);
      const sm = o.smoke || '#8a6a8a'; disc(g, cx + 4, b - h - 8, 6, sm); disc(g, cx + 12, b - h - 18, 8, sm); disc(g, cx + 24, b - h - 30, 10, sm);
    },
    pampa(g, o) {
      g.fillStyle = o.color; g.fillRect(0, o.base, BW, H - o.base);
      if (o.top) { g.fillStyle = o.top; g.fillRect(0, o.base, BW, 1); }
      const c2 = o.color2 || o.color; g.fillStyle = c2;
      for (let x = 0; x < BW; x += 32) g.fillRect(x, o.base - 8, 2, 8);
      g.fillRect(0, o.base - 6, BW, 1); g.fillRect(0, o.base - 3, BW, 1);
      const mx = o.mill || 330;
      g.fillRect(mx, o.base - 40, 2, 40); g.fillRect(mx - 5, o.base - 22, 12, 1); g.fillRect(mx - 7, o.base - 41, 16, 2); g.fillRect(mx, o.base - 49, 2, 18); g.fillRect(mx + 8, o.base - 43, 7, 5);
      disc(g, 90, o.base - 22, 14, c2); disc(g, 75, o.base - 16, 9, c2); disc(g, 105, o.base - 16, 9, c2); g.fillRect(86, o.base - 12, 8, 12);
    },
    obelisk(g, o) {
      g.fillStyle = o.color; const x = o.x, b = o.base, h = o.h || 80;
      for (let y = 0; y < h; y++) { const w = y < 8 ? Math.ceil(y / 2) : 4 + Math.floor((y - 8) / 24); g.fillRect(x - w, b - h + y, w * 2, 1); }
      if (o.win) { g.fillStyle = o.win; g.fillRect(x - 1, b - h + 12, 2, 2); }
    }
  };
  CV.buildBg = function (def) {
    const sky = CV.mkCanvas(CV.W, H), sg = sky.getContext('2d'), cs = def.sky;
    for (let y = 0; y < H; y += 6) {
      const t = Math.min(.999, y / (H * .85)) * (cs.length - 1), i = t | 0;
      sg.fillStyle = CV.hexLerp(cs[i], cs[Math.min(cs.length - 1, i + 1)], t - i); sg.fillRect(0, y, CV.W, 6);
    }
    const layers = (def.layers || []).map((o, i) => {
      const c = CV.mkCanvas(BW, H), g = c.getContext('2d');
      (GEN[o.gen] || (() => console.warn('Fondo: generador desconocido', o.gen)))(g, o, CV.rng((o.seed || 7) * 131 + i * 17));
      return { c, speed: o.speed || 0, drift: o.drift || 0 };
    });
    return { sky, layers };
  };
  CV.drawBg = function (g, bg, camX, time) {
    g.drawImage(bg.sky, 0, 0);
    for (const l of bg.layers) {
      let off = -((camX * l.speed + time * l.drift) % BW); if (off > 0) off -= BW;
      off = Math.round(off);
      g.drawImage(l.c, off, 0); if (off + BW < CV.W) g.drawImage(l.c, off + BW, 0);
    }
  };
})();
