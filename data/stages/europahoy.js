// ETAPA E5 — EUROPA ACTUAL (rama Europa, entrega la pieza). Sátira del turismo masivo y el souvenir;
// los huelguistas son aliados (y te dejan pasar el piquete).
CV.stage({
  id: 'europahoy', tech: 8,
  title: 'EUROPA ACTUAL', subtitle: 'Hoy. Temporada alta. Todo el año.',
  bg: {
    sky: ['#3a6ac0', '#7ab0e8', '#c8e4f5', '#fff0e0'],
    layers: [
      { gen: 'sun', x: 320, y: 40, r: 14, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 6, y: 16, h: 46, color: '#ffffff', speed: .04, drift: 3 },
      { gen: 'city', base: 196, min: 34, max: 74, color: '#b8a898', win: '#6a5a4a', lit: .5, speed: .14, seed: 7 },
      { gen: 'city', base: 206, min: 20, max: 52, color: '#8a6a5a', win: ['#ffe9a0', '#f4f4f4'], lit: .3, gap: 5, speed: .4, seed: 9 }
    ]
  },
  tiles: {
    '#': { pattern: 'pave', base: '#8a8a94', dark: '#5a5a66', light: '#b0b0ba', top: '#b0b0ba', topLight: '#d0d0d8', topDark: '#5a5a66', topH: 2 },
    'B': { pattern: 'brick', base: '#b07a5a', dark: '#7a4a3a', light: '#d09a7a' },
    '=': { base: '#3a8a5a', dark: '#2a5a3a', light: '#6ab07a' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 126, drums: 'k.hsk.hsk.hsk.ss',
    tracks: [
      { wave: 'square', vol: .05, notes: 'c5 _ e5 g5 _ e5 c5 _ d5 _ f5 a5 _ f5 d5 _ e5 _ g5 b5 _ g5 e5 _ d5 _ b4 g4 _ c5 _ _' },
      { wave: 'triangle', vol: .13, notes: 'c2 _ g2 _ c3 _ g2 _ d2 _ a2 _ d3 _ a2 _ e2 _ b2 _ e3 _ b2 _ g2 _ d2 _ c2 _ _ _' }
    ]
  },
  ambient: { col: ['#f4f4f4', '#d8d0c0'], rate: .04, vy: 10, vx: 16, life: 9 },
  heals: ['croissant', 'pizza'],
  collectible: { name: 'Imán de heladera', spr: 'c_iman' },

  sprites: {
    turista: {
      rows: [
        '................',
        '....pppppp',
        '...pppppppp',
        '....jjjjj.....0',
        '....j0j0j....00',
        '....jjjjj....d',
        '....mmmmmm..d',
        '...mm5mm5mmd',
        '...jm5mmm5jj',
        '...j.mmmmm',
        '.....mmmmm',
        '.....iiiii',
        '.....ii.ii',
        '.....jj.jj',
        '.....jj.jj',
        '....ccc.ccc'
      ],
      anim: { walk: [{ 13: '....jj...jj', 14: '....jj...jj', 15: '...ccc...ccc' }, {}] }
    },
    mimo: { from: 'turista', swap: { p: '0', m: 'c', '5': '0', i: '0', j: 'c', d: 'c' } },
    llavero: { from: 'turista', swap: { m: '8', p: 'e', '5': '4' } },
    guiaTur: { from: 'turista', swap: { m: 'r', p: 'r', '5': 'c' } },
    huelguista: { from: 'turista', swap: { m: 'o', p: 'h', '5': 'o', '0': 'c' } },
    palomaUrb: { from: 'mosquito', swap: { c: 'e', v: 'd', r: 'o' } },
    mechaeiffel: {
      rows: [
        '................................',
        '..............4444',
        '.............jjjjjj',
        '.............j0jj0j',
        '.............jjrrjj',
        '............eeeeeeee',
        '.............eeeeee',
        '.............e.ee.e',
        '.............eeeeee',
        '............ee.ee.ee',
        '....y.......eeeeeeee.......y',
        '...yyy.....ee.eeee.ee.....yyy',
        '....eeeeeeeeeeeeeeeeeeeeeeee',
        '..........ee.ee..ee.ee',
        '.........eeeeeeeeeeeeee',
        '.........ee.ee....ee.ee',
        '........ee.ee......ee.ee',
        '.......eeeeeeeeeeeeeeeeee',
        '.......ee.ee........ee.ee',
        '......ee.ee..........ee.ee',
        '......eee.e..........e.eee',
        '.....ee.ee............ee.ee',
        '.....eeeee............eeeee',
        '....ee.ee..............ee.ee',
        '....eee.e..............e.eee',
        '...ee.ee................ee.ee',
        '...eeeee................eeeee',
        '..ee.eee................eee.ee',
        '..eeeeee................eeeeee',
        '.0000000................0000000',
        '.0000000................0000000',
        ''
      ],
      anim: { a: [{ 4: '.............j0000j', 10: '...yyy......eeeeeeee......yyy', 11: '..yyyyy....ee.eeee.ee....yyyyy' }] }
    },
    p_torre: { rows: ['..ee..', '..ee..', '..ee..', '.eeee.', '.e..e.', 'eeeeee', 'e....e', 'e....e'] },
    c_iman: { rows: ['..........', '.ccc..ccc.', '.rrr..rrr.', '.rrr..rrr.', '.rrr..rrr.', '.rrrrrrrr.', '..rrrrrr..', '...rrrr...', '..........', '..........'] }
  },

  enemies: {
    turista: { sprite: 'turista', ai: 'chase', hp: 9, speed: 26, chase: 54, sight: 110, barks: ['¡Selfie! ¡Correte que tapás el monumento!', '¿Esto es Italia? El folleto decía Italia.', '¡Siete países en cuatro días!', '¿Dónde hay wifi?'] },
    llavero: { sprite: 'llavero', ai: 'ranged', hp: 7, speed: 20, sight: 150, cooldown: 2.4, proj: { speed: 130, grav: 260, spr: 'p_torre', w: 6, h: 8 }, barks: ['¡Torre, torrecita! ¡Uno por cinco, tres por diez!', '¡Brilla en la oscuridad! (no brilla)'] },
    mimo: { sprite: 'mimo', ai: 'ranged', hp: 6, speed: 14, sight: 130, cooldown: 2.8, proj: { speed: 150, w: 6, h: 6, col: 'rgba(255,255,255,.35)' }, barks: ['...', '... (te tira una caja invisible)', '... (hace que tira de una soga)'] },
    palomaUrb: { sprite: 'palomaUrb', ai: 'flyer', gun: false, hp: 3, speed: 56, hover: 4, sight: 140, sightY: 100, animSpeed: 20 },
    guiaTur: { sprite: 'guiaTur', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 90, speed: 26, chase: 58, jump: 250, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡Grupo 14, síganme! ¡El del paraguas rojo!', '¡Tienen diez minutos para ver dos mil años de historia!'] }
  },

  npcs: {
    huelga1: { sprite: 'huelguista', gift: { heal: 'croissant' }, lines: ['Estamos de huelga. Es martes. Pasá, pasá, el piquete es con el patrón, no con vos.', 'El alquiler subió porque todo el barrio ahora es hotel. Yo vivo en un folleto.'] },
    huelga2: { sprite: 'huelguista', gift: { heal: 'pizza' }, lines: ['Los mimos tiran cosas invisibles. Duelen igual. Nadie sabe cómo.', 'A las palomas no las mires a los ojos. Saben cosas.'] },
    huelga3: { sprite: 'huelguista', gift: { ammo: true }, lines: ['El vendedor de torrecitas se armó un robot con la mercadería que no vendió. Es enorme.', 'Cuando se pone a ofertar, baja la guardia. Regateale a golpes.'] }
  },

  boss: {
    name: 'EL MECHA-VENDEDOR DE TORRES', mul: { melee: 1.4, ranged: 0.8 }, sprite: 'mechaeiffel', scale: 2, w: 44, h: 56, hp: 185, walk: 16, rest: .9,
    attacks: {
      llaveros: { type: 'shoot', count: 3, every: .5, n: 3, spread: .34, speed: 140, proj: { spr: 'p_torre', w: 6, h: 8 } },
      lluvia: { type: 'rain', count: 10, every: .2, speed: 175, proj: { spr: 'p_torre', w: 6, h: 8 } },
      luces: { type: 'lines', kinds: ['zig', 'beam'], n: 5, every: .32, warn: .8, live: .5, col: '#ffe14a', thick: 5 },
      pisoton: { type: 'jump', power: 320 },
      rebote: { type: 'shoot', aim: 'arc', count: 4, every: .4, n: 1, proj: { spr: 'p_torre', w: 6, h: 8, grav: 300, bounce: 3, life: 6 } },
      grupo: { type: 'summon', ids: ['turista', 'palomaUrb'], n: 2, max: 4 },
      oferta: { type: 'taunt', dur: 2.6, say: ['¡Uno por cinco, tres por diez! ¡Para vos, amigo, tres por doce!', '¡Recuerdo auténtico! Hecho bien lejos de acá.', '¿Tenés cambio de quinientos?', '¡Última oferta! (la de recién también era la última)'] },
      destello: { type: 'radial', count: 3, n: 12, speed: 100, proj: { col: '#ffe14a', col2: '#ffffff', w: 4, h: 4 } },
      paseo: { type: 'charge', speed: 190, tele: .8 }
    },
    phases: [
      { until: .7, speed: 1, pattern: ['llaveros', 'oferta', 'lluvia', 'pisoton'] },
      { until: .4, speed: 1.15, say: '¡Se prende la torre! ¡Show de luces, cinco euros!', pattern: ['luces', 'rebote', 'grupo', 'oferta', 'destello', 'llaveros'] },
      { speed: 1.32, say: '¡¡LIQUIDACIÓN TOTAL!! ¡¡ME LLEVO TODO PUESTO!!', pattern: ['destello', 'paseo', 'luces', 'oferta', 'lluvia', 'rebote', 'pisoton', 'grupo'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Europa, hoy. Sobreviví a legiones, dragones y a Napoleón. Ahora vienen los tours.' },
      { who: 'Viajero', text: 'Hay dos horas de fila para ver una fila más corta que lleva a otra fila.' },
      { who: 'Viajero', text: 'La última pieza europea está en un puesto de souvenirs. Entre los imanes.' }
    ],
    bossIntro: [
      { who: 'Vendedor', spr: 'llavero', color: '#ffe14a', text: '¡Amigo! ¡Esa pieza brillante es edición limitada! ¡Quinientos!' },
      { who: 'Viajero', text: 'Es mía. Se me cayó de la máquina del tiempo.' },
      { who: 'Vendedor', spr: 'llavero', color: '#ffe14a', text: '¡Todos dicen lo mismo! ¡MECHA-TORRE, ACTIVAR! ¡Y el robot también está en oferta!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El mecha se desarmó en cuatro mil llaveritos. Los turistas se los llevaron en dos minutos.' },
      { who: 'Viajero', text: 'Pieza europea recuperada. Y me llevé un imán. Estaba bueno el imán.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      k: { enemy: 'turista' }, a: { enemy: 'llavero' }, b: { enemy: 'mimo' }, q: { enemy: 'palomaUrb' }, K: { enemy: 'guiaTur' },
      N: { npc: 'huelga1' }, G: { npc: 'huelga2' }, S: { npc: 'huelga3' }, A: { weapon: 'ametralladora' }, W: { weapon: 'rifle' }, R: { weapon: 'laser', rift: true },
      '1': { decor: 'columna' }, '2': { decor: 'estandarte' }
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
        '        q             c      q',
        '      ==        ===',
        '   k       a        b    k k h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   k    BBBBBBBBBBBBBBB  k b a 2',
        '#*',
        '#*'
      ],
      [
        '          q          c    q',
        '               a    ===',
        '       ===    ===',
        '   F   k   ^^ k  ^^^   k   b   G',
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
        '         K        a',
        '   BB  BBBBB   BBBBB     q',
        '   BB  BBBBB b BBBBB  k  k   A',
        '#*',
        '#*'
      ],
      [
        '      q        c       c   q',
        '       ===    ===     ===',
        '  k    a    ^^    b    k a S   2',
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
