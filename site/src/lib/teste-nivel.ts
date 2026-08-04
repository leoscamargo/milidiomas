/* ---------------------------------------------------------------------------
   Teste de nível de inglês.

   20 perguntas, 4 por faixa do Quadro Europeu Comum (A1 → C1), em ordem
   crescente de dificuldade. Cada pergunta tem 4 alternativas e uma correta.

   Para editar: troque o texto entre aspas. `correta` é a posição da resposta
   certa dentro de `opcoes`, começando em 0 (a primeira opção é 0).
   --------------------------------------------------------------------------- */

export type Nivel = "A1" | "A2" | "B1" | "B2" | "C1";

export type Pergunta = {
  nivel: Nivel;
  enunciado: string;
  opcoes: string[];
  correta: number;
};

export const perguntas: Pergunta[] = [
  // ---------- A1 — primeiros passos ----------
  {
    nivel: "A1",
    enunciado: "___ name is Maria.",
    opcoes: ["My", "Me", "I", "Mine"],
    correta: 0,
  },
  {
    nivel: "A1",
    enunciado: "She ___ a teacher.",
    opcoes: ["are", "am", "is", "be"],
    correta: 2,
  },
  {
    nivel: "A1",
    enunciado: "I ___ coffee every morning.",
    opcoes: ["drinks", "drinking", "to drink", "drink"],
    correta: 3,
  },
  {
    nivel: "A1",
    enunciado: "There ___ two books on the table.",
    opcoes: ["is", "are", "has", "be"],
    correta: 1,
  },

  // ---------- A2 — básico ----------
  {
    nivel: "A2",
    enunciado: "Yesterday I ___ to the cinema.",
    opcoes: ["go", "gone", "went", "going"],
    correta: 2,
  },
  {
    nivel: "A2",
    enunciado: "This box is ___ than that one.",
    opcoes: ["heavy", "more heavy", "heaviest", "heavier"],
    correta: 3,
  },
  {
    nivel: "A2",
    enunciado: "She has lived here ___ 2010.",
    opcoes: ["for", "since", "from", "during"],
    correta: 1,
  },
  {
    nivel: "A2",
    enunciado: "I'm not very good ___ cooking.",
    opcoes: ["in", "on", "at", "for"],
    correta: 2,
  },

  // ---------- B1 — intermediário ----------
  {
    nivel: "B1",
    enunciado: "If it ___ tomorrow, we'll stay home.",
    opcoes: ["will rain", "rains", "rained", "would rain"],
    correta: 1,
  },
  {
    nivel: "B1",
    enunciado: "I'm used to ___ up early.",
    opcoes: ["wake", "woke", "waking", "wakes"],
    correta: 2,
  },
  {
    nivel: "B1",
    enunciado: "The report ___ by the manager yesterday.",
    opcoes: ["wrote", "was written", "has written", "is writing"],
    correta: 1,
  },
  {
    nivel: "B1",
    enunciado: "She asked me where I ___.",
    opcoes: ["live", "lived", "living", "am living"],
    correta: 1,
  },

  // ---------- B2 — avançado intermediário ----------
  {
    nivel: "B2",
    enunciado: "I wish I ___ more time to study.",
    opcoes: ["have", "will have", "had", "am having"],
    correta: 2,
  },
  {
    nivel: "B2",
    enunciado: "___ the heavy rain, the match went ahead.",
    opcoes: ["Although", "Despite", "However", "Because"],
    correta: 1,
  },
  {
    nivel: "B2",
    enunciado: "By the time we arrived, the film ___.",
    opcoes: ["started", "has started", "had started", "was starting"],
    correta: 2,
  },
  {
    nivel: "B2",
    enunciado: "He's the kind of person ___ always helps others.",
    opcoes: ["which", "whose", "whom", "who"],
    correta: 3,
  },

  // ---------- C1 — avançado ----------
  {
    nivel: "C1",
    enunciado: "Not only ___ late, but he also forgot the documents.",
    opcoes: ["he was", "was he", "he is", "is he"],
    correta: 1,
  },
  {
    nivel: "C1",
    enunciado: "Had I known about the meeting, I ___ attended.",
    opcoes: ["will have", "would have", "had", "would"],
    correta: 1,
  },
  {
    nivel: "C1",
    enunciado: "The proposal was turned ___ by the board.",
    opcoes: ["off", "over", "down", "up"],
    correta: 2,
  },
  {
    nivel: "C1",
    enunciado: "Little ___ that the deal had already collapsed.",
    opcoes: ["he knew", "knew he", "did he know", "he did know"],
    correta: 2,
  },
];

