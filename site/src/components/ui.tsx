import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ---------------------------------------------------------------
   Peças reutilizadas em todas as páginas.
   --------------------------------------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

type BotaoProps = {
  children: ReactNode;
  variante?: "primario" | "secundario" | "claro";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "className">;

const variantes = {
  primario:
    "bg-vermelho text-white hover:bg-vermelho-700 shadow-[0_4px_16px_rgba(234,25,30,0.25)]",
  secundario:
    "border border-marinho/25 text-marinho bg-white hover:border-marinho hover:bg-marinho-50",
  claro: "bg-white text-marinho hover:bg-marinho-50",
} as const;

export function Botao({
  children,
  variante = "primario",
  className = "",
  ...props
}: BotaoProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-6 py-3.5 text-[0.9375rem] font-semibold transition-colors duration-200 ${variantes[variante]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function TituloSecao({
  eyebrow,
  titulo,
  texto,
  centralizado = false,
  claro = false,
}: {
  eyebrow?: string;
  titulo: string;
  texto?: string;
  centralizado?: boolean;
  claro?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        centralizado ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`max-w-2xl text-balance text-3xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] ${
          claro ? "text-white" : "text-marinho"
        }`}
      >
        {titulo}
      </h2>
      {texto ? (
        <p
          className={`max-w-2xl text-pretty text-[1.0625rem] leading-relaxed ${
            claro ? "text-marinho-100" : "text-marinho-600"
          }`}
        >
          {texto}
        </p>
      ) : null}
    </div>
  );
}

export function Secao({
  children,
  fundo = "branco",
  className = "",
  id,
}: {
  children: ReactNode;
  fundo?: "branco" | "claro" | "marinho";
  className?: string;
  id?: string;
}) {
  const fundos = {
    branco: "bg-white",
    claro: "bg-marinho-50",
    marinho: "bg-marinho",
  } as const;

  return (
    <section
      id={id}
      className={`py-16 sm:py-24 ${fundos[fundo]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* Topo padrão das páginas internas */
export function PaginaHero({
  eyebrow,
  titulo,
  texto,
  children,
}: {
  eyebrow: string;
  titulo: string;
  texto?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-marinho/[0.12] bg-marinho-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 hidden size-[420px] rounded-full border-[3px] border-vermelho/10 lg:block"
      />
      <Container className="relative">
        <div className="flex max-w-3xl flex-col gap-5 py-14 sm:py-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-balance text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-marinho sm:text-[2.75rem]">
            {titulo}
          </h1>
          {texto ? (
            <p className="text-pretty text-lg leading-relaxed text-marinho-600">
              {texto}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-card border border-marinho/[0.15] bg-white p-7 shadow-suave ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Ícones — traço fino, marinho, sem preenchimento. Sem biblioteca
   externa para o site não carregar peso à toa.
   --------------------------------------------------------------- */

const iconeBase = {
  className: "h-full w-full",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
} as const;

export const icones = {
  globo: (
    <svg {...iconeBase} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  ),
  repeticao: (
    <svg {...iconeBase} aria-hidden="true">
      <path d="M4 11a8 8 0 0 1 13.5-5.8L20 7.5" />
      <path d="M20 4v3.5h-3.5" />
      <path d="M20 13a8 8 0 0 1-13.5 5.8L4 16.5" />
      <path d="M4 20v-3.5h3.5" />
    </svg>
  ),
  pessoas: (
    <svg {...iconeBase} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5" />
      <path d="M17.5 14.5A6 6 0 0 1 21 20" />
    </svg>
  ),
  casa: (
    <svg {...iconeBase} aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  ),
  whatsapp: (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24-1.44 0-2.86-.39-4.1-1.12l-.29-.17-3.05.8.81-2.98-.19-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-2.5 4.4c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.75-1.8-.19-.46-.39-.4-.54-.41z" />
    </svg>
  ),
  instagram: (
    <svg {...iconeBase} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3H14c-2.2 0-3.5 1.3-3.5 3.6v1.9H8.5v3h2V21h3.5v-9.5h2.4l.4-3z" />
    </svg>
  ),
  pin: (
    <svg {...iconeBase} aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  telefone: (
    <svg {...iconeBase} aria-hidden="true">
      <path d="M5 3h3.5l1.8 4.5-2.2 1.3a12 12 0 0 0 5.1 5.1l1.3-2.2L19 13.5V17a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3" />
    </svg>
  ),
  email: (
    <svg {...iconeBase} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
  relogio: (
    <svg {...iconeBase} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  ),
  seta: (
    <svg {...iconeBase} aria-hidden="true">
      <path d="M5 12h13m-5-5 5 5-5 5" />
    </svg>
  ),
  check: (
    <svg {...iconeBase} strokeWidth={2} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  ),
} as const;

export function Icone({
  nome,
  className = "size-6",
}: {
  nome: keyof typeof icones;
  className?: string;
}) {
  return <span className={`inline-block ${className}`}>{icones[nome]}</span>;
}
