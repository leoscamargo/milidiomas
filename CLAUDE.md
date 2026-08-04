# Mil Idiomas — MazyOS

A escola roda em cima desse arquivo. Aqui ficam as regras de operação
do MazyOS — como o Claude lê o contexto, aprende com correções, mantém
tudo atualizado e cria skills novas conforme a operação evolui.

As regras específicas da Mil Idiomas estão no final da página, a partir
de "Sobre a Mil Idiomas". Esse arquivo é editável a qualquer momento.

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem
e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Ao
sugerir prioridades, formatos ou abordagens, considerar o foco atual
descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, landing page), consultar
`identidade/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas
usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill. Se
não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o
usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o
padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma
instrução que parece permanente (frases como "na verdade é assim", "não
faça mais isso", "prefiro assim", "sempre que...", "evita...", "da
próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (clientes, serviços, mercado) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco** (projetos, metas, prazos) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro.
Confirmar mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato (ex: "na
verdade o arquivo se chama X"). Só perguntar quando a informação tiver
valor duradouro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, processo novo, ferramenta instalada, estrutura
alterada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Se sim, identificar o que atualizar:

- **Cliente, serviço, ferramenta, equipe** → `_memoria/empresa.md`
- **Mudança de prioridade ou foco** → `_memoria/estrategia.md`
- **Tom ou estilo** → `_memoria/preferencias.md`
- **Pasta, regra de organização, skill criada** → `CLAUDE.md`
- **Visual (cores, fontes, logo)** → `identidade/design-guide.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo
inteiro, só adicionar ou editar a linha relevante.

**Quando NÃO perguntar:**
- Tarefas pontuais sem impacto no contexto (escrever um email avulso, criar um post)
- Perguntas simples ou conversas sem ação
- Mudanças já salvas pelo bloco "Aprender com correções"

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`. Se
   existir, usar como base e adaptar pro contexto
2. Perguntar se é específica desse projeto ou útil em qualquer:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
   o conteúdo da skill ao contexto do negócio
4. Se a skill precisar de arquivos de apoio (templates, exemplos),
   criar dentro da pasta da skill
5. Seguir o fluxo da skill-creator nativa do Claude Code

---

# Sobre a Mil Idiomas

## O que é esse workspace

A operação da escola em uma pasta só: contexto do negócio, marca,
marketing e os documentos que a gente produz no dia a dia.

**Estrutura de pastas:**
- `_memoria/` — quem é a escola, como falamos, foco atual
- `identidade/` — marca aplicada em tudo que o sistema gera (logo e cores oficiais aqui)
- `marketing/` — conteúdo de Instagram, Google Meu Negócio, site, campanhas
- `saidas/` — documentos pontuais (mensagens, textos avulsos, propostas)
- `dados/` — arquivos a analisar (lista de alunos, planilha de matrícula, relatório)
- `templates/` — moldes do MazyOS
- `scripts/` — utilitários

Criar pasta nova só quando houver material recorrente pedindo por ela
(ex: `pedagogico/` se começarem a organizar material de aula aqui).
Não criar setor vazio — a escola tem 4 pessoas, não uma estrutura
corporativa.

## Sobre a escola

Mil Idiomas é uma escola de idiomas local que ensina inglês com
**professores estrangeiros** — esse é o diferencial e deve aparecer
na comunicação. Atende alunos adultos que pagam o próprio curso e pais
que matriculam filhos mais novos. Não há venda para empresas.
Expansão para outros idiomas é plano futuro, não realidade — nunca
comunicar como se já existisse.

Tagline: **"Inglês para ir mais longe"**.

## Quem faz o quê

- **Aula:** 2 professores — só dão aula, não entram na operação administrativa
- **Marketing, comercial, financeiro e administrativo:** o dono, com apoio da secretária
- **Consequência prática:** qualquer processo, rotina ou skill criada aqui
  cai no colo do dono e da secretária. Propor coisa que caiba em duas
  pessoas ocupadas — cadência realista, não calendário de agência.

## O que mais fazemos aqui

- Posts e legendas de Instagram (rotina semanal, hoje o maior peso)
- Prospecção de alunos novos (rotina semanal)
- Mensagens para alunos e pais — cobrança, aviso, retorno
- Presença local: Google Meu Negócio e, adiante, o site

## Tom de voz

Cordial e direto, como quem atende presencialmente e conhece o aluno
pelo nome. Saudação + nome + "tudo bem?" + uma frase curta com o
recado. Frases curtas, sem rodeio. Detalhes e exemplos reais em
`_memoria/preferencias.md`.

Evitar: jargão de coach, emoji em excesso, formalidade corporativa,
textão. "Invista no seu futuro" e apelos parecidos são bem-vindos.

## Regras do sistema

- Antes de qualquer peça visual, ler `identidade/design-guide.md` —
  as cores são as reais do logo, usar exatamente elas
- Marketing (post, legenda, campanha, SEO, Google Meu Negócio) salva em `marketing/`
- Documento avulso salva em `saidas/`
- Nunca usar nome real de aluno em exemplo, post ou material público
- Ao sugerir prioridade, atacar o gargalo de `_memoria/estrategia.md`:
  presença digital. Google Meu Negócio primeiro, Instagram depois, site na sequência
- Postagem de Instagram e prospecção são as duas rotinas que o dono quer
  tirar das costas — quando aparecerem de novo, oferecer `/mapear-rotinas`

## Ferramentas conectadas

- [ ] Instagram
- [ ] Google Meu Negócio
- [ ] Gmail
- [ ] Google Calendar
- [ ] WhatsApp
- [ ] Google Ads
- [ ] Meta Ads

*(Marcar conforme for instalando os MCPs)*
