// ETAPA E4 — LA GRAN GUERRA ABSURDA (rama Europa). Sátira de los generales que mandan desde lejos;
// los soldados de los dos bandos que juegan al fútbol en la tregua son aliados.
CV.stage({
  id: 'guerra1', tech: 7,
  title: 'LA GRAN GUERRA ABSURDA', subtitle: '1916. Nadie recuerda por qué empezó.',
  bg: {
    sky: ['#4a4a52', '#6a6a70', '#8a8a88', '#b0a890'],
    layers: [
      { gen: 'clouds', n: 9, y: 10, h: 70, color: '#5a5a62', speed: .05, drift: 4 },
      { gen: 'hills', base: 184, amp: 22, color: '#5a5448', top: '#6a6450', f1: 1, f2: 3, speed: .12 },
      { gen: 'hills', base: 198, amp: 12, color: '#4a4034', top: '#5a5040', f1: 2, f2: 7, speed: .3 },
      { gen: 'trees', kind: 'pine', n: 4, base: 206, h: 34, color: '#2a2a2a', color2: '#2a2018', ground: '#3a3228', speed: .5 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#5a4a38', dark: '#3a2e22', light: '#7a6a52', top: '#6a5a44', topLight: '#8a7a5a', topDark: '#3a2e22', topH: 2 },
    'B': { pattern: 'wood', base: '#6a5238', dark: '#3e2a14', light: '#8a7252' },
    '=': { base: '#7a6248', dark: '#4a3a28', light: '#a08a68' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 100, drums: 'k.s.k.s.kks.k.ss',
    tracks: [
      { wave: 'square', vol: .05, notes: 'e4 _ e4 g4 _ e4 b4 _ a4 _ g4 _ e4 _ d4 _ e4 _ e4 g4 _ b4 d5 _ b4 _ a4 _ b4 _ _ _' },
      { wave: 'triangle', vol: .13, notes: 'e2 _ b1 _ e2 _ b1 _ a1 _ e2 _ a1 _ b1 _ e2 _ b1 _ g2 _ d2 _ a1 _ b1 _ e2 _ _ _' }
    ]
  },
  ambient: { col: ['#94b0c2', '#c2c3c7'], rate: .5, vy: 140, vx: -30, life: 2 },
  heals: ['chocolate', 'estofado'],
  collectible: { name: 'Carta a casa', spr: 'c_papiro' },

  sprites: {
    soldado: {
      rows: [
        '................',
        '.....eeeee',
        '....eeeeeee',
        '...eeeeeeeee',
        '.....jjjjj',
        '.....j0j0j',
        '.....jjjjj',
        '....qqqqqqq...d',
        '...qqhqqqhqq..d',
        '...jqqhqhqqjjjh',
        '...j.qqqqq...h',
        '.....qqqqq',
        '.....qq.qq',
        '.....qq.qq',
        '.....hh.hh',
        '....000.000'
      ],
      anim: { walk: [{ 13: '....qq...qq', 14: '....hh...hh', 15: '...000...000' }, {}] }
    },
    asalto: { from: 'soldado', swap: { q: 'e', e: 'f' } },
    bombardero: { from: 'soldado', swap: { q: 'g' } },
    futbolA: { from: 'soldado', swap: { q: 'a', e: 'j', d: 'c', h: 'c' } },
    futbolB: { from: 'soldado', swap: { q: 'r', e: 'j', d: 'c', h: 'c' } },
    biplano: {
      rows: [
        '................', '', '',
        '...sssssssssss',
        '....d.......d',
        '...sssssssssss.c',
        '.o..d..jj...d..c',
        '.ooooooooooooooc',
        '.o.ooooooooooo.c',
        '......0...0',
        '......0...0',
        '', '', '', '', ''
      ],
      anim: { walk: [{ 5: '...sssssssssss', 6: '.o..d..jj...d.cc', 8: '.o.ooooooooooo' }, {}] }
    },
    tanquecito: {
      rows: [
        '................', '', '', '', '', '',
        '......eeee',
        '.....eeeeeedddd',
        '.....eeeeee',
        '..eeeeeeeeeeee',
        '.eeeqeeeeeeqeee',
        '.eeeeeeeeeeeeee',
        '.00000000000000',
        '.0d0d0d0d0d0d00',
        '.00000000000000',
        '..000000000000'
      ],
      anim: { walk: [{ 13: '.00d0d0d0d0d0d0' }, {}] }
    },
    triplano: {
      rows: [
        '................................', '', '', '', '', '',
        '......rrrrrrrrrrrrrrrrrrrr',
        '......r2222222222222222r',
        '.........d........d',
        '......rrrrrrrrrrrrrrrrrrrr....s',
        '......r2222222222222222r......s',
        '.........d...jjj..d...........s',
        '.rr......d..j0j0j.d..........sss',
        '.rrr....rrrrrrrrrrrrrrrrrrrr.s0s',
        '.rrrrrrrrrrrrcrrrcrrrrrrrrrrrsss',
        '.rrrrrrrrrrrrrcrcrrrrrrrrrrrr.s',
        '..rr....rrrrrrcrcrrrrrrrrrr...s',
        '......rrrrrrrrrrrrrrrrrrrr....s',
        '......r2222222222222222r',
        '...........d.....d',
        '..........000...000',
        '..........000...000',
        '', '', '', '', '', '', '', '', '', ''
      ],
      anim: {
        walk: [{ 9: '......rrrrrrrrrrrrrrrrrrrr', 10: '......r2222222222222222r', 11: '.........d...jjj..d', 12: '.rr......d..j0j0j.d........sssss', 14: '.rrrrrrrrrrrrcrrrcrrrrrrrrrrsssss', 15: '.rrrrrrrrrrrrrcrcrrrrrrrrrrrr', 16: '..rr....rrrrrrcrcrrrrrrrrrr', 17: '......rrrrrrrrrrrrrrrrrrrr' }, {}],
        a: [{ 12: '.rr......d..j0j0j.d..........sss', 13: '.rrr....rrrrrrrrrrrrrrrrrrrr.s0sy' }]
      }
    },
    p_bomba: { rows: ['..00..', '.0000.', '000000', '000000', '.0000.', '..00..', '..rr..', '.r..r.'] }
  },

  enemies: {
    soldado: { sprite: 'soldado', ai: 'ranged', hp: 6, speed: 18, sight: 160, cooldown: 2.4, proj: { speed: 230, w: 5, h: 2, col: '#ffcd75', sfx: 'rifle' }, drop: { weapon: 'rifle', chance: .4 }, barks: ['¿Contra quién era hoy?', 'Ganamos dos metros. Ayer perdimos tres.', '¡Por la patria! ¿Cuál era la nuestra?'] },
    asalto: { sprite: 'asalto', ai: 'chase', hp: 8, speed: 26, chase: 56, jump: 230, sight: 110, barks: ['¡A la carga! ¡Órdenes de uno que no vino!', '¡Salgan de la trinchera! —Salí vos.'] },
    bombardero: { sprite: 'bombardero', ai: 'ranged', hp: 6, speed: 16, sight: 140, cooldown: 3, proj: { speed: 120, grav: 300, spr: 'p_bomba', w: 6, h: 6, sfx: 'bang' }, barks: ['¡Granada! ...¿Le saqué el seguro?'] },
    biplano: { sprite: 'biplano', ai: 'flyer', hp: 4, speed: 56, hover: 5, sight: 150, sightY: 100, animSpeed: 20 },
    tanquecito: { sprite: 'tanquecito', ai: 'chase', mini: true, heavy: true, scale: 2, w: 26, h: 20, hp: 80, speed: 18, chase: 40, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'ametralladora' }, barks: ['¡Brum brum! (va a 4 km/h)', '¡Se atascó en el barro! ¡Otra vez!'] }
  },

  npcs: {
    futbolA: { sprite: 'futbolA', gift: { heal: 'chocolate' }, lines: ['Hoy hay tregua: jugamos al fútbol contra los de enfrente. Van 3 a 3.', 'Los generales dicen que mañana hay que volver a pelear. Que vengan ellos.'] },
    futbolB: { sprite: 'futbolB', gift: { heal: 'estofado' }, lines: ['Los de la otra trinchera son buena gente. El 9 de ellos la rompe.', 'Ojo con los que tiran granadas: caen en arco. Avanzá o retrocedé, no te quedes.'] },
    futbolA2: { sprite: 'futbolA', gift: { ammo: true }, lines: ['El Barón del triplano viene picado en línea. Si ves la marca en el piso, correte.', 'Cuando se pone a posar para la foto, está regalado.'] }
  },

  boss: {
    name: 'EL BARÓN DEL TRIPLANO ROJO', mul: { ranged: 1.25 }, sprite: 'triplano', scale: 2, w: 50, h: 32, hp: 170, mode: 'hover', rest: .9,
    anchors: [[.78, .32], [.22, .32], [.5, .28], [.68, .46], [.32, .46]],
    attacks: {
      rafaga: { type: 'shoot', count: 6, every: .18, n: 1, speed: 190, sfx: 'shoot', proj: { col: '#ffe14a', col2: '#ffffff', w: 5, h: 2 } },
      bombas: { type: 'rain', count: 9, every: .22, speed: 170, proj: { spr: 'p_bomba', w: 6, h: 8 } },
      picada: { type: 'lines', kinds: ['diag', 'beam'], n: 5, every: .32, warn: .8, live: .45, col: '#e03c32', thick: 6 },
      barrido: { type: 'lines', kinds: ['floor', 'high'], n: 4, every: .4, warn: .85, live: .5, col: '#ffe14a', thick: 5 },
      refuerzos: { type: 'summon', ids: ['asalto', 'biplano'], n: 2, max: 3 },
      foto: { type: 'taunt', dur: 2.6, say: ['¡Un momento! Foto para el diario. ¿Salgo bien de perfil?', 'El general manda felicitaciones. Desde su castillo. A 300 km.', '¡Ochenta victorias! Setenta y nueve eran globos.', 'Pinté el avión de rojo para que NO me vean. Esperá...'] },
      metralla: { type: 'radial', count: 3, n: 10, speed: 100, proj: { col: '#ffe14a', col2: '#ffffff', w: 4, h: 4 } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['rafaga', 'foto', 'bombas', 'barrido'] },
      { until: .33, speed: 1.15, say: '¡Ahora sí! ¡Maniobra que inventé recién!', pattern: ['picada', 'rafaga', 'refuerzos', 'foto', 'metralla', 'bombas'] },
      { speed: 1.3, say: '¡¡Sin nafta y sin plan!! ¡¡Como toda esta guerra!!', pattern: ['metralla', 'picada', 'bombas', 'foto', 'barrido', 'rafaga', 'refuerzos'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Barro, alambre y dos trincheras a veinte metros. Llevan dos años ahí.' },
      { who: 'Viajero', text: 'Pregunté por qué pelean. Me dijeron "por un archiduque". Nadie sabe cuál.' },
      { who: 'Viajero', text: 'Los que dieron la orden están tomando el té bien lejos. Los que la cumplen, acá.' }
    ],
    bossIntro: [
      { who: 'El Barón', spr: 'soldado', color: '#e03c32', text: '¡Achtung! ¡Soy el as de ases! ¡El terror de los cielos!' },
      { who: 'Viajero', text: 'Abajo están jugando al fútbol los dos bandos. ¿No querés bajar?' },
      { who: 'El Barón', spr: 'soldado', color: '#e03c32', text: '...¿Hay lugar de arquero? ¡NO! ¡Tengo órdenes! ¡Del que no vino!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'El Barón aterrizó en un charco. Lo pusieron de arquero. Ataja bastante.' },
      { who: 'Viajero', text: 'El partido terminó 5 a 5. Fue lo único sensato de toda la guerra.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      k: { enemy: 'asalto' }, a: { enemy: 'soldado' }, b: { enemy: 'bombardero' }, q: { enemy: 'biplano' }, r: { enemy: 'rata' }, K: { enemy: 'tanquecito' },
      N: { npc: 'futbolA' }, G: { npc: 'futbolB' }, S: { npc: 'futbolA2' }, W: { weapon: 'rifle' }, A: { weapon: 'ametralladora' }, R: { weapon: 'laser', rift: true },
      '1': { decor: 'huesos' }, '2': { decor: 'estandarte' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    N    G     W    r     1',
        '#*',
        '#*'
      ],
      [
        '        q             c',
        '      ==        ===          q',
        '   k       a        b    k   h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '              c    b',
        '            BBBBBBBBB',
        '        BBBBBBBBBBBBBBB',
        '   a    BBBBBBBBBBBBBBB   k a 2',
        '#*',
        '#*'
      ],
      [
        '          q          c',
        '               a    ===',
        '       ===    ===',
        '   F   k   ^^ r  ^^^   k   b   A',
        '#*',
        '#*'
      ],
      [
        '            c           R',
        '      ==       ==      ===',
        '  a        q           q      h',
        '#####   ####    ###      ######',
        '#####   ####    ###      ######'
      ],
      [
        '                 c',
        '                  b',
        '   BB  BBBBB   BBBBB     q',
        '   BB  BBBBB a BBBBB  K      1',
        '#*',
        '#*'
      ],
      [
        '      q        c       c',
        '       ===    ===     ===',
        '  k    a    ^^    b    k a S   2',
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
