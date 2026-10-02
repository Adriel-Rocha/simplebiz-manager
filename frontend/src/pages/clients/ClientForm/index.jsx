import { useEffect, useState } from "react";
import {
  createClient,
  getClientById,
  updateClient,
} from "../../../api/clientService";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

export default function ClientForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(Boolean(useParams().id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchClient() {
      setLoading(true);
      setError("");

      try {
        const response = await getClientById(id);

        if (isMounted) {
          setForm({
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
          });
        }
      } catch (requestError) {
        if (isMounted) {
          console.error("Failed to load client:", requestError);
          setError("We couldn't load this customer.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchClient();

    return () => {
      isMounted = false;
    };
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (id) {
        await updateClient(id, form);
      } else {
        await createClient(form);
      }

      navigate("/clients");
    } catch (requestError) {
      console.error("Failed to save client:", requestError);
      setError(
        "We couldn't save this customer. Check the fields and try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="form-page">
      <section className="form-header">
        <div>
          <p className="form-eyebrow">CUSTOMERS</p>
          <h1>{id ? "Edit customer" : "Add customer"}</h1>
          <p>
            {id
              ? "Update the customer information below."
              : "Create a customer record for your business."}
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
          <div className="form-loading">Loading customer...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>Name</span>
                <input
                  name="name"
                  value={form.name}
                  placeholder="John Smith"
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="john@example.com"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="full-width">
                <span>Phone</span>
                <input
                  name="phone"
                  value={form.phone}
                  placeholder="+1 202-555-0100"
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="form-secondary-button"
                onClick={() => navigate("/clients")}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="form-primary-button"
                disabled={saving}
              >
                {saving ? "Saving..." : id ? "Save changes" : "Create customer"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
