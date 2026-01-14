import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ClientList from "../pages/clients/ClientList";
import ClientForm from "../pages/clients/ClientForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route path="*" element={<Login />} />
      <Route path="/clients" element={<ClientList />} />
      <Route path="/clients/new" element={<ClientForm />} />
      <Route path="/clients/:id" element={<ClientForm />} />
    </Routes>
  );
};

export default AppRoutes;
