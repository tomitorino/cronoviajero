// Sprites definidos como grillas de caracteres -> canvas (normal, espejado y silueta blanca). Fuente pixel 5x7.
(function () {
  const CV = window.CV;

  // Paleta maestra: cada caracter de una grilla es un color. '.' = transparente.
  CV.PAL = {
    '0': '#1a1c2c', '1': '#5d275d', '2': '#b13e53', '3': '#ef7d57', '4': '#ffcd75', '5': '#a7f070', '6': '#38b764', '7': '#257179',
    '8': '#29366f', '9': '#3b5dc9', 'a': '#41a6f6', 'b': '#73eff7', 'c': '#f4f4f4', 'd': '#94b0c2', 'e': '#566c86', 'f': '#333c57',
    'g': '#8b5a2b', 'h': '#5a3a1a', 'i': '#c68642', 'j': '#f2c29b', 'k': '#d89a6a', 'l': '#a0683f', 'm': '#ff77a8', 'n': '#7e2553',
    'o': '#ffa300', 'p': '#fff1a8', 'q': '#2d6e2d', 'r': '#e03c32', 's': '#c2c3c7', 't': '#6a4c93', 'u': '#3e2a14', 'v': '#8fd3ff',
    'w': '#ffffff', 'x': '#b0e04a', 'y': '#ffe14a', 'z': '#111118'
  };

  const cache = {};
  function render(rows, pal, w) {
    const h = rows.length, c = CV.mkCanvas(w, h), g = c.getContext('2d');
    for (let y = 0; y < h; y++) {
      const r = rows[y];
      for (let x = 0; x < w && x < r.length; x++) {
        const col = pal[r[x]];
        if (!col || r[x] === '.') continue;
        g.fillStyle = col; g.fillRect(x, y, 1, 1);
      }
    }
    const f = CV.mkCanvas(w, h), fg = f.getContext('2d'); fg.translate(w, 0); fg.scale(-1, 1); fg.drawImage(c, 0, 0);
    const white = src => { const o = CV.mkCanvas(w, h), og = o.getContext('2d'); og.drawImage(src, 0, 0); og.globalCompositeOperation = 'source-in'; og.fillStyle = '#fff'; og.fillRect(0, 0, w, h); return o; };
    return { c, f, wh: white(c), wf: white(f), w, h };
  }
  function build(name) {
    let d = CV.spriteDefs[name];
    if (!d) { console.warn('Sprite no definido:', name); d = { rows: ['rr', 'rr'] }; }
    const b = d.from ? CV.spriteDefs[d.from] : null;
    const rows = d.rows || (b && b.rows), anim = d.anim || (b && b.anim) || {};
    const pal = Object.assign({}, CV.PAL, b && b.pal, d.pal);
    if (d.swap) for (const k in d.swap) { const v = d.swap[k]; pal[k] = v[0] === '#' ? v : CV.PAL[v]; }
    const w = d.w || rows.reduce((m, r) => Math.max(m, r.length), 0);
    rows.forEach((r, i) => { if (r.length !== w) console.warn('Sprite', name, 'fila', i, 'largo', r.length, 'esperado', w); });
    const s = { w, h: rows.length, frames: { idle: render(rows, pal, w) }, anims: {} };
    for (const k in anim) {
      s.anims[k] = anim[k].length;
      anim[k].forEach((p, i) => {
        let fr;
        if (Array.isArray(p)) fr = p; else { fr = rows.slice(); for (const ri in p) fr[+ri] = p[ri]; }
        s.frames[k + i] = render(fr, pal, w);
      });
    }
    return cache[name] = s;
  }
  CV.sprite = name => cache[name] || build(name);
  CV.animFrame = (name, anim, i) => { const n = CV.sprite(name).anims[anim]; return n ? anim + (Math.floor(i) % n) : 'idle'; };
  // Dibuja con (x,y) = esquina superior izquierda. Opciones: flip, white, scale, rot, alpha.
  CV.spr = function (g, name, frame, x, y, o) {
    const s = CV.sprite(name), f = s.frames[frame] || s.frames.idle; o = o || {};
    const img = o.white ? (o.flip ? f.wf : f.wh) : (o.flip ? f.f : f.c);
    if (o.alpha !== undefined) g.globalAlpha = o.alpha;
    const sc = o.scale || 1;
    if (o.rot) {
      g.save(); g.translate(Math.round(x + f.w * sc / 2), Math.round(y + f.h * sc / 2)); g.rotate(o.rot);
      g.drawImage(img, -f.w * sc / 2, -f.h * sc / 2, f.w * sc, f.h * sc); g.restore();
    } else g.drawImage(img, Math.round(x), Math.round(y), f.w * sc, f.h * sc);
    if (o.alpha !== undefined) g.globalAlpha = 1;
  };

  // ---------- fuente pixel 5x7 (mayúsculas; acentos y ñ se componen) ----------
  const GL = {
    'A': '01110 10001 10001 11111 10001 10001 10001', 'B': '11110 10001 10001 11110 10001 10001 11110', 'C': '01110 10001 10000 10000 10000 10001 01110',
    'D': '11110 10001 10001 10001 10001 10001 11110', 'E': '11111 10000 10000 11110 10000 10000 11111', 'F': '11111 10000 10000 11110 10000 10000 10000',
    'G': '01110 10001 10000 10111 10001 10001 01110', 'H': '10001 10001 10001 11111 10001 10001 10001', 'I': '01110 00100 00100 00100 00100 00100 01110',
    'J': '00111 00010 00010 00010 00010 10010 01100', 'K': '10001 10010 10100 11000 10100 10010 10001', 'L': '10000 10000 10000 10000 10000 10000 11111',
    'M': '10001 11011 10101 10101 10001 10001 10001', 'N': '10001 11001 10101 10011 10001 10001 10001', 'O': '01110 10001 10001 10001 10001 10001 01110',
    'P': '11110 10001 10001 11110 10000 10000 10000', 'Q': '01110 10001 10001 10001 10101 10010 01101', 'R': '11110 10001 10001 11110 10100 10010 10001',
    'S': '01111 10000 10000 01110 00001 00001 11110', 'T': '11111 00100 00100 00100 00100 00100 00100', 'U': '10001 10001 10001 10001 10001 10001 01110',
    'V': '10001 10001 10001 10001 10001 01010 00100', 'W': '10001 10001 10001 10101 10101 11011 10001', 'X': '10001 10001 01010 00100 01010 10001 10001',
    'Y': '10001 10001 01010 00100 00100 00100 00100', 'Z': '11111 00001 00010 00100 01000 10000 11111',
    '0': '01110 10001 10011 10101 11001 10001 01110', '1': '00100 01100 00100 00100 00100 00100 01110', '2': '01110 10001 00001 00010 00100 01000 11111',
    '3': '11110 00001 00001 01110 00001 00001 11110', '4': '00010 00110 01010 10010 11111 00010 00010', '5': '11111 10000 11110 00001 00001 10001 01110',
    '6': '00110 01000 10000 11110 10001 10001 01110', '7': '11111 00001 00010 00100 01000 01000 01000', '8': '01110 10001 10001 01110 10001 10001 01110',
    '9': '01110 10001 10001 01111 00001 00010 01100',
    '.': '00000 00000 00000 00000 00000 01100 01100', ',': '00000 00000 00000 00000 01100 00100 01000', '!': '00100 00100 00100 00100 00100 00000 00100',
    '?': '01110 10001 00001 00010 00100 00000 00100', ':': '00000 01100 01100 00000 01100 01100 00000', ';': '00000 01100 01100 00000 01100 00100 01000',
    "'": '00100 00100 01000 00000 00000 00000 00000', '"': '01010 01010 00000 00000 00000 00000 00000', '-': '00000 00000 00000 11111 00000 00000 00000',
    '+': '00000 00100 00100 11111 00100 00100 00000', '/': '00001 00001 00010 00100 01000 10000 10000', '(': '00010 00100 01000 01000 01000 00100 00010',
    ')': '01000 00100 00010 00010 00010 00100 01000', '%': '11001 11001 00010 00100 01000 10011 10011', '$': '00100 01111 10100 01110 00101 11110 00100',
    '#': '01010 01010 11111 01010 11111 01010 01010', '*': '00000 10101 01110 11111 01110 10101 00000', '<': '00010 00100 01000 10000 01000 00100 00010',
    '>': '01000 00100 00010 00001 00010 00100 01000', '=': '00000 00000 11111 00000 11111 00000 00000', '_': '00000 00000 00000 00000 00000 00000 11111',
    '°': '01100 10010 10010 01100 00000 00000 00000', '♥': '00000 01010 11111 11111 01110 00100 00000', '∞': '00000 00000 01010 10101 10101 01010 00000',
    '→': '00000 00100 00010 11111 00010 00100 00000', '←': '00000 00100 01000 11111 01000 00100 00000', '↑': '00100 01110 10101 00100 00100 00100 00000',
    '↓': '00000 00100 00100 00100 10101 01110 00100', '★': '00100 00100 11111 01110 01110 01010 10001', '✓': '00000 00001 00010 10100 01000 00000 00000',
    '■': '00000 11111 11111 11111 11111 11111 00000'
  };
  const ORDER = Object.keys(GL), IDX = {}; ORDER.forEach((c, i) => IDX[c] = i);
  const ACC = { 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ñ': 'N', 'Ü': 'U' };
  const atl = {};
  function atlas(col) {
    if (atl[col]) return atl[col];
    const c = CV.mkCanvas(ORDER.length * 6, 7), g = c.getContext('2d'); g.fillStyle = col;
    ORDER.forEach((ch, i) => GL[ch].split(' ').forEach((r, y) => { for (let x = 0; x < 5; x++) if (r[x] === '1') g.fillRect(i * 6 + x, y, 1, 1); }));
    return atl[col] = c;
  }
  // CV.text(g, 'hola', x, y, {color, scale, align:'center'|'right', shadow:false|color})
  CV.text = function (g, str, x, y, o) {
    o = o || {}; const sc = o.scale || 1, col = o.color || '#f4f4f4';
    str = String(str).replace(/…/g, '...').toUpperCase();
    const w = str.length * 6 * sc - sc;
    if (o.align === 'center') x -= w / 2; else if (o.align === 'right') x -= w;
    x = Math.round(x); y = Math.round(y);
    const passes = o.shadow === false ? [[0, 0, col]] : [[sc, sc, o.shadow || '#1a1c2c'], [0, 0, col]];
    for (const [ox, oy, c] of passes) {
      const a = atlas(c); let cx = x + ox; const yy = y + oy;
      for (const ch0 of str) {
        let ch = ch0, acc = null, flip = false;
        if (ACC[ch]) { acc = ch; ch = ACC[ch]; }
        if (ch === '¿') { ch = '?'; flip = true; } else if (ch === '¡') { ch = '!'; flip = true; }
        const i = IDX[ch];
        if (i !== undefined) {
          if (flip) { g.save(); g.translate(cx, yy + 8 * sc); g.scale(1, -1); g.drawImage(a, i * 6, 0, 5, 7, 0, 0, 5 * sc, 7 * sc); g.restore(); }
          else g.drawImage(a, i * 6, 0, 5, 7, cx, yy, 5 * sc, 7 * sc);
          if (acc) {
            g.fillStyle = c;
            if (acc === 'Ñ') g.fillRect(cx + sc, yy - 2 * sc, 3 * sc, sc);
            else if (acc === 'Ü') { g.fillRect(cx + sc, yy - 2 * sc, sc, sc); g.fillRect(cx + 3 * sc, yy - 2 * sc, sc, sc); }
            else g.fillRect(cx + 2 * sc, yy - 2 * sc, 2 * sc, sc);
          }
        }
        cx += 6 * sc;
      }
    }
  };
  CV.wrap = function (str, n) {
    const out = []; let cur = '';
    for (const w of String(str).split(' ')) {
      if (cur && (cur + ' ' + w).length > n) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
    }
    if (cur) out.push(cur);
    return out;
  };
  // Panel con borde retro
  CV.panel = function (g, x, y, w, h, bg, border) {
    g.fillStyle = border || '#f4f4f4'; g.fillRect(x + 1, y, w - 2, h); g.fillRect(x, y + 1, w, h - 2);
    g.fillStyle = bg || '#1a1c2c'; g.fillRect(x + 1, y + 1, w - 2, h - 2);
  };
})();
