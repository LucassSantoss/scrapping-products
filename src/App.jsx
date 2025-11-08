import './App.css'

function App() {
  const serpApiKey = import.meta.env.VITE_SERP_API_KEY ?? "";
  console.log("SERP API Key:", serpApiKey);

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
