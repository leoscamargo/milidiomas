import { Botao, Container } from "@/components/ui";

export default function NaoEncontrado() {
  return (
    <Container>
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 py-24 text-center sm:py-32">
        <span className="text-6xl font-extrabold tracking-tight text-vermelho">
          404
        </span>
        <h1 className="text-2xl font-bold text-marinho sm:text-3xl">
          Essa página não existe.
        </h1>
        <p className="leading-relaxed text-marinho-600">
          O endereço pode ter mudado, ou o link que você seguiu está quebrado.
          Volte para o começo e siga daqui.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Botao href="/">Ir para a página inicial</Botao>
          <Botao href="/contato" variante="secundario">
            Falar com a escola
          </Botao>
        </div>
      </div>
    </Container>
  );
}
