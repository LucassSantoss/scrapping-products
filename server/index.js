const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())

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

app.listen(3001, () => {
  console.log('Running on port 3001')
})