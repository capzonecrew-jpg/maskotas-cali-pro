import { Sparkles } from "lucide-react";
import type { Promotion } from "@/lib/supabase";

/** Cinta dorada que se muestra sobre la imagen de un servicio/producto en promoción. */
export function PromoRibbon({ promo }: { promo: Promotion }) {
  return (
    <div className="absolute left-0 top-3 z-20 flex items-center gap-1.5 rounded-r-full bg-gold px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark shadow-lg">
      <Sparkles className="h-4 w-4" />
      Promoción
      {promo.badge && <span className="rounded-full bg-brand-dark/90 px-2 py-0.5 text-xs text-gold">{promo.badge}</span>}
    </div>
  );
}

/** Detalle de la promoción (título/descripción) para mostrar dentro de la tarjeta. */
export function PromoNote({ promo }: { promo: Promotion }) {
  return (
    <div className="mt-3 rounded-xl border border-gold/40 bg-gold/10 p-3">
      <div className="text-sm font-bold text-brand-dark">🎉 {promo.title}</div>
      {promo.description && (
        <div className="mt-0.5 text-xs text-muted-foreground">{promo.description}</div>
      )}
    </div>
  );
}
