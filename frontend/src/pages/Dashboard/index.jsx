import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getClients } from "../../api/clientService";
import { getProducts } from "../../api/productService";
import "./styles.css";

const initialData = {
  clients: 0,
  products: 0,
  recentClients: [],
  recentProducts: [],
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const [clientsRes, productsRes] = await Promise.all([
          getClients(0, 5, "id,desc"),
          getProducts(0, 5, "id,desc"),
        ]);

        if (!isMounted) return;

        setData({
          clients: clientsRes.data.totalElements,
          products: productsRes.data.totalElements,
          recentClients: clientsRes.data.content,
          recentProducts: productsRes.data.content,
        });
      } catch (requestError) {
        if (isMounted) {
          console.error("Failed to load dashboard:", requestError);
          setError(
            "We couldn't load the dashboard data. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = user?.email?.split("@")[0] || "there";
  const roleLabel = user?.role === "ADMIN" ? "Administrator" : "User";

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-eyebrow">OVERVIEW</p>

          <h1>Welcome back, {displayName}.</h1>

          <p className="dashboard-subtitle">
            Keep your customer and product operations organized in one place.
          </p>
        </div>

        <div className="dashboard-user-badge">
          <span className="dashboard-user-dot" />

          <div>
            <strong>{roleLabel}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
      </section>

      {error && (
        <div className="dashboard-alert" role="alert">
          {error}
        </div>
      )}

      <section
        className="dashboard-stats"
        aria-label="Business overview"
      >
        <article className="dashboard-stat-card">
          <div className="dashboard-stat-icon">C</div>

          <div>
            <span className="dashboard-stat-label">Customers</span>
            <strong>{loading ? "—" : data.clients}</strong>
          </div>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-icon">P</div>

          <div>
            <span className="dashboard-stat-label">Products</span>
            <strong>{loading ? "—" : data.products}</strong>
          </div>
        </article>

        <article className="dashboard-stat-card dashboard-stat-card-muted">
          <div className="dashboard-stat-icon">A</div>

          <div>
            <span className="dashboard-stat-label">Access</span>
            <strong>{roleLabel}</strong>
          </div>
        </article>
      </section>

      <section className="dashboard-content-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <p className="dashboard-eyebrow">CUSTOMERS</p>
              <h2>Latest customers</h2>
            </div>

            <button
              className="dashboard-text-button"
              type="button"
              onClick={() => navigate("/clients")}
            >
              View all <span>→</span>
            </button>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              Loading customers...
            </div>
          ) : data.recentClients.length === 0 ? (
            <div className="dashboard-empty">
              <strong>No customers yet.</strong>
              <span>
                Add your first customer to start using SimpleBiz.
              </span>
            </div>
          ) : (
            <div className="dashboard-list">
              {data.recentClients.map((client) => (
                <div
                  className="dashboard-list-row"
                  key={client.id}
                >
                  <div className="dashboard-avatar">
                    {client.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>

                  <div className="dashboard-list-main">
                    <strong>{client.name}</strong>
                    <span>{client.email}</span>
                  </div>

                  <span className="dashboard-list-meta">
                    {client.phone || "No phone"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <p className="dashboard-eyebrow">PRODUCTS</p>
              <h2>Latest products</h2>
            </div>

            <button
              className="dashboard-text-button"
              type="button"
              onClick={() => navigate("/products")}
            >
              View all <span>→</span>
            </button>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              Loading products...
            </div>
          ) : data.recentProducts.length === 0 ? (
            <div className="dashboard-empty">
              <strong>No products yet.</strong>
              <span>
                Add products to keep your catalog organized.
              </span>
            </div>
          ) : (
            <div className="dashboard-list">
              {data.recentProducts.map((product) => (
                <div
                  className="dashboard-list-row"
                  key={product.id}
                >
                  <div className="dashboard-product-icon">P</div>

                  <div className="dashboard-list-main">
                    <strong>{product.name}</strong>

                    <span>
                      {product.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="dashboard-product-meta">
                    <strong>
                      {currencyFormatter.format(
                        Number(product.price || 0)
                      )}
                    </strong>

                    <span>{product.stock ?? 0} in stock</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      <section className="dashboard-quick-actions">
        <div>
          <p className="dashboard-eyebrow">QUICK ACTIONS</p>
          <h2>What do you want to manage?</h2>
        </div>

        <div className="dashboard-action-grid">
          <button
            className="dashboard-action-card"
            type="button"
            onClick={() => navigate("/clients")}
          >
            <span>01</span>

            <strong>Manage customers</strong>

            <small>
              View, search and update your customer records.
            </small>

            <em>→</em>
          </button>

          <button
            className="dashboard-action-card"
            type="button"
            onClick={() => navigate("/products")}
          >
            <span>02</span>

            <strong>Manage products</strong>

            <small>
              Keep your catalog, prices and stock organized.
            </small>

            <em>→</em>
          </button>

          {user?.role === "ADMIN" && (
            <>
              <button
                className="dashboard-action-card dashboard-action-card-accent"
                type="button"
                onClick={() => navigate("/clients/new")}
              >
                <span>03</span>

                <strong>Add customer</strong>

                <small>
                  Create a new customer record in a few steps.
                </small>

                <em>+</em>
              </button>

              <button
                className="dashboard-action-card dashboard-action-card-accent"
                type="button"
                onClick={() => navigate("/products/new")}
              >
                <span>04</span>

                <strong>Add product</strong>

                <small>
                  Add a product and keep your catalog up to date.
                </small>

                <em>+</em>
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}