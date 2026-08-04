import type { Metadata } from "next";
import Link from "next/link";
import { Faq, FaqSchema } from "@/components/Faq";
import { FaixaSlogans } from "@/components/FaixaSlogans";
import {
  CartaoFlutuante,
  Contador,
  EntradaHero,
  ItemRevelado,
  ListaRevelada,
  Revelar,
} from "@/components/animacao";
import {
  Botao,
  Card,
  Container,
  Eyebrow,
  Icone,
  Secao,
  TituloSecao,
} from "@/components/ui";
import {
  CTA_PADRAO,
  cursos,
  depoimentos,
  diferenciais,
  escola,
  hero,
  metodologia,
  numeros,
  professores,
  whatsappUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `Curso de inglês em ${escola.cidade}/${escola.estado} com professor estrangeiro`,
  description: `Escola de inglês em ${escola.cidade} desde ${escola.fundacao}, com professor estrangeiro em sala. Turmas para crianças, adolescentes e adultos, aula VIP e conversação. Agende sua aula experimental.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FaixaSlogans />
      <Diferenciais />
      <TesteDeNivel />
      <Cursos />
      <Metodologia />
      <Professores />
      <Depoimentos />
      <PerguntasFrequentes />
      <ChamadaFinal />
      <FaqSchema />
    </>
  );
}

/* --------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Formas de apoio — eco do traço manuscrito e do globo do logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 hidden size-[560px] rounded-full border-[3px] border-vermelho/10 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-32 hidden size-[420px] rounded-full bg-marinho-50 lg:block"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <EntradaHero className="flex flex-col items-start gap-7">
            <ItemRevelado>
              <h1 className="text-balance text-[2.125rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-marinho sm:text-5xl lg:text-[3.4rem]">
                Inglês com{" "}
                <span className="text-vermelho">professor estrangeiro</span>,
                aqui em {escola.cidade}.
              </h1>
            </ItemRevelado>

            <ItemRevelado>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-marinho-600">
                {hero.subtitulo}
              </p>
            </ItemRevelado>

            <ItemRevelado className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Botao
                href={whatsappUrl(CTA_PADRAO)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icone nome="whatsapp" className="size-5" />
                Agendar aula experimental
              </Botao>
              <Botao href="/teste-de-nivel" variante="secundario">
                Testar meu inglês
              </Botao>
            </ItemRevelado>

            <ItemRevelado
              as="div"
              className="flex flex-wrap gap-x-6 gap-y-2.5 pt-1"
            >
              {hero.selos.map((selo) => (
                <span
                  key={selo}
                  className="flex items-center gap-2 text-sm font-medium text-marinho-600"
                >
                  <Icone nome="check" className="size-4 text-vermelho" />
                  {selo}
                </span>
              ))}
            </ItemRevelado>
          </EntradaHero>

          {/* Cartão-resumo: ocupa o lugar da foto até a escola ter imagens próprias */}
          <Revelar de="direita" atraso={0.15}>
            <div className="relative overflow-hidden rounded-[20px] bg-marinho p-8 shadow-media sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -right-16 text-white/[0.06]"
              >
                <Icone nome="globo" className="size-60" />
              </div>

              <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-vermelho-200">
                {escola.tagline}
              </p>
              <p className="relative mt-4 text-2xl font-bold leading-snug text-white sm:text-[1.75rem]">
                Do primeiro <span className="text-vermelho-200">hello</span> à
                conversa de verdade em até dois anos.
              </p>

              <dl className="relative mt-9 grid grid-cols-2 gap-x-6 gap-y-7">
                {numeros.map((n) => (
                  <div key={n.rotulo}>
                    <dt className="sr-only">{n.rotulo}</dt>
                    <dd>
                      <Contador
                        valor={n.valor}
                        className="block text-3xl font-extrabold leading-none text-white tabular-nums"
                      />
                      <span className="mt-1.5 block text-[0.8125rem] font-semibold text-white">
                        {n.rotulo}
                      </span>
                      <span className="mt-0.5 block text-[0.75rem] leading-snug text-marinho-200">
                        {n.detalhe}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Revelar>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- */

function Diferenciais() {
  return (
    <Secao fundo="claro">
      <Revelar>
        <TituloSecao
          eyebrow="Por que a Mil Idiomas"
          titulo="Quatro motivos para estudar aqui e não num aplicativo"
          texto="Aplicativo ensina palavra. Sala de aula com professor estrangeiro ensina a falar, e corrige na hora em que você erra."
        />
      </Revelar>

      <ListaRevelada className="mt-12 grid gap-5 sm:grid-cols-2">
        {diferenciais.map((item) => (
          <ItemRevelado key={item.titulo}>
            <CartaoFlutuante className="h-full">
              <Card className="flex h-full flex-col gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-vermelho-50 text-vermelho">
                  <Icone nome={item.icone} className="size-6" />
                </span>
                <h3 className="text-lg font-semibold text-marinho">
                  {item.titulo}
                </h3>
                <p className="leading-relaxed text-marinho-600">{item.texto}</p>
              </Card>
            </CartaoFlutuante>
          </ItemRevelado>
        ))}
      </ListaRevelada>
    </Secao>
  );
}

/* --------------------------------------------------------------------- */

function TesteDeNivel() {
  return (
    <Secao>
      <Revelar>
        <div className="relative overflow-hidden rounded-[20px] border border-marinho/[0.15] bg-marinho-50 p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border-[3px] border-vermelho/10"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="flex flex-col gap-4">
              <Eyebrow>Teste grátis</Eyebrow>
              <h2 className="text-balance text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-marinho sm:text-[2.25rem]">
                Descubra seu nível de inglês em 5 minutos
              </h2>
              <p className="max-w-xl text-pretty leading-relaxed text-marinho-600">
                Vinte perguntas, do básico ao avançado. No fim você recebe seu
                nível pelo Quadro Europeu (A1 a C1) e a turma da Mil Idiomas que
                combina com ele. Sem custo e sem compromisso.
              </p>
            </div>
            <Botao href="/teste-de-nivel" className="lg:justify-self-end">
              Começar o teste
              <Icone nome="seta" className="size-4" />
            </Botao>
          </div>
        </div>
      </Revelar>
    </Secao>
  );
}

/* --------------------------------------------------------------------- */

function Cursos() {
  return (
    <Secao fundo="claro" id="cursos">
      <Revelar>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <TituloSecao
            eyebrow="Cursos"
            titulo="Uma turma para cada fase da vida"
            texto="Da criança que ainda está aprendendo a ler ao adulto que precisa do inglês para ontem."
          />
          <Botao href="/cursos" variante="secundario" className="shrink-0">
            Ver todos os detalhes
          </Botao>
        </div>
      </Revelar>

      <ListaRevelada className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cursos.map((curso) => (
          <ItemRevelado key={curso.slug} className="h-full">
            <Link
              href={`/cursos#${curso.slug}`}
              className="group flex h-full flex-col gap-3 rounded-card border border-marinho/[0.15] bg-white p-7 shadow-suave transition-all duration-200 hover:-translate-y-1 hover:border-vermelho/40 hover:shadow-media"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-vermelho">
                {curso.idade}
              </span>
              <h3 className="text-xl font-bold text-marinho">{curso.nome}</h3>
              <p className="flex-1 leading-relaxed text-marinho-600">
                {curso.resumo}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-marinho transition-colors group-hover:text-vermelho">
                Saiba mais
                <Icone
                  nome="seta"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </ItemRevelado>
        ))}
      </ListaRevelada>
    </Secao>
  );
}

