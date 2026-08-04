"use client";

import type { ReactNode } from "react";

/* Campos de formulário — mesmo visual no Fale Conosco e no teste de nível. */

export const campoClasse =
  "w-full rounded-[10px] border border-marinho/20 bg-white px-4 py-3 text-marinho placeholder:text-marinho-200 transition-colors focus:border-vermelho focus:outline-none";

export const campoComErro = "border-vermelho";

export function Campo({
  id,
  rotulo,
  opcional = false,
  erro,
  children,
}: {
  id: string;
  rotulo: string;
  opcional?: boolean;
  erro?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-marinho">
        {rotulo}
        {opcional ? (
          <span className="font-normal text-marinho-400"> (opcional)</span>
        ) : null}
      </label>
      {children}
      {erro ? (
        <p role="alert" className="mt-1.5 text-sm font-medium text-vermelho">
          {erro}
        </p>
      ) : null}
    </div>
  );
}
