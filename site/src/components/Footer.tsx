import Image from "next/image";
import Link from "next/link";
import { CTA_PADRAO, cursos, escola, navegacao, whatsappUrl } from "@/lib/site";
import { Container, Icone } from "./ui";

/* Rodapé em fundo claro (#F4F6FA): o logo oficial só existe em versão
   para fundo claro. Ver identidade/design-guide.md. */

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-marinho/[0.12] bg-marinho-50">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-4 lg:pr-8">
            <Image
              src="/logo-mil-idiomas.png"
              alt="Mil Idiomas"
              width={1240}
              height={720}
              className="h-14 w-auto self-start"
            />
            <p className="text-sm leading-relaxed text-marinho-600">
              Escola de inglês em {escola.cidade}, com professor estrangeiro em
              sala desde {escola.fundacao}.
            </p>
            <div className="flex gap-2">
              {escola.redes.instagram ? (
                <a
                  href={escola.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Mil Idiomas"
                  className="flex size-10 items-center justify-center rounded-lg border border-marinho/15 bg-white text-marinho transition-colors hover:border-vermelho hover:text-vermelho"
                >
                  <Icone nome="instagram" className="size-5" />
                </a>
              ) : null}
              {escola.redes.facebook ? (
                <a
                  href={escola.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Mil Idiomas"
                  className="flex size-10 items-center justify-center rounded-lg border border-marinho/15 bg-white text-marinho transition-colors hover:border-vermelho hover:text-vermelho"
                >
                  <Icone nome="facebook" className="size-5" />
                </a>
              ) : null}
              <a
                href={whatsappUrl(CTA_PADRAO)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Mil Idiomas"
                className="flex size-10 items-center justify-center rounded-lg border border-marinho/15 bg-white text-marinho transition-colors hover:border-vermelho hover:text-vermelho"
              >
                <Icone nome="whatsapp" className="size-5" />
              </a>
            </div>
          </div>

          <FooterColuna titulo="Cursos">
            {cursos.map((curso) => (
              <FooterLink key={curso.slug} href={`/cursos#${curso.slug}`}>
                {curso.nome}
              </FooterLink>
            ))}
          </FooterColuna>

          <FooterColuna titulo="A escola">
            {navegacao.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/portal">Portal do Aluno</FooterLink>
          </FooterColuna>

          <FooterColuna titulo="Contato">
            <li className="flex gap-2.5 text-pretty text-sm text-marinho-600">
              <Icone nome="pin" className="mt-0.5 size-[18px] shrink-0 text-vermelho" />
              <span>
                {escola.endereco.rua}
                <br />
                {escola.endereco.bairro}, {escola.endereco.cidade}/
                {escola.endereco.estado}
              </span>
            </li>
            <li>
              <a
                href={`tel:${escola.telefoneLink}`}
                className="flex gap-2.5 text-sm text-marinho-600 transition-colors hover:text-vermelho"
              >
                <Icone nome="telefone" className="mt-0.5 size-[18px] shrink-0 text-vermelho" />
                {escola.telefone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${escola.email}`}
                className="flex gap-2.5 text-sm text-marinho-600 transition-colors hover:text-vermelho"
              >
                <Icone nome="email" className="mt-0.5 size-[18px] shrink-0 text-vermelho" />
                {escola.email}
              </a>
            </li>
            <li className="flex gap-2.5 text-sm text-marinho-600">
              <Icone nome="relogio" className="mt-0.5 size-[18px] shrink-0 text-vermelho" />
              <span>
                {escola.horarios
                  .filter((h) => h.hora !== "Fechado")
                  .map((h) => (
                    <span key={h.dia} className="block">
                      {h.dia}: {h.hora}
                    </span>
                  ))}
              </span>
            </li>
          </FooterColuna>
        </div>

        <div className="flex flex-col gap-2 border-t border-marinho/[0.12] py-7 text-sm text-marinho-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {escola.nome}. {escola.tagline}
          </p>
          <p>
            {escola.endereco.cidade}/{escola.endereco.estado}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColuna({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-marinho">
        {titulo}
      </h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-marinho-600 transition-colors hover:text-vermelho"
      >
        {children}
      </Link>
    </li>
  );
}
