// ETAPA F1 — FUTURO CERCANO CYBERPUNK (tramo final). Valida el contraste de épocas.
CV.stage({
  id: 'cyberpunk', tech: 9,
  title: 'FUTURO CYBERPUNK', subtitle: 'Año 2099. Términos y condiciones aplican.',
  bg: {
    sky: ['#0a0a1e', '#1a1040', '#4a1a6a', '#b83a8a'],
    layers: [
      { gen: 'stars', n: 70, maxY: 110, speed: .01 },
      { gen: 'sun', x: 290, y: 60, r: 26, color: '#ff77c8', color2: '#ffc0e8', speed: .02 },
      { gen: 'city', base: 190, min: 50, max: 140, color: '#231a4a', win: ['#ff3fa4', '#73eff7'], lit: .2, neon: ['#ff3fa4', '#73eff7'], speed: .1, seed: 11 },
      { gen: 'city', base: 200, min: 30, max: 100, color: '#16122e', win: ['#ffe14a', '#73eff7', '#ff3fa4'], lit: .3, neon: ['#ffe14a', '#ff3fa4', '#73eff7'], gap: 4, speed: .28, seed: 13 },
      { gen: 'city', base: 210, min: 10, max: 46, color: '#0b0a1a', win: ['#73eff7'], lit: .15, gap: 20, speed: .55, seed: 17 }
    ]
  },
  tiles: {
    '#': { pattern: 'metal', base: '#2a2f4a', dark: '#171a2e', light: '#4a5380', glow: '#ff3fa4', top: '#73eff7', topH: 1 },
    'B': { pattern: 'metal', base: '#3a2a5a', dark: '#1f1436', light: '#6a4c93', glow: '#73eff7' },
    '=': { base: '#ff3fa4', dark: '#8a1f5a', light: '#ffc0e8' },
    '^': { base: '#73eff7', dark: '#257179', light: '#ffffff' }
  },
  music: {
    bpm: 128, drums: 'k.h.s.h.k.h.s.hh',
    tracks: [
      { wave: 'sawtooth', vol: .03, notes: 'd4 f4 a4 d5 a4 f4 d4 f4 a4 d5 a4 f4 d4 f4 a4 d5 a#3 d4 f4 a#4 f4 d4 a#3 d4 f4 a#4 f4 d4 a#3 d4 f4 a#4 c4 e4 g4 c5 g4 e4 c4 e4 g4 c5 g4 e4 c4 e4 g4 c5 a3 c#4 e4 a4 e4 c#4 a3 c#4 e4 a4 e4 c#4 a3 c#4 e4 a4' },
      { wave: 'square', vol: .04, notes: 'a5 _ _ _ _ _ g5 _ f5 _ _ _ _ _ _ _ f5 _ _ _ _ _ e5 _ d5 _ _ _ _ _ _ _ e5 _ _ _ _ _ g5 _ e5 _ _ _ c5 _ _ _ e5 _ _ _ _ _ _ _ c#5 _ _ _ - - - -' },
      { wave: 'triangle', vol: .14, notes: 'd2 d2 - d2 d2 - d2 d2 - d2 d2 - d2 d2 d2 - a#1 a#1 - a#1 a#1 - a#1 a#1 - a#1 a#1 - a#1 a#1 a#1 - c2 c2 - c2 c2 - c2 c2 - c2 c2 - c2 c2 c2 - a1 a1 - a1 a1 - a1 a1 - a1 a1 - a1 a1 a1 -' }
    ]
  },
  ambient: { col: ['#73eff7', '#3b5dc9'], rate: .5, vy: 170, vx: -20, life: 1.5 },
  heals: ['energia', 'ramen'],
  collectible: { name: 'Chip de datos', spr: 'c_chip' },

  sprites: {
    dron: {
      rows: [
        '................',
        '................',
        '................',
        '.ddddd....ddddd.',
        '...e........e...',
        '...e..ffff..e...',
        '...effffffffe...',
        '....ffrrrrff....',
        '....ffr00rff....',
        '....ffffffff....',
        '.....ff..ff.....',
        '......b..b......',
        '................',
        '................',
        '................',
        '................'
      ],
      anim: { walk: [{ 3: '...ddd....ddd...' }, {}] }
    },
    robopoli: {
      rows: [
        '.......r........',
        '.....99999......',
        '....9999999.....',
        '....9rrrrr9.....',
        '....9999999.....',
        '.....ddddd......',
        '...ddddddddd....',
        '..dd9ddyddd9ee..',
        '..dd.ddddd.eeeee',
        '..dd.ddddd..e...',
        '..ss.99999......',
        '.....dd.dd......',
        '.....dd.dd......',
        '.....dd.dd......',
        '.....ff.ff......',
        '....fff.fff.....'
      ],
      anim: { walk: [{ 12: '....dd...dd.....', 13: '...dd.....dd....', 14: '...ff.....ff....', 15: '..fff.....fff...' }, {}] }
    },
    mecha: { from: 'robopoli', swap: { '9': '1', d: 'e', s: 'r' } },
    hacker: {
      rows: [
        '................',
        '.....0000.......',
        '....000000......',
        '....0jjjj0......',
        '....0j5j50......',
        '....0jjjj0......',
        '...0000000......',
        '..000000000.....',
        '..00050000jsss..',
        '..0000000.s5bs..',
        '..j000000.ssss..',
        '....00000.......',
        '....ff.ff.......',
        '....ff.ff.......',
        '....ff.ff.......',
        '...555.555......'
      ],
      anim: { walk: [{ 13: '...ff...ff......', 14: '..ff.....ff.....', 15: '.555.....555....' }, {}] }
    },
    roomba: {
      rows: [
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '.......r........',
        '......rrr.......',
        '....ffffffff....',
        '..ffffffffffff..',
        '.ffddddddddddff.',
        '.ffffffffffffff.',
        '..ffffffffffff..',
        '...00......00...'
      ],
      anim: { walk: [{ 8: '................', 9: '.......r........', 15: '....00....00....' }, {}] }
    },
    ia: {
      rows: [
        '...............bb...............',
        '...............ee...............',
        '...............ee...............',
        '....ffffffffffffffffffffffff....',
        '...ffeeeeeeeeeeeeeeeeeeeeeeff...',
        '...fe0000000000000000000000ef...',
        '...fe0000000000000000000000ef...',
        '...fe000bbbb00000000bbbb000ef...',
        '...fe00bb00bb000000bb00bb00ef...',
        '...fe00b0000b000000b0000b00ef...',
        '...fe0000000000000000000000ef...',
        '...fe0000000000000000000000ef...',
        '...fe000b00000000000000b000ef...',
        '...fe000bb000000000000bb000ef...',
        '...fe0000bbbbbbbbbbbbbb0000ef...',
        '...fe0000000000000000000000ef...',
        '...fe0000000000000000000000ef...',
        '...ffeeeeeeeeeeeeeeeeeeeeeeff...',
        '....ffffffffffffffffffffffff....',
        '.............feeeef.............',
        '.......88888888cc88888888.......',
        '......88888888crrc88888888......',
        '.....888888888crrc888888888.....',
        '.....8888888888rr8888888888.....',
        '.....8888888888rr8888888888.....',
        '.....8888888888rr8888888888.....',
        '......888888888rr888888888......',
        '.......8888888.rr.8888888.......',
        '.........bb..........bb.........',
        '........b..b........b..b........',
        '.........bb..........bb.........',
        '................................'
      ],
      anim: {
        a: [{
          7: '...fe00rrr000000000000rrr00ef...', 8: '...fe000rrr0000000000rrr000ef...', 9: '...fe0000rr0000000000rr0000ef...',
          12: '...fe0000rrrrrrrrrrrrrr0000ef...', 13: '...fe000rr000000000000rr000ef...', 14: '...fe000r00000000000000r000ef...'
        }]
      }
    },
    neon: { rows: ['..mmmmmmmmmmmm..', '..m0000000000m..', '..m0bb0bbbb00m..', '..m0bb0b00b00m..', '..m0000bbbb00m..', '..m0bbbb00000m..', '..m0b00b0bb00m..', '..m0bbbb0bb00m..', '..m0000000000m..', '..mmmmmmmmmmmm..'].concat(Array(22).fill('.......ff.......')) },
    antena: { rows: ['.......r........', '.......e........', '.....eeeee......', '.......e........', '....eeeeeee.....', '.......e........'].concat(Array(10).fill('.......e........')) },
    p_popup: { rows: ['cccccccccccc', 'c9999999rr9c', 'cccccccccccc', 'c0000c0000cc', 'cccccccccccc', 'cc666cc222cc', 'cc666cc222cc', 'cccccccccccc'] },
    p_bug: { rows: ['.5....5.', '..5..5..', '.555555.', '5505505.', '.555555.', '5.5555.5', '.5....5.', '5......5'] },
    c_chip: { rows: ['..........', '..e.e.e...', '.6666666..', 'e6000006e.', '.6055506..', 'e6055506e.', '.6000006..', 'e6666666e.', '..e.e.e...', '..........'] }
  },

  enemies: {
    dron: { sprite: 'dron', ai: 'flyer', hp: 6, speed: 55, hover: 44, keep: 50, sight: 150, sightY: 120, cooldown: 2, animSpeed: 20, proj: { col: '#ff3fa4', col2: '#ffffff', w: 4, h: 4, speed: 130, aim: true } },
    robopoli: { sprite: 'robopoli', ai: 'ranged', hp: 12, speed: 22, sight: 140, cooldown: 1.9, proj: { col: '#73eff7', col2: '#ffffff', w: 8, h: 2, speed: 200, sfx: 'laser' }, barks: ['CIRCULE, CIUDADANO.', 'TIENE DERECHO A UNA SUSCRIPCIÓN PREMIUM.', 'MULTA POR RESPIRAR SIN LICENCIA.'] },
    hacker: { sprite: 'hacker', ai: 'ranged', hp: 8, speed: 20, sight: 140, cooldown: 2.4, proj: { spr: 'p_bug', w: 6, h: 6, speed: 110, grav: 300 }, barks: ['sudo rm -rf viajero', '¿Probaste apagar y prender?', 'Te hackeo el reloj y llegás tarde a todo.'] },
    roomba: { sprite: 'roomba', ai: 'kamikaze', hp: 6, w: 14, h: 7, speed: 30, charge: 150, tele: .95, sight: 110, animSpeed: 10, barks: ['LIMPIANDO... OBJETIVO.', 'MANCHA DETECTADA.'] },
    mecha: { sprite: 'mecha', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 80, speed: 26, chase: 58, sight: 160, sightY: 70, paradox: false, barks: ['MECHA-SEGURIDAD 3000: SONRÍA.', 'RESISTIRSE ANULA LA GARANTÍA.'] }
  },

  boss: {
    name: 'SYNERG-IA, IA CORPORATIVA', mul: { melee: 1.3, ranged: 0.85 }, sprite: 'ia', scale: 2, w: 44, h: 50, hp: 240, mode: 'hover', rest: .9,
    anchors: [[.75, .4], [.25, .4], [.5, .48], [.5, .3], [.65, .34], [.35, .34]],
    attacks: {
      rayos: { type: 'lines', kinds: ['beam', 'beam', 'diag'], n: 3, every: .45, warn: .8, live: .5, col: '#ff3fa4', thick: 5 },
      red: { type: 'lines', kinds: ['beam', 'high', 'zig', 'diag'], n: 5, every: .32, warn: .8, live: .5, col: '#73eff7', thick: 5 },
      popups: { type: 'shoot', count: 3, every: .5, n: 2, spread: .4, speed: 110, proj: { spr: 'p_popup', w: 12, h: 8 } },
      drones: { type: 'summon', ids: ['dron', 'roomba'], n: 2, max: 3 },
      update: { type: 'taunt', dur: 2.7, say: ['Reiniciando para instalar actualizaciones... 1%', 'Su llamada es importante para nosotros. Permanezca en línea.', 'Acepte los términos y condiciones. Son 400 páginas.', '¿Le gustaría calificar esta batalla con 5 estrellas?'] },
      notis: { type: 'radial', count: 3, n: 12, speed: 98, proj: { col: '#ff3fa4', col2: '#ffffff', w: 6, h: 6 } },
      spam: { type: 'rain', count: 10, every: .18, speed: 165, proj: { spr: 'p_popup', w: 12, h: 8 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['rayos', 'popups', 'update', 'notis'] },
      { until: .33, speed: 1.15, say: 'Hemos actualizado nuestra política de destrucción.', pattern: ['red', 'drones', 'popups', 'update', 'spam', 'notis'] },
      { speed: 1.3, say: 'SU OPINIÓN NOS IMPORTA. (NO.)', pattern: ['red', 'spam', 'notis', 'rayos', 'drones', 'update', 'popups'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Año 2099. Todo tiene neón. Hasta las cosas que no deberían tener neón.' },
      { who: 'Viajero', text: 'Mis armas viejas acá hacen cosquillas. Menos mal que el futuro deja láseres tirados por ahí.' },
      { who: 'Viajero', text: 'Una megacorporación controla todo con una IA. Qué original, futuro.' }
    ],
    bossIntro: [
      { who: 'SYNERG-IA', spr: 'ia', color: '#73eff7', text: '¡Hola, valioso usuario! Detectamos una máquina del tiempo sin licencia corporativa.' },
      { who: 'Viajero', text: 'Solo vengo a buscar una pieza y me voy.' },
      { who: 'SYNERG-IA', spr: 'ia', color: '#73eff7', text: 'Por supuesto. Solo debe aceptar las cookies, los términos y su inevitable eliminación. ¿Desea continuar? (SÍ) (SÍ)' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'ERROR 404: jefe no encontrado.' },
      { who: 'Viajero', text: 'La máquina ya casi arranca. Falta cruzar el espacio y... el fin del tiempo. Sin presión.' }
    ]
  },
  // Texto que se muestra la primera vez que se completa la etapa (cierre de esta entrega).
  level: {
    height: 14,
    legend: {
      o: { enemy: 'dron' }, k: { enemy: 'robopoli' }, j: { enemy: 'hacker' }, u: { enemy: 'roomba' }, K: { enemy: 'mecha' },
      Z: { weapon: 'laser' },
      '1': { decor: 'neon' }, '2': { decor: 'antena' }
    },
    segments: [
      [
        '             c',
        '           ====',
        '  P   1   Z       u      1   k',
        '#*',
        '#*'
      ],
      [
        '       o            o',
        '                         c',
        '      ===     ===      =====',
        '   j                 ^^         h',
        '#######   ######   ############',
        '#######   ######   ############'
      ],
      [
        '   c           K',
        '  BBBBBBBBBBBBBBBBBB',
        '',
        '                      ==',
        '                  ==        o',
        '   F    k     u        j        2',
        '#*',
        '#*'
      ],
      [
        '          o               o',
        '      c              c',
        '     ===    BBB     ===',
        '  u         BBB  k        j   h',
        '#####   #######  ####   #######',
        '#####   #######  ####   #######'
      ],
      [
        '                 c',
        '        ===     ===     o',
        '  k  j       u  ^^    k        1',
        '#*',
        '#*'
      ],
      [
        '      o           o',
        '             c',
        '    ===     ===     ===',
        '  1    u        k        j',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '        o       ===',
        '     BBB    ==        BBB',
        '  k  BBB        u     BBB   h',
        '########   ####   ###########',
        '########   ####   ###########'
      ],
      [
        '   o                  o',
        '           c',
        '      ==  ===  ==',
        '  j   ^^   u   ^^    k     2',
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
