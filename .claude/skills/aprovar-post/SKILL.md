---
name: aprovar-post
description: >
  Aprova e publica um post da fila — hospeda os PNGs do carrossel no site (commit e push,
  Netlify/Vercel deploya), aguarda o deploy, posta o carrossel no Instagram + Facebook via
  Meta Graph API e marca o roteiro como publicado. Use quando o usuário disser "aprovar post X",
  "publicar o post do tema Y", "/aprovar-post X", ou quando quiser disparar a publicação
  automática de um conteúdo já criado pela skill /publicar-tema.
---

# /aprovar-post — Pipeline de aprovação e publicação automática

Faz a ponte entre o conteúdo aprovado (carrossel + legenda, criado por `/publicar-tema`)
e a publicação real no feed do Instagram e do Facebook.

**O site não publica o conteúdo** — ele só hospeda as imagens. A Meta Graph API busca cada
slide por URL pública, então os PNGs precisam estar no ar antes do post sair. É pra isso, e
só pra isso, que o site entra no fluxo.

## Quando NÃO usar

- Conteúdo ainda não foi criado → use `/publicar-tema` primeiro
- PNGs ainda não renderizados → rodar `node render.js` na pasta do carrossel
- Usuário ainda está revisando → não rodar até ele dizer "aprovado" / "pode postar"
- Site não está deployado / Meta API não configurada → seguir setup abaixo

## Pré-requisitos (uma vez só)

- `.env` na raiz com:
  - `META_PAGE_ACCESS_TOKEN` — token de longa duração da Página FB
  - `META_PAGE_ID` — ID da Página FB
  - `META_IG_USER_ID` — ID da conta Insta Business
  - `SITE_URL` — ex: `https://milidiomas.com.br`
- Site com deploy automático a partir do `main` do GitHub (Vercel ou Netlify)
- Conta Insta Business conectada à Página FB
- Página FB com permissões corretas no Meta App
- Scripts `scripts/postar-instagram.js` e `scripts/postar-facebook.js` configurados

Nada disso existe ainda — nem o `.env`, nem os scripts, nem o site no ar. Se algo faltar:
parar e apontar o que falta, criando `marketing/automacao-meta-setup.md` com o passo a passo
se ainda não existir.

## Argumento

`/aprovar-post <slug>` — onde `<slug>` é o do frontmatter do `texto.md`, sem a data.

Exemplo: `/aprovar-post quanto-tempo-aprender-ingles`

Se o usuário não passou slug, listar as pastas de `marketing/conteudo/` cujo `texto.md` está
com `status: rascunho` e perguntar qual.

## Workflow

### Passo 1 — Localizar arquivos

- Pasta: `marketing/conteudo/<slug>-*` (a pasta tem sufixo de data)
- Validar que existem PNGs em `<pasta>/instagram/slide-XX.png` (2 a 10)
- Validar que existe `legenda.md`
- Ler o frontmatter de `texto.md` — se já estiver `status: publicado`, perguntar se é
  re-publicação antes de seguir

Se faltar qualquer um, parar e relatar.

### Passo 2 — Mostrar resumo + pedir confirmação final

Mostrar pro usuário:
- Título do roteiro
- Quantos slides do carrossel
- Primeiras 200 chars da legenda

Perguntar: **"Confirma publicação? (sim/não)"**. Só seguir se ele disser sim.

### Passo 3 — Copiar PNGs pro public folder do site

- Origem: `marketing/conteudo/<slug>-<data>/instagram/slide-*.png`
- Destino: `site/public/img/posts/<slug>/slide-*.png`
- Criar pasta de destino se não existir
- Sobrescrever se já existir (caso seja re-publicação)

### Passo 4 — Commit + push

```bash
git add site/public/img/posts/<slug>/
git commit -m "publicar: <título do roteiro>"
git push origin main
```

Esperar push terminar com sucesso.

### Passo 5 — Aguardar deploy

Deploy automático leva ~1-2 min. Validar que os slides estão acessíveis:

```bash
curl -sf -o /dev/null -w "%{http_code}" "$SITE_URL/img/posts/$slug/slide-01.png"
```

Aguardar HTTP 200 (com timeout de 5 min). Sem isso a Meta API falha — ela busca a imagem
por URL pública.

### Passo 6 — Postar no Instagram

```bash
node --env-file=.env scripts/postar-instagram.js marketing/conteudo/<slug>-<data>
```

Capturar o post id retornado. Se falhar, **não seguir pra Facebook** — relatar e parar.

### Passo 7 — Postar no Facebook

```bash
node --env-file=.env scripts/postar-facebook.js marketing/conteudo/<slug>-<data>
```

Capturar o post id retornado.

### Passo 8 — Marcar como publicado

Editar o frontmatter de `texto.md`: `status: rascunho` → `status: publicado`.
Commitar junto na próxima vez que rodar `/salvar`.

### Passo 9 — Resumo

Mostrar:
```
✓ Post publicado: <título>

Instagram:   <link do post>
Facebook:    <link do post>
Slides:      <SITE_URL>/img/posts/<slug>/
```

## Tratamento de erro

- Push falhou: relata e para (nada foi publicado ainda)
- Deploy não subiu em 5 min: relata, pergunta se quer continuar mesmo assim ou abortar
- Insta API falhou: para e relata. As imagens já estão no ar, só o post no feed que não foi
- FB falhou mas Insta OK: relata, sugere tentar de novo só o FB depois. Marcar
  `status: publicado` mesmo assim — o Insta é o canal principal

## Princípios

1. **Confirmação humana antes de qualquer coisa irreversível.** Nunca pular o passo 2.
2. **Idempotente onde possível.** Re-rodar com mesmo slug deve detectar publicação prévia
   (`status: publicado`, PNGs já no public/) e perguntar se é pra re-postar ou só atualizar.
3. **Falha cedo, falha alto.** Qualquer pré-requisito faltando = abortar e explicar o que falta.
4. **Logar tudo.** Cada passo imprime o que está fazendo e o resultado.
