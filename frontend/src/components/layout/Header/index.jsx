import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";

export default function Header() {
  const { user, logout } = useAuth();

  const displayName = user?.email?.split("@")[0] || "Account";
  const roleLabel = user?.role === "ADMIN" ? "Administrator" : "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="app-header">
      <div className="header-copy">
        <span>BUSINESS MANAGEMENT</span>
      </div>

      <div className="header-user">
        <div className="header-account">
          <div className="header-avatar">{initial}</div>

          <div className="header-account-copy">
            <strong>{displayName}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>

        <button
          className="header-logout"
          type="button"
          onClick={logout}
          title="Sign out"
        >
          <span>↪</span>
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
}
