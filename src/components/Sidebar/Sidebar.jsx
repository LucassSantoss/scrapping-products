import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Scraper Dashboard</h2>

      <nav className="sidebar-nav">
        <Link className={pathname === "/" ? "active" : ""} to="/">
          📊 Monitoring
        </Link>

        <Link className={pathname === "/add-product" ? "active" : ""} to="/add-product">
          ➕ Add Product
        </Link>

        <Link className={pathname === "/search" ? "active" : ""} to="/search">
          🔍 Search
        </Link>
      </nav>
    </aside>
  );
}
