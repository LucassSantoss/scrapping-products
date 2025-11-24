import '../../index.css'
import { useEffect, useState } from 'react'
import { getScrappingResults } from '../../services/getScrappingResults'

function Search() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('Samsung M54')

  async function fetchData(searchTerm) {
    try {
      setLoading(true)
      setError(null)

      const data = await getScrappingResults(searchTerm)
      setProducts(data.shopping_results || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(query)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(query)
  }

  return (
    <div className='app'>
      <h1>Scrapping de produtos</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>Nenhum produto encontrado.</p>
      )}

      <div className="product-list">
        {products.map((item, index) => (
          <div key={index} className="product-card">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="product-image"
            />

            <h2 className="product-title">{item.title}</h2>
            <p><strong>Preço:</strong> {item.price}</p>
            <p><strong>Avaliação:</strong> {item.rating || "Sem avaliação"}</p>
            <p><strong>Loja:</strong> {item.source}</p>

            <a href={item.product_link} target="_blank" rel="noreferrer">
              Ver produto
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
