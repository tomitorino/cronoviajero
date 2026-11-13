// ETAPA L3 — PAMPA DEL SIGLO XIX (rama Latam). Sátira de la "Conquista del Desierto":
// los enemigos son los generales burócratas y sus fortineros; los pueblos originarios y los gauchos son aliados (NPCs).
CV.stage({
  id: 'pampa', tech: 6,
  title: 'PAMPA, SIGLO XIX', subtitle: '1878. Un "desierto" lleno de gente.',
  bg: {
    sky: ['#2f6fb5', '#6aa8de', '#bfe0f0', '#f6e7b5'],
    layers: [
      { gen: 'sun', x: 310, y: 50, r: 18, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 8, y: 14, h: 80, color: '#ffffff', speed: .05, drift: 4 },
      { gen: 'flat', base: 172, color: '#b7c96a', top: '#d8e08a', speed: .05 },
      { gen: 'pampa', base: 184, color: '#8aa84a', color2: '#4a5e2a', top: '#a8c25a', mill: 340, speed: .2 },
      { gen: 'hills', base: 204, amp: 10, color: '#6f8f3a', top: '#8aa84a', f1: 3, f2: 7, speed: .45 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#6e4b2a', dark: '#523519', light: '#8a6238', top: '#8fae3c', topLight: '#c8d85a', topDark: '#5d7a2a' },
    'B': { pattern: 'brick', base: '#b08a5a', dark: '#7a5c38', light: '#d0aa78' },
    '=': { base: '#a8744a', dark: '#6a4428', light: '#d0a070' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 96, drums: 'k..h..h.k..h..hh',
    tracks: [
      { wave: 'triangle', vol: .11, notes: 'e5 _ _ c5 _ _ a4 _ b4 _ c5 _ a4 _ _ _ e5 _ _ d5 _ _ b4 _ g#4 _ b4 _ e4 _ _ _ a4 _ c5 _ e5 _ a5 _ g5 _ e5 _ c5 _ _ _ b4 _ d5 _ f5 _ e5 _ d5 _ b4 _ g#4 _ _ _' },
      { wave: 'square', vol: .035, notes: 'a2 _ _ e3 _ _ a3 _ a2 _ _ e3 _ _ a3 _ e2 _ _ b2 _ _ e3 _ e2 _ _ b2 _ _ g#3 _' }
    ]
  },
  ambient: { col: ['#fff1a8', '#ffffff'], rate: .08, vy: 5, vx: 26, life: 9 },
  heals: ['mate', 'tortafrita'],
  collectible: { name: 'Recorte de diario', spr: 'c_recorte' },
  // Mecánica propia de la etapa: una zanja que avanza desde la izquierda y se come el piso.
  mechanic: { type: 'zanja', speed: 17, startCol: 26, sprite: 'fortinero', sign: 'ZANJA NACIONAL - EN OBRA', banner: '¡LA ZANJA AVANZA! (NADIE SABE HACIA DÓNDE)' },

  sprites: {
    fortinero: {
      rows: [
        '................',
        '.....9999.......',
        '....999999......',
        '....rrrrrr0.....',
        '....jj0j0j......',
        '....jjjjjj......',
        '.....jhhj.......',
        '....999999......',
        '...99949999.....',
        '..j9994999j.....',
        '..j.999999.j....',
        '....cccccc......',
        '....cc..cc......',
        '....cc..cc......',
        '....00..00......',
        '...000..000.....'
      ],
      anim: { walk: [{ 13: '...cc....cc.....', 14: '..00......00....', 15: '.000......000...' }, {}] }
    },
    burocrata: {
      rows: [
        '....00000000....',
        '...0044444400...',
        '....00000000....',
        '.....jjjjjj.....',
        '.....j0jj0j.....',
        '.....jhhhhj.....',
        '......jjjj......',
        '...488888884....',
        '..4488484884ppp.',
        '..j.88888.pp2pp.',
        '..j.88484.p2ppp.',
        '....88888.ppp2p.',
        '....cc.cc..ppp..',
        '....cc.cc.......',
        '....00.00.......',
        '...000.000......'
      ],
      anim: { walk: [{ 13: '...cc...cc......', 14: '..00.....00.....', 15: '.000.....000....' }, {}] }
    },
    vaca: {
      rows: [
        '................',
        '................',
        '................',
        '................',
        '...........c..c.',
        '..........0cccc.',
        '0.........ccc0cm',
        '.0..cccc0cccccmm',
        '.0cc00ccccccc...',
        '..c000cccc00c...',
        '..cc0ccccc00c...',
        '..ccccccccccc...',
        '..cc.cmmc.cc....',
        '..cc.cc...cc....',
        '..cc.cc...cc....',
        '..00.00...00....'
      ],
      anim: { walk: [{ 13: '.cc..cc..cc.....', 14: '.cc...cc..cc....', 15: '.00...00..00....' }, {}] }
    },
    nandu: {
      rows: [
        '...........dd...',
        '..........d0d4..',
        '..........dd....',
        '..........dd....',
        '..........dd....',
        '.........ddd....',
        '...ddddddddd....',
        '..dddeddddd.....',
        '.ddeeeddddd.....',
        '.dddedddddd.....',
        '..ddddddd.......',
        '....4...4.......',
        '....4...4.......',
        '....4...4.......',
        '....4...4.......',
        '...44..44.......'
      ],
      anim: { walk: [{ 11: '....4..4........', 12: '...4....4.......', 13: '..4......4......', 14: '.44.......4.....', 15: '.........44.....' }, {}] }
    },
    caudillo: {
      rows: [
        '....0000000.....',
        '...000000000....',
        '.0000000000000..',
        '....jjjjjjj.....',
        '....j0jjj0j.....',
        '..00000j00000...',
        '...000jjj000....',
        '....rrrrrrr.....',
        '...rrr4r4rrr....',
        '..rrrr4r4rrrr...',
        '..rrrrrrrrrrr...',
        '.rrr4rrrrr4rrr..',
        '....00...00.....',
        '....00...00.....',
        '....hh...hh.....',
        '...hhh...hhh....'
      ],
      anim: { walk: [{ 13: '...00.....00....', 14: '..hh.......hh...', 15: '.hhh.......hhh..' }, {}] }
    },
    gaucho: {
      rows: [
        '................',
        '....0000000.....',
        '..00000000000...',
        '....jjjjjjj.....',
        '....j0jjj0j.....',
        '....jjhhhjj.....',
        '.....jjjjj......',
        '....r2rrr2r.....',
        '...iiiiiiiii....',
        '..iihiiiiihii...',
        '..jihiiiiihij6..',
        '...iiiiiiiii.g..',
        '....ddd.ddd.....',
        '....ddd.ddd.....',
        '....dd...dd.....',
        '...000...000....'
      ]
    },
    baqueana: {
      rows: [
        '................',
        '.....00000......',
        '....0000000.....',
        '....r4r4r4r.....',
        '....0lllll0.....',
        '....0l0l0l0.....',
        '....0lllll0.....',
        '...00.lll.00....',
        '...0fffffff0....',
        '..0ffcfrfcff....',
        '..lffrfcfrffl...',
        '..lffcfrfcffl...',
        '...fffffffff....',
        '....ff...ff.....',
        '....ff...ff.....',
        '....gg...gg.....'
      ]
    },
    general: {
      rows: [
        '................................',
        '..........r.....................',
        '.........rr.00000000000.........',
        '.........r0000000000000000......',
        '........00004444444444440000....',
        '.......0000000000000000000000...',
        '..........jjjjjjjjjjjj..........',
        '..........jj00jjjj00jj..........',
        '..........jjc0jjjjc0jj..........',
        '..........jjjjjkkjjjjj..........',
        '........000000jkkj000000........',
        '.......0000000jjjj0000000.......',
        '...........jjjjjjjjjj...........',
        '......44488888888888888444......',
        '.....4444888848888488884444.....',
        '.....4.4.88884888848888.4.4.....',
        '......jj.88884888848888.jj......',
        '......jj.8888o8r8o88888.jj......',
        '......jj.88888888888888.jj......',
        '....pppppppppppppppppppppppp....',
        '....p22pppp9ppppp2pppp99ppp2....',
        '....pp2pp99pppp22ppp9ppppp2p....',
        '....ppp2ppppp2ppppp9pp22pppp....',
        '....pppppppppppppppppppppppp....',
        '.........4444444444444..........',
        '.........cccccc.cccccc..........',
        '.........cccccc.cccccc..........',
        '.........ccccc...ccccc..........',
        '.........00000...00000..........',
        '.........00000...00000..........',
        '........000000...000000.........',
        '................................'
      ],
      anim: { a: [{ 12: '...........jjj0000jjj...........', 19: '..pppppppppppppppppppppppppppp..', 23: '..pppppppppppppppppppppppppppp..' }] }
    },
    cortadera: { rows: ['................', '....p.....p.....', '...ppp...ppp....', '...ppp..pppp....', '....p.p..pp.....', '....5.pp.5..p...', '..5.5.pp.5.pp...', '..5.55.5.5.p....', '..55.5.5555.5...', '...5.55.55.55...', '...55.5.5.55....', '....5.555.5.....', '....55.5.55.....', '.....55555......', '.....55555......', '......555.......'] },
    p_decreto: { rows: ['.cccccc.', '.c0000c.', '.cccccc.', '.c000cc.', '.cccccc.', '.c00rrc.', '.cccrrc.', '.cccccc.'] },
    p_regla: { rows: ['4444444444', '4040404044', '4444444444', '..........', '..........', '..........', '..........', '..........', '..........', '..........'] },
    c_recorte: { rows: ['..........', '.cccccccc.', '.c000000c.', '.cccccccc.', '.c00c000c.', '.c00c000c.', '.cccccccc.', '.c000000c.', '.ccccccc..', '..........'] }
  },

  enemies: {
    fortinero: { sprite: 'fortinero', ai: 'chase', hp: 6, speed: 26, chase: 46, sight: 80, clumsy: true, clumsyBarks: ['¡Me tropecé con el desierto!', '¿Dónde dejé la pala?', '¡Ay, mi juanete!', 'Hace tres años que no cobro.'], drop: { weapon: 'mosquete', chance: .5 } },
    burocrata: { sprite: 'burocrata', ai: 'ranged', hp: 6, speed: 18, sight: 140, cooldown: 2.3, proj: { spr: 'p_decreto', speed: 115, aim: true, w: 6, h: 6, spin: true }, barks: ['¡Firme aquí, aquí y aquí!', '¡Esto ya figura en el mapa!', '¡Expediente en trámite!', '¡Vuelva con el formulario 27-B!'] },
    vaca: { sprite: 'vaca', ai: 'charger', gun: false, hp: 9, speed: 16, charge: 150, tele: .9, rest: 1.2, heavy: true, sight: 110, barks: ['¡MUUU!', 'Muuu. (Tiene prioridad de paso.)'] },
    nandu: { sprite: 'nandu', ai: 'chase', gun: false, hp: 5, speed: 50, chase: 90, jump: 230, fearless: true, sight: 140, animSpeed: 14 },
    caudillo: { sprite: 'caudillo', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 60, speed: 28, chase: 62, jump: 260, hop: .01, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'rifle' }, barks: ['¡Federación o muerte! ¿O era al revés?', '¡Mi bigote tiene más leguas que usted!'] }
  },

  // Aliados: dan un consejo (globo) y una ayuda (ítem) la primera vez que te acercás.
  npcs: {
    gaucho: { sprite: 'gaucho', gift: { heal: 'mate' }, lines: ['¡Buenas, paisano del futuro! Tome un mate, que la zanja viene despacio pero viene.', 'Esos generales dibujan rayas en un papel y después se enojan con el pasto.', 'Si una vaca lo mira fijo, hágase a un lado. Tiene prioridad de paso.'] },
    baqueana: { sprite: 'baqueana', gift: { heal: 'tortafrita' }, lines: ['Soy Ñamku. Le dicen "desierto" a esta tierra. Mirá alrededor: vivimos acá hace miles de años.', 'La zanja no sabe doblar ni subir. Usá las alturas y no te quedes quieto.'] },
    baqueana2: { sprite: 'baqueana', gift: { ammo: true }, lines: ['El General pelea con líneas. Cuando dibuje una, no te quedes encima. Las líneas son de él; la tierra, no.', 'Llevate esto. Y devolvé el futuro como lo encontraste.'] }
  },

  boss: {
    name: 'EL GENERAL DEL MAPA', mul: { melee: 1.3, ranged: 0.9 }, sprite: 'general', scale: 2, w: 36, h: 52, hp: 170, walk: 18, rest: 1,
    attacks: {
      trazar: { type: 'lines', kinds: ['floor', 'floor', 'diag', 'zig'], n: 3, every: .55, warn: .95, live: .7, col: '#3b5dc9', labels: ['MÍO', 'FRONTERA', 'LÍMITE', 'TAMBIÉN MÍO'] },
      cuadricula: { type: 'lines', kinds: ['diag', 'zig', 'high', 'beam', 'floor'], n: 4, every: .42, warn: .9, live: .7, col: '#e03c32', labels: ['MÍO', 'PARALELO 0', 'ANEXADO', 'ZONA DE NADIE (MÍA)'] },
      decretos: { type: 'shoot', count: 3, every: .5, n: 3, spread: .3, speed: 130, proj: { spr: 'p_decreto', w: 6, h: 6, spin: true } },
      reglazo: { type: 'shoot', aim: 'arc', count: 2, every: .6, n: 2, proj: { spr: 'p_regla', w: 10, h: 4, spin: true, grav: 300 } },
      fortineros: { type: 'summon', ids: ['fortinero', 'burocrata'], n: 2, max: 3 },
      mapa: { type: 'taunt', dur: 2.5, say: ['¿Dónde estoy? Ah... el mapa estaba al revés.', 'Según este plano, usted no existe.', 'Un momento, que se me voló la escala.', 'Aquí dice "tierra vacía". Ignore a toda esa gente.'] },
      sellos: { type: 'shoot', aim: 'arc', count: 3, every: .5, n: 1, proj: { col: '#b13e53', col2: '#ff77a8', w: 8, h: 8, grav: 300, bounce: 3, life: 5 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['trazar', 'decretos', 'mapa', 'sellos'] },
      { until: .33, speed: 1.15, say: '¡Decreto 1492: el horizonte queda expropiado!', pattern: ['cuadricula', 'fortineros', 'decretos', 'mapa', 'sellos', 'trazar'] },
      { speed: 1.3, say: '¡¡TRAZO UNA LÍNEA Y ES MÍO!!', pattern: ['cuadricula', 'trazar', 'reglazo', 'sellos', 'mapa', 'fortineros'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'La pampa. Horizonte infinito, cielo enorme... y un señor con un mapa gritándole al pasto.' },
      { who: 'Viajero', text: 'Lo llaman "el desierto". Para ser un desierto, está lleno de gente que ya vivía acá.' },
      { who: 'Viajero', text: '¿Y eso que avanza? ¿Una zanja? ¿Quién le pone una zanja a la llanura?' }
    ],
    bossIntro: [
      { who: 'General', spr: 'general', color: '#41a6f6', text: '¡ALTO! Usted está pisando el paralelo... eh... este de acá. ¡Que es MÍO!' },
      { who: 'Viajero', text: 'General, esa línea la acaba de dibujar usted.' },
      { who: 'General', spr: 'general', color: '#41a6f6', text: '¡Precisamente! Si está en el mapa, es verdad. ¡Escribiente, anote: el viajero queda anexado!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El General se enredó en su propio mapa. El territorio, por suerte, nunca se enteró.' },
      { who: 'Viajero', text: 'Ñamku tenía razón: las líneas eran de él. La tierra, no.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      f: { enemy: 'fortinero' }, b: { enemy: 'burocrata' }, v: { enemy: 'vaca' }, n: { enemy: 'nandu' }, C: { enemy: 'caudillo' },
      g: { npc: 'gaucho' }, w: { npc: 'baqueana' }, y: { npc: 'baqueana2' },
      '1': { decor: 'cortadera' }
    },
    segments: [
      [
        '  P    1      g           1   f',
        '#*',
        '#*'
      ],
      [
        '              c',
        '            ====',
        '   f     b            v      1   h',
        '#*',
        '#*'
      ],
      [
        '       C    c',
        '     =========',
        '',
        '        ==          w',
        '   n          n            v',
        '#*',
        '#*'
      ],
      [
        '                  c',
        '        ==       ===',
        '  b   1      f       ^^  n     h',
        '#######   ######   ###########',
        '#######   ######   ###########'
      ],
      [
        '             c',
        '           =====      c',
        '   F   v         f  b        y    1',
        '#*',
        '#*'
      ],
      [
        '              c',
        '    ==      =====',
        '  1    v          f    n     1',
        '#*',
        '#*'
      ],
      [
        '                   c',
        '         ==       ===',
        '  b   f       ^^        v    h',
        '########   ########   ########',
        '########   ########   ########'
      ],
      [
        '        c',
        '      BBBBB        b',
        '  n   BBBBB   f   BBB    n   1',
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
