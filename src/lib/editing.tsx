import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { Pencil, Check, X, Loader2, ImagePlus, PenLine } from "lucide-react";
import { supabase } from "@/lib/supabase";

type ContentMap = Record<string, unknown>;

type EditCtx = {
  session: Session | null;
  editing: boolean;
  enterEdit: () => void;
  exitEdit: () => void;
  get: (key: string) => unknown;
  save: (key: string, value: unknown) => Promise<void>;
  uploadImage: (file: File) => Promise<string | null>;
};

const Ctx = createContext<EditCtx | null>(null);

export function useEdit() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useEdit debe usarse dentro de <EditProvider>");
  return c;
}

export function EditProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [wantEdit, setWantEdit] = useState(false);
  const [content, setContent] = useState<ContentMap>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));

    supabase
      .from("content")
      .select("key,value")
      .then(({ data }) => {
        if (!data) return;
        const map: ContentMap = {};
        for (const row of data as { key: string; value: unknown }[]) {
          map[row.key] = row.value;
        }
        setContent(map);
      });

    if (typeof window !== "undefined" && sessionStorage.getItem("mk_edit") === "1") {
      setWantEdit(true);
    }
    return () => sub.subscription.unsubscribe();
  }, []);

  const enterEdit = () => {
    setWantEdit(true);
    if (typeof window !== "undefined") sessionStorage.setItem("mk_edit", "1");
  };
  const exitEdit = () => {
    setWantEdit(false);
    if (typeof window !== "undefined") sessionStorage.removeItem("mk_edit");
  };

  const get = (key: string) => content[key];

  const save = async (key: string, value: unknown) => {
    setContent((m) => ({ ...m, [key]: value }));
    await supabase
      .from("content")
      .upsert({ key, value, updated_at: new Date().toISOString() });
  };

  const uploadImage = async (file: File) => {
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `content/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });
    if (error) {
      alert("No se pudo subir la imagen: " + error.message);
      return null;
    }
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  };

  // Solo se edita de verdad si hay sesión iniciada.
  const editing = wantEdit && !!session;

  return (
    <Ctx.Provider
      value={{ session, editing, enterEdit, exitEdit, get, save, uploadImage }}
    >
      {children}
    </Ctx.Provider>
  );
}

/* ---------------- Texto editable ---------------- */
export function EditableText({
  id,
  as: Tag = "span",
  className,
  children,
  multiline = false,
}: {
  id: string;
  as?: React.ElementType;
  className?: string;
  children: string;
  multiline?: boolean;
}) {
  const { editing, get, save } = useEdit();
  const value = (get(id) as string) ?? children;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string>(value);
  const [saving, setSaving] = useState(false);

  if (!editing) {
    return <Tag className={className}>{value}</Tag>;
  }

  const start = () => {
    setDraft((get(id) as string) ?? children);
    setOpen(true);
  };
  const commit = async () => {
    setSaving(true);
    await save(id, draft);
    setSaving(false);
    setOpen(false);
  };

  return (
    <Tag className={`${className ?? ""} relative`} style={{ position: "relative" }}>
      {value}
      <button
        type="button"
        onClick={start}
        className="ml-1 inline-flex h-5 w-5 -translate-y-0.5 items-center justify-center rounded bg-brand/90 align-middle text-white shadow-sm transition hover:bg-brand"
        title="Editar texto"
      >
        <Pencil className="h-3 w-3" />
      </button>

      {open && (
        <span
          className="absolute left-0 top-full z-50 mt-1 flex w-72 flex-col gap-2 rounded-xl border border-border bg-white p-3 text-left text-sm text-foreground shadow-2xl"
          style={{ position: "absolute" }}
        >
          {multiline ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              autoFocus
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          ) : (
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
            >
              <X className="h-3.5 w-3.5" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={commit}
              disabled={saving}
              className="btn-gold inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              Guardar
            </button>
          </div>
        </span>
      )}
    </Tag>
  );
}

/* ---------------- Imagen editable ---------------- */
/* Debe ir dentro de un contenedor con `position: relative` (ej. <figure className="relative">). */
export function EditableImage({
  id,
  defaultSrc,
  alt,
  className,
  placeholder,
}: {
  id: string;
  defaultSrc?: string;
  alt: string;
  className?: string;
  placeholder?: ReactNode;
}) {
  const { editing, get, save, uploadImage } = useEdit();
  const src = (get(id) as string) ?? defaultSrc;
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File) => {
    setBusy(true);
    const url = await uploadImage(file);
    if (url) await save(id, url);
    setBusy(false);
  };

  return (
    <>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className={className} />
      ) : (
        placeholder ?? null
      )}
      {editing && (
        <label className="absolute bottom-2 left-2 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition hover:bg-brand-dark">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
          {busy ? "Subiendo..." : "Cambiar foto"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
            }}
          />
        </label>
      )}
    </>
  );
}

/* ---------------- Listas editables (agregar / eliminar tarjetas) ---------------- */
export function useEditableList<T = unknown>(key: string) {
  const { get, save } = useEdit();
  const items = ((get(key) as T[] | undefined) ?? []) as T[];
  const setItems = (next: T[]) => {
    void save(key, next);
  };
  return { items, setItems };
}

/* ---------------- Barra flotante de modo edición ---------------- */
export function EditToolbar() {
  const { editing, exitEdit } = useEdit();
  if (!editing) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-brand-dark/95 px-5 py-2.5 text-sm text-white shadow-2xl backdrop-blur">
      <span className="inline-flex items-center gap-2 font-medium">
        <PenLine className="h-4 w-4 text-gold" />
        Modo edición activo
      </span>
      <span className="hidden text-xs text-white/60 sm:inline">
        Toca el lápiz ✏️ en cualquier texto, precio o foto para editarlo.
      </span>
      <button
        onClick={exitEdit}
        className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-brand-dark transition hover:brightness-105"
      >
        Salir
      </button>
    </div>
  );
}
