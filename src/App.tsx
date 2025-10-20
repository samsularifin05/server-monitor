import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import CustomersPage from "./components/admin/CustomersPage";
import StoresPage from "./components/admin/StoresPage";
import ServersPage from "./components/admin/ServersPage";
import UpdateStatusPage from "./components/admin/UpdateStatusPage";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import PublicStatusPage from "./components/public/PublicStatusPage";

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
