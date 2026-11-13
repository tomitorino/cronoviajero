// El mapa temporal: las 26 etapas, en orden dentro de cada rama.
// Para ACTIVAR una etapa: crear data/stages/<archivo>.js (con CV.stage({id:...})) y poner aquí  file:'<archivo>'.
// Las etapas sin 'file' aparecen en el mapa como PRÓXIMAMENTE.
CV.timeline = {
  regions: ['europa', 'asia', 'norteamerica', 'latam'],
  branches: {
    tronco: { name: 'TRONCO COMÚN', color: '#c2c3c7' },
    europa: { name: 'EUROPA', color: '#41a6f6' },
    asia: { name: 'ASIA', color: '#ff77a8' },
    norteamerica: { name: 'NORTEAMÉRICA', color: '#ffcd75' },
    latam: { name: 'LATAM', color: '#a7f070' },
    final: { name: 'TRAMO FINAL', color: '#b78cff' }
  },
  stages: [
    // ---- tronco común ----
    { id: 'prehistoria', code: '1', branch: 'tronco', name: 'Prehistoria', year: 'Hace muchísimo', boss: 'T-Rex', file: 'prehistoria', blurb: 'Cavernícolas, raptores chiquitos y mosquitos gigantes. Un T-Rex con complejo por sus bracitos.' },
    { id: 'egipto', code: '2', branch: 'tronco', name: 'Primeras civilizaciones', year: '2500 a.C.', boss: 'La Esfinge', file: 'egipto', blurb: 'Momias, escarabajos y cocodrilos. La esfinge ataca con acertijos (literalmente).' },
    { id: 'grecia', code: '3', branch: 'tronco', name: 'Antigüedad griega', year: '450 a.C.', boss: 'El Minotauro', file: 'grecia', blurb: 'Hoplitas, harpías y cíclopes en un laberinto donde nadie pide indicaciones.' },
    // ---- Europa ----
    { id: 'roma', code: 'E1', branch: 'europa', name: 'Roma imperial', year: 'Año 64', boss: 'Emperador Chifladus', file: 'roma', blurb: 'Legionarios, gladiadores y leones. En el Coliseo espera un emperador que se cree artista.' },
    { id: 'medieval', code: 'E2', branch: 'europa', name: 'Edad Media', year: 'Año 1000 y pico', boss: 'Dragón con rey vikingo', file: 'medieval', blurb: 'Caballeros, vikingos y ratas de la peste con muy mala prensa.' },
    { id: 'napoleon', code: 'E3', branch: 'europa', name: 'Era napoleónica', year: '1805', boss: 'Napoleón (bajito, caballo gigante)', file: 'napoleon', blurb: 'Granaderos, artillería y húsares. El caballo es enorme. El jinete, no tanto.' },
    { id: 'guerra1', code: 'E4', branch: 'europa', name: 'La Gran Guerra absurda', year: '1916', boss: 'Mega tanque / triplano rojo', file: 'guerra1', blurb: 'Trincheras, biplanos y tanques cómicos. Nadie recuerda por qué empezó.' },
    { id: 'europahoy', code: 'E5', branch: 'europa', name: 'Europa actual', year: 'Hoy', boss: 'Vendedor mecha de torres Eiffel', file: 'europahoy', blurb: 'Turistas con selfie stick, palomas, huelguistas y mimos. Sobre todo mimos.' },
    // ---- Asia ----
    { id: 'china', code: 'A1', branch: 'asia', name: 'China imperial', year: '210 a.C.', boss: 'Emperador con dragón', file: 'china', blurb: 'Guerreros de terracota, monjes de kung fu y dragones de papel.' },
    { id: 'mongoles', code: 'A2', branch: 'asia', name: 'Mongoles y Japón feudal', year: '1220', boss: 'Gengis Kan', file: 'mongoles', blurb: 'Jinetes, samuráis y ninjas. Un Kan épico y exageradísimo.' },
    { id: 'meiji', code: 'A3', branch: 'asia', name: 'Japón Meiji', year: '1868', boss: 'El Barco Negro', file: 'meiji', blurb: 'Samuráis con rifle y ninjas contra barcos a vapor.' },
    { id: 'kaiju', code: 'A4', branch: 'asia', name: 'Era del monstruo gigante', year: '1965', boss: 'Kaiju gigante', file: 'kaiju', blurb: 'Kaijus, robots y yakuza de utilería. Las maquetas sufren.' },
    { id: 'neotokio', code: 'A5', branch: 'asia', name: 'Neo-Tokio actual', year: 'Hoy', boss: 'Mega-robot de karaoke', file: 'neotokio', blurb: 'Otakus, oficinistas dormidos, trenes bala y robots de ramen.' },
    // ---- Norteamérica ----
    { id: 'rev1776', code: 'N1', branch: 'norteamerica', name: 'Revolución de 1776', year: '1776', boss: 'El Rey tomando té', file: 'rev1776', blurb: 'Casacas rojas, milicianos y tazas de té voladoras.' },
    { id: 'farwest', code: 'N2', branch: 'norteamerica', name: 'Far West', year: '1870', boss: 'Tren blindado del sheriff', file: 'farwest', blurb: 'Bandidos, cowboys, buitres y un sheriff muy corrupto.' },
    { id: 'gangsters', code: 'N3', branch: 'norteamerica', name: 'Gánsteres años 20', year: '1925', boss: 'El Padrino', file: 'gangsters', blurb: 'Mafiosos, autos antiguos y ametralladoras de utilería.' },
    { id: 'guerrafria', code: 'N4', branch: 'norteamerica', name: 'Guerra Fría espacial', year: '1962', boss: 'Cohete / ovni gigante', file: 'guerrafria', blurb: 'Espías, ovnis, Área 51 y astronautas. Todos espían a todos.' },
    { id: 'usahoy', code: 'N5', branch: 'norteamerica', name: 'EE.UU. actual', year: 'Hoy', boss: 'Centro comercial viviente', file: 'usahoy', blurb: 'Influencers, zombies de Black Friday y drones de delivery.' },
    // ---- Latam ----
    { id: 'precolombino', code: 'L1', branch: 'latam', name: 'Imperios precolombinos', year: '1450', boss: 'Serpiente emplumada gigante', file: 'precolombino', blurb: 'Templos con trampas, guerreros jaguar y llamas con actitud.' },
    { id: 'conquista', code: 'L2', branch: 'latam', name: 'La Conquista', year: '1530', boss: 'Conquistador de armadura gigante', file: 'conquista', blurb: 'Conquistadores obsesionados con el oro. Los pueblos originarios te ayudan.' },
    { id: 'pampa', code: 'L3', branch: 'latam', name: 'Pampa del siglo XIX', year: '1878', boss: 'El General del Mapa', file: 'pampa', blurb: 'Generales burócratas, fortineros incompetentes y una zanja que avanza. Sátira del "desierto".' },
    { id: 'sigloxx', code: 'L4', branch: 'latam', name: 'Siglo XX latino', year: '1989', boss: 'La Hiperinflación', file: 'sigloxx', blurb: 'Hinchas, tangueros, arbolitos y políticos con discursos eternos.' },
    { id: 'argentina', code: 'L5', branch: 'latam', name: 'Argentina actual', year: 'Hoy, hora pico', boss: 'El Jefe de los Motochorros', file: 'argentina', blurb: 'Motochorros, trapitos, punguistas y vendedores del tren. Mate, empanadas y choripán.' },
    // ---- tramo final ----
    { id: 'cyberpunk', code: 'F1', branch: 'final', name: 'Futuro cyberpunk', year: '2099', boss: 'IA Corporativa', file: 'cyberpunk', blurb: 'Drones, robots policía y hackers. Una IA con muy buenos modales y pésimas intenciones.' },
    { id: 'espacio', code: 'F2', branch: 'final', name: 'Futuro espacial', year: '3200', boss: 'La Nave Nodriza', file: 'espacio', blurb: 'Aliens, estaciones y naves. En el espacio nadie escucha tus quejas.' },
    { id: 'findeltiempo', code: 'F3', branch: 'final', name: 'El Fin del Tiempo', year: '??:??', boss: 'La Entidad de la Paradoja', file: 'findeltiempo', blurb: 'Todas las épocas mezcladas. El final de todo. O el principio. Es confuso.' }
  ]
};
