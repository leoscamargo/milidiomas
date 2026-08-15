"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CTA_PADRAO, navegacao, whatsappUrl } from "@/lib/site";
import { Botao, Container, Icone } from "./ui";

export function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  // Trava o scroll do fundo enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  // Sem backdrop-blur de propósito: um filtro no header vira bloco de contenção
  // e quebra o `position: fixed` do painel do menu mobile.
  return (
    <header className="sticky top-0 z-50 border-b border-marinho/[0.12] bg-white">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6 sm:h-20">
          <Link href="/" className="shrink-0" aria-label="Mil Idiomas, página inicial">
            <Image
              src="/logo-mil-idiomas.png"
              alt="Mil Idiomas"
              width={1240}
              height={720}
              priority
              className="h-11 w-auto sm:h-[52px]"
            />
          </Link>

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navegacao.map((item) => {
                const ativo =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={ativo ? "page" : undefined}
                      className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-[0.875rem] font-medium transition-colors ${
                        ativo
                          ? "text-vermelho"
                          : "text-marinho hover:text-vermelho"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <Botao
              href={whatsappUrl(CTA_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-4 py-2.5 text-sm"
            >
              <Icone nome="whatsapp" className="size-[18px]" />
              Matricule-se
            </Botao>
          </div>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="flex size-11 items-center justify-center rounded-lg text-marinho xl:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="size-6"
              aria-hidden="true"
            >
              {aberto ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {aberto ? (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto border-t border-marinho/[0.12] bg-white xl:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {navegacao.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className="flex items-center justify-between border-b border-marinho/[0.08] py-4 text-lg font-medium text-marinho"
              >
                {item.label}
                <Icone nome="seta" className="size-5 text-marinho-200" />
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Botao
                href={whatsappUrl(CTA_PADRAO)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icone nome="whatsapp" className="size-5" />
                Falar no WhatsApp
              </Botao>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
