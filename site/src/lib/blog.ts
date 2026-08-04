import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/* ---------------------------------------------------------------------------
   O blog lê os arquivos .md de  site/content/blog/.
   É onde a skill /publicar-tema grava os artigos.

   Cabeçalho esperado em cada arquivo:

   ---
   title: "Título do artigo"
   description: "Resumo de 150-160 caracteres"
   date: 2026-08-02
   draft: false          # true = não aparece no site
   tags: ["inglês", "dicas"]
   ---
   --------------------------------------------------------------------------- */

const PASTA_BLOG = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  tags: string[];
};

function lerArquivos(): string[] {
  if (!fs.existsSync(PASTA_BLOG)) return [];
  return fs.readdirSync(PASTA_BLOG).filter((f) => f.endsWith(".md"));
}

function paraPost(arquivo: string): Post {
  const bruto = fs.readFileSync(path.join(PASTA_BLOG, arquivo), "utf8");
  const { data } = matter(bruto);
  const slug = arquivo.replace(/\.md$/, "");

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? ""),
    draft: data.draft === true,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

/** Posts publicados, do mais novo para o mais antigo. */
export function listarPosts(): Post[] {
  return lerArquivos()
    .map(paraPost)
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Um post com o corpo já convertido de markdown para HTML. */
export async function lerPost(
  slug: string,
): Promise<(Post & { conteudo: string }) | null> {
  const arquivo = path.join(PASTA_BLOG, `${slug}.md`);
  if (!fs.existsSync(arquivo)) return null;

  const bruto = fs.readFileSync(arquivo, "utf8");
  const { content } = matter(bruto);
  const processado = await remark().use(html).process(content);

  return { ...paraPost(`${slug}.md`), conteudo: processado.toString() };
}

/** Data por extenso, do jeito que se lê em português. */
export function formatarData(iso: string): string {
  if (!iso) return "";
  const data = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(data.getTime())) return "";
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
