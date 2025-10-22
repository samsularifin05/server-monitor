import AdminLayout from "../AdminLayout";
import { withAuth } from "../../../middleware/checkLogin";
import { GlobalModal } from "../../../components";
import TableGroup from "./table";
import GroupForm from "./form";
import { useModal } from "../../../store/useModal";

function WrapperGropup() {
  const { modalType } = useModal();

  return (
    <AdminLayout activePage="group">
      <TableGroup />
      <GlobalModal
        title={modalType === "Add" ? "Tambah Group" : "Edit Group"}
        size="lg"
      >
        <GroupForm />
      </GlobalModal>
    </AdminLayout>
  );
}

const GroupPage = withAuth(WrapperGropup);
export default GroupPage;
