// ETAPA E2 — EDAD MEDIA (rama Europa). Sátira de reyes y recaudadores; los campesinos son aliados.
CV.stage({
  id: 'medieval', tech: 4,
  title: 'EDAD MEDIA', subtitle: 'Año 1000 y pico. Todo es del rey. Lo tuyo también.',
  bg: {
    sky: ['#3a4a7a', '#6a7ab0', '#b8a8c8', '#f0d0b0'],
    layers: [
      { gen: 'sun', x: 90, y: 60, r: 14, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 6, y: 16, h: 50, color: '#d8d0e8', speed: .04, drift: 3 },
      { gen: 'mountains', base: 176, amp: 70, color: '#5a6a8a', snow: '#eef0ff', n: 7, speed: .08 },
      { gen: 'city', base: 190, min: 30, max: 70, color: '#4a4a5a', win: '#ffcd75', lit: .06, gap: 30, speed: .16, seed: 4 },
      { gen: 'trees', kind: 'pine', n: 10, base: 206, h: 44, color: '#2a4a3a', color2: '#3a2a1a', ground: '#3a5a3a', speed: .45 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#6a5a3a', dark: '#4a3a22', light: '#8a7a52', top: '#4a8a3a', topLight: '#6ab04a', topDark: '#2a5a2a', topH: 3 },
    'B': { pattern: 'stone', base: '#8a8a9a', dark: '#5a5a6a', light: '#b0b0c0' },
    '=': { base: '#8b5a2b', dark: '#5a3a1a', light: '#b07a45' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 104, drums: 'k..hk..hk.h.k.hh',
    tracks: [
      { wave: 'square', vol: .05, notes: 'a4 _ c5 d5 _ e5 d5 c5 a4 _ g4 a4 _ _ e4 _ a4 _ c5 d5 _ e5 g5 e5 d5 _ c5 d5 _ _ - -' },
      { wave: 'triangle', vol: .13, notes: 'a2 _ _ e2 _ _ a2 _ g2 _ _ d2 _ _ g2 _ f2 _ _ c2 _ _ f2 _ e2 _ _ b1 _ _ e2 _' }
    ]
  },
  ambient: { col: ['#a7f070', '#f4f4f4'], rate: .05, vy: 8, vx: 12, life: 9 },
  items: { estofado: { name: 'Estofado dudoso', heal: 3, spr: 'i_ramen' } },
  heals: ['panmiel', 'estofado'],
  collectible: { name: 'Pergamino', spr: 'c_papiro' },

  sprites: {
    caballero: { from: 'conquistador', swap: { s: 'd', o: '9' } },
    ballestero: { from: 'conquistador', swap: { s: '6', o: 'h', c: 'g' } },
    recaudador: { from: 'conquistador', swap: { s: '4', o: 'n' } },
    vikingo: {
      rows: [
        '................',
        '...c......c',
        '...cddddddc',
        '....dddddd',
        '....dkkkkd',
        '....k0kk0k',
        '....oooooo',
        '....oooooo.....s',
        '...gggoogg...sss',
        '..kgggggggkkkkhs',
        '..k.gggggg....h',
        '....gggggg....h',
        '....hhhhhh',
        '....kk..kk',
        '....kk..kk',
        '...hhh..hhh'
      ],
      anim: { walk: [{ 13: '...kk....kk', 14: '...kk....kk', 15: '..hhh....hhh' }, {}] }
    },
    rata: {
      rows: ['................', '', '', '', '', '', '', '', '', '', '', '.........dd.d', '.....ddddddddd', 'm...ddddddd0ddm', '.mmdddddddddd', '....d.d..d.d'],
      anim: { walk: [{ 15: '...d.d....d.d' }, {}] }
    },
    campesina: { from: 'filosofo', swap: { d: 'h', c: '6', s: 'k' } },
    bufon: { from: 'filosofo', swap: { d: 'r', c: 'y', s: 'k' } },
    dragon: {
      rows: [
        '................................', '', '',
        '..........4.4.4.......6....6',
        '..........44444......666..666',
        '..........jjjjj.....6666666666',
        '..........j0j0j....66w0666666666',
        '..........ggggg....6666666666rr6',
        '.....66...rrrrr....666666cc.cc',
        '....6666..rrrrr...666666',
        '...66q666.rrrrr..666666',
        '..66qqq6666666666666666',
        '.66qqqqq66666666666666',
        '.6qqqqqqq6666666666666',
        '.6qq.qqqq666666x666666',
        '.6q..qq.q66666xxx66666',
        '.6...q..q6666xxxxx6666',
        '........66666xxxxx66666',
        '.......666666xxxxx666666',
        '......6666666.xxx.666666',
        '.....66666.66.....66.666',
        '....6666...66.....66..66',
        '...666....ccc....ccc..66',
        '..666..................666',
        '..66....................66',
        '...66..................r66r',
        '....6...................rr',
        '', '', '', '', ''
      ],
      anim: { a: [{ 6: '..........j0j0j....66wr666666666', 8: '.....66...rrrrr....666666oo4oo4o' }] }
    },
    p_fuego: { rows: ['..o4..', '.o44o.', 'o4yy4o', 'o4yy4o', '.o44o.', '..oo..'] }
  },

  enemies: {
    caballero: { sprite: 'caballero', ai: 'chase', hp: 8, speed: 20, chase: 44, sight: 95, drop: { weapon: 'espada', chance: .4 }, barks: ['¡Por el rey! ¿Cuál? El que esté esta semana.', '¡Esta armadura pesa cuarenta kilos!', '¡En guardia! ...Dame un segundo, se me trabó la visera.'] },
    ballestero: { sprite: 'ballestero', ai: 'ranged', hp: 5, speed: 18, sight: 150, cooldown: 2.8, proj: { speed: 190, w: 7, h: 2, col: '#5a3a1a' }, drop: { weapon: 'ballesta', chance: .5 }, barks: ['¡Recargando! Es a manivela.'] },
    vikingo: { sprite: 'vikingo', ai: 'chase', hp: 7, speed: 28, chase: 58, jump: 230, sight: 110, barks: ['¡SKOL!', '¡Vinimos en barco! ¡Nadie nos invitó!', '¡El casco no lleva cuernos! ¡Es por la foto!'] },
    rata: { sprite: 'rata', ai: 'patrol', gun: false, w: 12, h: 6, hp: 2, speed: 38, animSpeed: 16, barks: ['¡Fueron las pulgas, no nosotras!'] },
    recaudador: { sprite: 'recaudador', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 55, speed: 24, chase: 52, jump: 250, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'ballesta' }, barks: ['¡Impuesto por respirar!', '¡El diezmo! ¡Y el diezmo del diezmo!'] }
  },

  npcs: {
    campesina: { sprite: 'campesina', gift: { heal: 'estofado' }, lines: ['Tomá, estofado. No preguntes de qué.', 'El rey cobra impuesto a la lluvia. Y acá llueve siempre.'] },
    bufon: { sprite: 'bufon', gift: { ammo: true }, lines: ['Soy el único que le dice la verdad al rey. Por eso cobro en tomatazos.', 'El dragón y el rey vikingo discuten quién manda. Cuando discuten, pegales.'] },
    campesina2: { sprite: 'campesina', gift: { heal: 'panmiel' }, lines: ['A las ratas les echan la culpa de todo. Como a nosotros.', 'Cuidado arriba: el dragón escupe fuego donde vas a estar, no donde estás.'] }
  },

  boss: {
    name: 'EL DRAGÓN Y SU REY VIKINGO', mul: { melee: 0.85, ranged: 1.3 }, sprite: 'dragon', scale: 2, w: 46, h: 40, hp: 140, mode: 'hover', rest: 1,
    anchors: [[.75, .4], [.25, .4], [.5, .32], [.65, .5], [.35, .5]],
    attacks: {
      aliento: { type: 'shoot', count: 4, every: .4, n: 1, speed: 135, sfx: 'bang', proj: { spr: 'p_fuego', w: 6, h: 6 } },
      abanico: { type: 'shoot', count: 2, every: .8, n: 5, spread: .5, speed: 110, proj: { spr: 'p_fuego', w: 6, h: 6 } },
      llamarada: { type: 'lines', kinds: ['pillar'], n: 6, every: .28, warn: .85, live: .6, col: '#ff7a3d', thick: 6, height: 96 },
      tesoro: { type: 'rain', count: 8, every: .24, speed: 175, proj: { spr: 'c_denario', w: 8, h: 8, spin: true } },
      vikingos: { type: 'summon', ids: ['vikingo', 'rata'], n: 2, max: 3 },
      discusion: { type: 'taunt', dur: 2.8, say: ['¡Doblá a la izquierda! —¡Yo no doblo, yo PLANEO!', '¡El que manda soy yo! —¿Y quién tiene las alas?', '¡Fuego! —Pedilo bien. —...Fuego, por favor.', 'Te dije que comieras antes de salir.'] },
      espiral: { type: 'radial', count: 3, n: 9, speed: 90, proj: { spr: 'p_fuego', w: 6, h: 6 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['aliento', 'discusion', 'tesoro', 'abanico'] },
      { until: .33, speed: 1.15, say: '¡Quemalo todo! —¿Todo? —¡TODO!', pattern: ['llamarada', 'aliento', 'vikingos', 'discusion', 'espiral'] },
      { speed: 1.3, say: '¡¡AL VALHALLA!! —Yo no voy, tengo cueva.', pattern: ['espiral', 'llamarada', 'abanico', 'discusion', 'tesoro', 'vikingos'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Castillos, barro y olor a... mejor no averiguo. La Edad Media no venía con desodorante.' },
      { who: 'Viajero', text: 'Hay un señor cobrando impuesto por cruzar el puente. Y otro por no cruzarlo.' },
      { who: 'Viajero', text: 'La pieza la tiene un dragón. Con un rey vikingo encima. Obviamente.' }
    ],
    bossIntro: [
      { who: 'Rey Vikingo', spr: 'vikingo', color: '#ffcd75', text: '¡Tiembla, forastero! ¡Soy el rey de los mares y monto un dragón!' },
      { who: 'Viajero', text: '¿Y el dragón qué opina?' },
      { who: 'Rey Vikingo', spr: 'vikingo', color: '#ffcd75', text: 'No le pregunté. ¡No empecemos con eso que después me pide vacaciones!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El dragón renunció en pleno vuelo. El rey bajó solo. Rápido.' },
      { who: 'Viajero', text: 'Los campesinos se quedaron con el tesoro. Primer aguinaldo de la historia.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      k: { enemy: 'caballero' }, a: { enemy: 'ballestero' }, v: { enemy: 'vikingo' }, r: { enemy: 'rata' }, q: { enemy: 'murcielago' }, K: { enemy: 'recaudador' },
      N: { npc: 'campesina' }, G: { npc: 'bufon' }, S: { npc: 'campesina2' }, E: { weapon: 'espada' }, W: { weapon: 'ballesta' }, R: { weapon: 'rifle', rift: true },
      '1': { decor: 'estandarte' }, '2': { decor: 'huesos' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    1    N     E    r     1',
        '#*',
        '#*'
      ],
      [
        '        q             c',
        '      ==        ===',
        '   k       r        a    v   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   v    BBBBBBBBBBBBBBB   k   2',
        '#*',
        '#*'
      ],
      [
        '          q          c',
        '                    ===',
        '       ===     W',
        '   F   k     r  ^^^   v   a   G',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  k        q                  h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '                 c',
        '         K',
        '   BB  BBBBB   BBBBB     q',
        '   BB  BBBBB a BBBBB  v  r   1',
        '#*',
        '#*'
      ],
      [
        '      q        c       c',
        '       ===    ===     ===',
        '  k    v    ^^    a    k   S   2',
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
