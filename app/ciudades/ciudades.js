export const ciudades = [
  // ESPAÑA
  { slug: "barcelona", nombre: "Barcelona", pais: "España", flag: "🇪🇸", estudiantes: "280.000", grupos: "34", keyword: "erasmus barcelona", descripcion: "Ciudad cosmopolita con una de las mayores comunidades Erasmus de Europa. Arquitectura única, playa y vida nocturna inigualable." },
  { slug: "madrid", nombre: "Madrid", pais: "España", flag: "🇪🇸", estudiantes: "320.000", grupos: "28", keyword: "erasmus madrid", descripcion: "Capital española y hub universitario con más de 15 universidades. Cultura, gastronomía y una vida estudiantil vibrante." },
  { slug: "sevilla", nombre: "Sevilla", pais: "España", flag: "🇪🇸", estudiantes: "120.000", grupos: "19", keyword: "erasmus sevilla", descripcion: "La ciudad más auténtica de Andalucía. Flamenco, tapas y una de las experiencias Erasmus más memorables de España." },
  { slug: "valencia", nombre: "Valencia", pais: "España", flag: "🇪🇸", estudiantes: "150.000", grupos: "22", keyword: "erasmus valencia", descripcion: "Sol, playa y la famosa paella. Valencia combina calidad de vida y precio asequible para estudiantes internacionales." },

  // ITALIA
  { slug: "milan", nombre: "Milán", pais: "Italia", flag: "🇮🇹", estudiantes: "210.000", grupos: "41", keyword: "erasmus milan", descripcion: "Capital de la moda y el diseño. Milán atrae a miles de estudiantes de máster y Erasmus cada semestre con sus universidades de prestigio." },
  { slug: "roma", nombre: "Roma", pais: "Italia", flag: "🇮🇹", estudiantes: "195.000", grupos: "35", keyword: "erasmus roma", descripcion: "La Ciudad Eterna. Estudiar en Roma es vivir rodeado de historia, arte y una gastronomía incomparable." },
  { slug: "bolonia", nombre: "Bolonia", pais: "Italia", flag: "🇮🇹", estudiantes: "100.000", grupos: "18", keyword: "erasmus bolonia", descripcion: "Sede de la universidad más antigua del mundo. Bolonia es la ciudad universitaria por excelencia de Italia." },
  { slug: "florencia", nombre: "Florencia", pais: "Italia", flag: "🇮🇹", estudiantes: "90.000", grupos: "15", keyword: "erasmus florencia", descripcion: "Cuna del Renacimiento. Perfecta para estudiantes de arte, arquitectura y humanidades." },
  { slug: "turin", nombre: "Turín", pais: "Italia", flag: "🇮🇹", estudiantes: "110.000", grupos: "14", keyword: "erasmus turin", descripcion: "Ciudad industrial y universitaria del norte de Italia, con un coste de vida más asequible que Milán." },
  { slug: "napoles", nombre: "Nápoles", pais: "Italia", flag: "🇮🇹", estudiantes: "130.000", grupos: "12", keyword: "erasmus napoles", descripcion: "Caótica, auténtica y apasionante. Nápoles ofrece una experiencia cultural única y precios muy asequibles." },

  // PORTUGAL
  { slug: "lisboa", nombre: "Lisboa", pais: "Portugal", flag: "🇵🇹", estudiantes: "165.000", grupos: "32", keyword: "erasmus lisboa", descripcion: "Lisboa está de moda. Ciudad vibrante, precios asequibles y una comunidad internacional enorme. La favorita de los estudiantes españoles." },
  { slug: "oporto", nombre: "Oporto", pais: "Portugal", flag: "🇵🇹", estudiantes: "95.000", grupos: "20", keyword: "erasmus oporto", descripcion: "La ciudad más bohemia de Portugal. Oporto combina historia, cultura y una escena estudiantil muy activa." },

  // ALEMANIA
  { slug: "berlin", nombre: "Berlín", pais: "Alemania", flag: "🇩🇪", estudiantes: "190.000", grupos: "29", keyword: "erasmus berlin", descripcion: "Capital cultural de Europa. Berlín es la ciudad más cosmopolita y creativa para estudiantes internacionales." },
  { slug: "munich", nombre: "Múnich", pais: "Alemania", flag: "🇩🇪", estudiantes: "160.000", grupos: "24", keyword: "erasmus munich", descripcion: "Ciudad de la tecnología, el diseño y la cerveza. Múnich tiene algunas de las mejores universidades técnicas de Europa." },
  { slug: "hamburgo", nombre: "Hamburgo", pais: "Alemania", flag: "🇩🇪", estudiantes: "140.000", grupos: "18", keyword: "erasmus hamburgo", descripcion: "Puerto, cultura y modernidad. Hamburgo es la segunda ciudad más grande de Alemania y un hub estudiantil importante." },
  { slug: "frankfurt", nombre: "Frankfurt", pais: "Alemania", flag: "🇩🇪", estudiantes: "120.000", grupos: "14", keyword: "erasmus frankfurt", descripcion: "Capital financiera de Europa y sede de grandes universidades e institutos de investigación." },
  { slug: "colonia", nombre: "Colonia", pais: "Alemania", flag: "🇩🇪", estudiantes: "100.000", grupos: "12", keyword: "erasmus colonia", descripcion: "Ciudad histórica a orillas del Rin con una vida universitaria muy activa y eventos culturales todo el año." },

  // FRANCIA
  { slug: "paris", nombre: "París", pais: "Francia", flag: "🇫🇷", estudiantes: "400.000", grupos: "38", keyword: "erasmus paris", descripcion: "La ciudad más romántica del mundo. París tiene más de 400.000 estudiantes y una oferta académica incomparable." },
  { slug: "lyon", nombre: "Lyon", pais: "Francia", flag: "🇫🇷", estudiantes: "135.000", grupos: "16", keyword: "erasmus lyon", descripcion: "Capital gastronómica de Francia y ciudad universitaria de primer nivel con precios más asequibles que París." },
  { slug: "toulouse", nombre: "Toulouse", pais: "Francia", flag: "🇫🇷", estudiantes: "130.000", grupos: "14", keyword: "erasmus toulouse", descripcion: "La ciudad rosa. Toulouse es el centro de la industria aeroespacial europea y tiene una enorme comunidad estudiantil." },
  { slug: "estrasburgo", nombre: "Estrasburgo", pais: "Francia", flag: "🇫🇷", estudiantes: "60.000", grupos: "11", keyword: "erasmus estrasburgo", descripcion: "Ciudad fronteriza entre Francia y Alemania, sede del Parlamento Europeo y perfecta para estudiantes de derecho e instituciones europeas." },

  // PAÍSES BAJOS
  { slug: "amsterdam", nombre: "Ámsterdam", pais: "Países Bajos", flag: "🇳🇱", estudiantes: "145.000", grupos: "26", keyword: "erasmus amsterdam", descripcion: "La ciudad de las bicicletas y los canales. Ámsterdam es multicultural, tolerante y tiene algunas de las mejores universidades de Europa." },
  { slug: "rotterdam", nombre: "Rotterdam", pais: "Países Bajos", flag: "🇳🇱", estudiantes: "85.000", grupos: "13", keyword: "erasmus rotterdam", descripcion: "Ciudad moderna y arquitectónicamente impresionante. Rotterdam tiene el puerto más grande de Europa y universidades de alto nivel." },
  { slug: "utrecht", nombre: "Utrecht", pais: "Países Bajos", flag: "🇳🇱", estudiantes: "70.000", grupos: "11", keyword: "erasmus utrecht", descripcion: "Ciudad universitaria por excelencia de Países Bajos. Utrecht es compacta, acogedora y perfecta para estudiantes." },

  // REPÚBLICA CHECA
  { slug: "praga", nombre: "Praga", pais: "República Checa", flag: "🇨🇿", estudiantes: "120.000", grupos: "21", keyword: "erasmus praga", descripcion: "Una de las ciudades más bellas de Europa. Praga combina arquitectura medieval, vida nocturna legendaria y precios muy asequibles." },

  // AUSTRIA
  { slug: "viena", nombre: "Viena", pais: "Austria", flag: "🇦🇹", estudiantes: "195.000", grupos: "23", keyword: "erasmus viena", descripcion: "Capital cultural de Europa Central. Viena es la ciudad con mejor calidad de vida del mundo y una tradición universitaria extraordinaria." },

  // POLONIA
  { slug: "varsovia", nombre: "Varsovia", pais: "Polonia", flag: "🇵🇱", estudiantes: "260.000", grupos: "19", keyword: "erasmus varsovia", descripcion: "Capital de Polonia en pleno auge. Varsovia combina historia, modernidad y precios muy asequibles para estudiantes." },
  { slug: "cracovia", nombre: "Cracovia", pais: "Polonia", flag: "🇵🇱", estudiantes: "200.000", grupos: "17", keyword: "erasmus cracovia", descripcion: "La ciudad universitaria más querida de Polonia. Cracovia tiene una de las universidades más antiguas de Europa y una vida estudiantil extraordinaria." },

  // HUNGRÍA
  { slug: "budapest", nombre: "Budapest", pais: "Hungría", flag: "🇭🇺", estudiantes: "140.000", grupos: "20", keyword: "erasmus budapest", descripcion: "La perla del Danubio. Budapest es una de las ciudades más bonitas de Europa con una vida nocturna legendaria y precios muy asequibles." },

  // BÉLGICA
  { slug: "bruselas", nombre: "Bruselas", pais: "Bélgica", flag: "🇧🇪", estudiantes: "150.000", grupos: "17", keyword: "erasmus bruselas", descripcion: "Capital de Europa. Bruselas es perfecta para estudiantes de política, derecho e instituciones europeas." },

  // SUECIA
  { slug: "estocolmo", nombre: "Estocolmo", pais: "Suecia", flag: "🇸🇪", estudiantes: "175.000", grupos: "15", keyword: "erasmus estocolmo", descripcion: "Capital escandinava de diseño e innovación. Estocolmo tiene universidades de altísimo nivel y una calidad de vida excepcional." },

  // DINAMARCA
  { slug: "copenhague", nombre: "Copenhague", pais: "Dinamarca", flag: "🇩🇰", estudiantes: "130.000", grupos: "13", keyword: "erasmus copenhague", descripcion: "Ciudad sostenible y feliz. Copenhague es referente mundial en diseño, arquitectura y bienestar estudiantil." },

  // NORUEGA
  { slug: "oslo", nombre: "Oslo", pais: "Noruega", flag: "🇳🇴", estudiantes: "90.000", grupos: "10", keyword: "erasmus oslo", descripcion: "Capital escandinava rodeada de naturaleza. Oslo tiene universidades de alto nivel y una cultura estudiantil abierta e inclusiva." },

  // FINLANDIA
  { slug: "helsinki", nombre: "Helsinki", pais: "Finlandia", flag: "🇫🇮", estudiantes: "110.000", grupos: "11", keyword: "erasmus helsinki", descripcion: "Capital del diseño nórdico. Helsinki combina modernidad, naturaleza y excelencia académica." },

  // IRLANDA
  { slug: "dublin", nombre: "Dublín", pais: "Irlanda", flag: "🇮🇪", estudiantes: "145.000", grupos: "16", keyword: "erasmus dublin", descripcion: "Capital angloparlante de Europa. Dublín es perfecta para mejorar el inglés mientras estudias en universidades de prestigio mundial." },

  // GRECIA
  { slug: "atenas", nombre: "Atenas", pais: "Grecia", flag: "🇬🇷", estudiantes: "160.000", grupos: "15", keyword: "erasmus atenas", descripcion: "Cuna de la civilización occidental. Atenas combina historia milenaria, sol mediterráneo y precios muy asequibles." },

  // RUMANÍA
  { slug: "bucarest", nombre: "Bucarest", pais: "Rumanía", flag: "🇷🇴", estudiantes: "170.000", grupos: "13", keyword: "erasmus bucarest", descripcion: "La ciudad más sorprendente de los Balcanes. Bucarest es moderna, vibrante y con uno de los costes de vida más bajos de Europa." },

  // CROACIA
  { slug: "zagreb", nombre: "Zagreb", pais: "Croacia", flag: "🇭🇷", estudiantes: "80.000", grupos: "10", keyword: "erasmus zagreb", descripcion: "Capital croata llena de encanto centroeuropeo. Zagreb es acogedora, asequible y perfecta para descubrir los Balcanes." },

  // ESLOVAQUIA
  { slug: "bratislava", nombre: "Bratislava", pais: "Eslovaquia", flag: "🇸🇰", estudiantes: "65.000", grupos: "9", keyword: "erasmus bratislava", descripcion: "La capital más pequeña y acogedora de Europa Central. Bratislava está a 1 hora de Viena y Praga." },

  // ESLOVENIA
  { slug: "liubliana", nombre: "Liubliana", pais: "Eslovenia", flag: "🇸🇮", estudiantes: "55.000", grupos: "8", keyword: "erasmus liubliana", descripcion: "La capital más verde de Europa. Liubliana es compacta, sostenible y perfecta para estudiantes que buscan calidad de vida." },

  // PAÍSES BÁLTICOS
  { slug: "tallin", nombre: "Tallin", pais: "Estonia", flag: "🇪🇪", estudiantes: "50.000", grupos: "8", keyword: "erasmus tallin", descripcion: "La ciudad más digital del mundo. Tallin es pionera en tecnología e innovación, perfecta para estudiantes de tecnología y startups." },
  { slug: "riga", nombre: "Riga", pais: "Letonia", flag: "🇱🇻", estudiantes: "55.000", grupos: "7", keyword: "erasmus riga", descripcion: "Capital del Báltico con una arquitectura Art Nouveau única. Riga es asequible y tiene una vida estudiantil muy activa." },
  { slug: "vilnius", nombre: "Vilnius", pais: "Lituania", flag: "🇱🇹", estudiantes: "60.000", grupos: "7", keyword: "erasmus vilnius", descripcion: "Ciudad barroca del norte de Europa. Vilnius sorprende por su belleza y sus precios muy asequibles." },

  // SUIZA
  { slug: "zurich", nombre: "Zúrich", pais: "Suiza", flag: "🇨🇭", estudiantes: "115.000", grupos: "12", keyword: "erasmus zurich", descripcion: "Ciudad financiera y académica de primer nivel. Zúrich alberga el ETH, una de las mejores universidades técnicas del mundo." },
  { slug: "ginebra", nombre: "Ginebra", pais: "Suiza", flag: "🇨🇭", estudiantes: "80.000", grupos: "10", keyword: "erasmus ginebra", descripcion: "Ciudad internacional sede de la ONU y la OMS. Perfecta para estudiantes de relaciones internacionales y derecho." },
];

export function getCiudadBySlug(slug) {
  return ciudades.find(c => c.slug === slug);
}