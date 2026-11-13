// ETAPA L2 — LA CONQUISTA (rama Latam). Sátira de la codicia: los enemigos son los conquistadores;
// los pueblos originarios son aliados que dan consejos y ayuda.
CV.stage({
  id: 'conquista', tech: 5,
  title: 'LA CONQUISTA', subtitle: '1530. "Descubrieron" un lugar con gente adentro.',
  bg: {
    sky: ['#2a7ac0', '#6ab8e8', '#c8ecf5', '#fff0c0'],
    layers: [
      { gen: 'sun', x: 310, y: 44, r: 18, color: '#fff3c0', color2: '#ffffff', speed: .01 },
      { gen: 'clouds', n: 6, y: 16, h: 50, color: '#ffffff', speed: .04, drift: 3 },
      { gen: 'flat', base: 150, color: '#2a7ab0', top: '#8fd3ff', speed: .03 },
      { gen: 'hills', base: 178, amp: 34, color: '#3a8a5a', top: '#5aa870', f1: 1, f2: 3, speed: .12 },
      { gen: 'hills', base: 198, amp: 14, color: '#e8d08a', top: '#fff1a8', f1: 2, f2: 6, speed: .3 },
      { gen: 'trees', kind: 'palm', n: 8, base: 206, h: 50, color: '#2f6a3a', color2: '#5a3a1a', ground: '#c9a66b', speed: .5 }
    ]
  },
  tiles: {
    '#': { pattern: 'dirt', base: '#c9a66b', dark: '#a08048', light: '#e8d08a', top: '#f0dca0', topLight: '#fff1a8', topDark: '#a08048', topH: 2 },
    'B': { pattern: 'wood', base: '#8b5a2b', dark: '#5a3a1a', light: '#b07a45' },
    '=': { base: '#a8744a', dark: '#6a4428', light: '#d0a070' },
    '^': { base: '#94b0c2', dark: '#566c86', light: '#ffffff' }
  },
  music: {
    bpm: 110, drums: 'k..h..k.h..hk.h.',
    tracks: [
      { wave: 'square', vol: .05, notes: 'd5 _ a4 _ d5 _ f5 _ e5 _ d5 _ c5 _ a4 _ a#4 _ a4 _ g4 _ a4 _ d4 _ _ _ - - - -' },
      { wave: 'triangle', vol: .13, notes: 'd2 _ _ a2 _ _ d3 _ c2 _ _ g2 _ _ c3 _ a#1 _ _ f2 _ _ a#2 _ a1 _ _ e2 _ _ a2 _' }
    ]
  },
  ambient: { col: ['#ffffff', '#fff1a8'], rate: .06, vy: 6, vx: 20, life: 9 },
  heals: ['choclo', 'chocolate'],
  collectible: { name: 'Códice', spr: 'c_codice' },

  sprites: {
    conquistador: {
      rows: [
        '......s.........',
        '.....sss........',
        '....sssss.......',
        '..sssssssss.....',
        '....jjjjj.......',
        '....j0j0j.......',
        '....jhhhj.......',
        '.....hhh........',
        '...sssssss..c...',
        '..jsssdsssj.c...',
        '..j.sssss.jc....',
        '....sdsds..4....',
        '....oo.oo.......',
        '....oo.oo.......',
        '....00.00.......',
        '...000.000......'
      ],
      anim: { walk: [{ 13: '...oo...oo......', 14: '..00.....00.....', 15: '.000.....000....' }, {}] }
    },
    arcabucero: { from: 'conquistador', swap: { s: 'e', o: 'r', c: 'f' } },
    capitan: { from: 'conquistador', swap: { s: '4', o: '1', d: 'o' } },
    guia: {
      rows: [
        '................',
        '.....00000......',
        '....0000000.....',
        '....rrrrrrr.....',
        '....lllllll.....',
        '....l0lll0l.....',
        '....lllllll.....',
        '.....lllll......',
        '....3333333.....',
        '...333c3c333....',
        '..l333333333l...',
        '..l.3c3c3c3.l...',
        '....3333333.....',
        '....ll...ll.....',
        '....ll...ll.....',
        '...ggg...ggg....'
      ]
    },
    codicio: {
      rows: [
        '................................',
        '..............ss................',
        '.............ssss...............',
        '...........ssssssss.............',
        '.........ssssssssssss...........',
        '........ssssssssssssss..........',
        '..........jjjjjjjjjj............',
        '..........j44jjjj44j............',
        '..........j40jjjj40j............',
        '..........jjjjhhjjjj............',
        '..........jhhhhhhhhj............',
        '...........hhhhhhhh.............',
        '......ssssssssssssssssss........',
        '.....ssssssdsssssdsssssss.......',
        '....sssssssdsssssdssssssss......',
        '....sss.sssssssssssss.ffffffffff',
        '....sss.ssss4444sssss.ffffffff0f',
        '....sss.sssss44ssssss.ffffffffff',
        '....sss.sssssssssssss..ee.......',
        '....jjj.ssdsssssssdss...........',
        '........sssssssssssss...........',
        '........4444444444444...........',
        '........ooooooooooooo...........',
        '........oooooo.oooooo...........',
        '........ooooo...ooooo...........',
        '........sssss...sssss...........',
        '........sssss...sssss...........',
        '........sssss...sssss...........',
        '........sssss...sssss...........',
        '.......ssssss...ssssss..........',
        '......0000000...0000000.........',
        '................................'
      ],
      anim: { a: [{ 10: '..........jhh000000j............', 15: '....sss.sssssssssssss.ffffffffo4', 16: '....sss.ssss4444sssss.ffffffff4y', 17: '....sss.sssss44ssssss.ffffffffo4' }] }
    },
    c_codice: { rows: ['..........', '.pppppppp.', '.pr6prp6p.', '.pppppppp.', '.p6prp6rp.', '.pppppppp.', '.prp6prpp.', '.pppppppp.', '..........', '..........'] }
  },

  enemies: {
    conquistador: { sprite: 'conquistador', ai: 'chase', hp: 7, speed: 24, chase: 48, sight: 95, drop: { weapon: 'espada', chance: .4 }, barks: ['¡ORO!', '¿Para dónde queda El Dorado?', '¡Eso brilla! Ah, no. Era el sol.', '¡Reclamo esta piedra! Y esa otra.'] },
    arcabucero: { sprite: 'arcabucero', ai: 'ranged', hp: 5, speed: 18, sight: 150, cooldown: 3, proj: { speed: 200, w: 4, h: 3, col: '#333c57', sfx: 'bang' }, drop: { weapon: 'mosquete', chance: .5 }, barks: ['¡Recargando! Deme cuarenta segundos.', '¿Alguien vio la mecha?'] },
    capitan: { sprite: 'capitan', ai: 'chase', mini: true, heavy: true, scale: 2, w: 22, h: 28, hp: 50, speed: 24, chase: 56, jump: 250, sight: 150, sightY: 70, paradox: false, drop: { weapon: 'ballesta' }, barks: ['¡Soy el Capitán Codicia!', '¡Mi armadura es de oro! Pesa muchísimo.'] }
  },

  npcs: {
    guia1: { sprite: 'guia', gift: { heal: 'chocolate' }, lines: ['Llegaron preguntando por oro. Les señalamos para allá, bien lejos. Siguen caminando.', 'Los de armadura son lentos. Y si ven algo brillante, se distraen solos.'] },
    guia2: { sprite: 'guia', gift: { heal: 'choclo' }, lines: ['Tomá, choclo. Ellos se lo van a llevar y van a decir que lo inventaron.', 'Dicen que "descubrieron" esto. Nosotros ya sabíamos dónde estaba.'] },
    guia3: { sprite: 'guia', gift: { ammo: true }, lines: ['El grandote del cañón tarda en recargar. Ahí es cuando hay que pegarle.', 'Cuando grite "¡ORO!", no mires: es mentira. Siempre es mentira.'] }
  },

  boss: {
    name: 'DON CODICIO, EL DE LA ARMADURA', mul: { melee: 1.3, ranged: 0.8 }, sprite: 'codicio', scale: 2, w: 40, h: 52, hp: 160, walk: 14, rest: 1,
    attacks: {
      canon: { type: 'shoot', count: 2, every: .9, n: 1, speed: 170, sfx: 'bang', proj: { col: '#333c57', col2: '#566c86', w: 9, h: 9 } },
      mortero: { type: 'shoot', aim: 'arc', count: 3, every: .5, n: 1, sfx: 'bang', proj: { col: '#333c57', col2: '#566c86', w: 8, h: 8, grav: 300, bounce: 2, life: 5 } },
      pisoton: { type: 'jump', power: 300 },
      tropa: { type: 'summon', ids: ['conquistador', 'arcabucero'], n: 2, max: 3 },
      oro: { type: 'taunt', dur: 2.7, say: ['¡¿ESO ES ORO?! Ah, no. Era una mazorca.', 'Recargando el cañón... ¿alguien vio la pólvora?', '¡Reclamo esta tierra en nombre de... de...! Se me olvidó.', 'Esta armadura no tiene bolsillos. Error de diseño.'] },
      monedas: { type: 'rain', count: 7, every: .26, speed: 175, proj: { spr: 'c_denario', w: 8, h: 8, spin: true } }
    },
    phases: [
      { until: .66, speed: 1, pattern: ['canon', 'oro', 'mortero', 'pisoton'] },
      { until: .33, speed: 1.15, say: '¡Todo lo que brilla es MÍO! Y lo que no brilla, también.', pattern: ['mortero', 'tropa', 'canon', 'oro', 'monedas'] },
      { speed: 1.3, say: '¡¡MÁS ORO!! ¡¡MÁS!!', pattern: ['monedas', 'pisoton', 'mortero', 'canon', 'oro', 'tropa'] }
    ]
  },

  dialogs: {
    intro: [
      { who: 'Viajero', text: 'Playa, galeones y señores en armadura con cuarenta grados de calor. Decisiones.' },
      { who: 'Viajero', text: 'Dicen que vienen a "descubrir". Hay gente saludándolos desde la orilla hace una hora.' },
      { who: 'Viajero', text: 'Y preguntan una sola cosa: dónde está el oro. Ni un "buenos días".' }
    ],
    bossIntro: [
      { who: 'Don Codicio', spr: 'codicio', color: '#ffcd75', text: '¡Alto! Esa cosa metálica que buscas... ¿es de oro?' },
      { who: 'Viajero', text: 'Es una pieza de una máquina del tiempo. Aleación de titanio.' },
      { who: 'Don Codicio', spr: 'codicio', color: '#ffcd75', text: '"Titanio"... suena a oro con otro nombre. ¡ES MÍA! ¡Como todo lo demás!' }
    ],
    bossDefeat: [
      { who: 'Viajero', text: 'Don Codicio se hundió en la arena: la armadura de oro pesaba demasiado. Poético.' },
      { who: 'Viajero', text: 'Los vecinos se quedaron con el cañón. Dicen que va a ser una linda maceta.' }
    ]
  },

  level: {
    height: 14,
    legend: {
      k: { enemy: 'conquistador' }, a: { enemy: 'arcabucero' }, q: { enemy: 'mosquito' }, K: { enemy: 'capitan' },
      N: { npc: 'guia1' }, G: { npc: 'guia2' }, S: { npc: 'guia3' }, W: { weapon: 'ballesta' },
      '1': { decor: 'helecho' }, '2': { decor: 'huesos' }
    },
    segments: [
      [
        '               c',
        '             ====',
        '  P    1    N         k     1',
        '#*',
        '#*'
      ],
      [
        '       q              q',
        '                 c',
        '      ==        ===',
        '   k       a           k     h',
        '########   #######   ########',
        '########   #######   ########'
      ],
      [
        '                 a',
        '            c  BBBBB',
        '       BBBBBBBBBBBBBBBB',
        '   k   BBBBBBBBBBBBBBBB   G   2',
        '#*',
        '#*'
      ],
      [
        '       K    c',
        '     BBBBBBBBBBB',
        '',
        '                  ==',
        '              ==          q',
        '   F    a          k        1',
        '#*',
        '#*'
      ],
      [
        '            c             c',
        '      ==      ==     ===',
        '  k                            h',
        '#####   ###      ###     ######',
        '#####   ###      ###     ######'
      ],
      [
        '          q',
        '                  W',
        '     BBB        BBBBB',
        '  a  BBB   k ^^ BBBBB   a   1',
        '#*',
        '#*'
      ],
      [
        '               c',
        '       ===    ===',
        '  k   q    k       a    S    2',
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
