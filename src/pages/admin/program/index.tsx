import AdminLayout from "../AdminLayout";
import { withAuth } from "../../../middleware/checkLogin";
import { GlobalModal } from "../../../components";
import TableProgram from "./table";
import ProgramForm from "./form";
import { useModal } from "../../../store/useModal";

function WrapperGropup() {
  const { modalType } = useModal();

  return (
    <AdminLayout activePage="program">
      <TableProgram />
      <GlobalModal
        title={modalType === "Add" ? "Tambah Program" : "Edit Program"}
        size="lg"
      >
        <ProgramForm />
      </GlobalModal>
    </AdminLayout>
  );
}

const ProgramPage = withAuth(WrapperGropup);
export default ProgramPage;
