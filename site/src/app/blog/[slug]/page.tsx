import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChamadaFinal } from "@/app/page";
import { Container, Icone } from "@/components/ui";
import { formatarData, lerPost, listarPosts } from "@/lib/blog";
import { SITE_URL, escola } from "@/lib/site";

export function generateStaticParams() {
  return listarPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await lerPost(slug);
  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function PaginaPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await lerPost(slug);

  if (!post || post.draft) notFound();

  const outros = listarPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "pt-BR",
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: escola.nome },
    publisher: {
      "@type": "Organization",
      name: escola.nome,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-mil-idiomas.png`,
      },
    },
  };

  return (
    <>
      <article>
        <header className="border-b border-marinho/[0.12] bg-marinho-50">
          <Container>
            <div className="mx-auto flex max-w-3xl flex-col gap-5 py-12 sm:py-16">
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-marinho transition-colors hover:text-vermelho"
              >
                <Icone nome="seta" className="size-4 rotate-180" />
                Voltar ao blog
              </Link>
              <time
                dateTime={post.date}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-vermelho"
              >
                {formatarData(post.date)}
              </time>
              <h1 className="text-balance text-[1.875rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-marinho sm:text-[2.5rem]">
                {post.title}
              </h1>
              {post.description ? (
                <p className="text-pretty text-lg leading-relaxed text-marinho-600">
                  {post.description}
                </p>
              ) : null}
            </div>
          </Container>
        </header>

        <Container>
          <div
            className="prosa mx-auto max-w-3xl py-12 sm:py-16"
            dangerouslySetInnerHTML={{ __html: post.conteudo }}
          />
        </Container>
      </article>

      {outros.length > 0 ? (
        <section className="border-t border-marinho/[0.12] bg-marinho-50 py-14">
          <Container>
            <h2 className="mb-8 text-xl font-bold text-marinho">
              Leia também
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {outros.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col gap-2 rounded-card border border-marinho/[0.15] bg-white p-6 shadow-suave transition-colors hover:border-vermelho/40"
                >
                  <time
                    dateTime={p.date}
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-vermelho"
                  >
                    {formatarData(p.date)}
                  </time>
                  <h3 className="text-balance font-semibold leading-snug text-marinho transition-colors group-hover:text-vermelho">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <ChamadaFinal />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />
    </>
  );
}
