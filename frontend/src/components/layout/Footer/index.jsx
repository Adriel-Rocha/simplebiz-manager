import "./styles.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <span>
        © {new Date().getFullYear()} SimpleBiz Manager — Todos os direitos reservados
      </span>
    </footer>
  );
}
