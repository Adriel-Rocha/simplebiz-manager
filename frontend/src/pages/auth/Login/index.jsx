import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../../api/authService";
import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginService(email, password);
      login(response.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="login-card">
      <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
