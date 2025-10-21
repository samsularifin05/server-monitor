import AdminLayout from "../AdminLayout";
import { GlobalModal } from "../../../components";
import { withAuth } from "../../../middleware/checkLogin";
import CustomerForm from "./form";
import TableDataCustomer from "./table";

function CustomersPage() {
  return (
    <AdminLayout activePage="customers">
      <TableDataCustomer />
      <GlobalModal title="Tambah Customer" size="lg">
        <CustomerForm />
      </GlobalModal>
    </AdminLayout>
  );
}

const WrapperCustomer = withAuth(CustomersPage);
export default WrapperCustomer;
