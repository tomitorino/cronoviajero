// ETAPA 3 — ANTIGÜEDAD GRIEGA (tronco común). Hoplitas, harpías, filósofos que preguntan demasiado
// y un Minotauro que se pierde en su propio laberinto.
CV.stage({
  id: 'grecia', tech: 2,
  title: 'ANTIGUA GRECIA', subtitle: '450 a.C. Todos opinan. Nadie pide indicaciones.',
  bg: {
    sky: ['#2a6ac8', '#5aa8e8', '#b8e4f5', '#f0fbff'],
    layers: [
      { gen: 'sun', x: 70, y: 40, r: 16, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 5, y: 18, h: 40, color: '#ffffff', speed: .04, drift: 3 },
      { gen: 'flat', base: 156, color: '#2a6ab8', top: '#8fd3ff', speed: .03 },
      { gen: 'mountains', base: 178, amp: 50, color: '#8aa0b8', n: 6, speed: .08 },
      { gen: 'temples', n: 3, base: 192, h: 36, color: '#f4f4f4', ground: '#c8d0c0', speed: .25 },
      { gen: 'trees', kind: 'palm', n: 4, base: 206, h: 40, color: '#4a7a3a', color2: '#6a5a3a', ground: '#b8c0a0', speed: .45 }
    ]
  },
  tiles: {
    '#': { pattern: 'stone', base: '#d8dce0', dark: '#94a0b0', light: '#f4f4f4', top: '#f4f4f4', topLight: '#ffffff', topDark: '#94a0b0', topH: 2 },
    'B': { pattern: 'brick', base: '#c8ccd8', dark: '#8490a0', light: '#eef0f4' },
    '=': { base: '#b8a078', dark: '#786040', light: '#e0c8a0' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 112, drums: 'k..hk.h.k..hk.hh',
    tracks: [
      { wave: 'square', vol: .05, notes: 'd5 _ e5 f5 _ e5 d5 _ c5 _ d5 e5 _ d5 c5 _ a4 _ c5 d5 _ c5 a4 _ g4 _ a4 _ _ _ - -' },
      { wave: 'triangle', vol: .13, notes: 'd2 _ a2 _ d3 _ a2 _ c2 _ g2 _ c3 _ g2 _ a1 _ e2 _ a2 _ e2 _ g1 _ d2 _ a2 _ _ _' }
    ]
  },
  ambient: { col: ['#ffffff', '#a7f070'], rate: .05, vy: 8, vx: 14, life: 9 },
  items: { aceitunas: { name: 'Aceitunas', heal: 3, spr: 'i_aceitunas' } },
  heals: ['uvas', 'aceitunas'],
  collectible: { name: 'Ánfora', spr: 'c_anfora' },

  sprites: {
    hoplita: {
      rows: [
        '................',
        '......rrrr',
        '.....rr444',
        '....444444',
        '....4k0k04.....d',
        '....44kkk4.....d',
        '.....4kkk......d',
        '...oo99999.....d',
        '..o44o9999kkkkkd',
        '..o4oo9999.....d',
        '..o44o9999.....d',
        '...ooccccc',
        '....cc.cc',
        '....kk.kk',
        '....kk.kk',
        '...ggg.ggg'
      ],
      anim: { walk: [{ 13: '...kk...kk', 14: '..kk.....kk', 15: '.ggg.....ggg' }, {}] }
    },
    arqueroGriego: { from: 'hoplita', swap: { r: '6', o: 'g', '9': 'c', d: 'h' } },
    harpia: {
      rows: [
        '................',
        '',
        '.t............t',
        '.tt...hhhh...tt',
        '.ttt.hhhhhh.ttt',
        '..ttthkkkkhttt',
        '..tttk0kk0kttt',
        '...ttkkookktt',
        '....tttkktttt',
        '.....tttttt',
        '.....tmttmt',
        '......tttt',
        '......y..y',
        '.....yy..yy',
        '', ''
      ],
      anim: { walk: [{ 2: '', 3: '......hhhh', 4: '.....hhhhhh', 5: '.tttthkkkkhtttt', 6: 'tttttk0kk0kttttt', 7: '.ttttkkookktttt' }, {}] }
    },
    filosofo: {
      rows: [
        '................',
        '.....ddddd',
        '....ddddddd',
        '....dkkkkkd',
        '....dk0k0kd',
        '....dkkkkkd',
        '....dsssssd',
        '.....ccccc',
        '....ccccccc',
        '...cccccdccc',
        '...kccccdcck',
        '...k.cccdc.k',
        '.....cccdc',
        '.....ccccc',
        '.....kk.kk',
        '....ggg.ggg'
      ],
      anim: { walk: [{ 14: '....kk...kk', 15: '...ggg...ggg' }, {}] }
    },
    ariadna: { from: 'filosofo', swap: { d: 'h', c: 'm', s: 'k' } },
    diogenes: { from: 'filosofo', swap: { c: 'g' } },
    ciclope: {
      rows: [
        '................',
        '.....kkkkkk',
        '....kkkkkkkk',
        '....kkwwwwkk',
        '....kkw00wkk',
        '....kkwwwwkk',
        '....kkkkkkkk',
        '.....k0000k',
        '...kkkkkkkkkk..g',
        '..kkkkkkkkkkkk.g',
        '..kk.gggggg.kkgg',
        '..kk.gggggg..ggg',
        '.....gggggg...g',
        '.....kkk.kkk',
        '.....kkk.kkk',
        '....kkkk.kkkk'
      ],
      anim: { walk: [{ 13: '....kkk...kkk', 14: '....kkk...kkk', 15: '...kkkk...kkkk' }, {}] }
    },
    minotauro: {
      rows: [
        '................................',
        '........c..........c',
        '........cc........cc',
        '.........cc......cc',
        '.........hhhhhhhhhh',
        '........hhhhhhhhhhhh',
        '........hhrwhhhhrwhh',
        '........hhhhhhhhhhhh',
        '.........hhllllllhh',
        '.........hl0llll0lh',
        '.........hllllllllh.......ss',
        '...........ll44ll........ssss',
        '......gggggggggggggggg...sssss',
        '.....gggggggggggggggggg..ssss',
        '....ggggiggggggggggigggg.hss',
        '....ggg.gggiiiiiiggg.ggg.h',
        '....ggg.gggggggggggg.gggghh',
        '....ggg.ggggiiiigggg..ggh',
        '....ggg.gggggggggggg....h',
        '....lll.gggggggggggg....h',
        '........rrrrrrrrrrrr',
        '........r4rrrrrrrr4r',
        '........rrrrrr.rrrrr',
        '........ggggg...ggggg',
        '........ggggg...ggggg',
        '........ggggg...ggggg',
        '........ggggg...ggggg',
        '........ggggg...ggggg',
        '........hhhhh...hhhhh',
        '.......000000...000000',
        '.......000000...000000',
        ''
      ],
      anim: { a: [{ 6: '........hhrrhhhhrrhh', 11: '..........cll44llc.......ssss' }] }
    },
    p_pregunta: { rows: ['.cccc.', 'cc..cc', '...cc.', '..cc..', '......', '..cc..'] },
    i_aceitunas: { rows: ['..........', '.....6....', '....6.....', '..qq..qq..', '.q6qq.q6q.', '.qqqq.qqq.', '..qq..qq..', '..........', '..........', '..........'] },
    c_anfora: { rows: ['..........', '...3333...', '....33....', '..333333..', '.30333303.', '.33000033.', '.30333303.', '..333333..', '...3333...', '....33....'] }
  },

  enemies: {
    hoplita: { sprite: 'hoplita', ai: 'chase', hp: 6, speed: 22, chase: 42, sight: 95, drop: { weapon: 'lanza', chance: .4 }, barks: ['¡Por Atenas! ¿O era Esparta? Hoy me tocó Atenas.', '¡Formación! ...Estoy solo. ¡Formación de uno!', '¡Esto es... un malentendido!'] },
    arqueroGriego: { sprite: 'arqueroGriego', ai: 'ranged', hp: 4, speed: 18, sight: 140, cooldown: 2.6, proj: { speed: 150, w: 7, h: 2, col: '#8b5a2b' }, drop: { weapon: 'arco', chance: .6 }, barks: ['¡Apunten! ...¿A cuál de los dos?'] },
    harpia: { sprite: 'harpia', ai: 'flyer', hp: 3, speed: 46, hover: 5, sight: 130, sightY: 90, animSpeed: 10, barks: ['¡KRAAA!'] },
    filosofo: { sprite: 'filosofo', ai: 'ranged', hp: 3, speed: 12, sight: 120, cooldown: 3.2, proj: { speed: 90, spr: 'p_pregunta', w: 6, h: 6 }, barks: ['¿Pero qué ES un golpe, realmente?', 'Solo sé que no sé nada. Y aun así, opino.', 'Definime "viajar en el tiempo".', '¿Y eso, quién lo dice?'] },
    ciclope: { sprite: 'ciclope', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 34, speed: 22, chase: 44, jump: 240, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'arco' }, barks: ['¡Te tengo entre ceja y... ceja!', '¡No me hablen de "Nadie"! ¡Tema sensible!'] }
  },

  npcs: {
    diogenes: { sprite: 'diogenes', gift: { heal: 'aceitunas' }, lines: ['Correte un poquito, que me tapás el sol.', 'Vivo en un barril. Sin expensas. El filósofo exitoso soy yo.'] },
    ariadna: { sprite: 'ariadna', gift: { ammo: true }, lines: ['Tomá, flechas. Y un consejo: el Minotauro embiste derecho. Saltalo o rodá.', 'Le di un hilo a un tal Teseo para salir del laberinto. Se lo olvidó en la entrada.'] },
    ariadna2: { sprite: 'ariadna', gift: { heal: 'uvas' }, lines: ['Cuando el toro se pierde y se pone a mirar el mapa, es tu momento.', 'El laberinto lo diseñó un arquitecto carísimo. Ni él sabe salir.'] }
  },

  boss: {
    name: 'EL MINOTAURO', mul: { melee: 0.8, ranged: 1.3 }, sprite: 'minotauro', scale: 2, w: 36, h: 54, hp: 120, walk: 18, rest: 1,
    attacks: {
      embestida: { type: 'charge', speed: 190, tele: .8 },
      hachazo: { type: 'lines', kinds: ['floor'], n: 3, every: .45, warn: .8, live: .5, col: '#f4f4f4', thick: 6 },
      salto: { type: 'jump', power: 310 },
      derrumbe: { type: 'rain', count: 6, every: .3, speed: 165, proj: { col: '#94a0b0', col2: '#d8dce0', w: 8, h: 8 } },
      muros: { type: 'lines', kinds: ['pillar'], n: 5, every: .32, warn: .85, live: .7, col: '#c8ccd8', thick: 8, height: 90 },
      perdido: { type: 'taunt', dur: 2.8, say: ['Era a la izquierda... no, la otra izquierda.', '¿Por acá ya pasé? Ese muro me suena.', 'No estoy perdido. Estoy EXPLORANDO.', 'Preguntar indicaciones es de débiles.'] },
      hoplitas: { type: 'summon', ids: ['hoplita', 'harpia'], n: 2, max: 3 }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['hachazo', 'perdido', 'embestida', 'derrumbe'] },
      { until: .33, speed: 1.12, say: '¡MUUU! Digo... ¡GROAR! ¡Ahora cierro el laberinto!', pattern: ['muros', 'salto', 'hachazo', 'perdido', 'hoplitas'] },
      { speed: 1.28, say: '¡¡NADIE SALE DE ACÁ!! ¡Yo tampoco! ¡Ese es el problema!', pattern: ['muros', 'embestida', 'derrumbe', 'perdido', 'salto', 'hachazo'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Mármol, olivos y gente discutiendo en la plaza. Llevan tres días con "qué es la virtud".' },
      { who: 'Viajero', text: 'La pieza cayó en el laberinto. Hay un cartel: "SALIDA", con flechas para los cuatro lados.' },
      { who: 'Viajero', text: 'Voy a entrar sin hilo, sin mapa y sin preguntar. Como corresponde.' }
    ],
    bossIntro: [
      { who: 'El Minotauro', spr: 'minotauro', color: '#e03c32', text: '¡Intruso! ¡Nadie entra a mi laberinto y vive para contarlo!' },
      { who: 'Viajero', text: 'Pregunta rápida: ¿la salida para dónde queda?' },
      { who: 'El Minotauro', spr: 'minotauro', color: '#e03c32', text: '...Hace doce años que la busco. ¡NO SE HABLA DE ESO!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El Minotauro se sentó a descansar. Le dejé el hilo de Ariadna; que lo use él.' },
      { who: 'Viajero', text: 'Tres piezas del tronco... ahora la historia se abre en ramas. A elegir continente.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      k: { enemy: 'hoplita' }, a: { enemy: 'arqueroGriego' }, q: { enemy: 'harpia' }, f: { enemy: 'filosofo' }, K: { enemy: 'ciclope' },
      N: { npc: 'diogenes' }, G: { npc: 'ariadna' }, S: { npc: 'ariadna2' }, W: { weapon: 'arco' }, R: { weapon: 'ametralladora', rift: true },
      '1': { decor: 'columna' }, '2': { decor: 'vasija' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    1    N        k      1',
        '#*',
        '#*'
      ],
      [
        '        q             c',
        '      ==        ===',
        '   k       f       W     k   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '               c',
        '            BBBBBB',
        '        BBBBBBBBBBBBBB',
        '   k    BBBBBBBBBBBBBB   a   2',
        '#*',
        '#*'
      ],
      [
        '                     c',
        '          q         ===',
        '       ===     ==',
        '   F   k    f     ^^   k      G',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a                           h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '                 c',
        '         K',
        '   BB  BBBBB   BBBBB     q',
        '   BB  BBBBB a BBBBB  k      1',
        '#*',
        '#*'
      ],
      [
        '      q        c       c',
        '       ===    ===     ===',
        '  k      f        a    k   S   2',
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
