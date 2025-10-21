import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomersPage from "./pages/admin/customer";
import UpdateStatusPage from "./pages/admin/UpdateStatusPage";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import PublicStatusPage from "./pages/public/PublicStatusPage";
import GroupPage from "./pages/admin/group";
import DataBasePage from "./pages/admin/database";
import NotFoundPage from "./pages/admin/NotFoundPages";
import VpsPage from "./pages/admin/vps";
import AdminChatPanel from "./pages/admin/adminChat";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<PublicStatusPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/group" element={<GroupPage />} />
        <Route path="/admin/customers" element={<CustomersPage />} />
        <Route path="/admin/database" element={<DataBasePage />} />
        <Route path="/admin/vps" element={<VpsPage />} />
        <Route path="/admin/updates" element={<UpdateStatusPage />} />
        <Route path="/admin/chat" element={<AdminChatPanel />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
