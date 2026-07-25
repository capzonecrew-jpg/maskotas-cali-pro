import {
  Stethoscope,
  Syringe,
  Scissors,
  FlaskConical,
  Activity,
  HeartPulse,
  Bath,
  Truck,
  Bug,
  Bone,
  Hospital,
  ScanLine,
  Smile,
  ShoppingBag,
  Pill,
  Sparkles,
} from "lucide-react";
import imgVetDog from "@/assets/real-vet-dog.jpg";
import imgVetCat from "@/assets/real-vet-cat.jpg";
import imgVaccine from "@/assets/real-vaccine.jpg";
import imgPharmacy from "@/assets/real-pharmacy.jpg";
import imgDiagnostic from "@/assets/real-diagnostic.jpg";
import imgSurgery from "@/assets/real-surgery.jpg";
import imgLab from "@/assets/real-lab.jpg";
import imgGrooming from "@/assets/real-grooming.jpg";
import imgBath from "@/assets/real-bath.jpg";
import imgFood from "@/assets/real-food.jpg";
import imgPetshop from "@/assets/real-petshop.jpg";
import imgAccessories from "@/assets/real-accessories.jpg";
import imgBed from "@/assets/real-bed.jpg";
import imgCarrier from "@/assets/real-carrier.jpg";
import imgToys from "@/assets/real-toys.jpg";

export type Service = {
  icon: typeof Stethoscope;
  title: string;
  desc: string;
  price: string;
  image: string;
};
export type ServiceGroup = { label: string; services: Service[] };

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: "Medicina preventiva",
    services: [
      { icon: Stethoscope, title: "Consulta general", desc: "Valoración clínica completa, diagnóstico y plan de tratamiento con médico veterinario.", price: "desde $45.000", image: imgVetDog },
      { icon: Syringe, title: "Vacunación", desc: "Esquemas para cachorros, adultos, gatos y refuerzo antirrábico anual.", price: "desde $35.000", image: imgVaccine },
      { icon: Bug, title: "Desparasitación", desc: "Control interno y externo de parásitos según peso y edad de tu mascota.", price: "desde $25.000", image: imgPharmacy },
      { icon: ScanLine, title: "Implante de microchip", desc: "Identificación permanente y registro para la seguridad de tu mascota.", price: "desde $70.000", image: imgDiagnostic },
    ],
  },
  {
    label: "Cirugía y diagnóstico",
    services: [
      { icon: Scissors, title: "Esterilización", desc: "Ovariohisterectomía y orquiectomía con protocolo anestésico seguro.", price: "desde $180.000", image: imgSurgery },
      { icon: HeartPulse, title: "Cirugías especializadas", desc: "Quirófano equipado y cirujano dedicado a casos complejos y de tejidos blandos.", price: "cotización", image: imgVetCat },
      { icon: FlaskConical, title: "Laboratorio clínico", desc: "Hemograma, química sanguínea y perfiles con resultados en nuestro laboratorio propio.", price: "desde $60.000", image: imgLab },
      { icon: Activity, title: "Ecografía e imágenes", desc: "Diagnóstico por imagen con equipos de última generación.", price: "desde $90.000", image: imgDiagnostic },
      { icon: Smile, title: "Odontología y profilaxis", desc: "Limpieza dental con ultrasonido, extracciones y cuidado bucal.", price: "desde $150.000", image: imgVetDog },
      { icon: Hospital, title: "Hospitalización", desc: "Internación con monitoreo, fluidoterapia y cuidado permanente por día.", price: "desde $90.000 / día", image: imgVetCat },
    ],
  },
  {
    label: "Bienestar, spa y domicilios",
    services: [
      { icon: Bath, title: "Baño y peluquería", desc: "Baño medicado, corte a máquina o tijera y estética con productos hipoalergénicos.", price: "desde $35.000", image: imgGrooming },
      { icon: Bone, title: "Spa completo", desc: "Baño, corte, limpieza de oídos, corte de uñas y deslanado.", price: "desde $60.000", image: imgBath },
      { icon: HeartPulse, title: "Urgencias", desc: "Atención prioritaria en horario de atención cuando tu mascota más lo necesita.", price: "desde $70.000", image: imgVetCat },
      { icon: Truck, title: "Consulta a domicilio", desc: "Llevamos la atención veterinaria y el pet shop hasta tu hogar en Cali.", price: "desde $80.000", image: imgVetDog },
    ],
  },
];

