import type { Metadata } from "next";
import { ChamadaFinal } from "@/app/page";
import { Card, Icone, PaginaHero, Secao, TituloSecao } from "@/components/ui";
import { escola, escolaSobre, numeros } from "@/lib/site";

export const metadata: Metadata = {
  title: `A escola: Mil Idiomas em ${escola.cidade} desde ${escola.fundacao}`,
  description: `A Mil Idiomas abriu em 12 de maio de ${escola.fundacao}, no Centro de ${escola.cidade}. Conheça a história, a missão e a visão da escola.`,
  alternates: { canonical: "/a-escola" },
};

export default function PaginaEscola() {
  return (
    <>
      <PaginaHero
        eyebrow="A escola"
        titulo={`Há ${escola.anosDeCasa} anos no Centro de ${escola.cidade}.`}
        texto={escolaSobre.historia[0]}
      />

      <Secao>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <TituloSecao eyebrow="História" titulo="Como a Mil Idiomas começou" />
            {escolaSobre.historia.map((paragrafo) => (
              <p
                key={paragrafo.slice(0, 40)}
                className="text-pretty text-[1.0625rem] leading-relaxed text-marinho-600"
              >
                {paragrafo}
              </p>
            ))}
          </div>

          <dl className="grid grid-cols-2 gap-5 self-start">
            {numeros.map((n) => (
              <Card key={n.rotulo} className="flex flex-col gap-1 p-6">
                <dt className="sr-only">{n.rotulo}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold leading-none text-vermelho">
                    {n.valor}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-marinho">
                    {n.rotulo}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-marinho-400">
                    {n.detalhe}
                  </span>
                </dd>
              </Card>
            ))}
          </dl>
        </div>
      </Secao>

      <Secao fundo="marinho">
        <TituloSecao
          eyebrow="O que nos move"
          titulo="Negócio, missão e visão"
          claro
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {[
            { rotulo: "Negócio", texto: escolaSobre.negocio },
            { rotulo: "Missão", texto: escolaSobre.missao },
            { rotulo: "Visão", texto: escolaSobre.visao },
          ].map((item) => (
            <div
              key={item.rotulo}
              className="flex flex-col gap-3 border-t-2 border-vermelho pt-6"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-vermelho">
                {item.rotulo}
              </h3>
              <p className="text-pretty text-lg font-medium leading-snug text-white">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </Secao>

      <Secao fundo="claro">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <TituloSecao
            eyebrow="Escola de bairro"
            titulo="Pequena o bastante para saber o nome de cada aluno"
            texto="Não somos uma rede com central de atendimento em outro estado. Quem responde o WhatsApp é quem te recebe na porta, e quem te recebe na porta conhece a sua turma."
          />
          <ul className="flex flex-col gap-6">
            {[
              {
                titulo: "Atendimento olho no olho",
                texto:
                  "Matrícula, dúvida de horário, boleto atrasado: tudo se resolve com a secretaria, pessoalmente ou por WhatsApp, sem protocolo e sem espera.",
              },
              {
                titulo: "No Centro, fácil de chegar",
                texto: `${escola.endereco.rua}, ${escola.endereco.bairro}. Perto do comércio, com horário de manhã, tarde e noite para caber na sua rotina.`,
              },
              {
                titulo: "Turmas que se conhecem",
                texto:
                  "Grupo pequeno, mesma faixa de idade, todo mundo falando em toda aula. Ninguém fica sentado ouvindo os outros aprenderem.",
              },
            ].map((item) => (
              <li key={item.titulo} className="flex gap-3.5">
                <Icone
                  nome="check"
                  className="mt-1 size-[18px] shrink-0 text-vermelho"
                />
                <div>
                  <h3 className="font-semibold text-marinho">{item.titulo}</h3>
                  <p className="mt-1 leading-relaxed text-marinho-600">
                    {item.texto}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Secao>

      <ChamadaFinal />
    </>
  );
}
