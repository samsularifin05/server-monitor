import AdminLayout from "../AdminLayout";
import { withAuth } from "../../../middleware/checkLogin";
import { GlobalModal } from "../../../components";
import TableVps from "./table";
import DatabaseForm from "./form";

function WrapperVps() {
  return (
    <AdminLayout activePage="vps">
      <TableVps />
      <GlobalModal title="Tambah VPS" size="lg">
        <DatabaseForm />
      </GlobalModal>
    </AdminLayout>
  );
}

const VpsPage = withAuth(WrapperVps);
export default VpsPage;
