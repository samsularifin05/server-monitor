import { Edit2, Trash2, UserIcon } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { DataTable } from "../../../components";
import { Column } from "../../../components/table";
import { Icustomer } from "./types";
import { dataCustomers } from "./data";
import { GlobalModal } from "../../../components";
import { useModal } from "../../../store/useModal";

export default function CustomersPage() {
  const { openModal, closeModal } = useModal();
  const columns: Column<Icustomer>[] = [
    {
      key: "name",
      header: "Nama Customer",
      render: (v) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <UserIcon className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-800">{v}</span>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    {
      key: "stores",
      header: "Jumlah Toko",
      render: (v) => `${v} toko`,
    },
    { key: "createdAt", header: "Tanggal Dibuat" },
    {
      key: "id",
      header: "Aksi",
      render: () => (
        <div className="flex gap-2">
          <button className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout activePage="customers">
      <div className="space-y-6">
        <DataTable
          data={dataCustomers}
          columns={columns}
          addButton={{
            label: "Tambah Customer",
            onClick: () => openModal("addCustomer"),
            show: true,
          }}
          searchPlaceholder="Cari customer..."
        />
      </div>
      <GlobalModal
        title="Tambah Customer"
        size="lg"
        footer={
          <>
            <button
              onClick={() => closeModal()}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              Tutup
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Simpan
            </button>
          </>
        }
      >
        <p className="text-gray-700">
          bergaya kaca. Kamu bisa isi form, tabel, atau komponen lain di sini.
        </p>
      </GlobalModal>
    </AdminLayout>
  );
}
