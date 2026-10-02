import { useEffect, useState } from "react";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../api/productService";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

export default function ProductForm() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    active: true,
  });
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchProduct() {
      setLoading(true);
      setError("");

      try {
        const response = await getProductById(id);

        if (isMounted) {
          setForm({
            name: response.data.name || "",
            description: response.data.description || "",
            price: response.data.price ?? "",
            stock: response.data.stock ?? "",
            active: response.data.active ?? true,
          });
        }
      } catch (requestError) {
        if (isMounted) {
          console.error("Failed to load product:", requestError);
          setError("We couldn't load this product.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }

      navigate("/products");
    } catch (requestError) {
      console.error("Failed to save product:", requestError);
      setError(
        "We couldn't save this product. Check the fields and try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="form-page">
      <section className="form-header">
        <div>
          <p className="form-eyebrow">PRODUCTS</p>
          <h1>{id ? "Edit product" : "Add product"}</h1>
          <p>
            {id
              ? "Update product information, pricing and stock."
              : "Create a product for your business catalog."}
          </p>
        </div>
      </section>

      {error && (
        <div className="form-alert" role="alert">
          {error}
        </div>
      )}

      <section className="form-card">
        {loading ? (
          <div className="form-loading">Loading product...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="full-width">
                <span>Name</span>
                <input
                  name="name"
                  value={form.name}
                  placeholder="Business Plan"
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="full-width">
                <span>Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Describe the product..."
                  onChange={handleChange}
                  rows="5"
                />
              </label>

              <label>
                <span>Price (USD)</span>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  placeholder="79.00"
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>Stock</span>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  placeholder="50"
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-checkbox full-width">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />

                <span>
                  <strong>Active product</strong>
                  <small>
                    Keep this product available in the catalog.
                  </small>
                </span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="form-secondary-button"
                onClick={() => navigate("/products")}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="form-primary-button"
                disabled={saving}
              >
                {saving ? "Saving..." : id ? "Save changes" : "Create product"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
