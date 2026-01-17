import { useEffect, useState } from "react";
import { getClients, deleteClient } from "../../../api/clientService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function fetchClients() {
      const response = await getClients(page);
      if (isMounted) {
        setClients(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    }

    fetchClients();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="container">
      <div className="client-header">
        <h1>Clientes</h1>

        {user?.role === "ADMIN" && (
          <button className="btn-primary" onClick={() => navigate("/clients/new")}>Novo Cliente</button>
        )}
      </div>

      <table className="client-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            {user?.role === "ADMIN" && <th>Ações</th>}
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>

              {user?.role === "ADMIN" && (
                <td>
                  <button className="btn-warning" onClick={() => navigate(`/clients/${client.id}`)}>Editar</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn-danger" onClick={() => deleteClient(client.id)}>Excluir</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Anterior</button>

        <span>
          {page + 1} / {totalPages}
        </span>

        <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>
    </div>
  );
}
