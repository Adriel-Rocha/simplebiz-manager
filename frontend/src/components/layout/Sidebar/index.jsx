import { NavLink } from "react-router-dom";
import "./styles.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">SimpleBiz</h2>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/clients" className="sidebar-link">
          Clientes
        </NavLink>

        <NavLink to="/products" className="sidebar-link">
          Produtos
        </NavLink>
      </nav>
    </aside>
  );
}
