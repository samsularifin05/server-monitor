import { Edit, Lock, Plus, Store, Trash2 } from "lucide-react";
import { DataTable } from "../../../../components";
import { Column } from "../../../../components/table";
import { IuserResponseDTO } from "../types/response.dto";
import { ActionButton } from "../../../../components/table/types";
import { useModal } from "../../../../store/useModal";
import { useClient, useDelete } from "../service";
import toast from "react-hot-toast";
import { useConfirmStore } from "../../../../store/useConfirmStore";

const TableClient = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useClient();
  const deleteUser = useDelete();
  const { openConfirm } = useConfirmStore();

  const columns: Column<IuserResponseDTO>[] = [
    {
      key: "user_name",
      header: "Nama User",
      render: (v) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gold-100 rounded-lg">
            <Store className="w-5 h-5 text-gold-600" />
          </div>
          <span className="text-sm font-medium text-gray-800">{v}</span>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "no_whatsapp", header: "No WhatsApp" },
    {
      key: "kode_group",
      header: "Kode Group",
    },
    { key: "level", header: "Level" },
  ];

  const handleDelete = async (userId: string) => {
    openConfirm("Apakah kamu yakin ingin menghapus user ini?", async () => {
      try {
        await toast.promise(deleteUser.mutateAsync(userId), {
          loading: "Menghapus user...",
          success: "User berhasil dihapus!",
          error: "Gagal menghapus user.",
        });
      } catch (error) {
        toast.error("Terjadi kesalahan saat menghapus user");
      }
    });
  };
  const actions: ActionButton<IuserResponseDTO>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => {
        console.log("Edit row:", row);
        openModal("Edit", row);
      },
      variant: "default",
    },
    {
      icon: <Lock className="h-4 w-4" />,
      onClick: (row) => openModal("EditPassword", row),
      variant: "secondary",
    },
    {
      icon: <Trash2 className="h-4 w-4 text-danger" />,
      onClick: (row) => handleDelete(row._id),
      variant: "destructive",
    },
    {
      icon: <Plus className="h-4 w-4" />,
      onClick: () => openModal("Add"),
      variant: "default",
      isAdd: true,
      label: "Tambah Client",
    },
  ];
  return (
    <DataTable
      data={data || []}
      columns={columns}
      loading={isLoading}
      actions={actions}
      searchPlaceholder="Cari Client..."
    />
  );
};

export default TableClient;
