import { CTA_PADRAO, whatsappUrl } from "@/lib/site";
import { Icone } from "./ui";

/* Botão flutuante — o caminho mais curto entre o visitante e a matrícula. */

export function BotaoWhatsapp() {
  return (
    <a
      href={whatsappUrl(CTA_PADRAO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Mil Idiomas no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <Icone nome="whatsapp" className="size-7" />
    </a>
  );
}
