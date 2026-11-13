// Datos comunes a todas las etapas: héroe, armas, ítems y música del mapa.
// Los sprites son grillas: cada caracter es un color de CV.PAL (ver js/sprites.js); '.' = transparente.
// 'anim' define cuadros extra como "parches" de filas sobre la grilla base: {fila: 'nueva fila'}.

CV.defineSprites({
  hero: {
    rows: [
      '.....hhhhhh.....',
      '....hhhhhhhh....',
      '....h0bb0bb0....',
      '....hjj0jj0j....',
      '....jjjjjjjj....',
      '.....jjjjjj.....',
      '..222222222.....',
      '.22..gggggg.....',
      '.....gggggg.....',
      '....jggiiggj....',
      '.....gggggg.....',
      '.....g0440g.....',
      '.....999999.....',
      '.....99..99.....',
      '.....99..99.....',
      '....000..000....'
    ],
    anim: {
      walk: [
        { 13: '....999..99.....', 14: '...99.....99....', 15: '..000.....000...' }, {},
        { 6: '...22222222.....', 7: '..2..gggggg.....', 13: '......9999......', 14: '......9999......', 15: '.....00000......' }, {}
      ],
      jump: [{ 6: '.2.22222222.....', 7: '2....gggggg.....', 9: '...jgggiigggj...', 13: '....999..99.....', 14: '....00....99....', 15: '..........000...' }],
      attack: [{ 9: '....jggiigggjj..' }]
    }
  },

  // el Dr. Cronos: inventó la máquina, la vendió usada y no acepta devoluciones
  profe: {
    rows: ['................', '...c.cccc.c', '..cccccccccc', '..ccjjjjjjcc', '...j0bj0bj', '...jjjjjjj', '....jcccj', '...cccccccc', '..ccc9cc9ccc', '..cjcccccccj', '....cccccc', '....cccccc', '....cc..cc', '....ff..ff', '....ff..ff', '...000..000']
  },

  // ---- armas (16x8, empuñadura a la izquierda) ----
  w_garrote: { rows: ['................', '...........ggg..', '.........ggigig.', '.hhhhhhhgggggig.', '.hhhhhhhggggggg.', '.........ggiggg.', '...........ggg..', '................'] },
  w_lanza: { rows: ['................', '................', '.............s..', 'hhhhhhhhhhhhhsss', '.............s..', '................', '................', '................'] },
  w_honda: { rows: ['................', '....iiii........', '...i....i..ee...', '..i......ieee...', '...i....i..ee...', '....iiii........', '................', '................'] },
  w_arco: { rows: ['.....ch.........', '.....c.h........', '.....c..h.......', '..iiiciiihss....', '.....c..h.......', '.....c.h........', '.....ch.........', '................'] },
  w_espada: { rows: ['................', '................', '....4...........', '.hhh4cccccccccc.', '.hhh4sssssssss..', '....4...........', '................', '................'] },
  w_ballesta: { rows: ['................', '.........s......', '..........s.....', '.hhhhhhhhhhsc...', '.hh.......s.....', '.h.......s......', '................', '................'] },
  w_mosquete: { rows: ['................', '................', '....eeeeeeeeeee.', '.hhhhhhhhh......', '.hhh.4..........', '.hh.............', '................', '................'] },
  w_rifle: { rows: ['................', '..........f.....', '...fffffffffffff', '.hhhhhhhf.......', '.hhh.f..........', '.hh.............', '................', '................'] },
  w_ametralladora: { rows: ['................', '...fff..........', '.ffffffffeeeeee.', '.ffffffff.......', '..ff.ff.........', '..f..ff.........', '.....ff.........', '................'] },
  w_laser: { rows: ['................', '...ddddd........', '.ddbbbbbdddddb..', '.dddddddddddd...', '.dd.r...........', '.dd.............', '................', '................'] },

  // ---- ítems (10x10) ----
  i_ammo: { rows: ['..........', '..........', '.gggggggg.', '.g4g4g4gg.', '.g4g4g4gg.', '.gggggggg.', '.hhhhhhhh.', '.gggggggg.', '.gggggggg.', '..........'] },
  i_carne: { rows: ['..........', '...222....', '..22322...', '.2233222..', '.2222222..', '..22222c..', '...222.cc.', '.......ccc', '........c.', '..........'] },
  i_uvas: { rows: ['.....h....', '....6h....', '..1t1t1...', '..t1t1t1..', '..1t1t1...', '...t1t1...', '...1t1....', '....t.....', '..........', '..........'] },
  i_pizza: { rows: ['..........', '.iiiiiiii.', '.44r4444i.', '..4444r4..', '..4r444...', '...4444...', '...44r....', '....44....', '....4.....', '..........'] },
  i_mate: { rows: ['.......s..', '......s...', '..666s6...', '.hgggggh..', '.hgigggh..', '.hgigggh..', '.hgggggh..', '..hgggh...', '...hhh....', '..........'] },
  i_tortafrita: { rows: ['..........', '..........', '..iiiiii..', '.i444444i.', 'i44p44444i', 'i444444p4i', '.i444444i.', '..iiiiii..', '..........', '..........'] },
  i_empanada: { rows: ['..........', '..........', '...iiii...', '..i4444i..', '.i444444i.', 'i44444444i', 'iiiiiiiiii', '.h.h.h.h..', '..........', '..........'] },
  i_asado: { rows: ['..........', '..........', '..444444..', '.4pp44444.', '2222222222', '.n222222n.', '.44444444.', '..444444..', '..........', '..........'] },
  i_ramen: { rows: ['...c..c...', '..c..c....', '..........', 'r44444444r', 'r4p4p4p44r', '.rrrrrrrr.', '.rrrrrrrr.', '..rrrrrr..', '...cccc...', '..........'] },
  i_energia: { rows: ['..........', '...ssss...', '...5555...', '...5y55...', '...yy55...', '...5yy5...', '...55y5...', '...5555...', '...ssss...', '..........'] }
});

