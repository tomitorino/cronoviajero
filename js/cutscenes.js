// Escenas animadas (intro y final): viñetas en pixel art dibujadas por código, con texto que se va escribiendo.
// Cada viñeta es { draw(g, t), lines: [...], sfx? }. ENTER avanza; ESC salta todo.
(function () {
  const CV = window.CV, W = CV.W, H = CV.H, TOP = 14, BOX = 148;
  const sfx = n => CV.audio.sfx(n);
  const R = (g, c, x, y, w, h) => { g.fillStyle = c; g.fillRect(x | 0, y | 0, w | 0, h | 0); };
  const S = (g, n, f, x, y, o) => { if (CV.spriteDefs[n]) CV.spr(g, n, f, x | 0, y | 0, o); };
  const walk = (n, t, k) => CV.animFrame(n, 'walk', t * (k || 6));
  const rng = CV.rng(7), DOTS = []; for (let i = 0; i < 70; i++) DOTS.push([rng() * W, TOP + rng() * (BOX - TOP), rng()]);
  function sky(g, c1, c2) { for (let y = TOP; y < BOX; y += 6) R(g, CV.hexLerp(c1, c2, (y - TOP) / (BOX - TOP)), 0, y, W, 6); }
  function stars(g, t) { for (const s of DOTS) if ((s[2] * 9 + t * 2) % 3 < 2.5) R(g, s[2] > .7 ? '#f4f4f4' : '#566c86', s[0], s[1], 1, 1); }
  function sparks(g, x, y, t, n, cols, r) { for (let i = 0; i < n; i++) { const a = i * 2.4 + t * 3, d = ((t * 60 + i * 17) % (r || 40)); R(g, cols[i % cols.length], x + Math.cos(a) * d, y + Math.sin(a) * d * .7, 2, 2); } }

  // la máquina del tiempo (usada, único dueño)
  function machine(g, x, y, t, o) {
    o = o || {}; const sh = o.shake ? (Math.random() - .5) * o.shake : 0; x += sh; y += sh * .5;
    R(g, '#333c57', x - 24, y - 8, 48, 8); R(g, '#1a1c2c', x - 20, y - 2, 6, 3); R(g, '#1a1c2c', x + 14, y - 2, 6, 3);
    R(g, '#566c86', x - 19, y - 42, 38, 34); R(g, '#94b0c2', x - 19, y - 42, 38, 2); R(g, '#333c57', x + 15, y - 40, 4, 32);
    R(g, '#29366f', x - 13, y - 56, 26, 14); R(g, o.on ? '#73eff7' : '#3b5dc9', x - 11, y - 54, 22, 10); R(g, '#f4f4f4', x - 9, y - 52, 4, 2);
    R(g, '#1a1c2c', x - 14, y - 36, 18, 12); R(g, o.on ? (Math.floor(t * 6) % 2 ? '#a7f070' : '#38b764') : '#257179', x - 12, y - 34, 14, 8);
    for (let i = 0; i < 3; i++) R(g, o.broken ? '#333c57' : (Math.floor(t * 4 + i) % 3 === 0 ? '#ffe14a' : i === 1 ? '#e03c32' : '#a7f070'), x - 13 + i * 6, y - 20, 4, 4);
    R(g, '#c2c3c7', x + 19, y - 30 + (o.lever ? 8 : 0), 9, 2); R(g, '#e03c32', x + 27, y - 32 + (o.lever ? 8 : 0), 4, 5);
    for (let i = 0; i < 4; i++) R(g, i % 2 ? '#ffa300' : '#c68642', x - 25, y - 38 + i * 6, 6, 3);
    R(g, '#c2c3c7', x + 8, y - 64, 1, 8); R(g, o.on && Math.floor(t * 8) % 2 ? '#ff77a8' : '#b13e53', x + 7, y - 67, 3, 3);
    if (o.sticker) { R(g, '#ffe14a', x + 5, y - 37, 9, 7); R(g, '#e03c32', x + 6, y - 35, 7, 1); R(g, '#e03c32', x + 6, y - 33, 5, 1); }
    if (o.smoke) for (let i = 0; i < 5; i++) { const k = (t * .8 + i * .2) % 1; g.globalAlpha = 1 - k; R(g, '#94b0c2', x - 6 + Math.sin(i * 3 + t) * 8, y - 60 - k * 34, 5 + k * 5, 5 + k * 5); g.globalAlpha = 1; }
  }
  function garage(g, t) {
    sky(g, '#1a1c2c', '#29366f'); R(g, '#3e2a14', 0, BOX - 16, W, 16); R(g, '#5a3a1a', 0, BOX - 16, W, 2);
    R(g, '#333c57', 30, 44, 70, 3); R(g, '#b13e53', 36, 34, 8, 10); R(g, '#38b764', 48, 37, 6, 7); R(g, '#ffcd75', 60, 30, 10, 14); R(g, '#566c86', 78, 36, 14, 8);
    R(g, '#0d1021', 290, 30, 50, 40); R(g, '#29366f', 293, 33, 44, 34); R(g, '#f4f4f4', 322, 40, 6, 6); R(g, '#566c86', 314, 33, 2, 34); R(g, '#566c86', 293, 49, 44, 2);
    R(g, '#ffe14a', 186, TOP, 2, 12); R(g, '#fff1a8', 182, TOP + 12, 10, 5); g.globalAlpha = .07; g.beginPath(); g.moveTo(187, TOP + 17); g.lineTo(120, BOX - 16); g.lineTo(254, BOX - 16); g.fillStyle = '#fff1a8'; g.fill(); g.globalAlpha = 1;
  }
  const PIECES = [['#41a6f6', 'EUROPA', 40, 34], ['#ff77a8', 'ASIA', W - 40, 34], ['#ffcd75', 'NORTEAMÉRICA', 52, 116], ['#a7f070', 'LATAM', W - 52, 116]];
  function piece(g, c, x, y, t) { R(g, '#1a1c2c', x - 5, y - 5, 10, 10); R(g, c, x - 4, y - 4, 8, 8); R(g, '#f4f4f4', x - 3 + (Math.floor(t * 6) % 2), y - 3, 2, 2); R(g, '#1a1c2c', x - 1, y - 1, 2, 2); }
  function tunnel(g, t, cx, cy) {
    const cols = ['#1a1c2c', '#5d275d', '#6a4c93', '#b78cff', '#73eff7', '#3b5dc9'];
    R(g, '#0d1021', 0, TOP, W, BOX - TOP);
    for (let i = 9; i >= 0; i--) { const k = ((i + t * 2.2) % 10) / 10, r = 6 + k * k * 230; g.fillStyle = cols[(i + Math.floor(t * 2.2)) % cols.length]; g.globalAlpha = .25 + k * .5; g.beginPath(); g.ellipse(cx, cy, r, r * .6, 0, 0, 6.3); g.fill(); }
    g.globalAlpha = 1;
  }
  function parade(g, t, list, c1, c2, ground) {
    sky(g, c1, c2); R(g, ground, 0, BOX - 18, W, 18); R(g, 'rgba(255,255,255,.12)', 0, BOX - 18, W, 1);
    list.forEach((it, i) => {
      const [n, sc, sp] = it, s = CV.spriteDefs[n] && CV.sprite(n); if (!s) return;
      const x = ((t * (sp || 26) + i * (W + 80) / list.length) % (W + 80)) - 70, bob = Math.abs(Math.sin(t * 6 + i)) * 2;
      S(g, n, s.anims.walk ? walk(n, t + i) : 'idle', x, BOX - 18 - s.h * sc + (it[3] || 0) - bob, { scale: sc });
    });
  }

  const SC = {
    intro: {
      music: .75,
      panels: [
        { lines: ['Un martes cualquiera, el Viajero compró una máquina del tiempo por internet.', '"Usada. Poco kilometraje. Único dueño: un tal Cronos." Venía sin manual y con olor a Edad Media.'],
          draw(g, t) { garage(g, t); machine(g, 190, BOX - 16, t, { sticker: true }); const x = Math.min(120, 20 + t * 40); S(g, 'hero', x < 120 ? walk('hero', t, 8) : 'idle', x, BOX - 16 - 32, { scale: 2 }); if (t > 3) CV.text(g, '?', 134, BOX - 62 + Math.sin(t * 4) * 2, { color: '#ffe14a', scale: 2 }); } },
        { lines: ['La garantía había vencido hacía 65 millones de años. El Viajero leyó eso DESPUÉS de bajar la palanca.', 'La máquina hizo un ruido de licuadora con tornillos.'], sfx: 'glitch',
          draw(g, t) { garage(g, t); const k = Math.min(1, t / 4); machine(g, 190, BOX - 16, t, { on: true, lever: t > .6, shake: k * 7, smoke: t > 1.5 }); S(g, 'hero', t > .6 ? 'attack0' : 'idle', 150, BOX - 16 - 32 + (t > 2 ? (Math.random() - .5) * 3 : 0), { scale: 2 }); sparks(g, 190, BOX - 50, t, 6 + k * 14 | 0, ['#ffe14a', '#73eff7', '#f4f4f4'], 30 + k * 40); if (t > 2.5 && Math.floor(t * 5) % 2) CV.text(g, '¡¡ERROR 1970!!', 190, 26, { align: 'center', color: '#e03c32' }); } },
        { lines: ['¡¡BUM!! Las cuatro piezas principales salieron disparadas por la Historia: una a cada rincón del mapa y del calendario.', 'El fusible también. Pero de eso nadie se dio cuenta hasta el final.'], sfx: 'boom',
          draw(g, t) {
            R(g, '#0d1021', 0, TOP, W, BOX - TOP); stars(g, t); const cx = W / 2, cy = 78;
            PIECES.forEach((p, i) => { CV.drawPortal(g, p[2], p[3], t + i); CV.text(g, p[1], p[2], p[3] + 17, { align: 'center', color: p[0] }); const k = Math.min(1, Math.max(0, (t - .3 - i * .25) / 1.6)); if (k < 1) piece(g, p[0], cx + (p[2] - cx) * k, cy + (p[3] - cy) * k - Math.sin(k * 3.14) * 24, t); });
            const kf = Math.min(1, Math.max(0, (t - 1.6) / 2.5)); if (kf < 1) { R(g, '#ffe14a', cx - 2 + kf * 150, cy + 30 - Math.sin(kf * 3.14) * 50 + kf * 40, 5, 2); }
            machine(g, cx, cy + 26, t, { broken: true, smoke: true, shake: t < 1 ? 6 : 0 }); sparks(g, cx, cy, t, 14, ['#ffa300', '#ffe14a', '#f4f4f4'], 70);
            if (t < .35) { g.globalAlpha = 1 - t / .35; R(g, '#ffffff', 0, TOP, W, BOX - TOP); g.globalAlpha = 1; }
          } },
        { lines: ['El Viajero cayó por el tiempo como media caída por una escalera: sin dignidad y gritando.', 'Vio pasar imperios, guerras, modas espantosas. Y casi siempre a alguien mandando desde lejos mientras otros ponían el lomo.'], sfx: 'portal',
          draw(g, t) {
            tunnel(g, t, W / 2, 80);
            [['trex', 0], ['legionario', 1], ['samurai', 2], ['caballero', 3], ['cowboy', 4], ['soldado', 5], ['yakuza', 6], ['dron', 7]].forEach(([n, i]) => { const k = ((t * .28 + i / 8) % 1), a = i * 2.3 + t * .7, d = 20 + k * 190; S(g, n, 'idle', W / 2 + Math.cos(a) * d - 8, 80 + Math.sin(a) * d * .55 - 8, { scale: k > .5 ? 2 : 1, rot: t * 2 + i, alpha: Math.min(1, k * 3) }); });
            g.globalAlpha = 1; S(g, 'hero', 'jump0', W / 2 - 16 + Math.sin(t * 3) * 10, 62 + Math.cos(t * 2.3) * 8, { scale: 2, rot: t * 5 });
            if (Math.floor(t * 2) % 2) CV.text(g, '¡AAAAAAH!', W / 2 + 40, 50, { color: '#f4f4f4' });
          } },
        { lines: ['Y en el fondo de todo, donde el tiempo se termina, algo que dormía abrió un ojo.', 'Romper la Historia hace ruido. Hay cosas que se despiertan con ese ruido. Y se despiertan con hambre.'],
          draw(g, t) {
            R(g, '#0d1021', 0, TOP, W, BOX - TOP); g.globalAlpha = .5; stars(g, t * .3); g.globalAlpha = 1;
            const k = Math.min(1, t / 3.5), s = CV.spriteDefs.entidad && CV.sprite('entidad');
            g.globalAlpha = .15 + k * .2; g.fillStyle = '#ff77a8'; g.beginPath(); g.ellipse(W / 2, 80, 60 + Math.sin(t * 2) * 6, 34 + Math.sin(t * 2) * 4, 0, 0, 6.3); g.fill(); g.globalAlpha = 1;
            if (s) S(g, 'entidad', 'idle', W / 2 - s.w * 1.5, 80 - s.h * 1.5 + Math.sin(t * 1.5) * 3, { scale: 3, alpha: k }); g.globalAlpha = 1;
            const lid = (1 - Math.min(1, Math.max(0, (t - 1) / 2))) * 34; R(g, '#0d1021', W / 2 - 70, 80 - 40, 140, lid + 6); R(g, '#0d1021', W / 2 - 70, 80 + 40 - lid - 6, 140, lid + 6);
            if (t > 3.2 && Math.floor(t * 9) % 7 === 0) { g.globalAlpha = .25; R(g, '#ff77a8', 0, TOP + ((t * 90) % 120), W, 3); g.globalAlpha = 1; }
          } },
        { lines: ['El Viajero aterrizó en la Prehistoria. De cabeza. Sobre algo con dientes.', 'Para volver a casa hay que recuperar las piezas, época por época. Y de paso, tratar de no romper la Historia. Mucho.'], sfx: 'hurt',
          draw(g, t) {
            sky(g, '#3a8ad0', '#bfe8c8'); R(g, '#f4f4f4', 60, 30, 26, 6); R(g, '#f4f4f4', 250, 44, 34, 6);
            for (let x = 0; x < W; x += 4) R(g, '#38b764', x, BOX - 30 - Math.sin(x * .03) * 10 - Math.sin(x * .011 + 2) * 8, 4, 40); R(g, '#2d6e2d', 0, BOX - 14, W, 14);
            for (let y = 0; y < 70; y += 2) R(g, y < 6 ? '#e03c32' : '#7a5a4a', 320 - 8 - y * .6, 56 + y, 16 + y * 1.2, 2); for (let i = 0; i < 4; i++) { const k = (t * .5 + i * .25) % 1; g.globalAlpha = 1 - k; R(g, '#94b0c2', 316 + Math.sin(i * 2 + t) * 6, 50 - k * 30, 6 + k * 6, 6 + k * 6); g.globalAlpha = 1; }
            const land = .9, y = t < land ? TOP - 30 + (BOX - 14 - 32 - TOP + 30) * (t / land) * (t / land) : BOX - 14 - 32;
            S(g, 'hero', t < land ? 'jump0' : 'idle', 170, y, { scale: 2, rot: t < land ? t * 14 : 0 });
            if (t >= land && t < land + .5) sparks(g, 186, BOX - 14, t, 10, ['#f4f4f4', '#a7f070'], 26);
            const rx = Math.max(214, 400 - t * 60); S(g, 'raptor', rx > 214 ? walk('raptor', t) : 'idle', rx, BOX - 14 - 32, { scale: 2, flip: true });
            if (t > 3.4) CV.text(g, '!', 226, BOX - 60, { color: '#ffe14a', scale: 2 });
            if (t > 4.2) CV.text(g, 'CRONOVIAJERO', W / 2, 26, { align: 'center', scale: 2, color: '#ffcd75', shadow: '#b13e53' });
          } }
      ]
    },
    outro: {
      music: 1,
      panels: [
        { lines: ['La Entidad de la Paradoja se deshizo en relojes. Esta vez sí. Lo revisamos dos veces.', 'Entre los restos, girando despacito, apareció lo último que faltaba: un fusible de quince centavos.'], sfx: 'portal',
          draw(g, t) {
            R(g, '#0d1021', 0, TOP, W, BOX - TOP); stars(g, t); const k = Math.min(1, t / 3), s = CV.spriteDefs.entidad && CV.sprite('entidad');
            if (s && k < 1) { S(g, 'entidad', 'idle', 250 - s.w, 70 - s.h + k * 10, { scale: 2, alpha: 1 - k, white: Math.floor(t * 12) % 2 === 0 }); g.globalAlpha = 1; }
            for (let i = 0; i < 16; i++) { const a = i * .9 + t, d = k * 90 * (0.4 + (i % 5) * .15); S(g, 'p_reloj', 'idle', 250 + Math.cos(a) * d, 70 + Math.sin(a) * d * .6 + k * 20, { alpha: 1 - k * .6 }); } g.globalAlpha = 1;
            S(g, 'hero', 'idle', 90, BOX - 16 - 32, { scale: 2 }); R(g, '#29366f', 0, BOX - 16, W, 16);
            const fy = 60 + Math.sin(t * 2) * 5, fx = 250 - Math.min(1, Math.max(0, (t - 2.5) / 2.5)) * 130; if (t > 2) { R(g, '#c2c3c7', fx - 5, fy, 3, 3); R(g, '#ffe14a', fx - 2, fy, 5, 3); R(g, '#c2c3c7', fx + 3, fy, 3, 3); sparks(g, fx, fy + 1, t, 5, ['#ffe14a', '#f4f4f4'], 12); }
          } },
        { lines: ['Con todas las piezas sobre la mesa, el Viajero armó la máquina en una tarde. Le sobraron tres tornillos. Decidió no pensar en eso.', 'Giró la llave. La máquina tosió, escupió un poco de Edad Media y arrancó.'], sfx: 'select',
          draw(g, t) {
            garage(g, t); const on = t > 3; machine(g, 190, BOX - 16, t, { on, shake: t > 2.4 && t < 3.4 ? 5 : 0, smoke: t > 2.4 && t < 5, lever: on });
            PIECES.forEach((p, i) => { const k = Math.min(1, Math.max(0, (t - i * .45) / .8)); if (k < 1) piece(g, p[0], 120 + i * 10 + (190 - 120 - i * 10) * k, BOX - 24 - Math.sin(k * 3.14) * 30 - k * 20, t); });
            S(g, 'hero', t < 2.4 ? 'attack0' : 'idle', 140, BOX - 16 - 32, { scale: 2 });
            for (let i = 0; i < 3; i++) { R(g, '#c2c3c7', 228 + i * 9, BOX - 19, 4, 2); R(g, '#566c86', 229 + i * 9, BOX - 18, 2, 3); }
            if (t > 2.8) { const x = 216 + Math.min(70, (t - 2.8) * 50); S(g, 'caballero', walk('caballero', t, 10), x, BOX - 16 - 16 - Math.max(0, 20 - (t - 2.8) * 40)); if (t < 5) CV.text(g, '¿¿DÓNDE ESTOY??', x + 8, BOX - 46, { align: 'center', color: '#f4f4f4' }); }
          } },
        { lines: ['Mientras tanto, en la Historia: los obreros de la pirámide cobraron. El Minotauro encontró la salida (estaba señalizada).', 'El poni del Gran Kan se jubiló. Haruo fundó el sindicato de monstruos. Napoleón sigue jurando que es la perspectiva.'],
          draw(g, t) { parade(g, t, [['obrero', 2, 30], ['minotauro', 2, 22], ['dragon', 2, 34, -30], ['granKan', 2, 20], ['kaiju', 2, 18], ['napoleon', 2, 26]], '#f0a070', '#fbe6b8', '#c88a4a'); } },
        { lines: ['El gato del Padrino maneja la ciudad desde un almohadón. El Shopping ahora es una plaza. Los generales siguen discutiendo por el botón rojo: nadie les dio pilas.', 'La Hiperinflación subió otro poco mientras leías esto.'],
          draw(g, t) { parade(g, t, [['padrino', 2, 20], ['shopping', 2, 16], ['trenBlindado', 2, 40], ['karaoke', 2, 24, -34], ['general', 2, 22], ['codicio', 2, 26]], '#14142a', '#4a3a5a', '#2a2a3a'); stars(g, t); const hx = 300 + Math.sin(t) * 20, hy = 40 + ((t * 9) % 50) * -.3; S(g, 'hiperinflacion', 'idle', hx, hy, { alpha: .9 }); g.globalAlpha = 1; CV.text(g, '+' + (1000 + Math.floor(t * 937)) + '%', hx + 16, hy - 8, { align: 'center', color: '#e03c32' }); } },
        { lines: ['Y el Viajero volvió a casa. Llegó cinco minutos antes de haber salido. Se cruzó consigo mismo en la puerta. Se saludaron con incomodidad.', '"No bajes la palanca." "¿Qué palanca?" "...Nada. Suerte."'], sfx: 'portal',
          draw(g, t) {
            sky(g, '#f09060', '#fbd8a0'); R(g, '#ffe9a0', 60, 60, 30, 30); R(g, '#38b764', 0, BOX - 16, W, 16);
            R(g, '#b13e53', 210, 52, 120, 12); R(g, '#f2c29b', 220, 64, 100, BOX - 80); R(g, '#5a3a1a', 258, 92, 24, BOX - 108); R(g, '#ffe14a', 276, 110, 3, 3); R(g, '#73eff7', 230, 76, 18, 16); R(g, '#73eff7', 292, 76, 18, 16);
            const k = Math.min(1, t / 2.2); if (k < 1) CV.drawPortal(g, 110, BOX - 44, t);
            S(g, 'hero', k < 1 ? walk('hero', t, 8) : 'idle', 100 + k * 110, BOX - 16 - 32, { scale: 2 });
            const k2 = Math.min(1, Math.max(0, (t - 1.2) / 1.6)); S(g, 'hero', k2 < 1 ? walk('hero', t, 8) : 'idle', 262 - k2 * 22, BOX - 16 - 32, { scale: 2, flip: true });
            if (t > 3 && Math.floor(t * 1.2) % 2) CV.text(g, '...', 238, BOX - 62, { align: 'center', color: '#1a1c2c', shadow: false, scale: 2 });
          } },
        { lines: ['El Viajero sacó sus conclusiones: todo imperio se cree eterno hasta el jueves, el que da la orden nunca está donde caen las piedras, y ningún general sabe doblar un mapa.', 'Después calificó al vendedor: una estrella. "Llegó rota y me mandó a la Prehistoria. El envío, puntual."'], sfx: 'select',
          draw(g, t) {
            garage(g, t); machine(g, 250, BOX - 16, t, { on: true, sticker: true }); S(g, 'hero', 'idle', 120, BOX - 16 - 32, { scale: 2 });
            R(g, '#333c57', 150, BOX - 34, 26, 18); R(g, '#73eff7', 152, BOX - 32, 22, 13); R(g, '#566c86', 158, BOX - 16, 10, 2);
            const k = Math.min(1, t / .6); R(g, '#1a1c2c', 96, 30 - k * 4, 150, 34); R(g, '#f4f4f4', 98, 32 - k * 4, 146, 30);
            CV.text(g, 'CALIFICÁ TU COMPRA', 171, 35 - k * 4, { align: 'center', color: '#333c57', shadow: false });
            for (let i = 0; i < 5; i++) { const on = t > 1.2 + i * .35 && t < 3.4; CV.text(g, '★', 131 + i * 16, 46 - k * 4, { color: i === 0 && t > 1.2 || on ? '#ffa300' : '#c2c3c7', shadow: false, scale: 2 }); }
            if (t > 3.4 && t < 4.4) CV.text(g, '...NO.', 200, BOX - 56, { color: '#f4f4f4' });
            if (t > 4.6) CV.text(g, '"NO VOLVERÍA A COMPRAR. BAH, YA VOLVÍ."', W / 2, 70, { align: 'center', color: '#ffcd75' });
          } },
        { lines: ['FIN. Gracias por jugar.', '(Hasta que alguien toque algo. Siempre alguien toca algo.)'], last: true,
          draw(g, t) {
            R(g, '#0d1021', 0, TOP, W, BOX - TOP); stars(g, t); CV.drawPortal(g, 70, 96, t); CV.drawPortal(g, W - 70, 96, t + 1);
            CV.text(g, 'FIN', W / 2 + 2, 22, { align: 'center', scale: 5, color: '#5d275d', shadow: false }); CV.text(g, 'FIN', W / 2, 20, { align: 'center', scale: 5, color: '#ffcd75', shadow: '#b13e53' });
            machine(g, W / 2 + 30, BOX - 10, t, { on: true }); S(g, 'hero', 'idle', W / 2 - 40, BOX - 10 - 32 - Math.abs(Math.sin(t * 4)) * 4, { scale: 2 });
            const d = CV.save.data, n = Object.keys(d.completed || {}).length; CV.text(g, n + ' ÉPOCAS  ·  ' + (d.paradojas || 0) + ' PARADOJAS', W / 2, 60, { align: 'center', color: '#73eff7' });
            if (t > 4) { const hx = W / 2 + 62 - Math.min(10, (t - 4) * 6); R(g, '#f2c29b', hx, BOX - 40, 8, 4); R(g, '#f2c29b', hx - 3, BOX - 39, 4, 2); if (t > 5.7 && Math.floor(t * 6) % 2) CV.text(g, '¡NO!', W / 2 - 30, BOX - 58, { color: '#e03c32' }); }
          } }
      ]
    }
  };

  CV.Cutscene = {
    enter(arg) { this.def = SC[arg.id] || SC.intro; this.next = arg.next || CV.Hub; this.i = 0; this.t = 0; CV.audio.play(CV.music.hub, this.def.music || 1); this.cue(); },
    cue() { const p = this.def.panels[this.i]; if (p.sfx) sfx(p.sfx); },
    chars() { return this.def.panels[this.i].lines.join(' ').length; },
    update(dt) {
      const In = CV.input; this.t += dt;
      if (In.pressed('pause', 'back')) { sfx('select'); CV.setScene(this.next); return; }
      if (this.t > .25 && In.pressed('ok', 'confirm', 'attack', 'jump')) {
        if (this.t * 42 < this.chars()) { this.t = this.chars() / 42 + .01; return; }
        sfx('move');
        if (this.i < this.def.panels.length - 1) { this.i++; this.t = 0; CV.fadeT = .25; this.cue(); } else CV.setScene(this.next);
      }
    },
    draw(g) {
      const p = this.def.panels[this.i], t = this.t;
      R(g, '#0d1021', 0, 0, W, H);
      g.save(); g.beginPath(); g.rect(0, TOP, W, BOX - TOP); g.clip(); p.draw(g, t); g.restore(); g.globalAlpha = 1;
      R(g, '#1a1c2c', 0, 0, W, TOP); R(g, '#1a1c2c', 0, BOX, W, H - BOX); R(g, '#566c86', 0, BOX, W, 1); R(g, '#566c86', 0, TOP - 1, W, 1);
      CV.text(g, (this.i + 1) + '/' + this.def.panels.length, 4, 3, { color: '#566c86' }); CV.text(g, 'ESC: SALTAR', W - 4, 3, { align: 'right', color: '#566c86' });
      let left = Math.floor(t * 42), y = BOX + 6;
      p.lines.forEach((l, i) => { CV.wrap(l, 60).forEach(w => { if (left > 0) CV.text(g, w.slice(0, left), 12, y, { color: i === 0 ? '#ffcd75' : '#f4f4f4' }); left -= w.length + 1; y += 9; }); y += 3; });
      if (t * 42 >= this.chars() && Math.floor(t * 2) % 2) CV.text(g, p.last ? 'ENTER: VOLVER AL MAPA' : 'ENTER →', W - 6, H - 9, { align: 'right', color: '#73eff7' });
    }
  };
})();
