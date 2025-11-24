import { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";
import "./Monitoring.css";

export default function Monitoring() {
  const [items, setItems] = useState([]);

  async function loadData() {
    const res = await api.get("/monitoring");
    setItems(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div className="monitoring-container">
      <h1>Monitoramento de Preços</h1>

      <div className="monitoring-info">
        <p>
          <strong>Como funciona o monitoramento:</strong><br />
          Os produtos listados abaixo são verificados automaticamente pela nossa API usando o SerpAPI.
          Quando o preço atual de um produto cai abaixo do seu <em>threshold</em>, uma notificação por e-mail é enviada.
        </p>
      </div>

      <table className="monitoring-table">
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Threshold (R$)</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>R$ {item.threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/add-product">
        <button className="add-button">+ Adicionar produto</button>
      </Link>
    </div>
  );
}
