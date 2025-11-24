import api from "../../api.js";
import "./AddProduct.css";

export default function AddProduct() {

  async function onSubmit(e) {
    e.preventDefault();
    const name = e.target.productName.value;
    const threshold = parseFloat(e.target.productThreshold.value);

    if (!name || isNaN(threshold)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const newProduct = { name, threshold };

    try {
      await api.post("/product", newProduct);
      alert("Produto adicionado com sucesso!");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar produto.");
    }
  }

  return (
    <div className="add-product-container">
      <h1>Adicionar Produto</h1>

      <form className="add-product-form" onSubmit={onSubmit}>
        <div>
          <label>Nome do Produto:</label>
          <input type="text" name="productName" required />
        </div>

        <div>
          <label>Preço Limite (R$):</label>
          <input type="number" step="0.01" name="productThreshold" required />
        </div>

        <button className="add-product-btn" type="submit">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}
