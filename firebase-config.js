// =====================================================================
//  CONFIGURACIÓN — lo único que tienes que editar
//  Lo que va entre [CORCHETES] son datos que faltan por llenar.
// =====================================================================

// 1) Configuración del proyecto de Firebase (no la cambies)
export const firebaseConfig = {
  apiKey: "AIzaSyBfw-OwcXgDi1ynVo5UO_Ua1_eDO_NTgX4",
  authDomain: "sb-barber-studio.firebaseapp.com",
  projectId: "sb-barber-studio",
  storageBucket: "sb-barber-studio.firebasestorage.app",
  messagingSenderId: "550998337634",
  appId: "1:550998337634:web:7099f3ba40171a5793493b",
  measurementId: "G-4EMQ2NHK9Z"
};

// 2) Datos del negocio
export const NEGOCIO = {
  // ---- Identidad: se pinta solo en todas las páginas ----
  nombre: "SB Barber Studio",          // nombre de marca (títulos, mensajes de WhatsApp, tarjeta)
  nombreGoogle: "SB Barber Studio",    // tal cual aparece en Google Maps (pie de página y búsqueda en Maps)
  lema: "Tu estilo, bien cuidado. Cortes y barba en un ambiente cómodo, en la colonia Periodistas, Pachuca.",
  descripcion: "studio de barbería",  // frase corta para Google: "SB Barber Studio, studio de barbería en Periodistas…"

  direccion: {
    calle: "C. Gral. Vicente Segura 500, local B",
    zona: "Periodistas",         // colonia o fraccionamiento
    cp: "42060",
    ciudad: "Pachuca",               // como lo dice la gente
    ciudadOficial: "Pachuca de Soto",
    estado: "Hgo."
  },

  // Google: Place ID (sácalo con el buscador de Place ID) y la calificación que muestra Google.
  // Actualiza estrellas y reseñas cada mes o dos.
  google: { placeId: "", estrellas: 5.0, resenas: 4 },

  whatsapp: "527716072883",          // con 52 al inicio, sin espacios
  redes: {                           // link completo; las que dejes vacías no aparecen
    facebook: "",
    instagram: "https://www.instagram.com/sb_barber_studi0/",
    tiktok: ""
  },

  // Colores de la marca (los demás tonos de la página son negros/grises y se quedan)
  colores: { principal: "#D4AF37", claro: "#F0CF65", suave: "#A8862A" },

  // Aviso de privacidad: quién es el responsable de los datos
  legal: { responsable: "[NOMBRE DEL TITULAR O RAZÓN SOCIAL]", correo: "[CORREO DE CONTACTO]" },

  // ---- Tarjeta de sellos (el panel puede cambiar estos textos en Promos → Premios) ----
  sellosPorTarjeta: 10,
  premioMitad: { en: 5,  texto: "Facial gratis" },
  premioFinal: { en: 10, texto: "50% de descuento en corte" },
  promoCumple: "[PROMO DE CUMPLEAÑOS, ej. corte a mitad de precio]",

  // Promos de ejemplo: solo se ven mientras no haya promos en el panel
  promociones: [
    { titulo: "Estrena tu tarjeta de sellos", detalle: "Junta sellos en cada visita y gana premios." }
  ],

  // ---- Precios: sinCita = llegando sin apartar · conCita = agendando ----
  servicios: [
    { id: "corte",        nombre: "Corte de cabello", sinCita: 150, conCita: 200 },
    { id: "corte-greca",  nombre: "Corte y greca",    sinCita: 200, conCita: 200 },
    { id: "corte-ceja",   nombre: "Corte y ceja",     sinCita: 180, conCita: 200 },
    { id: "cejas",        nombre: "Cejas",            sinCita: 50,  conCita: 50  },
    { id: "pigmento",     nombre: "Pigmento",         sinCita: 50,  conCita: 50  },
    { id: "corte-barba",  nombre: "Corte y barba",    sinCita: 250, conCita: 250 },
    { id: "corte-facial", nombre: "Corte y facial",   sinCita: 250, conCita: 250 },
    { id: "corte-vip",    nombre: "Corte VIP",        sinCita: 400, conCita: 500 }
  ],

  // ---- Lo que incluye cada tipo de visita ----
  beneficios: {
    sinCita: ["Tarjeta de sellos", "Agua", "WiFi gratis"],
    conCita: ["Lavado de cabello", "Mascarilla facial", "Masaje", "Café, té o cerveza de cortesía"]
  },

  // ---- Horario (0 = domingo, 1 = lunes … 6 = sábado) ----
  horario: { dias: [0, 1, 2, 3, 4, 5, 6], abre: "10:00", cierra: "22:00", porDia: { 0: { abre: "10:00", cierra: "18:00" } } },   // porDia: horas distintas en un día (domingo cierra 6 pm)
  citas: { cadaMinutos: 60, primera: "10:00", ultima: "21:00", diasAdelante: 30 },   // las horas salen del horario: cada hora desde que abre

  // ---- Datos para transferencias (aparecen en la página con botón de copiar) ----
  pago: {
    banco: "[BANCO]",
    titular: "[NOMBRE DEL TITULAR]",
    tarjeta: "[NÚMERO DE TARJETA]",   // ej. "4152 3138 0000 0000"
    clabe: ""                          // opcional: 18 dígitos. Si lo dejas vacío no aparece
  },

  // ---- Quién te corta el pelo ----
  // foto: sube la imagen al repo (ej. "barbero1.jpg") y pon aquí su nombre. Vacío = sin foto.
  // Redes: pega el link completo. Las que dejes vacías no aparecen.
  barberos: [
    {
      nombre: "[NOMBRE DEL BARBERO]",
      rol: "Barbero",
      descripcion: "[Descripción: años de experiencia, especialidad (fades, diseños, barba) y algo personal.]",
      foto: "",
      instagram: "",
      tiktok: "",
      facebook: ""
    }
  ]
};
