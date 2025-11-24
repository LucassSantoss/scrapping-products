const axios = require('axios');
const sendAlertEmail = require('./services/mailerService');
const products = require('./products.json');

module.exports = async function runScraper() {
  console.log("Rodando scraper automático...");

  const alerts = [];

  for (const item of products) {
    const { name, threshold } = item;

    console.log(`\n🔍 Buscando por: ${name} (threshold: R$${threshold})`);

    const res = await axios.get('http://127.0.0.1:3001/search', {
      params: { q: name }
    });

    if (res.status !== 200 || !res.data) {
      console.log(`Erro ao buscar ${name}: Status ${res.status}`);
      continue;
    }

    console.log(`Resposta recebida para ${name}:`, res.data);

    const data = res.data;

    if (!data.shopping_results) {
      console.log(`Nenhum resultado encontrado para ${name}.`);
      continue;
    }

    const normalized = data.shopping_results.map(p => ({
      title: p.title,
      link: p.product_link,
      price: p.extracted_price
    })).filter(p => p.price !== null);

    console.log(`Encontrados ${normalized.length} resultados para ${name}`);

    const below = normalized.filter(p => p.price < threshold);

    console.log(below)
    
    if (below.length > 0) {
      console.log(`Encontrados ${below.length} produtos abaixo do threshold:`);

      below.forEach(p => {
        alerts.push({
          product: name,
          title: p.title,
          price: p.price,
          link: p.link,
          threshold
        });
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
