import { useEffect, useState } from "react";
import { createProduct, getProductById, updateProduct } from "../../../api/productService";
import { useNavigate, useParams } from "react-router-dom";
import './styles.css';

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    active: true
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  if (!id) return;

  let isMounted = true;

  async function fetchProduct() {
    const response = await getProductById(id);
    if (isMounted) {
      setForm(response.data);
    }
  }

  fetchProduct();

  return () => {
    isMounted = false;
  };
}, [id]);


  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      await updateProduct(id, form);
    } else {
      await createProduct(form);
    }

    navigate("/products");
  }

  return (
    <div className="form-container">
      <h1>{id ? "Editar Produto" : "Novo Produto"}</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" value={form.name} placeholder="Nome" onChange={handleChange} />
        <textarea name="description" value={form.description} placeholder="Descrição" onChange={handleChange} />
        <input name="price" value={form.price} type="number" step="0.01" placeholder="Preço" onChange={handleChange} required />
        <input name="stock" value={form.stock} type="number" placeholder="Estoque" onChange={handleChange} required />
        <label className="checkbox">
          <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
          Produto ativo
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Salvar</button>
          <button type="button" className="btn-danger" onClick={() => navigate("/products")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
