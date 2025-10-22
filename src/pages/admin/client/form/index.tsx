import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RenderTextInput } from "../../../../components";
import RenderSelectInput from "../../../../components/input/renderSelectInput";
import { useGroup } from "../../group/service";
import { createUserSchema, UserFormData } from "../validate";
import { useModal } from "../../../../store/useModal";
import { useCreate, useEdit } from "../service";
import toast from "react-hot-toast";

export default function ClientForm() {
  const { modalData, closeModal, modalType } = useModal();

  const { data: dataGroup } = useGroup();
  const schema = createUserSchema(modalType || "CreateUser");

  const form = useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues: modalData || {
      user_id: "",
      user_name: "",
      email: "",
      password: "",
      level: "CLIENT",
      kode_group: "",
      // no_whatsapp tidak diisi, biarkan schema zod yang handle default
    },
  });

  const createUser = useCreate();
  const editUser = useEdit();
  const onSubmit = async (data: UserFormData) => {
    try {
      if (!data._id) {
        delete data._id;
        await createUser.mutateAsync(data);
      } else {
        await editUser.mutateAsync(data);
      }
      toast.success("User berhasil disimpan");
      form.reset();
      closeModal();
    } catch (error) {
      toast.error(`${error || "Gagal menyimpan user"}`);
    }
  };

  const isEdit = modalType === "Edit";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))}
      className="space-y-4"
    >
      <RenderTextInput type="hidden" control={form.control} name="_id" />
      <div className="grid grid-cols-2 gap-2">
        {/* User ID */}
        <RenderTextInput
          type="text"
          control={form.control}
          name="user_id"
          readOnly={isEdit}
          placeholder="Masukkan User ID"
          label="User ID"
        />

        <RenderTextInput
          type="text"
          control={form.control}
          name="email"
          readOnly={isEdit}
          placeholder="Masukkan Email"
          label="Email"
        />

        {/* Password */}
        {modalType !== "Edit" && (
          <RenderTextInput
            type="password"
            control={form.control}
            name="password"
            placeholder="Masukkan Password"
            label="Password"
          />
        )}

        {/* Nama User */}
        <RenderTextInput
          type="text"
          control={form.control}
          name="user_name"
          placeholder="Masukkan Nama User"
          label="Nama User"
        />

        {/* Level */}
        <RenderSelectInput
          control={form.control}
          name="level"
          label="Level"
          required
          options={[
            { label: "CLIENT", value: "CLIENT" },
            { label: "ADMIN", value: "ADMIN" },
            { label: "DEVOPS", value: "DEVOPS" },
            { label: "SU", value: "SU" },
          ]}
        />

        {/* Kode Group */}
        <RenderSelectInput
          control={form.control}
          name="kode_group"
          label="Kode Group"
          required
          options={(dataGroup || [])?.map((group) => ({
            label: group.nama_group,
            value: group.kode_group,
          }))}
        />

        {/* Nomor WhatsApp */}
        <RenderTextInput
          type="text"
          control={form.control}
          name="no_whatsapp"
          placeholder="Masukkan Nomor WhatsApp"
          label="Nomor WhatsApp"
        />
      </div>
      <Button
        label={isEdit ? "Edit" : "Simpan"}
        className="mt-7"
        size="lg"
        type="submit"
        fullWidth
      />
    </form>
  );
}
