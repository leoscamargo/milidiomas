import type { Metadata } from "next";
import { ChamadaFinal } from "@/app/page";
import { Botao, Container, Icone, PaginaHero, Secao } from "@/components/ui";
import { SITE_URL, cursos, escola, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Cursos de inglês em ${escola.cidade} para crianças, adolescentes e adultos`,
  description: `Turmas de inglês para crianças a partir de 7 anos, adolescentes, adultos, aula particular VIP e conversação. Professor estrangeiro em sala, em ${escola.cidade}/${escola.estado}.`,
  alternates: { canonical: "/cursos" },
};

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: cursos.map((curso, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: curso.nome,
      description: curso.resumo,
      url: `${SITE_URL}/cursos#${curso.slug}`,
      inLanguage: "pt-BR",
      teaches: "Língua inglesa",
      provider: {
        "@type": "LanguageSchool",
        name: escola.nome,
        sameAs: SITE_URL,
      },
    },
  })),
};

export default function PaginaCursos() {
  return (
    <>
      <PaginaHero
        eyebrow="Cursos"
        titulo="Inglês para cada fase e para cada rotina"
        texto="Todas as turmas seguem o mesmo método e têm contato com professor estrangeiro. O que muda é o ritmo, o material e o jeito de conduzir a aula."
      >
        <nav aria-label="Ir para um curso" className="flex flex-wrap gap-2 pt-2">
          {cursos.map((curso) => (
            <a
              key={curso.slug}
              href={`#${curso.slug}`}
              className="rounded-full border border-marinho/20 bg-white px-4 py-2 text-sm font-medium text-marinho transition-colors hover:border-vermelho hover:text-vermelho"
            >
              {curso.nome}
            </a>
          ))}
        </nav>
      </PaginaHero>

      <Container>
        <div className="flex flex-col divide-y divide-marinho/[0.12] py-6">
          {cursos.map((curso) => (
            <article
              key={curso.slug}
              id={curso.slug}
              className="grid scroll-mt-28 gap-8 py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16 sm:py-16"
            >
              <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
                <span className="inline-flex w-fit items-center rounded-full bg-vermelho-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-vermelho">
                  {curso.publico}
                </span>
                <h2 className="text-3xl font-bold tracking-[-0.02em] text-marinho">
                  {curso.nome}
                </h2>
                <p className="text-sm font-medium text-marinho-400">
                  {curso.idade}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-pretty text-[1.0625rem] leading-relaxed text-marinho-600">
                  {curso.resumo}
                </p>

                <ul className="flex flex-col gap-3">
                  {curso.destaques.map((destaque) => (
                    <li key={destaque} className="flex gap-3">
                      <Icone
                        nome="check"
                        className="mt-0.5 size-[18px] shrink-0 text-vermelho"
                      />
                      <span className="text-marinho-600">{destaque}</span>
                    </li>
                  ))}
                </ul>

                <Botao
                  href={whatsappUrl(
                    `Olá! Quero saber mais sobre o curso ${curso.nome} da Mil Idiomas.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start"
                >
                  <Icone nome="whatsapp" className="size-5" />
                  Falar sobre o {curso.nome}
                </Botao>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <Secao fundo="claro">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-marinho sm:text-3xl">
            Não sabe em qual turma você entra?
          </h2>
          <div className="flex flex-col gap-5">
            <p className="text-pretty leading-relaxed text-marinho-600">
              Quem nunca estudou inglês começa do zero, sem teste nenhum. Quem
              já estudou antes, seja na escola, em outro curso ou por conta,
              faz um teste de nível rápido na secretaria e entra direto na turma
              certa, sem repetir o que já sabe.
            </p>
            <Botao
              href={whatsappUrl(
                "Olá! Já estudei inglês antes e queria fazer o teste de nível na Mil Idiomas.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              variante="secundario"
              className="self-start"
            >
              Agendar teste de nível
            </Botao>
          </div>
        </div>
      </Secao>

      <ChamadaFinal />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />
    </>
  );
}
