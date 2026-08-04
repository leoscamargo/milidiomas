import type { Metadata } from "next";
import { ChamadaFinal } from "@/app/page";
import { Card, Icone, PaginaHero, Secao, TituloSecao } from "@/components/ui";
import { escola, metodologia } from "@/lib/site";

export const metadata: Metadata = {
  title: "Metodologia: Sistema Natural Mnemotécnico",
  description:
    "Como a Mil Idiomas ensina inglês: mnemotécnica, neurolinguística e repetição guiada. Livro ilustrado, áudio sincronizado e professor estrangeiro em sala, do primeiro dia à fluência.",
  alternates: { canonical: "/metodologia" },
};

export default function PaginaMetodologia() {
  return (
    <>
      <PaginaHero
        eyebrow="Metodologia"
        titulo="Você já aprendeu um idioma difícil sem estudar gramática."
        texto="Chama-se português. Ninguém sentou com você aos dois anos para explicar conjugação. Você ouviu, repetiu e associou até virar automático. O Sistema Natural Mnemotécnico refaz esse caminho, agora em inglês."
      />

      <Secao>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <TituloSecao
              eyebrow="Os quatro pilares"
              titulo="Como a aula funciona na prática"
              texto={metodologia.intro}
            />
          </div>

          <ol className="flex flex-col gap-5">
            {metodologia.pilares.map((pilar, i) => (
              <Card key={pilar.titulo} className="flex gap-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-marinho text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-marinho">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-marinho-600">
                    {pilar.texto}
                  </p>
                </div>
              </Card>
            ))}
          </ol>
        </div>
      </Secao>

      <Secao fundo="marinho">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="text-5xl leading-none text-vermelho" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="text-balance text-2xl font-bold leading-snug text-white sm:text-[2rem]">
            {metodologia.frase}
          </blockquote>
          <p className="text-pretty leading-relaxed text-marinho-200">
            Não é decoreba. É repetição espaçada: a mesma estrutura volta em
            contextos diferentes até descer do consciente para o automático, o
            ponto em que você responde em inglês sem traduzir na cabeça antes.
          </p>
        </div>
      </Secao>

      <Secao fundo="claro">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <TituloSecao
              eyebrow="Material"
              titulo="O que vem junto com o curso"
              texto="Cinco livros ilustrados, um para cada etapa. O áudio acompanha a imagem: você ouve a frase enquanto olha a cena, e o sentido gruda sem passar pelo português."
            />
            <ul className="flex flex-col gap-3.5">
              {metodologia.material.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icone
                    nome="check"
                    className="mt-0.5 size-[18px] shrink-0 text-vermelho"
                  />
                  <span className="text-marinho-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <Card className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-marinho">
                E o professor estrangeiro, onde entra?
              </h3>
              <p className="leading-relaxed text-marinho-600">
                No lugar que o material não alcança. O livro te dá a estrutura;
                o professor te dá o ouvido treinado que percebe o erro de
                pronúncia no meio da frase e corrige ali, antes de virar vício.
                É a diferença entre saber inglês e ser entendido em inglês.
              </p>
            </Card>
            <Card className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-marinho">
                Quanto tempo até falar?
              </h3>
              <p className="leading-relaxed text-marinho-600">
                O curso completo leva cerca de dois anos até a fluência, para
                quem acompanha as aulas e ouve os áudios em casa. Frases simples
                aparecem já nas primeiras semanas. A conversa começa muito
                antes do certificado.
              </p>
            </Card>
          </div>
        </div>
      </Secao>

      <Secao>
        <div className="mx-auto flex max-w-3xl flex-col gap-5 text-center">
          <TituloSecao
            eyebrow={`Desde ${escola.fundacao}`}
            titulo="Um método com 44 anos de estrada"
            texto="O Sistema Natural Mnemotécnico não nasceu ontem nem é modismo de aplicativo. É um método com décadas de uso em sala, que a Mil Idiomas aplica em Campo Bom desde 2005."
            centralizado
          />
        </div>
      </Secao>

      <ChamadaFinal />
    </>
  );
}
