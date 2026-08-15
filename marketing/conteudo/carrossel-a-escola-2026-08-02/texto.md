---
titulo: "Inglês com professor estrangeiro, aqui em Campo Bom"
slug: a-escola
data: 2026-08-02
status: rascunho
tema: apresentação da escola
---

# Carrossel — a escola (visual do site)

**Data:** 02/08/2026
**Formato:** 1080x1350 (4:5), 5 slides
**Referência visual:** `site/src/app/globals.css` e a home do site — branco,
marinho `#052251`, vermelho `#EA191E` como acento, Poppins, cards com borda
marinho a 15% e círculos de apoio no fundo.

---

## Slide 1 — Capa (fundo branco)

**Eyebrow:** DESDE 2005 · CAMPO BOM/RS
**Título:** Inglês com **professor estrangeiro**, aqui em Campo Bom.
**Apoio:** Aprenda inglês na velocidade do seu tempo, ouvindo a pronúncia certa
desde a primeira aula.

**Selos:**
- 21 anos no Centro de Campo Bom
- Turmas para crianças, adolescentes e adultos
- Fluência em até 2 anos

## Slide 2 — Foto do professor (foto + bloco marinho)

**Eyebrow:** NA NOSSA SALA
**Título:** O mundo inteiro entra pela porta da sala
**Texto:** Aqui o inglês vem com um pedaço do mundo junto. Nesse dia, o professor
escreveu o nome de cada aluno no alfabeto da língua materna dele. É o tipo de
aula que ninguém esquece.

## Slide 3 — Diferenciais (fundo `#F4F6FA`)

**Eyebrow:** POR QUE A MIL IDIOMAS
**Título:** Quatro motivos pra estudar aqui, e não num aplicativo

1. **Professor estrangeiro em sala** — Você conversa com quem cresceu falando
   inglês e é corrigido na hora.
2. **Método que fixa de verdade** — Imagem, áudio e repetição guiada. A palavra
   entra sem decoreba.
3. **Turma pequena, atenção real** — Ninguém passa despercebido no fundo da sala.
   Todo mundo fala em toda aula.
4. **Escola de bairro, não call center** — Quem atende sabe seu nome, e a
   matrícula é resolvida olho no olho.

## Slide 4 — Turma formada (fundo branco)

**Eyebrow:** TURMA FORMADA
**Título:** No fim do caminho, o certificado na mão
**Texto:** Do primeiro *hello* à conversa de verdade. É esse trajeto que a gente
faz junto com cada turma, do começo ao fim.

## Slide 5 — Chamada final (fundo marinho)

**Eyebrow:** COMECE AGORA
**Título:** O melhor jeito de saber se é pra você é assistir uma aula
**Texto:** Aula experimental sem compromisso. Você senta com a turma, ouve o
professor estrangeiro e decide depois.
**Botão:** Chama no WhatsApp
**Rodapé:** (51) 3038-3828 · @milidiomas · Rua Daltro Filho, 184 — Centro,
Campo Bom/RS

---

## Decisões e pendências

**Nomes de aluno nas fotos.** A regra da casa é não publicar nome real de aluno.

- **Slide 2 — resolvido.** A foto original trazia LUIZA, LAURA, ALICE e MATHEUS
  escritos em letra latina no alto do quadro. O recorte usado no carrossel corta
  essa faixa: sobra só a escrita árabe, que é justamente o que conta a história.
- **Slide 4 — pendente de decisão.** Os certificados que a turma segura têm nome
  completo impresso e ficam legíveis com zoom. Precisa da tua decisão: publicar
  assim, borrar a faixa do nome em cada certificado, ou trocar por outra foto.

**Professor do slide 2.** O texto fala em "professor estrangeiro" e "língua
materna dele", sem afirmar que o inglês é a língua materna desse professor — o
que seria incorreto. O argumento de professor com inglês nativo continua no
slide 3, onde é verdadeiro.

**Números conferidos** contra `site/src/lib/site.ts`: fundação 2005, 21 anos de
casa, fluência em até 2 anos, telefone e endereço.

---

## Como regerar

```bash
cd marketing/conteudo/carrossel-a-escola-2026-08-02
NODE_PATH="$HOME/.npm/_npx/e41f203b7505f1fb/node_modules" node render.js
```

`logo-transparente.js` só precisa rodar de novo se o logo oficial mudar.
