/* ---------------------------------------------------------------------------
   CONTEÚDO DO SITE — Mil Idiomas

   Este é o único arquivo que precisa ser editado para mudar textos, telefone,
   endereço, cursos e perguntas frequentes. Nada aqui exige saber programar:
   é só trocar o texto entre as aspas e salvar.

   >>> ITENS MARCADOS COM "REVISAR" AINDA ESTÃO COM DADO PROVISÓRIO. <<<
   --------------------------------------------------------------------------- */

/* Endereço final do site. Troque quando o domínio estiver comprado —
   ele alimenta o sitemap, as tags de compartilhamento e o Google. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://milidiomas.com.br";

export const escola = {
  nome: "Mil Idiomas",
  tagline: "Inglês para ir mais longe",
  cidade: "Campo Bom",
  estado: "RS",
  fundacao: "2005",
  anosDeCasa: new Date().getFullYear() - 2005,

  telefone: "(51) 3038-3828",
  telefoneLink: "+555130383828",
  whatsapp: "555130383828", // só números, com 55 na frente
  email: "contato@milidiomas.com.br", // REVISAR: confirmar o e-mail da escola

  endereco: {
    rua: "Rua Daltro Filho, 184",
    bairro: "Centro",
    cidade: "Campo Bom",
    estado: "RS",
    cep: "93700-000",
    mapa: "https://www.google.com/maps/search/?api=1&query=R.+Daltro+Filho%2C+184+-+Centro%2C+Campo+Bom+-+RS%2C+93700-000",
  },

  // REVISAR: confirmar o horário de atendimento da secretaria.
  horarios: [
    { dia: "Segunda a sexta", hora: "8h às 12h e 13h30 às 21h" },
    { dia: "Sábado", hora: "9h às 12h" },
    { dia: "Domingo", hora: "Fechado" },
  ],

  redes: {
    instagram: "https://www.instagram.com/milidiomas/",
    facebook: "", // deixe vazio se não houver
  },
} as const;

/* Os slogans que a escola já usa hoje nas redes. Mantidos como estão. */
export const slogans = [
  { emoji: "⏳", texto: "Aprenda Inglês na Velocidade do seu Tempo" },
  { emoji: "📖", texto: "Escola/Curso de Inglês" },
  { emoji: "🌎", texto: "Professores Estrangeiros" },
  { emoji: "👩‍🏫", texto: "Desde 2005" },
] as const;

