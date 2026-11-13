// ETAPA 2 — PRIMERAS CIVILIZACIONES (tronco común). Sátira del faraón y su burocracia:
// los obreros de la pirámide están de paro y son aliados; los enemigos son momias, bichos y escribas con formularios.
CV.stage({
  id: 'egipto', tech: 1,
  title: 'LAS PIRÁMIDES', subtitle: '2500 a.C. Obra pública con leve atraso.',
  bg: {
    sky: ['#e8843c', '#f7b05a', '#ffd98a', '#fff0c0'],
    layers: [
      { gen: 'sun', x: 300, y: 50, r: 22, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'pyramids', n: 3, base: 180, h: 90, color: '#d9a85a', shade: '#b07f3c', speed: .08 },
      { gen: 'hills', base: 190, amp: 16, color: '#e8c070', top: '#f7dc9a', f1: 1, f2: 4, speed: .2 },
      { gen: 'trees', kind: 'palm', n: 5, base: 206, h: 46, color: '#3a7a3a', color2: '#5a3a1a', ground: '#e0b060', speed: .45 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#e0b060', dark: '#b88838', light: '#f7dc9a', top: '#f7dc9a', topLight: '#fff1a8', topDark: '#b88838', topH: 2 },
    'B': { pattern: 'brick', base: '#d9a85a', dark: '#a87830', light: '#f0c878' },
    '=': { base: '#c89048', dark: '#8a5a28', light: '#f0c878' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 96, drums: 'k...h.k.k..hh.k.',
    tracks: [
      { wave: 'square', vol: .05, notes: 'e4 _ f4 g#4 _ a4 b4 _ c5 b4 a4 g#4 f4 _ e4 _ e4 f4 g#4 _ f4 e4 d4 _ e4 _ _ _ - - - -' },
      { wave: 'triangle', vol: .13, notes: 'e2 _ _ e2 _ _ b2 _ e2 _ _ e2 _ _ f2 _ e2 _ _ e2 _ _ b2 _ a2 _ _ f2 _ _ e2 _' }
    ]
  },
  ambient: { col: ['#fff1a8', '#f7dc9a'], rate: .1, vy: 4, vx: 34, life: 8 },
  items: {
    datiles: { name: 'Dátiles', heal: 2, spr: 'i_datiles' },
    panmiel: { name: 'Pan con miel', heal: 3, spr: 'i_panmiel' }
  },
  heals: ['datiles', 'panmiel'],
  collectible: { name: 'Papiro', spr: 'c_papiro' },

  sprites: {
    momia: {
      rows: [
        '................',
        '.....cccccc',
        '....cccdcccc',
        '....c05c05cc',
        '....ccdccccc',
        '.....cccdcc',
        '....dcccccd',
        '...cccdccccccc',
        '...cc.ccdccc.dc',
        '......cdcccc',
        '......ccccdc',
        '......cdcccc',
        '......cc..cc',
        '......dc..cd',
        '......cc..cc',
        '.....ccc.ccc'
      ],
      anim: { walk: [{ 13: '.....dc....cd', 14: '.....cc....cc', 15: '....ccc...ccc' }, {}] }
    },
    momiaJefa: { from: 'momia', swap: { c: '4', d: 'o', '5': 'r' } },
    escarabajo: {
      rows: [
        '................', '', '', '', '', '', '', '', '', '',
        '.....8888888',
        '....899989998.0',
        '...89998999890',
        '...899989998900',
        '....8888888880',
        '...0.0..0..0'
      ],
      anim: { walk: [{ 15: '....0..0..0.0' }, {}] }
    },
    cocodrilo: {
      rows: [
        '................', '', '', '', '', '', '', '', '',
        '..........66.6',
        '.........6c06666',
        '.6......66666666',
        '..666666666c.c.c',
        '...6q6q6q666666.',
        '....66666666',
        '....q6...q6'
      ],
      anim: { walk: [{ 15: '...q6.....q6' }, {}] }
    },
    langosta: { from: 'mosquito', swap: { c: 'x', v: '6', r: 'y' } },
    escriba: {
      rows: [
        '................',
        '.....00000',
        '....0000000',
        '....0kkkkk0',
        '....0k0kk0k',
        '....0kkkkk0',
        '.....kkkkk',
        '....kkkkkkk..pp',
        '...kk4k4k4kk.pp',
        '...k.kkkkk.kkpp',
        '.....ccccc...pp',
        '.....ccccc',
        '.....c4c4c',
        '.....kk.kk',
        '.....kk.kk',
        '....ggg.ggg'
      ],
      anim: { walk: [{ 13: '....kk...kk', 14: '....kk...kk', 15: '...ggg...ggg' }, {}] }
    },
    obrero: { from: 'escriba', swap: { c: 'g', p: 'c', '4': 'k' } },
    esfinge: {
      rows: [
        '................................', '', '', '',
        '..................44444444',
        '.................4949494944',
        '................494949494944',
        '................49kkkkkkkk94',
        '...............494k0wkk0wk494',
        '...............494kkkkkkkk494',
        '...............494kkkllkkk494',
        '...............494kk0000kk494',
        '...............4944kkkkkk4494',
        '................494.4994.494',
        '................49..4994..94',
        '.....pppppppppppppp.4994.pp',
        '...pppppppppppppppppp44pppp',
        '..ppppppppppppppppppppppppp',
        '.ppppppipppppppppppppppppppp',
        '.pppppippppppppppppppppppppp',
        '.ppppippppppppppipppppppppppp',
        '.ppppipppppppppippppppppppppp',
        '.pppppipppppppippppppppppppppp',
        '.ppppppiiiiiiippppp.pppppppppppp',
        '.pppppppppppppppppp.pppppppppppp',
        '..ppppppppppppppppp..iipiipiipii',
        '...ppppppppp.pppppp',
        '....iipiipiipiipiip',
        '', '', '', ''
      ],
      anim: { a: [{ 8: '...............494kbbkkbbk494', 11: '...............494k000000k494' }] }
    },
    p_signo: { rows: ['.4444.', '44..44', '...44.', '..44..', '......', '..44..'] },
    i_datiles: { rows: ['..........', '....6.....', '...666....', '..hh.hh...', '.hhhhhhh..', '.hhuhhuh..', '..hhhhh...', '...hhh....', '..........', '..........'] },
    i_panmiel: { rows: ['..........', '..........', '..iiiiii..', '.ip4ii4pi.', '.iiiiiiii.', '.iiiiiiii.', '.llllllll.', '..........', '..........', '..........'] },
    c_papiro: { rows: ['..........', '.gppppppg.', '.gp0p00pg.', '.gppppppg.', '.gp00p0pg.', '.gppppppg.', '.gp0p0ppg.', '.gppppppg.', '..........', '..........'] },
    vasija: { rows: ['................', '', '', '', '', '', '', '', '', '', '......3333', '.......33', '.....333333', '....33044033', '....33333333', '.....333333'] }
  },

  enemies: {
    momia: { sprite: 'momia', ai: 'chase', hp: 4, speed: 16, chase: 30, sight: 90, barks: ['Mmmmh...', '¿Alguien vio mis órganos? Estaban en un frasco.', 'Cinco mil años sin cambiarme la venda.'] },
    escarabajo: { sprite: 'escarabajo', ai: 'patrol', gun: false, w: 12, h: 7, hp: 2, speed: 30, animSpeed: 14 },
    cocodrilo: { sprite: 'cocodrilo', ai: 'charger', gun: false, w: 14, h: 8, hp: 4, speed: 20, charge: 120, tele: .9, rest: 1.2, sight: 100, animSpeed: 10 },
    langosta: { sprite: 'langosta', ai: 'flyer', gun: false, hp: 2, speed: 44, hover: 4, sight: 120, sightY: 90, animSpeed: 20 },
    escriba: { sprite: 'escriba', ai: 'ranged', hp: 3, speed: 16, sight: 130, cooldown: 2.8, proj: { speed: 110, w: 5, h: 5, col: '#fff1a8' }, drop: { weapon: 'honda', chance: .5 }, barks: ['¡Formulario 27-B, por triplicado!', 'Sin sello del faraón no pasa nadie.', 'Vuelva mañana. O en la próxima dinastía.'] },
    momiaJefa: { sprite: 'momiaJefa', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 26, speed: 16, chase: 34, sight: 140, sightY: 70, paradox: false, drop: { weapon: 'lanza' }, barks: ['¡Yo era alguien importante!', '¡Me enterraron con mis gatos! ¡Con TODOS!'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, lines: ['Cada 6 reliquias ganás un corazón. Y con reliquias mejorás las armas (tecla I).', 'Yo las llamo "reliquias". Los arqueólogos las llaman "evidencia".'] },
    obrero1: { sprite: 'obrero', gift: { heal: 'panmiel' }, lines: ['Estamos de paro. El faraón debe tres lunas de pan y cebolla.', '"Proyecto prioritario", dice. Veinte años llevamos. Y es una tumba PARA ÉL.'] },
    obrero2: { sprite: 'obrero', gift: { heal: 'datiles' }, lines: ['Las momias son lentas: pegales y alejate, sin apuro.', 'Ojo con los cocodrilos: primero se quedan quietos, después embisten.'] },
    obrero3: { sprite: 'obrero', gift: { ammo: true }, lines: ['La Esfinge hace acertijos. Mientras piensa la pregunta, se distrae: ahí pegale.', 'Nadie acertó nunca. Para mí que no sabe las respuestas.'] }
  },

  boss: {
    name: 'LA ESFINGE', mul: { melee: 1.3 }, sprite: 'esfinge', scale: 2, w: 44, h: 40, hp: 100, mode: 'hover', rest: 1.2,
    anchors: [[.75, .45], [.25, .45], [.5, .38]],
    attacks: {
      pregunta: { type: 'shoot', count: 3, every: .7, n: 1, speed: 105, proj: { spr: 'p_signo', w: 6, h: 6 } },
      abanico: { type: 'shoot', count: 2, every: .9, n: 3, spread: .35, speed: 100, proj: { spr: 'p_signo', w: 6, h: 6 } },
      arena: { type: 'rain', count: 6, every: .32, speed: 150, proj: { col: '#e0b060', col2: '#fff1a8', w: 6, h: 6 } },
      momias: { type: 'summon', ids: ['momia', 'escarabajo'], n: 2, max: 3 },
      acertijo: { type: 'taunt', dur: 3, say: ['¿Qué camina en cuatro patas a la mañana...? Esperá, que la tengo anotada.', 'Blanco por dentro, verde por fuera... no, esa es otra.', '¿Cuánto es... un momento, dejame pensar la pregunta.', 'Te doy una pista: no sé la respuesta.'] },
      mirada: { type: 'lines', kinds: ['beam'], n: 3, every: .5, warn: .9, live: .5, col: '#73eff7', thick: 5 },
      enigma: { type: 'radial', count: 2, n: 8, speed: 85, proj: { spr: 'p_signo', w: 6, h: 6 } }
    },
    phases: [
      { until: .6, speed: 1, pattern: ['pregunta', 'acertijo', 'arena', 'abanico'] },
      { until: .3, speed: 1.1, say: '¡Nadie pasa sin responder! Bueno, vos tampoco respondiste. Igual.', pattern: ['mirada', 'pregunta', 'momias', 'acertijo', 'enigma'] },
      { speed: 1.25, say: '¡¡ÚLTIMA PREGUNTA!! ...Se me olvidó. ¡Improviso!', pattern: ['enigma', 'mirada', 'arena', 'acertijo', 'abanico', 'momias'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Arena, sol y una pirámide a medio hacer. El cartel dice "INAUGURACIÓN: PRONTO".' },
      { who: 'Viajero', text: 'Los obreros están sentados a la sombra con un cartel. El primer paro de la historia, y yo acá sin cámara.' },
      { who: 'Viajero', text: 'La pieza de la máquina cayó cerca de la Esfinge. Obvio. Nunca cae en un kiosco.' }
    ],
    bossIntro: [
      { who: 'La Esfinge', spr: 'esfinge', color: '#ffcd75', text: '¡Alto, mortal! Para pasar deberás responder mi acertijo.' },
      { who: 'Viajero', text: 'Dale. Soy bueno con los acertijos.' },
      { who: 'La Esfinge', spr: 'esfinge', color: '#ffcd75', text: '...No lo traje. ¡Te lo voy a tirar por la cabeza cuando me acuerde!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'La Esfinge se quedó sin preguntas. Y sin nariz, pero eso no fui yo. Creo.' },
      { who: 'Viajero', text: 'Los obreros consiguieron el pan y la cebolla. La pirámide sigue "pronta a inaugurarse".' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      k: { enemy: 'momia' }, e: { enemy: 'escarabajo' }, a: { enemy: 'escriba' }, q: { enemy: 'langosta' }, z: { enemy: 'cocodrilo' }, K: { enemy: 'momiaJefa' },
      N: { npc: 'obrero1' }, G: { npc: 'obrero2' }, S: { npc: 'obrero3' }, L: { weapon: 'lanza' }, W: { weapon: 'honda' }, R: { weapon: 'rifle', rift: true },
      '1': { decor: 'vasija' }, '2': { decor: 'huesos' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P  & 1    N        e      1',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '      ==        ===',
        '   k       e        L    k   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c',
        '            BBBBB',
        '        BBBBBBBBBBBBB',
        '   e    BBBBBBBBBBBBB   a   2',
        '#*',
        '#*'
      ],
      [
        '          q          c',
        '                    ===',
        '       ===     W',
        '   F   k     e    ^^   z      G',
        '#*',
        '#*'
      ],
      [
        '            c',
        '      ==       ==      R',
        '  k                   ===     h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '                c',
        '       K',
        '     BBBBB    BBBBB    q',
        '  e  BBBBB  a BBBBB        1',
        '#*',
        '#*'
      ],
      [
        '               c       c',
        '       ===    ===     ===',
        '  z      k        a       S    2',
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
