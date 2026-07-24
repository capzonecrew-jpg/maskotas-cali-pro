export const SITE = {
  name: "Clínica Veterinaria Especializada Maskotas",
  shortName: "Maskotas",
  tagline: "Veterinaria · Pet Shop · Spa",
  address: "Calle 13b #70-73, Barrio Quintas de Don Simón",
  city: "Santiago de Cali",
  region: "Valle del Cauca",
  country: "Colombia",
  postalCode: "760001",
  latitude: 3.3765,
  longitude: -76.5407,
  hours: "Lunes a Sábado, 8:00 a.m. – 5:30 p.m.",
  hoursSchema: "Mo-Sa 08:00-17:30",
  phonesCitas: ["3137893303", "3137893355"],
  phonesDomicilios: ["6023302209", "3117005975"],
  whatsapp: "573137893355",
  whatsappDisplay: "313 789 3355",
  instagram: "clinicaespecializadamaskotas",
  instagramUrl: "https://instagram.com/clinicaespecializadamaskotas",
  email: "contacto@veterinariamaskotas.com",
};

export const waLink = (msg = "Hola, quiero agendar una cita para mi mascota") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

export const telLink = (phone: string) => `tel:+57${phone}`;

export const formatPhone = (p: string) =>
  p.length === 10 ? `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6)}` : p;