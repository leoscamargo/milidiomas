import type { Metadata } from "next";
import { TesteDeNivel } from "@/components/TesteDeNivel";
import { Container, Eyebrow, Icone } from "@/components/ui";
import { escola } from "@/lib/site";
import { perguntas } from "@/lib/teste-nivel";

export const metadata: Metadata = {
  title: "Teste de nível de inglês grátis",
  description: `Descubra seu nível de inglês em 5 minutos. ${perguntas.length} perguntas do básico ao avançado, resultado pelo Quadro Europeu (A1 a C1) e a turma indicada na Mil Idiomas, em ${escola.cidade}/${escola.estado}.`,
  alternates: { canonical: "/teste-de-nivel" },
};

const comoFunciona = [
  {
    icone: "pessoas" as const,
    titulo: "Deixe seu contato",
    texto: "Para a escola te mandar o resultado e indicar a turma certa.",
  },
  {
    icone: "repeticao" as const,
    titulo: `Responda ${perguntas.length} perguntas`,
    texto: "Do básico ao avançado, uma de cada vez. Leva uns 5 minutos.",
  },
  {
    icone: "check" as const,
    titulo: "Veja seu nível",
    texto: "Resultado de A1 a C1 e a turma da Mil Idiomas que combina com ele.",
  },
];

export default function PaginaTesteDeNivel() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-marinho/[0.12] bg-marinho-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 hidden size-[420px] rounded-full border-[3px] border-vermelho/10 lg:block"
        />
        <Container className="relative">
          <div className="flex max-w-3xl flex-col gap-5 py-12 sm:py-16">
            <Eyebrow>Teste grátis</Eyebrow>
            <h1 className="text-balance text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-marinho sm:text-[2.75rem]">
              Qual é o seu nível de inglês, de verdade?
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-marinho-600">
              Muita gente estuda anos e não sabe dizer em que ponto está. Em 5
              minutos você descobre, e sai daqui sabendo qual turma faz sentido
              começar.
            </p>

            <ul className="mt-2 grid gap-5 sm:grid-cols-3">
              {comoFunciona.map((passo, i) => (
                <li key={passo.titulo} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-vermelho text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <Icone
                      nome={passo.icone}
                      className="size-[18px] text-marinho-400"
                    />
                  </div>
                  <h2 className="font-semibold text-marinho">{passo.titulo}</h2>
                  <p className="text-[0.9375rem] leading-relaxed text-marinho-600">
                    {passo.texto}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-12 sm:py-16">
          <TesteDeNivel />
        </div>
      </Container>
    </>
  );
}
