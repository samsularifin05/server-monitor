import AdminLayout from "../AdminLayout";
import { withAuth } from "../../../middleware/checkLogin";
import { GlobalModal } from "../../../components";
import TableDatabase from "./table";
import DatabaseForm from "./form";

function WrapperDataBase() {
  return (
    <AdminLayout activePage="database">
      <TableDatabase />
      <GlobalModal title="Tambah Database" size="lg">
        <DatabaseForm />
      </GlobalModal>
    </AdminLayout>
  );
}

const DataBasePage = withAuth(WrapperDataBase);
export default DataBasePage;
