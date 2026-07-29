/* ============================================================================
 *  PROPUESTA COMERCIAL — Clínica Veterinaria Maskotas
 * ----------------------------------------------------------------------------
 *  Esta es la página que le muestras al cliente (los dueños de la clínica).
 *  Se ve en:  /propuesta   ·   Exporta a PDF con el botón "Descargar PDF".
 *  EDITA AQUÍ los precios, planes, textos y tu contacto. Nada más que tocar.
 * ========================================================================== */

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  setup: number; // instalación única (COP)
  monthly: number; // mensualidad (COP)
  recommended?: boolean;
  features: string[];
};

export const PROPOSAL = {
  // ---- Encabezado ----------------------------------------------------------
  preparedFor: "Clínica Veterinaria Especializada Maskotas",
  date: "Julio de 2026",
  // Link al demo en vivo (para el botón "Ver el demo")
  demoUrl: "https://maskotas-cali-pro.vercel.app",

  intro:
    "Su clínica, abierta las 24 horas en internet. Convierta a sus seguidores de Instagram en clientes que agendan directo por WhatsApp — con una imagen profesional a la altura de su atención veterinaria.",

  // ---- Nota al pie de los precios ------------------------------------------
  priceNote:
    "Precios en pesos colombianos (COP). En los planes Esencial y Profesional, el dominio y el hosting se pagan aparte (directamente a la plataforma, un costo bajo anual); en el plan Completa van incluidos. La mensualidad incluye soporte, copias de seguridad y el posicionamiento SEO + GEO. No incluye presupuesto de publicidad (pauta).",

  // ---- Argumentos de venta (por qué tener la web) --------------------------
  why: [
    {
      title: "Aparezca en Google",
      text: "Cuando alguien busca 'veterinaria en Cali' o 'urgencias veterinarias', que lo encuentren a usted y no a la competencia.",
    },
    {
      title: "Agenda por WhatsApp",
      text: "Sus clientes ven los servicios y agendan cita a cualquier hora con un clic, no solo en horario de la clínica.",
    },
    {
      title: "Imagen profesional",
      text: "Una página propia transmite confianza y seriedad — clave para una clínica especializada.",
    },
    {
      title: "Usted la maneja solo",
      text: "Cambie precios, fotos, textos y promociones desde un panel privado, sin depender de nadie.",
    },
  ],

  // ---- Sección SEO + GEO ---------------------------------------------------
  seoGeo: {
    eyebrow: "Lo nuevo e indispensable",
    title: "Que lo encuentren en Google y en la Inteligencia Artificial",
    intro:
      "Hoy sus clientes ya no solo buscan en Google: también le preguntan a asistentes de IA como ChatGPT, Gemini o Perplexity “¿dónde hay una buena veterinaria en Cali?”. Si su clínica no está optimizada, simplemente no aparece. Por eso trabajamos dos frentes:",
    items: [
      {
        tag: "SEO",
        title: "Posicionamiento en buscadores",
        text: "Optimizamos su web para aparecer en Google cuando busquen veterinaria, urgencias, cirugías o peluquería canina en Cali.",
      },
      {
        tag: "GEO",
        title: "Posicionamiento en Inteligencia Artificial",
        text: "Estructuramos su información para que los asistentes de IA recomienden su clínica al responderle a sus clientes. Es el nuevo “salir de primero”, y muy pocos lo están haciendo.",
      },
    ],
    closing:
      "Desde el plan Autogestionable, el posicionamiento SEO + GEO va INCLUIDO en la mensualidad TODOS LOS MESES, mientras el plan esté activo. No es un pago extra ni un servicio de una sola vez: cada mes seguimos mejorando su presencia en Google y en las IA, y le mostramos el avance en un reporte claro.",
  },

  // ---- Explicación de la mensualidad (cuadro aparte) -----------------------
  monthlyInfo: {
    title: "¿Para qué sirve la mensualidad?",
    intro:
      "La instalación es un pago único para crear tu web. La mensualidad es lo que mantiene tu sitio vivo, seguro y subiendo en Google mes a mes. Sin ella, la web quedaría estática y perdería posicionamiento.",
    items: [
      {
        title: "Siempre en línea y seguro",
        text: "Copias de seguridad, actualizaciones y monitoreo para que tu web nunca se caiga ni se ponga lenta.",
      },
      {
        title: "Soporte y cambios",
        text: "Te acompaño ante cualquier duda o ajuste; si algo falla, lo arreglo.",
      },
      {
        title: "SEO + GEO cada mes",
        text: "Trabajo continuo para seguir apareciendo en Google y en los asistentes de IA. No es de una sola vez: es constante.",
      },
      {
        title: "Reporte de avance",
        text: "Cada mes te muestro cómo va tu posicionamiento y las visitas de tu web.",
      },
    ],
  },

  // ---- Planes (EDITA precios y características) -----------------------------
  //  De más económico (Esencial) a más completo (Completa).
  plans: [
    {
      id: "esencial",
      name: "Esencial",
      tagline: "Presencia profesional para que te encuentren y te escriban.",
      setup: 800000,
      monthly: 90000,
      recommended: false,
      features: [
        "Página profesional con inicio, servicios, nosotros y contacto",
        "Panel privado para editar textos, precios y fotos tú mismo",
        "Promociones y descuentos con sello destacado",
        "Botón de WhatsApp con mensaje listo",
        "Diseño elegante, perfecto en celular",
        "Mapa, horarios y enlace a Instagram",
        "Registro en Google Maps (Google Business)",
        "SEO básico para aparecer en Google",
      ],
    },
    {
      id: "profesional",
      name: "Profesional",
      tagline: "Tu web completa, que tú mismo administras. La más pedida.",
      setup: 1200000,
      monthly: 160000,
      recommended: true,
      features: [
        "Todo lo del plan Esencial",
        "Sitio completo (varias páginas): inicio, servicios, nosotros y contacto + Pet Shop y Blog",
        "Carrito del pet shop con pedido por WhatsApp",
        "SEO + GEO (Google e IA) todos los meses (más que el SEO básico)",
        "Reporte mensual de posicionamiento",
        "Medición de visitas (Google Analytics)",
      ],
    },
    {
      id: "completa",
      name: "Completa",
      tagline: "Una clínica digital: agenda con base de datos y tienda que cobra sola.",
      setup: 1800000,
      monthly: 200000,
      recommended: false,
      features: [
        "Todo lo del plan Profesional",
        "Dominio, correo profesional y hosting incluidos",
        "Agenda de citas con base de datos y recordatorios",
        "Tienda del pet shop con pago en línea (tarjeta y PSE)",
        "Configuración de envíos",
        "Reportes avanzados de visitas, citas y ventas",
      ],
    },
  ] as Plan[],

  // ---- Condiciones ---------------------------------------------------------
  terms: {
    title: "Condiciones del servicio",
    items: [
      "El catálogo incluye hasta 100 servicios/productos.",
      "El cliente entrega la información de cada servicio o producto —foto, nombre, características y precio— en un documento, hoja de cálculo (Excel / Google Sheets) o base de datos.",
      "No realizo tomas fotográficas: el cliente envía sus propias fotos. Si lo necesita, puedo mejorarlas o modificarlas con Inteligencia Artificial (fondo, iluminación, retoque).",
    ],
  },

  // ---- Contacto de quien presenta la propuesta (TÚ) ------------------------
  contact: {
    name: "Samuel Barajas",
    phone: "+57 350 399 6448",
    email: "",
  },
};

export default PROPOSAL;
