import { useEffect, useState } from "react";
import { createClient, getClientById, updateClient } from "../../../api/clientService";
import { useNavigate, useParams } from "react-router-dom";
import './styles.css';

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
    <div className="form-container">
      <h1>{id ? "Editar Cliente" : "Novo Cliente"}</h1>

      <form onSubmit={handleSubmit} className="client-form">
        <input name="name" value={form.name} placeholder="Nome" onChange={handleChange} />
        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
        <input name="phone" value={form.phone} placeholder="Celular" onChange={handleChange} />

        <div className="form-actions">
          <button type="submit" className="btn-primary">Salvar</button>
          <button type="button" className="btn-danger" onClick={() => navigate("/clients")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