// Ítems de curación (cada etapa elige los suyos en stage.heals)
CV.defineItems({
  carne: { name: 'Carne de mamut', heal: 2, spr: 'i_carne' },
  uvas: { name: 'Uvas', heal: 2, spr: 'i_uvas' },
  pizza: { name: 'Proto-pizza', heal: 3, spr: 'i_pizza' },
  mate: { name: 'Mate', heal: 2, spr: 'i_mate' },
  tortafrita: { name: 'Torta frita', heal: 3, spr: 'i_tortafrita' },
  empanada: { name: 'Empanada', heal: 2, spr: 'i_empanada' },
  asado: { name: 'Choripán', heal: 4, spr: 'i_asado' },
  ramen: { name: 'Ramen', heal: 3, spr: 'i_ramen' },
  energia: { name: 'Energizante', heal: 2, spr: 'i_energia' }
});

// Armas. 'tech' es el nivel tecnológico: si supera el 'tech' de la etapa, el arma es anacrónica:
// pega más fuerte (+25% por nivel) pero llena la barra de PARADOJA.
CV.defineWeapons({
  garrote: { name: 'Garrote', tech: 0, type: 'melee', dmg: 2, reach: 20, cd: .34, spr: 'w_garrote' },
  lanza: { name: 'Lanza', tech: 0, type: 'melee', dmg: 2, reach: 31, cd: .38, thrust: true, spr: 'w_lanza' },
  honda: { name: 'Honda', tech: 0, type: 'ranged', dmg: 2, cd: .42, ammo: 30, spr: 'w_honda', proj: { speed: 230, vy: -70, grav: 320, w: 4, h: 4, col: '#94b0c2', col2: '#f4f4f4' } },
  arco: { name: 'Arco', tech: 2, type: 'ranged', dmg: 3, cd: .45, ammo: 24, spr: 'w_arco', proj: { speed: 320, grav: 50, w: 8, h: 2, col: '#8b5a2b', col2: '#f4f4f4' } },
  espada: { name: 'Espada', tech: 3, type: 'melee', dmg: 4, reach: 24, cd: .24, spr: 'w_espada' },
  ballesta: { name: 'Ballesta', tech: 4, type: 'ranged', dmg: 5, cd: .65, ammo: 16, spr: 'w_ballesta', proj: { speed: 420, w: 8, h: 2, col: '#5a3a1a', col2: '#c2c3c7', pierce: 1 } },
  mosquete: { name: 'Mosquete', tech: 5, type: 'ranged', dmg: 9, cd: .95, ammo: 10, spr: 'w_mosquete', sfx: 'bang', smoke: true, kick: 60, proj: { speed: 460, w: 4, h: 3, col: '#333c57', col2: '#ffcd75' } },
  rifle: { name: 'Rifle', tech: 6, type: 'ranged', dmg: 6, cd: .45, ammo: 24, spr: 'w_rifle', sfx: 'rifle', proj: { speed: 520, w: 5, h: 2, col: '#ffcd75', col2: '#ffffff' } },
  ametralladora: { name: 'Ametralladora', tech: 7, type: 'ranged', dmg: 2.5, cd: .09, ammo: 150, spr: 'w_ametralladora', sfx: 'shoot', proj: { speed: 480, w: 4, h: 2, col: '#ffe14a', col2: '#ffffff', spread: 22 } },
  laser: { name: 'Láser', tech: 9, type: 'ranged', dmg: 5, cd: .2, ammo: 60, spr: 'w_laser', sfx: 'laser', proj: { speed: 700, w: 14, h: 2, col: '#73eff7', col2: '#ffffff', pierce: 9 } }
});

// Música del mapa temporal / título
CV.music.hub = {
  bpm: 100, drums: 'k...h...k...h.h.',
  tracks: [
    { wave: 'square', vol: .045, notes: 'a4 _ c5 _ e5 _ c5 _ g4 _ b4 _ d5 _ b4 _ f4 _ a4 _ c5 _ a4 _ e4 _ g#4 _ b4 _ e5 _ _ _' },
    { wave: 'triangle', vol: .12, notes: 'a2 _ _ _ _ _ _ _ g2 _ _ _ _ _ _ _ f2 _ _ _ _ _ _ _ e2 _ _ _ _ _ _ _' }
  ]
};
