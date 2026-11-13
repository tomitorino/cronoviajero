// ETAPA N2 — FAR WEST (rama Norteamérica). Sátira del sheriff corrupto y del magnate del ferrocarril;
// los pueblos originarios y los obreros de la vía son aliados, nunca enemigos.
CV.stage({
  id: 'farwest', tech: 6,
  title: 'FAR WEST', subtitle: '1870. La ley llega en tren. Y cobra pasaje.',
  bg: {
    sky: ['#e8703a', '#f4a050', '#fbd088', '#fff0c8'],
    layers: [
      { gen: 'sun', x: 250, y: 60, r: 18, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 4, y: 16, h: 40, color: '#fbe0b0', speed: .04, drift: 3 },
      { gen: 'mesas', n: 3, base: 186, h: 60, color: '#b8603a', shade: '#8a4428', speed: .08 },
      { gen: 'hills', base: 190, amp: 12, color: '#c88a4a', top: '#dca05a', f1: 2, f2: 5, speed: .22 },
      { gen: 'flat', base: 204, color: '#a8703a', top: '#c88a4a', speed: .4 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#b87a44', dark: '#7a4a24', light: '#d89a5a', top: '#d8a05a', topLight: '#f0c078', topDark: '#8a5a2c', topH: 2 },
    'B': { pattern: 'wood', base: '#8a6238', dark: '#4e3418', light: '#aa8252' },
    '=': { base: '#7a5230', dark: '#4a3018', light: '#a07a4a' },
    '^': { base: '#5a9a3a', dark: '#2d6e2d', light: '#a7f070' }
  },
  music: {
    bpm: 108, drums: 'k..sk.s.k..sk.ss',
    tracks: [
      { wave: 'square', vol: .05, notes: 'a4 _ d5 _ a4 _ d5 _ a4 _ f4 g4 d4 _ _ _ a4 _ d5 _ a4 _ d5 _ c5 _ a4 g4 a4 _ _ _' },
      { wave: 'triangle', vol: .13, notes: 'd2 _ a2 d2 _ a2 d2 _ f2 _ c2 f2 d2 _ a1 _ d2 _ a2 d2 _ a2 d2 _ c2 _ g2 c2 d2 _ _ _' }
    ]
  },
  ambient: { col: ['#f0c078', '#d89a5a'], rate: .4, vy: 6, vx: -80, life: 3 },
  items: { porotos: { name: 'Porotos en lata', heal: 2, spr: 'i_porotos' } },
  heals: ['porotos', 'pastel'],
  collectible: { name: 'Dólar de plata', spr: 'c_denario' },

  sprites: {
    ayudante: { from: 'cowboy', swap: { r: 'j', g: 'e', i: 'y' } },
    pistolero: { from: 'cowboy', swap: { h: '0', g: 'f', r: '0' } },
    obreroVia: { from: 'cowboy', swap: { h: 'i', g: 'a', r: 'j' } },
    cazarecompensas: { from: 'cowboy', swap: { h: 'u', g: 'n', r: 'y' } },
    buitre: {
      rows: ['................', '', '', '', 'ff..........ff', '.fff......fff', '..ffffjjffff', '...ffffj0fff', '....ffffoff', '.....ffff', '......ff', '', '', '', '', ''],
      anim: { walk: [{ 4: '', 5: '..ff......ff', 6: '.fffffjjfffff' }, {}] }
    },
    cactus: { rows: ['................', '......66', '.....6666', '.....6666', '.66..6666', '.66..6666..66', '.66..6666..66', '.6666666..66', '..666666..66', '.....66666666', '.....666666', '.....6666', '.....6666', '.....6666', '.....6666', '.....6666'] },
    trenBlindado: {
      rows: [
        '................................', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '.....ss',
        '....ssss......fff',
        '.....ff.......fff....yy',
        '.....ff......fffff...yy',
        '..fffffffffffffffffffffffff',
        '..feeeeeeeeeeeeeeeeeeeeeeeeff',
        '..fe0ye0ye0ye0yeeeejjeeeeeeeff',
        '..feeeeeeeeeeeeeeeej0jeeeeeeeff',
        '..feyeeeeeeyeeeeeeeeyyeeeeeeeeff',
        '..fffffffffffffffffffffffffffffr',
        '..feeeeeeeeeeeeeeeeeeeeeeeeeeefr',
        '.rfff000fff000fff000fff000ffffr',
        'rrff0ddd0f0ddd0f0ddd0f0ddd0fffr',
        '.r.f0d0d0f0d0d0f0d0d0f0d0d0ff',
        '....0ddd0.0ddd0.0ddd0.0ddd0',
        '.....000...000...000...000'
      ],
      anim: {
        walk: [{ 15: '....sss', 16: '...sssss', 29: '.r.f0ddd0f0ddd0f0ddd0f0ddd0ff', 30: '....0d0d0.0d0d0.0d0d0.0d0d0' }, {}],
        a: [{ 22: '..fe0oe0oe0oe0oeeeejjeeeeeeeff', 23: '..feeeeeeeeeeeeeeeej0jeeeeeeeffy' }]
      }
    },
    p_dinamita: { rows: ['....y.', '...c..', '.rrrr.', '.rrrr.', '.rrrr.', '.rrrr.', '.rrrr.', '......'] },
    i_porotos: { rows: ['..........', '...ssss...', '..s2222s..', '..s2l22s..', '..s22l2s..', '..s2222s..', '..ssssss..', '..........', '..........', '..........'] }
  },

  enemies: {
    bandido: { sprite: 'cowboy', ai: 'ranged', hp: 6, speed: 18, sight: 160, cooldown: 2.4, proj: { speed: 230, w: 5, h: 2, col: '#ffcd75', sfx: 'rifle' }, drop: { weapon: 'rifle', chance: .4 }, barks: ['¡Arriba las manos! ...¿Las mías también? Nunca sé.', 'Asalto bancos. El banco asalta al pueblo. Soy clase media.', 'Me busca la ley. Para cobrarme la comisión.'] },
    ayudante: { sprite: 'ayudante', ai: 'chase', hp: 8, speed: 26, chase: 56, jump: 230, sight: 110, barks: ['¡En nombre de la ley! La ley es mi tío.', 'El sheriff dice que estás arrestado. Todavía no decidió por qué.', 'La placa me la dieron con el sobre.'] },
    pistolero: { sprite: 'pistolero', ai: 'charger', hp: 7, speed: 24, charge: 150, tele: .85, rest: 1.1, sight: 120, animSpeed: 12, barks: ['¡Duelo al mediodía! ...¿Qué hora es? Uy.', 'Este pueblo es chico para los dos. Y para el ferrocarril.'] },
    dinamitero: { sprite: 'cazarecompensas', ai: 'ranged', hp: 6, speed: 16, sight: 140, cooldown: 3, proj: { speed: 120, grav: 300, spr: 'p_dinamita', w: 6, h: 8, sfx: 'bang' }, barks: ['El ferrocarril pasa por acá. Y por tu casa. Sobre todo por tu casa.', '¡Abran paso al progreso! ¡El progreso explota!'] },
    buitre: { sprite: 'buitre', ai: 'flyer', gun: false, hp: 3, speed: 56, hover: 6, sight: 150, sightY: 100, animSpeed: 10 },
    cazarecompensas: { sprite: 'cazarecompensas', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 74, speed: 24, chase: 52, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'rifle' }, barks: ['¡SE BUSCA: VOS! ¡Recompensa: lo que el sheriff no se quede!', '¡Vivo o muerto! ¡Vivo paga más, pero es más trabajo!'] }
  },

  npcs: {
    rastreadora: { sprite: 'guia', gift: { heal: 'porotos' }, lines: ['Firmamos doce tratados con ellos. Cumplieron cero. Son constantes, eso sí.', 'Dicen que "descubrieron" estas tierras. Nosotros ya sabíamos dónde estaban.'] },
    obrero: { sprite: 'obreroVia', gift: { heal: 'pastel' }, lines: ['Puse diez mil durmientes de vía. El dueño del ferrocarril salió en la foto. Yo, no.', 'Ojo con los de la dinamita: tiran en arco. Y los pistoleros embisten derecho.'] },
    rastreadora2: { sprite: 'guia', gift: { ammo: true }, lines: ['El tren del sheriff es puro blindaje: las balas le rebotan bastante. Pegale de cerca.', 'Cuando el sheriff se pone a contar la plata de los sobornos, frena. Ese es tu momento.'] }
  },

  boss: {
    name: 'EL TREN BLINDADO DEL SHERIFF', mul: { melee: 1.4, ranged: .75 }, sprite: 'trenBlindado', scale: 2, w: 58, h: 32, hp: 140, walk: 14, rest: 1,
    attacks: {
      expreso: { type: 'charge', speed: 220, tele: .9, rest: 1.4 },
      revolveres: { type: 'shoot', count: 4, every: .3, n: 1, speed: 180, sfx: 'rifle', proj: { col: '#ffcd75', col2: '#ffffff', w: 5, h: 3 } },
      dinamita: { type: 'shoot', aim: 'arc', count: 4, every: .45, n: 1, sfx: 'bang', proj: { spr: 'p_dinamita', w: 6, h: 8, grav: 300, bounce: 1, life: 5 } },
      vapor: { type: 'lines', kinds: ['floor', 'pillar'], n: 4, every: .4, warn: .85, live: .5, col: '#f4f4f4', thick: 6 },
      comisaria: { type: 'summon', ids: ['ayudante', 'bandido', 'buitre'], n: 2, max: 3 },
      sobornos: { type: 'taunt', dur: 2.8, say: ['Un momento, que cuento los sobres. Uno para mí, otro para mí...', 'Acá la ley soy yo. Y el juez. Y el dueño del saloon. Y del tren.', 'El ferrocarril me paga para mirar para otro lado. Ya miré para todos.', '"Se busca" dice el cartel. Lo imprimo yo. Cobro por sacarte.'] },
      carbon: { type: 'rain', count: 8, every: .24, speed: 170, proj: { col: '#333c57', col2: '#566c86', w: 6, h: 6 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['revolveres', 'sobornos', 'vapor', 'expreso'] },
      { until: .33, speed: 1.12, say: '¡Más carbón! ¡Y más ayudantes! ¡Son todos primos!', pattern: ['dinamita', 'carbon', 'comisaria', 'sobornos', 'expreso', 'vapor'] },
      { speed: 1.25, say: '¡¡ESTE TREN NO PARA!! ¡¡Tampoco tiene frenos, ahorramos ahí!!', pattern: ['expreso', 'carbon', 'dinamita', 'sobornos', 'revolveres', 'comisaria', 'vapor'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Far West, 1870. Polvo, cactus y un pueblo con más carteles de "Se busca" que habitantes.' },
      { who: 'Viajero', text: 'El sheriff trabaja para el dueño del ferrocarril. El juez también. El cura está en duda.' },
      { who: 'Viajero', text: 'La pieza de la máquina es el silbato del tren blindado. Suena desafinado en tres épocas.' }
    ],
    bossIntro: [
      { who: 'Sheriff', spr: 'ayudante', color: '#ffe14a', text: '¡Alto, forastero! Este pueblo tiene una sola ley: la que me conviene hoy.' },
      { who: 'Viajero', text: 'Vengo por el silbato. ¿Cuánto sale no pelear?' },
      { who: 'Sheriff', spr: 'ayudante', color: '#ffe14a', text: 'Me ofende que quieras sobornarme... con tan poco. ¡MAQUINISTA!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El tren descarriló justo frente a la cárcel. El sheriff inauguró la celda que él mismo mandó hacer.' },
      { who: 'Viajero', text: 'Los obreros se quedaron con las vías. Ahora el tren para donde ellos dicen. Y salen en la foto.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      a: { enemy: 'bandido' }, y: { enemy: 'ayudante' }, p: { enemy: 'pistolero' }, d: { enemy: 'dinamitero' }, q: { enemy: 'buitre' }, K: { enemy: 'cazarecompensas' },
      N: { npc: 'rastreadora' }, G: { npc: 'obrero' }, S: { npc: 'rastreadora2' }, W: { weapon: 'rifle' }, A: { weapon: 'mosquete' }, R: { weapon: 'ametralladora', rift: true },
      '1': { decor: 'cactus' }, '2': { decor: 'huesos' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    N    1     W    y     2',
        '#*',
        '#*'
      ],
      [
        '          q          c',
        '               a    ===',
        '       ===    ===',
        '   1   p   ^^ y  ^^^   y   d   1',
        '#*',
        '#*'
      ],
      [
        '        q             c      q',
        '      ==        ===',
        '   y       a        d    p   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   F    BBBBBBBBBBBBBBB  y p   G',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '                  a      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB p BBBBB  y  d   A',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a     q      d       q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '      q        c       c   q',
        '       ===    ===     ===',
        '  y    a    ^^    K    p a S   2',
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
