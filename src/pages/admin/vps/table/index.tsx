import { Edit, Plus, Trash2 } from "lucide-react";
import DataTable, { Column } from "../../../../components/table";
import { useModal } from "../../../../store/useModal";
import { useDelete, useVps } from "../service";
import { IVpsResponseDTO } from "../types/response.dto";
import { ActionButton } from "../../../../components/table/types";
import toast from "react-hot-toast";

const TableVps = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useVps();
  const deleteDatabase = useDelete();

  const columns: Column<IVpsResponseDTO>[] = [
    { key: "kode_vps", header: "Kode VPS" },
    { key: "fungsional", header: "Fungsional" },
    { key: "akun_email", header: "Email Akun" },
    { key: "user_login", header: "User Login" },
    { key: "port", header: "Port" },
    { key: "login_vnc", header: "Login VNC" },
    { key: "expire_ssl", header: "Expired SSL" },
  ];

  const handleDelete = async (vpsId: string) => {
    try {
      toast.promise(deleteDatabase.mutateAsync(vpsId), {
        loading: "Menghapus data...",
        success: <b>VPS berhasil dihapus!</b>,
        error: <b>Gagal menghapus VPS.</b>,
      });
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus VPS");
    }
  };

  const actions: ActionButton<IVpsResponseDTO>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => {
        console.log("Edit row:", row);
        openModal("EditVps", row);
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
      onClick: () => openModal("AddVps"),
      variant: "default",
      isAdd: true,
      label: "Tambah Vps",
    },
  ];

  return (
    <DataTable
      data={data || []}
      columns={columns}
      loading={isLoading}
      actions={actions}
      searchPlaceholder="Cari VPS..."
    />
  );
};

export default TableVps;
