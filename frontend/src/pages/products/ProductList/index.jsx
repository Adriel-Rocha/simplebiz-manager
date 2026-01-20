import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/productService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      const response = await getProducts(page);
      if (isMounted) {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    }

    fetchProducts();

    return () => {isMounted = false;};
  }, [page]);

  return (
    <div className="container">
      <div className="product-header">
        <h1>Produtos</h1>

        {user?.role === "ADMIN" && (
          <button className="btn-primary" onClick={() => navigate("/products/new")}>Novo Produto</button>
        )}
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            {user?.role === "ADMIN" && <th>Ações</th>}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>

              {user?.role === "ADMIN" && (
                <td>
                  <button className="btn-warning" onClick={() => navigate(`/products/${product.id}`)}>Editar</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn-danger" onClick={() => deleteProduct(product.id)}>Excluir</button>
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
