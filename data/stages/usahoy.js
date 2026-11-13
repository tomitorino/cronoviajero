// ETAPA N5 — EE.UU. ACTUAL (rama Norteamérica, entrega la pieza). Sátira del consumismo: el shopping que se come a la
// gente, las ofertas y las suscripciones. Cajeras, repositores y repartidores son aliados.
CV.stage({
  id: 'usahoy', tech: 8,
  title: 'EE.UU. ACTUAL', subtitle: 'Hoy, Black Friday. 70% de descuento sobre un precio que subió 80%.',
  bg: {
    sky: ['#2a6ad0', '#6aa8f0', '#bfe0f8', '#fff4d8'],
    layers: [
      { gen: 'sun', x: 60, y: 36, r: 14, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 6, y: 14, h: 44, color: '#ffffff', speed: .04, drift: 3 },
      { gen: 'city', base: 186, min: 46, max: 104, color: '#7a9ac0', win: '#c8e4f5', lit: .5, speed: .12, seed: 2 },
      { gen: 'city', base: 204, min: 12, max: 30, color: '#c05a4a', win: ['#ffe14a', '#f4f4f4'], lit: .4, neon: ['#e03c32', '#ffe14a'], gap: 12, speed: .36, seed: 17 }
    ]
  },
  tiles: {
    '#': { pattern: 'pave', base: '#6a6a72', dark: '#3a3a42', light: '#8a8a92', top: '#7a7a82', topLight: '#ffe14a', topDark: '#3a3a42', topH: 2 },
    'B': { pattern: 'metal', base: '#c05a4a', dark: '#7a2e24', light: '#e07a6a' },
    '=': { base: '#ffe14a', dark: '#c68642', light: '#ffffff' },
    '^': { base: '#c2c3c7', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 128, drums: 'k.s.kks.k.s.kkss',
    tracks: [
      { wave: 'square', vol: .05, notes: 'g4 _ g4 b4 d5 _ b4 _ c5 _ c5 e5 g5 _ e5 _ d5 _ d5 fs5 a5 _ fs5 _ g5 _ d5 b4 g4 _ _ _' },
      { wave: 'triangle', vol: .13, notes: 'g2 _ d2 _ g2 _ d2 _ c2 _ g2 _ c2 _ g2 _ d2 _ a2 _ d2 _ a2 _ g2 _ d2 _ g2 _ _ _' }
    ]
  },
  ambient: { col: ['#ffe14a', '#e03c32', '#f4f4f4'], rate: .4, vy: 30, vx: -16, life: 4 },
  items: { hamburguesa: { name: 'Hamburguesa XXL', heal: 4, spr: 'i_hamburguesa' } },
  heals: ['energia', 'hamburguesa'],
  collectible: { name: 'Cupón de descuento', spr: 'c_billete' },

  sprites: {
    ofertado: { from: 'yakuza', swap: { j: 'x', f: 'r', r: 'y', c: 'y' } },
    influencer: { from: 'yakuza', swap: { f: 'm', r: 'b', c: 'w', '0': 't' } },
    guardia: { from: 'yakuza', swap: { f: '8', r: 'y', c: '8' } },
    cajera: { from: 'tunica', swap: { r: 'r', '4': 'y', '0': 'h' } },
    repositor: { from: 'cowboy', swap: { h: 'r', g: 'a', r: 'j', i: 'c' } },
    shopping: {
      rows: [
        '................................', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '......rrrrrrrrrrrrrrrrrrrr',
        '......rcycycycycycycycycyr',
        '....dddddddddddddddddddddddd',
        '....dbbbdbbbdbbbdbbbdbbbdbbd',
        '....dbbbdbbbdbbbdbbbdbbbdbbd',
        '....dddddddddddddddddddddddd',
        '....dd00000dddddddd00000dddd',
        '....dd0yy00dddddddd0yy00dddd',
        '....dd00000dddddddd00000dddd',
        '....dddddddddddddddddddddddd',
        '....ddd0000000000000000ddddd',
        '....ddd0c0c0c0c0c0c0c00ddddd',
        '....ddd0000000000000000ddddd',
        '....ddd0rrrrrrrrrrrrrr0ddddd',
        '....dddd00000000000000dddddd',
        '....dddddddddddddddddddddddd',
        '.....ee..................ee',
        '....eeee................eeee'
      ],
      anim: {
        walk: [{ 30: '....ee....................ee', 31: '...eeee..................eeee' }, { 15: '......rycycycycycycycycycr' }],
        a: [{ 21: '....dd0rr00dddddddd0rr00dddd', 24: '....ddd0c0c0c0c0c0c0c00ddddd', 25: '....ddd0000000000000000ddddd', 26: '....ddd0rrrrrrrrrrrrrr0ddddd', 27: '....ddd0rrrrrrrrrrrrrr0ddddd', 28: '....dddd0c0c0c0c0c0c00dddddd' }]
      }
    },
    p_like: { rows: ['.mm.mm.', 'mmmmmmm', 'mmmmmmm', '.mmmmm.', '..mmm..', '...m...'] },
    p_caja: { rows: ['iiiiiii', 'ihhihhi', 'iiiiiii', 'i00iiii', 'iiiiiii', 'iiiiiii', 'iiiiiii'] },
    i_hamburguesa: { rows: ['..........', '..iiiiii..', '.iipiipii.', '.66666666.', '.hhhhhhhh.', '.yy4yy4yy.', '.iiiiiiii.', '..iiiiii..', '..........', '..........'] }
  },

  enemies: {
    ofertado: { sprite: 'ofertado', ai: 'chase', hp: 10, speed: 26, chase: 58, jump: 230, sight: 120, barks: ['OFERTAAA... no lo necesito... LO QUIERO IGUAL...', 'Hice seis horas de cola. Ya no me acuerdo qué venía a comprar.', 'Compré tres. Para ahorrar.'] },
    influencer: { sprite: 'influencer', ai: 'ranged', hp: 8, speed: 18, sight: 160, cooldown: 2.2, proj: { speed: 190, spr: 'p_like', w: 7, h: 6 }, barks: ['¡Hola, mi gente! Hoy me pelea un señor disfrazado. ¡Link en la bio!', 'Esto NO es publicidad. (Es publicidad.)', 'Si te pego, ¿me seguís? Sorteo un auto que no existe.'] },
    guardia: { sprite: 'guardia', ai: 'charger', hp: 10, speed: 24, charge: 155, tele: .85, rest: 1.1, sight: 120, animSpeed: 12, barks: ['¡Señor, no puede salir sin comprar algo!', 'Protejo los televisores. De la gente. Que vino por los televisores.'] },
    dronEnvio: { sprite: 'dron', ai: 'flyer', hp: 5, speed: 62, hover: 5, sight: 150, sightY: 100, animSpeed: 20 },
    carrito: { sprite: 'roomba', ai: 'kamikaze', hp: 7, w: 14, h: 7, speed: 32, charge: 155, tele: .9, sight: 115, animSpeed: 10, barks: ['CARRITO AUTÓNOMO. TAMBIÉN TE COBRO SOLO.', 'AGREGADO AL CARRITO: USTED.'] },
    lanzacajas: { sprite: 'guardia', ai: 'ranged', hp: 8, speed: 16, sight: 140, cooldown: 2.8, proj: { speed: 120, grav: 300, spr: 'p_caja', w: 7, h: 7 }, barks: ['¡Entrega en el día! ¡En la cabeza!', 'Su paquete llegó. La caja es enorme. Adentro hay un cable.'] },
    gerenteRegional: { sprite: 'influencer', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 98, speed: 26, chase: 56, sight: 160, sightY: 70, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡GERENTE REGIONAL DE EXPERIENCIAS! ¡¿LE PUEDO OFRECER UNA TARJETA?!', '¡Somos una familia! ¡Por eso no hay aumento!'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, lines: ['La pieza norteamericana quedó en el shopping. La dejé en garantía. La garantía venció. Qué ironía.', 'Ojo adentro: entrás por una pieza y salís con una freidora de aire.'] },
    cajera: { sprite: 'cajera', gift: { heal: 'hamburguesa' }, lines: ['Tengo tres trabajos. El shopping dice que soy "emprendedora de mi tiempo".', 'El descuento es del 70%. El lunes subieron todo 80%. Hacé la cuenta, yo no puedo: estoy en horario.'] },
    repositor: { sprite: 'repositor', gift: { heal: 'energia' }, lines: ['Repongo góndolas que se vacían en cuatro segundos. Es como achicar el mar con un vaso de oferta.', 'Los carritos autónomos no frenan: saltalos. Los influencers tiran corazones rectos.'] },
    repositor2: { sprite: 'repositor', gift: { ammo: true }, lines: ['El Shopping está vivo y tiene hambre. Las balas le hacen menos: es todo vidrio blindado. Dale de cerca, en la puerta.', 'Cuando anuncia una "liquidación total" abre la boca un rato largo. Ese es el momento.'] }
  },

  boss: {
    name: 'EL SHOPPING VIVIENTE', mul: { melee: 1.3, ranged: .9 }, sprite: 'shopping', scale: 2, w: 54, h: 36, hp: 185, walk: 14, rest: .9,
    attacks: {
      ofertas: { type: 'shoot', count: 3, every: .6, n: 5, spread: .5, speed: 150, sfx: 'shoot', proj: { spr: 'p_like', w: 7, h: 6 } },
      envios: { type: 'rain', count: 11, every: .2, speed: 185, proj: { spr: 'p_caja', w: 7, h: 7 } },
      cajas: { type: 'shoot', aim: 'arc', count: 5, every: .35, n: 1, sfx: 'bang', proj: { spr: 'p_caja', w: 7, h: 7, grav: 300, bounce: 2, life: 5 } },
      liquidacion: { type: 'lines', kinds: ['floor', 'high', 'beam'], n: 5, every: .32, warn: .8, live: .5, col: '#e03c32', thick: 6, labels: ['-70%', '2x1', 'ÚLTIMOS', 'HOY'] },
      cuotas: { type: 'lines', kinds: ['diag', 'pillar', 'zig'], n: 5, every: .32, warn: .8, live: .45, col: '#ffe14a', thick: 5, labels: ['12 CUOTAS', 'SIN INTERÉS*', '*CON INTERÉS'] },
      clientes: { type: 'summon', ids: ['ofertado', 'dronEnvio', 'carrito'], n: 2, max: 4 },
      anuncio: { type: 'taunt', dur: 2.8, say: ['¡ATENCIÓN CLIENTES! ¡LIQUIDACIÓN TOTAL! ¡De su sueldo!', '¿No encontrás la salida? Es a propósito. Pasá otra vez por perfumería.', 'Suscribite a mi versión Premium: te muerdo sin anuncios.', 'No vendo cosas. Vendo la sensación de que te falta algo. Te falta todo.'] },
      estampida: { type: 'charge', speed: 200, tele: .85 },
      salto: { type: 'jump', power: 320 },
      confeti: { type: 'radial', count: 4, n: 12, speed: 105, proj: { col: '#ffe14a', col2: '#e03c32', w: 4, h: 4 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['ofertas', 'anuncio', 'liquidacion', 'envios'] },
      { until: .33, speed: 1.15, say: '¡ABRIMOS LAS PUERTAS! ¡QUE PASEN TODOS!', pattern: ['clientes', 'cajas', 'cuotas', 'anuncio', 'estampida', 'confeti'] },
      { speed: 1.3, say: '¡¡ÚLTIMAS UNIDADES!! ¡¡DE VIAJERO!!', pattern: ['confeti', 'salto', 'envios', 'anuncio', 'cuotas', 'estampida', 'clientes', 'liquidacion', 'ofertas'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Estados Unidos, hoy. Es Black Friday: la gente acampa tres días para comprar lo que ya tiene.' },
      { who: 'Viajero', text: 'Todo es gigante: los autos, las gaseosas, las deudas. Sobre todo las deudas.' },
      { who: 'Viajero', text: 'La pieza norteamericana está en un shopping. El shopping, según me dicen, está vivo. Y con hambre.' }
    ],
    bossIntro: [
      { who: 'El Shopping', spr: 'guardia', color: '#ffe14a', text: '¡BIENVENIDO, VALIOSO CLIENTE! ¿Ya conocés nuestra tarjeta? ¡Tiene tu nombre! ¡Y tu casa!' },
      { who: 'Viajero', text: 'Solo vengo a retirar una pieza. No quiero comprar nada.' },
      { who: 'El Shopping', spr: 'guardia', color: '#ffe14a', text: '..."No quiero comprar nada". Error. Frase no reconocida. ¡¡SEGURIDAD A PASILLO UNO!!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El Shopping se desinfló como un castillo inflable. Adentro había, sobre todo, cajas vacías.' },
      { who: 'Viajero', text: 'La gente salió, vio que afuera había un parque y se quedó ahí. Gratis. Fue un escándalo.' },
      { who: 'Viajero', text: 'Pieza norteamericana recuperada. Me dieron un cupón del 5% para la próxima paradoja.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      y: { enemy: 'ofertado' }, a: { enemy: 'influencer' }, p: { enemy: 'guardia' }, b: { enemy: 'lanzacajas' }, r: { enemy: 'carrito' }, q: { enemy: 'dronEnvio' }, K: { enemy: 'gerenteRegional' },
      N: { npc: 'cajera' }, G: { npc: 'repositor' }, S: { npc: 'repositor2' }, W: { weapon: 'rifle' }, A: { weapon: 'ametralladora' }, R: { weapon: 'laser', rift: true },
      '1': { decor: 'tacho' }, '2': { decor: 'neon' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P  & N    1     W    y     2',
        '#*',
        '#*'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   y    BBBBBBBBBBBBBBB  r p   1',
        '#*',
        '#*'
      ],
      [
        '        q             c      q',
        '      ==        ===',
        '   y       a        b    r y h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '          q          c    q',
        '               a    ===',
        '       ===    ===',
        '   F   p   ^^ y  ^^^   y   b   G',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a     q      b       q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '                 c',
        '         q        a      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB r BBBBB  y  p b A',
        '#*',
        '#*'
      ],
      [
        '      q        c       c   q',
        '       ===    ===     ===',
        '  y    a    ^^    K    r b S   2',
        '#*',
        '#*'
      ],
      [
        '            ====            ====',
        '',
        '',
        '  h  F  [   m          O           X    ',
        '#*',
        '#*'
      ]
    ]
  }
});
