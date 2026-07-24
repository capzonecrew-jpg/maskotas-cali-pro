import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_-10px_rgba(37,211,102,0.6)] md:bottom-8 md:right-8"
    >
      <span className="relative flex">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}