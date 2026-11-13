// ETAPA F2 — FUTURO ESPACIAL (tramo final). Sátira de la burocracia galáctica y del turismo espacial de magnates.
CV.stage({
  id: 'espacio', tech: 9,
  title: 'FUTURO ESPACIAL', subtitle: '3200. En el espacio nadie escucha tus quejas.',
  bg: {
    sky: ['#05060f', '#0d1021', '#1a1c3c', '#2a1e4d'],
    layers: [
      { gen: 'stars', n: 110, maxY: 190, speed: .01 },
      { gen: 'sun', x: 290, y: 60, r: 30, color: '#3b5dc9', color2: '#41a6f6', speed: .02 },
      { gen: 'sun', x: 80, y: 40, r: 9, color: '#c2c3c7', color2: '#f4f4f4', speed: .03 },
      { gen: 'mountains', base: 190, amp: 40, color: '#3a3a52', n: 9, speed: .1 },
      { gen: 'hills', base: 202, amp: 12, color: '#56566e', top: '#7a7a94', f1: 2, f2: 5, speed: .3 }
    ]
  },
  tiles: {
    '#': { pattern: 'stone', base: '#7a7a94', dark: '#4a4a62', light: '#a0a0b8', top: '#b0b0c8', topLight: '#d8d8e8', topDark: '#4a4a62', topH: 2 },
    'B': { pattern: 'metal', base: '#566c86', dark: '#333c57', light: '#94b0c2' },
    '=': { base: '#41a6f6', dark: '#29366f', light: '#73eff7' },
    '^': { base: '#ff77a8', dark: '#7e2553', light: '#ffffff' }
  },
  music: {
    bpm: 132, drums: 'k.h.s.h.k.hhs.h.',
    tracks: [
      { wave: 'square', vol: .05, notes: 'e5 _ b4 e5 _ g5 f#5 _ e5 _ b4 d5 _ c#5 b4 _ a4 _ e5 a5 _ g5 f#5 _ e5 _ d5 b4 _ e5 _ _' },
      { wave: 'triangle', vol: .13, notes: 'e2 _ e2 _ e3 _ e2 _ g2 _ g2 _ g3 _ g2 _ a2 _ a2 _ a3 _ a2 _ b2 _ b2 _ b3 _ b2 _' }
    ]
  },
  ambient: { col: ['#ffffff', '#73eff7'], rate: .06, vy: -6, vx: 10, life: 9 },
  items: { gelatina: { name: 'Gelatina de astronauta', heal: 3, spr: 'i_chocolate' } },
  heals: ['ramen', 'gelatina'],
  collectible: { name: 'Estrellita', spr: 'c_estrella' },

  sprites: {
    alien: {
      rows: [
        '................',
        '.....55555',
        '....5555555',
        '...555555555',
        '...500555005',
        '...500555005',
        '....5555555',
        '.....55055',
        '......555',
        '....7777777...b',
        '...577777775..b',
        '...5.77777.555e',
        '.....77777',
        '.....55.55',
        '.....55.55',
        '....555.555'
      ],
      anim: { walk: [{ 13: '....55...55', 14: '....55...55', 15: '...555...555' }, {}] }
    },
    alienTirador: { from: 'alien', swap: { '5': 'm', '7': '8' } },
    limpiador: { from: 'alien', swap: { '7': 'o' } },
    magnate: { from: 'turista', swap: { m: 'c', p: 's', '5': 'd', i: 'c' } },
    astronauta: { from: 'soldado', swap: { q: 'c', e: 's', h: 'd', j: 'v' } },
    ovni: {
      rows: [
        '................', '', '', '',
        '......bbbb',
        '.....bvvvvb',
        '....bv5vv5vb',
        '..ssssssssssss',
        '.sdsysdsysdsyss',
        '..ssssssssssss',
        '....ee....ee',
        '', '', '', '', ''
      ],
      anim: { walk: [{ 8: '.sysdsysdsysdss' }, {}] }
    },
    nodriza: {
      rows: [
        '................................', '', '', '',
        '............bbbbbbbb',
        '..........bbvvvvvvvvbb',
        '.........bvvv5vvvv5vvvb',
        '........bvvvv5vvvv5vvvvb',
        '.......bvvvvvvvvvvvvvvvvb',
        '....ssssssssssssssssssssssss',
        '..ssssssssssssssssssssssssssss',
        '.ssdssyssdssyssdssyssdssyssdsss',
        'sssssssssssssssssssssssssssssss',
        '.eeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        '...eeeeeeeeeeeeeeeeeeeeeeeeee',
        '......eeee..eeeeeeee..eeee',
        '.......ee....e0000e....ee',
        '..............e00e',
        '', '', '', '', '', '', '', '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 11: '.ssyssdssyssdssyssdssyssdssysss' }, {}],
        a: [{ 16: '.......ee....ebbbbe....ee', 17: '..............ebbe', 18: '..............bbbb', 19: '.............bbbbbb' }]
      }
    },
    p_form: { rows: ['cccccc', 'c0000c', 'cccccc', 'c000cc', 'cccccc', 'cc00rc', 'cccccc'] },
    c_estrella: { rows: ['..........', '....yy....', '....yy....', '.yyyyyyyy.', '..yyyyyy..', '...yyyy...', '..yy..yy..', '.yy....yy.', '..........', '..........'] }
  },

  enemies: {
    alien: { sprite: 'alien', ai: 'chase', hp: 11, speed: 28, chase: 60, jump: 240, sight: 120, barks: ['Venimos en paz. Es un decir.', 'Llévame con tu líder. O con el de mesa de entradas.', '¡Glorp! (es una mala palabra)'] },
    alienTirador: { sprite: 'alienTirador', ai: 'ranged', hp: 9, speed: 20, sight: 160, cooldown: 2, proj: { col: '#a7f070', col2: '#ffffff', w: 8, h: 2, speed: 210, sfx: 'laser' }, drop: { weapon: 'laser', chance: .5 }, barks: ['¡Pium pium! (lo dice con la boca)'] },
    ovni: { sprite: 'ovni', ai: 'flyer', hp: 6, speed: 60, hover: 40, keep: 46, sight: 160, sightY: 120, cooldown: 2.2, animSpeed: 14, proj: { col: '#73eff7', col2: '#ffffff', w: 4, h: 4, speed: 130 } },
    magnate: { sprite: 'magnate', ai: 'ranged', hp: 9, speed: 16, sight: 140, cooldown: 2.6, proj: { speed: 120, grav: 280, w: 6, h: 6, col: '#ffe14a', col2: '#ffffff' }, barks: ['¡No es turismo, es EXPLORACIÓN! Con jacuzzi.', 'Pagué una fortuna por once minutos de esto.', '¿Mis impuestos? Están en órbita.', 'Voy a colonizar Marte. Acá ya no quedó a quién no pagarle.'] },
    aduanero: { sprite: 'robopoli', ai: 'ranged', hp: 13, speed: 20, sight: 140, cooldown: 2, proj: { spr: 'p_form', w: 6, h: 7, speed: 150 }, barks: ['¿ALGO QUE DECLARAR? ¿FRUTAS? ¿PARADOJAS?', 'FORMULARIO X-9, VENTANILLA 4.000.000.', 'SU VISA TEMPORAL VENCIÓ EN EL AÑO 12.'] },
    inspector: { sprite: 'mecha', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 100, speed: 26, chase: 58, sight: 160, sightY: 70, paradox: false, barks: ['INSPECCIÓN ADUANERA GALÁCTICA.', 'ESA MÁQUINA DEL TIEMPO NO PAGÓ PATENTE.'] }
  },

  npcs: {
    astronauta: { sprite: 'astronauta', gift: { heal: 'gelatina' }, lines: ['Me dijeron "es un pequeño paso". Hace seis horas que hago la cola de migraciones.', 'La gelatina de astronauta no tiene gusto a nada. Pero cura.'] },
    limpiador: { sprite: 'limpiador', gift: { ammo: true }, lines: ['Trescientos años limpiando la nave nodriza. Pedí aumento: "lo estamos evaluando".', 'La nave esquiva mucho. Esperá a que atienda el teléfono: ahí se queda quieta.'] },
    limpiador2: { sprite: 'limpiador', gift: { heal: 'ramen' }, lines: ['Los magnates vienen de paseo, dejan todo sucio y dicen que "abrieron camino".', 'Ojo con el rayo: primero marca el piso, después baja.'] }
  },

  boss: {
    name: 'LA NAVE NODRIZA', mul: { melee: 0.9, ranged: 1.2 }, sprite: 'nodriza', scale: 2, w: 56, h: 30, hp: 190, mode: 'hover', rest: .8,
    anchors: [[.8, .4], [.2, .4], [.5, .5], [.65, .3], [.35, .3], [.5, .34]],
    attacks: {
      laseres: { type: 'shoot', count: 5, every: .22, n: 1, speed: 200, sfx: 'laser', proj: { col: '#a7f070', col2: '#ffffff', w: 8, h: 2 } },
      abanico: { type: 'shoot', count: 3, every: .5, n: 5, spread: .3, speed: 130, sfx: 'laser', proj: { col: '#73eff7', col2: '#ffffff', w: 5, h: 5 } },
      abduccion: { type: 'lines', kinds: ['beam', 'pillar'], n: 6, every: .28, warn: .75, live: .55, col: '#73eff7', thick: 7, height: 110 },
      barrido: { type: 'lines', kinds: ['floor', 'high', 'diag'], n: 5, every: .32, warn: .8, live: .5, col: '#ff77a8', thick: 5 },
      meteoritos: { type: 'rain', count: 10, every: .2, speed: 185, proj: { col: '#8b5a2b', col2: '#ffa300', w: 8, h: 8 } },
      flota: { type: 'summon', ids: ['ovni', 'alien', 'alienTirador'], n: 2, max: 4 },
      telefono: { type: 'taunt', dur: 2.5, say: ['Su invasión es importante para nosotros. Por favor, aguarde.', 'Para ser abducido, marque 1. Para reclamos, no hay opción.', 'Todos nuestros tentáculos están ocupados.', 'Esta conquista puede ser grabada para mejorar la calidad.'] },
      pulso: { type: 'radial', count: 3, n: 12, speed: 105, proj: { col: '#a7f070', col2: '#ffffff', w: 5, h: 5 } },
      embestida: { type: 'charge', speed: 210, tele: .7, dy: -4 }
    },
    phases: [
      { until: .7, speed: 1, pattern: ['laseres', 'abduccion', 'telefono', 'meteoritos', 'abanico'] },
      { until: .4, speed: 1.15, say: 'DERIVANDO SU RECLAMO AL SECTOR ANIQUILACIÓN.', pattern: ['flota', 'pulso', 'laseres', 'telefono', 'barrido', 'embestida'] },
      { speed: 1.3, say: '¡¡NIVEL DE SATISFACCIÓN DEL CLIENTE: CERO!!', pattern: ['pulso', 'abduccion', 'abanico', 'telefono', 'embestida', 'meteoritos', 'flota', 'barrido'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Año 3200. Una luna, una estación espacial y una cola de migraciones de nueve kilómetros.' },
      { who: 'Viajero', text: 'La humanidad conquistó las estrellas y lo primero que instaló fue una ventanilla.' },
      { who: 'Viajero', text: 'La anteúltima pieza está en la nave nodriza. Retenida en la aduana, obvio.' }
    ],
    bossIntro: [
      { who: 'Nave Nodriza', spr: 'ovni', color: '#73eff7', text: 'BIENVENIDO A LA NAVE NODRIZA. SU TURNO ES EL 8.431.002.' },
      { who: 'Viajero', text: 'Vengo a retirar una pieza de máquina del tiempo. Es mía.' },
      { who: 'Nave Nodriza', spr: 'ovni', color: '#73eff7', text: 'PARA RETIRAR, PRESENTE EL COMPROBANTE DE HABERLA PERDIDO. EN SU DEFECTO: RAYOS.' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'La nave cayó. El de limpieza quedó a cargo: primera medida, aumento para todos.' },
      { who: 'Viajero', text: 'Tengo casi todas las piezas. Falta una. Está en el Fin del Tiempo. Suena tranquilo.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      k: { enemy: 'alien' }, a: { enemy: 'alienTirador' }, b: { enemy: 'magnate' }, q: { enemy: 'ovni' }, d: { enemy: 'aduanero' }, K: { enemy: 'inspector' },
      N: { npc: 'astronauta' }, G: { npc: 'limpiador' }, S: { npc: 'limpiador2' }, W: { weapon: 'laser' }, A: { weapon: 'ametralladora' },
      '1': { decor: 'antena' }, '2': { decor: 'neon' }
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
        '   k       a        b    d k h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   k    BBBBBBBBBBBBBBB  d b k 2',
        '#*',
        '#*'
      ],
      [
        '          q          c    q',
        '               a    ===',
        '       ===    ===',
        '   F   k   ^^ d  ^^^   k   b   G',
        '#*',
        '#*'
      ],
      [
        '            c           c',
        '      ==       ==      ===',
        '  a     q      b       q      h',
        '####    ####    ###      ######',
        '####    ####    ###      ######'
      ],
      [
        '                 c',
        '         K        a',
        '   BB  BBBBB   BBBBB     q',
        '   BB  BBBBB d BBBBB  k  k   A',
        '#*',
        '#*'
      ],
      [
        '      q        c       c   q',
        '       ===    ===     ===',
        '  k    a  ^^   d  ^^   k a S   2',
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
