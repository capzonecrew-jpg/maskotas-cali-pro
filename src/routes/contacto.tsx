import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Clínica Veterinaria Maskotas — Cali" },
      {
        name: "description",
        content:
          "Contáctanos: WhatsApp 313 789 3355, citas 313 789 3303, domicilios 602 330 2209. Calle 13b #70-73, Quintas de Don Simón, Cali.",
      },
      { property: "og:title", content: "Contacto — Clínica Maskotas Cali" },
      { property: "og:description", content: "Teléfonos, WhatsApp y dirección en Cali." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: () => <ComingSoon title="Contacto" />,
});
