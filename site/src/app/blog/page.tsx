import type { Metadata } from "next";
import Link from "next/link";
import { Container, Icone, PaginaHero, Secao } from "@/components/ui";
import { formatarData, listarPosts } from "@/lib/blog";
import { escola } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog: dicas de inglês e novidades da escola",
  description: `Dicas de inglês, orientação para quem vai começar a estudar e novidades da Mil Idiomas, em ${escola.cidade}/${escola.estado}.`,
  alternates: { canonical: "/blog" },
};

export default function PaginaBlog() {
  const posts = listarPosts();

  return (
    <>
      <PaginaHero
        eyebrow="Blog"
        titulo="Dicas de inglês e novidades da escola"
        texto="Conteúdo curto e prático de quem dá aula todo dia: o que trava o aluno, o que destrava e o que vale a pena saber antes de começar."
      />

      {posts.length === 0 ? (
        <Secao>
          <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-card border border-dashed border-marinho/25 bg-marinho-50 px-8 py-16 text-center">
            <h2 className="text-lg font-semibold text-marinho">
              Nenhum artigo publicado ainda
            </h2>
            <p className="leading-relaxed text-marinho-600">
              Os primeiros textos aparecem aqui em breve. Enquanto isso,
              acompanhe a escola no Instagram.
            </p>
          </div>
        </Secao>
      ) : (
        <Container>
          <div className="grid gap-5 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-card border border-marinho/[0.15] bg-white p-7 shadow-suave transition-all duration-200 hover:-translate-y-0.5 hover:border-vermelho/40 hover:shadow-media"
              >
                <time
                  dateTime={post.date}
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-vermelho"
                >
                  {formatarData(post.date)}
                </time>
                <h2 className="text-balance text-xl font-bold leading-snug text-marinho">
                  {post.title}
                </h2>
                <p className="flex-1 leading-relaxed text-marinho-600">
                  {post.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-marinho transition-colors group-hover:text-vermelho">
                  Ler artigo
                  <Icone
                    nome="seta"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
