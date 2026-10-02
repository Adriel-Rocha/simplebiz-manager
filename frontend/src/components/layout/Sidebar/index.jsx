import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";

export default function Sidebar() {
  const { user } = useAuth();

  const navClassName = ({ isActive }) =>
    `sidebar-link${isActive ? " active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">SB</div>

        <div>
          <strong>SimpleBiz</strong>
          <span>Business Manager</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <p className="sidebar-section-label">WORKSPACE</p>

        <NavLink to="/dashboard" className={navClassName}>
          <span className="sidebar-link-icon">01</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/clients" className={navClassName}>
          <span className="sidebar-link-icon">02</span>
          <span>Customers</span>
        </NavLink>

        <NavLink to="/products" className={navClassName}>
          <span className="sidebar-link-icon">03</span>
          <span>Products</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-role">
          <span className="sidebar-role-dot" />

          <div>
            <strong>{user?.role === "ADMIN" ? "Administrator" : "User"}</strong>
            <span>Current access</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
