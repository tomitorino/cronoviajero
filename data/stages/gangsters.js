// ETAPA N3 — GÁNSTERES AÑOS 20 (rama Norteamérica). Sátira de la Ley Seca: el Padrino, y los políticos y comisarios
// que cobran de los dos lados. Canillitas y músicos de jazz son aliados.
CV.stage({
  id: 'gangsters', tech: 7,
  title: 'GÁNSTERES AÑOS 20', subtitle: '1925. El alcohol está prohibido. Por eso hay tanto.',
  bg: {
    sky: ['#14142a', '#2a2a4a', '#4a3a5a', '#7a5a5a'],
    layers: [
      { gen: 'stars', n: 24, maxY: 60, color: '#cfd8ff', speed: .01 },
      { gen: 'clouds', n: 5, y: 16, h: 40, color: '#3a3a5a', speed: .05, drift: 3 },
      { gen: 'city', base: 188, min: 40, max: 96, color: '#2a2a40', win: '#ffe9a0', lit: .4, tank: true, speed: .12, seed: 6 },
      { gen: 'city', base: 204, min: 18, max: 50, color: '#1a1a2c', win: ['#ffe9a0', '#ef7d57'], lit: .35, gap: 5, tank: true, speed: .36, seed: 13 }
    ]
  },
  tiles: {
    '#': { pattern: 'pave', base: '#4a4a5a', dark: '#2a2a3a', light: '#6a6a7a', top: '#5a5a6a', topLight: '#8a8a9a', topDark: '#2a2a3a', topH: 2 },
    'B': { pattern: 'brick', base: '#7a3a34', dark: '#4a201c', light: '#9a5a50' },
    '=': { base: '#566c86', dark: '#333c57', light: '#94b0c2' },
    '^': { base: '#c2c3c7', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 126, drums: 'k.sk..s.k.sk.ss.',
    tracks: [
      { wave: 'square', vol: .05, notes: 'c4 _ ds4 f4 _ fs4 g4 _ as4 g4 _ f4 ds4 _ c4 _ c4 _ ds4 f4 _ fs4 g4 _ c5 as4 _ g4 f4 ds4 c4 _' },
      { wave: 'triangle', vol: .13, notes: 'c2 e2 g2 a2 as2 a2 g2 e2 f2 a2 c3 d3 ds3 d3 c3 a2 c2 e2 g2 a2 as2 a2 g2 e2 g2 b2 d3 b2 c2 _ _ _' }
    ]
  },
  ambient: { col: ['#94b0c2', '#c2c3c7'], rate: .5, vy: 150, vx: -24, life: 1.6 },
  heals: ['pizza', 'pastel'],
  collectible: { name: 'Billete marcado', spr: 'c_billete' },

  sprites: {
    maton: { from: 'yakuza', swap: { f: 'h', r: 'y' } },
    comisario: { from: 'yakuza', swap: { f: '9', r: 'y', '0': '8' } },
    canillita: { from: 'cowboy', swap: { h: 'e', g: 'c', r: 'j', i: 'd', '9': 'h' } },
    jazzera: { from: 'tunica', swap: { r: 'm', '4': 'y' } },
    autoBanda: { from: 'tanquecito', swap: { e: '0', q: 'y', d: 's' } },
    padrino: {
      rows: [
        '................................', '', '', '', '', '',
        '.............000000',
        '............00000000',
        '...........0000000000',
        '............jjjjjjjj',
        '............j0jjjj0j',
        '............jjjjjjjj',
        '............jj0000jj',
        '.............jjjjjj',
        '.........ffffffcrffffff',
        '........fffffffcrfffffff',
        '.......ffffffffcrffffffff',
        '.......fff.ffffcrfffrfffff',
        '.......ff..ffffcffff.sssff',
        '.......jj..fffffffff.s0s0jj',
        '...........fffffffff.sssss',
        '...........fffffffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '...........ffff.ffff',
        '..........0000...0000'
      ],
      anim: {
        walk: [{ 28: '..........ffff...ffff', 29: '.........ffff.....ffff', 30: '.........ffff.....ffff', 31: '........0000.......0000' }, {}],
        a: [{ 12: '............jj0cc0jj', 17: '.......fff.ffffcrfffrffffeeee', 18: '.......ff..ffffcffff.sssffe' }]
      }
    },
    p_botella: { rows: ['..cc..', '..66..', '..66..', '.6666.', '.6c66.', '.6c66.', '.6666.', '.6666.'] }
  },

  enemies: {
    mafioso: { sprite: 'yakuza', ai: 'ranged', hp: 8, speed: 18, sight: 160, cooldown: 2.2, proj: { speed: 230, w: 5, h: 2, col: '#ffcd75', sfx: 'rifle' }, drop: { weapon: 'ametralladora', chance: .3 }, barks: ['Es un estuche de violín. Adentro hay un violín. Muy ruidoso.', 'No es personal. Son negocios. Bueno, un poco personal.', 'El jefe te manda saludos. Vienen de a cincuenta por segundo.'] },
    maton: { sprite: 'maton', ai: 'chase', hp: 10, speed: 26, chase: 56, jump: 230, sight: 110, barks: ['Vendemos "protección". ¿De quién? De nosotros.', 'Qué lindo local. Sería una pena que yo trabajara acá.'] },
    contrabandista: { sprite: 'maton', ai: 'ranged', hp: 7, speed: 16, sight: 140, cooldown: 2.9, proj: { speed: 120, grav: 300, spr: 'p_botella', w: 6, h: 8 }, barks: ['¡"Jarabe para la tos"! ¡Cuarenta grados de jarabe!', 'Desde que lo prohibieron vendo el triple. Gracias, Congreso.'] },
    comisario: { sprite: 'comisario', ai: 'charger', hp: 9, speed: 22, charge: 150, tele: .85, rest: 1.1, sight: 120, animSpeed: 12, barks: ['¡Redada! ...Ah, pagaron. Sigan, sigan.', 'Yo no vi nada. Tengo un sobre que lo certifica.', 'Combato el crimen. Los martes. Los demás días cobro.'] },
    palomaTecho: { sprite: 'palomaUrb', ai: 'flyer', gun: false, hp: 3, speed: 58, hover: 6, sight: 150, sightY: 100, animSpeed: 14 },
    autoBanda: { sprite: 'autoBanda', ai: 'chase', mini: true, heavy: true, scale: 2, w: 26, h: 20, hp: 86, speed: 20, chase: 44, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡Auto de la banda! ¡Pasa despacio y con las ventanas bajas!', '¡Bocina! ¡Significa "agachate"!'] }
  },

  npcs: {
    canillita: { sprite: 'canillita', gift: { heal: 'pastel' }, lines: ['¡Extra, extra! "El alcalde promete acabar con la mafia", dijo en el cumpleaños del Padrino.', 'Los comisarios embisten derecho. Los de la botella tiran en arco. Sale en la página 3.'] },
    jazzera: { sprite: 'jazzera', gift: { heal: 'pizza' }, lines: ['Canto en un bar clandestino. Clandestino es un decir: el comisario tiene mesa fija.', 'Prohibieron el alcohol y ahora toma hasta el que no tomaba. Un éxito.'] },
    canillita2: { sprite: 'canillita', gift: { ammo: true }, lines: ['El Padrino es puro traje: de cerca aguanta todo. Dale de lejos.', 'Cuando acaricia al gato y habla de "la familia", no se mueve. Son dos minutos de discurso.'] }
  },

  boss: {
    name: 'EL PADRINO', mul: { melee: .8, ranged: 1.3 }, sprite: 'padrino', scale: 2, w: 40, h: 52, hp: 155, walk: 16, rest: 1,
    attacks: {
      rafaga: { type: 'shoot', count: 7, every: .14, n: 1, speed: 200, sfx: 'shoot', proj: { col: '#ffcd75', col2: '#ffffff', w: 5, h: 2 } },
      botellas: { type: 'shoot', aim: 'arc', count: 4, every: .4, n: 1, sfx: 'shoot', proj: { spr: 'p_botella', w: 6, h: 8, grav: 300, life: 5 } },
      oferta: { type: 'lines', kinds: ['beam', 'diag', 'floor'], n: 5, every: .36, warn: .85, live: .45, col: '#e03c32', thick: 5, labels: ['OFERTA', 'FAVOR', 'DEUDA'] },
      familia: { type: 'summon', ids: ['mafioso', 'maton', 'comisario'], n: 2, max: 3 },
      gato: { type: 'taunt', dur: 2.8, say: ['Te voy a hacer una oferta que... esperá, que el gato quiere mimos.', 'La familia es lo primero. Después vienen los jueces. Los tengo en cuotas.', 'Yo no rompo la ley. La alquilo.', 'Un día vas a venir a pedirme un favor. Hoy no. Hoy te pego.'] },
      embestida: { type: 'charge', speed: 190, tele: .85 },
      salto: { type: 'jump', power: 320 },
      plomo: { type: 'radial', count: 3, n: 10, speed: 100, proj: { col: '#ffcd75', col2: '#ffffff', w: 4, h: 4 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['rafaga', 'gato', 'oferta', 'botellas'] },
      { until: .33, speed: 1.15, say: 'Muchachos: expliquenle cómo funciona el barrio.', pattern: ['familia', 'embestida', 'rafaga', 'gato', 'plomo', 'oferta'] },
      { speed: 1.3, say: '¡¡NADIE LE DICE QUE NO AL PADRINO!! ¡¡Salvo el gato!!', pattern: ['plomo', 'salto', 'botellas', 'gato', 'embestida', 'rafaga', 'familia', 'oferta'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Chicago, 1925. El gobierno prohibió el alcohol. Nunca se tomó tanto.' },
      { who: 'Viajero', text: 'La mafia vende la bebida, la policía cobra por no verla y el alcalde brinda por la ley.' },
      { who: 'Viajero', text: 'La pieza de la máquina la tiene el Padrino. La usa de pisacorbatas. Tiene estilo, hay que admitirlo.' }
    ],
    bossIntro: [
      { who: 'El Padrino', spr: 'yakuza', color: '#c2c3c7', text: 'Me dicen que andás por mi ciudad sin presentar tus respetos.' },
      { who: 'Viajero', text: 'Respetos presentados. ¿Me das el pisacorbatas?' },
      { who: 'El Padrino', spr: 'yakuza', color: '#c2c3c7', text: 'Te voy a hacer una oferta que no vas a poder esquivar. Bueno, intentalo.' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'Al Padrino no lo agarraron por la mafia. Lo agarraron por no pagar impuestos. Siempre son los impuestos.' },
      { who: 'Viajero', text: 'El gato se quedó con el negocio. Maneja todo desde un almohadón. Nadie notó la diferencia.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      a: { enemy: 'mafioso' }, y: { enemy: 'maton' }, b: { enemy: 'contrabandista' }, p: { enemy: 'comisario' }, q: { enemy: 'palomaTecho' }, K: { enemy: 'autoBanda' },
      N: { npc: 'canillita' }, G: { npc: 'jazzera' }, S: { npc: 'canillita2' }, W: { weapon: 'rifle' }, A: { weapon: 'ametralladora' }, R: { weapon: 'laser', rift: true },
      '1': { decor: 'tacho' }, '2': { decor: 'semaforo' }
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
        '                 c',
        '                  a      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB p BBBBB  y  b   1',
        '#*',
        '#*'
      ],
      [
        '          q          c    q',
        '               a    ===',
        '       ===    ===',
        '   F   p   ^^ y  ^^^   y   b   G',
        '#*',
        '#*'
      ],
      [
        '        q             c      q',
        '      ==        ===',
        '   y       a        b    p   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    a',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   a    BBBBBBBBBBBBBBB  y p   A',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a     q      b       q      h',
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
