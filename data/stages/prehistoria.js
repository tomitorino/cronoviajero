// ETAPA 1 — PREHISTORIA (tronco común). Este archivo sirve de plantilla comentada para crear etapas nuevas.
CV.stage({
  id: 'prehistoria',            // debe coincidir con el id en data/timeline.js
  tech: 0,                      // nivel tecnológico de la época (las armas con más 'tech' generan paradoja)
  title: 'PREHISTORIA', subtitle: 'Hace muchísimo. Un martes.',

  // --- fondo: cielo en degradé + capas parallax generadas (ver generadores en js/world.js) ---
  bg: {
    sky: ['#3b2a5c', '#b84a62', '#f08a5d', '#f7c873'],
    layers: [
      { gen: 'sun', x: 300, y: 70, r: 24, color: '#ffe9a8', color2: '#fff6d0', speed: .01 },
      { gen: 'clouds', n: 5, y: 20, h: 40, color: '#f7a58a', speed: .03, drift: 2 },
      { gen: 'volcano', x: 150, base: 176, h: 96, w: 170, color: '#5b2a52', lava: '#ff7a3d', smoke: '#8a5a7a', speed: .06 },
      { gen: 'mountains', base: 182, amp: 58, color: '#7a3b5c', n: 8, speed: .14 },
      { gen: 'hills', base: 196, amp: 36, color: '#3e5d3a', top: '#55793f', speed: .32 },
      { gen: 'trees', kind: 'palm', n: 9, base: 204, h: 46, color: '#27402a', color2: '#1f3020', ground: '#27402a', speed: .55 }
    ]
  },
  // --- recetas de tiles: pattern = dirt | brick | stone | metal | wood | pave ---
  tiles: {
    '#': { pattern: 'dirt', base: '#7a4a2e', dark: '#5c3520', light: '#96633c', top: '#4f9a3a', topLight: '#86d45a', topDark: '#2f6a2a' },
    'B': { pattern: 'stone', base: '#7d7a85', dark: '#55525e', light: '#a19eaa' },
    '=': { base: '#c9b58a', dark: '#8a7550', light: '#efe2b8' },
    '^': { base: '#e8e0c8', dark: '#8a7550', light: '#ffffff' }
  },
  music: {
    bpm: 112, drums: 'k.hkk.h.k.hkk.sh',
    tracks: [
      { wave: 'square', vol: .05, notes: 'e4 _ g4 a4 _ g4 e4 _ d4 _ e4 _ - - - - e4 _ g4 a4 _ b4 a4 _ g4 _ e4 _ - - - - b4 _ b4 a4 _ g4 a4 _ b4 _ d5 _ b4 _ _ _ a4 _ a4 g4 _ e4 g4 _ e4 _ d4 _ e4 _ _ _' },
      { wave: 'triangle', vol: .14, notes: 'e2 _ _ e2 _ _ e2 _ e2 _ _ e2 _ _ d2 _' }
    ]
  },
  ambient: { col: ['#ff7a3d', '#ffcd75'], rate: .1, vy: -16, life: 6 },   // partículas de ambiente
  heals: ['carne'],             // ítems de curación de la región (definidos en data/common.js o en 'items' de la etapa)
  collectible: { name: 'Fósil', spr: 'c_fosil' },

  sprites: {
    cavernicola: {
      rows: [
        '......0000......',
        '.....000000.....',
        '....00kkkk0.....',
        '....0k0kk0k..gg.',
        '....0kkkkkk.ggg.',
        '.....k0000..gg..',
        '....00kkkk0.g...',
        '...iiiiiiiikg...',
        '..kiiioiiii.....',
        '..k.iiiioii.....',
        '....iioiiii.....',
        '....iiiiiii.....',
        '.....kk.kk......',
        '.....kk.kk......',
        '.....kk.kk......',
        '....kkk.kkk.....'
      ],
      anim: { walk: [{ 13: '....kk...kk.....', 14: '...kk.....kk....', 15: '..kkk.....kkk...' }, {}] }
    },
    hondero: { from: 'cavernicola', swap: { i: 'l', o: 'h', g: 'd' } },
    raptor: {
      rows: [
        '................',
        '................',
        '..........3333..',
        '.........333y33.',
        '.........3333333',
        '.........333ccc.',
        '........3333....',
        '3......33333....',
        '33....3333334...',
        '.33..33333344...',
        '..3333333334.3..',
        '...33333333.....',
        '....333.333.....',
        '....33...33.....',
        '....3....3......',
        '...33...33......'
      ],
      anim: { walk: [{ 13: '...33.....33....', 14: '..33.......3....', 15: '..3........33...' }, {}] }
    },
    raptorAlfa: { from: 'raptor', swap: { '3': 'r', '4': 'y' } },
    mosquito: {
      rows: [
        '................',
        '................',
        '....cc....cc....',
        '...cvvc..cvvc...',
        '....cvvccvvc....',
        '.....cv00vc.....',
        '......0000..rr..',
        '.00000000000r...',
        '......0000......',
        '.....0.00.0.....',
        '....0..00..0....',
        '...0...00...0...',
        '................',
        '................',
        '................',
        '................'
      ],
      anim: { walk: [{ 2: '................', 3: '................', 4: '..ccvvcccvvcc...' }, {}] }
    },
    trex: {
      rows: [
        '................................',
        '.................qqqqqqqqqq.....',
        '...............qq6666666666qq...',
        '..............q666660066666666q.',
        '..............q6666yy06666666666',
        '..............q6666yy0666666606q',
        '..............q66666666666666666',
        '..............q666666c6c6c6c6c6.',
        '..............q66666.c.c.c.c.c..',
        '..............q6666x............',
        '..............q6666xc.c.c.c.....',
        '.............qq66666666666666...',
        '............q6666666qqqqqqqq....',
        '...........q666666666...........',
        'q.........q6666666666x..........',
        'qq.......q66666666666xx66.......',
        '.qq.....q666666666666xx.6c......',
        '.q6q...q6666666666666xxx........',
        '..q6qqq66666666666666xxx........',
        '...q6666666666666666xxxx........',
        '....qq66666666666666xxx.........',
        '......qq66666666666xxx..........',
        '........q666666666666...........',
        '........q66666q.q66666..........',
        '........q6666q...q6666..........',
        '........q6666q...q6666..........',
        '.........q666q....q666..........',
        '.........q666q....q666..........',
        '.........q66q.....q66q..........',
        '........q666q....q666q..........',
        '.......c6c6c6q..c6c6c6q.........',
        '................................'
      ],
      anim: {
        a: [{ 8: '..............q66666............', 10: '..............q6666xc.c.c.c.c...' }],
        walk: [{ 28: '.........q66q....q666q..........', 29: '.........q66q...q666q...........', 30: '........c6c6q..c6c6c6q..........' }, {}]
      }
    },
    helecho: { rows: ['................', '................', '................', '................', '................', '................', '......6.........', '..6...66...6....', '...6..q6..6.....', '...66.q6.66..6..', '.6..6qq6q6..6...', '..6.66q666.66...', '...666q6666.....', '....66q666......', '.....6q66.......', '......qq........'] },
    huesos: { rows: ['................', '................', '................', '................', '................', '................', '................', '................', '................', '...c....c....c..', '..c.c..c.c..c.c.', '..c..cc...cc..c.', '..c...........c.', '.cc..c..c..c..cc', '..cccccccccccc..', '................'] },
    p_roca: { rows: ['..eeee..', '.edddde.', 'eddddfde', 'edddddde', 'edfdddde', 'eddddfde', '.edddde.', '..eeee..'] },
    c_fosil: { rows: ['..........', '...dddd...', '..d....d..', '.d..dd..d.', '.d.d..d.d.', '.d.d.dd.d.', '.d..d...d.', '..d...dd..', '...ddd....', '..........'] }
  },

  // --- enemigos. ai = patrol | chase | ranged | flyer | kamikaze | charger ---
  enemies: {
    cavernicola: { sprite: 'cavernicola', ai: 'chase', hp: 4, speed: 28, chase: 58, sight: 90, barks: ['¡UGA!', '¿FUEGO?', '¡UGA BUGA!'] },
    hondero: { sprite: 'hondero', ai: 'chase', chase: 40, jump: 200, hp: 3, speed: 22, sight: 130, cooldown: 2.2, proj: { speed: 130, grav: 300, w: 4, h: 4, col: '#94b0c2' }, drop: { weapon: 'honda', chance: .7 }, barks: ['¡PIEDRA!'] },
    raptor: { sprite: 'raptor', ai: 'chase', gun: false, hp: 3, speed: 45, chase: 76, jump: 240, sight: 115, animSpeed: 12 },
    mosquito: { sprite: 'mosquito', ai: 'flyer', gun: false, hp: 2, speed: 52, hover: 4, sight: 130, sightY: 90, animSpeed: 20 },
    raptorAlfa: { sprite: 'raptorAlfa', ai: 'chase', gun: false, mini: true, heavy: true, scale: 2, w: 24, h: 26, hp: 30, speed: 40, chase: 66, jump: 260, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'honda' } }
  },

  // --- jefe: fases por % de vida; cada fase recorre su 'pattern' de ataques ---
  npcs: {
    profe1: { sprite: 'profe', chain: true, dialog: [
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: '¡Vos! ¡El que compró mi máquina! Soy el Dr. Cronos, inventor. No acepto devoluciones.' },
      { who: 'Viajero', text: '¿Por qué no se mueve nada? Ese raptor quedó congelado en el aire.' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Pausé el tiempo para explicarte un par de cosas. La máquina la armé yo. La cuarta pared, también.' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Te movés con las flechas o A/D. Saltás con Espacio, y en el aire podés saltar OTRA vez. Lo inventé cayéndome de un volcán.' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Pegás con X y rodás con C. Mientras rodás no te pegan.' },
      { who: 'Viajero', text: '¿Y si me caigo a un pozo?' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Te morís. Volvés a la última bandera y los bichos que dejaste vivos se recuperan. No lo diseñé yo. Bueno, sí.' }
    ] },
    profe2: { sprite: 'profe', chain: true, dialog: [
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Pausa técnica. ¿Agarraste la lanza de allá atrás? Con Q y E cambiás de arma: Q la anterior, E la siguiente.' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Con I abrís el inventario. Ahí gastás reliquias en mejorar las armas: más daño, más alcance, más balas.' },
      { who: 'Viajero', text: '¿Y las reliquias de dónde salen?' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Están tiradas por toda la Historia. Yo les digo "reliquias". Los museos les dicen "robo".' }
    ] },
    profe3: { sprite: 'profe', chain: true, dialog: [
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Paro el tiempo otra vez, que esto es importante. Y porque más adelante hay un raptor del tamaño de un colectivo.' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Vas a encontrar grietas con armas de OTRAS épocas. Pegan muchísimo más que las de acá.' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Pero usarlas llena la barra de PARADOJA. Si se llena, la Historia se enoja y aparecen cosas que no deberían estar.' },
      { who: 'Viajero', text: '¿Y me las puedo quedar?' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'No. Al cruzar el portal desaparecen: cada arma vuelve a su época. Política de la empresa. La empresa soy yo.' },
      { who: 'Dr. Cronos', spr: 'profe', color: '#73eff7', text: 'Lo último: cuando la barra de un jefe se pone AMARILLA está distraído y recibe el doble. Ya está. Despauso. Corré.' }
    ] }
  },

  boss: {
    name: 'T-REX', mul: { ranged: 1.3 }, sprite: 'trex', scale: 2, w: 44, h: 46, hp: 90, walk: 22, rest: 1,
    attacks: {
      embestida: { type: 'charge', speed: 175, tele: .8, rest: 1.3 },
      rocas: { type: 'rain', count: 6, every: .3, speed: 185, proj: { spr: 'p_roca', w: 8, h: 8, spin: true } },
      abrazo: { type: 'taunt', dur: 2.3, say: ['¡NO... LLEGO!', '(Intenta aplaudir. No puede.)', '¿UN ABRAZO? ...GRRR.', '(Quiere rascarse la nariz. Imposible.)'] },
      crias: { type: 'summon', ids: ['raptor'], n: 2, max: 3 },
      pisoton: { type: 'jump', power: 340 }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['embestida', 'abrazo', 'rocas', 'embestida', 'pisoton'] },
      { until: .33, speed: 1.2, say: '¡GRROOAAR! (Traducción: ahora sí me enojé)', pattern: ['embestida', 'crias', 'pisoton', 'abrazo', 'rocas'] },
      { speed: 1.45, say: '¡¡BRACITOS DE FURIA!!', pattern: ['embestida', 'pisoton', 'rocas', 'embestida', 'abrazo', 'crias'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: '¡Crac! La máquina del tiempo hizo ruido a tostadora y se desarmó en pleno salto.' },
      { who: 'Viajero', text: 'Las piezas quedaron desparramadas por toda la Historia. Típico. Y la garantía venció en el Pleistoceno.' },
      { who: 'Viajero', text: 'Primera parada: la Prehistoria. Sin wifi, pero con garrote.' }
    ],
    bossIntro: [
      { who: 'T-Rex', spr: 'trex', color: '#a7f070', text: '¡¡GRROOOAAAR!!' },
      { who: 'Viajero', text: 'Tranquilo, grandote. ¿Querés un abrazo?' },
      { who: 'T-Rex', spr: 'trex', color: '#a7f070', text: '(Mira sus bracitos. Mira al viajero. Se ofende muchísimo.)' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El T-Rex se va ofendido, intentando taparse la cara. No llega.' },
      { who: 'Viajero', text: '¡Y dejó un portal! La Historia sigue... y se bifurca. Qué desprolijo.' }
    ]
  },

  // --- nivel: tilemap de texto en segmentos que se unen de izquierda a derecha ---
  // Leyenda base: # piso  B bloque  = plataforma atravesable  ^ pinches  P jugador  c coleccionable  h curación
  //               m munición  F punto de control  [ inicio de la arena del jefe  X jefe  O portal
  // Una fila que termina en * repite su último caracter hasta el ancho del segmento.
  level: {
    height: 14,
    legend: {
      a: { enemy: 'cavernicola' }, s: { enemy: 'hondero' }, r: { enemy: 'raptor' }, q: { enemy: 'mosquito' }, R: { enemy: 'raptorAlfa' },
      T: { npc: 'profe1' }, V: { npc: 'profe2' }, Y: { npc: 'profe3' },
      L: { weapon: 'lanza' }, M: { weapon: 'mosquete', rift: true },
      '1': { decor: 'helecho' }, '2': { decor: 'huesos' }
    },
    segments: [
      [
        '            c',
        '           ===        L',
        '  P  T  1        a   ###  2',
        '#*',
        '#*'
      ],
      [
        '                c',
        '        ==     ===',
        ' V r     1           r    h',
        '######   ####   #*',
        '######   ####   #*'
      ],
      [
        '           q            q',
        '',
        '               s',
        '        c    #####      c',
        '       ###   #####     ###',
        '  a      2   #####  ^^  Y   a',
        '#*',
        '#*'
      ],
      [
        '   c                    M',
        '        R              ###',
        '  ##################',
        '                     ==      q',
        '                 ==',
        '             ==',
        '   F     r    1   a',
        '#*',
        '#*'
      ],
      [
        '              c',
        '             ===       q',
        '        ==         ==',
        '  a  s        r         h   a',
        '#######    ######   #####   #*',
        '#######    ######   #####   #*'
      ],
      [
        '                    c',
        '      q            ===',
        '            ===',
        '   1  a         r        2   s',
        '#########   ########   ########',
        '#########   ########   ########'
      ],
      [
        'BBBBBBBBBBBBBBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBBBBBBBBBBBBBB',
        '',
        '          c',
        '   BB         BB      h',
        '   BB    r    BB   a      r',
        '#*',
        '#*'
      ],
      [
        '         q         q',
        '              c',
        '    ==      =====      ==',
        '  s      ^^    a    ^^      1',
        '#*',
        '#*'
      ],
      [
        '              ====          ====',
        '',
        '',
        '  h  F  [              O           X    ',
        '#*',
        '#*'
      ]
    ]
  }
});
