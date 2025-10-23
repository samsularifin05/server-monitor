import AdminLayout from "../AdminLayout";
import { withAuth } from "../../../middleware/checkLogin";
import { GlobalModal } from "../../../components";
import ProgramForm from "./form";
import { useModal } from "../../../store/useModal";
import ListProgram from "./table/listProgram";
import FormActionProgram from "./form/formActionProgram";
import { IProgramResponseDTO } from "./types/response.dto";

function WrapperGropup() {
  const { modalData, modalType } = useModal<IProgramResponseDTO>();

  return (
    <AdminLayout activePage="program">
      <ListProgram />
      <GlobalModal
        title={
          modalType === "Add"
            ? "Tambah Program"
            : modalType === "Detail"
            ? modalData?.nama_program
            : "Edit Program"
        }
        size={modalType === "Add" ? "lg" : "md"}
      >
        {modalType === "Add" ? <ProgramForm /> : <FormActionProgram />}
      </GlobalModal>
    </AdminLayout>
  );
}

const ProgramPage = withAuth(WrapperGropup);
export default ProgramPage;
