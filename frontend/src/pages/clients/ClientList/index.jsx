import { useEffect, useState } from "react";
import { getClients, deleteClient } from "../../../api/clientService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

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
    <div>
      <h1>Clientes</h1>

      <button onClick={() => navigate("/clients/new")}>
        Novo Cliente
      </button>

      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name}
            <button onClick={() => navigate(`/clients/${client.id}`)}>
              Editar
            </button>
            <button onClick={() => deleteClient(client.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>{page + 1} / {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
