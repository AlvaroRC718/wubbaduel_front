//Tanto cards como usercards se obtendran con sus correspondientes metodos y peticiones
//Estas son pruebas 
/*const cards = [
  {
    "id": 1,
    "name": "Rick Sanchez",
    "description": "Un científico genio con una actitud imprudente y una fuerte adicción al alcohol.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "attack": 8,
    "health": 6,
    "rarity": "legendary",
    "species": "Human",
    "gender": "Male",
    "age": 70,
    "origin": "Earth (C-137)"
  },
  {
    "id": 2,
    "name": "Morty Smith",
    "description": "El nieto ansioso e impresionable de Rick que lo acompaña en sus aventuras.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    "attack": 4,
    "health": 4,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 14,
    "origin": "Earth (C-137)"
  },
  {
    "id": 3,
    "name": "Summer Smith",
    "description": "La hermana mayor de Morty. Inteligente, atrevida y a veces sorprendentemente útil.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    "attack": 3,
    "health": 5,
    "rarity": "rare",
    "species": "Human",
    "gender": "Female",
    "age": 17,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 4,
    "name": "Beth Smith",
    "description": "La hija de Rick, una brillante cirujana de caballos con problemas de autoestima.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    "attack": 4,
    "health": 6,
    "rarity": "rare",
    "species": "Human",
    "gender": "Female",
    "age": 34,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 5,
    "name": "Jerry Smith",
    "description": "El inseguro esposo de Beth, blanco frecuente de burlas, pero sorprendentemente perseverante.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
    "attack": 2,
    "health": 5,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 35,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 6,
    "name": "Abadango Cluster Princess",
    "description": "La princesa del cúmulo Abadango, una figura de autoridad en su planeta natal.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
    "attack": 5,
    "health": 5,
    "rarity": "epic",
    "species": "Alien",
    "gender": "Female",
    "age": 28,
    "origin": "Abadango"
  },
  {
    "id": 7,
    "name": "Abradolf Lincler",
    "description": "Un experimento genético que combina ADN de Abraham Lincoln y Adolf Hitler, creado por Rick.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    "attack": 6,
    "health": 4,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 45,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 8,
    "name": "Adjudicator Rick",
    "description": "Un Rick que sirve como juez en la Ciudadela de los Ricks.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    "attack": 7,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 60,
    "origin": "unknown"
  },
  {
    "id": 9,
    "name": "Agency Director",
    "description": "El director de una agencia gubernamental secreta, decidido a capturar a Rick.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
    "attack": 4,
    "health": 4,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 50,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 10,
    "name": "Alan Rails",
    "description": "Un superhéroe capaz de invocar trenes fantasma, miembro de los Vengadores de la Venganza.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
    "attack": 6,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 35,
    "origin": "unknown"
  },
  {
    "id": 11,
    "name": "Albert Einstein",
    "description": "Un científico confundido por las travesuras de Rick con realidades alternativas.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
    "attack": 3,
    "health": 4,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 60,
    "origin": "Earth (C-137)"
  },
  {
    "id": 12,
    "name": "Alexander",
    "description": "Un simple hombre de la Ciudadela con grandes sueños truncados rápidamente.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
    "attack": 2,
    "health": 2,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 30,
    "origin": "Citadel of Ricks"
  },
  {
    "id": 13,
    "name": "Alien Googah",
    "description": "Una criatura alienígena que parece inofensiva pero desconcertante.",
    "cost": 1,
    "image": "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
    "attack": 1,
    "health": 3,
    "rarity": "normal",
    "species": "Alien",
    "gender": "unknown",
    "age": 12,
    "origin": "unknown"
  },
  {
    "id": 14,
    "name": "Alien Morty",
    "description": "Una variante alienígena de Morty con una personalidad algo más siniestra.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "rare",
    "species": "Alien",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 15,
    "name": "Alien Rick",
    "description": "Una variante alienígena de Rick, aún más impredecible que el original.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
    "attack": 7,
    "health": 5,
    "rarity": "epic",
    "species": "Alien",
    "gender": "Male",
    "age": 65,
    "origin": "unknown"
  },
  {
    "id": 16,
    "name": "Amish Cyborg",
    "description": "Una extraña mezcla entre tradición y tecnología, temido en combate.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
    "attack": 6,
    "health": 4,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 45,
    "origin": "Earth (Amish Dimension)"
  },
  {
    "id": 17,
    "name": "Annie",
    "description": "Una joven brillante que acompañó a Rick y Morty dentro del cuerpo de un vagabundo.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
    "attack": 3,
    "health": 4,
    "rarity": "rare",
    "species": "Human",
    "gender": "Female",
    "age": 20,
    "origin": "Anatomy Park"
  },
  {
    "id": 18,
    "name": "Antenna Morty",
    "description": "Morty con una antena, originario de una dimensión tecnológica.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
    "attack": 4,
    "health": 4,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 19,
    "name": "Antenna Rick",
    "description": "Rick con antena, con mejoras para comunicarse entre dimensiones.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    "attack": 7,
    "health": 6,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 70,
    "origin": "unknown"
  },
  {
    "id": 20,
    "name": "Ants in my Eyes Johnson",
    "description": "No puede ver ni sentir nada, pero vende electrodomésticos como nadie.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
    "attack": 1,
    "health": 2,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 40,
    "origin": "Earth (C-500A)"
  },
  {
    "id": 21,
    "name": "Aqua Morty",
    "description": "Una variante de Morty adaptada a un entorno acuático.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
    "attack": 4,
    "health": 4,
    "rarity": "rare",
    "species": "Humanoid",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 22,
    "name": "Aqua Rick",
    "description": "Una variante de Rick adaptada a un entorno acuático.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/22.jpeg",
    "attack": 7,
    "health": 5,
    "rarity": "epic",
    "species": "Humanoid",
    "gender": "Male",
    "age": 70,
    "origin": "unknown"
  },
  {
    "id": 23,
    "name": "Arcade Alien",
    "description": "Un alienígena amante de los videojuegos.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/23.jpeg",
    "attack": 3,
    "health": 2,
    "rarity": "normal",
    "species": "Alien",
    "gender": "Male",
    "age": 30,
    "origin": "unknown"
  },
  {
    "id": 24,
    "name": "Armagheadon",
    "description": "Un ser poderoso con habilidades destructivas.",
    "cost": 6,
    "image": "https://rickandmortyapi.com/api/character/avatar/24.jpeg",
    "attack": 8,
    "health": 6,
    "rarity": "legendary",
    "species": "Alien",
    "gender": "Male",
    "age": 100,
    "origin": "unknown"
  },
  {
    "id": 25,
    "name": "Armothy",
    "description": "Un brazo consciente con sed de venganza.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/25.jpeg",
    "attack": 5,
    "health": 3,
    "rarity": "rare",
    "species": "unknown",
    "gender": "Male",
    "age": 5,
    "origin": "Post-Apocalyptic Earth"
  },
  {
    "id": 26,
    "name": "Arthricia",
    "description": "Una habitante del planeta Purga con habilidades felinas.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/26.jpeg",
    "attack": 6,
    "health": 4,
    "rarity": "epic",
    "species": "Alien",
    "gender": "Female",
    "age": 25,
    "origin": "Purge Planet"
  },
  {
    "id": 27,
    "name": "Artist Morty",
    "description": "Una variante artística de Morty con gran creatividad.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/27.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 28,
    "name": "Attila Starwar",
    "description": "Un guerrero con una mezcla de culturas antiguas y futuristas.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/28.jpeg",
    "attack": 5,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 40,
    "origin": "unknown"
  },
  {
    "id": 29,
    "name": "Baby Legs",
    "description": "Un detective con piernas de bebé pero gran determinación.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/29.jpeg",
    "attack": 3,
    "health": 2,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 35,
    "origin": "unknown"
  },
  {
    "id": 30,
    "name": "Baby Poopybutthole",
    "description": "La versión infantil de Mr. Poopybutthole, adorable y energética.",
    "cost": 1,
    "image": "https://rickandmortyapi.com/api/character/avatar/30.jpeg",
    "attack": 2,
    "health": 1,
    "rarity": "normal",
    "species": "Poopybutthole",
    "gender": "Male",
    "age": 3,
    "origin": "unknown"
  },
  {
    "id": 31,
    "name": "Baby Wizard",
    "description": "Un parásito alienígena con apariencia de bebé mago.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/31.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "epic",
    "species": "Alien",
    "gender": "Male",
    "age": 2,
    "origin": "unknown"
  },
  {
    "id": 32,
    "name": "Bearded Lady",
    "description": "Una mujer barbuda que forma parte de un circo interdimensional.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/32.jpeg",
    "attack": 3,
    "health": 4,
    "rarity": "normal",
    "species": "Human",
    "gender": "Female",
    "age": 35,
    "origin": "Earth (C-137)"
  },
  {
    "id": 33,
    "name": "Beebo",
    "description": "Un alienígena adorable que vive en Venzenulon 7.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/33.jpeg",
    "attack": 2,
    "health": 5,
    "rarity": "rare",
    "species": "Alien",
    "gender": "Male",
    "age": 5,
    "origin": "Venzenulon 7"
  },
  {
    "id": 34,
    "name": "Benjamin",
    "description": "Un personaje de la especie Poopybutthole, siempre optimista.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/34.jpeg",
    "attack": 3,
    "health": 4,
    "rarity": "rare",
    "species": "Poopybutthole",
    "gender": "Male",
    "age": 30,
    "origin": "unknown"
  },
  {
    "id": 35,
    "name": "Bepisian",
    "description": "Un ser de Bepis 9 con una biología única.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/35.jpeg",
    "attack": 3,
    "health": 3,
    "rarity": "normal",
    "species": "Alien",
    "gender": "unknown",
    "age": 20,
    "origin": "Bepis 9"
  },
  {
    "id": 36,
    "name": "Beta-Seven",
    "description": "Un ente colmena con múltiples conciencias.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/36.jpeg",
    "attack": 5,
    "health": 4,
    "rarity": "epic",
    "species": "Alien",
    "gender": "unknown",
    "age": 100,
    "origin": "unknown"
  },
  {
    "id": 37,
    "name": "Beth Sanchez",
    "description": "Una versión alternativa de Beth, independiente y decidida.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/37.jpeg",
    "attack": 4,
    "health": 5,
    "rarity": "rare",
    "species": "Human",
    "gender": "Female",
    "age": 34,
    "origin": "Earth (C-500A)"
  },
  {
    "id": 38,
    "name": "Beth Smith",
    "description": "La Beth original del universo C-137.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/38.jpeg",
    "attack": 4,
    "health": 6,
    "rarity": "rare",
    "species": "Human",
    "gender": "Female",
    "age": 34,
    "origin": "Earth (C-137)"
  },
  {
    "id": 39,
    "name": "Beth Smith",
    "description": "Una Beth de una dimensión donde Rick es malvado.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/39.jpeg",
    "attack": 5,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Female",
    "age": 34,
    "origin": "Earth (Evil Rick's Target Dimension)"
  },
  {
    "id": 40,
    "name": "Beth's Mytholog",
    "description": "Una criatura mitológica que representa los miedos de Beth.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/40.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "epic",
    "species": "Mythological Creature",
    "gender": "Female",
    "age": 999,
    "origin": "Nuptia 4"
  },
  {
    "id": 41,
    "name": "Big Boobed Waitress",
    "description": "Una camarera de un restaurante interdimensional que aparece en los recuerdos de Rick.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/41.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "rare",
    "species": "Human",
    "gender": "Female",
    "age": 28,
    "origin": "Earth (C-137)"
  },
  {
    "id": 42,
    "name": "Big Head Morty",
    "description": "Una variante de Morty con una cabeza desproporcionadamente grande y gran inteligencia.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/42.jpeg",
    "attack": 3,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 43,
    "name": "Big Morty",
    "description": "Una versión gigante de Morty de una dimensión de tamaño aumentado.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/43.jpeg",
    "attack": 7,
    "health": 6,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 14,
    "origin": "Giant Dimension"
  },
  {
    "id": 44,
    "name": "Body Guard Morty",
    "description": "Morty entrenado como guardaespaldas personal de Rick en una dimensión peligrosa.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/44.jpeg",
    "attack": 5,
    "health": 5,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 15,
    "origin": "Citadel of Ricks"
  },
  {
    "id": 45,
    "name": "Bill",
    "description": "Un humanoide con forma de lápiz que habita en una dimensión de oficina.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/45.jpeg",
    "attack": 3,
    "health": 2,
    "rarity": "normal",
    "species": "Humanoid",
    "gender": "Male",
    "age": 40,
    "origin": "Pencil Dimension"
  },
  {
    "id": 46,
    "name": "Bill",
    "description": "Un personaje secundario que aparece en la serie dentro de un microverso.",
    "cost": 1,
    "image": "https://rickandmortyapi.com/api/character/avatar/46.jpeg",
    "attack": 2,
    "health": 1,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 30,
    "origin": "Microverse"
  },
  {
    "id": 47,
    "name": "Birdperson",
    "description": "El mejor amigo de Rick, un guerrero noble de la especie Birdperson.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/47.jpeg",
    "attack": 6,
    "health": 6,
    "rarity": "legendary",
    "species": "Birdperson",
    "gender": "Male",
    "age": 45,
    "origin": "Bird World"
  },
  {
    "id": 48,
    "name": "Black Rick",
    "description": "Una versión alternativa de Rick con un traje negro y actitud sombría.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/48.jpeg",
    "attack": 8,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 70,
    "origin": "unknown"
  },
  {
    "id": 49,
    "name": "Blamph",
    "description": "Un alienígena de la especie Plumbonia con habilidades psíquicas limitadas.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/49.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "rare",
    "species": "Alien",
    "gender": "unknown",
    "age": 25,
    "origin": "Plumbonia"
  },
  {
    "id": 50,
    "name": "Blim Blam",
    "description": "Un científico alienígena especializado en intercambio de cuerpos.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/50.jpeg",
    "attack": 3,
    "health": 5,
    "rarity": "epic",
    "species": "Korblock",
    "gender": "Male",
    "age": 60,
    "origin": "Korblock-9"
  },

];*/

