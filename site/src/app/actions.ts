"use server";

import {
  emailValido,
  enviarEmail,
  limpar,
  verificarCaptcha,
} from "@/lib/leads";
import { nivelPorRespostas } from "@/lib/teste-nivel";

/* Ações de formulário. Rodam no servidor — o segredo do hCaptcha e a chave de
   e-mail nunca chegam ao navegador. */

export type EstadoFormulario = {
  status: "inicial" | "ok" | "erro";
  mensagem?: string;
  campo?: string;
};

const ERRO_ENVIO =
  "Não conseguimos enviar sua mensagem agora. Chame a gente no WhatsApp que respondemos na hora.";

/* --------------------------------------------------------------------------- */

export async function enviarContato(
  _anterior: EstadoFormulario,
  formData: FormData,
): Promise<EstadoFormulario> {
  const nome = limpar(formData.get("nome"), 120);
  const email = limpar(formData.get("email"), 160);
  const telefone = limpar(formData.get("telefone"), 40);
  const assunto = limpar(formData.get("assunto"), 80);
  const mensagem = limpar(formData.get("mensagem"), 2000);
  const captcha = limpar(formData.get("h-captcha-response"), 5000);

  if (nome.length < 2) {
    return { status: "erro", mensagem: "Escreva seu nome.", campo: "nome" };
  }
  if (!emailValido(email)) {
    return {
      status: "erro",
      mensagem: "Confira o e-mail, parece que falta alguma coisa.",
      campo: "email",
    };
  }
  if (telefone.replace(/\D/g, "").length < 10) {
    return {
      status: "erro",
      mensagem: "Coloque um telefone com DDD.",
      campo: "telefone",
    };
  }
  if (mensagem.length < 5) {
    return {
      status: "erro",
      mensagem: "Conte pra gente o que você precisa.",
      campo: "mensagem",
    };
  }

  if (!(await verificarCaptcha(captcha))) {
    return {
      status: "erro",
      mensagem: "Marque a verificação de segurança antes de enviar.",
      campo: "captcha",
    };
  }

  const resultado = await enviarEmail({
    assunto: `Fale conosco: ${nome}`,
    responderPara: email,
    linhas: [
      { rotulo: "Nome", valor: nome },
      { rotulo: "E-mail", valor: email },
      { rotulo: "Telefone", valor: telefone },
      { rotulo: "Assunto", valor: assunto },
      { rotulo: "Mensagem", valor: mensagem },
    ],
  });

  if (!resultado.ok) return { status: "erro", mensagem: ERRO_ENVIO };

  return {
    status: "ok",
    mensagem: "Mensagem enviada. A gente responde em breve.",
  };
}

/* --------------------------------------------------------------------------- */

/** Passo 1 do teste: guarda o lead antes de o visitante começar a responder. */
export async function registrarLeadTeste(
  _anterior: EstadoFormulario,
  formData: FormData,
): Promise<EstadoFormulario> {
  const nome = limpar(formData.get("nome"), 120);
  const email = limpar(formData.get("email"), 160);
  const telefone = limpar(formData.get("telefone"), 40);
  const quem = limpar(formData.get("quem"), 60);
  const captcha = limpar(formData.get("h-captcha-response"), 5000);

  if (nome.length < 2) {
    return { status: "erro", mensagem: "Escreva seu nome.", campo: "nome" };
  }
  if (!emailValido(email)) {
    return {
      status: "erro",
      mensagem: "Confira o e-mail, parece que falta alguma coisa.",
      campo: "email",
    };
  }
  if (telefone.replace(/\D/g, "").length < 10) {
    return {
      status: "erro",
      mensagem: "Coloque um telefone com DDD.",
      campo: "telefone",
    };
  }

  if (!(await verificarCaptcha(captcha))) {
    return {
      status: "erro",
      mensagem: "Marque a verificação de segurança antes de continuar.",
      campo: "captcha",
    };
  }

  const resultado = await enviarEmail({
    assunto: `Teste de nível iniciado: ${nome}`,
    responderPara: email,
    linhas: [
      { rotulo: "Nome", valor: nome },
      { rotulo: "E-mail", valor: email },
      { rotulo: "Telefone", valor: telefone },
      { rotulo: "Vai estudar", valor: quem },
      { rotulo: "Situação", valor: "Começou o teste de nível" },
    ],
  });

  // Se o e-mail falhar, o visitante ainda faz o teste — o lead vai pro log do
  // servidor para não sumir, e o erro fica visível pra quem cuida do site.
  if (!resultado.ok) {
    console.error("[lead-teste] não enviado:", { nome, email, telefone, quem });
  }

  return { status: "ok" };
}

/** Passo 3 do teste: manda o resultado junto com o contato do visitante. */
export async function registrarResultadoTeste(
  dados: { nome: string; email: string; telefone: string; quem: string },
  respostas: number[],
): Promise<void> {
  const resultado = nivelPorRespostas(respostas);

  await enviarEmail({
    assunto: `Resultado do teste de ${dados.nome}: ${resultado.nivel}`,
    responderPara: dados.email,
    linhas: [
      { rotulo: "Nome", valor: dados.nome },
      { rotulo: "E-mail", valor: dados.email },
      { rotulo: "Telefone", valor: dados.telefone },
      { rotulo: "Vai estudar", valor: dados.quem },
      { rotulo: "Nível", valor: `${resultado.nivel}: ${resultado.titulo}` },
      { rotulo: "Acertos", valor: `${resultado.acertos} de ${resultado.total}` },
      { rotulo: "Turma indicada", valor: resultado.cursoIndicado },
    ],
  });
}
