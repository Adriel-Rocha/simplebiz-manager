import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <h3>SimpleBiz Manager</h3>
      <button onClick={handleLogout}>Sair</button>
    </header>
  );
};

export default Header;
