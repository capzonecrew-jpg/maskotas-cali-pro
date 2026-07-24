import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/pet-shop")({
  head: () => ({
    meta: [
      { title: "Pet Shop en Cali | Alimento y accesorios — Clínica Maskotas" },
      {
        name: "description",
        content:
          "Alimento premium, accesorios y productos para tu mascota con entrega a domicilio en Cali. Pide por WhatsApp en la Clínica Maskotas.",
      },
      { property: "og:title", content: "Pet Shop — Clínica Maskotas" },
      { property: "og:description", content: "Alimento y accesorios para mascotas en Cali." },
      { property: "og:url", content: "/pet-shop" },
    ],
    links: [{ rel: "canonical", href: "/pet-shop" }],
  }),
  component: () => <ComingSoon title="Pet Shop" />,
});
