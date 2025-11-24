const axios = require('axios');
const sendAlertEmail = require('./services/mailerService');
const products = require('./products.json');

module.exports = async function runScraper() {
  console.log("Rodando scraper automático...");

  const alerts = [];

  for (const item of products) {
    const { name, threshold } = item;

    console.log(`\nBuscando: ${name}`);

    const res = await axios.get('http://localhost:3001/search', {
      params: { q: name }
    });

    const data = res.data;

    if (!data.shopping_results) {
      console.log(`Nenhum resultado encontrado para ${name}.`);
      continue;
    }

    const normalized = data.shopping_results.map(p => ({
      title: p.title,
      link: p.link,
      price: p.price
        ? Number(p.price.replace(/[^\d,]/g, "").replace(",", "."))
        : null
    })).filter(p => p.price !== null);

    console.log(`Encontrados ${normalized.length} resultados para ${name}`);

    const below = normalized.filter(p => p.price < threshold);

    if (below.length > 0) {
      const best = below.sort((a, b) => a.price - b.price)[0];

      console.log(`Preço baixo encontrado: ${best.title} por R$ ${best.price}`);

      alerts.push({
        product: name,
        title: best.title,
        price: best.price,
        link: best.link,
        threshold
      });

    } else {
      console.log(`Nenhum preço abaixo de R$${threshold} para ${name}.`);
    }
  }

  console.log("\n✓ Scraping finalizado!");

  if (alerts.length > 0) {
    console.log("Enviando 1 email com todos os alertas...");

    let text = "Produtos abaixo do threshold:\n\n";

    for (const a of alerts) {
      text +=
        `📌 Produto: ${a.product}\n` +
        `Título: ${a.title}\n` +
        `Preço: R$ ${a.price}\n` +
        `Threshold: R$ ${a.threshold}\n` +
        `Link: ${a.link}\n\n`;
    }

    await sendAlertEmail(
      "⚠️ Alertas de preços encontrados",
      text
    );
  } else {
    console.log("Nenhum alerta encontrado.");
  }
};
