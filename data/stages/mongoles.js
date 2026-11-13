// ETAPA A2 — MONGOLES Y JAPÓN FEUDAL (rama Asia). Sátira del conquistador que no sabe parar y de los señores feudales;
// los pastores de la estepa y los monjes son aliados.
CV.stage({
  id: 'mongoles', tech: 4,
  title: 'MONGOLES Y JAPÓN FEUDAL', subtitle: '1220. El imperio más grande del mundo, administrado a caballo.',
  bg: {
    sky: ['#3a78c8', '#7ab4e8', '#c4e2f4', '#f4f0d8'],
    layers: [
      { gen: 'sun', x: 70, y: 38, r: 13, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 7, y: 14, h: 46, color: '#ffffff', speed: .05, drift: 4 },
      { gen: 'hills', base: 172, amp: 30, color: '#b8c890', top: '#d0dca0', f1: 1, f2: 3, speed: .1 },
      { gen: 'hills', base: 192, amp: 16, color: '#94ac68', top: '#a8c078', f1: 2, f2: 5, speed: .24 },
      { gen: 'pagodas', n: 2, base: 185, th: 10, color: '#5a3a34', roof: '#2a2a3a', ground: '#7a9450', speed: .42 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#8a7448', dark: '#5a4a2c', light: '#a89060', top: '#8fb050', topLight: '#b0d068', topDark: '#5a7a34', topH: 3 },
    'B': { pattern: 'wood', base: '#7a5a3a', dark: '#4a3420', light: '#9a7a52' },
    '=': { base: '#8b5a2b', dark: '#5a3a1a', light: '#c68642' },
    '^': { base: '#c2c3c7', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 132, drums: 'k.k.s.k.k.k.s.kk',
    tracks: [
      { wave: 'square', vol: .05, notes: 'd4 d4 f4 g4 _ a4 g4 f4 d4 _ c4 d4 _ _ a3 _ d4 d4 f4 g4 _ a4 c5 a4 g4 _ f4 g4 _ d4 _ _' },
      { wave: 'triangle', vol: .13, notes: 'd2 d2 _ d2 a1 _ d2 _ c2 c2 _ c2 g1 _ a1 _ d2 d2 _ d2 a1 _ f2 _ g2 g2 _ a1 d2 _ _ _' }
    ]
  },
  ambient: { col: ['#d0dca0', '#ffffff'], rate: .3, vy: 10, vx: -60, life: 3 },
  heals: ['dumpling', 'te'],
  collectible: { name: 'Tributo para el Kan', spr: 'c_denario' },

  sprites: {
    arqueroKan: {
      rows: [
        '................',
        '.....gggggg',
        '....gggggggg',
        '....gjjjjjjg',
        '.....j0jj0j',
        '.....jj00jj',
        '......jjjj',
        '...99999999',
        '..9994994999..h',
        '..j.999999.jhh',
        '....gggggg..h',
        '....999999',
        '....99..99',
        '....99..99',
        '....hh..hh',
        '...hhh..hhh'
      ],
      anim: { walk: [{ 13: '...99....99', 14: '...hh....hh', 15: '..hhh....hhh' }, {}] }
    },
    pastora: { from: 'arqueroKan', swap: { '9': '6', '4': 'c' } },
    jinete: {
      rows: [
        '................',
        '......gggg',
        '.....gjjjjg',
        '......j0j0',
        '......jjjj',
        '.....2222',
        '....222222',
        '....j2222j..ii',
        '..hiiiiiiiiiiii',
        '.hhiiiiiiiiii0i',
        '.h.iiiiiiiiiiii',
        '...iiiiiiiiii',
        '...ii.ii.ii.ii',
        '...ii.ii.ii.ii',
        '...00.00.00.00',
        ''
      ],
      anim: { walk: [{ 12: '..ii.ii...ii.ii', 13: '.ii..ii...ii..ii', 14: '.00..00...00..00' }, {}] }
    },
    samurai: {
      rows: [
        '................',
        '...y......y',
        '....y0000y',
        '....000000',
        '...00jjjj00',
        '....j0jj0j',
        '.....jjjj',
        '...22222222...c',
        '..222y22y222.c',
        '..j2222222jjc',
        '....000000.h',
        '....222222',
        '....22..22',
        '....22..22',
        '....00..00',
        '...000..000'
      ],
      anim: { walk: [{ 12: '...22....22', 13: '...22....22', 14: '...00....00', 15: '..000....000' }, {}] }
    },
    daimyo: { from: 'samurai', swap: { '2': 't', y: 'o' } },
    ninja: {
      rows: [
        '................',
        '',
        '.....ffffff',
        '....ffffffff',
        '....fjjjjjjf',
        '....fj0jj0jf..rr',
        '....ffffffffrr',
        '.....ffffff',
        '...ffffffff',
        '..ff.ffff.ff..s',
        '..j..ffff..jss',
        '.....ffff',
        '....ff..ff',
        '....ff..ff',
        '....ff..ff',
        '...fff..fff'
      ],
      anim: { walk: [{ 12: '...ff....ff', 13: '..ff......ff', 14: '..ff......ff', 15: '.fff......fff' }, {}] }
    },
    granKan: {
      rows: [
        '................................', '', '', '', '', '',
        '.............hhhhhh',
        '............hhhhhhhh',
        '...........44hhhhhh44',
        '............jjjjjjjj',
        '............j0jjjj0j',
        '............jj0000jj',
        '............0jjjjjj0',
        '.............0j00j0',
        '.........rrrrrrrrrrrrrr',
        '........rrr4rrrrrrrr4rrr',
        '.......rrrr4rrrrrrrr4rrrr....s',
        '.......rrhh4444444444hhrr...s',
        '.......jj.rrrrrrrrrrrr.jjjjs',
        '.......jj.rrrr4444rrrr....s',
        '..........rrrrrrrrrrrr',
        '..........rrrrrrrrrrrr',
        '.........hhhhhhhhhhhhhh',
        '........gggggggggggggggggg',
        '.......gggggggggggggggggggg.gg',
        '......hgggggggggggggggggggggggg',
        '.....hh.ggggggggggggggggggg0gg',
        '.....h..gggggggggggggggggggggg',
        '........gggggggggggggggggggg',
        '........ggg..ggg....ggg..ggg',
        '........gg...gg.....gg...gg',
        '........00...00.....00...00'
      ],
      anim: {
        walk: [{ 29: '.......ggg..ggg......ggg..ggg', 30: '......gg...gg.........gg...gg', 31: '......00...00.........00...00' }, {}],
        a: [{ 16: '.......rrrr4rrrrrrrr4rrrr.....s', 17: '.......rrhh4444444444hhrrjjjjs', 18: '.......jj.rrrrrrrrrrrr......s', 12: '............0jj00jj0', 13: '.............0j00j0' }]
      }
    }
  },

  enemies: {
    arqueroKan: { sprite: 'arqueroKan', ai: 'ranged', hp: 5, speed: 18, sight: 150, cooldown: 2.4, proj: { speed: 150, grav: 240, w: 7, h: 2, col: '#c68642' }, drop: { weapon: 'arco', chance: .4 }, barks: ['Conquistamos tanto que ya no sé dónde vivo.', 'El Kan dice que falta poco. Lo dice desde 1206.', '¿Otra ciudad? Yo quería volver con mis ovejas.'] },
    jinete: { sprite: 'jinete', ai: 'charger', hp: 6, speed: 24, charge: 150, tele: .85, rest: 1.1, sight: 120, animSpeed: 14, barks: ['¡El poni es chico pero rinde!', '¡Yiiija! ¡Correo imperial! ¡Llega en dos años!'] },
    samurai: { sprite: 'samurai', ai: 'chase', hp: 8, speed: 22, chase: 50, jump: 220, sight: 110, drop: { weapon: 'espada', chance: .3 }, barks: ['El honor me impide retroceder. Y el contrato con mi señor.', 'Mi señor pelea por tierras. Yo, por arroz. Poco arroz.', '¡Un duelo! Primero me presento: son cuarenta minutos.'] },
    ninja: { sprite: 'ninja', ai: 'chase', hp: 4, speed: 34, chase: 78, jump: 270, sight: 130, barks: ['Nadie me vio. ¿Vos me viste? Decime que no.', 'Soy invisible. Es de día, pero la actitud cuenta.', '¡Bomba de humo! ...Se me mojó.'] },
    halcon: { sprite: 'paloma', ai: 'flyer', gun: false, hp: 2, speed: 56, hover: 6, sight: 150, sightY: 100, animSpeed: 14 },
    daimyo: { sprite: 'daimyo', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 60, speed: 24, chase: 50, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'ballesta' }, barks: ['¡Soy el señor de este valle! ¡Y del impuesto al valle!', '¡Mis samuráis mueren por mí! Yo no pienso devolver el favor.'] }
  },

  npcs: {
    pastora: { sprite: 'pastora', gift: { heal: 'dumpling' }, lines: ['El Kan conquistó medio mundo. A mí me siguen faltando tres ovejas.', 'Los jinetes embisten en línea recta. Saltá y que sigan de largo.'] },
    monje: { sprite: 'monje', gift: { heal: 'te' }, lines: ['El Kan mandó dos flotas a invadir Japón. Las dos veces las hundió una tormenta.', 'Él dice que fue mala suerte. Nosotros le decimos "viento divino". El pronóstico no opinó.'] },
    pastora2: { sprite: 'pastora', gift: { ammo: true }, lines: ['El Gran Kan es enorme y el poni es chiquito. No preguntes cómo.', 'Cuando se pone a medir su imperio en el mapa, se distrae. Dale ahí.'] }
  },

  boss: {
    name: 'EL GRAN KAN Y SU PONI', mul: { melee: 0.8, ranged: 1.3 }, sprite: 'granKan', scale: 2, w: 42, h: 52, hp: 140, walk: 18, rest: 1,
    attacks: {
      estampida: { type: 'charge', speed: 210, tele: .8 },
      flechas: { type: 'shoot', aim: 'arc', count: 5, every: .35, n: 1, sfx: 'shoot', proj: { col: '#c68642', col2: '#f4f4f4', w: 8, h: 3, grav: 280, life: 5 } },
      horda: { type: 'lines', kinds: ['floor', 'high'], n: 4, every: .4, warn: .85, live: .5, col: '#c68642', thick: 6 },
      abanico: { type: 'shoot', count: 2, every: .8, n: 5, spread: .5, speed: 150, sfx: 'shoot', proj: { col: '#f4f4f4', col2: '#c2c3c7', w: 6, h: 2 } },
      jinetes: { type: 'summon', ids: ['jinete', 'arqueroKan', 'ninja'], n: 2, max: 3 },
      mapa: { type: 'taunt', dur: 2.8, say: ['A ver el mapa... esto es mío, esto también... ¿esto qué es? Mío.', 'Conquisté el mundo conocido. El desconocido lo dejo para el lunes.', 'Mi imperio es tan grande que no llegué a visitarlo. Mando saludos.', '¿Parar? Una vez paré. Me aburrí. Conquisté el lugar donde paré.'] },
      salto: { type: 'jump', power: 330 },
      lluvia: { type: 'rain', count: 9, every: .22, speed: 180, proj: { col: '#c68642', col2: '#f4f4f4', w: 3, h: 8 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['flechas', 'mapa', 'horda', 'estampida'] },
      { until: .33, speed: 1.15, say: '¡Que venga la horda! ¡La que esté más cerca!', pattern: ['lluvia', 'abanico', 'jinetes', 'mapa', 'salto', 'horda'] },
      { speed: 1.3, say: '¡¡EL PONI Y YO NUNCA PERDIMOS!! ¡¡El poni, al menos!!', pattern: ['abanico', 'estampida', 'lluvia', 'mapa', 'flechas', 'salto', 'jinetes'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Año 1220. De un lado la estepa, del otro castillos con techos curvos. En el medio, yo.' },
      { who: 'Viajero', text: 'El Gran Kan tiene el imperio más grande de la historia y sigue queriendo "un poquito más".' },
      { who: 'Viajero', text: 'Los samuráis juran lealtad eterna a su señor. El señor jura cobrarles el arroz.' }
    ],
    bossIntro: [
      { who: 'Gran Kan', spr: 'arqueroKan', color: '#e03c32', text: '¡Soy el Kan de Kanes! ¡Señor de todo lo que ves!' },
      { who: 'Viajero', text: 'Veo un poni pidiendo ayuda con la mirada.' },
      { who: 'Gran Kan', spr: 'arqueroKan', color: '#e03c32', text: '¡Es de raza resistente! ¡¡ARRE, TROTAMUNDOS!! ...(dale, que nos miran).' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El poni se sacó al Kan de encima y se fue trotando. Primera vez que lo veo sonreír a un caballo.' },
      { who: 'Viajero', text: 'El imperio se dividió entre los nietos. Se pelearon por el mapa. Era de esperar.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      a: { enemy: 'arqueroKan' }, j: { enemy: 'jinete' }, s: { enemy: 'samurai' }, n: { enemy: 'ninja' }, q: { enemy: 'halcon' }, K: { enemy: 'daimyo' },
      N: { npc: 'pastora' }, G: { npc: 'monje' }, S: { npc: 'pastora2' }, W: { weapon: 'arco' }, A: { weapon: 'ballesta' }, R: { weapon: 'rifle', rift: true },
      '1': { decor: 'huesos' }, '2': { decor: 'estandarte' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    N    1     W    j     2',
        '#*',
        '#*'
      ],
      [
        '        q             c      q',
        '      ==        ===',
        '   a       j        a    j   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '          q          c',
        '               a    ===',
        '       ===    ===',
        '   F   j   ^^ a  ^^^   j   G   2',
        '#*',
        '#*'
      ],
      [
        '              c    n',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   s    BBBBBBBBBBBBBBB  s n   A',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  s     q      n       q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '      q        c       c',
        '       ===    ===     ===',
        '  s    a    ^^    n    j s     1',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '                  a      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB n BBBBB  K    S 2',
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
