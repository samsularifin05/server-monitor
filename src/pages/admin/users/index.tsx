import AdminLayout from "../AdminLayout";
import { GlobalModal } from "../../../components";
import { withAuth } from "../../../middleware/checkLogin";
import TableDataUser from "./table";
import UserForm from "./form";
import { useModal } from "../../../store/useModal";
import FormEditPassword from "./form/formEditPassword";

function UsersPage() {
  const { modalType } = useModal();

  return (
    <AdminLayout activePage="users">
      <TableDataUser />
      <GlobalModal
        title={
          modalType === "Edit"
            ? "Edit User"
            : modalType === "EditPassword"
            ? "Edit Password"
            : "Tambah User"
        }
        size={"md"}
      >
        {modalType === "EditPassword" ? <FormEditPassword /> : <UserForm />}
      </GlobalModal>
    </AdminLayout>
  );
}

const WrapperCustomer = withAuth(UsersPage);
export default WrapperCustomer;
