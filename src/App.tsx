import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomersPage from "./pages/admin/customer";
import StoresPage from "./pages/admin/StoresPage";
import ServersPage from "./pages/admin/ServersPage";
import UpdateStatusPage from "./pages/admin/UpdateStatusPage";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import PublicStatusPage from "./pages/public/PublicStatusPage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<PublicStatusPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<CustomersPage />} />
        <Route path="/admin/stores" element={<StoresPage />} />
        <Route path="/admin/servers" element={<ServersPage />} />
        <Route path="/admin/updates" element={<UpdateStatusPage />} />
        <Route path="/customer" element={<CustomerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
