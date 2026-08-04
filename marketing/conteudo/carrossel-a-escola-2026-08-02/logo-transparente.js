/* Gera logo-transparente.png a partir de logo.png, removendo o fundo branco
   chapado do PNG original. Roda uma vez; o carrossel.html usa o resultado.
   Uso:  NODE_PATH="$HOME/.npm/_npx/e41f203b7505f1fb/node_modules" node logo-transparente.js */

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, "logo.png"));

  const dataUrl = await page.evaluate(async () => {
    const img = document.querySelector("img");
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const dados = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const px = dados.data;
    for (let i = 0; i < px.length; i += 4) {
      const luz = Math.min(px[i], px[i + 1], px[i + 2]);
      // acima de 242 é fundo; entre 215 e 242 vira meio-tom pra não serrilhar
      if (luz >= 242) px[i + 3] = 0;
      else if (luz > 215) px[i + 3] = Math.round(((242 - luz) / 27) * 255);
    }
    ctx.putImageData(dados, 0, 0);

    return canvas.toDataURL("image/png");
  });

  fs.writeFileSync(
    path.join(__dirname, "logo-transparente.png"),
    Buffer.from(dataUrl.split(",")[1], "base64"),
  );
  console.log("ok → logo-transparente.png");

  await browser.close();
})();
