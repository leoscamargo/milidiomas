"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Widget do hCaptcha, montado à mão para não carregar mais uma dependência.

   Enquanto NEXT_PUBLIC_HCAPTCHA_SITE_KEY não estiver configurada, o widget não
   aparece e o campo fica vazio — o servidor aceita o envio nesse caso, para dar
   pra testar o site antes de criar a conta. Configure antes de publicar.
   --------------------------------------------------------------------------- */

declare global {
  interface Window {
    hcaptcha?: {
      render: (
        elemento: HTMLElement,
        opcoes: {
          sitekey: string;
          theme?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (id?: string) => void;
    };
    onCarregarHCaptcha?: () => void;
  }
}

const URL_SCRIPT =
  "https://js.hcaptcha.com/1/api.js?render=explicit&onload=onCarregarHCaptcha";

export function HCaptcha({ aoResolver }: { aoResolver?: () => void }) {
  const chave = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const idWidget = useRef<string | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    if (!chave) return;

    const montar = () => {
      if (!container.current || idWidget.current !== null) return;
      if (!window.hcaptcha) return;

      idWidget.current = window.hcaptcha.render(container.current, {
        sitekey: chave,
        callback: () => aoResolver?.(),
      });
      setPronto(true);
    };

    if (window.hcaptcha) {
      montar();
      return;
    }

    window.onCarregarHCaptcha = montar;

    // Um script só, mesmo com dois formulários na mesma página.
    if (!document.querySelector(`script[src^="https://js.hcaptcha.com"]`)) {
      const script = document.createElement("script");
      script.src = URL_SCRIPT;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [chave, aoResolver]);

  if (!chave) {
    return (
      <div className="rounded-[10px] border border-dashed border-marinho/25 bg-marinho-50 px-4 py-3 text-sm text-marinho-400">
        Verificação de segurança será ativada quando a chave do hCaptcha for
        configurada.
      </div>
    );
  }

  return (
    <div>
      <div ref={container} />
      {!pronto ? (
        <div className="h-[78px] animate-pulse rounded-[10px] bg-marinho-50" />
      ) : null}
    </div>
  );
}

/** Zera o desafio depois de um envio, para o visitante poder tentar de novo. */
export function reiniciarCaptcha() {
  window.hcaptcha?.reset();
}
