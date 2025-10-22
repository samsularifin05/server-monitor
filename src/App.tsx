import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingFallback from "./components/loading/loadingFallback"; // Tetap static karena digunakan di Suspense
import { ConfirmDialog } from "./components/modal/confrmasiDialog";
import ClientPage from "./pages/admin/client";

const LoginPage = lazy(() => import("./pages/auth"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UsersPage = lazy(() => import("./pages/admin/users"));
const UpdateStatusPage = lazy(() => import("./pages/admin/UpdateStatusPage"));
const CustomerDashboard = lazy(
  () => import("./pages/customer/CustomerDashboard")
);
const PublicStatusPage = lazy(() => import("./pages/public/PublicStatusPage"));
const GroupPage = lazy(() => import("./pages/admin/group"));
const DataBasePage = lazy(() => import("./pages/admin/database"));
const NotFoundPage = lazy(() => import("./pages/admin/NotFoundPages"));
const VpsPage = lazy(() => import("./pages/admin/vps"));
const AdminChatPanel = lazy(() => import("./pages/admin/adminChat"));

function App() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<PublicStatusPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/group" element={<GroupPage />} />
          <Route path="/admin/data-users" element={<UsersPage />} />
          <Route path="/admin/client" element={<ClientPage />} />
          <Route path="/admin/database" element={<DataBasePage />} />
          <Route path="/admin/vps" element={<VpsPage />} />
          <Route path="/admin/updates" element={<UpdateStatusPage />} />
          <Route path="/admin/chat" element={<AdminChatPanel />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ConfirmDialog />
    </div>
  );
}

export default App;
