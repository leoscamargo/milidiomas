---
name: publicar-tema
description: >
  Orquestra a criação de uma peça de conteúdo pra redes sociais a partir de um tema.
  Pega um tema (manual ou da estratégia de conteúdo do SEO), escreve o roteiro, gera o
  carrossel via skill /carrossel e produz a legenda pra Instagram e Facebook — tudo na
  mesma pasta, pronto pra `/aprovar-post` publicar.
  Use quando o usuário pedir "publicar tema", "gera o conteúdo do tema X", "transforma esse tema
  em post", "cria o conteúdo completo", ou /publicar-tema.
---

# /publicar-tema — Pipeline de conteúdo pra redes

Skill orquestradora. Pega um tema → entrega roteiro + carrossel + legenda, tudo numa pasta só.

O destino é o feed do Instagram e do Facebook. **Não existe blog** — o site da escola tem
só páginas fixas, e o carrossel fecha chamando pro WhatsApp ou pro teste de nível.

## Dependências

- **Estratégia de conteúdo:** `marketing/seo/05-estrategia-conteudo.md` (lista mestra de temas, criada pelo `/seo`). Ainda não existe — enquanto não existir, o tema vem do usuário
- **Outras pesquisas SEO:** `marketing/seo/01-pesquisa-demanda.md`, `02-analise-concorrencia.md` (quando existirem)
- **Skill carrossel:** `.claude/skills/carrossel/SKILL.md` — usar pra fase do carrossel
- **Tom de voz:** `_memoria/preferencias.md`
- **Contexto:** `_memoria/empresa.md`, `identidade/design-guide.md`

---

## Workflow

### Passo 0 — Escolher o tema

Se o usuário passou um tema explícito → usar.

Se não passou nada → ler `marketing/seo/05-estrategia-conteudo.md` (se existir), listar os
temas e perguntar qual. Se o arquivo não existir, perguntar o tema direto.

Checar `marketing/conteudo/` pra não repetir tema já publicado.

### Passo 1 — Pesquisa rápida

Se houver pesquisa SEO, ler o que tem sobre o tema: keyword principal e variações, como os
concorrentes tratam (pra fugir do óbvio). Sem pesquisa, seguir com o que `_memoria/empresa.md`
já dá — professor estrangeiro, Campo Bom, desde 2005.

### Passo 2 — Roteiro (a peça-mãe)

**Pasta:** `marketing/conteudo/<slug>-<YYYY-MM-DD>/`

**Slug:** kebab-case curto, sem stopwords. Ex: "Quanto tempo leva pra aprender inglês" →
`quanto-tempo-aprender-ingles`.

Criar `texto.md` com este frontmatter no topo — é ele que controla o estado da peça:

```yaml
---
titulo: "Título do conteúdo"
slug: <slug>
data: YYYY-MM-DD
status: rascunho      # rascunho → publicado (quem flipa é o /aprovar-post)
tema: <tema de origem>
---
```

**Sempre nascer com `status: rascunho`.** Nada vai pro feed sem o usuário aprovar.

Abaixo do frontmatter vem o roteiro slide a slide (é o que a `/carrossel` lê pra montar
o HTML): título, texto de apoio e selos de cada slide.

**Regras de escrita** (seguir `_memoria/preferencias.md` estritamente):
- Frases curtas, sem corporativês, sem jargão de coach
- Concreto: números, anos, o diferencial do professor estrangeiro
- Nunca usar nome real de aluno

### Passo 3 — Carrossel

**Sem perguntar, partir direto pra criação do carrossel** chamando
`.claude/skills/carrossel/SKILL.md` (tipo 1: carrossel texto puro), na mesma pasta.

Estrutura de slides:
- **Slide 1 — capa:** o título do roteiro (ou variação enxuta)
- **Slides 2-6:** os pontos-chave (1 ideia por slide, frase natural, não bullet seco)
- **Slide final — CTA:** WhatsApp da escola, ou o teste de nível em `<SITE_URL>/teste-de-nivel`.
  Alternar entre os dois conforme o tema — teste de nível puxa quem ainda está pesquisando,
  WhatsApp puxa quem já decidiu

**Capa:** seguir sequência alternada do feed (claro → foto/escuro → cor principal → repete) —
checar `marketing/conteudo/` mais recente.

### Passo 4 — Legenda

Salvar `legenda.md` na mesma pasta (Instagram e Facebook usam o mesmo texto):

- Hook na primeira linha
- 2-3 parágrafos de contexto (frases naturais, sem corporativês)
- CTA pro carrossel ("Arraste pro lado") + CTA de contato (WhatsApp ou teste de nível,
  o mesmo do slide final)
- Bloco curto de quem é a escola (professor estrangeiro, Campo Bom, desde 2005)
- 10-15 hashtags (público + nicho + local)

### Passo 5 — Resumo de entrega

No fim, mostrar pro usuário uma lista clara:

```
✓ Roteiro:   marketing/conteudo/<pasta>/texto.md (status: rascunho)
✓ Carrossel: marketing/conteudo/<pasta>/
  - carrossel.html + render.js
  - PNGs em instagram/
✓ Legenda:   marketing/conteudo/<pasta>/legenda.md

Pra publicar:
1. Renderizar os PNGs: cd marketing/conteudo/<pasta> && node render.js
2. Revisar os slides e a legenda
3. Rodar /aprovar-post <slug>
```

---

## Quando NÃO usar essa skill

- Pedido de carrossel avulso, sem tema de estratégia → usar `/carrossel` direto
- Atualização de peça existente → editar direto os arquivos da pasta
- Post único, frase de impacto → `/carrossel`

## Princípios

1. **O roteiro é a peça-mãe.** Carrossel e legenda derivam dele, não o contrário.
2. **Rascunho sempre.** Nunca publicar automaticamente — o usuário revisa antes (ou usa `/aprovar-post`).
3. **CTA sempre aponta pra conversa.** Sem blog pra mandar tráfego, o destino é WhatsApp ou teste de nível.
4. **Linguagem do público real.** Sem corporativês. Sempre.
