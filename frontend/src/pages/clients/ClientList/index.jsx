import { useCallback, useEffect, useState } from "react";
import { getClients, deleteClient } from "../../../api/clientService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";

const PAGE_SIZE = 8;

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getClients(page, PAGE_SIZE, "id,desc");

      setClients(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (requestError) {
      console.error("Failed to load clients:", requestError);
      setError("We couldn't load the customers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    let isMounted = true;

    async function fetchClients() {
      setLoading(true);
      setError("");

      try {
        const response = await getClients(page, PAGE_SIZE, "id,desc");

        if (isMounted) {
          setClients(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      } catch (requestError) {
        if (isMounted) {
          console.error("Failed to load clients:", requestError);
          setError("We couldn't load the customers. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchClients();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleDelete = async (client) => {
    const confirmed = window.confirm(
      `Delete "${client.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(client.id);
    setError("");

    try {
      await deleteClient(client.id);

      if (clients.length === 1 && page > 0) {
        setPage((currentPage) => currentPage - 1);
        return;
      }

      await loadClients();
    } catch (requestError) {
      console.error("Failed to delete client:", requestError);
      setError("We couldn't delete this customer. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const canManage = user?.role === "ADMIN";

  return (
    <div className="entity-page">
      <section className="entity-header">
        <div>
          <p className="entity-eyebrow">CUSTOMERS</p>
          <h1>Customer management</h1>
          <p>Keep customer records organized and easy to access.</p>
        </div>

        {canManage && (
          <button
            className="entity-primary-button"
            type="button"
            onClick={() => navigate("/clients/new")}
          >
            <span>+</span>
            Add customer
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
            <strong>Customer list</strong>
            <span>
              {loading
                ? "Loading..."
                : `${clients.length} shown on this page`}
            </span>
          </div>

          <span className="entity-access-badge">
            {canManage ? "Admin access" : "Read-only access"}
          </span>
        </div>

        <div className="entity-table-wrap">
          <table className="entity-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                {canManage && <th className="actions-column">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="entity-table-state"
                    colSpan={canManage ? 4 : 3}
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    className="entity-table-state"
                    colSpan={canManage ? 4 : 3}
                  >
                    <strong>No customers found.</strong>
                    <span>
                      {canManage
                        ? "Add your first customer to populate this workspace."
                        : "There are no customer records available yet."}
                    </span>
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="entity-person">
                        <div className="entity-person-avatar">
                          {client.name?.charAt(0)?.toUpperCase() || "C"}
                        </div>

                        <div>
                          <strong>{client.name}</strong>
                          <span>Customer #{client.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="entity-secondary-text">
                        {client.email}
                      </span>
                    </td>

                    <td>
                      <span className="entity-secondary-text">
                        {client.phone || "—"}
                      </span>
                    </td>

                    {canManage && (
                      <td className="entity-actions">
                        <button
                          className="entity-action-button"
                          type="button"
                          onClick={() =>
                            navigate(`/clients/${client.id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="entity-action-button danger"
                          type="button"
                          disabled={deletingId === client.id}
                          onClick={() => handleDelete(client)}
                        >
                          {deletingId === client.id ? "Deleting..." : "Delete"}
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
