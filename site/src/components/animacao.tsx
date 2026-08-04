"use client";

import { animate, motion, useInView, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Peças de animação do site.

   Regra da casa: animação é para guiar o olho, não para chamar atenção pra si.
   Entrada suave, distância curta, nada que atrase a leitura.

   Quem liga "reduzir movimento" no sistema não vê deslocamento nenhum — isso é
   resolvido de uma vez no ConfigMovimento, que envolve o site inteiro. Nenhum
   componente daqui pergunta a preferência: se perguntasse, o servidor e o
   navegador renderizariam coisas diferentes.
   --------------------------------------------------------------------------- */

const SUAVE = [0.22, 1, 0.36, 1] as const; // desacelera no fim, como porta com amortecedor

/** Aparece ao entrar na tela. `atraso` escalona itens irmãos. */
export function Revelar({
  children,
  atraso = 0,
  de = "baixo",
  className = "",
}: {
  children: ReactNode;
  atraso?: number;
  de?: "baixo" | "esquerda" | "direita" | "parado";
  className?: string;
}) {
  const deslocamento = {
    baixo: { y: 24, x: 0 },
    esquerda: { y: 0, x: -24 },
    direita: { y: 0, x: 24 },
    parado: { y: 0, x: 0 },
  }[de];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...deslocamento }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: atraso, ease: SUAVE }}
    >
      {children}
    </motion.div>
  );
}

/* Contêiner + item para escalonar uma lista sem calcular atraso na mão. */

const listaVariants: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  oculto: { opacity: 0, y: 20 },
  visivel: { opacity: 1, y: 0, transition: { duration: 0.55, ease: SUAVE } },
};

export function ListaRevelada({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const Componente = motion[as];
  return (
    <Componente
      className={className}
      variants={listaVariants}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </Componente>
  );
}

export function ItemRevelado({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Componente = motion[as];
  return (
    <Componente className={className} variants={itemVariants}>
      {children}
    </Componente>
  );
}

/* --------------------------------------------------------------------------- */

/** Número que conta até o valor quando entra na tela. */
export function Contador({
  valor,
  className = "",
}: {
  valor: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const naTela = useInView(ref, { once: true, margin: "-60px" });
  const [exibido, setExibido] = useState(valor);

  const alvo = Number(valor);
  const contavel = Number.isFinite(alvo) && valor.trim() !== "";

  useEffect(() => {
    if (!naTela || !contavel) return;

    // Respeita a preferência do sistema: aqui não dá para usar o ConfigMovimento,
    // porque o que muda é o número em si, não uma propriedade de estilo.
    const querMenosMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (querMenosMovimento) return;

    // Anos (2005) partem de um ponto próximo; quantidades pequenas partem do zero.
    // O valor final é o que renderiza no HTML — quem chega sem JavaScript, ou
    // antes da animação começar, já lê o número certo.
    const inicio = alvo > 1000 ? alvo - 25 : 0;

    const controls = animate(inicio, alvo, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setExibido(String(Math.round(v))),
    });

    return () => controls.stop();
  }, [naTela, contavel, alvo]);

  return (
    <span ref={ref} className={className}>
      {contavel ? exibido : valor}
    </span>
  );
}

/* --------------------------------------------------------------------------- */

/** Entrada do topo da página: escalona os filhos sem esperar scroll. */
export function EntradaHero({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={listaVariants}
      initial="oculto"
      animate="visivel"
    >
      {children}
    </motion.div>
  );
}

/** Cartão que levanta de leve ao passar o mouse. */
export function CartaoFlutuante({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: SUAVE }}
    >
      {children}
    </motion.div>
  );
}
