import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BotaoWhatsapp } from "@/components/BotaoWhatsapp";
import { ConfigMovimento } from "@/components/ConfigMovimento";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL, escola } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${escola.nome}: Curso de inglês em ${escola.cidade}/${escola.estado}`,
    template: `%s | ${escola.nome}`,
  },
  description: `Escola de inglês em ${escola.cidade} com professor estrangeiro em sala desde ${escola.fundacao}. Turmas para crianças, adolescentes e adultos, e aula particular VIP. ${escola.tagline}.`,
  keywords: [
    "curso de inglês Campo Bom",
    "escola de idiomas Campo Bom",
    "inglês com professor nativo",
    "aula de inglês Campo Bom RS",
    "curso de inglês para crianças Campo Bom",
    "inglês para adultos Campo Bom",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: escola.nome,
    title: `${escola.nome}: Curso de inglês em ${escola.cidade}/${escola.estado}`,
    description: `Inglês com professor estrangeiro em ${escola.cidade}. ${escola.tagline}.`,
  },
  robots: { index: true, follow: true },
};

/* Ficha da escola para o Google — ajuda a aparecer na busca local e no Maps. */
const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "LanguageSchool",
  name: escola.nome,
  slogan: escola.tagline,
  url: SITE_URL,
  image: `${SITE_URL}/logo-mil-idiomas.png`,
  telephone: escola.telefone,
  email: escola.email,
  foundingDate: "2005-05-12",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: escola.endereco.rua,
    addressLocality: escola.endereco.cidade,
    addressRegion: escola.endereco.estado,
    postalCode: escola.endereco.cep,
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "Campo Bom" },
    { "@type": "City", name: "Novo Hamburgo" },
    { "@type": "City", name: "Sapiranga" },
    { "@type": "City", name: "São Leopoldo" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "12:00",
    },
  ],
  sameAs: [escola.redes.instagram, escola.redes.facebook].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <head>
        {/* As seções entram com opacidade zero e só aparecem quando a animação
            roda. Sem JavaScript isso nunca aconteceria e a página ficaria em
            branco — aqui elas voltam a ser visíveis. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-marinho focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <ConfigMovimento>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          <BotaoWhatsapp />
        </ConfigMovimento>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </body>
    </html>
  );
}
