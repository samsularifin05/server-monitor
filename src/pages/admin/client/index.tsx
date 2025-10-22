import AdminLayout from "../AdminLayout";
import { GlobalModal } from "../../../components";
import { withAuth } from "../../../middleware/checkLogin";
import TableClient from "./table";
import { useModal } from "../../../store/useModal";
import FormEditPassword from "./form/formEditPassword";
import ClientForm from "./form";

function WrapperClient() {
  const { modalType } = useModal();

  return (
    <AdminLayout activePage="client">
      <TableClient />
      <GlobalModal
        title={
          modalType === "Edit"
            ? "Edit CLient"
            : modalType === "EditPassword"
            ? "Edit Password"
            : "Tambah Client"
        }
        size={"md"}
      >
        {modalType === "EditPassword" ? <FormEditPassword /> : <ClientForm />}
      </GlobalModal>
    </AdminLayout>
  );
}

const ClientPage = withAuth(WrapperClient);
export default ClientPage;
