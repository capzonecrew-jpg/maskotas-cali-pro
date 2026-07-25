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
  demoUrl: "https://maskotas-cali-pro.lovable.app",

  intro:
    "Su clínica, abierta las 24 horas en internet. Convierta a sus seguidores de Instagram en clientes que agendan directo por WhatsApp — con una imagen profesional a la altura de su atención veterinaria.",

  // ---- Nota al pie de los precios ------------------------------------------
  priceNote:
    "Precios en pesos colombianos (COP). El valor de instalación puede dividirse en 2 cuotas. La mensualidad incluye alojamiento, copias de seguridad, soporte y el posicionamiento SEO + GEO. No incluye presupuesto de publicidad (pauta), que se paga aparte directamente a la plataforma.",

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

  // ---- Planes (EDITA precios y características) -----------------------------
  plans: [
    {
      id: "autogestionable",
      name: "Web Autogestionable",
      tagline: "Su web completa, que usted mismo administra sin depender de nadie.",
      setup: 980000,
      monthly: 145000,
      recommended: true,
      features: [
        "Sitio completo: inicio, servicios, nosotros, pet shop, blog y contacto",
        "Agenda de citas y pedidos directos por WhatsApp (1 clic)",
        "Diseño elegante, perfecto en celular",
        "Mapa, horarios y enlace a Instagram",
        "Registro en Google Maps (Google Business)",
        "Dominio propio (sunombre.com) + correo profesional",
        "Panel privado: edite precios, fotos, textos y promociones usted mismo",
        "Cambios visibles para todos al instante",
        "Promociones y descuentos con sello destacado en cada servicio",
        "Medición de visitas con Google Analytics",
        "SEO + GEO (Google e IA) TODOS LOS MESES mientras el plan esté activo",
        "Reporte mensual del avance de posicionamiento",
        "Capacitación + manual en video",
      ],
    },
    {
      id: "completa",
      name: "Web Completa",
      tagline: "Una clínica digital: agenda con base de datos y tienda que cobra sola.",
      setup: 1800000,
      monthly: 225000,
      recommended: false,
      features: [
        "Todo lo del plan Autogestionable",
        "Sistema de agenda de citas con base de datos (recordatorios)",
        "Tienda del pet shop con carrito y pago en línea (tarjeta y PSE)",
        "Ficha/historial básico de clientes y mascotas",
        "Configuración de envíos de pet shop",
        "SEO + GEO avanzado y prioritario TODOS LOS MESES mientras el plan esté activo",
        "Reportes mensuales de visitas, citas y posicionamiento",
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
