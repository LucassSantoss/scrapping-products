import './App.css'
import { useEffect, useState } from 'react'
import { getScrappingResults } from './services/getScrappingResults'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getScrappingResults("Samsung M54");

        setProducts(data.shopping_results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='app'>
          
        <h1>Scrapping de produtos</h1>

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

              <a
                href={item.product_link}
                target="_blank"
                rel="noreferrer"
              >
                Ver produto
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
