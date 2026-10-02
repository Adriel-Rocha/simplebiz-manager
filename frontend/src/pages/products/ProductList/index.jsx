import { useCallback, useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/productService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";

const PAGE_SIZE = 8;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getProducts(page, PAGE_SIZE, "id,desc");

      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (requestError) {
      console.error("Failed to load products:", requestError);
      setError("We couldn't load the products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await getProducts(page, PAGE_SIZE, "id,desc");

        if (isMounted) {
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      } catch (requestError) {
        if (isMounted) {
          console.error("Failed to load products:", requestError);
          setError("We couldn't load the products. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(product.id);
    setError("");

    try {
      await deleteProduct(product.id);

      if (products.length === 1 && page > 0) {
        setPage((currentPage) => currentPage - 1);
        return;
      }

      await loadProducts();
    } catch (requestError) {
      console.error("Failed to delete product:", requestError);
      setError("We couldn't delete this product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const canManage = user?.role === "ADMIN";

  return (
    <div className="entity-page">
      <section className="entity-header">
        <div>
          <p className="entity-eyebrow">PRODUCTS</p>
          <h1>Product management</h1>
          <p>Manage your catalog, pricing, stock and availability.</p>
        </div>

        {canManage && (
          <button
            className="entity-primary-button"
            type="button"
            onClick={() => navigate("/products/new")}
          >
            <span>+</span>
            Add product
          </button>
        )}
      </section>

      {error && (
        <div className="entity-alert" role="alert">
          {error}
        </div>
      )}

      <section className="entity-card">
        <div className="entity-card-header">
          <div>
            <strong>Product catalog</strong>
            <span>
              {loading
                ? "Loading..."
                : `${products.length} shown on this page`}
            </span>
          </div>

          <span className="entity-access-badge">
            {canManage ? "Admin access" : "Read-only access"}
          </span>
        </div>

        <div className="entity-table-wrap">
          <table className="entity-table product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                {canManage && <th className="actions-column">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="entity-table-state"
                    colSpan={canManage ? 5 : 4}
                  >
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    className="entity-table-state"
                    colSpan={canManage ? 5 : 4}
                  >
                    <strong>No products found.</strong>
                    <span>
                      {canManage
                        ? "Add your first product to populate the catalog."
                        : "There are no product records available yet."}
                    </span>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="entity-product">
                        <div className="entity-product-icon">P</div>

                        <div>
                          <strong>{product.name}</strong>

                          <span title={product.description}>
                            {product.description || "No description provided"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong className="product-price">
                        {currencyFormatter.format(
                          Number(product.price || 0)
                        )}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`product-stock${
                          Number(product.stock || 0) <= 10 ? " low" : ""
                        }`}
                      >
                        {product.stock ?? 0}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`product-status${
                          product.active ? " active" : ""
                        }`}
                      >
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {canManage && (
                      <td className="entity-actions">
                        <button
                          className="entity-action-button"
                          type="button"
                          onClick={() =>
                            navigate(`/products/${product.id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="entity-action-button danger"
                          type="button"
                          disabled={deletingId === product.id}
                          onClick={() => handleDelete(product)}
                        >
                          {deletingId === product.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="entity-pagination">
          <button
            type="button"
            disabled={loading || page === 0}
            onClick={() => setPage((currentPage) => currentPage - 1)}
          >
            ← Previous
          </button>

          <span>
            Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
          </span>

          <button
            type="button"
            disabled={
              loading || totalPages === 0 || page + 1 >= totalPages
            }
            onClick={() => setPage((currentPage) => currentPage + 1)}
          >
            Next →
          </button>
        </div>
      </section>
    </div>
  );
}
