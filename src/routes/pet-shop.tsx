import { createFileRoute } from "@tanstack/react-router";
import { Truck, Info, MessageCircle, PawPrint, Plus, Trash2 } from "lucide-react";
import { waLink } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { EditableText, EditableImage, useEdit, useEditableList } from "@/lib/editing";
import { PRODUCT_CATEGORIES, productId } from "@/lib/catalog";
import { usePromos } from "@/lib/promos";
import { PromoRibbon } from "@/components/PromoTag";
import heroBg from "@/assets/real-petshop.jpg";

export const Route = createFileRoute("/pet-shop")({
  head: () => ({
    meta: [
      { title: "Pet Shop en Cali | Alimento y accesorios — Clínica Maskotas" },
      {
        name: "description",
        content:
          "Alimento premium, accesorios, higiene, juguetes y farmacia veterinaria con entrega a domicilio en Cali. Pide por WhatsApp en la Clínica Maskotas.",
      },
      { property: "og:title", content: "Pet Shop — Clínica Maskotas" },
      { property: "og:description", content: "Alimento y accesorios para mascotas en Cali con domicilio." },
      { property: "og:url", content: "/pet-shop" },
    ],
    links: [{ rel: "canonical", href: "/pet-shop" }],
  }),
  component: PetShop,
});

type AddedProd = { id: string; ci: number };

function PetShop() {
  const { getPromoFor } = usePromos();
  const { editing } = useEdit();
  const { items: added, setItems: setAdded } = useEditableList<AddedProd>("ps-added");
  const { items: deleted, setItems: setDeleted } = useEditableList<string>("ps-deleted");

  const addProduct = (ci: number) =>
    setAdded([...added, { id: `ps-x-${Date.now()}`, ci }]);
  const deleteProduct = (id: string, isAdded: boolean) => {
    if (!confirm("¿Eliminar este producto?")) return;
    if (isAdded) setAdded(added.filter((a) => a.id !== id));
    else setDeleted([...deleted, id]);
  };

  return (
    <>
      <PageHero
        kicker="Pet Shop"
        bgImage={heroBg}
        bgAlt="Productos y accesorios para mascotas en el pet shop"
        title={
          <>
            Todo para consentir a{" "}
            <span className="text-gradient-gold">tu mascota</span>
          </>
        }
        subtitle="Alimento premium, accesorios, higiene y farmacia veterinaria. Pide por WhatsApp y te lo llevamos a casa en Cali."
      />

      {/* Domicilio banner */}
      <section className="mx-auto max-w-7xl px-4 pt-12 md:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <div className="font-semibold text-brand-dark">Domicilios en Cali</div>
                <div className="text-sm text-muted-foreground">
                  Recibe tu pedido en casa. Consulta cobertura y tiempos por WhatsApp.
                </div>
              </div>
            </div>
            <a
              href={waLink("Hola, quiero hacer un pedido del pet shop con domicilio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" />
              Pedir con domicilio
            </a>
          </div>
        </Reveal>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        {PRODUCT_CATEGORIES.map(({ icon: Icon, label, products }, ci) => (
          <div key={label} className={ci > 0 ? "mt-14" : ""}>
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <EditableText
                  as="h2"
                  id={`ps-cat-${ci}-label`}
                  className="font-display text-2xl font-bold text-brand-dark sm:text-3xl"
                >
                  {label}
                </EditableText>
                <span className="ml-2 h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ...products.map((p, i) => ({ ...p, id: productId(ci, i), isAdded: false })),
                ...added
                  .filter((a) => a.ci === ci)
                  .map((a) => ({
                    id: a.id,
                    isAdded: true,
                    name: "Nuevo producto",
                    detail: "Describe este producto.",
                    price: "desde $0",
                    image: "",
                  })),
              ]
                .filter((it) => !deleted.includes(it.id))
                .map((p, i) => {
                  const id = p.id;
                  const promo = getPromoFor(id);
                  return (
                    <Reveal key={id} delay={(i % 4) * 80}>
                      <div
                        className={`card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white ${
                          promo ? "border-gold ring-2 ring-gold/60" : "border-border"
                        }`}
                      >
                        {editing && (
                          <button
                            onClick={() => deleteProduct(id, p.isAdded)}
                            title="Eliminar producto"
                            className="absolute right-2 top-2 z-30 grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-foreground/70 shadow hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                        <figure className="img-hover-zoom relative aspect-square">
                          {promo && <PromoRibbon promo={promo} />}
                          <EditableImage
                            id={`${id}-img`}
                            defaultSrc={p.image || undefined}
                            alt={p.name}
                            className="h-full w-full object-cover"
                            placeholder={
                              <div className="grid h-full w-full place-items-center bg-secondary text-brand/40">
                                <PawPrint className="h-10 w-10" />
                              </div>
                            }
                          />
                        </figure>
                        <div className="flex flex-1 flex-col p-5">
                          <EditableText
                            as="h3"
                            id={`${id}-name`}
                            className="text-base font-semibold text-brand-dark"
                          >
                            {p.name}
                          </EditableText>
                          <EditableText
                            as="p"
                            id={`${id}-detail`}
                            multiline
                            className="mt-1 flex-1 text-sm text-muted-foreground"
                          >
                            {p.detail}
                          </EditableText>
                          <div className="mt-4 flex items-center justify-between gap-2">
                            <EditableText id={`${id}-price`} className="text-sm font-bold text-brand">
                              {p.price}
                            </EditableText>
                            <a
                              href={waLink(`Hola, quiero pedir: ${p.name}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-gold hover:text-brand-dark"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              Pedir
                            </a>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              {editing && (
                <button
                  onClick={() => addProduct(ci)}
                  className="flex min-h-[220px] items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/30 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/5"
                >
                  <Plus className="h-5 w-5" /> Agregar producto
                </button>
              )}
            </div>
          </div>
        ))}

        <Reveal>
          <div className="mt-14 flex items-start gap-3 rounded-2xl border border-border bg-secondary/60 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-brand-dark">Catálogo de referencia.</span> Las
              imágenes son ilustrativas y los productos, marcas y precios pueden variar según
              disponibilidad. Escríbenos por WhatsApp y te confirmamos existencias y el valor exacto.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden gradient-brand py-16 md:py-24">
        <div className="hero-aurora" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              ¿Buscas algo en especial?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Escríbenos qué necesitas y te ayudamos a encontrar el producto ideal para tu mascota.
            </p>
            <a
              href={waLink("Hola, estoy buscando un producto para mi mascota.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold animate-gold-pulse mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              Pedir por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