export const whatsappUrl = (mensagem: string) =>
  `https://wa.me/${escola.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const CTA_PADRAO =
  "Olá! Vi o site da Mil Idiomas e quero saber mais sobre as turmas de inglês.";

/* --------------------------------------------------------------------------- */

export const navegacao = [
  { href: "/cursos", label: "Cursos" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/professores", label: "Professores" },
  { href: "/teste-de-nivel", label: "Teste de nível" },
  { href: "/a-escola", label: "A escola" },
  { href: "/contato", label: "Contato" },
] as const;

/* --------------------------------------------------------------------------- */

export const hero = {
  titulo: "Inglês com professor estrangeiro, aqui em Campo Bom.",
  subtitulo:
    "Aprenda inglês na velocidade do seu tempo. Você ouve a pronúncia certa desde a primeira aula, de quem fala inglês desde criança.",
  selos: [
    `Desde ${escola.fundacao} em Campo Bom`,
    "Professor nativo em sala",
    "Fluência em até 2 anos",
  ],
};

export const numeros = [
  { valor: "2005", rotulo: "Ano de fundação", detalhe: "Escola de Campo Bom, de porta aberta" },
  { valor: "44", rotulo: "Anos de método", detalhe: "Sistema Natural Mnemotécnico" },
  { valor: "2", rotulo: "Anos até a fluência", detalhe: "Do zero à conversa de verdade" },
  { valor: "5", rotulo: "Livros do curso", detalhe: "Com áudio e revisão em cada etapa" },
];

/* --------------------------------------------------------------------------- */

export const diferenciais = [
  {
    titulo: "Professor estrangeiro em sala",
    texto:
      "Não é áudio de aplicativo nem professor que aprendeu por livro. Você conversa com quem cresceu falando inglês e corrige seu sotaque na hora.",
    icone: "globo" as const,
  },
  {
    titulo: "Método que fixa de verdade",
    texto:
      "Mnemotécnica e neurolinguística: repetição guiada, imagem e áudio juntos. A palavra entra sem decoreba e não sai mais.",
    icone: "repeticao" as const,
  },
  {
    titulo: "Turma pequena, atenção real",
    texto:
      "Aqui ninguém passa despercebido no fundo da sala. Todo mundo fala em toda aula. É assim que a língua sai da cabeça e vira conversa.",
    icone: "pessoas" as const,
  },
  {
    titulo: "Escola de bairro, não call center",
    texto:
      `Há ${new Date().getFullYear() - 2005} anos no Centro de Campo Bom. Quem atende sabe seu nome, e a matrícula é resolvida olho no olho.`,
    icone: "casa" as const,
  },
];

/* --------------------------------------------------------------------------- */

export type Curso = {
  slug: string;
  nome: string;
  publico: string;
  idade: string;
  resumo: string;
  destaques: string[];
};

export const cursos: Curso[] = [
  {
    slug: "kids",
    nome: "Inglês Kids",
    publico: "Crianças",
    idade: "7 a 10 anos",
    resumo:
      "Aula com jogo, música e história. A criança aprende ouvindo e repetindo, do jeito que aprendeu português. Sem prova decorada, sem lição chata.",
    destaques: [
      "Livro ilustrado com áudio para ouvir em casa",
      "Contato com professor estrangeiro desde o começo",
      "Relatório de evolução para os pais",
    ],
  },
  {
    slug: "teens",
    nome: "Inglês Teens",
    publico: "Adolescentes",
    idade: "11 a 16 anos",
    resumo:
      "A idade em que o inglês para de ser matéria da escola e começa a valer pra vida: intercâmbio, jogo, série, vestibular e o primeiro currículo.",
    destaques: [
      "Conversação em toda aula, não só gramática",
      "Preparo para prova de escola e vestibular",
      "Turma da mesma faixa de idade",
    ],
  },
  {
    slug: "adultos",
    nome: "Inglês para Adultos",
    publico: "Adultos",
    idade: "A partir de 17 anos",
    resumo:
      "Para quem quer crescer no trabalho, viajar sem depender de tradutor ou finalmente tirar da gaveta o inglês que começou três vezes e parou.",
    destaques: [
      "Começa do zero ou entra no seu nível, após teste",
      "Horário de manhã, tarde ou noite",
      "Fluência em até 2 anos com o método da escola",
    ],
  },
  {
    slug: "vip",
    nome: "Inglês VIP",
    publico: "Aula particular",
    idade: "Qualquer idade",
    resumo:
      "Aula individual ou em dupla, no seu horário e no seu ritmo. Para quem tem pouco tempo livre e precisa de aprendizado acelerado.",
    destaques: [
      "Horário montado junto com você",
      "Conteúdo focado no seu objetivo: trabalho, viagem ou prova",
      "Ritmo mais rápido que a turma regular",
    ],
  },
  {
    slug: "conversacao",
    nome: "Conversação",
    publico: "Quem já tem base",
    idade: "A partir de 14 anos",
    resumo:
      "Uma hora falando inglês com professor estrangeiro, sem livro na frente. Para destravar a fala de quem entende bem mas trava na hora de responder.",
    destaques: [
      "Tema novo a cada encontro",
      "Correção de pronúncia na hora",
      "Aberto a quem já estudou fora da Mil Idiomas",
    ],
  },
];

/* --------------------------------------------------------------------------- */

export const metodologia = {
  frase: "A repetição é a mãe da aprendizagem.",
  intro:
    "O curso é montado sobre o Sistema Natural Mnemotécnico, o mesmo caminho pelo qual você aprendeu português: ouvindo, repetindo e associando, até a palavra entrar sem esforço.",
  pilares: [
    {
      titulo: "Ouvir antes de traduzir",
      texto:
        "O áudio vem junto com a imagem do livro. Seu cérebro liga o som direto ao sentido, sem passar pelo português no meio do caminho.",
    },
    {
      titulo: "Repetir com intenção",
      texto:
        "Cada estrutura volta várias vezes ao longo do curso, em contextos diferentes. É a repetição espaçada que leva o conteúdo ao subconsciente.",
    },
    {
      titulo: "Associar com imagem",
      texto:
        "Mnemotécnica é isso: prender a palavra nova a uma imagem forte. O que é associado se lembra; o que é decorado se esquece.",
    },
    {
      titulo: "Falar desde o primeiro dia",
      texto:
        "Nada de esperar o nível intermediário para abrir a boca. Você fala na primeira aula, erra à vontade e é corrigido por quem tem o inglês como língua materna.",
    },
  ],
  material: [
    "5 livros ilustrados, um por etapa do curso",
    "Áudios sincronizados com as imagens do livro",
    "Revisões e textos de apoio ao fim de cada etapa",
    "Acompanhamento presencial do professor em sala",
  ],
};

/* --------------------------------------------------------------------------- */

export const escolaSobre = {
  historia: [
    `A Mil Idiomas abriu as portas em 12 de maio de ${escola.fundacao}, no Centro de Campo Bom, com uma ideia simples: ninguém precisa de dez anos para falar inglês.`,
    "De lá pra cá, foram turmas de criança que hoje viajam sozinhas, adultos que mudaram de emprego por causa do idioma e gente que voltou a estudar depois dos cinquenta. A escola continua do mesmo tamanho de propósito: pequena o bastante para saber o nome de cada aluno.",
  ],
  negocio: "Preparar as pessoas para integrá-las no mundo sem fronteiras.",
  missao:
    "Atender a necessidade de comunicação internacional, cultural e profissional em idiomas, em curto período de tempo.",
  visao:
    "Quebrar o paradigma de que é necessário um longo período para aprender um novo idioma.",
};

/* --------------------------------------------------------------------------- */

export const professores = {
  intro:
    "Todo professor da Mil Idiomas tem fluência total no idioma que ensina. A escola procura profissionais com vivência no exterior e especialização em línguas e educação, e mantém americanos em sala para que o aluno ouça o inglês como ele é falado de verdade.",
  criterios: [
    {
      titulo: "Fluência total",
      texto: "Ninguém dá aula de um inglês que não domina por completo.",
    },
    {
      titulo: "Vivência no exterior",
      texto:
        "Quem morou fora traz a língua viva: a gíria, o ritmo, o jeito real de dizer as coisas.",
    },
    {
      titulo: "Formação em línguas e educação",
      texto:
        "Falar bem não basta. É preciso saber ensinar, e continuar estudando para isso.",
    },
    {
      titulo: "Experiência de sala",
      texto:
        "Professores com estrada, que já viram todo tipo de dificuldade e sabem como destravar cada aluno.",
    },
  ],
};

/* --------------------------------------------------------------------------- */

/*  DEPOIMENTOS — texto provisório.
    Substitua pelos depoimentos reais dos alunos, com autorização de cada um.
    Regra da casa: nunca publicar nome completo de aluno.
    Para esconder a seção do site, deixe a lista vazia:  export const depoimentos = [];  */
export const depoimentos = [
  {
    texto:
      "PROVISÓRIO: trocar por depoimento real. Espaço para o aluno contar o que mudou depois do curso.",
    autor: "Aluna do curso de adultos",
    detalhe: "Campo Bom",
  },
  {
    texto:
      "PROVISÓRIO: trocar por depoimento real. Espaço para um pai ou mãe falar da evolução do filho.",
    autor: "Mãe de aluno do Kids",
    detalhe: "Campo Bom",
  },
  {
    texto:
      "PROVISÓRIO: trocar por depoimento real. Espaço para quem usou o inglês em viagem ou no trabalho.",
    autor: "Aluno do curso VIP",
    detalhe: "Campo Bom",
  },
];

/* --------------------------------------------------------------------------- */

export const faq = [
  {
    pergunta: "Preciso saber alguma coisa de inglês para começar?",
    resposta:
      "Não. A maior parte das turmas começa do zero absoluto. Quem já estudou antes faz um teste de nível rápido e entra na turma certa, sem repetir o que já sabe.",
  },
  {
    pergunta: "Em quanto tempo eu falo inglês?",
    resposta:
      "O curso completo leva cerca de dois anos até a fluência, com o aluno acompanhando as aulas e ouvindo os áudios em casa. Conversação básica aparece bem antes disso: nas primeiras semanas você já monta frases.",
  },
  {
    pergunta: "A aula é com professor estrangeiro mesmo?",
    resposta:
      "Sim. A escola mantém professores que têm o inglês como língua materna, e todo professor daqui tem fluência total no idioma. É o principal motivo pelo qual o aluno sai com a pronúncia correta.",
  },
  {
    pergunta: "Qual a idade mínima para matricular meu filho?",
    resposta:
      "A turma Kids atende a partir dos 7 anos. Antes disso, vale conversar com a secretaria: dependendo da criança, a gente indica o melhor momento para começar.",
  },
  {
    pergunta: "Tem aula à noite? E aos sábados?",
    resposta:
      "Sim, há turmas de manhã, tarde e noite ao longo da semana. Para quem não fecha com nenhum horário, existe o curso VIP, com aula individual marcada junto com você.",
  },
  {
    pergunta: "Como funciona a matrícula?",
    resposta:
      "Você fala com a gente pelo WhatsApp ou passa na escola, faz o teste de nível se já tiver estudado antes, escolhe o horário e pronto. O material do curso e a mensalidade são explicados na hora, sem letra miúda.",
  },
  {
    pergunta: "Posso fazer uma aula experimental?",
    resposta:
      "Pode. Chame no WhatsApp que a secretaria marca uma aula para você assistir junto com a turma, sem compromisso de matrícula.",
  },
  {
    pergunta: "A escola ensina outros idiomas além de inglês?",
    resposta:
      "Hoje o curso é de inglês. Outros idiomas estão no plano da escola para o futuro. Quando abrirem turmas, o aviso sai aqui e no Instagram.",
  },
];
