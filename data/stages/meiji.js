// ETAPA A3 — JAPÓN MEIJI (rama Asia). Sátira de la "diplomacia de cañonero": el comodoro que viene a ofrecer
// amistad con sesenta cañones. Los pescadores y los samuráis desocupados son aliados.
CV.stage({
  id: 'meiji', tech: 6,
  title: 'JAPÓN MEIJI', subtitle: '1868. Llegó el progreso. Vino en barco y sin avisar.',
  bg: {
    sky: ['#2a3a6a', '#5a6aa0', '#c890a0', '#f8c8a0'],
    layers: [
      { gen: 'sun', x: 200, y: 96, r: 22, color: '#e03c32', color2: '#ef7d57', speed: .01 },
      { gen: 'clouds', n: 6, y: 18, h: 44, color: '#8a7aa8', speed: .05, drift: 3 },
      { gen: 'hills', base: 170, amp: 40, color: '#5a5a8a', top: '#f4f4f4', f1: 1, f2: 2, speed: .08 },
      { gen: 'flat', base: 186, color: '#3a5a8a', top: '#73a0c8', speed: .14 },
      { gen: 'pagodas', n: 3, base: 185, th: 10, color: '#4a2a34', roof: '#1a1c2c', ground: '#3a3a4a', speed: .36 }
    ]
  },
  tiles: {
    '#': { pattern: 'wood', base: '#6a4a34', dark: '#3e2a1a', light: '#8a6a4a', top: '#8a6a4a', topLight: '#a88a62', topDark: '#3e2a1a', topH: 2 },
    'B': { pattern: 'stone', base: '#6a6a7a', dark: '#3a3a4a', light: '#8a8a9a' },
    '=': { base: '#b13e53', dark: '#7e2553', light: '#ef7d57' },
    '^': { base: '#c2c3c7', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 112, drums: 'k..ks...k.k.s..s',
    tracks: [
      { wave: 'square', vol: .05, notes: 'e4 _ f4 a4 _ b4 _ c5 b4 _ a4 f4 _ e4 _ _ e4 _ f4 a4 _ c5 _ e5 c5 _ b4 a4 _ f4 e4 _' },
      { wave: 'triangle', vol: .13, notes: 'e2 _ b1 _ e2 _ b1 _ f2 _ c2 _ f2 _ e2 _ a1 _ e2 _ a1 _ c2 _ f2 _ e2 _ b1 _ e2 _' }
    ]
  },
  ambient: { col: ['#ff77a8', '#f4f4f4'], rate: .4, vy: 24, vx: -18, life: 5 },
  items: { sushi: { name: 'Sushi', heal: 3, spr: 'i_sushi' } },
  heals: ['sushi', 'te'],
  collectible: { name: 'Tratado desigual', spr: 'c_papiro' },

  sprites: {
    marinero: { from: 'soldado', swap: { q: '9', e: 'c', d: 'h' } },
    samuraiRifle: { from: 'samurai', swap: { '2': '7', c: 'h' } },
    ronin: { from: 'samurai', swap: { '2': 'e', y: '0', c: 'e' } },
    comerciante: { from: 'tunica', swap: { r: 'f', '4': 'y' } },
    pescadora: { from: 'tunica', swap: { r: 'a', '4': 'c' } },
    canonero: { from: 'tanquecito', swap: { e: 'f', q: 'y' } },
    barcoNegro: {
      rows: [
        '................................', '', '', '',
        '..............ss',
        '.............sss..........r',
        '..............ff..........rc',
        '..............ff....h.....h',
        '.....h........ff....h.....h',
        '.....hcccc....ff..cchcc...h',
        '.....hcccc....ff..cchcc...h',
        '.....h.......ffff...h.....h',
        '..00000000000000000000000000000',
        '..0zz0y0zz0y0zz0y0zz0y0zz0y0z0',
        '...00000000eeeee0000000000000',
        '....000000eedddee00000000000',
        '.....00000ededede0000000000',
        '......0000eedddee000000000',
        '.......rrrreeeeerrrrrrrrr',
        '', '', '', '', '', '', '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 3: '.............ss', 4: '............ssss', 5: '.............sss..........r', 16: '.....00000eededee0000000000' }, {}],
        a: [{ 13: '..0zz0o0zz0o0zz0o0zz0o0zz0o0z0', 14: '...0000y000eeeee000y000000y00' }]
      }
    },
    p_tratado: { rows: ['cccccc', 'c0000c', 'cccccc', 'c000cc', 'cccccc', 'c00rrc', 'cccrrc', 'cccccc'] },
    i_sushi: { rows: ['..........', '..........', '..3333....', '.333333...', '.cccccc...', '.c0000c...', '.c0000c...', '.cccccc...', '..........', '..........'] }
  },

  enemies: {
    marinero: { sprite: 'marinero', ai: 'ranged', hp: 6, speed: 18, sight: 160, cooldown: 2.3, proj: { speed: 230, w: 5, h: 2, col: '#ffcd75', sfx: 'rifle' }, drop: { weapon: 'rifle', chance: .35 }, barks: ['Venimos en son de paz. Los cañones son decorativos.', 'El Comodoro dice que esto es "abrir mercados". Yo abro fuego.', 'Me prometieron conocer el mundo. Conozco la cubierta.'] },
    samuraiRifle: { sprite: 'samuraiRifle', ai: 'ranged', hp: 7, speed: 18, sight: 150, cooldown: 2.7, proj: { speed: 210, w: 5, h: 2, col: '#f4f4f4', sfx: 'rifle' }, drop: { weapon: 'mosquete', chance: .35 }, barks: ['Cambié la katana por esto. No sirve para cortar sushi.', 'Diez años de entrenamiento. Ahora aprieto un gatillo.', '¿Cómo era? ¿La bala va adelante o atrás?'] },
    ninja: { sprite: 'ninja', ai: 'chase', hp: 5, speed: 36, chase: 80, jump: 270, sight: 130, barks: ['Con el alumbrado a gas ya no hay dónde esconderse.', 'Me modernicé: ahora espío por telégrafo.', 'Nadie me vio. Salvo el fotógrafo. Maldito invento.'] },
    comerciante: { sprite: 'comerciante', ai: 'ranged', hp: 6, speed: 16, sight: 140, cooldown: 2.8, proj: { speed: 115, grav: 300, spr: 'p_tratado', w: 6, h: 8 }, barks: ['¡Libre comercio! Libre para nosotros, comercio para ustedes.', 'Firmá acá. La letra chica es todo el contrato.', 'Les vendemos relojes. Y después les cobramos la hora.'] },
    gaviota: { sprite: 'paloma', ai: 'flyer', gun: false, hp: 3, speed: 58, hover: 6, sight: 150, sightY: 100, animSpeed: 14 },
    canonero: { sprite: 'canonero', ai: 'chase', mini: true, heavy: true, scale: 2, w: 26, h: 20, hp: 70, speed: 18, chase: 40, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'rifle' }, barks: ['¡Cañón de la amistad, cargado!', '¡Saludo de bienvenida! ¡Agáchense!'] }
  },

  npcs: {
    pescadora: { sprite: 'pescadora', gift: { heal: 'sushi' }, lines: ['Apareció un barco negro que echa humo. Espantó a todos los peces.', 'Dicen que viene a "ofrecernos amistad". Nunca vi una amistad con tantos cañones.'] },
    ronin: { sprite: 'ronin', gift: { heal: 'te' }, lines: ['Era samurái. Abolieron a los samuráis. Estoy haciendo un curso de telégrafo.', 'Ojo con los comerciantes: tiran contratos en arco. No firmes nada.'] },
    ronin2: { sprite: 'ronin', gift: { ammo: true }, lines: ['El Barco Negro dispara por la borda: no te quedes debajo.', 'Cuando el Comodoro da su discurso sobre la amistad, pegale. Dura un rato largo.'] }
  },

  boss: {
    name: 'EL BARCO NEGRO DEL COMODORO', mul: { melee: 1.5, ranged: 0.8 }, sprite: 'barcoNegro', scale: 2, w: 56, h: 30, hp: 155, mode: 'hover', rest: .9,
    anchors: [[.78, .32], [.22, .32], [.5, .26], [.68, .44], [.32, .44]],
    attacks: {
      andanada: { type: 'shoot', count: 6, every: .2, n: 1, speed: 185, sfx: 'bang', proj: { col: '#333c57', col2: '#94b0c2', w: 6, h: 6 } },
      bombardeo: { type: 'rain', count: 10, every: .22, speed: 175, proj: { col: '#333c57', col2: '#566c86', w: 7, h: 7 } },
      vapor: { type: 'lines', kinds: ['beam', 'floor'], n: 5, every: .34, warn: .8, live: .5, col: '#f4f4f4', thick: 6 },
      amarras: { type: 'lines', kinds: ['diag', 'pillar'], n: 4, every: .38, warn: .85, live: .45, col: '#c68642', thick: 5 },
      desembarco: { type: 'summon', ids: ['marinero', 'gaviota', 'comerciante'], n: 2, max: 3 },
      discurso: { type: 'taunt', dur: 2.7, say: ['Vengo a ofrecerles nuestra amistad. Traje sesenta cañones de amistad.', 'Pueden elegir libremente: comerciar con nosotros, o comerciar con nosotros.', 'No es una invasión: es una visita con artillería.', 'Les traemos el progreso. La factura llega después.'] },
      caldera: { type: 'radial', count: 3, n: 11, speed: 100, proj: { col: '#f4f4f4', col2: '#c2c3c7', w: 5, h: 5 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['andanada', 'discurso', 'bombardeo', 'vapor'] },
      { until: .33, speed: 1.15, say: '¡Segunda ronda de negociaciones! ¡Fuego!', pattern: ['amarras', 'andanada', 'desembarco', 'discurso', 'caldera', 'bombardeo'] },
      { speed: 1.3, say: '¡¡MÁS CARBÓN!! ¡¡La amistad no se rinde!!', pattern: ['caldera', 'amarras', 'bombardeo', 'discurso', 'vapor', 'andanada', 'desembarco'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Japón, 1868. Doscientos años cerrado al mundo, y el mundo tocó timbre con un acorazado.' },
      { who: 'Viajero', text: 'Ahora hay samuráis con rifle, ninjas con telégrafo y señores de galera vendiendo "progreso".' },
      { who: 'Viajero', text: 'La pieza la usa el Comodoro de pisapapeles para los tratados. Tiene muchos tratados.' }
    ],
    bossIntro: [
      { who: 'Comodoro', spr: 'marinero', color: '#94b0c2', text: 'Buenos días. Vengo a proponer un intercambio justo entre naciones.' },
      { who: 'Viajero', text: '¿Y qué ofrecen ustedes?' },
      { who: 'Comodoro', spr: 'marinero', color: '#94b0c2', text: 'No dispararles. Es una oferta por tiempo limitado. ¡ARTILLEROS!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El Barco Negro quedó encallado. Los pescadores lo convirtieron en restaurante flotante.' },
      { who: 'Viajero', text: 'El Comodoro firmó un tratado nuevo: se va, y paga los peces que espantó. Con intereses.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      a: { enemy: 'marinero' }, s: { enemy: 'samuraiRifle' }, n: { enemy: 'ninja' }, t: { enemy: 'comerciante' }, q: { enemy: 'gaviota' }, K: { enemy: 'canonero' },
      N: { npc: 'pescadora' }, G: { npc: 'ronin' }, S: { npc: 'ronin2' }, W: { weapon: 'mosquete' }, A: { weapon: 'rifle' }, R: { weapon: 'ametralladora', rift: true },
      '1': { decor: 'vasija' }, '2': { decor: 'estandarte' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    N    1     W    n     2',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '                  s      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB n BBBBB  a  t   1',
        '#*',
        '#*'
      ],
      [
        '        q             c      q',
        '      ==        ===',
        '   a       s        t    n   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '          q          c',
        '               s    ===',
        '       ===    ===',
        '   F   n   ^^ a  ^^^   a   t   G',
        '#*',
        '#*'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   s    BBBBBBBBBBBBBBB  n t   A',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a     q      t       q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '      q        c       c   q',
        '       ===    ===     ===',
        '  n    s    ^^    K    a s S   2',
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
