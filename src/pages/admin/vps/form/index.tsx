import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RenderTextInput } from "../../../../components";
import { IVpsRequestDTO } from "../types/request.dto";
import { VpsSchema } from "../validate";
import { useCreate, useEdit } from "../service";
import toast from "react-hot-toast";
import { useModal } from "../../../../store/useModal";

export default function VpsForm() {
  const { closeModal, modalData } = useModal();

  const form = useForm<IVpsRequestDTO>({
    resolver: zodResolver(VpsSchema),
    defaultValues: modalData
      ? modalData
      : {
          _id: "",
          kode_vps: "",
          fungsional: "",
          akun_email: "",
          password_akun: "",
          user_login: "",
          password_vps: "",
          login_vnc: "",
          port: "",
          expire_ssl: "",
        },
  });

  const createVps = useCreate();
  const editVps = useEdit();

  const onSubmit = async (data: IVpsRequestDTO) => {
    try {
      if (!data._id) {
        delete data._id;
        await createVps.mutateAsync(data);
      } else {
        await editVps.mutateAsync(data);
      }

      toast.success("VPS berhasil disimpan");
      form.reset();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan VPS");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <RenderTextInput control={form.control} name="_id" type="hidden" />
      <div className="grid grid-cols-2 gap-3">
        <RenderTextInput
          type="text"
          control={form.control}
          name="kode_vps"
          placeholder="Masukkan kode VPS"
          label="Kode VPS"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="fungsional"
          placeholder="Masukkan fungsional"
          label="Fungsional"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="akun_email"
          placeholder="Masukkan email akun"
          label="Email Akun"
        />
        <RenderTextInput
          type="password"
          control={form.control}
          name="password_akun"
          placeholder="Masukkan password akun"
          label="Password Akun"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="user_login"
          placeholder="Masukkan user login"
          label="User Login"
        />
        <RenderTextInput
          type="password"
          control={form.control}
          name="password_vps"
          placeholder="Masukkan password VPS"
          label="Password VPS"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="login_vnc"
          placeholder="Masukkan login VNC"
          label="Login VNC"
        />
        <RenderTextInput
          type="text"
          control={form.control}
          name="port"
          placeholder="Masukkan port"
          label="Port"
        />
        <RenderTextInput
          type="date"
          control={form.control}
          name="expire_ssl"
          placeholder="Masukkan tanggal expired SSL"
          label="Expired SSL"
        />

        <div className="col-span-2 mt-4">
          <Button label="Simpan" size="lg" type="submit" fullWidth />
        </div>
      </div>
    </form>
  );
}
