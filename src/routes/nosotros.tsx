import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | Clínica Veterinaria Maskotas — Cali" },
      {
        name: "description",
        content:
          "Conoce al equipo médico de la Clínica Veterinaria Maskotas: Dr. Walter Gutiérrez y Dr. Tomás Pantoja. Nuestra historia y valores.",
      },
      { property: "og:title", content: "Nosotros — Clínica Maskotas Cali" },
      { property: "og:description", content: "Equipo médico veterinario en Cali." },
      { property: "og:url", content: "/nosotros" },
    ],
    links: [{ rel: "canonical", href: "/nosotros" }],
  }),
  component: () => <ComingSoon title="Nosotros" />,
});
