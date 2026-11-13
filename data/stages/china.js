// ETAPA A1 — CHINA IMPERIAL (rama Asia). Sátira del emperador obsesionado con la inmortalidad y de su burocracia;
// los obreros de la Muralla y los monjes son aliados. Los enemigos son estatuas, funcionarios y alquimistas chantas.
CV.stage({
  id: 'china', tech: 2,
  title: 'CHINA IMPERIAL', subtitle: '210 a.C. Una muralla, un emperador y cero ganas de morirse.',
  bg: {
    sky: ['#f0a070', '#f6c890', '#fbe6b8', '#fff6dc'],
    layers: [
      { gen: 'sun', x: 300, y: 46, r: 16, color: '#e03c32', color2: '#ef7d57', speed: .01 },
      { gen: 'clouds', n: 6, y: 20, h: 50, color: '#fff6dc', speed: .04, drift: 3 },
      { gen: 'hills', base: 176, amp: 34, color: '#9ab89a', top: '#b4d0ac', f1: 1, f2: 4, speed: .1 },
      { gen: 'pagodas', n: 3, base: 185, th: 10, color: '#7a3a34', roof: '#3a2a2a', ground: '#6a8a5a', speed: .28 }
    ]
  },
  tiles: {
    '#': { pattern: 'stone', base: '#8a8478', dark: '#5a564c', light: '#aaa498', top: '#6a8a5a', topLight: '#8aaa6a', topDark: '#4a6a3a', topH: 2 },
    'B': { pattern: 'brick', base: '#9a9080', dark: '#5a5448', light: '#bab0a0' },
    '=': { base: '#b13e53', dark: '#7e2553', light: '#ef7d57' },
    '^': { base: '#c2c3c7', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 104, drums: 'k...s...k.k.s...',
    tracks: [
      { wave: 'square', vol: .05, notes: 'a4 _ c5 d5 _ e5 _ g5 e5 _ d5 c5 _ a4 _ _ g4 _ a4 c5 _ d5 _ e5 d5 _ c5 a4 _ g4 a4 _' },
      { wave: 'triangle', vol: .13, notes: 'a2 _ e2 _ a2 _ e2 _ d2 _ a2 _ d2 _ e2 _ a2 _ e2 _ g2 _ d2 _ a2 _ e2 _ a2 _ _ _' }
    ]
  },
  ambient: { col: ['#ff77a8', '#ffffff'], rate: .35, vy: 22, vx: -14, life: 5 },
  items: {
    dumpling: { name: 'Dumpling', heal: 2, spr: 'i_dumpling' },
    te: { name: 'Té verde', heal: 3, spr: 'i_te' }
  },
  heals: ['dumpling', 'te'],
  collectible: { name: 'Edicto de bambú', spr: 'c_papiro' },

  sprites: {
    terracota: {
      rows: [
        '................',
        '......hh',
        '.....llll',
        '....llllll',
        '....l0ll0l',
        '....llllll',
        '.....llll',
        '...gggggggg',
        '..gglglglggg',
        '..l.gggggg.l',
        '..l.glglgl.l',
        '....gggggg',
        '....ll..ll',
        '....ll..ll',
        '....ll..ll',
        '...hhh..hhh'
      ],
      anim: { walk: [{ 13: '...ll....ll', 14: '...ll....ll', 15: '..hhh....hhh' }, {}] }
    },
    ballesteroTerra: { from: 'terracota', swap: { g: 'e', l: 'd', h: 'f' } },
    generalTerra: { from: 'terracota', swap: { g: '2', h: '4' } },
    // figura de túnica: base de funcionarios, alquimistas, monjes y comerciantes de toda la rama
    tunica: {
      rows: [
        '................',
        '.....0000',
        '....000000',
        '....jjjjjj',
        '....j0jj0j',
        '....jjjjjj',
        '.....jjjj',
        '...rrrrrrrr',
        '..rrr4rr4rrr',
        '..rjrrrrrrjr',
        '....rrrrrr',
        '....r4444r',
        '....rrrrrr',
        '...rrrrrrrr',
        '...rrrrrrrr',
        '...00....00'
      ],
      anim: { walk: [{ 15: '....00..00' }, {}] }
    },
    alquimista: { from: 'tunica', swap: { r: 't', '4': 'x' } },
    funcionario: { from: 'tunica', swap: { r: '9', '4': 'y' } },
    monje: { from: 'tunica', swap: { r: 'o', '4': '3' } },
    obrera: { from: 'tunica', swap: { r: 'g', '4': 'i' } },
    dragonPapel: {
      rows: [
        '................', '', '', '',
        '.rr.........r',
        'rr4r..rrr..rrr',
        'r0rrrrr4rrrr4rr',
        'rrrr4rrrrr4rr.r',
        '.yy..rr...rr',
        '.y',
        '', '', '', '', '', ''
      ],
      anim: { walk: [{ 6: 'r0rrr.r4rr.r4rr', 7: 'rrrr4rrrrrrrr.r', 8: '.yy.rr...rr' }, {}] }
    },
    emperadorDragon: {
      rows: [
        '................................', '', '', '',
        '..............yyy',
        '.............y4y4y',
        '..............jjj',
        '..............j0j0',
        '.............yyyyy',
        '............yy2y2yy',
        '...66.......yyyyyyy.......66',
        '..6666....666666666666...6666.rr',
        '.66..66..66x66x66x66x66.66..6666',
        '66....6666666666666666666....6w0',
        '6......66y66y66y66y66y66.....666',
        'r6.......6666666666666.......r6r',
        '.r........66......66..........r',
        '..........4........4',
        '', '', '', '', '', '', '', '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 10: '..66........yyyyyyy........66', 11: '.6666.....666666666666....6666rr', 16: 'r.........66......66.........r' }, {}],
        a: [{ 13: '66....6666666666666666666....6wr', 14: '6......66y66y66y66y66y66.....6oy', 15: 'r6.......6666666666666.......r6o' }]
      }
    },
    p_pildora: { rows: ['.xxxx.', 'xxwxxx', 'xwxxxx', 'xxxxxx', 'xxxxxx', '.xxxx.'] },
    i_dumpling: { rows: ['..........', '..........', '...cccc...', '..cpcpcpc.', '.cccccccc.', '.cccccccc.', '..cccccc..', '..........', '..........', '..........'] },
    i_te: { rows: ['...c......', '....c.....', '..........', '.666666...', '.6bbbb666.', '.666666.6.', '.666666.6.', '.66666666.', '..6666....', '..........'] }
  },

  enemies: {
    terracota: { sprite: 'terracota', ai: 'chase', hp: 5, speed: 20, chase: 44, jump: 210, sight: 100, barks: ['Dos mil años parado. Me duele todo.', 'Somos ocho mil. Y ninguno cobró.', '¡Por el Emperador! (no me queda otra, soy de barro)'] },
    ballesteroTerra: { sprite: 'ballesteroTerra', ai: 'ranged', hp: 4, speed: 16, sight: 150, cooldown: 2.5, proj: { speed: 210, w: 7, h: 2, col: '#c2c3c7' }, drop: { weapon: 'arco', chance: .4 }, barks: ['Me enterraron con el arma. Qué detalle.', 'Apunto mal: tengo ojos de arcilla.'] },
    alquimista: { sprite: 'alquimista', ai: 'ranged', hp: 4, speed: 16, sight: 130, cooldown: 2.9, proj: { speed: 115, grav: 300, spr: 'p_pildora', w: 6, h: 6 }, barks: ['¡Píldora de la inmortalidad! Contraindicación: la muerte.', 'Lleva mercurio. Es natural. Las piedras también.', 'Al Emperador le encanta. Cada día está más gris.'] },
    funcionario: { sprite: 'funcionario', ai: 'charger', hp: 5, speed: 20, charge: 130, tele: .9, rest: 1.2, sight: 110, animSpeed: 12, barks: ['¡Falta el sello! ¡Y el sello del sello!', '¡Examen imperial sorpresa!', 'Formulario para pasar. Se retira en la otra punta de la Muralla.'] },
    dragonPapel: { sprite: 'dragonPapel', ai: 'flyer', hp: 2, speed: 50, hover: 6, sight: 140, sightY: 100, animSpeed: 12 },
    generalTerra: { sprite: 'generalTerra', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 46, speed: 22, chase: 46, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'espada' }, barks: ['¡GENERAL DE TERRACOTA! ¡Frágil! ¡Este lado arriba!', '¡Formación! ¡La misma de hace dos mil años!'] }
  },

  npcs: {
    obrera: { sprite: 'obrera', gift: { heal: 'dumpling' }, lines: ['Llevo veinte años en la Muralla. El Emperador quiere que se vea desde la luna.', 'Nadie fue a la luna a fijarse. Igual, mejor no discutirle.'] },
    monje: { sprite: 'monje', gift: { heal: 'te' }, lines: ['El kung fu enseña paciencia. La burocracia imperial, también.', 'Los funcionarios embisten derecho: saltalos. Los alquimistas tiran en arco: acercate.'] },
    monje2: { sprite: 'monje', gift: { ammo: true }, lines: ['El Emperador vuela en su dragón buscando la vida eterna.', 'Cuando se pone a brindar con mercurio, queda mareado: ahí pegale.'] }
  },

  boss: {
    name: 'EL PRIMER EMPERADOR Y SU DRAGÓN', mul: { melee: 1.6, ranged: 0.9 }, sprite: 'emperadorDragon', scale: 2, w: 54, h: 28, hp: 125, mode: 'hover', rest: 1.1, slow: 1.7,
    anchors: [[.76, .2], [.24, .2], [.5, .16], [.64, .3], [.36, .3]],
    attacks: {
      aliento: { type: 'shoot', count: 5, every: .2, n: 1, speed: 170, sfx: 'shoot', proj: { col: '#ffa300', col2: '#ffe14a', w: 6, h: 4 } },
      pildoras: { type: 'rain', count: 9, every: .24, speed: 160, proj: { spr: 'p_pildora', w: 6, h: 6 } },
      coletazo: { type: 'lines', kinds: ['diag', 'floor'], n: 4, every: .38, warn: .85, live: .45, col: '#38b764', thick: 6 },
      decreto: { type: 'lines', kinds: ['beam', 'high'], n: 4, every: .4, warn: .85, live: .5, col: '#ffe14a', thick: 5 },
      ejercito: { type: 'summon', ids: ['terracota', 'ballesteroTerra'], n: 2, max: 3 },
      brindis: { type: 'taunt', dur: 2.7, say: ['¡Un brindis por mi vida eterna! (glup) ...qué gustito a termómetro.', 'Unifiqué los pesos, las medidas y las opiniones. Sobre todo las opiniones.', 'Quemé todos los libros. Menos los míos. Son tres y son buenísimos.', 'Mi tumba tiene ocho mil soldados. Por si en el más allá hay cola.'] },
      pirotecnia: { type: 'radial', count: 3, n: 10, speed: 100, proj: { col: '#ff77a8', col2: '#ffffff', w: 4, h: 4 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['aliento', 'brindis', 'pildoras', 'decreto'] },
      { until: .33, speed: 1.15, say: '¡Guardias! ¡Los de barro también!', pattern: ['coletazo', 'aliento', 'ejercito', 'brindis', 'pirotecnia', 'pildoras'] },
      { speed: 1.3, say: '¡¡DECRETO QUE NO ME PODÉS GANAR!! ¡¡Está sellado!!', pattern: ['pirotecnia', 'coletazo', 'pildoras', 'brindis', 'decreto', 'aliento', 'ejercito'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'China, 210 a.C. Hay una muralla larguísima y un emperador que no se quiere morir.' },
      { who: 'Viajero', text: 'Le venden píldoras de mercurio "para la inmortalidad". Negocio redondo: nadie vuelve a reclamar.' },
      { who: 'Viajero', text: 'La pieza de la máquina la tiene él. Cree que es un amuleto. Técnicamente funciona mejor que el mercurio.' }
    ],
    bossIntro: [
      { who: 'Emperador', spr: 'funcionario', color: '#ffe14a', text: '¡Arrodillate ante el Primer Emperador! ¡El primero y el último, porque pienso durar!' },
      { who: 'Viajero', text: 'Vengo del futuro. Te cuento el final: no durás. Pero la Muralla queda linda.' },
      { who: 'Emperador', spr: 'funcionario', color: '#ffe14a', text: '¡¿Y SE VE DESDE LA LUNA?! ...¡No me contestes! ¡DRAGÓN!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El dragón renunció y se fue a trabajar a los desfiles de año nuevo. Mejor ambiente.' },
      { who: 'Viajero', text: 'Los obreros se tomaron el primer franco en veinte años. Y la Muralla no se ve desde la luna. No le digan.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      t: { enemy: 'terracota' }, b: { enemy: 'ballesteroTerra' }, a: { enemy: 'alquimista' }, f: { enemy: 'funcionario' }, d: { enemy: 'dragonPapel' }, K: { enemy: 'generalTerra' },
      N: { npc: 'obrera' }, G: { npc: 'monje' }, S: { npc: 'monje2' }, W: { weapon: 'arco' }, A: { weapon: 'espada' }, R: { weapon: 'mosquete', rift: true },
      '1': { decor: 'vasija' }, '2': { decor: 'estandarte' }
    },
    segments: [
      [
        '                c',
        '              ====',
        '  P    N    1     W    t     2',
        '#*',
        '#*'
      ],
      [
        '              c',
        '            BBBBB',
        '        BBBBBBBBBBBBB    d',
        '   t    BBBBBBBBBBBBB  f   b  h',
        '#*',
        '#*'
      ],
      [
        '        d             c',
        '      ==        ===          d',
        '   t       b        a    t G',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '                     c',
        '           d    b   ===',
        '       ===    ===',
        '   F   f   ^^ t  ^^^   t   a   A',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '                  b       d',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB f BBBBB  t  a   1',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  b     d      a       d      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '      d        c       c',
        '       ===    ===     ===',
        '  t    f    ^^    K    b a S   2',
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
