// ETAPA L4 — SIGLO XX LATINO (rama Latam). Hinchas, tangueros, arbolitos y políticos de discurso eterno.
CV.stage({
  id: 'sigloxx', tech: 7,
  title: 'SIGLO XX LATINO', subtitle: '1989. Los precios cambian mientras leés esto.',
  bg: {
    sky: ['#3a2a6a', '#a04a7a', '#f08a6a', '#ffd9a0'],
    layers: [
      { gen: 'sun', x: 300, y: 110, r: 22, color: '#ffd9a0', color2: '#fff1d0', speed: .01 },
      { gen: 'clouds', n: 5, y: 18, h: 40, color: '#f7a58a', speed: .04, drift: 2 },
      { gen: 'obelisk', x: 120, base: 196, h: 100, color: '#e8c8b0', win: '#7a4a5a', speed: .07 },
      { gen: 'city', base: 196, min: 36, max: 90, color: '#8a5a7a', win: '#ffe9a0', lit: .25, tank: true, speed: .14, seed: 21 },
      { gen: 'city', base: 206, min: 20, max: 64, color: '#4a2a4a', win: ['#ffe14a', '#ffcd75'], lit: .35, tank: true, gap: 8, speed: .4, seed: 23 }
    ]
  },
  tiles: {
    '#': { pattern: 'pave', base: '#9a8a80', dark: '#6a5a55', light: '#c0b0a0', top: '#d0c0b0', topDark: '#6a5a55', topH: 2 },
    'B': { pattern: 'brick', base: '#a8553a', dark: '#70301f', light: '#d08060' },
    '=': { base: '#3b8a5a', dark: '#1f5a36', light: '#8fd4a0' },
    '^': { base: '#ff8a00', dark: '#333c57', light: '#ffffff' }
  },
  music: {
    bpm: 116, drums: 'k...k...k...k.s.',
    tracks: [
      { wave: 'square', vol: .05, notes: 'e5 _ _ d#5 e5 _ c5 _ a4 _ _ _ - - e4 _ f5 _ _ e5 f5 _ d5 _ b4 _ _ _ - - e4 _ e5 _ d5 c5 b4 _ a4 _ g#4 _ a4 b4 c5 _ b4 _ a4 _ _ _ e4 _ _ _ a4 _ - - - - - -' },
      { wave: 'triangle', vol: .14, notes: 'a2 _ e3 _ a2 _ e3 _ a2 _ e3 _ a2 _ e3 g#2 d2 _ a2 _ d2 _ a2 _ e2 _ b2 _ e2 _ b2 _ a2 _ e3 _ a2 _ e3 _ e2 _ b2 _ e2 _ g#2 _ a2 _ e3 _ a2 _ e3 _ a2 _ _ _ - - - -' }
    ]
  },
  ambient: { col: ['#38b764', '#a7f070', '#f4f4f4'], rate: .12, vy: 24, vx: -8, life: 8, size: 2 },
  heals: ['mate', 'empanada'],
  collectible: { name: 'Billete viejo', spr: 'c_billete' },

  sprites: {
    hincha: {
      rows: [
        '................',
        '.....hhhhh......',
        '....hhhhhhh.....',
        '....jjjjjjj.....',
        '....j0jjj0j.....',
        '....jj000jj.....',
        '.....jjjjj......',
        '....vcvcvcv.....',
        '...vcvcvcvcv.rr.',
        '..jvcvcvcvcjrccr',
        '..j.vcvcvcv.rccr',
        '....vcvcvcv..rr.',
        '....00...00.....',
        '....00...00.....',
        '....jj...jj.....',
        '...000...000....'
      ],
      anim: { walk: [{ 13: '...00.....00....', 14: '..jj.......jj...', 15: '.000.......000..' }, {}] }
    },
    tanguero: {
      rows: [
        '................',
        '....0000000.....',
        '...000000000....',
        '.....jjjjj......',
        '.....j0j0jr.....',
        '.....jjjjj......',
        '......jjj.......',
        '....0000000.....',
        '...00c000c00....',
        '..j000c0c000j...',
        '..j.0000000.j...',
        '....0000000.....',
        '....00...00.....',
        '....00....00....',
        '....00.....00...',
        '...000.....000..'
      ],
      anim: { walk: [{ 13: '...00....00.....', 14: '..00.....00.....', 15: '.000....000.....' }, {}] }
    },
    arbolito: {
      rows: [
        '................',
        '.....00000......',
        '....0000000.....',
        '....jjjjjjj.....',
        '....000j000.....',
        '....jjjjjjj.....',
        '.....jjjjj......',
        '....iiiiiii.....',
        '...iiiciciii.66.',
        '..jiiiiiiiij666.',
        '..j.iiiiiii.66..',
        '....iiiiiii.....',
        '....88...88.....',
        '....88...88.....',
        '....88...88.....',
        '...000...000....'
      ],
      anim: { walk: [{ 13: '...88.....88....', 14: '..88.......88...', 15: '.000.......000..' }, {}] }
    },
    politico: {
      rows: [
        '................',
        '.....sssss......',
        '....sssssss.....',
        '....jjjjjjj.....',
        '....j0jjj0j.....',
        '....jcccccj.....',
        '.....jjjjj......',
        '....88c2c88.....',
        '...888c2c888.0..',
        '..j888828888j0..',
        '..j.8882888..e..',
        '....8888888..e..',
        '....88...88..e..',
        '....88...88..e..',
        '....88...88..e..',
        '...000...000.e..'
      ]
    },
    politicoEterno: { from: 'politico', swap: { '8': '1', s: '0' } },
    hiperinflacion: {
      rows: [
        '................................',
        '..........66......66............',
        '.........6556....6556...........',
        '......666655666666556666........',
        '.....65555555555555555556.......',
        '....6555555555555555555556......',
        '...655555555555555555555556.....',
        '...65555ccc5555555ccc555556.....',
        '...6555cc0cc55555cc0cc55556.....',
        '...6555c000c55555c000c55556.....',
        '...65555ccc5555555ccc555556.....',
        '...655555555555555555555556.....',
        '...655500000000000000055556.....',
        '...6555c0c0c0c0c0c0c0c55556..r..',
        '...655500000000000000055556.rrr.',
        '...65555555555555555555556.rrrrr',
        '....655555555q5555555555556..r..',
        '....65555555qqq55555555556...r..',
        '.....655555q5q5q555555556....r..',
        '.....6555555qqq5555555556....r..',
        '......655555q5qq55555556..rrrr..',
        '......6555555qqq5555556.........',
        '.......65555q5q5q55556..........',
        '.......655555qqq555556..........',
        '........6555555q55556...........',
        '.........65555555556............',
        '..........655555556.............',
        '...........6655566..............',
        '.....5.......666.......5........',
        '....565...............565.......',
        '.....5.................5........',
        '................................'
      ],
      anim: { a: [{ 12: '...655500000000000000055556.....', 13: '...65550rrrrrrrrrrrrr055556..r..', 14: '...65550rrrrrrrrrrrrr055556.rrr.', 15: '...6555500000000000005556..rrrrr' }] }
    },
    c_billete: { rows: ['..........', '..........', '6666666666', '6555q55556', '655q5q5556', '6555q55556', '6666666666', '..........', '..........', '..........'] }
  },

  enemies: {
    hincha: { sprite: 'hincha', ai: 'chase', hp: 8, speed: 28, chase: 60, sight: 100, barks: ['¡DALE CAMPEÓN!', '¡Oooole, ole, ole!', '¡El referí estaba comprado!', '¡Esta vez sí salimos campeones!'] },
    tanguero: { sprite: 'tanguero', ai: 'charger', hp: 7, speed: 24, charge: 150, tele: .85, rest: 1, sight: 120, animSpeed: 10, barks: ['¿Bailamos?', '¡Y dos, tres, cuatro!', 'Este tango es para vos.'] },
    arbolito: { sprite: 'arbolito', ai: 'ranged', hp: 7, speed: 18, sight: 140, cooldown: 2.3, proj: { col: '#38b764', col2: '#a7f070', w: 6, h: 4, speed: 125, aim: true }, barks: ['¡Cambio, cambio, cambio!', '¿Dólar, euro, real?', 'Te lo dejo a precio de ayer. Bueno, de hace una hora.'] },
    politico: { sprite: 'politico', ai: 'ranged', hp: 9, speed: 0, sight: 150, cooldown: 3, barkChance: 1, proj: { col: '#f4f4f4', col2: '#94b0c2', w: 10, h: 6, speed: 70, aim: true, life: 5 }, barks: ['Compatriotas... y voy a ser breve...', 'En el marco del contexto de la coyuntura...', 'Y como decía hace tres horas...', 'No voy a prometer nada. Lo prometo.'] },
    politicoEterno: { sprite: 'politicoEterno', ai: 'ranged', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 70, speed: 0, sight: 180, sightY: 80, cooldown: 1.3, barkChance: 1, paradox: false, proj: { col: '#f4f4f4', col2: '#94b0c2', w: 12, h: 8, speed: 85, aim: true, life: 5 }, barks: ['...y en el punto 847 de mi discurso...', 'Para terminar... (No termina.)', 'Seré breve como siempre: cuatro horas.'] }
  },

  boss: {
    name: 'LA HIPERINFLACIÓN', mul: { melee: 0.9, ranged: 1.3 }, sprite: 'hiperinflacion', scale: 2, w: 46, h: 50, hp: 190, mode: 'hover', rest: .9,
    anchors: [[.72, .42], [.28, .42], [.5, .5], [.6, .3], [.4, .3]],
    attacks: {
      billetes: { type: 'radial', count: 3, n: 10, speed: 94, proj: { spr: 'c_billete', w: 8, h: 5, spin: true } },
      precios: { type: 'lines', kinds: ['diag', 'high', 'diag', 'pillar'], n: 4, every: .45, warn: .9, live: .6, col: '#e03c32', thick: 4, labels: ['+900%', 'REMARCADO', 'AUMENTÓ', 'PRECIO CUIDADO (NO)'] },
      ceros: { type: 'rain', count: 9, every: .2, speed: 170, proj: { col: '#f4f4f4', col2: '#38b764', w: 8, h: 8 } },
      cueva: { type: 'summon', ids: ['arbolito', 'hincha'], n: 2, max: 3 },
      plan: { type: 'taunt', dur: 2.6, say: ['Nuevo plan económico: le saco tres ceros y listo.', 'Esperá, que estoy remarcando.', '¿Cuánto salía esta pelea ayer? Hoy sale el doble.', 'Cambio de moneda. Ahora me llamo distinto, pero soy la misma.'] }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['billetes', 'plan', 'precios', 'ceros'] },
      { until: .33, speed: 1.2, say: 'Mientras leías esto, aumenté un 40%.', pattern: ['precios', 'billetes', 'cueva', 'plan', 'ceros'] },
      { speed: 1.4, say: '¡¡LE AGREGO CEROS A TU SUFRIMIENTO!!', pattern: ['billetes', 'precios', 'ceros', 'billetes', 'plan', 'cueva'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Siglo XX. Fútbol, tango, discursos de cuatro horas y un kiosco que cambia los precios con tiza.' },
      { who: 'Viajero', text: 'Compré un alfajor al entrar al nivel. Ya vale el triple. Lo voy a vender.' }
    ],
    bossIntro: [
      { who: 'Hiperinflación', spr: 'hiperinflacion', color: '#a7f070', text: '¡BUENAS! Soy la Hiperinflación. Hace cinco minutos era chiquita.' },
      { who: 'Viajero', text: 'Vengo por una pieza de la máquina. ¿Cuánto sale?' },
      { who: 'Hiperinflación', spr: 'hiperinflacion', color: '#a7f070', text: 'Cuando empezaste la pregunta, mil. Ahora, un millón. No acepto billetes de ayer.' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'Se desinfló. Por ahora. Tengo el presentimiento de que vuelve cada tanto.' },
      { who: 'Viajero', text: 'Próxima parada: el presente. No sé si estoy listo para el tránsito.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      i: { enemy: 'hincha' }, t: { enemy: 'tanguero' }, a: { enemy: 'arbolito' }, p: { enemy: 'politico' }, E: { enemy: 'politicoEterno' },
      '1': { decor: 'semaforo' }, '2': { decor: 'tacho' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P   1     i        a    2',
        '#*',
        '#*'
      ],
      [
        '                   c',
        '      ===         ===',
        '   t        p             i   h',
        '########   ########   ########',
        '########   ########   ########'
      ],
      [
        '                  p',
        '           c    BBBB',
        '        BBBB    BBBB     a',
        '  i  BBBBBBB  t BBBB          1',
        '#*',
        '#*'
      ],
      [
        '       E     c',
        '    BBBBBBBBBBBB',
        '',
        '                  ==',
        '              ==',
        '   F    a           t     i    2',
        '#*',
        '#*'
      ],
      [
        '           c               c',
        '     ==       ==      ===',
        '  a                            h',
        '####   ####      ###     ######',
        '####   ####      ###     ######'
      ],
      [
        '                 c',
        '       ===      ===',
        '  i  p     ^^      t    a     1',
        '#*',
        '#*'
      ],
      [
        '          c',
        '        BBBBB        p',
        '  t     BBBBB   i   BBB   a   2',
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
