import { faq } from "@/lib/site";

/* Acordeão em <details> nativo: abre e fecha sem JavaScript,
   e o Google lê o texto todo mesmo com a resposta fechada. */

export function Faq({ itens = faq }: { itens?: typeof faq }) {
  return (
    <div className="divide-y divide-marinho/[0.12] border-y border-marinho/[0.12]">
      {itens.map((item) => (
        <details key={item.pergunta} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-medium text-marinho transition-colors hover:text-vermelho [&::-webkit-details-marker]:hidden">
            {item.pergunta}
            <span
              aria-hidden="true"
              className="relative size-5 shrink-0 text-vermelho"
            >
              <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded bg-current" />
              <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 rounded bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-marinho-600">
            {item.resposta}
          </p>
        </details>
      ))}
    </div>
  );
}

/* O mesmo FAQ em formato de ficha para o Google — pode render um
   resultado expansível na busca. */
export function FaqSchema({ itens = faq }: { itens?: typeof faq }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}
