// ETAPA N1 — REVOLUCIÓN DE 1776 (rama Norteamérica). Sátira del rey que cobra impuestos desde el otro lado del océano
// y de sus recaudadores; milicianos e imprenteros son aliados.
CV.stage({
  id: 'rev1776', tech: 5,
  title: 'REVOLUCIÓN DE 1776', subtitle: '1776. Impuestos sin representación. Y encima, al té.',
  bg: {
    sky: ['#3a5a9a', '#7aa0d0', '#c8dcec', '#f4ecd8'],
    layers: [
      { gen: 'sun', x: 90, y: 40, r: 13, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 7, y: 14, h: 50, color: '#ffffff', speed: .05, drift: 4 },
      { gen: 'hills', base: 178, amp: 22, color: '#7a9a6a', top: '#94b47a', f1: 1, f2: 3, speed: .1 },
      { gen: 'city', base: 190, min: 14, max: 34, color: '#8a5a4a', win: '#ffe9a0', lit: .3, gap: 10, speed: .26, seed: 5 },
      { gen: 'trees', n: 5, base: 200, h: 30, color: '#3a7a3a', color2: '#3e2a14', ground: '#4a7a3a', speed: .45 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#7a5a3a', dark: '#4a3420', light: '#9a7a52', top: '#5a9a3a', topLight: '#7aba4a', topDark: '#3a6a2a', topH: 3 },
    'B': { pattern: 'brick', base: '#a0503a', dark: '#6a2e20', light: '#c0705a' },
    '=': { base: '#8b5a2b', dark: '#5a3a1a', light: '#c68642' },
    '^': { base: '#c2c3c7', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 120, drums: 'k.s.k.s.k.s.ksss',
    tracks: [
      { wave: 'square', vol: .05, notes: 'c4 c4 d4 e4 _ c4 e4 d4 _ g3 c4 c4 d4 e4 _ c4 _ b3 _ c4 c4 d4 e4 f4 e4 d4 c4 b3 g3 a3 b3 c4' },
      { wave: 'triangle', vol: .13, notes: 'c2 _ g1 _ c2 _ g1 _ c2 _ g1 _ c2 _ g1 _ f2 _ c2 _ f2 _ c2 _ g1 _ g1 _ c2 _ _ _' }
    ]
  },
  ambient: { col: ['#f4f4f4', '#ffcd75'], rate: .25, vy: 20, vx: -20, life: 4 },
  items: { pastel: { name: 'Pastel de manzana', heal: 3, spr: 'i_pastel' } },
  heals: ['te', 'pastel'],
  collectible: { name: 'Panfleto revolucionario', spr: 'c_papiro' },

  sprites: {
    casaca: { from: 'soldado', swap: { q: 'r', e: '0', h: 'c' } },
    granaderoReal: { from: 'soldado', swap: { q: '2', e: 'y', h: 'c' } },
    // vaquero/colono: base de milicianos, bandidos y ayudantes de toda la rama
    cowboy: {
      rows: [
        '................',
        '....hhhhhh',
        '..hhhhhhhhhh',
        '....jjjjjj',
        '....j0jj0j',
        '....jrrrrj',
        '.....rrrr',
        '...gggggggg',
        '..gggigggiggg.e',
        '..j.gggggg.jee',
        '....g4ggg4',
        '....999999',
        '....99..99',
        '....99..99',
        '....hh..hh',
        '...hhh..hhh'
      ],
      anim: { walk: [{ 12: '...99....99', 13: '...99....99', 14: '...hh....hh', 15: '..hhh....hhh' }, {}] }
    },
    miliciana: { from: 'cowboy', swap: { h: '8', g: '9', r: 'j', '9': 'i' } },
    imprentero: { from: 'cowboy', swap: { h: 'f', g: 'c', r: 'j', i: 'd' } },
    cobrador: { from: 'tunica', swap: { r: '2', '4': 'y', '0': 'c' } },
    taza: {
      rows: ['................', '', '', '', '', '....cccccccc', '....c999999cc', '....cggggggc.c', '....c999999cc', '.....cccccc', '...cccccccccc', '', '', '', '', ''],
      anim: { walk: [{ 4: '......d..d' }, { 3: '.......d..d' }] }
    },
    reyTe: {
      rows: [
        '................................', '', '',
        '.............y.y.y',
        '.............yyyyy',
        '............ccccccc',
        '............cj0j0jc',
        '............cjjjjjc',
        '.............j222j',
        '..........rrrrrrrrrrr',
        '.........rrcrrrrrrrcrr....d',
        '.........jj.rrrrrrr.jjjjdd',
        '....ccccccccccccccccccccccc',
        '....c999c999c999c999c999cccccc',
        '....ccccccccccccccccccccc...cc',
        '.....c9c9c9c9c9c9c9c9c9cc...cc',
        '.....ccccccccccccccccccccccccc',
        '......ccccccccccccccccccc',
        '.......ccccccccccccccccc',
        '.........ccccccccccccc',
        '.......yyyyyyyyyyyyyyyyy',
        '', '', '', '', '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 1: '..........d.....d', 2: '...........d...d' }, { 2: '..........d.....d' }],
        a: [{ 7: '............cj000jc', 10: '.........rrcrrrrrrrcrrjjjd', 11: '.........jj.rrrrrrr.....dd' }]
      }
    },
    p_terron: { rows: ['cccccc', 'cwcccc', 'cccccc', 'ccccdc', 'cccccc', 'cccccc'] },
    i_pastel: { rows: ['..........', '..........', '...4444...', '..4i4i44..', '.44444444.', '.iiiiiiii.', '.hhhhhhhh.', '..........', '..........', '..........'] }
  },

  enemies: {
    casaca: { sprite: 'casaca', ai: 'ranged', hp: 6, speed: 18, sight: 150, cooldown: 2.6, proj: { speed: 210, w: 5, h: 2, col: '#ffcd75', sfx: 'bang' }, drop: { weapon: 'mosquete', chance: .4 }, barks: ['Casaca roja en el bosque. ¿Quién diseñó este camuflaje?', 'Marchamos en fila y de rojo. Nos sorprende que nos acierten.', '¡Por el Rey! Que está a seis semanas de barco.'] },
    granaderoReal: { sprite: 'granaderoReal', ai: 'chase', hp: 8, speed: 24, chase: 52, jump: 220, sight: 110, barks: ['¡Calar bayonetas! ¡Después del té!', 'Vine a cobrar un impuesto. Me quedé a una guerra.'] },
    cobrador: { sprite: 'cobrador', ai: 'charger', hp: 6, speed: 20, charge: 135, tele: .9, rest: 1.2, sight: 110, animSpeed: 12, barks: ['¡Impuesto al té! ¡Al papel! ¡A quejarse del impuesto!', '¿Representación? Sí: yo represento al Rey. Pagá.', '¡Estampilla obligatoria! ¡Hasta en las estampillas!'] },
    lord: { sprite: 'cobrador', ai: 'ranged', hp: 5, speed: 16, sight: 130, cooldown: 2.9, proj: { speed: 115, grav: 300, spr: 'p_terron', w: 6, h: 6 }, barks: ['¿Un terrón o dos? ¡Tomá los dos!', 'Las colonias son como hijos: uno les cobra y se enojan.'] },
    taza: { sprite: 'taza', ai: 'flyer', hp: 3, speed: 54, hover: 6, sight: 140, sightY: 100, animSpeed: 8 },
    cobradorMayor: { sprite: 'cobrador', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 66, speed: 22, chase: 48, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'ballesta' }, barks: ['¡RECAUDADOR MAYOR DE SU MAJESTAD! ¡Y de la mía!', '¡Impuesto retroactivo! ¡Con efecto al año que viene!'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, gift: { ammo: true }, lines: ['Ojo con los grandotes de cada época: disparan en abanico y pegan saltos. No te quedes quieto.', 'Yo me quedé quieto una vez. Por eso uso bastón. No se ve porque es pixel art.'] },
    miliciana: { sprite: 'miliciana', gift: { heal: 'pastel' }, lines: ['El Rey nos cobra impuestos por todo. Ayer tiramos su té al puerto. Los peces no durmieron.', 'Los cobradores embisten derecho: saltalos y que le cobren al aire.'] },
    imprentero: { sprite: 'imprentero', gift: { heal: 'te' }, lines: ['Imprimo panfletos: "todos los hombres son creados iguales". Abajo, en letra chica, hay excepciones. Estoy discutiendo eso.', 'Juntá los panfletos sueltos. La tinta sale carísima. Por el impuesto.'] },
    miliciana2: { sprite: 'miliciana', gift: { ammo: true }, lines: ['El Rey vino en persona, flotando en una taza gigante. No preguntes.', 'A la hora del té se queda quieto con el meñique levantado. Subite y dale con lo que tengas a mano.'] }
  },

  boss: {
    name: 'EL REY A LA HORA DEL TÉ', mul: { melee: 1.3, ranged: .9 }, sprite: 'reyTe', scale: 2, w: 52, h: 36, hp: 125, mode: 'hover', rest: 1, slow: 1.3,
    anchors: [[.76, .22], [.24, .22], [.5, .18], [.64, .34], [.36, .34]],
    attacks: {
      terrones: { type: 'shoot', count: 4, every: .28, n: 1, speed: 160, sfx: 'shoot', proj: { spr: 'p_terron', w: 6, h: 6 } },
      tetera: { type: 'rain', count: 8, every: .26, speed: 150, proj: { col: '#c68642', col2: '#ffcd75', w: 4, h: 8 } },
      edicto: { type: 'lines', kinds: ['beam', 'floor'], n: 4, every: .42, warn: .9, live: .45, col: '#ffe14a', thick: 5 },
      casacas: { type: 'summon', ids: ['casaca', 'taza'], n: 2, max: 3 },
      meñique: { type: 'taunt', dur: 2.8, say: ['Son las cinco. Se suspende la guerra. Meñique arriba.', '¿Representación? Les mandé un retrato mío. Está bastante representado.', 'Perdí trece colonias. Me quedan varias. Creo. ¿Alguien contó?', 'Este té salió carísimo. Lo sacamos del puerto con colador.'] },
      vajilla: { type: 'radial', count: 2, n: 9, speed: 95, proj: { col: '#f4f4f4', col2: '#41a6f6', w: 5, h: 5 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['terrones', 'meñique', 'tetera', 'edicto'] },
      { until: .33, speed: 1.12, say: '¡Guardias! ¡Y otra tetera!', pattern: ['edicto', 'terrones', 'casacas', 'meñique', 'vajilla', 'tetera'] },
      { speed: 1.25, say: '¡¡IMPUESTO A LA INDEPENDENCIA!! ¡¡Con recargo!!', pattern: ['vajilla', 'edicto', 'tetera', 'meñique', 'terrones', 'casacas'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: '1776. Trece colonias furiosas porque un rey les cobra impuestos desde otro continente.' },
      { who: 'Viajero', text: 'El lema es "sin representación no hay impuestos". El Rey leyó hasta "impuestos" y le gustó.' },
      { who: 'Viajero', text: 'La pieza de la máquina la usa de cucharita. Para el té. Obvio.' }
    ],
    bossIntro: [
      { who: 'El Rey', spr: 'cobrador', color: '#e03c32', text: '¡Súbdito! ¿Venís a pagar el impuesto al viaje en el tiempo?' },
      { who: 'Viajero', text: 'Ese impuesto no existe.' },
      { who: 'El Rey', spr: 'cobrador', color: '#e03c32', text: 'Lo acabo de decretar. Con retroactivo. ¡Me debés desde la prehistoria!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El Rey volvió a su isla en la taza, remando con la cucharita. Seis semanas de viaje.' },
      { who: 'Viajero', text: 'Las colonias festejaron la independencia. A los diez minutos inventaron sus propios impuestos.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      a: { enemy: 'casaca' }, g: { enemy: 'granaderoReal' }, t: { enemy: 'cobrador' }, l: { enemy: 'lord' }, q: { enemy: 'taza' }, K: { enemy: 'cobradorMayor' },
      N: { npc: 'miliciana' }, G: { npc: 'imprentero' }, S: { npc: 'miliciana2' }, W: { weapon: 'mosquete' }, A: { weapon: 'ballesta' }, R: { weapon: 'rifle', rift: true },
      '1': { decor: 'estandarte' }, '2': { decor: 'cortadera' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P  & N    2     W    g     1',
        '#*',
        '#*'
      ],
      [
        '        q             c',
        '      ==        ===          q',
        '   g       a        l    t   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   t    BBBBBBBBBBBBBBB  g l   G',
        '#*',
        '#*'
      ],
      [
        '          q          c',
        '               a    ===',
        '       ===    ===',
        '   F   t   ^^ g  ^^^   g   l   A',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a     q      l       q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '                 c',
        '                  a      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB t BBBBB  g  a   2',
        '#*',
        '#*'
      ],
      [
        '      q        c       c',
        '       ===    ===     ===',
        '  g    a    ^^    K    t a S   1',
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
