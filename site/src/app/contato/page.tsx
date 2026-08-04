import type { Metadata } from "next";
import { FormularioContato } from "@/components/FormularioContato";
import { Botao, Card, Icone, PaginaHero, Secao, TituloSecao } from "@/components/ui";
import { CTA_PADRAO, escola, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contato: Mil Idiomas em ${escola.cidade}/${escola.estado}`,
  description: `Endereço, telefone, WhatsApp e horário de atendimento da Mil Idiomas: ${escola.endereco.rua}, ${escola.endereco.bairro}, ${escola.endereco.cidade}/${escola.endereco.estado}.`,
  alternates: { canonical: "/contato" },
};

const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  `R. Daltro Filho, 184 - Centro, Campo Bom - RS, 93700-000`,
)}&output=embed`;

export default function PaginaContato() {
  return (
    <>
      <PaginaHero
        eyebrow="Contato"
        titulo="Passa aqui, liga ou chama no WhatsApp."
        texto="Quem responde é a secretaria da escola, a mesma pessoa que vai te receber na porta. Sem central de atendimento, sem robô."
      />

      <Secao>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <TituloSecao
              eyebrow="Onde estamos"
              titulo="Centro de Campo Bom"
              texto="A escola fica no Centro, perto do comércio, com fácil acesso de ônibus e a pé."
            />

            <ul className="flex flex-col gap-5">
              <ItemContato icone="pin" rotulo="Endereço">
                <a
                  href={escola.endereco.mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-vermelho"
                >
                  {escola.endereco.rua}
                  <br />
                  {escola.endereco.bairro}, {escola.endereco.cidade}/
                  {escola.endereco.estado}
                </a>
              </ItemContato>

              <ItemContato icone="telefone" rotulo="Telefone">
                <a
                  href={`tel:${escola.telefoneLink}`}
                  className="transition-colors hover:text-vermelho"
                >
                  {escola.telefone}
                </a>
              </ItemContato>

              <ItemContato icone="email" rotulo="E-mail">
                <a
                  href={`mailto:${escola.email}`}
                  className="transition-colors hover:text-vermelho"
                >
                  {escola.email}
                </a>
              </ItemContato>

              <ItemContato icone="relogio" rotulo="Atendimento">
                <span className="flex flex-col gap-0.5">
                  {escola.horarios.map((h) => (
                    <span key={h.dia}>
                      <span className="font-medium text-marinho">{h.dia}:</span>{" "}
                      {h.hora}
                    </span>
                  ))}
                </span>
              </ItemContato>
            </ul>

            <div className="rounded-card border border-marinho/[0.15] bg-marinho-50 p-6">
              <h3 className="font-semibold text-marinho">
                Prefere resolver agora?
              </h3>
              <p className="mt-1.5 leading-relaxed text-marinho-600">
                O WhatsApp é o canal mais rápido: dúvida de horário, valor ou
                matrícula costuma sair na mesma conversa.
              </p>
              <Botao
                href={whatsappUrl(CTA_PADRAO)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5"
              >
                <Icone nome="whatsapp" className="size-5" />
                Chamar no WhatsApp
              </Botao>
            </div>
          </div>

          <Card className="p-7 sm:p-8" id="fale-conosco">
            <h2 className="text-xl font-bold text-marinho">Fale conosco</h2>
            <p className="mb-6 mt-1.5 text-[0.9375rem] leading-relaxed text-marinho-600">
              Preencha que a secretaria responde. Se preferir resposta na hora,
              o WhatsApp é mais rápido.
            </p>
            <FormularioContato />
          </Card>
        </div>
      </Secao>

      <section aria-label="Mapa da localização da escola" className="pb-16 sm:pb-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-5 sm:px-8">
          <div className="w-full overflow-hidden rounded-card border border-marinho/[0.15] bg-marinho-50 shadow-suave">
            <iframe
              src={mapaEmbed}
              title={`Mapa de ${escola.nome}, ${escola.endereco.rua}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0 sm:h-[440px]"
            />
          </div>
          {/* Alguns navegadores bloqueiam o mapa do Google; o link sempre funciona. */}
          <a
            href={escola.endereco.mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-marinho transition-colors hover:text-vermelho"
          >
            <Icone nome="pin" className="size-[18px] text-vermelho" />
            Abrir no Google Maps
          </a>
        </div>
      </section>
    </>
  );
}

function ItemContato({
  icone,
  rotulo,
  children,
}: {
  icone: "pin" | "telefone" | "email" | "relogio";
  rotulo: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-vermelho-50 text-vermelho">
        <Icone nome={icone} className="size-5" />
      </span>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-marinho-400">
          {rotulo}
        </h3>
        <div className="mt-1 leading-relaxed text-marinho-600">{children}</div>
      </div>
    </li>
  );
}
