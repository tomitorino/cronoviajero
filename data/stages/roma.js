// ETAPA E1 — ROMA IMPERIAL (rama Europa)
CV.stage({
  id: 'roma', tech: 3,
  title: 'ROMA IMPERIAL', subtitle: 'Año 64. Todos los caminos conducen acá.',
  bg: {
    sky: ['#2f6fc5', '#6fb0e6', '#cfe8f5', '#f7ecc8'],
    layers: [
      { gen: 'sun', x: 70, y: 46, r: 16, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 6, y: 18, h: 50, color: '#ffffff', speed: .04, drift: 3 },
      { gen: 'arches', base: 176, rows: 3, ah: 22, period: 32, x0: 128, x1: 384, color: '#c9b79a', speed: .08 },
      { gen: 'hills', base: 186, amp: 26, color: '#9fbb72', top: '#b9d28a', speed: .16 },
      { gen: 'temples', n: 3, base: 194, h: 34, color: '#e2d6bd', ground: '#b7a98a', speed: .3 },
      { gen: 'trees', kind: 'pine', n: 8, base: 206, h: 48, color: '#2f5d3a', color2: '#4a3a2a', ground: '#7d9a58', speed: .5 }
    ]
  },
  tiles: {
    '#': { pattern: 'stone', base: '#c9b79a', dark: '#9a8468', light: '#e6d8bd', top: '#f2ead8', topDark: '#9a8468', topH: 2 },
    'B': { pattern: 'brick', base: '#b5604a', dark: '#7d3a2c', light: '#d98a70' },
    '=': { base: '#a8744a', dark: '#6a4428', light: '#d0a070' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 120, drums: 'k.s.k.ssk.s.k.ss',
    tracks: [
      { wave: 'square', vol: .05, notes: 'd4 _ d4 d4 a4 _ _ _ f#4 _ f#4 f#4 d5 _ _ _ c#5 _ b4 _ a4 _ g4 _ a4 _ _ _ _ _ - - d4 _ d4 d4 a4 _ _ _ b4 _ b4 b4 d5 _ _ _ e5 _ d5 _ c#5 _ a4 _ d5 _ _ _ _ _ - -' },
      { wave: 'triangle', vol: .13, notes: 'd2 _ a2 _ d2 _ a2 _ d2 _ a2 _ d2 _ a2 _ g2 _ d2 _ a2 _ e2 _ d2 _ a2 _ d2 _ a2 _' }
    ]
  },
  ambient: { col: ['#ffb3c8', '#ffffff'], rate: .08, vy: 14, vx: -10, life: 9 },
  heals: ['uvas', 'pizza'],
  collectible: { name: 'Denario', spr: 'c_denario' },

  sprites: {
    legionario: {
      rows: [
        '......rrr.......',
        '.....rrrrr......',
        '.....sssss......',
        '....sssssss.....',
        '....sjj0j0s.....',
        '....sjjjjj......',
        '.....jjjj.......',
        '...sssssssrrr...',
        '..jsdsdsdsr4r...',
        '..j.sssssrr4rr..',
        '....dsdsdsr4r...',
        '....rrrrrrrrr...',
        '....rr.rr.......',
        '....jj.jj.......',
        '....jj.jj.......',
        '...ggg.ggg......'
      ],
      anim: { walk: [{ 13: '...jj...jj......', 14: '..jj.....jj.....', 15: '.ggg.....ggg....' }, {}] }
    },
    velite: { from: 'legionario', swap: { r: '9', '4': 'c' } },
    gladiador: {
      rows: [
        '................',
        '.....ooooo......',
        '....ooooooo.....',
        '....o0o0o0o.....',
        '....ooooooo.....',
        '.....kkkkk......',
        '....kkkkkkk..c..',
        '...kkkkkkkkk.c..',
        '..kk.kkkkk.kkc..',
        '.ee..kkkkk...4..',
        'eeee.ggggg......',
        '.ee..g4g4g......',
        '.....kk.kk......',
        '.....kk.kk......',
        '.....kk.kk......',
        '....ggg.ggg.....'
      ],
      anim: { walk: [{ 13: '....kk...kk.....', 14: '...kk.....kk....', 15: '..ggg.....ggg...' }, {}] }
    },
    campeon: { from: 'gladiador', swap: { o: 'r', g: '1', e: 'o' } },
    leon: {
      rows: [
        '................',
        '................',
        '................',
        '................',
        '.........hhhh...',
        '........hhhhhh..',
        'i......hhi0i0h..',
        '.i.....hhiiiic..',
        '.i..iiihhiii0...',
        '..iiiiiihhii....',
        '..iiiiiiihh.....',
        '..iiiiiiiii.....',
        '..ii.ii.ii.i....',
        '..ii.ii.ii.i....',
        '..ii.ii.ii.i....',
        '..i..i..i..i....'
      ],
      anim: { walk: [{ 12: '..ii.ii.ii.i....', 13: '.ii..ii..ii.i...', 14: '.i....ii..i..i..', 15: 'i......i..i...i.' }, {}] }
    },
    emperador: {
      rows: [
        '................................',
        '............6.6666.6............',
        '...........66666666666..........',
        '..........6jjjjjjjjjj6..........',
        '..........6jjjjjjjjjjj6.........',
        '..........jjcccjjjcc0jj.........',
        '..........jjc0cjjjcccjj....oo...',
        '..........jjcccjjjjjjjj...o..o..',
        '..........jjjjjjkkjjjjj..o.44.o.',
        '...........jj000000jjj...o.44.o.',
        '...........jjjccccjjj....o.44.o.',
        '............jjjjjjjj.....o.44.o.',
        '..........ccccccccccc1....oooo..',
        '.........cccccccccc111cjjjj.....',
        '........ccccccccc111ccccjj......',
        '.......jcccccccc111cccc.........',
        '......jj.cccccc111ccccc.........',
        '.....jj..ccccc111cccccc.........',
        '....jj...cccc111ccccccc.........',
        '....j....ccc111cccccccc.........',
        '.........cc111ccccccccc.........',
        '........ccc11cccccccccccc.......',
        '.......cccccccccccccccccc.......',
        '....oooooooooooooooooooooooo....',
        '...o444444444444444444444444o...',
        '...o411111111111111111111114o...',
        '...o444444444444444444444444o...',
        '....oooooooooooooooooooooooo....',
        '......o1o..............o1o......',
        '.....b.b.b............b.b.b.....',
        '......b.b..............b.b......',
        '................................'
      ],
      anim: { a: [{ 9: '...........jj0rrrr0jjj...o.44.o.', 10: '...........jj0rrrr0jj....o.44.o.', 11: '............jj0000jj.....o.44.o.' }] }
    },
    columna: { rows: ['.cccccccccccccc.', '..cddddddddddc..', '...cccccccccc...'].concat(Array(26).fill('....cscdcscd....'), ['...cccccccccc...', '..cddddddddddc..', '.cccccccccccccc.']) },
    estandarte: { rows: ['.......oo.......', '.....oooooo.....', '....oo.oo.oo....', '.......oo.......', '....rrrrrrrr....', '....rr4rr4rr....', '....r4rr4rr4....', '....rrrrrrrr....', '....rr4444rr....', '....rrrrrrrr....', '....r.rr.rr.....'].concat(Array(21).fill('.......gg.......')) },
    p_nota: { rows: ['...000..', '...0.00.', '...0..0.', '...0....', '.000....', '0000....', '0000....', '.00.....'] },
    c_denario: { rows: ['..........', '...oooo...', '..o4444o..', '.o44oo44o.', '.o4o4444o.', '.o4o4444o.', '.o44oo44o.', '..o4444o..', '...oooo...', '..........'] }
  },

  enemies: {
    legionario: { sprite: 'legionario', ai: 'chase', hp: 6, speed: 28, chase: 50, sight: 90, barks: ['¡SPQR!', '¡Por Júpiter!', '¡Formación tortuga! ...¿Muchachos?'] },
    velite: { sprite: 'velite', ai: 'ranged', hp: 4, speed: 24, sight: 140, cooldown: 2.4, proj: { speed: 190, w: 10, h: 2, col: '#c2c3c7' } },
    gladiador: { sprite: 'gladiador', ai: 'chase', hp: 7, speed: 30, chase: 76, jump: 250, hop: .01, sight: 110, drop: { weapon: 'espada', chance: .6 }, barks: ['¡Los que van a pegar te saludan!', '¡Pan y circo!'] },
    leon: { sprite: 'leon', ai: 'charger', gun: false, hp: 5, speed: 30, charge: 155, tele: .8, rest: 1, sight: 120, animSpeed: 12, barks: ['¡GRRR!'] },
    campeon: { sprite: 'campeon', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 45, speed: 30, chase: 70, jump: 270, hop: .012, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'arco' }, barks: ['¡Soy Máximo Exageradus!', '¿No se entretienen?'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, gift: { ammo: true }, lines: ['Acá el tiempo se abre en cuatro ramas. Cada una termina en una pieza de la máquina.', 'Con 3 de 4 se abre el tramo final. La cuarta es "contenido extra". Así lo vendí.'] }
  },

  boss: {
    name: 'EMPERADOR CHIFLADUS', mul: { melee: 1.3, ranged: 0.9 }, sprite: 'emperador', scale: 2, w: 40, h: 46, hp: 130, mode: 'hover', rest: 1,
    anchors: [[.75, .42], [.25, .42], [.5, .5], [.6, .32], [.4, .32]],
    attacks: {
      lira: { type: 'shoot', count: 3, every: .55, n: 3, spread: .32, speed: 115, proj: { spr: 'p_nota', w: 6, h: 6 } },
      uvas: { type: 'rain', count: 7, every: .26, speed: 170, proj: { col: '#6a4c93', col2: '#b78cff', w: 6, h: 6 } },
      fieras: { type: 'summon', ids: ['leon', 'gladiador'], n: 2, max: 3 },
      pulgar: { type: 'taunt', dur: 2.5, say: ['¡Pulgar abajo! ...¿O era arriba? Nunca me acuerdo.', '¡Silencio! Estoy componiendo.', '¿Alguien tiene fuego? Es para un amigo.', 'Mi caballo es senador. Vota mejor que ustedes.'] },
      aplausos: { type: 'radial', count: 2, n: 10, speed: 92, proj: { spr: 'p_nota', w: 6, h: 6 } },
      fuego: { type: 'lines', kinds: ['pillar'], n: 6, every: .3, warn: .85, live: .6, col: '#ff7a3d', thick: 6, height: 96 }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['lira', 'pulgar', 'uvas', 'aplausos'] },
      { until: .33, speed: 1.15, say: 'Roma no se quemó en un día. A ver... probemos.', pattern: ['fuego', 'lira', 'fieras', 'pulgar', 'aplausos'] },
      { speed: 1.35, say: '¡¡QUÉ ARTISTA PIERDE EL MUNDO!!', pattern: ['fuego', 'aplausos', 'lira', 'fieras', 'pulgar', 'uvas'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Roma. Mármol, acueductos y gente en sábanas que se toma muy en serio.' },
      { who: 'Viajero', text: 'La pieza cayó en el Coliseo. Obvio. Nunca cae en una panadería.' }
    ],
    bossIntro: [
      { who: 'Emperador', spr: 'emperador', color: '#b78cff', text: '¡Público mío! Hoy estreno mi nueva oda: "Yo, yo y también yo", en doce cantos.' },
      { who: 'Viajero', text: 'Disculpe, vengo por una pieza de metal que cayó del cielo...' },
      { who: 'Emperador', spr: 'emperador', color: '#b78cff', text: '¡Un crítico! ¡A los leones! ...Después de escuchar los doce cantos.' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'Se le desafinó la lira y el Senado aprovechó para jubilarlo.' },
      { who: 'Viajero', text: 'Una pieza menos. La máquina ya hace menos ruido a tostadora.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      l: { enemy: 'legionario' }, v: { enemy: 'velite' }, g: { enemy: 'gladiador' }, n: { enemy: 'leon' }, G: { enemy: 'campeon' },
      E: { weapon: 'espada' }, K: { weapon: 'ballesta', rift: true },
      '1': { decor: 'columna' }, '2': { decor: 'estandarte' }
    },
    segments: [
      [
        '                 c',
        '               =====',
        '  P  & 1    E         l    1',
        '#*',
        '#*'
      ],
      [
        '                      v',
        '            c       BBBBB',
        '          BBBB      BBBBB    h',
        '   l   BBBBBBB   n  BBBBB     2',
        '#*',
        '#*'
      ],
      [
        '           c             c',
        '      ==        ==     ====',
        '  g                           1',
        '#####    ####      ###     ######',
        '#####    ####      ###     ######'
      ],
      [
        '                  c',
        '    G',
        '  BBBBBBBBB     BBBBB',
        '                         ==',
        '             ==',
        '   F     l       v    n      2',
        '#*',
        '#*'
      ],
      [
        '                           K',
        '        v                 ===',
        '      BBBB     c',
        '      BBBB          g',
        '  n   BBBB   ^^^   BBBB    l   h',
        '#*',
        '#*'
      ],
      [
        '                c',
        '       v      BBBB',
        '     BBBB     BBBB     g',
        '  1  BBBB  l  BBBB          2',
        '#*',
        '#*'
      ],
      [
        '            c',
        '     ==    ===    ==',
        '  n                      l   h',
        '######   ^^^^^^^   ##########',
        '######   #######   ##########'
      ],
      [
        '                 v',
        '    c          BBBBB       c',
        '   ===         BBBBB      ===',
        '  g       n    BBBBB   n       1',
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
