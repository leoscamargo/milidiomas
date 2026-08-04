import type { Metadata } from "next";
import { Container, Icone } from "@/components/ui";
import { CTA_PADRAO, escola, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portal do Aluno",
  description:
    "Área do aluno da Mil Idiomas: financeiro, agenda de provas, notas e dados cadastrais.",
  robots: { index: false, follow: false },
};

/* ---------------------------------------------------------------------------
   ETAPA 2 — este é o desenho da tela de entrada do Portal do Aluno.
   Os campos estão desativados de propósito: ainda não existe banco de dados
   nem autenticação por trás. Quando o portal for ligado, esta tela vira o
   formulário de verdade (login com captcha e recuperação de senha por e-mail).

   Não há botão de "criar conta": o acesso é gerado pela secretaria no
   momento da matrícula.
   --------------------------------------------------------------------------- */

const recursos = [
  {
    icone: "check" as const,
    titulo: "Financeiro",
    texto: "Mensalidades, vencimentos e situação de cada boleto.",
  },
  {
    icone: "relogio" as const,
    titulo: "Agenda de provas",
    texto: "Calendário com as datas de avaliação da sua turma.",
  },
  {
    icone: "globo" as const,
    titulo: "Notas",
    texto: "Resultado de cada prova e a evolução ao longo do curso.",
  },
  {
    icone: "pessoas" as const,
    titulo: "Meu perfil",
    texto: "Seus dados de cadastro, telefone e contato de responsável.",
  },
];

export default function PaginaPortal() {
  return (
    <Container>
      <div className="grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
        {/* Apresentação do que o portal vai ter */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Portal do Aluno</span>
            <h1 className="text-balance text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-marinho sm:text-[2.5rem]">
              Sua vida de aluno em um lugar só.
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-marinho-600">
              Boleto, nota, data de prova e cadastro, sem precisar ligar para a
              secretaria para cada dúvida.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {recursos.map((recurso) => (
              <li key={recurso.titulo} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-vermelho-50 text-vermelho">
                  <Icone nome={recurso.icone} className="size-[18px]" />
                </span>
                <div>
                  <h2 className="font-semibold text-marinho">
                    {recurso.titulo}
                  </h2>
                  <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-marinho-600">
                    {recurso.texto}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-card border border-marinho/[0.15] bg-marinho-50 p-6">
            <h2 className="font-semibold text-marinho">
              Ainda não é aluno da Mil Idiomas?
            </h2>
            <p className="mt-1.5 leading-relaxed text-marinho-600">
              O acesso ao portal é criado pela secretaria no momento da
              matrícula. Não existe cadastro por conta própria. Para estudar
              aqui, fale com a gente.
            </p>
            <a
              href={whatsappUrl(CTA_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-vermelho transition-colors hover:text-vermelho-700"
            >
              <Icone nome="whatsapp" className="size-[18px]" />
              Falar sobre matrícula
            </a>
          </div>
        </div>

        {/* Tela de entrada */}
        <div className="rounded-card border border-marinho/[0.15] bg-white p-7 shadow-media sm:p-8 lg:sticky lg:top-28">
          <div
            role="status"
            className="mb-7 flex gap-3 rounded-[10px] border border-vermelho/25 bg-vermelho-50 p-4"
          >
            <Icone nome="relogio" className="mt-0.5 size-[18px] shrink-0 text-vermelho" />
            <div>
              <p className="text-sm font-semibold text-marinho">
                Portal em construção
              </p>
              <p className="mt-1 text-sm leading-relaxed text-marinho-600">
                O acesso ainda não está liberado. Até lá, boleto, nota e data de
                prova continuam com a secretaria, pelo WhatsApp ou na escola.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-marinho">Entrar</h2>
          <p className="mt-1.5 text-[0.9375rem] text-marinho-600">
            Use o e-mail cadastrado na matrícula.
          </p>

          <form className="mt-6 flex flex-col gap-5">
            <div>
              <label
                htmlFor="portal-email"
                className="mb-1.5 block text-sm font-medium text-marinho"
              >
                E-mail
              </label>
              <input
                id="portal-email"
                type="email"
                disabled
                placeholder="voce@email.com"
                autoComplete="username"
                className="w-full cursor-not-allowed rounded-[10px] border border-marinho/20 bg-marinho-50 px-4 py-3 text-marinho placeholder:text-marinho-200"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <label
                  htmlFor="portal-senha"
                  className="text-sm font-medium text-marinho"
                >
                  Senha
                </label>
                <span className="text-sm font-medium text-marinho-200">
                  Esqueci minha senha
                </span>
              </div>
              <input
                id="portal-senha"
                type="password"
                disabled
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full cursor-not-allowed rounded-[10px] border border-marinho/20 bg-marinho-50 px-4 py-3 text-marinho placeholder:text-marinho-200"
              />
            </div>

            {/* Espaço reservado para o captcha (Cloudflare Turnstile) */}
            <div className="flex h-[68px] items-center justify-center rounded-[10px] border border-dashed border-marinho/25 bg-marinho-50 text-sm text-marinho-400">
              Verificação de segurança
            </div>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-[10px] bg-marinho-200 px-6 py-3.5 text-[0.9375rem] font-semibold text-white"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 border-t border-marinho/10 pt-6 text-sm leading-relaxed text-marinho-400">
            Problema com o acesso? Fale com a secretaria pelo{" "}
            <a
              href={`tel:${escola.telefoneLink}`}
              className="font-medium text-marinho transition-colors hover:text-vermelho"
            >
              {escola.telefone}
            </a>{" "}
            ou passe na escola.
          </p>
        </div>
      </div>
    </Container>
  );
}
