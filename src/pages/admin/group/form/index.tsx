import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RenderTextInput } from "../../../../components";
import { IgroupRequestDTO } from "../types/request.dto";
import { GroupSchema } from "../validate";
import { useCreate, useEdit } from "../service";
import toast from "react-hot-toast";
import { useModal } from "../../../../store/useModal";

// --- Komponen Form ---
export default function GroupForm() {
  const { closeModal, modalData, modalType } = useModal();

  const form = useForm<IgroupRequestDTO>({
    resolver: zodResolver(GroupSchema),
    defaultValues: modalData
      ? modalData
      : {
          _id: "",
          kode_group: "",
          nama_group: "",
          deskripsi: "",
        },
  });

  const createGroup = useCreate();
  const editGroup = useEdit();

  const onSubmit = async (data: IgroupRequestDTO) => {
    try {
      if (!data._id) {
        delete data._id;
        await createGroup.mutateAsync(data);
      } else {
        await editGroup.mutateAsync(data);
      }

      toast.success("Produk berhasil disimpan");
      form.reset();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan produk");
    }
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <RenderTextInput control={form.control} name="_id" type="hidden" />
      <div className="grid grid-cols-2 gap-2">
        {/* Kode Group */}
        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="kode_group"
            placeholder="Masukkan Kode Group"
            label="Kode Group"
          />
        </div>

        <div>
          {/* Nama Group */}
          <RenderTextInput
            type="text"
            control={form.control}
            name="nama_group"
            placeholder="Masukkan Nama Group"
            label="Nama Group"
          />
        </div>

        <div>
          {/* Deskripsi */}
          <RenderTextInput
            type="text"
            control={form.control}
            name="deskripsi"
            placeholder="Masukkan Deskripsi"
            label="Deskripsi"
          />
        </div>
        <div className="mt-6">
          <Button
            label={modalType === "Add" ? "Simpan" : "Edit"}
            size="lg"
            type="submit"
            fullWidth
          />
        </div>
      </div>
    </form>
  );
}
