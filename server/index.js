const express = require('express')
const axios = require('axios')
const cors = require('cors')
const cron = require('node-cron')
const runScraper = require('./scraper')
const fs = require('fs')

const app = express()
app.use(cors())
app.use(express.json())

require('dotenv').config();
const SERP_API_KEY = process.env.SERP_API_KEY ?? "";

app.get('/search', async (req, res) => {
  try {
    const { q } = req.query
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_shopping_light',
        api_key: SERP_API_KEY,
        gl: 'br',
        hl: 'pt-br',
        q: q,
      }
    })

    res.json(response.data)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados' })
  }
})

app.get('/monitoring', (req, res) => {
  const data = fs.readFileSync('./products.json', 'utf8');
  const products = JSON.parse(data);
  res.json(products);
});

app.post('/product', (req, res) => {
  const newProduct = req.body;

  let products = [];
  try {
    const data = fs.readFileSync('./products.json', 'utf-8');
    products = JSON.parse(data);
  } catch (err) {
    products = [];
  }

  products.push(newProduct);

  fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));

  res.json({ message: 'Produto salvo com sucesso!' });
});

app.listen(3001, () => {
  console.log('Running on port 3001')

  cron.schedule('*/10 * * * *', () => {
    console.log("⏱Cron: executando busca automática...");
    runScraper().catch(err => console.error('Erro no scraper:', err));
  }, {
    timezone: "America/Sao_Paulo"
  });
})