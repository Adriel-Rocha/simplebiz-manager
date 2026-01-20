import "./styles.css";
import { useAuth } from "../../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <h2>SimpleBiz</h2>

      <div className="header-user">
        <span>{user?.email}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </header>
  );
}
