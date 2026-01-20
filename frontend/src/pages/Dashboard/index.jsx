import "./styles.css";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <p className="welcome">
        Bem-vindo, <strong>{user?.email}</strong>
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Clientes</h3>
          <span>—</span>
        </div>

        <div className="card">
          <h3>Produtos</h3>
          <span>—</span>
        </div>

        <div className="card">
          <h3>Perfil</h3>
          <span>{user?.role}</span>
        </div>
      </div>
    </div>
  );
}
