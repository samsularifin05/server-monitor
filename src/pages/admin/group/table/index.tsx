import { Edit, Plus, Trash2 } from "lucide-react";
import DataTable, { Column } from "../../../../components/table";
import { useModal } from "../../../../store/useModal";
import { useDelete, useGroup } from "../service";
import { IGroupResponseDTO } from "../types/response.dto";
import { ActionButton } from "../../../../components/table/types";
import toast from "react-hot-toast";
import { useConfirmStore } from "../../../../store/useConfirmStore";

const TableGroup = () => {
  const { openModal } = useModal();

  const { data, isLoading } = useGroup();
  const deleteGroup = useDelete();
  const { openConfirm } = useConfirmStore();

  const columns: Column<IGroupResponseDTO>[] = [
    {
      key: "kode_group",
      header: "Kode Group",
    },
    { key: "nama_group", header: "Nama Group" },
    { key: "deskripsi", header: "Deskripsi" },
  ];

  const handleDelete = async (groupId: string) => {
    openConfirm("Apakah kamu yakin ingin menghapus user ini?", async () => {
      try {
        toast.promise(deleteGroup.mutateAsync(groupId), {
          loading: "Deleting...",
          success: <b>Delete Group Berhasil!</b>,
          error: <b>Gagal Delete Group.</b>,
        });
      } catch (error) {
        toast.error("Gagal menghapus Group");
      }
    });
  };

  const actions: ActionButton<IGroupResponseDTO>[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => {
        openModal("Edit", row);
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
      onClick: () => openModal("Add"),
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
      searchPlaceholder="Cari group..."
    />
  );
};

export default TableGroup;
