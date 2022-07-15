import React, { useState } from "react";
import "./complaints.css";

//Componentes
import TextField from "../../TextField";

// hooks
import useInput from "../../hooks/useInput";

const STORES = [
  "TIENDA EN LÍNEA",
  "SALAVERRY",
  "PLAZA LIMA SUR",
  "MINKA",
  "BELLAVISTA",
  "JOCKEY 1",
  "PLAZA VILLA MARIA",
  "PLAZA JOCKEY 2",
  "MALL DEL SUR",
  "PLAZA NORTE",
  "SAN MIGUEL",
  "PURUCHUCO",
  "SANTA ANITA",
  "PLAZA DE SOL - ICA",
  "RIVERA NAVARRETE",
  "MEGAPLAZA",
  "MALL AVENTURA AREQUIPA",
  "REAL PLAZA AREQUIPA",
];

const PERU_ADDRESSES = [
  {
    name: "Amazonas",
    provincias: [
      {
        name: "Chachapoyas",
        distritos: [
          "Asunción",
          "Balsas",
          "Chachapoyas",
          "Cheto",
          "Chiliquín",
          "Chuquibamba",
          "Granada",
          "Huancas",
          "La Jalca",
          "Leimebamba",
          "Levanto",
          "Magdalena",
          "Mariscal Castilla",
          "Molinopampa",
          "Montevideo",
          "Olleros",
          "Quinjalca",
          "San Francisco de Daguas",
          "San Isidro de Maino",
          "Soloco",
          "Sonche",
        ],
      },
      {
        name: "Bagua",
        distritos: [
          "Bagua",
          "La Peca",
          "Aramango",
          "Copallín",
          "El Parco",
          "Imaz",
        ],
      },
      {
        name: "Bongara",
        distritos: [
          "Jumbilla",
          "Chisquilla",
          "Churuja",
          "Corosha",
          "Cuispes",
          "Florida",
          "Jazán",
          "Recta",
          "San Carlos",
          "Shipasbamba",
          "Valera",
          "Yambrasbamb",
        ],
      },
      {
        name: "Condorcanqui",
        distritos: ["El Cenepa", "Nieva", "Río Santiago"],
      },
      {
        name: "Luya",
        distritos: [
          "Camporredondo",
          "Cocabamba",
          "Colcamar",
          "Conila",
          "Inguilpata",
          "Lámud",
          "Longuita",
          "Lonya Chico",
          "Luya",
          "Luya Viejo",
          "María",
          "Ocalli",
          "Ocumal",
          "Pisuquía",
          "Providencia",
          "San Cristóbal",
          "San Francisco del Yeso",
          "San Jerónimo",
          "San Juan de Lopecancha",
          "Santa Catalina",
          "Santo Tomás",
          "Tingo",
          "Trita",
        ],
      },
      {
        name: "Rodríguez de Mendoza",
        distritos: [
          "San Nicolás",
          "Chirimoto",
          "Cochamal",
          "Huambo",
          "Limabamba",
          "Longar",
          "Mariscal Benavides",
          "Mílpuc",
          "Omia",
          "Santa Rosa",
          "Totora",
          "Vista Alegre",
        ],
      },
      {
        name: "Utcubamb",
        distritos: [
          "Bagua Grande",
          "Cajaruro",
          "Cumba",
          "El Milagro",
          "Jamalca",
          "Lonya Grande",
          "Yamó",
        ],
      },
    ],
  },
  {
    name: "Áncash",
    provincias: [
      {
        name: "Huaraz",
        distritos: [
          "Huaraz",
          "Cochabamba",
          "Colcabamba",
          "Huanchay",
          "Independencia",
          "Jangas",
          "La Libertad",
          "Olleros",
          "Pampas Grande1​",
          "Pariacoto",
          "Pira",
          "Tarica",
        ],
      },
      {
        name: "Aija",
        distritos: ["Aija", "Coris", "Huacllán", "La Merced", "Succha"],
      },
      {
        name: "Antonio Raimondi",
        distritos: [
          "Llamellín",
          "Aczo",
          "Chaccho",
          "Chingas",
          "Mirgas",
          "San Juan de Rontoy",
        ],
      },
      { name: "Asunción", distritos: ["Chacas", "Acochaca"] },
      {
        name: "Bolognesi",
        distritos: [
          "Abelardo Pardo",
          "Antonio Raimondi",
          "Aquia",
          "Cajacay",
          "Canis",
          "Chiquián",
          "Cólquioc",
          "Huallanca",
          "Huasta",
          "Huayllacayán",
          "La Primavera",
          "Mangas",
          "Pacllón",
          "San Miguel de Corpanqui",
          "Ticllo",
        ],
      },
      {
        name: "Carhuaz",
        distritos: [
          "Carhuaz",
          "Acopampa",
          "Amashca",
          "Anta",
          "Ataquero",
          "Marcará",
          "Pariahuanca",
          "San Miguel de Aco",
          "Shilla",
          "Tinco",
          "Yungar",
        ],
      },
      {
        name: "Carlos Fermín Fitzcarrald",
        distritos: ["San Luis", "San Nicolás", "Yauya"],
      },
      {
        name: "Casma",
        distritos: ["Casma", "Buenavista Alta", "Comandante Noel", "Yaután"],
      },
      {
        name: "Corongo",
        distritos: [
          "Corongo",
          "Aco",
          "Bambas",
          "Cusca",
          "La Pampa",
          "Yánac",
          "Yupán",
        ],
      },
      {
        name: "Huari",
        distritos: [
          "Huari",
          "Anra",
          "Cajay",
          "Chavín de Huántar",
          "Huacachi",
          "Huacchis",
          "Huachis",
          "Huántar",
          "Masin",
          "Paucas",
          "Pontó",
          "Rahuapampa",
          "Rapayán",
          "San Marcos",
          "San Pedro de Chaná",
          "Uco",
        ],
      },
      {
        name: "Huarmey",
        distritos: ["Huarmey", "Cochapeti", "Culebras", "Huayan", "Malvas"],
      },
      {
        name: "Huaylas",
        distritos: [
          "Caraz",
          "Huallanca",
          "Huata",
          "Huaylas",
          "Mato",
          "Pamparomás",
          "Pueblo Libre",
          "Santa Cruz",
          "Santo Toribio",
          "Yuracmarca",
        ],
      },
      {
        name: "Mariscal Luzuriaga",
        distritos: [
          "Piscobamba",
          "Casca",
          "Eleazar Guzmán Barrón",
          "Fidel OIivas Escudero",
          "Llama",
          "Llumpa",
          "Musga",
          "Lucma",
        ],
      },
      {
        name: "Ocros",
        distritos: [
          "Ocros",
          "Acas",
          "Cajamarquilla",
          "Carhuapampa",
          "Cochas",
          "Congas",
          "Llipa",
          "San Cristóbal de Raján",
          "San Pedro",
          "Santiago de Chilca",
        ],
      },
      {
        name: "Pallasca",
        distritos: [
          "Cabana",
          "Bolognesi",
          "Conchucos",
          "Huacaschuque",
          "Huandoval",
          "Lacabamba",
          "Llapo",
          "Pallasca",
          "Pampas",
          "Santa Rosa",
          "Tauca",
        ],
      },
      {
        name: "Pomabamba",
        distritos: ["Pomabamba", "Huayllán", "Parobamba", "Quinuabamba"],
      },
      {
        name: "Recuay",
        distritos: [
          "Recuay",
          "Cátac",
          "Cotaparaco",
          "Huayllapampa",
          "Llacllín",
          "Marca",
          "Pampas Chico",
          "Pararín",
          "Tapacocha",
          "Ticapampa",
        ],
      },
      {
        name: "Santa",
        distritos: [
          "Chimbote",
          "Cáceres del Perú",
          "Coishco",
          "Macate",
          "Moro",
          "Nepeña",
          "Nuevo Chimbote",
          "Samanco",
          "Santa",
        ],
      },
      {
        name: "Sihuas",
        distritos: [
          "Sihuas",
          "Acobamba",
          "Alfonso Ugarte",
          "Cashapampa",
          "Chingalpo",
          "Huayllabamba",
          "Quiches",
          "Ragash",
          "San Juan",
          "Sicsibamba",
        ],
      },
      {
        name: "Yunga",
        distritos: [
          "Yungay",
          "Cascapara",
          "Mancos",
          "Matacoto",
          "Quillo",
          "Ranrahirca",
          "Shupluy",
          "Yanama",
        ],
      },
    ],
  },
  {
    name: "Apurímac",
    provincias: [
      {
        name: "Abancay",
        distritos: [
          "Abancay",
          "Chacoche",
          "Circa",
          "Curahuasi",
          "Huanipaca",
          "Lambrama",
          "Pichirhua",
          "San Pedro de Cachora",
          "Tamburco",
        ],
      },
      {
        name: "Andahuaylas",
        distritos: [
          "Andahuaylas",
          "Andarapa",
          "Chiara",
          "Huancarama",
          "Huancaray",
          "Huayana",
          "José María Arguedas",
          "Kaquiabamba",
          "Kishuará",
          "Pacobamba",
          "Pacucha",
          "Pampachiri",
          "Pomacocha",
          "San Antonio de Cachi",
          "San Jerónimo",
          "San Miguel de Chaccrapampa",
          "Santa María de Chicmo",
          "Talavera de la Reyna",
          "Tumay Huaraca",
          "Turpo Creado ",
        ],
      },
      {
        name: "Antabamba",
        distritos: [
          "Antabamba",
          "El Oro",
          "Huaquirca",
          "Juan Espinoza Medrano",
          "Oropesa",
          "Pachaconas",
          "Sabain",
        ],
      },
      {
        name: "Aymaraes",
        distritos: [
          "Chalhuanca",
          "Capaya",
          "Caraybamba",
          "Chapimarca",
          "Colcabamba",
          "Cotaruse",
          "Ihuayllo",
          "Justo Apu Sahuaraura",
          "Lucre",
          "Pocohuanca",
          "San Juan de Chacña",
          "Sañayca",
          "Soraya",
          "Tapairihua",
          "Tintay",
          "Toraya",
          "Yanaca",
        ],
      },
      {
        name: "Cotabambas",
        distritos: [
          "Tambobamba",
          "Cotabambas",
          "Coyllurqui",
          "Haquira",
          "Mara",
          "Chalhuahuach",
        ],
      },
      {
        name: "Chincheros",
        distritos: [
          "Chincheros",
          "Anccohuayllo",
          "Cocharcas",
          "Huaccana",
          "Ocobamba",
          "Ongoy",
          "Uranmarca",
          "Ranracancha",
          "Rocchac",
          "El Porvenir",
          "Los Chankas",
        ],
      },
      {
        name: "Grau",
        distritos: [
          "Chuquibambilla",
          "Curpahuasi",
          "Huayllati",
          "Mamara",
          "Mariscal Gamarra",
          "Micaela Bastidas",
          "Pataypampa",
          "Progreso",
          "San Antonio",
          "Santa Rosa",
          "Turpay",
          "Vilcabamba",
          "Virundo",
          "Curasco",
        ],
      },
    ],
  },
  {
    name: "Arequipa",
    provincias: [
      {
        name: "Arequipa",
        distritos: [
          "Alto Selva Alegre",
          "Arequipa",
          "Cayma",
          "Cerro Colorado",
          "Characato",
          "Chiguata",
          "Jacobo Hunter",
          "José Luis Bustamante y Rivero",
          "La Joya",
          "Mariano Melgar",
          "Miraflores",
          "Mollebaya",
          "Paucarpata",
          "Pocsi",
          "Polobaya",
          "Quequeña",
          "Sabandía",
          "Sachaca",
          "San Juan de Siguas",
          "San Juan de Tarucani",
          "Santa Isabel de Siguas",
          "Santa Rita de Siguas",
          "Socabaya",
          "Tiabaya",
          "Uchumayo",
          "Vitor",
          "Yanahuara",
          "Yarabamba",
          "Yura",
        ],
      },
      {
        name: "Camaná",
        distritos: [
          "Camaná",
          "José María Quimper",
          "Mariano Nicolás Valcarcel",
          "Mariscal Cáceres",
          "Nicolás de Piérola",
          "Ocoña",
          "Quilca",
          "Samuel Pastor",
        ],
      },
      {
        name: "Caravelí",
        distritos: [
          "Caravelí",
          "Acarí",
          "Atico",
          "Atiquipa",
          "Bella Unión",
          "Cahuacho",
          "Chala",
          "Chaparra",
          "Huanuhuanu",
          "Jaquí",
          "Lomas",
          "Quicacha",
          "Yauca",
        ],
      },
      {
        name: "Castilla",
        distritos: [
          "Aplao",
          "Andahua",
          "Ayo",
          "Chachas",
          "Chilcaymarca",
          "Choco",
          "Huancarqui",
          "Machaguay",
          "Orcopampa",
          "Pampacolca",
          "Tipán",
          "Uñón",
          "Viraco",
        ],
      },
      {
        name: "Caylloma",
        distritos: [
          "Achoma",
          "Cabanaconde",
          "Callalli",
          "Caylloma",
          "Chivay",
          "Coporaque",
          "Huambo",
          "Huanca",
          "Ichupampa",
          "Lari",
          "Lluta",
          "Maca",
          "Madrigal",
          "Majes",
          "San Antonio de Chuca",
          "Sibayo",
          "Tapay",
          "Tisco",
          "Tuti",
          "Yanque",
        ],
      },
      {
        name: "Condesuyos",
        distritos: [
          "Chuquibamba",
          "Andaray",
          "Cayarani",
          "Chichas",
          "Iray",
          "Río Grande",
          "Salamanca",
          "Yanaquihua",
        ],
      },
      {
        name: "Islay",
        distritos: [
          "Mollendo",
          "Cocachacra",
          "Deán Valdivia",
          "Islay",
          "Mejía",
          "Punta de Bombón",
        ],
      },
      {
        name: "La Unión",
        distritos: [
          "Cotahuasi",
          "Alca",
          "Charcana",
          "Huaynacotas",
          "Pampamarca",
          "Puyca",
          "Quechualla",
          "Sayla",
          "Tauría",
          "Tomepampa",
          "Tor",
        ],
      },
    ],
  },
  {
    name: " Ayacucho",
    provincias: [
      {
        name: "Huamanga",
        distritos: [
          "Acocro",
          "Acos Vinchos",
          "Andrés Avelino Cáceres Dorregaray",
          "Ayacucho",
          "Carmen Alto",
          "Chiara",
          "Jesús Nazareno",
          "Ocros",
          "Pacaycasa",
          "Quinua",
          "San José de Ticllas",
          "San Juan Bautista",
          "Santiago de Pischa",
          "Socos",
          "Tambillo",
          "Vinchos",
        ],
      },
      {
        name: "Cangallo",
        distritos: [
          "Cangallo",
          "Chuschi",
          "Los Morochucos",
          "María Parado de Bellido",
          "Paras",
          "Totos",
        ],
      },
      {
        name: "Huanca Sancos",
        distritos: [
          "Carapo",
          "Sacsamarca",
          "Sancos",
          "Santiago de Lucanamarca",
        ],
      },
      {
        name: "Huanta",
        distritos: [
          "Huanta",
          "Ayahuanco",
          "Huamanguilla",
          "Iguaín",
          "Llochegua",
          "Luricocha",
          "Santillana",
          "Sivia",
          "Canayre",
          "Uchuraccay",
          "Pucacolpa",
          "Chaca",
        ],
      },
      {
        name: "La Mar",
        distritos: [
          "San Miguel",
          "Anco",
          "Ayna",
          "Chilcas",
          "Chungui",
          "Luis Carranza",
          "Santa Rosa",
          "Tambo",
          "Samugari",
          "Anchihuay",
          "Oroncco",
        ],
      },
      {
        name: "Lucanas",
        distritos: [
          "Puquio",
          "Aucara",
          "Cabana Sur",
          "Carmen Salcedo",
          "Chaviña",
          "Chipao",
          "Huacuas",
          "Laramate",
          "Leoncio Prado",
          "Llauta",
          "Lucanas",
          "Ocaña",
          "Otoca",
          "Saisa",
          "San Cristóbal",
          "San Juan",
          "San Pedro",
          "San Pedro de Palco",
          "Sancos",
          "Santa Ana de Huaycahuacho",
          "Santa Lucía",
        ],
      },
      {
        name: "Parinacochas",
        distritos: [
          "Coracora",
          "Chumpi",
          "Coronel Castañeda",
          "Pacapausa",
          "Pullo",
          "Puyusca",
          "San Francisco de Ravacayco",
          "Upahuacho",
        ],
      },
      {
        name: "Páucar del Sara Sara",
        distritos: [
          "Pauza",
          "Colta",
          "Corculla",
          "Lampa",
          "Marcabamba",
          "Oyolo",
          "Pararca",
          "San Javier de Alpabamba",
          "San José de Ushua",
          "Sara Sara",
        ],
      },
      {
        name: "Sucre",
        distritos: [
          "Querobamba",
          "Belén",
          "Chalcos",
          "Chilcayoc",
          "Huacaña",
          "Morcolla",
          "Paico",
          "San Pedro de Larcay",
          "San Salvador de Quije",
          "Santiago de Paucaray",
          "Soras",
        ],
      },
      {
        name: "Víctor Fajardo",
        distritos: [
          "Huancapi",
          "Hualla",
          "Alcamenca",
          "Apongo",
          "Asquipata",
          "Canaria",
          "Cayara",
          "Colca",
          "Huamanquiquia",
          "Huancaraylla",
          "Sarhua",
          "Vilcanchos",
        ],
      },
      {
        name: "Vilcashuamá",
        distritos: [
          "Vilcashuamán",
          "Accomarca",
          "Carhuanca",
          "Concepción",
          "Huambalpa",
          "Independencia",
          "Saurama",
          "Vischongo",
        ],
      },
    ],
  },
  {
    name: "Cajamarca",
    provincias: [
      {
        name: "Cajamarca",
        distritos: [
          "Cajamarca",
          "Asunción",
          "Chetilla",
          "Cospán",
          "Jesús",
          "Llacanora",
          "La Encañada",
          "Los Baños del Inca",
          "Magdalena",
          "Matara",
          "Namora",
          "San Juan",
        ],
      },
      {
        name: "Cajabamba",
        distritos: ["Cajabamba", "Cachachi", "Condebamba", "Sitacocha"],
      },
      {
        name: "Celendín",
        distritos: [
          "Celendín",
          "Chumuch",
          "Cortegana",
          "Huasmin",
          "Jorge Chávez",
          "José Gálvez",
          "La Libertad de Pallán",
          "Miguel Iglesias",
          "Oxamarca",
          "Sorochuco",
          "Sucre",
          "Utco",
        ],
      },
      {
        name: "Chota",
        distritos: [
          "Chota",
          "Anguía",
          "Chadín",
          "Chalamarca",
          "Chiguirip",
          "Chimban",
          "Choropampa",
          "Cochabamba",
          "Conchán",
          "Huambos",
          "Lajas",
          "Llama",
          "Miracosta",
          "Paccha",
          "Pion",
          "Querocoto",
          "San Juan de Licupis",
          "Tacabamba",
          "Tocmoche",
        ],
      },
      {
        name: "Contumaza",
        distritos: [
          "Contumazá",
          "Chilete",
          "Cupisnique",
          "Guzmango",
          "San Benito",
          "Santa Cruz de Toledo",
          "Tantarica",
          "Yonán",
        ],
      },
      {
        name: "Cutervo",
        distritos: [
          "Cutervo",
          "Calláyuc",
          "Choros",
          "Cujillo",
          "La Ramada",
          "Pimpingos",
          "Querocotillo",
          "San Andrés de Cutervo",
          "San Juan de Cutervo",
          "San Luis de Lucma",
          "Santa Cruz",
          "Santo Domingo de la Capilla",
          "Santo Tomás",
          "Socota",
          "Toribio Casanova",
        ],
      },
      { name: "Hualgayoc", distritos: ["Bambamarca", "Chugur", "Hualgayoc"] },
      {
        name: "Jaén",
        distritos: [
          "Jaén",
          "Bellavista",
          "Chontalí",
          "Colasay",
          "Huabal",
          "Las Pirias",
          "Pomahuaca",
          "Pucará",
          "Sallique",
          "San Felipe",
          "San José del Alto",
          "Santa Rosa",
        ],
      },
      {
        name: "San Ignacio",
        distritos: [
          "San Ignacio",
          "Chirinos",
          "Huarango",
          "La Coipa",
          "Namballe",
          "San José de Lourdes",
          "Tabaconas",
        ],
      },
      {
        name: "San Marcos",
        distritos: [
          "Pedro Gálvez",
          "Chancay",
          "Eduardo Villanueva",
          "Gregorio Pita",
          "Ichocán",
          "José Manuel Quiroz",
          "José Sabogal",
        ],
      },
      {
        name: "San Miguel",
        distritos: [
          "San Miguel",
          "Bolívar",
          "Calquis",
          "Catilluc",
          "El Prado",
          "La Florida",
          "Llapa",
          "Nanchoc",
          "Niepos",
          "San Gregorio",
          "San Silvestre de Conchán",
          "Tongod",
          "Unión Agua Blanca",
        ],
      },
      {
        name: "San Pablo",
        distritos: ["San Pablo", "San Bernardino", "San Luis", "Tumbaden"],
      },
      {
        name: "Santa Cruz",
        distritos: [
          "Santa Cruz",
          "Andabamba",
          "Catache",
          "Chancaybaños",
          "La Esperanza",
          "Ninabamba",
          "Pulán",
          "Saucepampa",
          "Sexi",
          "Uticyacu",
          "Yauyucan",
        ],
      },
    ],
  },
  {
    name: "Cusco",
    provincias: [
      {
        name: "Cuzco",
        distritos: [
          "Cusco",
          "Ccorca",
          "Poroy",
          "San Jerónimo",
          "San Sebastián",
          "Santiago",
          "Saylla",
          "Wanchaq",
        ],
      },
      {
        name: "Acomayo",
        distritos: [
          "Acomayo",
          "Acopia",
          "Acos",
          "Mosoc Llacta",
          "Pomacanchi",
          "Rondocan",
          "Sangarará",
        ],
      },
      {
        name: "Anta",
        distritos: [
          "Anta",
          "Ancahuasi",
          "Cachimayo",
          "Chinchaypujio",
          "Huarocondo",
          "Limatambo",
          "Mollepata",
          "Pucyura",
          "Zurite",
        ],
      },
      {
        name: "Calca",
        distritos: [
          "Calca",
          "Coya",
          "Lamay",
          "Lares",
          "Pisac",
          "San Salvador",
          "Taray",
          "Yanatile",
        ],
      },
      {
        name: "Canas",
        distritos: [
          "Yanaoca",
          "Checca",
          "Kunturkanki",
          "Langui",
          "Layo",
          "Pampamarca",
          "Quehue",
          "Túpac Amaru",
        ],
      },
      {
        name: "Canchis",
        distritos: [
          "Sicuani",
          "Checacupe",
          "Combapata",
          "Marangani",
          "Pitumarca",
          "San Pablo",
          "San Pedro",
          "Tinta",
        ],
      },
      {
        name: "Chumbivilcas",
        distritos: [
          "Santo Tomás",
          "Ccapacmarca",
          "Chamaca",
          "Colquemarca",
          "Livitaca",
          "Llusco",
          "Quiñota",
          "Velille",
        ],
      },
      {
        name: "Espinar",
        distritos: [
          "Yauri",
          "Condoroma",
          "Coporaque",
          "Ocoruro",
          "Pallpata",
          "Pichigua",
          "Suyckutambo",
          "Alto Pichigua",
        ],
      },
      {
        name: "La Convención",
        distritos: [
          "Santa Ana",
          "Echarate",
          "Huayopata",
          "Maranura",
          "Ocobamba",
          "Quelloúno",
          "Kimbiri",
          "Santa Teresa",
          "Vilcabamba",
          "Pichari",
          "Inkawasi",
          "Villa Virgen",
          "Villa Kintiarina",
          "Meganton",
        ],
      },
      {
        name: "Paruro",
        distritos: [
          "Paruro",
          "Accha",
          "Ccapi",
          "Colcha",
          "Huanoquite",
          "Omacha",
          "Paccaritambo",
          "Pillpinto",
          "Yaurisque",
        ],
      },
      {
        name: "Paucartambo",
        distritos: [
          "Paucartambo",
          "Caicay",
          "Challabamba",
          "Colquepata",
          "Kosñipata",
          "Huancarani",
        ],
      },
      {
        name: "Quispicanchi",
        distritos: [
          "Andahuaylillas",
          "Camanti",
          "Ccarhuayo",
          "Ccatca",
          "Cusipata",
          "Huaro",
          "Lucre",
          "Marcapata",
          "Ocongate",
          "Oropesa",
          "Quiquijana",
          "Urcos",
        ],
      },
      {
        name: "Urubamba",
        distritos: [
          "Chinchero",
          "Huayllabamba",
          "Machupicchu",
          "Maras",
          "Ollantaytambo",
          "Urubamba",
          "Yucay",
        ],
      },
    ],
  },
  {
    name: "Huancavelica",
    provincias: [
      {
        name: "Huancavelica",
        distritos: [
          "Acobambilla",
          "Acoria",
          "Ascensión",
          "Conayca",
          "Cuenca",
          "Huachocolpa",
          "Huando",
          "Huancavelica",
          "Huayllahuara",
          "Izcuchaca",
          "Laria",
          "Manta",
          "Mariscal Cáceres",
          "Moya",
          "Nuevo Occoro",
          "Palca",
          "Pilchaca",
          "Vilca",
          "Yauli",
        ],
      },
      {
        name: "Acobamba",
        distritos: [
          "Acobamba",
          "Andabamba",
          "Anta",
          "Caja",
          "Marcas",
          "Paucará",
          "Pomacocha",
          "Rosario",
        ],
      },
      {
        name: "Angaraes",
        distritos: [
          "Lircay",
          "Anchonga",
          "Callanmarca",
          "Ccochaccasa",
          "Chincho",
          "Congalla",
          "Huanca Huanca",
          "Huayllay Grande",
          "Julcamarca",
          "San Antonio de Antaparco",
          "Santo Tomás de Pata",
          "Seclla",
        ],
      },
      {
        name: "Castrovirreyna",
        distritos: [
          "Castrovirreyna",
          "Arma",
          "Aurahuá",
          "Capillas",
          "Chupamarca",
          "Cocas",
          "Huachos",
          "Huamatambo",
          "Mollepampa",
          "San Juan",
          "Santa Ana",
          "Tantara",
          "Ticrapo",
        ],
      },
      {
        name: "Churcampa",
        distritos: [
          "Churcampa",
          "Anco",
          "Chinchihuasi",
          "Cosme2​",
          "El Carmen",
          "La Merced",
          "Locroja",
          "Pachamarca",
          "Paucarbamba",
          "San Miguel de Mayocc",
          "San Pedro de Coris",
        ],
      },
      {
        name: "Huaytará",
        distritos: [
          "Huaytará",
          "Ayaví",
          "Córdova",
          "Huayacundo Arma",
          "Laramarca",
          "Ocoyo",
          "Pilpichaca",
          "Querco",
          "Quito-Arma",
          "San Antonio de Cusicancha",
          "San Francisco de Sangayaico",
          "San Isidro",
          "Santiago de Chocorvos",
          "Santiago de Quirahuara",
          "Santo Domingo de Capillas",
          "Tambo",
        ],
      },
      {
        name: "Tayacaja",
        distritos: [
          "Pampas",
          "Acostambo",
          "Acraquía",
          "Ahuaycha",
          "Andaymarca",
          "Colcabamba",
          "Daniel Hernández",
          "Huachocolpa",
          "Huaribamba",
          "Ñahuimpuquio",
          "Pazos",
          "Pichos",
          "Roble",
          "Quichuas",
          "Quishuar",
          "Salcabamba",
          "Salcahuasi",
          "San Marcos de Rocchac",
          "Santiago de Tucuma",
          "Surcubamba",
          "Tintay Puncu",
        ],
      },
    ],
  },
  {
    name: "Huánuco",
    provincias: [
      {
        name: "Huánuco",
        distritos: [
          "Huánuco",
          "Amarilis",
          "Chinchao",
          "Churumbamba",
          "Margos",
          "Pillco Marca",
          "Quisqui (Kichki)",
          "San Francisco de Cayrán",
          "San Pedro de Chaulán",
          "Santa María del Valle",
          "Yarumayo",
          "Yacus",
          "San Pablo de Pillao",
        ],
      },
      {
        name: "Ambo",
        distritos: [
          "Ambo",
          "Cayna",
          "Colpas",
          "Conchamarca",
          "Huácar",
          "San Francisco",
          "San Rafael",
          "Tomay Kichwa",
        ],
      },
      {
        name: "Dos de Mayo",
        distritos: [
          "La Unión",
          "Chuquis",
          "Marías",
          "Pachas",
          "Quivilla",
          "Ripán",
          "Shunqui",
          "Sillapata",
          "Yanas",
        ],
      },
      {
        name: "Huacaybamba",
        distritos: ["Huacaybamba", "Canchabamba", "Cochabamba", "Pinra"],
      },
      {
        name: "Huamalíes",
        distritos: [
          "Llata",
          "Puños",
          "Miraflores",
          "Punchao",
          "Singa",
          "Jacas Grande",
          "Chavín de Pariarca",
          "Tantamayo",
          "Jircan",
          "Arancay",
          "Monzón",
        ],
      },
      {
        name: "Leoncio Prado",
        distritos: [
          "Rupa-Rupa",
          "Daniel Alomía Robles",
          "Hermilio Valdizán",
          "José Crespo y Castillo",
          "Luyando",
          "Mariano Dámaso Beraun",
          "Pucayacu",
          "Castillo Grande",
          "Pueblo Nuevo",
          "Santo Domingo de Anda",
        ],
      },
      {
        name: "Marañón",
        distritos: [
          "Huacrachuco",
          "Cholón",
          "La Morada2​",
          "San Buenaventura",
          "Santa Rosa de Alto Yanajanca",
        ],
      },
      { name: "Pachitea", distritos: ["Panao", "Chaglla", "Molino", "Umari"] },
      {
        name: "Puerto Inca",
        distritos: [
          "Puerto Inca",
          "Codo del Pozuzo",
          "Honoria",
          "Tournavista",
          "Yuyapichis",
        ],
      },
      {
        name: "Lauricocha",
        distritos: [
          "Jesús",
          "Baños",
          "Jivia",
          "Queropalca",
          "Rondos",
          "San Francisco de Asís",
          "San Miguel de Cauri",
        ],
      },
      {
        name: "Yarowilc",
        distritos: [
          "Chavinillo",
          "Cáhuac",
          "Chacabamba",
          "Aparicio Pomares",
          "Jacas Chico",
          "Obas",
          "Pampamarca",
          "Choras",
        ],
      },
    ],
  },
  {
    name: "Ica",
    privincias: [
      {
        name: "Ica",
        distritos: [
          "Ica",
          "La Tinguiña",
          "Los Aquijes",
          "Ocucaje",
          "Pachacútec",
          "Parcona",
          "Pueblo Nuevo",
          "Salas",
          "San José de los Molinos",
          "San Juan Bautista",
          "Santiago",
          "Subtanjalla",
          "Tate",
          "Yauca del Rosario",
        ],
      },
      {
        name: "Chincha",
        distritos: [
          "Chincha Alta",
          "Alto Larán",
          "Chavín",
          "Chincha Baja",
          "El Carmen",
          "Grocio Prado",
          "Pueblo Nuevo",
          "San Juan de Yanac",
          "San Pedro de Huacarpana",
          "Sunampe",
          "Tambo de Mora",
        ],
      },
      {
        name: "Nazca",
        distritos: [
          "Nazca",
          "Changuillo",
          "El Ingenio",
          "Marcona",
          "Vista Alegre",
        ],
      },
      {
        name: "Palpa",
        distritos: ["Palpa", "Llipata", "Río Grande", "Santa Cruz", "Tibillo"],
      },
      {
        name: "Pisco",
        distritos: [
          "Pisco",
          "Huancano",
          "Humay",
          "Independencia",
          "Paracas",
          "San Andrés",
          "San Clemente",
          "Túpac Amaru Inca",
        ],
      },
    ],
  },
  {
    name: "Junín",
    provincias: [
      {
        name: "Huancayo",
        distritos: [
          "Carhuacallanga",
          "Chacapampa",
          "Chicche",
          "Chilca",
          "Chongos Alto",
          "Chupuro",
          "Colca",
          "Cullhuas",
          "El Tambo",
          "Huacrapuquio",
          "Hualhuas",
          "Huancán",
          "Huancayo",
          "Huasicancha",
          "Huayucachi",
          "Ingenio",
          "Pariahuanca",
          "Pilcomayo",
          "Pucará",
          "Quichuay",
          "Quilcas",
          "San Agustín de Cajas",
          "San Jerónimo de Tunán",
          "San Pedro de Saño",
          "Santo Domingo de Acobamba",
          "Sapallanga",
          "Sicaya",
          "Viques",
        ],
      },
      {
        name: "Chanchamayo",
        distritos: [
          "Chanchamayo",
          "San Luis de Shuaro",
          "Perené",
          "Pichanaqui",
          "San Ramón",
          "Vítoc",
        ],
      },
      {
        name: "Chupaca",
        distritos: [
          "Chupaca",
          "Áhuac",
          "Chongos Bajo",
          "Huáchac",
          "Huamancaca Chico",
          "San Juan de Yscos",
          "San Juan de Jarpa",
          "Tres de Diciembre",
          "Yanacancha",
        ],
      },
      {
        name: "Concepción",
        distritos: [
          "Concepción",
          "Aco",
          "Andamarca",
          "Chambara",
          "Cochas",
          "Comas",
          "Heroínas Toledo",
          "Manzanares",
          "Mariscal Castilla",
          "Matahuasi",
          "Mito",
          "Nueve de Julio",
          "Orcotuna",
          "San Jose de Quero",
          "Santa Rosa de Ocopa",
        ],
      },
      {
        name: "Jauja",
        distritos: [
          "Jauja",
          "Acolla",
          "Apata",
          "Ataura",
          "Canchayllo",
          "Curicaca",
          "El Mantaro",
          "Huamalí",
          "Huaripampa",
          "Huertas",
          "Janjaillo",
          "Julcán",
          "Leonor Ordóñez",
          "Llocllapampa",
          "Marco",
          "Masma",
          "Masma Chicche",
          "Molinos",
          "Monobamba",
          "Muqui",
          "Muquiyauyo",
          "Paca",
          "Paccha",
          "Pancán",
          "Parco",
          "Pomacancha",
          "Ricrán",
          "San Lorenzo",
          "San Pedro de Chunán",
          "Sausa",
          "Sincos",
          "Tunanmarca",
          "Yauli",
          "Yauyos",
        ],
      },
      {
        name: "Junín",
        distritos: ["Junín", "Carhuamayo", "Ondores", "Ulcumayo"],
      },
      {
        name: "Satipo",
        distritos: [
          "Satipo",
          "Coviriali",
          "Llaylla",
          "Mazamari",
          "Pampa Hermosa",
          "Pangoa",
          "Río Negro",
          "Río Tambo",
          "Vizcatán del Ene",
        ],
      },
      {
        name: "Tarma",
        distritos: [
          "Tarma",
          "Acobamba",
          "Huaricolca",
          "Huasahuasi",
          "La Unión",
          "Palca",
          "Palcamayo",
          "San Pedro de Cajas",
          "Tapo",
        ],
      },
      {
        name: "Yauli",
        distritos: [
          "La Oroya",
          "Chacapalpa",
          "Huayhuay",
          "Marcapomacocha",
          "Morococha",
          "Paccha",
          "Santa Bárbara de Carhuacayán",
          "Santa Rosa de Sacco",
          "Suitucancha",
          "Yauli",
        ],
      },
    ],
  },
  {
    name: "La Libertad",
    provincias: [
      {
        name: "Trujillo",
        distritos: [
          "Trujillo",
          "El Porvenir",
          "Florencia de Mora",
          "Huanchaco",
          "La Esperanza",
          "Laredo",
          "Moche",
          "Poroto",
          "Salaverry",
          "Simbal",
          "Víctor Larco Herrera",
        ],
      },
      {
        name: "Ascope",
        distritos: [
          "Ascope",
          "Casa Grande",
          "Chicama",
          "Chocope",
          "Magdalena de Cao",
          "Paiján",
          "Rázuri",
          "Santiago de Cao",
        ],
      },
      {
        name: "Bolívar",
        distritos: [
          "Bolívar",
          "Bambamarca",
          "Condormarca",
          "Longotea",
          "Uchumarca",
          "Ucuncha",
        ],
      },
      { name: "Chepén", distritos: ["Chepén", "Pacanga", "Pueblo Nuevo"] },
      {
        name: "Gran Chimú",
        distritos: ["Cascas", "Lucma", "Marmot", "Sayapullo"],
      },
      {
        name: "Julcán",
        distritos: ["Julcán", "Calamarca", "Carabamba", "Huaso"],
      },
      {
        name: "Otuzco",
        distritos: [
          "Otuzco",
          "Agallpampa",
          "Charat",
          "Huaranchal",
          "La Cuesta",
          "Mache",
          "Paranday",
          "Salpo",
          "Sinsicap",
          "Usquil",
        ],
      },
      {
        name: "Pacasmayo",
        distritos: [
          "San Pedro de Lloc",
          "Guadalupe",
          "Jequetepeque",
          "Pacasmayo",
          "San José",
        ],
      },
      {
        name: "Pataz",
        distritos: [
          "Tayabamba",
          "Buldibuyo",
          "Chilia",
          "Huancaspata",
          "Huaylillas",
          "Huayo",
          "Ongón",
          "Parcoy",
          "Pataz",
          "Pías",
          "Santiago de Challas",
          "Taurija",
          "Urpay",
        ],
      },
      {
        name: "Sánchez Carrión",
        distritos: [
          "Huamachuco",
          "Chugay",
          "Cochorco",
          "Curgos",
          "Marcabal",
          "Sanagorán",
          "Sarín",
          "Sartimbamba",
        ],
      },
      {
        name: "Santiago de Chuco",
        distritos: [
          "Santiago de Chuco",
          "Angasmarca",
          "Cachicadán",
          "Mollebamba",
          "Mollepata",
          "Quiruvilca",
          "Santa Cruz de Chuca",
          "Sitabamba",
        ],
      },
      { name: "Viru", distritos: ["Virú", "Chao", "Guadalupito"] },
    ],
  },
  {
    name: "Lambayeque",
    provincias: [
      {
        name: "Chiclayo",
        distritos: [
          "Chiclayo",
          "Cayaltí",
          "Chongoyape",
          "Eten",
          "Puerto Eten",
          "José Leonardo Ortiz",
          "La Victoria",
          "Lagunas",
          "Monsefú",
          "Nueva Arica",
          "Oyotún",
          "Pátapo",
          "Picsi",
          "Pimentel",
          "Pomalca",
          "Pucalá",
          "Reque",
          "Santa Rosa",
          "Tumán",
          "Zaña",
        ],
      },
      {
        name: "Ferreñafe",
        distritos: [
          "Ferreñafe",
          "Cañaris",
          "Incahuasi",
          "Manuel Antonio Mesones Muro",
          "Pítipo",
          "Pueblo Nuevo",
        ],
      },
      {
        name: "Lambayeque",
        distritos: [
          "Lambayeque",
          "Chóchope",
          "Íllimo",
          "Jayanca",
          "Mochumí",
          "Mórrope",
          "Motupe",
          "Olmos",
          "Pacora",
          "Salas",
          "San José",
          "Túcume",
        ],
      },
    ],
  },
  {
    name: "Lima",
    provincias: [
      {
        name: "Lima",
        distritos: [
          "Lima",
          "Ancón",
          "Ate",
          "Barranco",
          "Breña",
          "Carabayllo",
          "Chaclacayo",
          "Chorrillos",
          "Cieneguilla",
          "Comas",
          "El Agustino",
          "Independencia",
          "Jesús María",
          "La Molina",
          "La Victoria",
          "Lince",
          "Los Olivos",
          "Lurigancho-Chosica",
          "Lurin",
          "Magdalena del Mar",
          "Miraflores",
          "Pueblo Libre",
          "Pachacámac",
          "Pucusana",
          "Puente Piedra",
          "Punta Hermosa",
          "Punta Negra",
          "Rímac",
          "San Bartolo",
          "San Borja",
          "San Isidro",
          "San Juan de Lurigancho",
          "San Juan de Miraflores",
          "San Luis",
          "San Martín de Porres",
          "San Miguel",
          "Santa Anita",
          "Santa María del Mar",
          "Santa Rosa",
          "Santiago de Surco",
          "Surquillo",
          "Villa El Salvador",
          "Villa María del Triunf",
        ],
      },
      {
        name: "Barranca",
        distritos: [
          "Barranca",
          "Paramonga",
          "Pativilca",
          "Supe",
          "Supe Puerto",
        ],
      },
      {
        name: "Cajatambo",
        distritos: ["Manás", "Gorgor", "Huancapón", "Cajatambo", "Copa"],
      },
      {
        name: "Canta",
        distritos: [
          "Canta",
          "Arahuay",
          "Huamantanga",
          "Huaros",
          "Lachaqui",
          "San Buenaventura",
          "Santa Rosa de Quives",
        ],
      },
      {
        name: "Cañete",
        distritos: [
          "Asia",
          "Calango",
          "Cerro Azul",
          "Chilca",
          "Coayllo",
          "Imperial",
          "Lunahuaná",
          "Mala",
          "Nuevo Imperial",
          "Pacarán",
          "Quilmaná",
          "San Antonio",
          "San Luis",
          "San Vicente de Cañete",
          "Santa Cruz de Flores",
          "Zúñig",
        ],
      },
      {
        name: "Huaral",
        distritos: [
          "Atavillos Alto",
          "Atavillos Bajo",
          "Aucallama",
          "Chancay",
          "Huaral",
          "Ihuarí",
          "Lampían",
          "Pacaraos",
          "Santa Cruz de Andamarca",
          "Sumbilca",
          "San Miguel de Acos",
          "Veintisiete de Noviembre",
        ],
      },
      {
        name: "Huarochirí",
        distritos: [
          "Matucana",
          "Antioquía",
          "Callahuanca",
          "Carampoma",
          "Chicla",
          "Cuenca",
          "Huachupampa",
          "Huanza",
          "Huarochirí",
          "Lahuaytambo",
          "Langa",
          "Laraos (San Pedro de Laraos)",
          "Mariatana",
          "Ricardo Palma",
          "San Andrés de Tupicocha",
          "San Antonio (de Chaclla)",
          "San Bartolomé",
          "San Damián",
          "San Juan de Iris",
          "San Juan de Tantaranche",
          "San Lorenzo de Quinti",
          "San Mateo",
          "San Mateo de Otao",
          "San Pedro de Casta",
          "San Pedro de Huancayre",
          "Sangallaya",
          "Santa Cruz de Cocachacra",
          "Santa Eulalia",
          "Santiago de Anchucaya",
          "Santiago de Tuna",
          "Santo Domingo de los Olleros",
          "San Jerónimo de Surco",
        ],
      },
      {
        name: "Huaura",
        distritos: [
          "Ámbar",
          "Caleta de Carquín",
          "Checras",
          "Huacho",
          "Hualmay",
          "Huaura",
          "Leoncio Prado",
          "Paccho",
          "Santa Leonor",
          "Santa María",
          "Sayán",
          "Véguet",
        ],
      },
      {
        name: "Oyón",
        distritos: [
          "Oyón",
          "Andajes",
          "Caujul",
          "Cochamarca",
          "Naván",
          "Pachangara",
        ],
      },
      {
        name: "Yauyos",
        distritos: [
          "Yauyos",
          "Alis",
          "Ayauca",
          "Ayavirí",
          "Azángaro",
          "Cacra",
          "Carania",
          "Catahuasi",
          "Chocos",
          "Cochas",
          "Colonia",
          "Hongos",
          "Huampará",
          "Huancaya",
          "Huangáscar",
          "Huantán",
          "Huáñec",
          "Laraos",
          "Lincha",
          "Madeán",
          "Miraflores",
          "Omas",
          "Putinza",
          "Quinches",
          "Quinocay",
          "San Joaquín",
          "San Pedro de Pilas",
          "Tanta",
        ],
      },
    ],
  },
  {
    name: "Loreto",
    provincias: [
      {
        name: "Maynas",
        distritos: [
          "Iquitos",
          "Alto Nanay",
          "Fernando Lores",
          "Indiana",
          "Las Amazonas",
          "Mazán",
          "Napo",
          "Punchana",
          "Torres Causana",
          "Belén",
          "San Juan Bautista",
        ],
      },
      {
        name: "Alto Amazonas",
        distritos: [
          "Yurimaguas",
          "Balsapuerto",
          "Jéberos",
          "Lagunas",
          "Santa Cruz",
          "Teniente César López Rojas",
        ],
      },
      {
        name: "Datem del Marañón",
        distritos: [
          "Barranca",
          "Cahuapanas",
          "Manseriche",
          "Morona",
          "Pastaza",
          "Andoas",
        ],
      },
      {
        name: "Loreto",
        distritos: ["Nauta", "Parinari", "Tigre", "Trompeteros", "Urarinas"],
      },
      {
        name: "Mariscal Ramón Castilla",
        distritos: ["Ramón Castilla", "Pebas", "San Pablo", "Yavarí"],
      },
      {
        name: "Putumayo",
        distritos: [
          "Putumayo",
          "Rosa Panduro",
          "Yaguas",
          "Teniente Manuel Clavero",
        ],
      },
      {
        name: "Requena",
        distritos: [
          "Requena",
          "Alto Tapiche",
          "Capelo",
          "Emilio San Martín",
          "Maquía",
          "Puinahua",
          "Saquena",
          "Soplin",
          "Tapiche",
          "Jenaro Herrera",
          "Yaquerana",
        ],
      },
      {
        name: "Ucayali",
        distritos: [
          "Contamana",
          "Inahuaya",
          "Padre Márquez",
          "Pampa Hermosa",
          "Sarayacu",
          "Alfredo Vargas Guerra",
        ],
      },
    ],
  },
  {
    name: "Madre de Dios",
    provincias: [
      {
        name: "Tambopata",
        distritos: ["Tambopata", "Inambari", "Las Piedras", "Laberinto"],
      },
      {
        name: "Manu",
        distritos: ["Manu", "Fitzcarrald", "Madre de Dios", "Huepetuhe"],
      },
      { name: "Tahuamanu", distritos: ["Iñapari", "Iberia", "Tahuamanu"] },
    ],
  },
  {
    name: "Moquegua",
    provincias: [
      {
        name: "Mariscal Nieto",
        distritos: [
          "Moquegua",
          "Carumas",
          "Cuchumbaya",
          "Samegua",
          "San Cristóbal de Calacoa",
          "Torata",
        ],
      },
      {
        name: "General Sánchez Cerro",
        distritos: [
          "Omate",
          "Chojata",
          "Coalaque",
          "Ichuña",
          "La Capilla",
          "Lloque",
          "Matalaque",
          "Puquina",
          "Quinistaquillas",
          "Ubinas",
          "Yunga",
        ],
      },
      { name: "Ilo", distritos: ["Ilo", "El Algarrobal", "Pacocha"] },
    ],
  },
  {
    name: "Pasco",
    provincias: [
      {
        name: "Pasco",
        distritos: [
          "Chaupimarca",
          "Huachón",
          "Huariaca",
          "Huayllay",
          "Ninacaca",
          "Pallanchacra",
          "Paucartambo",
          "San Francisco de Asís de Yarusyacán",
          "Simón Bolívar",
          "Ticlacayán",
          "Tinyahuarco",
          "Vicco",
          "Yanacancha",
        ],
      },
      {
        name: "Daniel Alcides Carrión",
        distritos: [
          "Yanahuanca",
          "Chacayán",
          "Goyllarisquizga",
          "Páucar",
          "San Pedro de Pillao",
          "Santa Ana de Tusi",
          "Tápuc",
          "Vilcabamb",
        ],
      },
      {
        name: "Oxapamp",
        distritos: [
          "Oxapampa",
          "Chontabamba",
          "Constitución1​",
          "Huancabamba",
          "Palcazu",
          "Pozuzo",
          "Puerto Bermúdez",
          "Villa Rica",
        ],
      },
    ],
  },
  {
    name: "Piura",
    provincias: [
      {
        name: "Piura",
        distritos: [
          "Castilla",
          "Catacaos",
          "Cura Mori",
          "El Tallán",
          "La Arena",
          "La Unión",
          "Las Lomas",
          "Piura",
          "Tambogrande",
          "Veintiséis de Octubre",
        ],
      },
      {
        name: "Ayabaca",
        distritos: [
          "Ayabaca",
          "Frías",
          "Jililí",
          "Lagunas",
          "Montero",
          "Pacaipampa",
          "Paimas",
          "Sapillica",
          "Sícchez",
          "Suyo",
        ],
      },
      {
        name: "Huancabamba",
        distritos: [
          "Huancabamba",
          "Canchaque",
          "El Carmen de la Frontera",
          "Huarmaca",
          "Lalaquiz",
          "San Miguel de El Faique",
          "Sóndor",
          "Sondorillo",
        ],
      },
      {
        name: "Morropón",
        distritos: [
          "Chulucanas",
          "Buenos Aires",
          "Chalaco",
          "La Matanza",
          "Morropón",
          "Salitral",
          "San Juan de Bigote",
          "Santa Catalina de Mossa",
          "Santo Domingo",
          "Yamango",
        ],
      },
      {
        name: "Paita",
        distritos: [
          "Paita",
          "Amotape",
          "Colán",
          "El Arenal",
          "La Huaca",
          "Tamarindo",
          "Vichayal",
        ],
      },
      {
        name: "Sechura",
        distritos: [
          "Sechura",
          "Bellavista de la Unión",
          "Bernal",
          "Cristo Nos Valga",
          "Rinconada-Llicuar",
          "Vice",
        ],
      },
      {
        name: "Sullana",
        distritos: [
          "Sullana",
          "Bellavista",
          "Marcavelica",
          "Salitral",
          "Querecotillo",
          "Lancones",
          "Ignacio Escudero",
          "Miguel Checa",
        ],
      },
      {
        name: "Talar",
        distritos: [
          "Pariñas",
          "El Alto",
          "La Brea",
          "Lobitos",
          "Los Órganos",
          "Máncora",
        ],
      },
    ],
  },
  {
    name: "Puno",
    provincias: [
      {
        name: "Puno",
        distritos: [
          "Ácora",
          "Amantaní",
          "Atuncolla",
          "Capachica",
          "Chucuito",
          "Coata",
          "Huata",
          "Mañazo",
          "Paucarcolla",
          "Bandera de Pichacani Pichacani",
          "Platería",
          "Bandera de Puno Puno",
          "San Antonio",
          "Tiquillaca",
          "Vilque",
        ],
      },
      {
        name: "Azángaro",
        distritos: [
          "Azángaro",
          "Achaya",
          "Arapa",
          "Asillo",
          "Caminaca",
          "Chupa",
          "José Domingo Choquehuanca",
          "Muñani",
          "Potoni",
          "Samán",
          "San Antón",
          "San José",
          "San Juan de Salinas",
          "Santiago de Pupuja",
          "Tirapata",
        ],
      },
      {
        name: "Carabaya",
        distritos: [
          "Ajoyani",
          "Ayapata",
          "Coasa",
          "Corani",
          "Bandera de Crucero Crucero",
          "Ituata",
          "Bandera de Macusani Macusani",
          "Ollachea",
          "San Gabán",
          "Usicayos",
        ],
      },
      {
        name: "Chucuito",
        distritos: [
          "Juli",
          "Desaguadero",
          "Huacullani",
          "Kelluyo",
          "Pisacoma",
          "Pomata",
          "Zepita",
        ],
      },
      {
        name: "El Collao",
        distritos: ["Capaso", "Conduriri", "Ilave", "Pilcuyo", "Santa Rosa"],
      },
      {
        name: "Huancané",
        distritos: [
          "Huancané",
          "Pusi",
          "Vilque Chico",
          "Taraco",
          "Huatasani",
          "Inchupalla",
          "Rosaspata",
          "Cojata",
        ],
      },
      {
        name: "Lampa",
        distritos: [
          "Cabanilla",
          "Calapuja",
          "Lampa",
          "Nicasio",
          "Ocuviri",
          "Palca",
          "Paratía",
          "Pucará",
          "Santa Lucía",
          "Vilavila",
        ],
      },
      {
        name: "Melgar",
        distritos: [
          "Antauta",
          "Ayaviri",
          "Cupi",
          "Llalli",
          "Macari",
          "Ñuñoa",
          "Orurillo",
          "Santa Rosa",
          "Umachiri",
        ],
      },
      { name: "Moho", distritos: ["Conima", "Huayrapata", "Moho", "Tilali"] },
      {
        name: "San Antonio de Putina",
        distritos: [
          "Ananea",
          "Pedro Vilca Apaza",
          "Putina",
          "Quilcapuncu",
          "Sina",
        ],
      },
      {
        name: "San Román",
        distritos: [
          "Cabana",
          "Cabanillas",
          "Caracoto",
          "Juliaca",
          "San Miguel",
        ],
      },
      {
        name: "Sandia",
        distritos: [
          "Alto Inambari",
          "Cuyocuyo",
          "Limbani",
          "Patambuco",
          "Quiaca",
          "Phara",
          "San Pedro de Putinapunco",
          "Sandia",
          "Yanahuaya",
          "San Juan del Oro",
        ],
      },
      {
        name: "Yunguy",
        distritos: [
          "Yunguyo",
          "Anapia",
          "Copani",
          "Cuturapi",
          "Ollaraya",
          "Tinicachi",
          "Unicach",
        ],
      },
    ],
  },
  {
    name: "San Martín",
    provincias: [
      {
        name: "Moyobamba",
        distritos: [
          "Moyobamba",
          "Calzada",
          "Habana",
          "Jepelacio",
          "Soritor",
          "Yantaló",
        ],
      },
      {
        name: "Bellavista",
        distritos: [
          "Bellavista",
          "Alto Biavo",
          "Bajo Biavo",
          "Huallaga",
          "San Pablo",
          "San Rafael",
        ],
      },
      {
        name: "El Dorado",
        distritos: [
          "San José de Sisa",
          "Agua Blanca",
          "San Martín",
          "Santa Rosa",
          "Shatoja",
        ],
      },
      {
        name: "Huallaga",
        distritos: [
          "Saposoa",
          "Alto Saposoa",
          "El Eslabón",
          "Piscoyacu",
          "Sacanche",
          "Tingo de Saposoa",
        ],
      },
      {
        name: "Lamas",
        distritos: [
          "Lamas",
          "Alonso de Alvarado",
          "Barranquita",
          "Caynarachi",
          "Cuñumbuqui",
          "Pinto Recodo",
          "Rumisapa",
          "San Roque de Cumbaza",
          "Shanao",
          "Tabalosos",
          "Zapatero",
        ],
      },
      {
        name: "Mariscal Cáceres",
        distritos: [
          "Juanjuí",
          "Campanilla",
          "Huicungo",
          "Pachiza",
          "Pajarillo",
        ],
      },
      {
        name: "Picota",
        distritos: [
          "Picota",
          "Buenos Aires",
          "Caspisapa",
          "Pilluana",
          "Pucacaca",
          "San Cristóbal",
          "San Hilarión",
          "Shamboyacu",
          "Tingo de Ponasa",
          "Tres Unidos",
        ],
      },
      {
        name: "Rioja",
        distritos: [
          "Rioja",
          "Awajún",
          "Elias Soplin Vargas",
          "Nueva Cajamarca",
          "Pardo Miguel",
          "Pósic",
          "San Fernando",
          "Yorongos",
          "Yuracyac",
        ],
      },
      {
        name: "San Martín",
        distritos: [
          "Tarapoto",
          "Alberto Leveau",
          "Cacatachi",
          "Chazuta",
          "Chipurana",
          "El Porvenir",
          "Huimbayoc",
          "Juan Guerra",
          "La Banda de Shilcayo",
          "Morales",
          "Papaplaya",
          "San Antonio",
          "Sauce",
          "Shapaja",
        ],
      },
      {
        name: "Tocache",
        distritos: ["Tocache", "Nuevo Progreso", "Pólvora", "Shunté", "Uchiza"],
      },
    ],
  },
  {
    name: "Tacna",
    provincias: [
      {
        name: "Tacna",
        distritos: [
          "Tacna",
          "Alto de la Alianza",
          "Palca",
          "Calana",
          "Ciudad Nueva",
          "Coronel Gregorio Albarracín Lanchipa",
          "Inclán",
          "La Yarada-Los Palos",
          "Pachía",
          "Pocollay",
          "Sama",
        ],
      },
      {
        name: "Candarave",
        distritos: [
          "Candarave",
          "Cairani",
          "Camilaca",
          "Curibaya",
          "Huanuara",
          "Quilahuani",
        ],
      },
      { name: "Jorge Basadre", distritos: ["Ilabaya", "Ite", "Locumba"] },
      {
        name: "Tarata",
        distritos: [
          "Tarata",
          "Estique",
          "Estique Pampa",
          "Héroes Albarracín (antes Chucatamani)",
          "Sitajara",
          "Susapaya",
          "Tarucachi",
          "Ticaco",
        ],
      },
    ],
  },
  {
    name: "Tumbes",
    provincias: [
      {
        name: "Tumbes",
        distritos: [
          "Tumbes",
          "Corrales",
          "La Cruz",
          "Pampas de Hospital",
          "San Jacinto",
          "San Juan de la Virgen",
        ],
      },
      {
        name: "Contralmirante Villar",
        distritos: [
          "Canoas de Punta Sal Cancas",
          "Casitas Casitas",
          "Zorritos",
        ],
      },
      {
        name: "Zarumill",
        distritos: ["Zarumilla", "Aguas Verdes", "Papayal", "Matapalo"],
      },
    ],
  },
  {
    name: "Ucayali",
    provincias: [
      {
        name: "Coronel Portillo",
        distritos: [
          "Callería",
          "Iparía",
          "Masisea",
          "Yarinacocha",
          "Raimondi",
          "Tahuanía",
          "Yurúa",
          "Padre Abad",
          "Purús",
        ],
      },
      {
        name: "Atalaya",
        distritos: [
          "Raimondi",
          "Sepahua Sepahua",
          "Tahuanía Bolognesi",
          "Yurúa",
        ],
      },
      {
        name: "Padre Abad",
        distritos: [
          "Padre Abad",
          "Irázola",
          "Curimaná",
          "Alexander von Humboldt",
          "Neshuya",
        ],
      },
      { name: "Purús", distritos: ["Purús"] },
    ],
  },
];

