import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { id: string; name: string; price: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  add: (item: { id: string; name: string; price: string }) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return c;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar carrito guardado (solo en el navegador).
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mk_cart");
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  // Guardar cada cambio.
  useEffect(() => {
    try {
      localStorage.setItem("mk_cart", JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = (p: { id: string; name: string; price: string }) =>
    setItems((cur) => {
      const found = cur.find((i) => i.id === p.id);
      if (found) return cur.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...cur, { ...p, qty: 1 }];
    });

  const inc = (id: string) =>
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const dec = (id: string) =>
    setItems((cur) =>
      cur.flatMap((i) =>
        i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i],
      ),
    );

  const remove = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <Ctx.Provider value={{ items, count, add, inc, dec, remove, clear }}>
      {children}
    </Ctx.Provider>
  );
}