/* --------------------------------------------------------------------------- */

const ORDEM: Nivel[] = ["A1", "A2", "B1", "B2", "C1"];

export type ResultadoNivel = {
  nivel: Nivel | "Iniciante";
  titulo: string;
  texto: string;
  cursoIndicado: string;
  cursoSlug: string;
  acertos: number;
  total: number;
  porFaixa: { nivel: Nivel; acertos: number; total: number }[];
};

const DESCRICOES: Record<
  Nivel | "Iniciante",
  { titulo: string; texto: string; curso: string; slug: string }
> = {
  Iniciante: {
    titulo: "Começando do zero",
    texto:
      "Você ainda está montando a base, e esse é o melhor lugar para começar, porque a maior parte das nossas turmas parte exatamente daí. Nada de vergonha: quem começa do zero costuma avançar mais rápido, porque não carrega vício de pronúncia.",
    curso: "Inglês para Adultos (turma iniciante)",
    slug: "adultos",
  },
  A1: {
    titulo: "Básico inicial",
    texto:
      "Você reconhece palavras e frases do dia a dia e já se vira no essencial. O próximo passo é ganhar estrutura para montar frases sozinho, sem depender de memorizar prontas.",
    curso: "Inglês para Adultos (turma iniciante)",
    slug: "adultos",
  },
  A2: {
    titulo: "Básico",
    texto:
      "Você entende o essencial e consegue se comunicar em situações simples: se apresentar, pedir informação, falar da rotina. Falta soltar a fala e ampliar o vocabulário para assuntos além do básico.",
    curso: "Inglês para Adultos",
    slug: "adultos",
  },
  B1: {
    titulo: "Intermediário",
    texto:
      "Você já se comunica com autonomia em boa parte das situações e entende bem o que lê e ouve. É o momento clássico de travar na hora de responder, e o que destrava é conversar com professor estrangeiro toda semana.",
    curso: "Conversação",
    slug: "conversacao",
  },
  B2: {
    titulo: "Intermediário avançado",
    texto:
      "Você lida bem com textos complexos e conversa com naturalidade sobre a maioria dos assuntos. Daqui pra frente o ganho está na precisão: expressão idiomática, ritmo e naturalidade de quem fala há anos.",
    curso: "Conversação",
    slug: "conversacao",
  },
  C1: {
    titulo: "Avançado",
    texto:
      "Você domina o idioma com fluidez e usa o inglês com naturalidade em contexto profissional. O que ainda rende é manutenção e refinamento: conversar com frequência para não enferrujar.",
    curso: "Conversação ou Inglês VIP",
    slug: "conversacao",
  },
};

/**
 * Calcula o nível a partir das respostas.
 *
 * `respostas[i]` é o índice escolhido na pergunta `i`, ou -1 se ficou em branco.
 *
 * O nível é a faixa mais alta em que a pessoa acertou pelo menos 3 das 4
 * perguntas, subindo de A1 até C1 — a subida para quando uma faixa falha, para
 * que um acerto solto lá em cima não infle o resultado.
 */
export function nivelPorRespostas(respostas: number[]): ResultadoNivel {
  const porFaixa = ORDEM.map((nivel) => {
    const daFaixa = perguntas
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => p.nivel === nivel);

    const acertos = daFaixa.filter(
      ({ p, i }) => respostas[i] === p.correta,
    ).length;

    return { nivel, acertos, total: daFaixa.length };
  });

  let alcancado: Nivel | "Iniciante" = "Iniciante";
  for (const faixa of porFaixa) {
    if (faixa.acertos >= 3) alcancado = faixa.nivel;
    else break;
  }

  const acertos = porFaixa.reduce((soma, f) => soma + f.acertos, 0);
  const descricao = DESCRICOES[alcancado];

  return {
    nivel: alcancado,
    titulo: descricao.titulo,
    texto: descricao.texto,
    cursoIndicado: descricao.curso,
    cursoSlug: descricao.slug,
    acertos,
    total: perguntas.length,
    porFaixa,
  };
}
