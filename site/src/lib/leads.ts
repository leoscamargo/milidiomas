import "server-only";

/* ---------------------------------------------------------------------------
   Recebimento de leads — verificação do hCaptcha e envio por e-mail.

   Variáveis de ambiente (ver .env.example):

     NEXT_PUBLIC_HCAPTCHA_SITE_KEY   chave pública, aparece no navegador
     HCAPTCHA_SECRET                 chave secreta, só no servidor
     RESEND_API_KEY                  conta do Resend, para disparar o e-mail
     LEAD_EMAIL_TO                   para onde o lead é enviado
     LEAD_EMAIL_FROM                 remetente verificado no Resend

   Sem RESEND_API_KEY o envio falha de propósito e o site oferece o WhatsApp
   como saída. É melhor avisar que não deu do que engolir um lead em silêncio.
   --------------------------------------------------------------------------- */

export type ResultadoEnvio =
  | { ok: true }
  | { ok: false; motivo: "captcha" | "nao-configurado" | "falha"; detalhe?: string };

/** Confere com a hCaptcha se o visitante resolveu o desafio. */
export async function verificarCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;

  // Sem chave configurada não há o que verificar (ambiente de desenvolvimento).
  if (!secret) {
    console.warn(
      "[leads] HCAPTCHA_SECRET não configurado — envio aceito sem verificação.",
    );
    return true;
  }

  if (!token) return false;

  try {
    const resposta = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const dados = (await resposta.json()) as { success?: boolean };
    return dados.success === true;
  } catch (erro) {
    console.error("[leads] falha ao falar com a hCaptcha:", erro);
    return false;
  }
}

/** Dispara o e-mail do lead. */
export async function enviarEmail({
  assunto,
  linhas,
  responderPara,
}: {
  assunto: string;
  linhas: { rotulo: string; valor: string }[];
  responderPara?: string;
}): Promise<ResultadoEnvio> {
  const apiKey = process.env.RESEND_API_KEY;
  const para = process.env.LEAD_EMAIL_TO;
  const de = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !para || !de) {
    console.warn(
      "[leads] envio de e-mail não configurado (RESEND_API_KEY / LEAD_EMAIL_TO / LEAD_EMAIL_FROM).",
    );
    return { ok: false, motivo: "nao-configurado" };
  }

  const texto = linhas
    .filter((l) => l.valor.trim() !== "")
    .map((l) => `${l.rotulo}: ${l.valor}`)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#052251;line-height:1.6">
      <h2 style="margin:0 0 16px;color:#052251">${escaparHtml(assunto)}</h2>
      <table style="border-collapse:collapse">
        ${linhas
          .filter((l) => l.valor.trim() !== "")
          .map(
            (l) => `<tr>
              <td style="padding:6px 16px 6px 0;color:#4d6288;vertical-align:top;white-space:nowrap">${escaparHtml(l.rotulo)}</td>
              <td style="padding:6px 0;font-weight:600">${escaparHtml(l.valor).replace(/\n/g, "<br>")}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:24px 0 0;font-size:13px;color:#4d6288">
        Enviado pelo site da Mil Idiomas.
      </p>
    </div>`;

  try {
    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: de,
        to: [para],
        subject: assunto,
        text: texto,
        html,
        ...(responderPara ? { reply_to: responderPara } : {}),
      }),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error("[leads] Resend recusou o envio:", resposta.status, detalhe);
      return { ok: false, motivo: "falha", detalhe };
    }

    return { ok: true };
  } catch (erro) {
    console.error("[leads] erro ao enviar e-mail:", erro);
    return { ok: false, motivo: "falha" };
  }
}

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Corta texto exagerado antes de ir pro e-mail. */
export function limpar(valor: FormDataEntryValue | null, limite = 500): string {
  return typeof valor === "string" ? valor.trim().slice(0, limite) : "";
}

export function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
}
