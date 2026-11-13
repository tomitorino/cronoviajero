// ETAPA L5 — ARGENTINA ACTUAL (rama Latam, entrega la pieza de la rama). El nivel más cómico.
CV.stage({
  id: 'argentina', tech: 8,
  title: 'ARGENTINA ACTUAL', subtitle: 'Buenos Aires, hoy. Hora pico.',
  bg: {
    sky: ['#2b4a8a', '#5a8ad0', '#a8d0f0', '#ffe2b0'],
    layers: [
      { gen: 'sun', x: 60, y: 120, r: 20, color: '#ffd9a0', color2: '#fff1d0', speed: .01 },
      { gen: 'clouds', n: 6, y: 16, h: 50, color: '#e8f2ff', speed: .04, drift: 3 },
      { gen: 'obelisk', x: 250, base: 196, h: 104, color: '#dfe3ee', win: '#566c86', speed: .07 },
      { gen: 'city', base: 196, min: 40, max: 96, color: '#7484ad', win: '#ffe9a0', lit: .22, tank: true, speed: .14, seed: 3 },
      { gen: 'city', base: 206, min: 22, max: 70, color: '#3d4668', win: ['#ffe14a', '#73eff7', '#ffcd75'], lit: .32, tank: true, gap: 6, speed: .4, seed: 5 }
    ]
  },
  tiles: {
    '#': { pattern: 'pave', base: '#8d8f98', dark: '#62646e', light: '#b4b6c0', top: '#c9cbd4', topDark: '#62646e', topH: 2 },
    'B': { pattern: 'brick', base: '#b5533c', dark: '#7d3526', light: '#d9795c' },
    '=': { base: '#e03c32', dark: '#8a1f1a', light: '#ff9a8a' },
    '^': { base: '#ff8a00', dark: '#333c57', light: '#ffffff' }
  },
  music: {
    bpm: 100, drums: 'k.hhs.hhk.hhs.hh',
    tracks: [
      { wave: 'square', vol: .05, notes: 'a4 _ c5 _ e5 _ c5 _ a4 _ c5 _ e5 _ _ _ g4 _ b4 _ d5 _ b4 _ g4 _ b4 _ d5 _ _ _ f4 _ a4 _ c5 _ a4 _ f4 _ a4 _ c5 _ d5 _ e5 _ _ _ d5 _ c5 _ b4 _ g#4 _ e4 _ _ _' },
      { wave: 'triangle', vol: .14, notes: 'a2 _ _ _ e3 _ a2 _ a2 _ _ _ e3 _ a2 _ g2 _ _ _ d3 _ g2 _ g2 _ _ _ d3 _ g2 _ f2 _ _ _ c3 _ f2 _ f2 _ _ _ c3 _ f2 _ e2 _ _ _ b2 _ e2 _ e2 _ _ _ b2 _ e2 _' }
    ]
  },
  ambient: { col: ['#8fd3ff', '#ffffff'], rate: .1, vy: 20, vx: -6, life: 9 },
  heals: ['mate', 'empanada', 'asado'],
  collectible: { name: 'SUBE con saldo', spr: 'c_sube' },

  sprites: {
    motochorro: {
      rows: [
        '................',
        '.....000........',
        '....00000.......',
        '....0vv00.......',
        '....00000.......',
        '.....fff........',
        '....fffff.4.....',
        '...ffffffj......',
        '..rrfffrrrrr....',
        '.rrrrrrrrrrry...',
        '.rr000rrr000r...',
        '..00e00.00e00...',
        '..0e0e0.0e0e0...',
        '..00e00.00e00...',
        '...000...000....',
        '................'
      ],
      anim: { walk: [{ 11: '..0e0e0.0e0e0...', 12: '..00e00.00e00...', 13: '..0e0e0.0e0e0...' }, {}] }
    },
    trapito: {
      rows: [
        '................',
        '.....rrrr.......',
        '....rrrrrrr.....',
        '....jjjjj.......',
        '....j0j0j...33..',
        '....jjjjj..333..',
        '.....jjj...33...',
        '....aaaaa.j.....',
        '...aaaaaaaj.....',
        '..jaaaaaa.......',
        '..j.aaaaa.......',
        '....99999.......',
        '....99.99.......',
        '....99.99.......',
        '....99.99.......',
        '...ccc.ccc......'
      ],
      anim: { walk: [{ 13: '...99...99......', 14: '..99.....99.....', 15: '.ccc.....ccc....' }, {}] }
    },
    punguista: {
      rows: [
        '................',
        '................',
        '.....eeee.......',
        '....eeeeee......',
        '....ejjjje......',
        '....ej0j0e......',
        '....ejjjj.......',
        '...eeeeeee......',
        '..eeeeeeeejj....',
        '..eeeeeeee......',
        '..jeeeeee.......',
        '....eeeee.......',
        '....ff.ff.......',
        '....ff.ff.......',
        '....ff.ff.......',
        '...ccc.ccc......'
      ],
      anim: { walk: [{ 13: '...ff...ff......', 14: '..ff.....ff.....', 15: '.ccc.....ccc....' }, {}] }
    },
    repartidor: {
      rows: [
        '................',
        '..rrrrr.........',
        '..rrrrr.000.....',
        '..rrcrr.0jj.....',
        '..rrrrr.jjj.....',
        '..rrrrr666......',
        '..rrrrr6666j....',
        '.....e.666..e...',
        '.....eeeeeeee...',
        '....e.e....e....',
        '..000.e...000...',
        '.0e0e0e..0e0e0..',
        '.0e0e0eee0e0e0..',
        '.0eee0...0eee0..',
        '..000.....000...',
        '................'
      ],
      anim: { walk: [{ 11: '.0eee0e..0eee0..', 13: '.0e0e0...0e0e0..' }, {}] }
    },
    vendedor: {
      rows: [
        '................',
        '.....6666.......',
        '....666666......',
        '....jjjjj.......',
        '....j0j0j.......',
        '....jj0jj.......',
        '.....jjj........',
        '....44444.......',
        '...4444444jmm...',
        '..j444444.mcm...',
        '..j.44444.mmm...',
        '....88888.......',
        '....88.88.......',
        '....88.88.......',
        '....88.88.......',
        '...000.000......'
      ],
      anim: { walk: [{ 13: '...88...88......', 14: '..88.....88.....', 15: '.000.....000....' }, {}] }
    },
    colectivo: {
      rows: [
        '................................',
        '..aaaaaaaaaaaaaaaaaaaaaaaaaaa...',
        '.aayyyyyyyyyyyyyyyyyyyyyyyyyaa..',
        '.a0vv0vv0vv0vv0vv0vv0vv0vvv0vva.',
        '.a0vv0vv0vv0vv0vv0vv0vv0vvj0vva.',
        '.a0vv0vv0vv0vv0vv0vv0vv0vvj0vva.',
        '.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        '.rrrrrrrrrrrrrrrrrrrrrrrrrrrrrry',
        '.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        '.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaay',
        '.aa00000aaaaaaaaaaaaaa00000aaaa.',
        '.a0000000aaaaaaaaaaaa0000000ass.',
        '..00e0e00............00e0e00....',
        '..0e0e0e0............0e0e0e0....',
        '..00e0e00............00e0e00....',
        '...00000..............00000.....'
      ],
      anim: { walk: [{ 12: '..0e0e0e0............0e0e0e0....', 13: '..00e0e00............00e0e00....', 14: '..0e0e0e0............0e0e0e0....' }, {}] }
    },
    motojefe: {
      rows: [
        '................................',
        '..............0000000...........',
        '.............000000000..........',
        '.............000vvvvv0..........',
        '.............000vvvvv0..........',
        '.............000000000..........',
        '..............0000000...........',
        '............fffffffffff.........',
        '...........fffffffffffff..e.....',
        '..........ffff4ffff4fffffeee....',
        '..........fffffffffffffjjeeee...',
        '...........ffffffffffff...eee.4.',
        '.....rrrrrrrfffffffffrrrrrrrr44.',
        '....rrrrrrrrrrrrrrrrrrrrrrrrrr4.',
        '...rrrrrrrrrrrrrrrrrrrrrrrrrrry.',
        '..rrrcccrrrrrrrrrrrrrrrrrrrrryyy',
        '..rrrrrrrrrrrrr00rrrrrrrrrrrryyy',
        '.eerrrrrrrrrrr0000rrrrrrrrrrrry.',
        '.eeesssrrrrrr000000rrrrrrrsss...',
        'eee.ssss.000000000000000.ssss...',
        'ee...ss0000000.eeee.0000000s....',
        '....00000000000eeee00000000000..',
        '...000eeeee0000....0000eeeee000.',
        '..000ee0e0ee000....000ee0e0ee000',
        '..00ee0eee0ee00....00ee0eee0ee00',
        '..00e0ee0ee0e00....00e0ee0ee0e00',
        '..00ee0eee0ee00....00ee0eee0ee00',
        '..000ee0e0ee000....000ee0e0ee000',
        '...000eeeee000......000eeeee000.',
        '....000000000........000000000..',
        '......00000............00000....',
        '................................'
      ],
      anim: {
        a: [{ 3: '.............000rrrrr0..........', 4: '.............000rrrrr0..........', 8: '...........fffffffffffff.eee..4.', 9: '..........ffff4ffff4ffffeeeee44.', 10: '..........fffffffffffffjjeee.4..', 11: '...........ffffffffffff.........' }],
        walk: [{ 23: '..000e0eee0e000....000e0eee0e000', 24: '..00e0ee0ee0e00....00e0ee0ee0e00', 25: '..00ee0eee0ee00....00ee0eee0ee00', 26: '..00e0ee0ee0e00....00e0ee0ee0e00', 27: '..000e0eee0e000....000e0eee0e000' }, {}]
      }
    },
    semaforo: { rows: ['.....000000.....', '.....0rrrr0.....', '.....0rrrr0.....', '.....000000.....', '.....0hhhh0.....', '.....0hhhh0.....', '.....000000.....', '.....0qqqq0.....', '.....0qqqq0.....', '.....000000.....'].concat(Array(22).fill('.......ee.......')) },
    tacho: { rows: ['................', '................', '................', '................', '................', '.....ffffff.....', '...ffffffffff...', '...6666666666...', '...6q66q66q66...', '...6q66q66q66...', '...6q66q66q66...', '...6q66q66q66...', '...6q66q66q66...', '...6666666666...', '....66666666....', '....0......0....'] },
    p_celu: { rows: ['.0000.', '0bbbb0', '0bbbb0', '0bbbb0', '0bbbb0', '0bbbb0', '00cc00', '.0000.'] },
    c_sube: { rows: ['..........', '..........', '.aaaaaaaa.', '.accc9999.', '.a9999999.', '.a99cccc9.', '.a9999999.', '.aaaaaaaa.', '..........', '..........'] }
  },

  enemies: {
    motochorro: { sprite: 'motochorro', ai: 'charger', hp: 7, speed: 26, charge: 165, tele: .8, rest: 1, sight: 130, animSpeed: 16, barks: ['¡Dame el celu!', '¡Quedate piola!', '¡Es un toque nomás!'] },
    trapito: { sprite: 'trapito', ai: 'ranged', hp: 7, speed: 20, sight: 130, cooldown: 2.2, proj: { col: '#ef7d57', col2: '#ffcd75', w: 6, h: 5, speed: 120, grav: 300 }, barks: ['¿Se lo cuido, jefe?', 'Son dos lucas la estadía.', 'A voluntad... la mía.'] },
    punguista: { sprite: 'punguista', ai: 'chase', steal: true, hp: 6, speed: 30, chase: 96, sight: 100, stealBarks: ['¡Gracias, capo!', '¡Permiso, bajo en la próxima!', '¡Uy, perdón! (No perdón.)'] },
    repartidor: { sprite: 'repartidor', ai: 'kamikaze', hp: 5, speed: 34, charge: 155, tele: .85, sight: 130, animSpeed: 16, boomSay: '¡Se enfrió el pedido!', boomCols: ['#e03c32', '#ffcd75', '#f4f4f4'], barks: ['¡Pedido en camino!', '¡Permiso, permiso!', '¡Cinco estrellas, eh!'] },
    vendedor: { sprite: 'vendedor', ai: 'ranged', hp: 7, speed: 20, sight: 140, cooldown: 2.6, proj: { col: '#ff77a8', col2: '#f4f4f4', w: 5, h: 5, speed: 140, aim: true }, barks: ['¡Tres pares por mil!', 'Señores pasajeros, disculpen la molestia...', '¡Alfajor, alfajor, alfajor!'] },
    colectivo: { sprite: 'colectivo', ai: 'charger', mini: true, heavy: true, scale: 2, w: 56, h: 28, hp: 60, speed: 14, charge: 180, tele: .7, rest: 1.2, sight: 170, sightY: 60, animSpeed: 14, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡Al fondo que hay lugar!', '¡FUERA DE SERVICIO!', '¡Un pasito más, por favor!'] }
  },

  boss: {
    name: 'EL JEFE DE LOS MOTOCHORROS', mul: { melee: 0.85, ranged: 1.3 }, sprite: 'motojefe', scale: 2, w: 48, h: 48, hp: 200, walk: 20, rest: 1,
    attacks: {
      willy: { type: 'charge', speed: 200, tele: .8, rest: 1.2, trail: 1.5 },
      celus: { type: 'shoot', count: 3, every: .5, n: 3, spread: .32, speed: 150, proj: { spr: 'p_celu', w: 5, h: 7, spin: true } },
      salto: { type: 'jump', power: 350 },
      banda: { type: 'summon', ids: ['motochorro', 'punguista'], n: 2, max: 3 },
      llamada: { type: 'taunt', dur: 2.6, say: ['Aguantá que me llaman... ¿Hola, ma? Sí, ya comí.', 'Pará, pará, que se me empañó la visera.', '¿Tenés cambio de mil? Es para el peaje.', 'Uh, se me quedó sin nafta. Bancame un toque.'] },
      tuercas: { type: 'rain', count: 8, every: .22, speed: 160, proj: { col: '#566c86', col2: '#c2c3c7', w: 7, h: 7 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['willy', 'celus', 'llamada', 'salto'] },
      { until: .33, speed: 1.15, say: '¡Ahora vas a ver lo que es una picada!', pattern: ['willy', 'banda', 'celus', 'salto', 'llamada', 'tuercas'] },
      { speed: 1.3, say: '¡¡MODO MECHA ACTIVADO!! (No tiene la VTV.)', pattern: ['willy', 'salto', 'tuercas', 'willy', 'celus', 'llamada', 'banda'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Buenos Aires, hora pico. La máquina marca "nivel de caos: 11 sobre 10".' },
      { who: 'Viajero', text: 'Objetivo: recuperar la pieza y, de ser posible, conservar el celular.' },
      { who: 'Viajero', text: 'Por lo menos hay mate, empanadas y choripán. Civilización, al fin.' }
    ],
    bossIntro: [
      { who: 'El Jefe', spr: 'motojefe', color: '#e03c32', text: '¡Eh, viajero! Linda maquinita del tiempo. ¿Cuánto pedís? Mentira: no pienso pagar.' },
      { who: 'Viajero', text: '¿Eso es una moto... con brazos?' },
      { who: 'El Jefe', spr: 'motojefe', color: '#e03c32', text: 'Mecha-moto tuneada: escape libre, luces de neón y ningún papel en regla. ¡Dame todo!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El Jefe devolvió todos los celulares. Tenía cuatro mil. Uno era un 1100 y seguía con batería.' },
      { who: 'Viajero', text: '¡La pieza de la rama Latam! Y ni un rasguño en la SUBE.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      t: { enemy: 'motochorro' }, T: { enemy: 'trapito' }, p: { enemy: 'punguista' }, d: { enemy: 'repartidor' }, V: { enemy: 'vendedor' }, C: { enemy: 'colectivo' },
      W: { weapon: 'ametralladora' },
      '1': { decor: 'semaforo' }, '2': { decor: 'tacho' }
    },
    segments: [
      [
        '              c',
        '            ====',
        '  P   1          T      2   p',
        '#*',
        '#*'
      ],
      [
        '                         c',
        '       ===      ===     ===',
        '    t        V       ^^        h',
        '########   #########*',
        '########   #########*'
      ],
      [
        '    c                  W',
        '          C          BBBBB',
        '   BBBBBBBBBBBBBBB   BBBBB',
        '                   ==',
        '               ==',
        '   F    d              T      2',
        '#*',
        '#*'
      ],
      [
        '           c                 c',
        '  p     BBBBBBB    d      BBBBBBB     V   h',
        '#####   #######   ####    #######   ######',
        '#####   #######   ####    #######   ######'
      ],
      [
        '                  c',
        '       ===       ===',
        '  t  T      p  ^^     d   t      1',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '      ===       ====',
        '  2  p     V          t      1',
        '#*',
        '#*'
      ],
      [
        '            c',
        '          BBBBB        V',
        '   T      BBBBB   d   BBBB   h',
        '######   #######   ##########',
        '######   #######   ##########'
      ],
      [
        '                    c',
        '    ===     ==     ===',
        '  d     ^^      p      T    t   2',
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
