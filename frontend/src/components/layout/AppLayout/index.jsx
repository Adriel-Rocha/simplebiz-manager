import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import "./styles.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-content">
        <Header />
        <main className="page-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
