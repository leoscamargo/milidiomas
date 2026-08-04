"use client";

import { motion } from "motion/react";
import { slogans } from "@/lib/site";

/* Faixa que desliza sem parar com os slogans que a escola já usa nas redes.

   As duas versões — deslizando e parada — ficam no HTML e quem escolhe é o
   CSS, pelas variantes `motion-safe`/`motion-reduce` do Tailwind. Decidir isso
   em JavaScript daria erro de hidratação: o servidor não tem como saber se o
   visitante pediu menos movimento. */

export function FaixaSlogans() {
  const itens = slogans.map((s) => (
    <span
      key={s.texto}
      className="flex shrink-0 items-center gap-2.5 px-7 text-sm font-medium text-white sm:text-[0.9375rem]"
    >
      <span aria-hidden="true" className="text-base">
        {s.emoji}
      </span>
      {s.texto}
    </span>
  ));

  return (
    <div className="overflow-hidden bg-marinho py-4">
      {/* Movimento liberado: duas cópias em sequência, para o corte do laço
          ficar invisível quando a primeira termina de sair. */}
      <motion.div
        className="flex w-max motion-reduce:hidden"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        <div className="flex" aria-label="Slogans da Mil Idiomas">
          {itens}
        </div>
        <div className="flex" aria-hidden="true">
          {itens}
        </div>
      </motion.div>

      {/* Movimento reduzido: a mesma lista, parada, quebrando em linhas. */}
      <div
        className="mx-auto hidden max-w-6xl flex-wrap justify-center gap-y-2 px-5 motion-reduce:flex"
        aria-label="Slogans da Mil Idiomas"
      >
        {itens}
      </div>
    </div>
  );
}
