import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RenderTextInput } from "../../../../components";
import { EditPasswordSchema } from "../validate";
import { useModal } from "../../../../store/useModal";
import { IUserUpdatePassword } from "../types/request.dto";
import { useEditPassword } from "../service";
import toast from "react-hot-toast";

export default function FormEditPassword() {
  const { modalData, closeModal } = useModal();

  const form = useForm<IUserUpdatePassword>({
    resolver: zodResolver(EditPasswordSchema),
    defaultValues: modalData
      ? modalData
      : {
          _id: "",
          password: "",
        },
  });

  const editPassword = useEditPassword();
  const onSubmit = async (data: IUserUpdatePassword) => {
    try {
      await editPassword.mutateAsync(data);
      toast.success("Edit Password berhasil disimpan");
      form.reset();
      closeModal();
    } catch (error) {
      toast.error(`${error || "Gagal menyimpan user"}`);
    }
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))}
      className="space-y-4"
    >
      <RenderTextInput type="hidden" control={form.control} name="_id" />
      <div className="grid grid-cols-2 gap-2">
        {/* User ID */}
        <RenderTextInput
          type="password"
          control={form.control}
          name="password"
          placeholder="Masukkan Password"
          label="Password"
        />
        <Button
          label={"Edit Password"}
          className="mt-7"
          size="lg"
          type="submit"
          fullWidth
        />
      </div>
    </form>
  );
}
