import { useEffect, useState } from "react";
import { createClient, getClientById, updateClient } from "../../../api/clientService";
import { useNavigate, useParams } from "react-router-dom";

export default function ClientForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  if (!id) return;

  let isMounted = true;

  async function fetchClient() {
    const response = await getClientById(id);
    if (isMounted) {
      setForm(response.data);
    }
  }

  fetchClient();

  return () => {
    isMounted = false;
  };
}, [id]);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      await updateClient(id, form);
    } else {
      await createClient(form);
    }

    navigate("/clients");
  }

  return (
    <div>
      <h1>{id ? "Editar Cliente" : "Novo Cliente"}</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="phone" value={form.phone} onChange={handleChange} />

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/clients")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
