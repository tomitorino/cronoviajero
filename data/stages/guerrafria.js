// ETAPA N4 — GUERRA FRÍA ESPACIAL (rama Norteamérica). Sátira de los generales paranoicos de los DOS bandos y de la
// carrera por ver quién tiene el cohete más grande. Astronautas y cosmonautas (amigos entre sí) son aliados.
CV.stage({
  id: 'guerrafria', tech: 8,
  title: 'GUERRA FRÍA ESPACIAL', subtitle: '1962. Todos espían a todos. Nadie sabe nada.',
  bg: {
    sky: ['#0a0a20', '#1a1a3a', '#3a2a4a', '#6a4a4a'],
    layers: [
      { gen: 'stars', n: 60, maxY: 120, color: '#cfd8ff', speed: .01 },
      { gen: 'sun', x: 310, y: 36, r: 12, color: '#c2c3c7', color2: '#f4f4f4', speed: .01 },
      { gen: 'mesas', n: 2, base: 188, h: 46, color: '#5a4a4a', shade: '#3a2e2e', speed: .08 },
      { gen: 'hills', base: 192, amp: 10, color: '#6a5a4a', top: '#8a7a5a', f1: 2, f2: 5, speed: .2 },
      { gen: 'city', base: 206, min: 8, max: 22, color: '#3a3a3a', win: '#e03c32', lit: .15, gap: 14, speed: .4, seed: 21 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#7a6a52', dark: '#4a3e2e', light: '#9a8a6a', top: '#8a7a5a', topLight: '#aa9a72', topDark: '#4a3e2e', topH: 2 },
    'B': { pattern: 'metal', base: '#5a6a6a', dark: '#2e3a3a', light: '#8a9a9a' },
    '=': { base: '#566c86', dark: '#333c57', light: '#94b0c2' },
    '^': { base: '#e03c32', dark: '#7e2553', light: '#ffcd75' }
  },
  music: {
    bpm: 116, drums: 'k...s..k..k.s...',
    tracks: [
      { wave: 'square', vol: .045, notes: 'e4 _ _ g4 _ _ as4 _ a4 _ _ g4 _ e4 _ _ e4 _ _ g4 _ _ b4 _ as4 _ a4 _ g4 _ e4 _' },
      { wave: 'triangle', vol: .13, notes: 'e2 _ e2 g2 _ e2 as2 a2 e2 _ e2 g2 _ e2 d2 ds2 e2 _ e2 g2 _ e2 as2 a2 g2 _ fs2 _ e2 _ _ _' }
    ]
  },
  ambient: { col: ['#cfd8ff', '#ffffff'], rate: .2, vy: 8, vx: -10, life: 4 },
  heals: ['pastel', 'energia'],
  collectible: { name: 'Microfilm', spr: 'c_chip' },

  sprites: {
    espia: { from: 'yakuza', swap: { f: 'l', r: 'h', c: 'l' } },
    generalito: { from: 'soldado', swap: { q: 'q', e: 'y', h: 'c' } },
    cientifico: { from: 'tunica', swap: { r: 'c', '4': 'd' } },
    cosmonauta: { from: 'soldado', swap: { q: 'o', e: 's', h: 'd', j: 'v' } },
    coheteOvni: {
      rows: [
        '................................', '', '', '', '', '',
        '.........r',
        '........rrr',
        '.......dddddddddddddddd',
        '.....rdddd0bb0dddd0bb0dddd',
        '...rrrddddbbbbddddbbbbdddddd',
        '.oorrrdddd0bb0dddd0bb0ddddddc',
        'yoorrrddddddddddddddddddddddcc',
        '.oorrrdddddrrrrrrrrrrdddddddc',
        '...rrrdddddddddddddddddddddd',
        '.....rdddddddddddddddddddd',
        '.......dddddddddddddddd',
        '........rrr',
        '.........r',
        '', '', '', '', '', '', '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 11: 'yyorrrdddd0bb0dddd0bb0ddddddc', 12: '.yorrrddddddddddddddddddddddcc', 13: 'yyorrrdddddrrrrrrrrrrdddddddc' }, {}],
        a: [{ 13: '.oorrrdddddyyyyyyyyyydddddddc', 15: '.....rddddddddoodddddddddd', 16: '.......ddddddddooddddddd' }]
      }
    },
    p_misil: { rows: ['..rr..', '.cccc.', '.cccc.', '.c00c.', '.cccc.', 'rccccr', 'r.oo.r', '..yy..'] }
  },

  enemies: {
    espia: { sprite: 'espia', ai: 'ranged', hp: 8, speed: 18, sight: 160, cooldown: 2.3, proj: { speed: 220, w: 5, h: 2, col: '#f4f4f4', sfx: 'rifle' }, drop: { weapon: 'rifle', chance: .35 }, barks: ['Soy agente doble. O triple. Perdí la cuenta y cobro de todos.', 'Mi diario tiene dos agujeros. Es para leer mejor.', 'La contraseña es "el águila vuela a medianoche". ¿O era la tuya?'] },
    agente: { sprite: 'yakuza', ai: 'chase', hp: 10, speed: 28, chase: 60, jump: 230, sight: 120, barks: ['Usted no vio nada. Yo tampoco. Esta conversación no existe.', 'Esto no es una base secreta. Es un globo meteorológico. Con alambrado.'] },
    generalito: { sprite: 'generalito', ai: 'ranged', hp: 8, speed: 16, sight: 140, cooldown: 2.9, proj: { speed: 120, grav: 300, spr: 'p_misil', w: 6, h: 8, sfx: 'bang' }, barks: ['¡Tenemos que tener más misiles que ellos! ¿Cuántos tienen? ¡Más!', 'Si ellos tienen un botón rojo, yo quiero dos.', 'No es paranoia si te lo aprueban en el presupuesto.'] },
    grisEscapado: { sprite: 'alien', ai: 'charger', hp: 9, speed: 24, charge: 155, tele: .85, rest: 1.1, sight: 120, animSpeed: 12, barks: ['Quince años en el Área 51. Solo quiero irme a casa.', 'Les expliqué el viaje interestelar. Hicieron una sartén antiadherente.'] },
    platillo: { sprite: 'ovni', ai: 'flyer', hp: 5, speed: 60, hover: 5, sight: 150, sightY: 100, animSpeed: 16 },
    jefeEspias: { sprite: 'espia', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 92, speed: 26, chase: 56, sight: 160, sightY: 70, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡JEFE DE CONTRAESPIONAJE! ¡Me espío a mí mismo, por las dudas!', '¡Todos son sospechosos! ¡Sobre todo yo!'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, lines: ['Arma de otra época contra un jefe: la paradoja sube el triple. Y si se llena, el jefe SE CURA.', 'Usala cuando la barra esté amarilla. O no me hagas caso: nadie leyó el manual. No hay manual.'] },
    astronauta: { sprite: 'astronauta', gift: { heal: 'pastel' }, lines: ['Desde arriba no se ven las fronteras. Se lo dije al general. Me mandó a revisar los ojos.', 'Los espías disparan recto. Los generales tiran misiles en arco: no te quedes quieto.'] },
    cosmonauta: { sprite: 'cosmonauta', gift: { heal: 'energia' }, lines: ['Con el astronauta de ellos jugamos al ajedrez por radio. Los jefes creen que son códigos.', 'Gastaron millones en una lapicera que escriba en el espacio. Nosotros llevamos un lápiz.'] },
    cientifico: { sprite: 'cientifico', gift: { ammo: true }, lines: ['El Cohete lo pilotean dos generales, uno de cada bando. Comparten el miedo.', 'Blindaje abajo no tiene: dale de lejos. Y cuando discuten por el botón rojo, quedan regalados.'] }
  },

  boss: {
    name: 'EL COHETE DE LOS DOS GENERALES', mul: { ranged: 1.25, melee: .9 }, sprite: 'coheteOvni', scale: 2, w: 56, h: 28, hp: 170, mode: 'hover', rest: .9,
    anchors: [[.78, .32], [.22, .32], [.5, .26], [.68, .46], [.32, .46]],
    attacks: {
      misiles: { type: 'shoot', aim: 'arc', count: 5, every: .32, n: 1, sfx: 'bang', proj: { spr: 'p_misil', w: 6, h: 8, grav: 260, life: 5 } },
      rafaga: { type: 'shoot', count: 6, every: .18, n: 1, speed: 195, sfx: 'laser', proj: { col: '#e03c32', col2: '#ffffff', w: 6, h: 3 } },
      bombardeo: { type: 'rain', count: 10, every: .22, speed: 180, proj: { spr: 'p_misil', w: 6, h: 8 } },
      radar: { type: 'lines', kinds: ['beam', 'diag', 'high'], n: 5, every: .34, warn: .8, live: .45, col: '#a7f070', thick: 5 },
      telon: { type: 'lines', kinds: ['pillar', 'floor'], n: 5, every: .32, warn: .8, live: .5, col: '#e03c32', thick: 6 },
      agentes: { type: 'summon', ids: ['espia', 'platillo', 'agente'], n: 2, max: 3 },
      boton: { type: 'taunt', dur: 2.8, say: ['—¡El botón rojo lo aprieto yo! —¡No, yo! —¡Yo lo vi primero!', 'Tenemos armas para destruir el mundo nueve veces. Ellos, once. ¡Hay que llegar a doce!', '—¿Y si nadie aprieta nada? —...Shh. Nos sacan el presupuesto.', 'Llegamos a la Luna para ganarles. Arriba no había nadie a quien ganarle.'] },
      onda: { type: 'radial', count: 3, n: 11, speed: 102, proj: { col: '#a7f070', col2: '#ffffff', w: 4, h: 4 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['rafaga', 'boton', 'bombardeo', 'radar'] },
      { until: .33, speed: 1.15, say: '¡DEFCON 2! ¿O era 4? ¿Cuál es el malo?', pattern: ['telon', 'misiles', 'agentes', 'boton', 'onda', 'bombardeo'] },
      { speed: 1.3, say: '¡¡APRETÁ TODO!! ¡¡Menos el rojo!! ¡¡ESE ERA EL ROJO!!', pattern: ['onda', 'radar', 'bombardeo', 'boton', 'telon', 'rafaga', 'agentes', 'misiles'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: '1962, desierto de Nevada. Hay una base que oficialmente no existe. Tiene estacionamiento.' },
      { who: 'Viajero', text: 'Dos potencias compiten por ver quién llega más lejos, más rápido y con el cohete más grande. Freud haría una fortuna.' },
      { who: 'Viajero', text: 'La pieza de la máquina la tienen clasificada como "tecnología alienígena". Es mía. Tiene mi nombre.' }
    ],
    bossIntro: [
      { who: 'Generales', spr: 'generalito', color: '#a7f070', text: '—¡Alto! ¿Sos espía de ellos? —¡No, es espía de ustedes! —¡¿Entonces de quién es?!' },
      { who: 'Viajero', text: 'Soy del futuro. Les cuento: no se animan a apretar el botón. Ninguno.' },
      { who: 'Generales', spr: 'generalito', color: '#a7f070', text: '—¡Eso es justo lo que diría un espía! —¡Por fin estamos de acuerdo! ¡FUEGO!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El cohete cayó en el desierto. Los dos generales salieron discutiendo quién había chocado primero.' },
      { who: 'Viajero', text: 'El astronauta y el cosmonauta siguen jugando al ajedrez por radio. Van 40 a 38. Nadie más cuenta.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      a: { enemy: 'espia' }, y: { enemy: 'agente' }, b: { enemy: 'generalito' }, p: { enemy: 'grisEscapado' }, q: { enemy: 'platillo' }, K: { enemy: 'jefeEspias' },
      N: { npc: 'astronauta' }, G: { npc: 'cosmonauta' }, S: { npc: 'cientifico' }, W: { weapon: 'rifle' }, A: { weapon: 'ametralladora' }, R: { weapon: 'laser', rift: true },
      '1': { decor: 'antena' }, '2': { decor: 'cactus' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P  & N    2     W    y     1',
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
        '                 c',
        '         q        a      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB p BBBBB  y  b   G',
        '#*',
        '#*'
      ],
      [
        '          q          c    q',
        '               a    ===',
        '       ===    ===',
        '   F   p   ^^ y  ^^^   y   b   1',
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
        '              c    b',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   y    BBBBBBBBBBBBBBB  p a y A',
        '#*',
        '#*'
      ],
      [
        '      q        c       c   q',
        '       ===    ===     ===',
        '  y    a    ^^    K    p b S   2',
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
