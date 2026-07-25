import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/site";

export function CartWidget() {
  const { items, count, inc, dec, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  if (count === 0 && !open) return null;

  const message = () => {
    const lines = items.map((i) => `• ${i.name} (x${i.qty}) — ${i.price}`).join("\n");
    return `¡Hola Maskotas! 🐾 Quiero consultar estos productos del Pet Shop:\n\n${lines}\n\n¿Me confirman disponibilidad y el valor total?`;
  };

  return (
    <>
      {/* Botón flotante (abajo a la izquierda para no chocar con WhatsApp) */}
      {count > 0 && !open && (
        <button
          onClick={() => setOpen(true)}
          className="btn-gold fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold shadow-xl"
          aria-label="Ver carrito"
        >
          <ShoppingCart className="h-5 w-5" />
          Mi carrito
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">
            {count}
          </span>
        </button>
      )}

      {/* Ventana del carrito */}
      {open && (
        <div className="fixed inset-0 z-[75]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-brand-dark">
                <ShoppingCart className="h-5 w-5 text-brand" />
                Mi carrito
                {count > 0 && <span className="text-sm text-muted-foreground">({count})</span>}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-brand"
                aria-label="Cerrar"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-muted-foreground">
                  Tu carrito está vacío. Agrega productos desde el Pet Shop.
                </p>
              ) : (
                <div className="space-y-3">
                  {items.map((i) => (
                    <div key={i.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-brand-dark">{i.name}</div>
                        <div className="text-xs text-muted-foreground">{i.price}</div>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button onClick={() => dec(i.id)} className="grid h-7 w-7 place-items-center text-foreground/70 hover:text-brand" aria-label="Quitar uno">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{i.qty}</span>
                        <button onClick={() => inc(i.id)} className="grid h-7 w-7 place-items-center text-foreground/70 hover:text-brand" aria-label="Agregar uno">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => remove(i.id)} className="grid h-8 w-8 place-items-center rounded-lg text-foreground/50 hover:bg-destructive/10 hover:text-destructive" aria-label="Eliminar">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="space-y-3 border-t border-border p-5">
                <p className="text-center text-xs text-muted-foreground">
                  Los precios son de referencia. Confirma disponibilidad y el valor total por WhatsApp.
                </p>
                <a
                  href={waLink(message())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
                <button
                  onClick={clear}
                  className="w-full text-center text-xs font-medium text-muted-foreground hover:text-destructive"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
