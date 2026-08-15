# Site da Mil Idiomas

Site institucional da escola em React + TypeScript (Next.js, Tailwind e
Motion). As páginas de conteúdo são pré-renderizadas — carregam rápido e
custam quase nada pra hospedar — e os formulários rodam no servidor.

## Rodar na sua máquina

```bash
cd site
npm install     # só na primeira vez
npm run dev
```

Abre em <http://localhost:3000>. Salvou o arquivo, a página atualiza sozinha.

---

## O que editar (e onde)

### Textos, telefone, endereço, cursos e FAQ

**Um arquivo só:** [`src/lib/site.ts`](src/lib/site.ts)

Tudo que é conteúdo está lá dentro, com comentário explicando cada bloco. É
só trocar o texto entre aspas e salvar. Não precisa saber programar.

Os itens marcados com `REVISAR` ainda estão com dado provisório e precisam ser
conferidos antes do site ir ao ar:

- e-mail de contato
- horário de atendimento da secretaria
- os três depoimentos (hoje estão com texto `PROVISÓRIO`)

> Sobre os depoimentos: use frases reais de alunos, com autorização de cada um,
> e sem nome completo. Para esconder a seção enquanto não houver depoimento
> real, deixe a lista vazia: `export const depoimentos = [];`

### Artigos do blog

Ficam em [`content/blog/`](content/blog), um arquivo `.md` por artigo. É a
mesma pasta que a skill `/publicar-tema` usa. Cabeçalho de cada arquivo:

```yaml
---
title: "Título do artigo"
description: "Resumo de 150-160 caracteres, com a palavra-chave"
date: 2026-08-02
draft: false          # true = fica invisível no site
tags: ["dicas"]
---
```

### Perguntas do teste de nível

Ficam em [`src/lib/teste-nivel.ts`](src/lib/teste-nivel.ts): 20 perguntas, 4 por
faixa (A1 a C1). Para trocar uma pergunta, edite o texto e ajuste `correta` —
é a posição da resposta certa dentro de `opcoes`, começando em 0.

### Logo e cores

- Logo: `public/logo-mil-idiomas.png`
- Cores e regras visuais: `../identidade/design-guide.md`
- Paleta no código: topo de [`src/app/globals.css`](src/app/globals.css)

### Fotos

O site hoje não usa fotografia — no lugar dela há blocos gráficos da marca.
Quando a escola tiver fotos próprias (sala de aula, professor, fachada, turma),
elas entram em `public/` e substituem esses blocos. Foto de gente real da escola
vale mais que banco de imagens.

---

## Estrutura

```
site/
├─ content/blog/        artigos em markdown
├─ public/              logo e imagens
└─ src/
   ├─ app/              uma pasta por página do site
   │  ├─ page.tsx           home
   │  ├─ cursos/            cursos
   │  ├─ metodologia/       metodologia
   │  ├─ professores/       professores
   │  ├─ a-escola/          história, missão e visão
   │  ├─ contato/           endereço, formulário e mapa
   │  ├─ blog/              lista e artigo
   │  ├─ teste-de-nivel/    teste de inglês com captura de lead
   │  ├─ actions.ts         recebe os formulários (roda no servidor)
   │  ├─ sitemap.ts         mapa do site pro Google
   │  └─ robots.ts          regras pros buscadores
   ├─ components/       peças reaproveitadas (header, rodapé, botões, animações)
   └─ lib/
      ├─ site.ts        >>> CONTEÚDO DO SITE <<<
      ├─ teste-nivel.ts perguntas e cálculo do nível
      ├─ leads.ts       hCaptcha e envio dos leads por e-mail
      └─ blog.ts        leitura dos artigos
```

---

## Formulários e leads

Dois formulários geram contato: o **Fale conosco** (em `/contato`) e o **teste
de nível** (em `/teste-de-nivel`, que pede os dados antes das perguntas, para a
escola ficar com o contato mesmo de quem desiste no meio).

Os dois passam por hCaptcha e chegam por e-mail. Para funcionar, preencha as
variáveis do [`.env.example`](.env.example):

1. **hCaptcha** — conta grátis em <https://www.hcaptcha.com>, cadastre o
   domínio e copie as duas chaves.
2. **Resend** — conta grátis em <https://resend.com> (3.000 e-mails/mês),
   verifique o domínio e copie a chave da API.

Copie `.env.example` para `.env.local` e preencha. Na Vercel, as mesmas
variáveis vão em *Settings > Environment Variables*.

> Enquanto o hCaptcha não estiver configurado, os formulários funcionam **sem
> proteção contra robô**. Enquanto o Resend não estiver, o Fale conosco mostra
> um aviso e oferece o WhatsApp — de propósito, para nenhum contato sumir em
> silêncio.

---

## Animações

Ficam em [`src/components/animacao.tsx`](src/components/animacao.tsx): entrada
suave ao rolar a página, contador de números, cartões que levantam no hover,
faixa de slogans deslizando e transição entre as perguntas do teste.

Tudo respeita a opção "reduzir movimento" do sistema — quem liga essa
configuração vê o conteúdo aparecer sem deslocamento.

---

## Publicar na internet

O site roda de graça na Vercel. Roteiro:

1. Subir o repositório pro GitHub (a skill `/salvar` faz isso)
2. Criar conta na Vercel e importar o repositório
3. Em **Root Directory**, apontar para a pasta `site`
4. Definir a variável `NEXT_PUBLIC_SITE_URL` com o endereço final
   (ex: `https://milidiomas.com.br`) — ela alimenta o sitemap e o
   compartilhamento em redes sociais
5. Apontar o domínio da escola pra Vercel

Depois disso, todo `git push` publica sozinho.

### Antes de anunciar o site

- [ ] Conferir os itens `REVISAR` em `src/lib/site.ts`
- [ ] Configurar hCaptcha e Resend (senão os formulários não entregam)
- [ ] Trocar os depoimentos provisórios
- [ ] Cadastrar o site no Google Meu Negócio e no Search Console
- [ ] Enviar `https://SEU-DOMINIO/sitemap.xml` no Search Console