const userCards = [
  {
    "id": 1,
    "name": "Rick Sanchez",
    "description": "Un científico genio con una actitud imprudente y una fuerte adicción al alcohol.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "attack": 8,
    "health": 6,
    "rarity": "legendary",
    "species": "Human",
    "gender": "Male",
    "age": 70,
    "origin": "Earth (C-137)"
  },
  {
    "id": 4,
    "name": "Beth Smith",
    "description": "La hija de Rick, una brillante cirujana de caballos con problemas de autoestima.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    "attack": 4,
    "health": 6,
    "rarity": "rare",
    "species": "Human",
    "gender": "Female",
    "age": 34,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 7,
    "name": "Abradolf Lincler",
    "description": "Un experimento genético que combina ADN de Abraham Lincoln y Adolf Hitler, creado por Rick.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    "attack": 6,
    "health": 4,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 45,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 8,
    "name": "Adjudicator Rick",
    "description": "Un Rick que sirve como juez en la Ciudadela de los Ricks.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    "attack": 7,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 60,
    "origin": "unknown"
  },
  {
    "id": 9,
    "name": "Agency Director",
    "description": "El director de una agencia gubernamental secreta, decidido a capturar a Rick.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
    "attack": 4,
    "health": 4,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 50,
    "origin": "Earth (Replacement Dimension)"
  },
  {
    "id": 10,
    "name": "Alan Rails",
    "description": "Un superhéroe capaz de invocar trenes fantasma, miembro de los Vengadores de la Venganza.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
    "attack": 6,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 35,
    "origin": "unknown"
  },
  
  {
    "id": 14,
    "name": "Alien Morty",
    "description": "Una variante alienígena de Morty con una personalidad algo más siniestra.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "rare",
    "species": "Alien",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 15,
    "name": "Alien Rick",
    "description": "Una variante alienígena de Rick, aún más impredecible que el original.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
    "attack": 7,
    "health": 5,
    "rarity": "epic",
    "species": "Alien",
    "gender": "Male",
    "age": 65,
    "origin": "unknown"
  },
  {
    "id": 16,
    "name": "Amish Cyborg",
    "description": "Una extraña mezcla entre tradición y tecnología, temido en combate.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
    "attack": 6,
    "health": 4,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 45,
    "origin": "Earth (Amish Dimension)"
  },
  {
    "id": 20,
    "name": "Ants in my Eyes Johnson",
    "description": "No puede ver ni sentir nada, pero vende electrodomésticos como nadie.",
    "cost": 2,
    "image": "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
    "attack": 1,
    "health": 2,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 40,
    "origin": "Earth (C-500A)"
  },
  {
    "id": 21,
    "name": "Aqua Morty",
    "description": "Una variante de Morty adaptada a un entorno acuático.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
    "attack": 4,
    "health": 4,
    "rarity": "rare",
    "species": "Humanoid",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 22,
    "name": "Aqua Rick",
    "description": "Una variante de Rick adaptada a un entorno acuático.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/22.jpeg",
    "attack": 7,
    "health": 5,
    "rarity": "epic",
    "species": "Humanoid",
    "gender": "Male",
    "age": 70,
    "origin": "unknown"
  },
  {
    "id": 26,
    "name": "Arthricia",
    "description": "Una habitante del planeta Purga con habilidades felinas.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/26.jpeg",
    "attack": 6,
    "health": 4,
    "rarity": "epic",
    "species": "Alien",
    "gender": "Female",
    "age": 25,
    "origin": "Purge Planet"
  },
  {
    "id": 27,
    "name": "Artist Morty",
    "description": "Una variante artística de Morty con gran creatividad.",
    "cost": 3,
    "image": "https://rickandmortyapi.com/api/character/avatar/27.jpeg",
    "attack": 4,
    "health": 3,
    "rarity": "rare",
    "species": "Human",
    "gender": "Male",
    "age": 14,
    "origin": "unknown"
  },
  {
    "id": 28,
    "name": "Attila Starwar",
    "description": "Un guerrero con una mezcla de culturas antiguas y futuristas.",
    "cost": 4,
    "image": "https://rickandmortyapi.com/api/character/avatar/28.jpeg",
    "attack": 5,
    "health": 5,
    "rarity": "epic",
    "species": "Human",
    "gender": "Male",
    "age": 40,
    "origin": "unknown"
  },
  {
    "id": 46,
    "name": "Bill",
    "description": "Un personaje secundario que aparece en la serie dentro de un microverso.",
    "cost": 1,
    "image": "https://rickandmortyapi.com/api/character/avatar/46.jpeg",
    "attack": 2,
    "health": 1,
    "rarity": "normal",
    "species": "Human",
    "gender": "Male",
    "age": 30,
    "origin": "Microverse"
  },
  {
    "id": 47,
    "name": "Birdperson",
    "description": "El mejor amigo de Rick, un guerrero noble de la especie Birdperson.",
    "cost": 5,
    "image": "https://rickandmortyapi.com/api/character/avatar/47.jpeg",
    "attack": 6,
    "health": 6,
    "rarity": "legendary",
    "species": "Birdperson",
    "gender": "Male",
    "age": 45,
    "origin": "Bird World"
  },
];

