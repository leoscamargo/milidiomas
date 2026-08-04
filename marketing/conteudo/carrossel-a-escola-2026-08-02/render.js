/* Renderiza cada .slide do carrossel.html em PNG 1080x1350.
   Uso:  NODE_PATH="$HOME/.npm/_npx/e41f203b7505f1fb/node_modules" node render.js  */

const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  await page.goto("file://" + path.join(__dirname, "carrossel.html"), {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const slides = await page.$$(".slide");
  for (let i = 0; i < slides.length; i++) {
    const nome = `instagram/slide-${String(i + 1).padStart(2, "0")}.png`;
    await slides[i].screenshot({ path: path.join(__dirname, nome) });
    console.log("ok →", nome);
  }

  await browser.close();
})();
