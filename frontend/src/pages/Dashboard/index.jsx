import { useEffect, useState } from "react";
import { getClients } from "../../api/clientService";
import { getProducts } from "../../api/productService";
import "./styles.css";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    products: 0
  });

  const{ user } = useAuth();

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      const [clientsRes, productsRes] = await Promise.all([
        getClients(0, 1),
        getProducts(0, 1)
      ]);

      if (mounted) {
        setStats({
          clients: clientsRes.data.totalElements,
          products: productsRes.data.totalElements
        });
      }
    }

    loadStats();
    return () => (mounted = false);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <p className="welcome">
        Bem-vindo, <strong>{user?.email}</strong>
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Clientes</h3>
          <strong>{stats.clients}</strong>
        </div>

        <div className="card">
          <h3>Produtos</h3>
          <strong>{stats.products}</strong>
        </div>
      </div>
    </div>
  );
}
