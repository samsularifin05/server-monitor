import { Edit, Plus, Trash2 } from "lucide-react";
import DataTable, { Column } from "../../../../components/table";
import { useModal } from "../../../../store/useModal";
import { useDelete, useDatabase } from "../service";
import { IDatabaseResponseDTO } from "../types/response.dto";
import { ActionButton } from "../../../../components/table/types";
import toast from "react-hot-toast";

const TableDatabase = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useDatabase();
  const deleteDatabase = useDelete();

  const columns: Column<IDatabaseResponseDTO>[] = [
    {
      key: "kode_database",
      header: "Kode Database",
    },
    {
      key: "nama_database",
      header: "Nama Database",
    },
    {
      key: "basis_data",
      header: "Basis Data",
    },
    {
      key: "user",
      header: "User",
    },
    {
      key: "port",
      header: "Port",
    },
    {
      key: "backend_uri",
      header: "Backend URI",
    },
  ];

  const handleDelete = async (databaseId: string) => {
    try {
      toast.promise(deleteDatabase.mutateAsync(databaseId), {
        loading: "Menghapus data...",
        success: <b>Database berhasil dihapus!</b>,
        error: <b>Gagal menghapus database.</b>,
      });
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus database");
    }
  };

  const actions: ActionButton<IDatabaseResponseDTO>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => {
        console.log("Edit row:", row);
        openModal("EditDatabase", row);
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
      onClick: () => openModal("AddDatabase"),
      variant: "default",
      isAdd: true,
      label: "Tambah Database",
    },
  ];

  return (
    <DataTable
      data={data || []}
      columns={columns}
      loading={isLoading}
      actions={actions}
      searchPlaceholder="Cari database..."
    />
  );
};

export default TableDatabase;
