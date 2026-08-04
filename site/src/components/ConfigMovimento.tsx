"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Um lugar só decide o comportamento de movimento do site inteiro.

   `reducedMotion="user"` faz a biblioteca desligar sozinha as animações de
   deslocamento de quem ligou "reduzir movimento" no sistema, mantendo só o
   aparecer suave.

   Isso substitui o `useReducedMotion()` espalhado pelos componentes — que
   causava erro de hidratação, porque o servidor não tem como saber a
   preferência do visitante e renderizava diferente do navegador.
   --------------------------------------------------------------------------- */

export function ConfigMovimento({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