function getSize() {
  let width = window.innerWidth;
  if (width < 650) return "phone";
  else if (width > 650 && width < 1200) return "tablet";
  else return "desktop";
}

// Init Personal data inputs
export default function Complaints() {
  const screenSize = getSize();
  const [typeDoc, setTypeDoc] = useState(null);
  const [flagNumDoc, setFlagNumDoc] = useState(true);
  const [typeDocParent, setTypeDocParent] = useState(null);
  const [flagNumDocParent, setFlagNumDocParent] = useState(true);
  const [department, setDepartment] = useState(null);
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState(null);
  const [isProduct, setIsProduct] = useState(false);
  const [store, setStore] = useState(null);
  const [activeParents, setActiveParents] = useState(false);
  const [isClaim, setIsClaim] = useState(false); // Reclamo
  const [isComplain, setIsComplain] = useState(false); // Queha
  const [selectedOptionComplain, setSelectedOptionComplain] = useState(null);
  const [provinciasList, setProvinciasList] = useState(null);
  const [districtsList, setDistrictsList] = useState(null);
  const [detailInput, setDetailInput] = useState("");
  const [isThanks, setIsThanks] = useState(false);

  const docto = useInput({
    id: "docto",
    name: "docto",
    value: "",
    type: "text",
    required: true,
    errors: {
      requiredError: "Es necesario que ingreses el número de documento",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. 70805133",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú 0-9]+/,
    disabled: flagNumDoc,
  });

  const firstName = useInput({
    id: "firstName",
    name: "firstName",
    value: "",
    type: "text",
    required: true,
    errors: {
      requiredError: "Es necesario que introduzcas tu nombre",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. Fernando",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú ]+/,
  });

  const middleName = useInput({
    id: "middleName",
    name: "middleName",
    value: "",
    type: "text",
    required: true,
    errors: {
      requiredError: "Introduce tus apellidos",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. Robles",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú ]+/,
  });

  const lastName = useInput({
    id: "lastName",
    name: "lastName",
    value: "",
    type: "text",
    required: true,
    errors: {
      requiredError: "Introduce tus apellidos",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. López",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú ]+/,
  });

  // Finish personal data inputs

  // Init address data inputs

  const celular = useInput({
    id: "celular",
    name: "celular",
    value: "",
    type: "text",
    required: true,
    errors: {
      requiredError: "Introduce tus teléfono celular",
      defaultError: "Introduce solo números",
    },
    placeholder: "ej. 56349834980",
    validateEvent: "blur",
    regexpOverwrite: /[0-9]+/,
    maxlength: 12,
  });

  const email = useInput({
    id: "email",
    name: "email",
    value: "",
    type: "text",
    required: true,
    validateEvent: "blur",
    regexp: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    placeholder: "Correo electrónico",
    errors: {
      requiredError: "Este campo es obligatorio",
      defaultError: "Introduce un correo valido",
    },
  });
  // Finish address data inputs

  // Init Parents data inputs
  const nameParent = useInput({
    id: "nameParent",
    name: "nameParent",
    value: "",
    type: "text",
    errors: {
      requiredError: "Coloca el nombre de tu padre, madre o apoderado",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. Juan Carlos García",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú ]+/,
  });

  const documentParent = useInput({
    id: "documentParent",
    name: "documentParent",
    value: "",
    type: "text",
    errors: {
      requiredError: "Coloca el número de documento",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. 3450SDF345430",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú 0-9]+/,
  });

  const addressParent = useInput({
    id: "addressParent",
    name: "addressParent",
    value: "",
    type: "text",
    errors: {
      requiredError: "Coloca el número de documento",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. 5a Av. Haciendas del Bosque 3a seccion",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú 0-9]+/,
  });

  const parentPhone = useInput({
    id: "parentPhone",
    name: "parentPhone",
    value: "",
    type: "text",
    errors: {
      requiredError: "Introduce el teléfono Celular de tu apoderado",
      defaultError: "Introduce solo números",
    },
    placeholder: "ej. 56349834980",
    validateEvent: "blur",
    regexpOverwrite: /[0-9]+/,
    maxlength: 12,
  });

  const parentMail = useInput({
    id: "parentMail",
    name: "parentMail",
    value: "",
    type: "text",
    validateEvent: "blur",
    regexp: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    placeholder: "Correo electrónico",
    errors: {
      requiredError: "Introduce el correo de tu apoderado",
      defaultError: "Introduce un correo valido",
    },
  });
  // Finish Parents data inputs

  //Init General Info
  const monto = useInput({
    id: "monto",
    name: "monto",
    value: "",
    type: "text",
    errors: {
      requiredError: "Introduce el monto Reclamado S/",
      defaultError: "Introduce solo números",
    },
    placeholder: "ej. 1000 S/",
    validateEvent: "blur",
    regexpOverwrite: /[0-9]+/,
  });

  const purchaseDate = useInput({
    id: "purchaseDate",
    name: "purchaseDate",
    value: "",
    type: "text",
    errors: {
      requiredError: "Ingresa fecha de compra",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. DD/MM/AAAA",
    validateEvent: "blur",
    regexpOverwrite: /[0-9\/]+/,
  });

  const orderId = useInput({
    id: "orderId",
    name: "orderId",
    value: "",
    type: "text",
    required: true,
    errors: {
      requiredError: "Coloca el número de documento",
      defaultError: "Introduce solo letras",
    },
    placeholder: "ej. 3450SDF345430",
    validateEvent: "blur",
    regexpOverwrite: /[A-Za-zÁ-Úá-ú 0-9]+/,
  });

  //FInish General Info

  // Handle Data
  const validateData = useInput.validateData;

  function sendPostComplaints() {
    const { errors } = validateData([
      docto,
      firstName,
      middleName,
      lastName,
      celular,
      email,
      nameParent,
      documentParent,
      addressParent,
      parentPhone,
      parentMail,
      monto,
      purchaseDate,
      orderId,
    ]);

    if (!errors || !errors.length) {
      const bodyForm = {
        userDNI: typeDoc,
        documentID: docto.input?.input.value,
        firstName: firstName.input?.input?.value,
        lastName: lastName.input?.input?.value,
        secondLastName: middleName.input?.input?.value,
        department: department,
        province: provincia,
        district: distrito,
        mobilePhone: celular.input?.input?.value,
        email: email.input?.input?.value,
        parentName: nameParent.input?.input?.value,
        parentTypeDocument: typeDocParent || "",
        parentDocumentID: documentParent.input?.input?.value,
        parentAddress: addressParent.input?.input?.value,
        parentMobilePhone: parentPhone.input?.input?.value,
        parentEmail: parentMail.input?.input?.value,
        isProduct: isProduct,
        amount: monto.input?.input?.value,
        store: store || "",
        purchaseDate: purchaseDate.input?.input?.value,
        orderId: orderId.input?.input?.value,
        isClaim: isClaim,
        isComplain: isComplain,
        claimOptionValue: selectedOptionComplain || "",
        claimDetail: detailInput,
      };

      if (provincia !== "") {
        const b = JSON.stringify(bodyForm).toString();
        var bodyPart = [];
        for (var property in bodyForm) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(bodyForm[property]);
          bodyPart.push(encodedKey + "=" + encodedValue);
        }
        bodyPart = bodyPart.join("&");

        fetch("/api/dataentities/CB/documents", {
          method: "POST",
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyForm),
        })
          .then((response) => {
            setIsThanks(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      console.log({ errors });
    }

    /*
      Validacio de CAMPOS
      ID Master Data   |  Placeholder Master Data                 |    IdCodeJS
      userDNI             // DNI Carne de extranjeria y pasaporte   -> typeDoc
      documentID          // Ingresa numero de documento            -> documentID
      firstName           // Nombre                                 -> name
      lastName            // Apellido Paterno                       -> apellidoP
      secondLastName      // Apellido Materno                       -> apellidoM
      department          // Departamento                           -> department
      province            // Provincia                              -> provincia
      district            // Distrito                               -> distrito
      mobilePhone         // Telefono Celular                       -> phone
      email               // Correo electrónico                     -> mail
      parentName          // Nombre de tu Padre o Tutor             -> tutorName
      parentTypeDocument  // Tipo de documento de Padre             -> typeDocParent
      parentDocumentID    // Numero de documento                    -> documentParentValue
      parentAddress       // Direccion del Padre o Tutor            -> addressParentValue
      parentMobilePhone   // Telefono Celular del Padre o Tutor     -> parentPhoneValue
      parentEmail         // Correo del Padre o Tutor               -> parentMailValue
      isProduct           // Producto                               -> isProduct
      amount              // Monto Reclamado                        -> montoValue
      store               // Tienda                                 -> store
      purchaseDate        // Fecha de compra                        -> purchaseDateValue
      orderId             // Numero de pedido                       -> orderIdValue
      isClaim             // Reclamo                                -> isClaim
      isComplain          // Queja                                  -> isComplain
      claimOptionValue    // Opcion de reclamo                      -> selectedOptionComplain
      claimDetail         // Detalle                                -> detailInput
      complainDetail      // Pedido del cliente                     -> pedidoInput
    */
  }

  function typeDocument(e) {
    const value = e.target.value;
    if (value !== "") {
      setTypeDoc(value);
      setFlagNumDoc(false);
    } else {
      setTypeDoc("");
      setFlagNumDoc(true);
    }
  }

  function typeDocumentParent(e) {
    const value = e.target.value;
    if (value !== "") {
      setTypeDocParent(value);
      setFlagNumDocParent(false);
    } else {
      setTypeDocParent("");
      setFlagNumDocParent(true);
    }
  }

  function setDepartmentFn(e) {
    const department = e.target.value;
    setDepartment(department);
    const { provincias } = PERU_ADDRESSES.find(
      ({ name }) => name === department
    );
    setProvinciasList(provincias);
  }

  function provinciaFn(e) {
    const province = e.target.value;
    setProvincia(province);
    const { distritos } = provinciasList.find(({ name }) => name === province);
    setDistrictsList(distritos);
  }

  function distritoFn(e) {
    setDistrito(e.target.value);
  }

  function selectedOption(e) {
    setSelectedOptionComplain(e.target.value);
  }

  function newForm() {
    window.location.href = "/";
  }

  return (
    <div className="containerComplaints">
      <div className="container">
        <div className="header">
          <h2 className="title">Libro de Reclamaciones</h2>
          <h3 className="subtitle">
            Datos de la persona que presenta el reclamo
          </h3>
          <p className="nameStore">
            Tiendas MINI BF PERU S.A.C. RUC. 20604180717
          </p>
          <p className="address">
            Calle Coronel Andrés Reyes Nro. 338 (Piso 2 Oficina 120), distrito de San Isidro, provincia y departamento de Lima, Perú.
          </p>
          <p className="thanks">Gracias por su interés</p>
        </div>
        {(!isThanks && (
          <div className="formComplaints">
            <div
              className={`${
                (screenSize !== "desktop" && "wraperRows") || "wraperColumns"
              }`}
            >
              <div className="leftColumn">
                <div className="personalData">
                  <h3>Datos de la persona que presenta el reclamo</h3>
                  <div className="wrapControl">
                    <select className="dropDownList" onChange={typeDocument}>
                      <option value="">Selcciona un tipo de documento</option>
                      <option value="DNI">DNI</option>
                      <option value="Carne de extranjeria">
                        Carné de extranjería
                      </option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>
                  <div className="wrapControl">
                    <TextField
                      className="textFieldCurp"
                      label="Ingresa número de documento"
                      input={docto.input}
                    />
                  </div>
                  <div className="wrapControl">
                    <TextField
                      className="textFieldCurp"
                      label="Nombres (s)"
                      input={firstName.input}
                    />
                  </div>
                  <div className="wrapControlMiddle">
                    <TextField
                      className="middle"
                      label="Apellido Paterno"
                      input={middleName.input}
                    />
                    <TextField
                      className="middle"
                      label="Apellido Materno"
                      input={lastName.input}
                    />
                  </div>
                </div>
                <div className="addressData">
                  <h3>Domicilio</h3>
                  <div className="wrapControl">
                    <select className="dropDownList" onChange={setDepartmentFn}>
                      <option value="true">Selecciona un departamento</option>
                      {PERU_ADDRESSES &&
                        PERU_ADDRESSES.map(({ name, provincias }, key) => {
                          return (
                            <option key={key} value={name}>
                              {name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="wrapControl">
                    <select className="dropDownList" onChange={provinciaFn}>
                      <option value="">Provincia</option>
                      {provinciasList &&
                        provinciasList.map(({ name }, key) => {
                          return (
                            <option key={key} value={name}>
                              {name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="wrapControl">
                    <select className="dropDownList" onChange={distritoFn}>
                      <option value="">Distrito</option>
                      {districtsList &&
                        districtsList.map((el, key) => {
                          return (
                            <option key={key} value={el}>
                              {el}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="wrapControl">
                    <TextField
                      className="textFieldCurp"
                      label="Teléfono celular"
                      input={celular.input}
                    />
                  </div>
                  <div className="wrapControl">
                    <TextField
                      className="textFieldCurp"
                      label="e-mail"
                      input={email.input}
                    />
                  </div>
                </div>

                <div className="parentsData">
                  <div className="activeParentsTitle">
                    <div
                      className={`${
                        (activeParents && "checkBoxCustomFilled") ||
                        "checkBoxCustom"
                      }`}
                      onClick={() => setActiveParents(!activeParents)}
                    >
                      {activeParents && (
                        <div className="doneIcon">
                          <div className="leftLineCheck"></div>
                          <div className="rightLineCheck"></div>
                        </div>
                      )}
                    </div>
                    <h4 className="bolderTitle">¿Eres menor de Edad?</h4>
                  </div>
                  {activeParents && (
                    <div className="parentsData">
                      <div className="wrapControl">
                        <TextField
                          className="textFieldCurp"
                          label="Coloca el nombre de tu padre, madre o apoderado"
                          input={nameParent.input}
                        />
                      </div>
                      <div className="wrapControlMiddle">
                        <select
                          className="dropDownList"
                          onChange={typeDocumentParent}
                        >
                          <option value="">
                            Selecciona un tipo de documento
                          </option>
                          <option value="DNI">DNI</option>
                          <option value="Carne de extranjeria">
                            Carné de extranjería
                          </option>
                          <option value="Pasaporte">Pasaporte</option>
                        </select>
                        <TextField
                          className="middle"
                          label="Número de documento"
                          input={documentParent.input}
                        />
                      </div>
                      <div className="wrapControl">
                        <TextField
                          className="textFieldCurp"
                          label="Dirección del Apoderado"
                          input={addressParent.input}
                        />
                      </div>
                      <div className="wrapControl">
                        <TextField
                          className="textFieldCurp"
                          label="Teléfono/Celular del Apoderado"
                          input={parentPhone.input}
                        />
                      </div>
                      <div className="wrapControl">
                        <TextField
                          className="textFieldCurp"
                          label="Correo del Apoderado"
                          input={parentMail.input}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="rightColumn">
                <div className="generalInfo">
                  <h3>Información General</h3>
                  <h3>Identificación del bien contratado</h3>
                  <div className="activeParentsTitle">
                    <div
                      className={`${
                        (isProduct && "checkBoxCustomFilled") ||
                        "checkBoxCustom"
                      }`}
                      onClick={() => setIsProduct(!isProduct)}
                    >
                      {isProduct && (
                        <div className="doneIcon">
                          <div className="leftLineCheck"></div>
                          <div className="rightLineCheck"></div>
                        </div>
                      )}
                    </div>
                    <h4 className="bolderTitle">Producto</h4>
                  </div>
                  <div className="wrapControl">
                    <TextField
                      className="textFieldCurp"
                      label="Monto Reclamado S/"
                      input={monto.input}
                    />
                  </div>
                  <div className="wrapControl">
                    <select
                      className="dropDownList"
                      onChange={(e) => setStore(e.target.value)}
                    >
                      <option value="">Selecciona una Tienda</option>
                      {STORES &&
                        STORES.map((el, key) => {
                          return (
                            <option key={key} value={el}>
                              {el}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="wrapControlMiddle">
                    <TextField
                      className="middle"
                      label="Fecha de compra"
                      input={purchaseDate.input}
                    />
                    <TextField
                      className="middle"
                      label="Número de pedido"
                      input={orderId.input}
                    />
                  </div>
                </div>
                <div className="detailInfo">
                  <h3>Detalle de su reclamo</h3>
                  <div className="activeParentsTitle">
                    <div
                      className={`${
                        (isClaim && "checkBoxCustomFilled") || "checkBoxCustom"
                      }`}
                      onClick={() => setIsClaim(!isClaim)}
                    >
                      {isClaim && (
                        <div className="doneIcon">
                          <div className="leftLineCheck"></div>
                          <div className="rightLineCheck"></div>
                        </div>
                      )}
                    </div>
                    <h4 className="bolderTitle">Reclamo</h4>
                    <div
                      className={`${
                        (isComplain && "checkBoxCustomFilled") ||
                        "checkBoxCustom"
                      }`}
                      onClick={() => setIsComplain(!isComplain)}
                    >
                      {isComplain && (
                        <div className="doneIcon">
                          <div className="leftLineCheck"></div>
                          <div className="rightLineCheck"></div>
                        </div>
                      )}
                    </div>
                    <h4 className="bolderTitle">Queja</h4>
                  </div>
                  {isClaim && (
                    <div className="wrapOptionComplain">
                      <input
                        type="radio"
                        id="opt1"
                        name="claim"
                        value="El retraso en la entrega del producto"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt1">
                        El retraso en la entrega del producto
                      </label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt2"
                        name="claim"
                        value="El producto no se asemeja a lo solicitado"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt2">
                        El producto no se asemeja a lo solicitado
                      </label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt3"
                        name="claim"
                        value="Información inexacta"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt3">Información inexacta</label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt4"
                        name="claim"
                        value="Los productos se encontraban defectuosos"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt4">
                        Los productos se encontraban defectuosos
                      </label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt5"
                        name="claim"
                        value="Pedido incompleto"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt5">Pedido incompleto</label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt6"
                        name="claim"
                        value="Cancelación o anulación de pedido sin previo aviso por parte de Miniso/Marketplace"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt6">
                        Cancelación o anulación de pedido sin previo aviso por
                        parte de Miniso/Marketplace
                      </label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt7"
                        name="claim"
                        value="No atendieron el cambio del producto"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt7">
                        No atendieron el cambio del producto
                      </label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt8"
                        name="claim"
                        value="Inconvenientes con las devoluciones de dinero"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt8">
                        Inconvenientes con las devoluciones de dinero
                      </label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt9"
                        name="claim"
                        value="Diferencias con los precios indicados en la web"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt9">
                        Diferencias con los precios indicados en la web
                      </label>
                      <br />
                      <br />
                      <input
                        type="radio"
                        id="opt10"
                        name="claim"
                        value="otros"
                        onChange={selectedOption}
                      />
                      &nbsp;
                      <label htmlFor="opt10">Otros</label>
                    </div>
                  )}
                  <div className="wrapAreaControl">
                    <textarea
                      placeholder="Detalle"
                      className="textAreaInput"
                      onChange={(e) => setDetailInput(e.target.value)}
                      value={detailInput}
                    ></textarea>
                  </div>
                  {/* <div className="wrapAreaControl">
                  <textarea
                    placeholder="Pedido del cliente"
                    className="textAreaInput"
                    onChange={(e) => setPedidoInput(e.target.value)}
                    value={pedidoInput}
                  ></textarea>
                </div> */}
                </div>
              </div>
            </div>
            <div className="wraperButtons">
              <div className="buttonWrapper">
                <button className="buttonPost" onClick={sendPostComplaints}>
                  Enviar
                </button>
              </div>
              <div className="disclaimerPost">
                Al dar click en Enviar, estás de acuerdo con los Términos y
                Condiciones y el Aviso de Privacidad de MINISO. Consúltalos.
              </div>
            </div>
          </div>
        )) || (
          <div className="thanksMessage">
            <h2>Hemos recibido tu mensaje</h2>
            <p>Estaremos respondiendo lo antes posible</p>
            <br />
            <br />
            <div className="wraperButtons">
              <div className="buttonWrapper">
                <button className="buttonReturn" onClick={newForm}>
                  Ir al inicio
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="disclaimer">
          <p>
            <b>RECLAMO:</b> Disconformidad relacionada a los productos o
            servicios.
          </p>
          <p>
            <b>QUEJA:</b> Disconformidad no relacionada a los productos o
            servicios: o, malestar o descontento respecto a la atención al
            público
          </p>
          <p>
            Los datos personales que usted proporciona en el presente documento
            (que podrían contener datos sensibles) serán utilizados y/o tratados
            por Miniso, estricta y únicamente con la finalidad de realizar las
            actividades conducentes a atender su reclamo.
          </p>
          <p>
            Miniso podrá compartir y/o usar y/o almacenar y/o transferir su
            información a terceras personas vinculadas o no a Miniso, sean estos
            socios comerciales o no de Miniso, con el objeto de realizar las
            actividades que resulten necesarias para poder atender su reclamo de
            la mejor manera posible, asi como para atender requerimientos de
            información efectuados por un ente público en el marco de lo
            dispuesto por la Ley No. 29571 y el Reglamento del Libro de
            Reclamaciones del Código de Protección y Defensa del Consumidor.
          </p>
          <p>
            He sido informado que podré ejercer cuando corresponda mis derechos
            de información, acceso, rectificacón cancelación y oposición de mis
            datos en cualquier momento efectuando mi comunicación o solicitud
            por escrito en cualquiera de las oficinas de Miniso.
          </p>
          <p>
            Con la suscripción del presente documento EL CLIENTE recibe copia
            del mismo y declara haber sido debidamente informado sobre el
            procedimiento, plazo de atención y medio de respuesta de
            requerimientos de Miniso. De conformidad y en cumplimiento del D.S.
            011-2011 PCM y sus modificatorias, el plazo de atención del reclamo
            podrá extenderse excepcionalmente de acuerdo a la complejidad del
            requerimiento.
          </p>
          <p>
            El tipo de moneda expresado en el campo "Monto Reclamado" es en
            Soles(S/).
          </p>
          <p>
            Los datos condignados en el presente documento han sido
            proporcionados por el cliente, por lo tanto son veraces y de total
            conformidad del usuario.
          </p>
          <p>
            La formulación del reclamo no impide acudir a otras vías de solución
            de controversias ni es requisito previo para interponer una denuncia
            ante el INDECOPI.
          </p>
        </div>
      </div>
    </div>
  );
}