/* --------------------------------------------------------------------- */

function Metodologia() {
  return (
    <Secao fundo="marinho">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Revelar de="esquerda" className="flex flex-col gap-6">
          <TituloSecao eyebrow="Metodologia" titulo={metodologia.frase} claro />
          <p className="max-w-lg text-pretty leading-relaxed text-marinho-200">
            {metodologia.intro}
          </p>
          <Botao href="/metodologia" variante="claro" className="self-start">
            Entender o método
          </Botao>
        </Revelar>

        <ListaRevelada as="ol" className="flex flex-col">
          {metodologia.pilares.map((pilar, i) => (
            <ItemRevelado
              key={pilar.titulo}
              as="li"
              className="flex gap-5 border-t border-white/15 py-6 first:border-t-0 first:pt-0"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-vermelho text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {pilar.titulo}
                </h3>
                <p className="mt-1.5 leading-relaxed text-marinho-200">
                  {pilar.texto}
                </p>
              </div>
            </ItemRevelado>
          ))}
        </ListaRevelada>
      </div>
    </Secao>
  );
}

/* --------------------------------------------------------------------- */

function Professores() {
  return (
    <Secao>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Revelar de="esquerda">
          <TituloSecao
            eyebrow="Professores"
            titulo="Quem ensina aqui fala inglês como língua de casa"
            texto={professores.intro}
          />
        </Revelar>
        <ListaRevelada className="grid gap-6 sm:grid-cols-2">
          {professores.criterios.map((criterio) => (
            <ItemRevelado key={criterio.titulo} className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <Icone
                  nome="check"
                  className="size-[18px] shrink-0 text-vermelho"
                />
                <h3 className="font-semibold text-marinho">{criterio.titulo}</h3>
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-marinho-600">
                {criterio.texto}
              </p>
            </ItemRevelado>
          ))}
        </ListaRevelada>
      </div>
    </Secao>
  );
}

