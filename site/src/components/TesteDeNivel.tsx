"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  registrarLeadTeste,
  registrarResultadoTeste,
  type EstadoFormulario,
} from "@/app/actions";
import { CTA_PADRAO, whatsappUrl } from "@/lib/site";
import { nivelPorRespostas, perguntas, type Nivel } from "@/lib/teste-nivel";
import { HCaptcha, reiniciarCaptcha } from "./HCaptcha";
import { Girando } from "./FormularioContato";
import { Campo, campoClasse, campoComErro } from "./campos";
import { Botao, Icone } from "./ui";

/* ---------------------------------------------------------------------------
   Três passos: dados → perguntas → resultado.

   Os dados vêm antes das perguntas de propósito: é assim que a escola fica
   com o contato mesmo de quem desiste no meio do teste.
   --------------------------------------------------------------------------- */

type Dados = { nome: string; email: string; telefone: string; quem: string };

const ESTADO_INICIAL: EstadoFormulario = { status: "inicial" };

export function TesteDeNivel() {
  const [dados, setDados] = useState<Dados | null>(null);
  const [respostas, setRespostas] = useState<number[]>([]);
  const topo = useRef<HTMLDivElement>(null);

  // Cada etapa é mais curta que a anterior; sem isso o visitante trocaria de
  // passo e continuaria olhando o rodapé.
  const irParaOTopo = () => {
    topo.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topo} className="scroll-mt-28">
      {!dados ? (
        <PassoDados
          aoConcluir={(d) => {
            setDados(d);
            irParaOTopo();
          }}
        />
      ) : respostas.length < perguntas.length ? (
        <PassoPerguntas
          nome={dados.nome}
          aoConcluir={(r) => {
            setRespostas(r);
            irParaOTopo();
            // Não segura a tela de resultado se o e-mail demorar ou falhar.
            void registrarResultadoTeste(dados, r).catch(() => {});
          }}
        />
      ) : (
        <PassoResultado dados={dados} respostas={respostas} />
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------- */

function PassoDados({ aoConcluir }: { aoConcluir: (d: Dados) => void }) {
  const [estado, acao, enviando] = useActionState(
    registrarLeadTeste,
    ESTADO_INICIAL,
  );
  const [rascunho, setRascunho] = useState<Dados>({
    nome: "",
    email: "",
    telefone: "",
    quem: "Para mim",
  });

  useEffect(() => {
    if (estado.status === "erro") reiniciarCaptcha();
    if (estado.status === "ok") aoConcluir(rascunho);
    // `rascunho` muda a cada tecla; só interessa o valor no momento do "ok".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  const erroDe = (campo: string) =>
    estado.status === "erro" && estado.campo === campo
      ? estado.mensagem
      : undefined;

  const atualizar = (campo: keyof Dados) => (valor: string) =>
    setRascunho((r) => ({ ...r, [campo]: valor }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-xl rounded-card border border-marinho/[0.15] bg-white p-7 shadow-media sm:p-9"
    >
      <h2 className="text-2xl font-bold tracking-[-0.02em] text-marinho">
        Antes de começar
      </h2>
      <p className="mt-2 leading-relaxed text-marinho-600">
        Precisamos de um contato para te mandar o resultado e indicar a turma
        certa. São 20 perguntas, leva uns 5 minutos.
      </p>

      <form action={acao} className="mt-7 flex flex-col gap-5">
        <Campo id="t-nome" rotulo="Seu nome" erro={erroDe("nome")}>
          <input
            id="t-nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            value={rascunho.nome}
            onChange={(e) => atualizar("nome")(e.target.value)}
            placeholder="Como podemos te chamar?"
            className={`${campoClasse} ${erroDe("nome") ? campoComErro : ""}`}
          />
        </Campo>

        <Campo id="t-email" rotulo="E-mail" erro={erroDe("email")}>
          <input
            id="t-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={rascunho.email}
            onChange={(e) => atualizar("email")(e.target.value)}
            placeholder="voce@email.com"
            className={`${campoClasse} ${erroDe("email") ? campoComErro : ""}`}
          />
        </Campo>

        <Campo id="t-telefone" rotulo="Telefone" erro={erroDe("telefone")}>
          <input
            id="t-telefone"
            name="telefone"
            type="tel"
            required
            autoComplete="tel"
            value={rascunho.telefone}
            onChange={(e) => atualizar("telefone")(e.target.value)}
            placeholder="(51) 99999-9999"
            className={`${campoClasse} ${erroDe("telefone") ? campoComErro : ""}`}
          />
        </Campo>

        <Campo id="t-quem" rotulo="O curso é para quem?">
          <select
            id="t-quem"
            name="quem"
            value={rascunho.quem}
            onChange={(e) => atualizar("quem")(e.target.value)}
            className={campoClasse}
          >
            <option>Para mim</option>
            <option>Para meu filho ou filha</option>
            <option>Para outra pessoa</option>
          </select>
        </Campo>

        <HCaptcha />

        {estado.status === "erro" && estado.campo === "captcha" ? (
          <p role="alert" className="text-sm font-medium text-vermelho">
            {estado.mensagem}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={enviando}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-vermelho px-6 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_4px_16px_rgba(234,25,30,0.25)] transition-colors hover:bg-vermelho-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? (
            <>
              <Girando />
              Preparando o teste...
            </>
          ) : (
            <>
              Começar o teste
              <Icone nome="seta" className="size-4" />
            </>
          )}
        </button>

        <p className="text-sm leading-relaxed text-marinho-400">
          Seus dados são usados só para a escola falar com você sobre o
          resultado. O teste é gratuito e não gera compromisso.
        </p>
      </form>
    </motion.div>
  );
}

/* --------------------------------------------------------------------------- */

function PassoPerguntas({
  nome,
  aoConcluir,
}: {
  nome: string;
  aoConcluir: (respostas: number[]) => void;
}) {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [selecionada, setSelecionada] = useState<number | null>(null);

  const pergunta = perguntas[indice];
  const progresso = (indice / perguntas.length) * 100;

  const avancar = (escolha: number) => {
    const novas = [...respostas, escolha];
    setRespostas(novas);
    setSelecionada(null);

    if (novas.length === perguntas.length) aoConcluir(novas);
    else setIndice((i) => i + 1);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p className="text-sm font-medium text-marinho-600">
            Pergunta {indice + 1} de {perguntas.length}
          </p>
          <span className="rounded-full bg-marinho-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-marinho-400">
            Nível {pergunta.nivel}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={indice + 1}
          aria-valuemin={1}
          aria-valuemax={perguntas.length}
          aria-label="Progresso do teste"
          className="h-2 w-full overflow-hidden rounded-full bg-marinho-100"
        >
          <motion.div
            className="h-full rounded-full bg-vermelho"
            initial={false}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-card border border-marinho/[0.15] bg-white p-7 shadow-media sm:p-9"
        >
          <p
            lang="en"
            className="text-balance text-xl font-semibold leading-snug text-marinho sm:text-2xl"
          >
            {pergunta.enunciado}
          </p>

          <div className="mt-7 flex flex-col gap-3">
            {pergunta.opcoes.map((opcao, i) => {
              const ativa = selecionada === i;
              return (
                <button
                  key={opcao}
                  type="button"
                  lang="en"
                  onClick={() => setSelecionada(i)}
                  className={`flex items-center gap-3.5 rounded-[10px] border px-5 py-4 text-left text-[1.0625rem] transition-colors ${
                    ativa
                      ? "border-vermelho bg-vermelho-50 text-marinho"
                      : "border-marinho/20 text-marinho-600 hover:border-marinho/40 hover:bg-marinho-50"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      ativa ? "border-vermelho" : "border-marinho/25"
                    }`}
                  >
                    {ativa ? (
                      <motion.span
                        layoutId="marcador"
                        className="size-2.5 rounded-full bg-vermelho"
                      />
                    ) : null}
                  </span>
                  {opcao}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-marinho-400">
              {nome ? `Vamos lá, ${nome.split(" ")[0]}.` : ""}
            </p>
            <button
              type="button"
              disabled={selecionada === null}
              onClick={() => selecionada !== null && avancar(selecionada)}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-vermelho px-6 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-vermelho-700 disabled:cursor-not-allowed disabled:bg-marinho-200"
            >
              {indice + 1 === perguntas.length ? "Ver resultado" : "Próxima"}
              <Icone nome="seta" className="size-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-6 text-center text-sm text-marinho-400">
        Não vale consultar tradutor. O resultado só ajuda se for o seu inglês
        de verdade.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------- */

const CORES_FAIXA: Record<Nivel, string> = {
  A1: "bg-marinho-200",
  A2: "bg-marinho-400",
  B1: "bg-marinho-600",
  B2: "bg-marinho",
  C1: "bg-vermelho",
};

function PassoResultado({
  dados,
  respostas,
}: {
  dados: Dados;
  respostas: number[];
}) {
  const resultado = nivelPorRespostas(respostas);
  const primeiroNome = dados.nome.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-2xl"
    >
      <div className="overflow-hidden rounded-card border border-marinho/[0.15] bg-white shadow-media">
        <div className="relative overflow-hidden bg-marinho px-7 py-10 text-center sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full border-[3px] border-white/10"
          />
          <p className="relative text-sm font-medium text-marinho-200">
            {primeiroNome}, seu nível é
          </p>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-2 text-6xl font-extrabold tracking-tight text-white sm:text-7xl"
          >
            {resultado.nivel}
          </motion.p>
          <p className="relative mt-2 text-lg font-semibold text-vermelho-200">
            {resultado.titulo}
          </p>
          <p className="relative mt-4 text-sm text-marinho-200">
            {resultado.acertos} acertos de {resultado.total} perguntas
          </p>
        </div>

        <div className="flex flex-col gap-7 p-7 sm:p-9">
          <p className="text-pretty leading-relaxed text-marinho-600">
            {resultado.texto}
          </p>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-marinho-400">
              Como você foi em cada faixa
            </h3>
            <div className="flex flex-col gap-3">
              {resultado.porFaixa.map((faixa, i) => (
                <div key={faixa.nivel} className="flex items-center gap-3.5">
                  <span className="w-7 shrink-0 text-sm font-semibold text-marinho">
                    {faixa.nivel}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-marinho-100">
                    <motion.div
                      className={`h-full rounded-full ${CORES_FAIXA[faixa.nivel]}`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(faixa.acertos / faixa.total) * 100}%`,
                      }}
                      transition={{
                        delay: 0.3 + i * 0.1,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-sm tabular-nums text-marinho-400">
                    {faixa.acertos}/{faixa.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[10px] border border-marinho/15 bg-marinho-50 p-5">
            <h3 className="font-semibold text-marinho">
              Turma indicada para você
            </h3>
            <p className="mt-1 text-lg font-bold text-vermelho">
              {resultado.cursoIndicado}
            </p>
            <Link
              href={`/cursos#${resultado.cursoSlug}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-marinho transition-colors hover:text-vermelho"
            >
              Ver detalhes da turma
              <Icone nome="seta" className="size-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Botao
              href={whatsappUrl(
                `Olá! Fiz o teste de nível no site e deu ${resultado.nivel}. Quero saber mais sobre a turma de ${resultado.cursoIndicado}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Icone nome="whatsapp" className="size-5" />
              Falar sobre essa turma
            </Botao>
            <Botao href="/metodologia" variante="secundario" className="flex-1">
              Conhecer o método
            </Botao>
          </div>

          <p className="border-t border-marinho/10 pt-5 text-sm leading-relaxed text-marinho-400">
            Esse teste dá uma boa estimativa, mas quem confirma o nível é a
            professora, numa conversa rápida na escola. Leva 10 minutos e não
            custa nada.{" "}
            <a
              href={whatsappUrl(CTA_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-marinho underline underline-offset-2"
            >
              Agendar
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
