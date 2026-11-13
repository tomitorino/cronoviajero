// ETAPA A5 — NEO-TOKIO ACTUAL (rama Asia, entrega la pieza). Sátira de la cultura corporativa: horas extra eternas,
// mascotas de empresa y karaoke obligatorio con el presidente. Oficinistas agotados y otakus son aliados.
CV.stage({
  id: 'neotokio', tech: 8,
  title: 'NEO-TOKIO ACTUAL', subtitle: 'Hoy, 23:40. El último tren ya pasó. La oficina sigue abierta.',
  bg: {
    sky: ['#0a0a24', '#1a1040', '#3a1a5a', '#6a2a6a'],
    layers: [
      { gen: 'stars', n: 20, maxY: 60, color: '#cfd8ff', speed: .01 },
      { gen: 'city', base: 186, min: 50, max: 110, color: '#1a1a3a', win: ['#ffe9a0', '#73eff7'], lit: .55, speed: .12, seed: 3 },
      { gen: 'city', base: 200, min: 26, max: 70, color: '#12122a', win: ['#ff77a8', '#73eff7', '#ffe14a'], lit: .5, neon: ['#ff77a8', '#73eff7', '#a7f070'], gap: 4, speed: .32, seed: 8 },
      { gen: 'city', base: 210, min: 8, max: 26, color: '#0a0a18', win: '#ffe9a0', lit: .3, gap: 8, speed: .55, seed: 15 }
    ]
  },
  tiles: {
    '#': { pattern: 'pave', base: '#3a3a52', dark: '#22223a', light: '#5a5a7a', top: '#4a4a6a', topLight: '#73eff7', topDark: '#22223a', topH: 2 },
    'B': { pattern: 'metal', base: '#4a4a6a', dark: '#2a2a4a', light: '#7a7a9a' },
    '=': { base: '#ff77a8', dark: '#7e2553', light: '#ffffff' },
    '^': { base: '#73eff7', dark: '#29366f', light: '#ffffff' }
  },
  music: {
    bpm: 138, drums: 'k.s.k.s.k.skk.s.',
    tracks: [
      { wave: 'square', vol: .05, notes: 'a4 c5 e5 a5 _ g5 e5 _ d5 e5 g5 e5 _ c5 a4 _ f4 a4 c5 f5 _ e5 c5 _ g4 b4 d5 g5 _ e5 d5 _' },
      { wave: 'triangle', vol: .13, notes: 'a2 _ a2 a2 _ a2 e2 _ a2 _ a2 a2 _ g2 e2 _ f2 _ f2 f2 _ f2 c2 _ g2 _ g2 g2 _ g2 b1 _' }
    ]
  },
  ambient: { col: ['#73eff7', '#ff77a8'], rate: .5, vy: 150, vx: -20, life: 1.6 },
  heals: ['ramen', 'energia', 'sushi'],
  collectible: { name: 'Figurita de máquina de cápsulas', spr: 'c_estrella' },

  sprites: {
    gerente: { from: 'yakuza', swap: { f: '8', r: 'r', '0': 'f' } },
    oficinista: { from: 'yakuza', swap: { f: 'e', r: '9', '0': 'h' } },
    otaku: { from: 'yakuza', swap: { f: 'o', r: 'o', c: 'o', '0': 'h' } },
    mascota: {
      rows: [
        '................',
        '...mm......mm',
        '..mmmm....mmmm',
        '..mmmmmmmmmmmm',
        '.mmmmmmmmmmmmmm',
        '.mmc0mmmmmmc0mm',
        '.mm00mmmmmm00mm',
        '.mmmmmm22mmmmmm',
        '.mmrmmmmmmmmrmm',
        '.mmmmccccccmmmm',
        '..mmmmmmmmmmmm',
        '..mmmcccccmmmm',
        '..mmmcccccmmm',
        '...mmmmmmmmm',
        '...mmm...mmm',
        '..mmmm...mmmm'
      ],
      anim: { walk: [{ 14: '..mmm.....mmm', 15: '.mmmm.....mmmm' }, {}] }
    },
    expendedora: {
      rows: [
        '................',
        '..eeeeeeeeeeee',
        '..e0000000000e',
        '..e0r0y0b0x00e',
        '..e0000000000e',
        '..e0y0b0r0m00e',
        '..e0000000000e',
        '..e0b0x0y0r00e',
        '..e0000000000e',
        '..eeeeeeeeccee',
        '..eeeeeeeeccee',
        '..e00000000eee',
        '..e00000000eee',
        '..eeeeeeeeeeee',
        '..ff........ff',
        '..ff........ff'
      ],
      anim: { walk: [{ 14: '...ff......ff', 15: '...ff......ff' }, {}] }
    },
    karaoke: {
      rows: [
        '................................', '',
        '.............rr',
        '.............dd',
        '.........dddddddddddd',
        '........dd0000000000dd',
        '........d00b00jj00b00d',
        '........d000mmmmmm000d',
        '........dd0000000000dd',
        '.........dddddddddddd',
        '..ffff....eeeeeeeeee....ffff',
        '.ff00ff.dddddddddddddd.ff00ff',
        '.f0ee0f.dmmdyydbbdxxdd.f0ee0f',
        '.f0ee0f.dddddddddddddd.f0ee0f',
        '.ff00ff.d0000000000ddd.ff00ff',
        '..ffff..d0y0m0b0x00ddd..ffff',
        '...dd...d0000000000ddd...dd',
        '...dd...dddddddddddddd...dd.s',
        '...dddddd.eeeeeeeeee.ddddddss',
        '..........dd......dd.......0',
        '.........bbbb....bbbb',
        '..........bb......bb',
        '', '', '', '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 15: '..ffff..d0m0b0x0y00ddd..ffff', 20: '..........bb......bb', 21: '' }, {}],
        a: [{ 7: '........d00m000000m00d', 8: '........dd00mmmmmm00dd', 11: '.ffmmff.dddddddddddddd.ffmmff', 14: '.ffmmff.d0000000000ddd.ffmmff', 20: '.........yyyy....yyyy', 21: '..........oo......oo' }]
      }
    },
    p_lata: { rows: ['.ssss.', 'rrrrrr', 'rcrrrr', 'rcrrrr', 'rrrrrr', '.ssss.'] },
    p_horaextra: { rows: ['.cccc.', 'cc0ccc', 'cc0ccc', 'cc00cc', 'cccccc', '.cccc.'] }
  },

  enemies: {
    gerente: { sprite: 'gerente', ai: 'ranged', hp: 9, speed: 18, sight: 150, cooldown: 2.3, proj: { speed: 120, grav: 300, spr: 'p_horaextra', w: 6, h: 6 }, barks: ['¿Te vas a las once de la noche? ¿Media jornada?', 'Las horas extra no se pagan: se agradecen.', 'Reunión para planificar la reunión. Es urgente.'] },
    mascota: { sprite: 'mascota', ai: 'chase', hp: 10, speed: 28, chase: 60, jump: 230, sight: 120, barks: ['¡Soy Trabajín! ¡Amá a tu empresa!', '¡Abrazo corporativo! ¡Es obligatorio!', '(Sacame de este traje. Soy un pasante.)'] },
    expendedora: { sprite: 'expendedora', ai: 'ranged', hp: 14, speed: 10, sight: 150, cooldown: 2, proj: { speed: 200, spr: 'p_lata', w: 6, h: 6 }, barks: ['CAFÉ FRÍO, CAFÉ CALIENTE, SOPA EN LATA. DE NADA.', 'HAY UNA DE NOSOTRAS CADA TRES METROS.', 'SU VUELTO: UN LATAZO.'] },
    robotRamen: { sprite: 'roomba', ai: 'kamikaze', hp: 7, w: 14, h: 7, speed: 32, charge: 155, tele: .9, sight: 115, animSpeed: 10, barks: ['SU PEDIDO. ESTÁ HIRVIENDO.', 'RAMEN EXPRESS. NO FRENO.'] },
    dronIdol: { sprite: 'dron', ai: 'flyer', hp: 5, speed: 62, hover: 5, sight: 150, sightY: 100, animSpeed: 20 },
    trabajin: { sprite: 'mascota', ai: 'chase', mini: true, heavy: true, scale: 2, w: 26, h: 30, hp: 96, speed: 26, chase: 56, sight: 160, sightY: 70, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡¡SOY TRABAJÍN GIGANTE!! ¡¡EL DOBLE DE COMPROMISO!!', '¡¡LA EMPRESA ES TU FAMILIA!! ¡¡Y NO TE DEJA IR A VER A LA OTRA!!'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, lines: ['La pieza asiática es el condensador. La cambié por un vale de karaoke.', 'Me arrepiento poco. Canté dos temas. Me aplaudió una expendedora.'] },
    oficinista: { sprite: 'oficinista', gift: { heal: 'energia' }, lines: ['Zzz... ¿eh? No estoy durmiendo. Estoy descansando la vista. Desde el martes.', 'Perdí el último tren. Otra vez. Ya me conocen en el hotel cápsula.'] },
    otaku: { sprite: 'otaku', gift: { heal: 'ramen' }, lines: ['¡Un viajero del tiempo! Como en la temporada 2. La 3 decayó, igual.', 'Las expendedoras tiran latas rectas: saltalas. Los robots de ramen no frenan: correte.'] },
    otaku2: { sprite: 'otaku', gift: { ammo: true }, lines: ['El jefe final es de manual: tiene fases, barra de vida y momento vulnerable.', 'Cuando el Presidente canta su tema preferido cierra los ojos. Son catorce minutos. Dale ahí.'] }
  },

  boss: {
    name: 'EL MEGA-ROBOT DE KARAOKE', mul: { melee: 1.4, ranged: 0.85 }, sprite: 'karaoke', scale: 2, w: 52, h: 38, hp: 185, mode: 'hover', rest: .85,
    anchors: [[.78, .32], [.22, .32], [.5, .26], [.68, .46], [.32, .46], [.5, .44]],
    attacks: {
      estribillo: { type: 'shoot', count: 6, every: .18, n: 1, speed: 195, sfx: 'shoot', proj: { spr: 'p_nota', w: 6, h: 8 } },
      coro: { type: 'shoot', count: 3, every: .6, n: 5, spread: .55, speed: 150, sfx: 'shoot', proj: { spr: 'p_nota', w: 6, h: 8 } },
      graves: { type: 'lines', kinds: ['floor', 'high', 'beam'], n: 5, every: .32, warn: .8, live: .5, col: '#ff77a8', thick: 6 },
      agudos: { type: 'lines', kinds: ['diag', 'pillar', 'zig'], n: 5, every: .32, warn: .8, live: .45, col: '#73eff7', thick: 5 },
      horasextra: { type: 'rain', count: 11, every: .2, speed: 185, proj: { spr: 'p_horaextra', w: 6, h: 6 } },
      afteroffice: { type: 'summon', ids: ['mascota', 'dronIdol', 'robotRamen'], n: 2, max: 4 },
      balada: { type: 'taunt', dur: 2.8, say: ['Y ahora... mi tema preferido. Son catorce minutos. Nadie se va.', '♪ A MI MANEEERAAA ♪ ...aplaudan, que estoy mirando quién aplaude.', 'El karaoke es voluntario. Como las horas extra. Como venir mañana.', 'Puntaje: 100. Siempre saco 100. La máquina trabaja para mí.'] },
      acople: { type: 'radial', count: 4, n: 12, speed: 105, proj: { col: '#ff77a8', col2: '#ffffff', w: 4, h: 4 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['estribillo', 'balada', 'graves', 'horasextra'] },
      { until: .33, speed: 1.15, say: '¡Segunda ronda! ¡Invita la empresa! (se descuenta del sueldo)', pattern: ['agudos', 'coro', 'afteroffice', 'balada', 'acople', 'horasextra'] },
      { speed: 1.3, say: '¡¡BIS!! ¡¡NADIE SE VA HASTA QUE YO ME CANSE!!', pattern: ['acople', 'agudos', 'horasextra', 'balada', 'graves', 'coro', 'afteroffice', 'estribillo'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Neo-Tokio, hoy. Neón, trenes puntuales al segundo y una expendedora cada tres metros.' },
      { who: 'Viajero', text: 'Son las doce menos veinte y las oficinas siguen llenas. Nadie se va antes que el jefe. El jefe no se va.' },
      { who: 'Viajero', text: 'La pieza asiática alimenta la máquina de karaoke del Presidente de la corporación. Obvio.' }
    ],
    bossIntro: [
      { who: 'Presidente', spr: 'gerente', color: '#ff77a8', text: '¡Bienvenido al karaoke de integración! La asistencia es voluntaria. Tomé lista.' },
      { who: 'Viajero', text: 'Solo vengo por la pieza. ¿Tus empleados pueden irse a dormir?' },
      { who: 'Presidente', spr: 'gerente', color: '#ff77a8', text: '¿Dormir? ¡Recién voy por el tema tres de cuarenta! ¡¡MÚSICA, MAESTRO!!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El robot se quedó sin batería en la mitad de una balada. Fue el silencio más aplaudido del año.' },
      { who: 'Viajero', text: 'Los oficinistas se fueron a su casa. De día. Uno vio el sol y preguntó qué era.' },
      { who: 'Viajero', text: 'Pieza asiática recuperada. Y me regalaron una figurita repetida. Trabajín. Por supuesto.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      g: { enemy: 'gerente' }, t: { enemy: 'mascota' }, e: { enemy: 'expendedora' }, r: { enemy: 'robotRamen' }, q: { enemy: 'dronIdol' }, K: { enemy: 'trabajin' },
      N: { npc: 'oficinista' }, G: { npc: 'otaku' }, S: { npc: 'otaku2' }, W: { weapon: 'rifle' }, A: { weapon: 'ametralladora' }, R: { weapon: 'laser', rift: true },
      '1': { decor: 'neon' }, '2': { decor: 'antena' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P  & N    1     W    t     2',
        '#*',
        '#*'
      ],
      [
        '        q             c      q',
        '      ==        ===',
        '   t       g        e    r t h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '                 c',
        '         q        g      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB r BBBBB  t  e   1',
        '#*',
        '#*'
      ],
      [
        '          q          c    q',
        '               g    ===',
        '       ===    ===',
        '   F   r   ^^ t  ^^^   t   e   G',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  g     q      e       q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '              c    g',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   t    BBBBBBBBBBBBBBB  r t g A',
        '#*',
        '#*'
      ],
      [
        '      q        c       c   q',
        '       ===    ===     ===',
        '  t    g    ^^    K    r e S   2',
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
