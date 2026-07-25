import { PenLine } from "lucide-react";
import { useEdit } from "@/lib/editing";
import { PromoAdmin } from "@/components/PromoAdmin";

export function EditBar() {
  const { editing, exitEdit } = useEdit();
  if (!editing) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-brand-dark/95 px-5 py-2.5 text-sm text-white shadow-2xl backdrop-blur">
      <span className="inline-flex items-center gap-2 font-medium">
        <PenLine className="h-4 w-4 text-gold" />
        Modo edición
      </span>
      <span className="hidden text-xs text-white/60 md:inline">
        Toca el lápiz ✏️ en cualquier texto o foto.
      </span>
      <PromoAdmin />
      <button
        onClick={exitEdit}
        className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-brand-dark transition hover:brightness-105"
      >
        Salir
      </button>
    </div>
  );
}