async function fetchAllCards() {
  try {
    const response = await fetch('http://localhost:8080/api/cards');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error al obtener las cartas desbloqueadas', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error en la solicitud a la API', error);
    return [];
  }
}

async function fetchUnlockedCards() {
  try {
    const response = await fetch('http://localhost:8080/api/usercards');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error al obtener las cartas', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error en la solicitud a la API', error);
    return [];
  }
}

function generateCards() {
  const container = document.getElementById("cards-container");
  const savedUser = JSON.parse(localStorage.getItem('user')); 

  container.innerHTML = '';

  if (savedUser) {
    // Si el usuario está logueado, mostramos las cartas desbloqueadas o grisadas si no están desbloqueadas
    const userCardsIds = userCards.map(card => card.id);
    for (let i = 0; i < cards.length; i++) {
      const character = cards[i];

      // Comprobamos si el usuario tiene esta carta desbloqueada
      const isUnlocked = userCardsIds.includes(character.id);

      const card = `
        <div class="album-card">
          <div class="card card-${character.rarity}  ${isUnlocked ? '' : 'locked-card'}" onclick="openModal(this)">
            <div class="card-header">
              <span class="card-name">${character.name}</span>
              <span class="card-cost">⚡ ${character.cost}</span>
            </div>
            <img src="${character.image}" alt="${character.name}" class="${character.rarity}">
            <div class="card-stats">
              <div>🗡 ${character.attack}</div>
              <div>❤️ ${character.hp}</div>
            </div>
            <div class="card-description">
              ${character.description}
            </div>
            <div class="card-info"> 
              <div class="card-number">Nº ${character.id}</div>
              <div class="rarity-label ${character.rarity}">${character.rarity}</div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    }
  } else {
    // Si no hay usuario logueado, mostramos todas las cartas normalmente
    for (let i = 0; i < cards.length; i++) {
      const character = cards[i];
      const card = `
        <div class="album-card">
          <div class="card card-${character.rarity}" onclick="openModal(this)">
            <div class="card-header">
              <span class="card-name">${character.name}</span>
              <span class="card-cost">⚡ ${character.cost}</span>
            </div>
            <img src="${character.image}" alt="${character.name}" class="${character.rarity}">
            <div class="card-stats">
              <div>🗡 ${character.attack}</div>
              <div>❤️ ${character.hp}</div>
            </div>
            <div class="card-description">
              ${character.description}
            </div>
            <div class="card-info"> 
              <div class="card-number">Nº ${character.id}</div>
              <div class="rarity-label ${character.rarity}">${character.rarity}</div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    }
  }
}

// Llamamos a la función para generar las cartas correctamente una vez cargadas
async function init() {
  cards = await fetchAllCards();

  const savedUser = JSON.parse(localStorage.getItem('user'));
  if (savedUser) {
    //userCards = await fetchUnlockedCards();
  }

  generateCards();
}

init();