"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";
import { enviarContato, type EstadoFormulario } from "@/app/actions";
import { CTA_PADRAO, cursos, whatsappUrl } from "@/lib/site";
import { HCaptcha, reiniciarCaptcha } from "./HCaptcha";
import { Campo, campoClasse, campoComErro } from "./campos";
import { Icone } from "./ui";

const ESTADO_INICIAL: EstadoFormulario = { status: "inicial" };

const assuntos = [
  "Quero me matricular",
  "Quero uma aula experimental",
  "Dúvida sobre horários",
  "Dúvida sobre valores",
  "Sou aluno e preciso de ajuda",
  "Outro assunto",
];

export function FormularioContato() {
  const [estado, acao, enviando] = useActionState(
    enviarContato,
    ESTADO_INICIAL,
  );

  /* Campos controlados de propósito: o React limpa formulário não controlado
     assim que a ação termina, e aí um erro de validação apagaria tudo que a
     pessoa escreveu. */
  const [valores, setValores] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: assuntos[0],
    mensagem: "",
  });

  const mudar =
    (campo: keyof typeof valores) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValores((v) => ({ ...v, [campo]: e.target.value }));

  // Um desafio do hCaptcha só vale uma vez: depois de tentar, precisa de outro.
  useEffect(() => {
    if (estado.status === "erro") reiniciarCaptcha();
  }, [estado]);

  if (estado.status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-start gap-4 rounded-[10px] border border-marinho/15 bg-marinho-50 p-6"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-vermelho text-white">
          <Icone nome="check" className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-marinho">
            Mensagem enviada!
          </h3>
          <p className="mt-1 leading-relaxed text-marinho-600">
            A secretaria recebe e responde em breve. Se for urgente, chama no
            WhatsApp que é mais rápido.
          </p>
        </div>
        <a
          href={whatsappUrl(CTA_PADRAO)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-vermelho transition-colors hover:text-vermelho-700"
        >
          <Icone nome="whatsapp" className="size-[18px]" />
          Falar no WhatsApp
        </a>
      </motion.div>
    );
  }

  const erroDe = (campo: string) =>
    estado.status === "erro" && estado.campo === campo
      ? estado.mensagem
      : undefined;

  return (
    <form action={acao} className="flex flex-col gap-5">
      <Campo id="nome" rotulo="Seu nome" erro={erroDe("nome")}>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          value={valores.nome}
          onChange={mudar("nome")}
          placeholder="Como podemos te chamar?"
          className={`${campoClasse} ${erroDe("nome") ? campoComErro : ""}`}
        />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="email" rotulo="E-mail" erro={erroDe("email")}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={valores.email}
            onChange={mudar("email")}
            placeholder="voce@email.com"
            className={`${campoClasse} ${erroDe("email") ? campoComErro : ""}`}
          />
        </Campo>

        <Campo id="telefone" rotulo="Telefone" erro={erroDe("telefone")}>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            required
            autoComplete="tel"
            value={valores.telefone}
            onChange={mudar("telefone")}
            placeholder="(51) 99999-9999"
            className={`${campoClasse} ${erroDe("telefone") ? campoComErro : ""}`}
          />
        </Campo>
      </div>

      <Campo id="assunto" rotulo="Assunto">
        <select
          id="assunto"
          name="assunto"
          value={valores.assunto}
          onChange={mudar("assunto")}
          className={campoClasse}
        >
          {assuntos.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
          {cursos.map((c) => (
            <option key={c.slug} value={`Interesse no curso ${c.nome}`}>
              Interesse no {c.nome}
            </option>
          ))}
        </select>
      </Campo>

      <Campo id="mensagem" rotulo="Mensagem" erro={erroDe("mensagem")}>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          required
          value={valores.mensagem}
          onChange={mudar("mensagem")}
          placeholder="Conte o que você precisa saber."
          className={`${campoClasse} resize-y ${erroDe("mensagem") ? campoComErro : ""}`}
        />
      </Campo>

      <HCaptcha />

      <AnimatePresence>
        {estado.status === "erro" && !estado.campo ? (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-[10px] border border-vermelho/25 bg-vermelho-50 px-4 py-3 text-sm leading-relaxed text-marinho"
          >
            {estado.mensagem}{" "}
            <a
              href={whatsappUrl(CTA_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-vermelho underline underline-offset-2"
            >
              Abrir o WhatsApp
            </a>
          </motion.p>
        ) : null}
      </AnimatePresence>

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
            Enviando...
          </>
        ) : (
          "Enviar mensagem"
        )}
      </button>

      <p className="text-sm leading-relaxed text-marinho-400">
        Seus dados são usados só para a escola te responder.
      </p>
    </form>
  );
}

export function Girando() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
    />
  );
}
