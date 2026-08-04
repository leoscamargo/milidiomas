import type { Metadata } from "next";
import { ChamadaFinal } from "@/app/page";
import { Card, Icone, PaginaHero, Secao, TituloSecao } from "@/components/ui";
import { escola, professores } from "@/lib/site";

export const metadata: Metadata = {
  title: "Professores: inglês com quem fala como língua materna",
  description: `Os professores da Mil Idiomas têm fluência total, vivência no exterior e formação em línguas e educação. Americanos em sala, em ${escola.cidade}/${escola.estado}.`,
  alternates: { canonical: "/professores" },
};

export default function PaginaProfessores() {
  return (
    <>
      <PaginaHero
        eyebrow="Professores"
        titulo="O sotaque que você vai aprender é o de quem cresceu falando inglês."
        texto={professores.intro}
      />

      <Secao>
        <TituloSecao
          eyebrow="Critérios"
          titulo="Quem entra em sala aqui"
          texto="Não basta ter certificado na parede. Estes são os quatro filtros que a escola aplica antes de colocar um professor na frente de uma turma."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {professores.criterios.map((criterio) => (
            <Card key={criterio.titulo} className="flex flex-col gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-marinho-50 text-marinho">
                <Icone nome="check" className="size-5" />
              </span>
              <h3 className="text-lg font-semibold text-marinho">
                {criterio.titulo}
              </h3>
              <p className="leading-relaxed text-marinho-600">
                {criterio.texto}
              </p>
            </Card>
          ))}
        </div>
      </Secao>

      <Secao fundo="marinho">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <TituloSecao
            eyebrow="Na prática"
            titulo="O que muda quando o professor é estrangeiro"
            claro
          />
          <ul className="flex flex-col gap-6">
            <li>
              <h3 className="font-semibold text-white">
                Você ouve o inglês real, não o inglês de livro
              </h3>
              <p className="mt-1.5 leading-relaxed text-marinho-200">
                A velocidade, a gíria, o jeito de encurtar as palavras na fala.
                Nada disso está escrito em lugar nenhum. Se aprende ouvindo
                quem fala assim desde criança.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">
                A correção vem no momento certo
              </h3>
              <p className="mt-1.5 leading-relaxed text-marinho-200">
                Pronúncia errada repetida por seis meses vira hábito, e hábito é
                difícil de desfazer. O professor nativo escuta o desvio na
                primeira vez e ajusta ali.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">
                Seu ouvido treina desde a primeira aula
              </h3>
              <p className="mt-1.5 leading-relaxed text-marinho-200">
                Quem só ouve professor brasileiro trava quando encontra um
                estrangeiro de verdade. Aqui esse encontro é a aula, não o susto
                depois dela.
              </p>
            </li>
          </ul>
        </div>
      </Secao>

      <Secao fundo="claro">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <TituloSecao
            eyebrow="Conheça pessoalmente"
            titulo="A melhor apresentação é uma aula"
            texto="Marque uma aula experimental e veja como é uma turma da Mil Idiomas por dentro, com o professor em sala, no horário que funciona pra você."
            centralizado
          />
        </div>
      </Secao>

      <ChamadaFinal />
    </>
  );
}