export type Product = { name: string; detail: string; price: string; image: string };
export type ProductCategory = { icon: typeof Bone; label: string; products: Product[] };

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    icon: Bone,
    label: "Alimento",
    products: [
      { name: "Concentrado premium perro", detail: "Bulto x 15 kg · adulto / cachorro", price: "desde $95.000", image: imgFood },
      { name: "Concentrado premium gato", detail: "Bolsa x 3 kg · adulto / gatito", price: "desde $48.000", image: imgPetshop },
      { name: "Alimento medicado / dieta", detail: "Renal, gastrointestinal, urinario", price: "cotización", image: imgPharmacy },
      { name: "Snacks y premios", detail: "Galletas, huesos y premios de entrenamiento", price: "desde $12.000", image: imgFood },
    ],
  },
  {
    icon: ShoppingBag,
    label: "Accesorios",
    products: [
      { name: "Collares y correas", detail: "Varios tamaños, colores y materiales", price: "desde $20.000", image: imgAccessories },
      { name: "Camas y cobijas", detail: "Descanso cómodo para todo tamaño", price: "desde $45.000", image: imgBed },
      { name: "Juguetes", detail: "Mordedores, pelotas y juguetes de estímulo", price: "desde $15.000", image: imgToys },
      { name: "Guacales y transportadoras", detail: "Viajes seguros para tu mascota", price: "desde $80.000", image: imgCarrier },
    ],
  },
  {
    icon: Sparkles,
    label: "Higiene y estética",
    products: [
      { name: "Shampoo hipoalergénico", detail: "Piel sensible, medicado y anti-pulgas", price: "desde $22.000", image: imgBath },
      { name: "Cepillos y deslanadores", detail: "Cuidado del pelaje en casa", price: "desde $15.000", image: imgGrooming },
      { name: "Toallitas y pañales", detail: "Limpieza rápida y práctica", price: "desde $10.000", image: imgPetshop },
      { name: "Arena para gato", detail: "Aglutinante y control de olores", price: "desde $16.000", image: imgPetshop },
    ],
  },
  {
    icon: Pill,
    label: "Farmacia veterinaria",
    products: [
      { name: "Antiparasitarios", detail: "Internos y externos, pipetas y tabletas", price: "desde $18.000", image: imgPharmacy },
      { name: "Vitaminas y suplementos", detail: "Piel, articulaciones y sistema inmune", price: "desde $25.000", image: imgPharmacy },
      { name: "Medicamentos con fórmula", detail: "Entrega bajo prescripción veterinaria", price: "cotización", image: imgPharmacy },
      { name: "Antipulgas y garrapatas", detail: "Collares, pipetas y sprays", price: "desde $28.000", image: imgVaccine },
    ],
  },
];

// Identificadores estables usados para editar y para dirigir promociones.
export const serviceId = (gi: number, si: number) => `svc-g${gi}-s${si}`;
export const productId = (ci: number, pi: number) => `ps-${ci}-p${pi}`;

export type PromoTarget = { id: string; label: string; group: string };

export const PROMO_TARGETS: PromoTarget[] = [
  ...SERVICE_GROUPS.flatMap((g, gi) =>
    g.services.map((s, si) => ({ id: serviceId(gi, si), label: s.title, group: `Servicios · ${g.label}` })),
  ),
  ...PRODUCT_CATEGORIES.flatMap((c, ci) =>
    c.products.map((p, pi) => ({ id: productId(ci, pi), label: p.name, group: `Pet Shop · ${c.label}` })),
  ),
];

export const targetLabel = (id: string | null | undefined) =>
  PROMO_TARGETS.find((t) => t.id === id)?.label ?? null;
