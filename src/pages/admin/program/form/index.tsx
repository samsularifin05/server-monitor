import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RenderTextInput } from "../../../../components";
import { IProgramRequestDTO } from "../types/request.dto";
import { useCreate, useEdit } from "../service";
import toast from "react-hot-toast";
import { useModal } from "../../../../store/useModal";
import { ProgramSchema } from "../validate";
import { useLoading } from "@/store/useLoading";

// --- Komponen Form ---
export default function ProgramForm() {
  const { closeModal, modalData, modalType } = useModal();

  const form = useForm<IProgramRequestDTO>({
    resolver: zodResolver(ProgramSchema),
    defaultValues: modalData
      ? modalData
      : {
          _id: "",
          kode_program: "",
          kode_toko: "",
          nama_program: "",
          deskripsi: "",
          domain: "",
        },
  });

  const { startLoading, stopLoading, isLoading } = useLoading();
  const createProgram = useCreate();
  const editProgram = useEdit();

  const onSubmit = async (data: IProgramRequestDTO) => {
    startLoading("button", "program");
    try {
      if (!data._id) {
        delete data._id;
        await createProgram.mutateAsync(data);
      } else {
        await editProgram.mutateAsync(data);
      }

      toast.success("Program berhasil disimpan");
      form.reset();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(`${error || "Gagal menyimpan Program"}`);
    }
    stopLoading("button", "program");
    form.reset();
  };

  const loadingButton = isLoading("button", "program");
  const isEdit = modalType === "Edit";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <RenderTextInput control={form.control} name="_id" type="hidden" />
      <div className="grid grid-cols-2 gap-2">
        {/* Kode Group */}
        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="kode_program"
            readOnly={isEdit}
            placeholder="Masukkan Kode Program"
            label="Kode Program"
          />
        </div>
        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="kode_toko"
            placeholder="Masukkan Kode Toko"
            label="Kode Toko"
          />
        </div>

        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="nama_program"
            readOnly={isEdit}
            placeholder="Masukkan Nama Program"
            label="Nama Program"
          />
        </div>
        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="domain"
            readOnly={isEdit}
            placeholder="Masukkan Domain"
            label="Domain"
          />
        </div>

        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="deskripsi"
            readOnly={isEdit}
            placeholder="Masukkan Deskripsi"
            label="Deskripsi"
          />
        </div>
        <div className="mt-6">
          <Button
            label={modalType === "Add" ? "Simpan" : "Edit"}
            size="lg"
            loading={loadingButton}
            type="submit"
            fullWidth
          />
        </div>
      </div>
    </form>
  );
}