/* --------------------------------------------------------------------- */

function Depoimentos() {
  if (depoimentos.length === 0) return null;

  return (
    <Secao fundo="claro">
      <Revelar>
        <TituloSecao titulo="O que os alunos contam" centralizado />
      </Revelar>
      <ListaRevelada className="mt-12 grid gap-5 lg:grid-cols-3">
        {depoimentos.map((d) => (
          <ItemRevelado key={d.autor} className="h-full">
            <Card className="flex h-full flex-col gap-4">
              <span
                aria-hidden="true"
                className="text-4xl leading-none text-vermelho"
              >
                &ldquo;
              </span>
              <p className="flex-1 text-pretty leading-relaxed text-marinho-600">
                {d.texto}
              </p>
              <div className="border-t border-marinho/10 pt-4">
                <p className="font-semibold text-marinho">{d.autor}</p>
                <p className="text-sm text-marinho-400">{d.detalhe}</p>
              </div>
            </Card>
          </ItemRevelado>
        ))}
      </ListaRevelada>
    </Secao>
  );
}

/* --------------------------------------------------------------------- */

function PerguntasFrequentes() {
  return (
    <Secao>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Revelar de="esquerda" className="lg:sticky lg:top-28 lg:self-start">
          <TituloSecao
            eyebrow="Dúvidas"
            titulo="Perguntas frequentes"
            texto="Ficou faltando alguma? Chama no WhatsApp que a gente responde."
          />
        </Revelar>
        <Revelar atraso={0.1}>
          <Faq />
        </Revelar>
      </div>
    </Secao>
  );
}

/* --------------------------------------------------------------------- */

export function ChamadaFinal() {
  return (
    <Secao fundo="marinho">
      <Revelar className="flex flex-col items-center gap-7 text-center">
        <TituloSecao
          eyebrow="Comece agora"
          titulo="O melhor jeito de saber se é pra você é assistir uma aula."
          texto="Marque uma aula experimental sem compromisso. Você senta com a turma, ouve o professor estrangeiro e decide depois."
          centralizado
          claro
        />
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Botao
            href={whatsappUrl(
              "Olá! Quero agendar uma aula experimental na Mil Idiomas.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icone nome="whatsapp" className="size-5" />
            Agendar pelo WhatsApp
          </Botao>
          <Botao href="/contato" variante="claro">
            Ver endereço e telefone
          </Botao>
        </div>
      </Revelar>
    </Secao>
  );
}
