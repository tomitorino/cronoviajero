// ETAPA L1 — IMPERIOS PRECOLOMBINOS (rama Latam).
// Los "guerreros jaguar" son guardianes de piedra animados del templo; las personas son aliadas (NPCs).
CV.stage({
  id: 'precolombino', tech: 3,
  title: 'IMPERIOS PRECOLOMBINOS', subtitle: '1450. El templo no acepta apurados.',
  bg: {
    sky: ['#1f6a7a', '#4fb0a0', '#bfe6c0', '#f4f0c0'],
    layers: [
      { gen: 'sun', x: 90, y: 50, r: 18, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 6, y: 20, h: 50, color: '#eafff0', speed: .04, drift: 3 },
      { gen: 'mountains', base: 170, amp: 80, color: '#5a8a8a', snow: '#eafff0', n: 7, speed: .08 },
      { gen: 'volcano', x: 300, base: 186, h: 84, w: 190, color: '#8a8a6a', lava: '#ffcd75', smoke: '#bfe6c0', speed: .16 },
      { gen: 'hills', base: 196, amp: 30, color: '#2f7a4a', top: '#4fa060', speed: .3 },
      { gen: 'trees', n: 9, base: 206, h: 44, color: '#1f5a36', color2: '#3a2a14', ground: '#1f5a36', speed: .5 }
    ]
  },
  tiles: {
    '#': { pattern: 'stone', base: '#a89a78', dark: '#7a6c50', light: '#c8ba98', top: '#4fa060', topLight: '#8fd45a', topDark: '#2f7a4a' },
    'B': { pattern: 'brick', base: '#8a8a6a', dark: '#5a5a44', light: '#b0b08a' },
    '=': { base: '#a8744a', dark: '#6a4428', light: '#d0a070' },
    '^': { base: '#c8ba98', dark: '#5a5a44', light: '#ffffff' }
  },
  music: {
    bpm: 104, drums: 'k..hk.h.k..hk.hh',
    tracks: [
      { wave: 'triangle', vol: .12, notes: 'e5 _ g5 _ a5 _ _ _ g5 _ e5 _ d5 _ e5 _ a4 _ c5 _ d5 _ e5 _ d5 _ c5 _ a4 _ _ _' },
      { wave: 'square', vol: .035, notes: 'a2 _ _ _ e3 _ _ _ a2 _ _ _ e3 _ a2 _ f2 _ _ _ c3 _ _ _ g2 _ _ _ d3 _ g2 _' }
    ]
  },
  ambient: { col: ['#a7f070', '#ffe14a'], rate: .08, vy: -8, vx: 6, life: 8 },
  heals: ['choclo', 'chocolate'],
  collectible: { name: 'Cacao', spr: 'c_cacao' },
  items: {
    choclo: { name: 'Choclo', heal: 2, spr: 'i_choclo' },
    chocolate: { name: 'Chocolate', heal: 3, spr: 'i_chocolate' }
  },

  sprites: {
    guardian: {
      rows: [
        '...dd.....dd....',
        '...ddddddddd....',
        '..ddd5ddd5ddd...',
        '..ddddddddddd...',
        '..dd0c0c0c0dd...',
        '...ddddddddd....',
        '....eeeeeee.....',
        '..ddeeeeeeedd...',
        '.dd.e4e4e4e.dd..',
        '.dd.eeeeeee.dd..',
        '.dd.e4e4e4e.dd..',
        '....eeeeeee.....',
        '....dd...dd.....',
        '....dd...dd.....',
        '....dd...dd.....',
        '...ddd...ddd....'
      ],
      anim: { walk: [{ 13: '...dd.....dd....', 14: '..dd.......dd...', 15: '.ddd.......ddd..' }, {}] }
    },
    llama: {
      rows: [
        '..........c.c...',
        '..........ccc...',
        '..........c0cc..',
        '..........cccm..',
        '..........cc....',
        '..........cc....',
        '..........cc....',
        '.ccccccccccc....',
        'cccccccccccc....',
        'cccpcccpcccc....',
        'cccccccccccc....',
        '.cccccccccc.....',
        '.cc.cc.cc.cc....',
        '.cc.cc.cc.cc....',
        '.cc.cc.cc.cc....',
        '.kk.kk.kk.kk....'
      ],
      anim: { walk: [{ 13: 'cc..cc..cc.cc...', 14: 'cc...cc.cc..cc..', 15: 'kk...kk.kk..kk..' }, {}] }
    },
    llamaAlfa: { from: 'llama', swap: { c: 'i', p: '4', k: 'h' } },
    serpiente: {
      rows: [
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '...........666..',
        '..........66y60.',
        '..........6666rr',
        '..66...666666...',
        '.6626662662.....',
        '666.6666........'
      ],
      anim: { walk: [{ 13: '...66..666666...', 14: '.66266626626....', 15: '.666.6666.......' }, {}] }
    },
    murcielago: { from: 'mosquito', swap: { c: '1', v: 't', r: 'y' } },
    sabia: {
      rows: [
        '....6.5.6.5.....',
        '....6565656.....',
        '.....44444......',
        '....lllllll.....',
        '....l0lll0l.....',
        '....lllllll.....',
        '.....lllll......',
        '....ccccccc.....',
        '...ccrcrcrcc....',
        '..lcccccccccl...',
        '..l.ccccccc.l...',
        '....crcrcrc.....',
        '....ccccccc.....',
        '....ll...ll.....',
        '....ll...ll.....',
        '...ggg...ggg....'
      ]
    },
    serpemplumada: {
      rows: [
        '................................',
        '.................r.5.r.5.r......',
        '................r656r656r6......',
        '................66666666666.....',
        '...............6666666666666....',
        '..............666666y0666666o...',
        '..............66666yy06666666oo.',
        '..............6666666666666666oo',
        '..............666666666666ccc.o.',
        '...............6666666rrrr......',
        '....5r5.........66666666cc......',
        '...5r5r5.........666666.........',
        '..5r5r5r56......66666...........',
        '..r5r5r5666...666666............',
        '...5r5r666666666666.............',
        '....r56666x6666666..............',
        '.....6666x6x6666................',
        '....6666x666x66.................',
        '...6666x6666....................',
        '...666x66.......................',
        '...66666........5r5.............',
        '...666666......5r5r5............',
        '....6666666...65r5r5r...........',
        '.....666x66666665r5r............',
        '......6666x6666666r.............',
        '........6666x6666...............',
        '..........666666................',
        '...........6666.....666.........',
        '............66666..66y66........',
        '.............66666666.66r.......',
        '...............6666.............',
        '................................'
      ],
      anim: { a: [{ 8: '..............6666666666......o.', 9: '...............66666rrrrrrrr....', 10: '....5r5.........6666rrrrccc.....' }] }
    },
    idolo: { rows: ['................', '................', '................', '................', '....dddddddd....', '...dddddddddd...', '...d00dddd00d...', '...dddd55dddd...', '...ddd5555ddd...', '...d00000000d...', '...dc0c0c0c0d...', '...dddddddddd...', '....dddddddd....', '...eeeeeeeeee...', '..eeeeeeeeeeee..', '..eeeeeeeeeeee..'] },
    i_choclo: { rows: ['....55....', '...5445...', '...4y45...', '..54y445..', '..5y4y45..', '..54y445..', '..5y4y45..', '...5445...', '....55....', '..........'] },
    i_chocolate: { rows: ['...c.c....', '....c.....', '.hhhhhhh..', '.huuuuuhhh', '.huuuuuh.h', '.huuuuuhhh', '.hhhhhhh..', '..hhhhh...', '..........', '..........'] },
    c_cacao: { rows: ['..........', '....gg....', '...giig...', '..giiiig..', '..gihiig..', '..giihig..', '..giiiig..', '...giig...', '....gg....', '..........'] }
  },

  enemies: {
    guardian: { sprite: 'guardian', ai: 'chase', hp: 6, speed: 20, chase: 42, sight: 90, barks: ['(Cruje.)', '(Te mira con ojos de jade.)', '...'] },
    llama: { sprite: 'llama', ai: 'ranged', hp: 5, speed: 20, sight: 120, cooldown: 2.6, proj: { col: '#b0e04a', col2: '#f4f4f4', w: 4, h: 4, speed: 120, grav: 300 }, barkChance: .8, barks: ['*PTUI*', '(Te mira con desprecio.)', '*Mastica con actitud.*'] },
    serpiente: { sprite: 'serpiente', ai: 'patrol', gun: false, hp: 3, w: 14, h: 6, speed: 46, animSpeed: 10 },
    murcielago: { sprite: 'murcielago', ai: 'flyer', gun: false, hp: 2, speed: 46, hover: 4, sight: 120, sightY: 90, animSpeed: 20 },
    llamaAlfa: { sprite: 'llamaAlfa', ai: 'ranged', gun: false, mini: true, heavy: true, scale: 2, w: 24, h: 28, hp: 40, speed: 16, sight: 170, sightY: 80, cooldown: 1.3, paradox: false, proj: { col: '#b0e04a', col2: '#f4f4f4', w: 6, h: 6, speed: 150, grav: 300 }, drop: { weapon: 'arco' }, barkChance: 1, barks: ['*PTUI DE CAMPEONATO*', '(Es la llama alfa. Se nota.)'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, gift: { ammo: true }, lines: ['Si te quedás sin balas contra un jefe, cada tanto cae una caja. Es mi servicio de posventa.', 'El único. No llames al 0800: es mi sobrino y no atiende.'] },
    sabia: { sprite: 'sabia', gift: { heal: 'choclo' }, lines: ['Bienvenido, viajero. Este templo pone a prueba a los apurados: mirá el piso antes de pisarlo.', 'Los guardianes son de piedra: lentos, pero tercos. Como mi suegro.'] },
    sabia2: { sprite: 'sabia', gift: { heal: 'chocolate' }, lines: ['La Serpiente no es mala, es exigente. Si superás su prueba, te deja pasar.', 'Tomá, chocolate. El original, sin azúcar. De nada.'] }
  },

  boss: {
    name: 'LA SERPIENTE EMPLUMADA', mul: { melee: 0.9, ranged: 1.3 }, sprite: 'serpemplumada', scale: 2, w: 44, h: 44, hp: 150, mode: 'hover', rest: 1,
    anchors: [[.72, .42], [.28, .42], [.5, .5], [.6, .32], [.4, .32]],
    attacks: {
      plumas: { type: 'radial', count: 2, n: 10, speed: 88, proj: { col: '#38b764', col2: '#a7f070', w: 6, h: 6 } },
      trampas: { type: 'lines', kinds: ['pillar'], n: 5, every: .35, warn: .9, live: .5, col: '#ffcd75', thick: 5, height: 60 },
      piedras: { type: 'rain', count: 6, every: .3, speed: 170, proj: { spr: 'p_roca', w: 8, h: 8, spin: true } },
      guardianes: { type: 'summon', ids: ['serpiente', 'murcielago'], n: 2, max: 3 },
      acertijo: { type: 'taunt', dur: 2.6, say: ['Respondé, viajero: ¿qué fue primero, el huevo o la paradoja?', 'Mmm... se me enredó la cola. Un momento.', 'Mil años cuidando este templo. ¿Sabés lo que es no tener feriados?', 'Estas plumas no se peinan solas.'] }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['plumas', 'acertijo', 'trampas', 'piedras'] },
      { until: .33, speed: 1.15, say: 'Bien. Pasaste la prueba fácil. Ahora la otra.', pattern: ['trampas', 'plumas', 'guardianes', 'acertijo', 'piedras'] },
      { speed: 1.3, say: '¡ÚLTIMA PRUEBA! (Esta no la pasó nadie. Sin presión.)', pattern: ['plumas', 'trampas', 'piedras', 'plumas', 'acertijo', 'guardianes'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Selva, montañas y un templo enorme. La pieza cayó adentro. Siempre adentro.' },
      { who: 'Viajero', text: 'Astrónomos, ingenieros, chocolate... Esta gente ya tenía todo resuelto. Yo vengo a romper lo mínimo.' }
    ],
    bossIntro: [
      { who: 'Serpiente', spr: 'serpemplumada', color: '#a7f070', text: 'Viajero del tiempo: nadie cruza este templo sin superar mis pruebas.' },
      { who: 'Viajero', text: '¿Son muchas? Tengo una máquina en doble fila en el siglo XXI.' },
      { who: 'Serpiente', spr: 'serpemplumada', color: '#a7f070', text: 'Son tres. Y la última incluye plumas. Muchas plumas.' }
    ],
    bossDefeat: [
      { who: 'Serpiente', spr: 'serpemplumada', color: '#a7f070', text: 'Prueba superada. Tomá tu pedazo de metal raro. Y limpiate los pies al salir.' },
      { who: 'Viajero', text: 'Gracias. Y perdón por el desorden. Cuando vuelva... bueno, mejor no les cuento lo que viene.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      e: { enemy: 'guardian' }, y: { enemy: 'llama' }, z: { enemy: 'serpiente' }, q: { enemy: 'murcielago' }, Y: { enemy: 'llamaAlfa' },
      A: { weapon: 'arco' }, N: { npc: 'sabia' }, S: { npc: 'sabia2' },
      '1': { decor: 'helecho' }, '2': { decor: 'idolo' }
    },
    segments: [
      [
        '              c',
        '            ====',
        '  P  &1    N        e    2',
        '#*',
        '#*'
      ],
      [
        '                  c',
        '       ==        ===',
        '   z      ^^  y        z   h',
        '#######   #######   #######',
        '#######   #######   #######'
      ],
      [
        '               A',
        '             BBBBB       q',
        '          BBBBBBBBBBB',
        '   e   BBBBBBBBBBBBBBBBB   y   2',
        '#*',
        '#*'
      ],
      [
        'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
        '     q              q',
        '           c',
        '          ===              c',
        '  F   ^^      e   ^^^   z',
        '#*',
        '#*'
      ],
      [
        '      Y     c',
        '    BBBBBBBBBBB',
        '',
        '                 ==',
        '             ==        q',
        '   y      z        e        1',
        '#*',
        '#*'
      ],
      [
        '          c               c',
        '     ==      ==     ===',
        '  e                           h',
        '####   ###      ###     #######',
        '####   ###      ###     #######'
      ],
      [
        '             q',
        '                  c',
        '     BBB         ===',
        '  z  BBB  y  ^^       e   S   2',
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
