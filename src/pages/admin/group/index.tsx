import AdminLayout from "../AdminLayout";
import { withAuth } from "../../../middleware/checkLogin";
import { GlobalModal } from "../../../components";
import TableGroup from "./table";
import GroupForm from "./form";

function WrapperGropup() {
  return (
    <AdminLayout activePage="group">
      <TableGroup />
      <GlobalModal title="Tambah Group" size="lg">
        <GroupForm />
      </GlobalModal>
    </AdminLayout>
  );
}

const GroupPage = withAuth(WrapperGropup);
export default GroupPage;
