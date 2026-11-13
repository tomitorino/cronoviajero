// ETAPA E3 — ERA NAPOLEÓNICA (rama Europa). Sátira del emperador y sus mariscales; los soldados rasos ya no dan más.
CV.stage({
  id: 'napoleon', tech: 5,
  title: 'ERA NAPOLEÓNICA', subtitle: '1805. El caballo es enorme. El jinete, no tanto.',
  bg: {
    sky: ['#5a7ab0', '#9ab8d8', '#d8e8f0', '#ffffff'],
    layers: [
      { gen: 'clouds', n: 7, y: 14, h: 56, color: '#ffffff', speed: .04, drift: 3 },
      { gen: 'mountains', base: 178, amp: 76, color: '#8a9ab8', snow: '#ffffff', n: 6, speed: .08 },
      { gen: 'hills', base: 192, amp: 20, color: '#c8d8e0', top: '#ffffff', f1: 1, f2: 3, speed: .18 },
      { gen: 'trees', kind: 'pine', n: 9, base: 206, h: 46, color: '#3a5a4a', color2: '#4a3a2a', ground: '#e0e8f0', speed: .45 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#8a7a6a', dark: '#5a4a3a', light: '#a89a8a', top: '#f0f4f8', topLight: '#ffffff', topDark: '#b8c8d8', topH: 3 },
    'B': { pattern: 'wood', base: '#7a5a3a', dark: '#4a3a22', light: '#a07a52' },
    '=': { base: '#8b5a2b', dark: '#5a3a1a', light: '#b07a45' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 120, drums: 'k.s.k.s.k.ssk.s.',
    tracks: [
      { wave: 'square', vol: .05, notes: 'g4 _ g4 a4 _ a4 d5 _ b4 _ g4 _ g4 b4 g4 e4 c5 _ a4 f#4 a4 _ g4 _ e4 _ d4 _ g4 _ _ _' },
      { wave: 'triangle', vol: .13, notes: 'g2 _ d2 _ g2 _ d2 _ g2 _ d2 _ e2 _ b1 _ c2 _ g2 _ d2 _ a2 _ c2 _ d2 _ g2 _ _ _' }
    ]
  },
  ambient: { col: ['#ffffff', '#e0e8f0'], rate: .25, vy: 26, vx: -10, life: 8 },
  items: {
    croissant: { name: 'Croissant', heal: 2, spr: 'i_croissant' },
    queso: { name: 'Queso', heal: 3, spr: 'i_queso' }
  },
  heals: ['croissant', 'queso'],
  collectible: { name: 'Medalla', spr: 'c_denario' },

  sprites: {
    granadero: {
      rows: [
        '.....0000.......',
        '.....00000',
        '.....00000',
        '.....00000',
        '.....jjjjj',
        '.....j0j0j',
        '.....jjjjj',
        '....9999999...d',
        '...99c9c9c99..d',
        '...j9cc9cc9jjjh',
        '...j.99c99...h',
        '.....99999',
        '.....ccccc',
        '.....cc.cc',
        '.....cc.cc',
        '....000.000'
      ],
      anim: { walk: [{ 13: '....cc...cc', 14: '....cc...cc', 15: '...000...000' }, {}] }
    },
    fusilero: { from: 'granadero', swap: { '0': 'e' } },
    husar: { from: 'granadero', swap: { '9': '6', '0': 'h' } },
    mariscal: { from: 'granadero', swap: { '9': '4', '0': '1' } },
    raso: { from: 'granadero', swap: { '9': 'g', '0': 'h' } },
    cocinera: { from: 'filosofo', swap: { d: 'c', s: 'k' } },
    paloma: { from: 'mosquito', swap: { c: 'd', v: 's', r: 'o' } },
    napoleon: {
      rows: [
        '................................',
        '..........000000',
        '.........00000000',
        '..........jjjj..........cc.c',
        '..........j0j0.........cccccc',
        '..........9999........cc0ccccc',
        '.........c9999c......cccccccccc',
        '..........9cc9......ccccccc.cccc',
        '..........c..c.....ccccccc...c0c',
        '....cccccccccccccccccccccc',
        '...cccccccccrrrrccccccccc',
        '..ccccccccccr44rcccccccc',
        '.dcccccccccccccccccccccc',
        '.dcccccccccccccccccccccc',
        '.d.ccccccccccccccccccccc',
        'dd.cccccccccccccccccccc',
        'dd..ccccccccccccccccccc',
        'd...cccccddddddddcccccc',
        '....cccc..........cccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ccc............ccc',
        '....ddd............ddd',
        '....000............000',
        '....000............000',
        ''
      ],
      anim: {
        walk: [{ 19: '...ccc..............ccc', 20: '..ccc................ccc' }, {}],
        a: [{ 3: '..........jjjj.s........cc.c', 4: '..........j0j0.s.......cccccc', 5: '..........9999s.......cc0ccccc' }]
      }
    },
    i_croissant: { rows: ['..........', '..........', '...iiii...', '..i4i4ii..', '.ii4i4iii.', '.ii....ii.', '.i......i.', '..........', '..........', '..........'] },
    i_queso: { rows: ['..........', '..........', '.....yy...', '...yyyyyy.', '.yyyy4yyy.', '.y4yyyy4y.', '.yyyyyyyy.', '..........', '..........', '..........'] }
  },

  enemies: {
    granadero: { sprite: 'granadero', ai: 'chase', hp: 9, speed: 22, chase: 46, sight: 100, drop: { weapon: 'espada', chance: .3 }, barks: ['¡Vive l\'Empereur! ¿Nos pagan hoy?', '¡Adelante! ...¿Hacia dónde era adelante?', 'Este gorro pesa más que el fusil.'] },
    fusilero: { sprite: 'fusilero', ai: 'ranged', hp: 6, speed: 18, sight: 160, cooldown: 2.8, proj: { speed: 210, w: 4, h: 3, col: '#333c57', sfx: 'bang' }, drop: { weapon: 'mosquete', chance: .5 }, barks: ['¡Apunten! ¡Fuego! ...¡Recarguen! (son 20 pasos)'] },
    husar: { sprite: 'husar', ai: 'charger', hp: 7, speed: 26, charge: 150, tele: .85, rest: 1.1, sight: 120, animSpeed: 12, barks: ['¡A la carga! ¡Sin caballo, pero con actitud!'] },
    paloma: { sprite: 'paloma', ai: 'flyer', gun: false, hp: 2, speed: 50, hover: 4, sight: 130, sightY: 90, animSpeed: 20 },
    mariscal: { sprite: 'mariscal', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 60, speed: 24, chase: 54, jump: 250, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'mosquete' }, barks: ['¡Tengo más medallas que batallas!', '¡Esta medalla es por llegar puntual!'] }
  },

  npcs: {
    raso: { sprite: 'raso', gift: { heal: 'croissant' }, lines: ['Nos dijeron "volvemos para Navidad". No dijeron de qué año.', 'Marchamos hasta Rusia. A pie. En invierno. Idea del bajito.'] },
    cocinera: { sprite: 'cocinera', gift: { heal: 'queso' }, lines: ['Un ejército marcha sobre su estómago. Y este no come desde el martes.', 'Los húsares embisten derecho. Un saltito y pasan de largo.'] },
    raso2: { sprite: 'raso', gift: { ammo: true }, lines: ['Al Emperador no le digas "bajito". Se distrae gritando y ahí le podés pegar.', 'El caballo es buenísimo. Lástima el jinete.'] }
  },

  boss: {
    name: 'NAPOLEÓN Y SU CABALLO GIGANTE', mul: { melee: 0.8, ranged: 1.3 }, sprite: 'napoleon', scale: 2, w: 44, h: 56, hp: 155, walk: 16, rest: 1,
    attacks: {
      cabalgata: { type: 'charge', speed: 200, tele: .8 },
      canones: { type: 'shoot', aim: 'arc', count: 4, every: .45, n: 1, sfx: 'bang', proj: { col: '#333c57', col2: '#566c86', w: 8, h: 8, grav: 300, bounce: 2, life: 5 } },
      sablazos: { type: 'lines', kinds: ['diag', 'high'], n: 4, every: .4, warn: .8, live: .45, col: '#f4f4f4', thick: 5 },
      metralla: { type: 'shoot', count: 2, every: .8, n: 4, spread: .4, speed: 150, sfx: 'bang', proj: { col: '#333c57', col2: '#94b0c2', w: 5, h: 5 } },
      guardia: { type: 'summon', ids: ['granadero', 'fusilero'], n: 2, max: 3 },
      bajito: { type: 'taunt', dur: 2.8, say: ['¡NO SOY BAJITO! ¡Es la perspectiva!', '¡Mido lo normal para la época! ¡Busquen!', '¿Quién dijo "petiso"? ¡Lo escuché!', 'Desde acá arriba veo todo. Bueno, casi todo.'] },
      salto: { type: 'jump', power: 320 },
      bombardeo: { type: 'rain', count: 8, every: .24, speed: 180, proj: { col: '#333c57', col2: '#566c86', w: 8, h: 8 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['canones', 'bajito', 'sablazos', 'cabalgata'] },
      { until: .33, speed: 1.15, say: '¡Artillería! ¡Tapen el sol con balas!', pattern: ['bombardeo', 'metralla', 'guardia', 'bajito', 'salto', 'sablazos'] },
      { speed: 1.3, say: '¡¡ESTO NO ES WATERLOO!! ...¿O sí?', pattern: ['metralla', 'cabalgata', 'bombardeo', 'bajito', 'canones', 'salto', 'guardia'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Nieve, tambores y miles de tipos con gorros altísimos. Alguien compensa algo.' },
      { who: 'Viajero', text: 'El plan del Emperador: conquistar todo el continente. El plan B: no hay plan B.' },
      { who: 'Viajero', text: 'La pieza la usa de pisapapeles en su carpa. Hay que ir a buscarla.' }
    ],
    bossIntro: [
      { who: 'Napoleón', spr: 'granadero', color: '#41a6f6', text: '¡Alto! ¡Estás ante el Emperador de casi toda Europa!' },
      { who: 'Viajero', text: 'Perdón, ¿dónde? Ah, ahí arriba. No te había visto.' },
      { who: 'Napoleón', spr: 'granadero', color: '#41a6f6', text: '¡¡ES EL CABALLO QUE ES GRANDE!! ¡¡A ÉL!!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El caballo se fue caminando tranquilo. Sin el jinete. Se lo ve más liviano.' },
      { who: 'Viajero', text: 'Los soldados rasos votaron volver a casa. Por unanimidad. Antes de Navidad.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      k: { enemy: 'granadero' }, a: { enemy: 'fusilero' }, z: { enemy: 'husar' }, q: { enemy: 'paloma' }, K: { enemy: 'mariscal' },
      N: { npc: 'raso' }, G: { npc: 'cocinera' }, S: { npc: 'raso2' }, E: { weapon: 'espada' }, W: { weapon: 'mosquete' }, R: { weapon: 'ametralladora', rift: true },
      '1': { decor: 'estandarte' }, '2': { decor: 'huesos' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    1    N     W    k     1',
        '#*',
        '#*'
      ],
      [
        '        q             c',
        '      ==        ===          q',
        '   k       a        z    k   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   z    BBBBBBBBBBBBBBB   k a 2',
        '#*',
        '#*'
      ],
      [
        '          q          c',
        '               a    ===',
        '       ===    ===',
        '   F   k     z  ^^^   k   a   G',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a        q           q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '                 c',
        '         K        a',
        '   BB  BBBBB   BBBBB     q',
        '   BB  BBBBB z BBBBB  k  k   1',
        '#*',
        '#*'
      ],
      [
        '      q        c       c',
        '       ===    ===     ===',
        '  k    z    ^^    a    k a S   2',
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
