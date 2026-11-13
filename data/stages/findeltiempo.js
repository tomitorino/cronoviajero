// ETAPA F3 — EL FIN DEL TIEMPO (final del juego). Todas las épocas mezcladas: los enemigos vienen de las demás etapas.
// El jefe final tiene 'revive': al llegar a 0 vuelve "recauchutado" con la mitad de la vida, más rápido y con otro patrón.
CV.stage({
  id: 'findeltiempo', tech: 9,
  title: 'EL FIN DEL TIEMPO', subtitle: '??:??. Todo pasa a la vez. Llegás tarde igual.',
  bg: {
    sky: ['#1a0a2e', '#4a1e6d', '#b13e73', '#ffcd75'],
    layers: [
      { gen: 'stars', n: 90, maxY: 150, speed: .01 },
      { gen: 'sun', x: 190, y: 70, r: 34, color: '#ff77a8', color2: '#1a0a2e', speed: .01 },
      { gen: 'volcano', x: 60, base: 190, h: 70, color: '#3a1e4d', lava: '#ff77a8', smoke: '#6a3a7a', speed: .05 },
      { gen: 'pyramids', n: 2, base: 190, h: 80, color: '#6a3a7a', shade: '#4a2a5a', speed: .08 },
      { gen: 'temples', n: 2, base: 194, h: 34, color: '#b78cff', ground: '#3a1e4d', speed: .16 },
      { gen: 'obelisk', x: 300, base: 198, h: 96, color: '#73eff7', win: '#29366f', speed: .22 },
      { gen: 'city', base: 206, min: 18, max: 56, color: '#1a0a2e', win: ['#ff77a8', '#73eff7', '#ffe14a'], lit: .3, gap: 8, speed: .4, seed: 11 }
    ]
  },
  tiles: {
    '#': { pattern: 'metal', base: '#4a2a6a', dark: '#2a1640', light: '#7a4a9a', top: '#b78cff', topLight: '#e0c8ff', topDark: '#2a1640', topH: 2 },
    'B': { pattern: 'brick', base: '#7e2553', dark: '#4a1030', light: '#b13e73' },
    '=': { base: '#73eff7', dark: '#257179', light: '#ffffff' },
    '^': { base: '#ff77a8', dark: '#7e2553', light: '#ffffff' }
  },
  music: {
    bpm: 140, drums: 'k.hsk.hskkhsk.ss',
    tracks: [
      { wave: 'sawtooth', vol: .04, notes: 'd5 _ a4 d5 f5 _ e5 d5 c5 _ g4 c5 e5 _ d5 c5 a#4 _ f4 a#4 d5 _ c5 a#4 a4 _ c#5 e5 a5 _ g5 e5' },
      { wave: 'triangle', vol: .13, notes: 'd2 _ d3 _ d2 _ d3 _ c2 _ c3 _ c2 _ c3 _ a#1 _ a#2 _ a#1 _ a#2 _ a1 _ a2 _ a1 _ a2 _' }
    ]
  },
  ambient: { col: ['#ff77a8', '#73eff7', '#ffe14a', '#ffffff'], rate: .3, vy: -20, vx: 0, life: 4 },
  heals: ['mate', 'asado'],
  collectible: { name: 'Segundo perdido', spr: 'c_reloj' },

  sprites: {
    entidad: {
      rows: [
        '................................', '', '',
        '...........mmmmmmmmmm',
        '.........mmttttttttttmm',
        '.......mmttttttccttttttmm',
        '......mtttttttttcttttttttm',
        '.....mttttttttttcttttttttb',
        '....mtttttttwwwwwwwwtttttttb',
        '....mtttttwwwwwwwwwwwwtttttb',
        '...mtttttwwwwwmmmmwwwwwtttttb',
        '...mttctwwwwwm0000mwwwwwtcttb',
        '...mttttwwwwwm0000mwwwwwttttb',
        '...mttttwwwwwm0000mwwwwwttttb',
        '...mtttttwwwwwmmmmwwwwwtttttb',
        '....mtttttwwwwwwwwwwwwtttttb',
        '....mtttttttwwwwwwwwtttttttb',
        '.....mttttttttttcttttttttb',
        '......mtttttttttcttttttttb',
        '.......mmttttttccttttttbb',
        '.........mmttttttttttbb',
        '...........mmmmmbbbbb',
        '.....m.......t.t.......b',
        '....m........t..t.......b',
        '..............t..t',
        '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 11: '...mttctwwwwwwm0000mwwwwtcttb', 12: '...mttttwwwwwwm0000mwwwwttttb', 13: '...mttttwwwwwwm0000mwwwwttttb' }, {}],
        a: [{ 11: '...mttctwwwwwmrrrrmwwwwwtcttb', 12: '...mttttwwwwwmr00rmwwwwwttttb', 13: '...mttttwwwwwmrrrrmwwwwwttttb' }]
      }
    },
    p_reloj: { rows: ['.cccc.', 'cc0ccc', 'cc0ccc', 'cc00cc', 'cccccc', '.cccc.'] },
    c_reloj: { rows: ['..........', '...bbbb...', '..bccccb..', '.bcc0cccb.', '.bcc0cccb.', '.bcc00ccb.', '.bccccccb.', '..bccccb..', '...bbbb...', '..........'] }
  },

  npcs: {
    yo1: { sprite: 'hero', gift: { heal: 'asado' }, lines: ['Hola. Soy vos, de acá a un rato. Sí, sobrevivís. Bueno, yo sobreviví. Vos no sé.', 'Tomá un choripán. Me lo dio otro yo. No preguntes de dónde salió el primero.'] },
    yo2: { sprite: 'hero', gift: { ammo: true }, lines: ['Soy vos de más adelante todavía. Consejo: cuando parezca que ganaste, NO festejes.', 'En serio. No festejes. Yo festejé.'] },
    yo3: { sprite: 'hero', gift: { heal: 'mate' }, lines: ['Soy vos de ayer. Vine a ver cómo terminaba. ¿Termina bien? No me digas. Decime. No.', 'La Entidad se queda quieta cuando intenta entender sus propias reglas. Ahí dale.'] }
  },

  boss: {
    name: 'LA ENTIDAD DE LA PARADOJA', sprite: 'entidad', scale: 2, w: 50, h: 44, hp: 250, mode: 'hover', rest: .95, dodgeChance: .5, minionEvery: 11, minionHeal: .4, healEvery: 12, ammoEvery: 8,
    anchors: [[.8, .42], [.2, .42], [.5, .5], [.66, .3], [.34, .3], [.5, .32], [.82, .56], [.18, .56]],
    attacks: {
      relojes: { type: 'shoot', count: 3, every: .4, n: 3, spread: .3, speed: 150, proj: { spr: 'p_reloj', w: 6, h: 6, spin: true } },
      rafaga: { type: 'shoot', count: 5, every: .18, n: 1, speed: 210, sfx: 'laser', proj: { col: '#ff77a8', col2: '#ffffff', w: 6, h: 3 } },
      rebote: { type: 'shoot', aim: 'arc', count: 3, every: .4, n: 1, proj: { spr: 'p_reloj', w: 6, h: 6, grav: 300, bounce: 2, life: 5, spin: true } },
      grietas: { type: 'lines', kinds: ['beam', 'diag', 'zig'], n: 5, every: .34, warn: .9, live: .5, col: '#ff77a8', thick: 6 },
      ayerhoy: { type: 'lines', kinds: ['floor', 'high', 'pillar'], n: 5, every: .34, warn: .9, live: .55, col: '#73eff7', thick: 6, height: 100 },
      lluvia: { type: 'rain', count: 9, every: .22, speed: 175, proj: { spr: 'p_reloj', w: 6, h: 6, spin: true } },
      epocas: { type: 'summon', ids: ['raptor', 'momia', 'caballero', 'granadero', 'turista', 'dron', 'alien'], n: 2, max: 4 },
      espiral: { type: 'radial', count: 3, n: 10, speed: 95, every: .65, proj: { col: '#b78cff', col2: '#ffffff', w: 5, h: 5 } },
      salto: { type: 'charge', speed: 210, tele: .85, dy: -4 },
      duda: { type: 'taunt', dur: 3, say: ['Si te derroto ayer, ¿hoy peleamos? Esperá, que lo anoto.', 'Yo ya gané esta pelea mañana. Lo que no sé es cómo.', 'Esto ya pasó. O va a pasar. Pasame el almanaque.', 'Soy mi propio abuelo. No hagas preguntas.'] }
    },
    phases: [
      { until: .7, speed: 1, pattern: ['relojes', 'grietas', 'duda', 'lluvia', 'rafaga', 'epocas'] },
      { until: .35, speed: 1.08, say: 'INTERESANTE. PROBEMOS TODO A LA VEZ.', pattern: ['espiral', 'ayerhoy', 'rebote', 'duda', 'salto', 'rafaga', 'epocas', 'grietas'] },
      { speed: 1.16, say: '¡¡EL TIEMPO SE ACABA!! LITERALMENTE. ESTAMOS EN EL FINAL.', pattern: ['espiral', 'salto', 'lluvia', 'duda', 'grietas', 'relojes', 'ayerhoy', 'epocas', 'rebote'] }
    ],
    revive: {
      hp: .5, speed: 1.12, name: 'LA ENTIDAD (RECAUCHUTADA)', banner: '¡¡VOLVIÓ RECAUCHUTADA!!',
      say: '¿CREÍSTE QUE ERA EL FINAL? RETROCEDÍ CINCO MINUTOS. TENGO GARANTÍA EXTENDIDA.',
      pattern: ['espiral', 'rafaga', 'grietas', 'salto', 'duda', 'lluvia', 'epocas', 'ayerhoy', 'rebote', 'relojes', 'salto']
    }
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'El Fin del Tiempo. Hay una pirámide al lado de un obelisco al lado de un volcán. Urbanismo cero.' },
      { who: 'Viajero', text: 'Acá vino a parar todo lo que desordené. Y lo que voy a desordenar. Y lo que ya... me mareé.' },
      { who: 'Viajero', text: 'La última pieza la tiene la Entidad de la Paradoja. Que, técnicamente, creé yo. Perdón.' }
    ],
    bossIntro: [
      { who: 'La Entidad', spr: 'entidad', color: '#ff77a8', text: 'VIAJERO. CADA ARMA FUERA DE ÉPOCA, CADA ATAJO... TODO ESO SOY YO.' },
      { who: 'Viajero', text: 'O sea que sos culpa mía.' },
      { who: 'La Entidad', spr: 'entidad', color: '#ff77a8', text: 'SOY TU FACTURA. Y VENGO CON INTERESES. TE VOY A BORRAR DE LA HISTORIA... AYER.' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: '...¿Ahora sí? ¿Segura? ¿No hay tercera vuelta? ...Bien. AHORA festejo.' },
      { who: 'Viajero', text: 'La última pieza. Estaba tibia. Mejor no pregunto dónde la guardaba.' }
    ]
  },

  epilogue: [
    [
      '¡¡LA MÁQUINA DEL TIEMPO ESTÁ COMPLETA!!',
      'Con todas las piezas sobre la mesa, el Viajero armó la máquina en una tarde. Le sobraron tres tornillos. Decidió no pensar en eso.',
      'La pieza que faltaba desde el principio resultó ser el fusible. Todo este viaje fue, técnicamente, por un fusible.',
      'Giró la llave. La máquina tosió, escupió un poco de Edad Media y arrancó.'
    ],
    [
      'MIENTRAS TANTO, EN LA HISTORIA...',
      'Los obreros de la pirámide cobraron. El Minotauro encontró la salida (estaba señalizada). El dragón se puso una cueva con vista.',
      'Don Codicio sigue buscando oro. El General sigue dibujando mapas de lugares donde ya vivía gente. Nadie lo invita a nada.',
      'La Hiperinflación subió otro poco mientras leías esto. La nave nodriza ahora tiene sindicato.'
    ],
    [
      'Y EL VIAJERO VOLVIÓ A CASA',
      'Llegó cinco minutos antes de haber salido. Se cruzó consigo mismo en la puerta. Se saludaron con incomodidad.',
      'Aprendió algo importante: la Historia no la arreglan los generales ni los emperadores. La bancan los que estaban ahí, trabajando, y encima con hambre.',
      'También aprendió a no llevar un láser a la Prehistoria. Eso lo aprendió varias veces.',
      'FIN. (Hasta que alguien toque algo. Siempre alguien toca algo.)'
    ]
  ],

  level: {
    height: 14,
    legend: {
      r: { enemy: 'raptor' }, t: { enemy: 'momia' }, o: { enemy: 'hoplita' }, l: { enemy: 'legionario' }, k: { enemy: 'caballero' }, g: { enemy: 'granadero' },
      s: { enemy: 'soldado' }, u: { enemy: 'turista' }, d: { enemy: 'dron' }, a: { enemy: 'alienTirador' }, q: { enemy: 'harpia' }, v: { enemy: 'ovni' }, K: { enemy: 'mecha' },
      N: { npc: 'yo1' }, G: { npc: 'yo2' }, S: { npc: 'yo3' }, W: { weapon: 'laser' }, A: { weapon: 'ametralladora' },
      '1': { decor: 'columna' }, '2': { decor: 'huesos' }, '3': { decor: 'antena' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    1    N     A    r   t  2',
        '#*',
        '#*'
      ],
      [
        '        q             c      v',
        '      ==        ===',
        '   o       l        k    g s h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   u    BBBBBBBBBBBBBBB  r k s 3',
        '#*',
        '#*'
      ],
      [
        '          d          c    q',
        '               s    ===',
        '       ===    ===',
        '   F   g   ^^ t  ^^^   u   a   G',
        '#*',
        '#*'
      ],
      [
        '            c           W',
        '      ==       ==      ===',
        '  a     v      s       d      h',
        '####    ####    ###      ######',
        '####    ####    ###      ######'
      ],
      [
        '                 c',
        '         K        a',
        '   BB  BBBBB   BBBBB     v',
        '   BB  BBBBB l BBBBB  o  r   1',
        '#*',
        '#*'
      ],
      [
        '      d        c       c   q',
        '       ===    ===     ===',
        '  k    g  ^^   u  ^^   s a S   2',
        '#*',
        '#*'
      ],
      [
        '            ====            ====',
        '',
        '',
        '  h  F  [   m     m    O           X    ',
        '#*',
        '#*'
      ]
    ]
  }
});
