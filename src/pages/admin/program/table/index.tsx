import { Edit, Plus, Trash2 } from "lucide-react";
import DataTable, { Column } from "../../../../components/table";
import { useModal } from "../../../../store/useModal";
import { useDelete, useProgram } from "../service";
import { IProgramResponseDTO } from "../types/response.dto";
import { ActionButton } from "../../../../components/table/types";
import toast from "react-hot-toast";
import { useConfirmStore } from "../../../../store/useConfirmStore";

const TableProgram = () => {
  const { openModal } = useModal();

  const { data, isLoading } = useProgram();
  const deleteGroup = useDelete();
  const { openConfirm } = useConfirmStore();

  const columns: Column<IProgramResponseDTO>[] = [
    {
      key: "kode_program",
      header: "Kode Program",
    },
    {
      key: "kode_toko",
      header: "Kode Toko",
    },
    { key: "nama_program", header: "Nama Program" },
    { key: "domain", header: "Domain" },
    { key: "deskripsi", header: "Deskripsi" },
  ];

  const handleDelete = async (programId: string) => {
    openConfirm("Apakah kamu yakin ingin menghapus program ini?", async () => {
      try {
        toast.promise(deleteGroup.mutateAsync(programId), {
          loading: "Deleting...",
          success: <b>Delete Program Berhasil!</b>,
          error: <b>Gagal Delete Program.</b>,
        });
      } catch (error) {
        toast.error("Gagal menghapus Program");
      }
    });
  };

  const actions: ActionButton<IProgramResponseDTO>[] = [
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
      label: "Tambah Program",
    },
  ];

  return (
    <DataTable
      data={data || []}
      columns={columns}
      loading={isLoading}
      actions={actions}
      searchPlaceholder="Cari Program..."
    />
  );
};

export default TableProgram;
