// ETAPA A4 — ERA DEL MONSTRUO GIGANTE (rama Asia). Todo es un set de filmación: sátira del productor tacaño.
// El "kaiju" es un señor en un traje, mal pago; maquetistas y dobles son aliados.
CV.stage({
  id: 'kaiju', tech: 7,
  title: 'ERA DEL MONSTRUO GIGANTE', subtitle: '1965. La ciudad es de cartón. El presupuesto, también.',
  bg: {
    sky: ['#1a1c3c', '#4a3a6a', '#b0506a', '#f09060'],
    layers: [
      { gen: 'stars', n: 30, maxY: 70, color: '#cfd8ff', speed: .01 },
      { gen: 'clouds', n: 5, y: 20, h: 40, color: '#6a4a7a', speed: .05, drift: 3 },
      { gen: 'city', base: 190, min: 30, max: 80, color: '#3a3a5a', win: '#ffe9a0', lit: .45, speed: .14, seed: 4 },
      { gen: 'city', base: 204, min: 14, max: 40, color: '#2a2a3a', win: ['#ffe9a0', '#ff77a8'], lit: .35, gap: 6, tank: true, speed: .4, seed: 11 }
    ]
  },
  tiles: {
    '#': { pattern: 'pave', base: '#5a5a6a', dark: '#3a3a4a', light: '#7a7a8a', top: '#6a6a7a', topLight: '#9a9aaa', topDark: '#3a3a4a', topH: 2 },
    'B': { pattern: 'brick', base: '#b89a6a', dark: '#7a5a3a', light: '#d8ba8a' },
    '=': { base: '#8b5a2b', dark: '#5a3a1a', light: '#c68642' },
    '^': { base: '#c2c3c7', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 96, drums: 'k...k...k.s.k.ss',
    tracks: [
      { wave: 'sawtooth', vol: .04, notes: 'c3 _ c3 _ ds3 _ c3 _ fs3 _ f3 _ ds3 _ c3 _ c3 _ c3 _ ds3 _ g3 _ gs3 _ g3 _ fs3 _ _ _' },
      { wave: 'triangle', vol: .14, notes: 'c2 _ _ c2 _ _ c2 _ c2 _ _ c2 _ _ g1 _ c2 _ _ c2 _ _ ds2 _ d2 _ _ d2 _ _ g1 _' }
    ]
  },
  ambient: { col: ['#ffcd75', '#c2c3c7'], rate: .3, vy: 40, vx: -10, life: 3 },
  heals: ['sushi', 'ramen'],
  collectible: { name: 'Lata de película', spr: 'c_denario' },

  sprites: {
    yakuza: {
      rows: [
        '................',
        '.....000000',
        '....00000000',
        '....jjjjjjjj',
        '....0000000j',
        '....jjjjjjjj',
        '.....jjjjjj',
        '...ffffffffff',
        '..fffcfrcfffff',
        '..ffffcrcfff.j',
        '..j.ffcrcff',
        '....ffffff',
        '....ff..ff',
        '....ff..ff',
        '....ff..ff',
        '...000..000'
      ],
      anim: { walk: [{ 12: '...ff....ff', 13: '...ff....ff', 14: '...ff....ff', 15: '..000....000' }, {}] }
    },
    productor: { from: 'yakuza', swap: { f: 'c', r: 'y' } },
    doble: { from: 'yakuza', swap: { f: '6', r: 'x', c: '6' } },
    extra: { from: 'soldado', swap: { q: '6', e: 'q' } },
    maquetista: { from: 'tunica', swap: { r: 'a', '4': 'c' } },
    robotLata: { from: 'robopoli', swap: { '9': 'g', d: 'i', r: 'y', e: 'h' } },
    kaiju: {
      rows: [
        '................................', '', '', '', '', '',
        '..............666666',
        '.............66666666',
        '............6606666066',
        '............6666666666',
        '............66cc0cc0c66',
        '............666666666666',
        '.........x...66666666',
        '........xx..6666666666',
        '.......xx6.666666y666666',
        '......xx66666666y6666666666',
        '.....xx6666.6666y6666.66666',
        '....xx666...6666y6666...666',
        '...xx666....6666y6666...ccc',
        '..xx666.....6666y6666',
        '.xx6666....666666y66666',
        'xx66666...6666666y666666',
        '.6666666666666666y666666',
        '..666666666666666y66666',
        '....66666666666666y666',
        '.......6666666666666666',
        '.......666666..666666',
        '.......66666....66666',
        '.......66666....66666',
        '.......66666....66666',
        '......666666....666666',
        '.....ccc6666....6666ccc'
      ],
      anim: {
        walk: [{ 28: '......66666......66666', 29: '.....66666........66666', 30: '....666666........666666', 31: '...ccc6666........6666ccc' }, {}],
        a: [{ 10: '............66c0000c066', 11: '............66cc0cc0c666bbb', 12: '.........x...66666666..bbbbb', 16: '.....xx6666.6666y6666.66666ccc', 17: '....xx666...6666y6666', 18: '...xx666....6666y6666' }]
      }
    },
    p_edificio: { rows: ['iiiiii', 'i0i0ii', 'iiiiii', 'ii0i0i', 'iiiiii', 'i0i0ii', 'iiiiii', 'iiiiii'] }
  },

  enemies: {
    extra: { sprite: 'extra', ai: 'ranged', hp: 6, speed: 18, sight: 150, cooldown: 2.4, proj: { speed: 220, w: 5, h: 2, col: '#ffcd75', sfx: 'rifle' }, drop: { weapon: 'rifle', chance: .35 }, barks: ['¡Disparo de utilería! Duele igual, perdón.', 'Soy el soldado número 4. Me aplastan en la escena dos.', 'Me pagan con una vianda. Fría.'] },
    yakuza: { sprite: 'yakuza', ai: 'chase', hp: 9, speed: 26, chase: 56, jump: 230, sight: 110, barks: ['Soy actor. El tatuaje es calcomanía.', 'Hago de mafioso. El productor me debe tres meses: capaz me lo tomo en serio.', '¡Te voy a...! Perdón, ¿cuál era mi línea?'] },
    robotLata: { sprite: 'robotLata', ai: 'charger', hp: 8, speed: 22, charge: 150, tele: .85, rest: 1.1, sight: 120, animSpeed: 12, barks: ['BIP BOP. (Soy un tacho con brazos.)', 'ROBOT GIGANTE. ESCALA 1 EN 40.', 'NO VEO NADA ACÁ ADENTRO.'] },
    avioncito: { sprite: 'biplano', ai: 'flyer', hp: 4, speed: 58, hover: 5, sight: 150, sightY: 100, animSpeed: 20 },
    luces: { sprite: 'bombardero', ai: 'ranged', hp: 6, speed: 16, sight: 140, cooldown: 3, proj: { speed: 120, grav: 300, spr: 'p_edificio', w: 6, h: 8 }, barks: ['¡Cuidado, maqueta va!', 'Efectos especiales: revoleo cosas.'] },
    productor: { sprite: 'productor', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 30, hp: 84, speed: 26, chase: 56, sight: 160, sightY: 70, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡CORTEN! ¡Salió bien! ¡No hay plata para otra toma!', '¡La secuela ya está vendida! ¡Falta filmar esta!', '¿Sindicato? ¡Acá somos una gran familia que no cobra!'] }
  },

  npcs: {
    profe: { sprite: 'profe', chain: true, lines: ['Un arma mejorada pega más y carga más balas. Tecla I, elegís el arma y X para mejorar.', 'No hay reembolso de reliquias. Está en la letra chica. La letra chica la escribí después.'] },
    maquetista: { sprite: 'maquetista', gift: { heal: 'sushi' }, lines: ['Tres meses armando la ciudad a escala. En pantalla dura cuatro segundos.', 'Después viene el del traje y la pisa. Es mi trabajo y lo odio. Y lo amo.'] },
    doble: { sprite: 'doble', gift: { heal: 'ramen' }, lines: ['Soy el doble de riesgo del monstruo. Sí, el traje tiene doble.', 'Los robots de lata embisten sin ver nada. Saltalos, pobres.'] },
    maquetista2: { sprite: 'maquetista', gift: { ammo: true }, lines: ['El Kaiju es un tal Haruo. Buen tipo. Dieciséis horas por día ahí adentro.', 'Cuando se queja de la cremallera, se queda quieto. Aprovechá. No le pegues muy fuerte.'] }
  },

  boss: {
    name: 'EL KAIJU (UN SEÑOR EN UN TRAJE)', mul: { melee: 0.85, ranged: 1.3 }, sprite: 'kaiju', scale: 2, w: 40, h: 52, hp: 170, walk: 16, rest: 1,
    attacks: {
      embestida: { type: 'charge', speed: 200, tele: .8 },
      aliento: { type: 'lines', kinds: ['beam', 'diag'], n: 5, every: .34, warn: .8, live: .5, col: '#73eff7', thick: 6 },
      pisoton: { type: 'jump', power: 330 },
      maquetas: { type: 'rain', count: 10, every: .22, speed: 180, proj: { spr: 'p_edificio', w: 6, h: 8 } },
      rayos: { type: 'shoot', count: 3, every: .6, n: 5, spread: .5, speed: 150, sfx: 'laser', proj: { col: '#73eff7', col2: '#ffffff', w: 6, h: 3 } },
      elenco: { type: 'summon', ids: ['avioncito', 'extra', 'robotLata'], n: 2, max: 3 },
      cremallera: { type: 'taunt', dur: 2.8, say: ['¡Corten, corten! Me pica la cremallera y no llego.', '¿Sabés el calor que hace acá adentro? Cuarenta grados. Y no veo nada.', 'El productor dice que el rugido lo doblan después. Yo hago "grrr" bajito.', 'Soy Haruo. Tengo dos hijos. Destruyo Tokio de lunes a sábado.'] },
      cola: { type: 'lines', kinds: ['floor', 'high'], n: 4, every: .4, warn: .85, live: .5, col: '#38b764', thick: 6 },
      onda: { type: 'radial', count: 3, n: 11, speed: 100, proj: { col: '#73eff7', col2: '#ffffff', w: 4, h: 4 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['rayos', 'cremallera', 'cola', 'embestida'] },
      { until: .33, speed: 1.15, say: '¡El productor dice "más destrucción"! ¡Perdón, eh!', pattern: ['maquetas', 'aliento', 'elenco', 'cremallera', 'pisoton', 'onda'] },
      { speed: 1.3, say: '¡¡TOMA FINAL!! ¡¡Si sale mal no hay otra!!', pattern: ['onda', 'embestida', 'maquetas', 'cremallera', 'aliento', 'pisoton', 'elenco', 'rayos'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Tokio, 1965. Un monstruo gigante ataca la ciudad. Otra vez. Es el tercero este mes.' },
      { who: 'Viajero', text: 'Mirando bien: los edificios me llegan a la cintura y los aviones cuelgan de hilos.' },
      { who: 'Viajero', text: 'Es un set de filmación. La pieza de la máquina la usan de "arma secreta" en la película.' }
    ],
    bossIntro: [
      { who: 'Kaiju', spr: 'doble', color: '#38b764', text: '¡GRRROOOAAR! ...¿Vos sos del elenco? No estás en el guion.' },
      { who: 'Viajero', text: 'Vengo por la pieza. ¿Estás bien ahí adentro? Se te ve transpirado.' },
      { who: 'Kaiju', spr: 'doble', color: '#38b764', text: 'Dieciséis horas de traje. El productor grita "¡acción!". Nada personal: ¡GROAR!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'Haruo se sacó la cabeza del traje y respiró por primera vez desde marzo.' },
      { who: 'Viajero', text: 'Armaron un sindicato: monstruos, maquetistas y extras. El productor ahora hace de edificio.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      '&': { npc: 'profe' },
      a: { enemy: 'extra' }, y: { enemy: 'yakuza' }, r: { enemy: 'robotLata' }, q: { enemy: 'avioncito' }, b: { enemy: 'luces' }, K: { enemy: 'productor' },
      N: { npc: 'maquetista' }, G: { npc: 'doble' }, S: { npc: 'maquetista2' }, W: { weapon: 'rifle' }, A: { weapon: 'ametralladora' }, R: { weapon: 'laser', rift: true },
      '1': { decor: 'tacho' }, '2': { decor: 'semaforo' }
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
        '              c    b',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   a    BBBBBBBBBBBBBBB  y r   2',
        '#*',
        '#*'
      ],
      [
        '        q             c      q',
        '      ==        ===',
        '   y       a        b    r   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '          q          c    q',
        '               a    ===',
        '       ===    ===',
        '   F   r   ^^ y  ^^^   y   b   G',
        '#*',
        '#*'
      ],
      [
        '                 c',
        '                  a      q',
        '   BB  BBBBB   BBBBB',
        '   BB  BBBBB r BBBBB  y  a   A',
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
        '  y    a    ^^    K    r a S   1',
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
