import './App.css'
import { useEffect, useState } from 'react'
import { getScrappingResults } from './services/getScrappingResults'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await getScrappingResults("macbook air m1");
  //       setResults(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <>
      <h1>Hello World</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {results && (
        <pre>{JSON.stringify(results, null, 2)}</pre>
      )}
    </>
  )
}

export default App
