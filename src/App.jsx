import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monitoring from "./pages/Monitoring/Monitoring.jsx";
import Search from "./pages/Search/Search.jsx";
import AddProduct from "./pages/AddProduct/AddProduct.jsx";

import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Monitoring />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
