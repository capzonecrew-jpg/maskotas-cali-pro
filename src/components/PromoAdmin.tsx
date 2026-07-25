import { useState } from "react";
import {
  Tag,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Loader2,
  ImagePlus,
} from "lucide-react";
import { supabase, type Promotion } from "@/lib/supabase";
import { useEdit } from "@/lib/editing";
import { usePromos } from "@/lib/promos";
import { PROMO_TARGETS, targetLabel } from "@/lib/catalog";

type FormState = {
  id?: string;
  title: string;
  description: string;
  badge: string;
  image_url: string;
  active: boolean;
  sort_order: number;
  target_id: string;
};

const EMPTY: FormState = {
  title: "",
  description: "",
  badge: "",
  image_url: "",
  active: true,
  sort_order: 0,
  target_id: "",
};

// Agrupa los destinos por categoría para el <select>.
const GROUPED = PROMO_TARGETS.reduce<Record<string, typeof PROMO_TARGETS>>((acc, t) => {
  (acc[t.group] ??= []).push(t);
  return acc;
}, {});

export function PromoAdmin() {
  const { editing, uploadImage } = useEdit();
  const { promos, reload } = usePromos();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!editing) return null;

  const onUpload = async (file: File) => {
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) setForm((f) => (f ? { ...f, image_url: url } : f));
  };

  const save = async () => {
    if (!form || !form.title.trim()) {
      alert("La promoción necesita un título.");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      badge: form.badge.trim() || null,
      image_url: form.image_url || null,
      active: form.active,
      sort_order: Number(form.sort_order) || 0,
      target_id: form.target_id || null,
    };
    const { error } = form.id
      ? await supabase.from("promotions").update(payload).eq("id", form.id)
      : await supabase.from("promotions").insert(payload);
    setSaving(false);
    if (error) {
      alert("Error al guardar: " + error.message);
      return;
    }
    setForm(null);
    reload();
  };

  const remove = async (id: string) => {
    if (!confirm("¿Borrar esta promoción?")) return;
    await supabase.from("promotions").delete().eq("id", id);
    reload();
  };

  const toggleActive = async (p: Promotion) => {
    await supabase.from("promotions").update({ active: !p.active }).eq("id", p.id);
    reload();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
      >
        <Tag className="h-3.5 w-3.5" />
        Promociones
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4">
          <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="font-display text-xl font-bold text-brand-dark">
                Promociones y descuentos
              </h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-brand">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {!form && (
                <button
                  onClick={() => setForm({ ...EMPTY, sort_order: promos.length + 1 })}
                  className="btn-gold mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  <Plus className="h-4 w-4" />
                  Nueva promoción
                </button>
              )}

              {/* Formulario */}
              {form && (
                <div className="mb-5 rounded-xl border border-border p-4">
                  <div className="grid gap-3">
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Título de la promoción *"
                      className={inputCls}
                    />
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Descripción"
                      rows={2}
                      className={`${inputCls} resize-none`}
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        value={form.badge}
                        onChange={(e) => setForm({ ...form, badge: e.target.value })}
                        placeholder="Descuento (ej: 20% OFF)"
                        className={inputCls}
                      />
                      <input
                        type="number"
                        value={form.sort_order}
                        onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                        placeholder="Orden"
                        className={inputCls}
                      />
                    </div>

                    {/* Selector de destino */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-brand-dark">
                        ¿A qué aplica?
                      </label>
                      <select
                        value={form.target_id}
                        onChange={(e) => setForm({ ...form, target_id: e.target.value })}
                        className={inputCls}
                      >
                        <option value="">General (aparece en la página principal)</option>
                        {Object.entries(GROUPED).map(([group, items]) => (
                          <optgroup key={group} label={group}>
                            {items.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Si eliges un servicio o producto, aparecerá un sello dorado "Promoción" sobre él.
                      </p>
                    </div>

                    {/* Imagen */}
                    <div className="flex flex-wrap items-center gap-3">
                      {form.image_url ? (
                        <div className="relative">
                          <img src={form.image_url} alt="" className="h-16 w-24 rounded-lg border border-border object-cover" />
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, image_url: "" })}
                            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-destructive text-white"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="grid h-16 w-24 place-items-center rounded-lg border border-dashed border-border text-muted-foreground">
                          <Tag className="h-5 w-5" />
                        </div>
                      )}
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand hover:bg-secondary">
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                        {uploading ? "Subiendo..." : "Imagen (opcional)"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onUpload(file);
                          }}
                        />
                      </label>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-foreground/85">
                      <input
                        type="checkbox"
                        checked={form.active}
                        onChange={(e) => setForm({ ...form, active: e.target.checked })}
                        className="h-4 w-4 accent-[var(--brand)]"
                      />
                      Activa
                    </label>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setForm(null)}
                        className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={save}
                        disabled={saving || uploading}
                        className="btn-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-60"
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista */}
              {promos.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Aún no hay promociones. Crea la primera con "Nueva promoción".
                </p>
              ) : (
                <div className="space-y-2">
                  {promos.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate font-semibold text-brand-dark">{p.title}</span>
                          {p.badge && (
                            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-brand">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {p.target_id ? `Aplica a: ${targetLabel(p.target_id) ?? "—"}` : "General (página principal)"}
                          {" · "}
                          {p.active ? "Activa" : "Oculta"}
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button onClick={() => toggleActive(p)} className="grid h-8 w-8 place-items-center rounded-lg text-foreground/60 hover:bg-secondary hover:text-brand" title={p.active ? "Ocultar" : "Mostrar"}>
                          {p.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() =>
                            setForm({
                              id: p.id,
                              title: p.title,
                              description: p.description ?? "",
                              badge: p.badge ?? "",
                              image_url: p.image_url ?? "",
                              active: p.active,
                              sort_order: p.sort_order,
                              target_id: p.target_id ?? "",
                            })
                          }
                          className="grid h-8 w-8 place-items-center rounded-lg text-foreground/60 hover:bg-secondary hover:text-brand"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(p.id)} className="grid h-8 w-8 place-items-center rounded-lg text-foreground/60 hover:bg-destructive/10 hover:text-destructive" title="Borrar">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";
