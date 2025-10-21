import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RenderTextInput } from "../../../../components";
import { IDatabaseRequestDTO } from "../types/request.dto";
import { DatabaseSchema } from "../validate";
import { useCreate, useEdit } from "../service";
import toast from "react-hot-toast";
import { useModal } from "../../../../store/useModal";

export default function DatabaseForm() {
  const { closeModal, modalData } = useModal();

  const form = useForm<IDatabaseRequestDTO>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: modalData
      ? modalData
      : {
          _id: "",
          kode_database: "",
          nama_database: "",
          basis_data: "",
          akun: "",
          port: "",
          user: "",
          password_akun: "",
          password_koneksi: "",
          backend_uri: "",
        },
  });

  const createDatabase = useCreate();
  const editDatabase = useEdit();

  const onSubmit = async (data: IDatabaseRequestDTO) => {
    try {
      if (!data._id) {
        delete data._id;
        await createDatabase.mutateAsync(data);
      } else {
        await editDatabase.mutateAsync(data);
      }

      toast.success("Database berhasil disimpan");
      form.reset();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan database");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <RenderTextInput control={form.control} name="_id" type="hidden" />
      <div className="grid grid-cols-2 gap-3">
        <RenderTextInput
          type="text"
          control={form.control}
          name="kode_database"
          placeholder="Masukkan kode database"
          label="Kode Database"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="nama_database"
          placeholder="Masukkan nama database"
          label="Nama Database"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="basis_data"
          placeholder="Masukkan basis data (MySQL, PostgreSQL, dll)"
          label="Basis Data"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="akun"
          placeholder="Masukkan nama akun (opsional)"
          label="Akun"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="port"
          placeholder="Masukkan port"
          label="Port"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="user"
          placeholder="Masukkan user"
          label="User"
        />
        <RenderTextInput
          type="password"
          control={form.control}
          name="password_akun"
          placeholder="Masukkan password akun"
          label="Password Akun"
        />
        <RenderTextInput
          type="password"
          control={form.control}
          name="password_koneksi"
          placeholder="Masukkan password koneksi"
          label="Password Koneksi"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="backend_uri"
          placeholder="Masukkan backend URI"
          label="Backend URI"
        />

        <div className="col-span-2 mt-4">
          <Button label="Simpan" size="lg" type="submit" fullWidth />
        </div>
      </div>
    </form>
  );
}
