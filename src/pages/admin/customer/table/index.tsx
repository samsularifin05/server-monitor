import { Edit, Plus, Trash2, UserIcon } from "lucide-react";
import { DataTable } from "../../../../components";
import { Column } from "../../../../components/table";
import { IcustomerResponseDTO } from "../types/response.dto";
import { ActionButton } from "../../../../components/table/types";
import { useModal } from "../../../../store/useModal";
import { useCustomer, useDelete } from "../service";
import toast from "react-hot-toast";

const TableDataCustomer = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useCustomer();
  const deleteGroup = useDelete();

  const columns: Column<IcustomerResponseDTO>[] = [
    {
      key: "nama_customer",
      header: "Nama Customer",
      render: (v) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gold-100 rounded-lg">
            <UserIcon className="w-5 h-5 text-gold-600" />
          </div>
          <span className="text-sm font-medium text-gray-800">{v}</span>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    {
      key: "jumlah_toko",
      header: "Jumlah Toko",
      render: (v) => `${v} toko`,
    },
    { key: "created_at", header: "Tanggal Dibuat" },
  ];

  const handleDelete = async (customerId: string) => {
    try {
      toast.promise(deleteGroup.mutateAsync(customerId), {
        loading: "Deleting...",
        success: <b>Delete Customer Berhasil!</b>,
        error: <b>Gagal Delete Customer.</b>,
      });
    } catch (error) {
      toast.error("Gagal menghapus Customer");
    }
  };
  const actions: ActionButton<IcustomerResponseDTO>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => {
        console.log("Edit row:", row);
        openModal("EditGroup", row);
      },
      variant: "default",
    },
    {
      icon: <Trash2 className="h-4 w-4 text-danger" />,
      onClick: (row) => handleDelete(row._id),
      variant: "destructive",
    },
    {
      icon: <Plus className="h-4 w-4" />,
      onClick: () => openModal("AddGroup"),
      variant: "default",
      isAdd: true,
      label: "Tambah Group",
    },
  ];
  return (
    <DataTable
      data={data || []}
      columns={columns}
      loading={isLoading}
      actions={actions}
      searchPlaceholder="Cari customer..."
    />
  );
};

export default TableDataCustomer;
