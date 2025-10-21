import { useForm } from "react-hook-form";
import { CustomerSchema } from "../validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { IcustomerRequestDTO } from "../types/request.dto";
import { RenderTextInput } from "../../../../components";

// --- Komponen Form ---
export default function CustomerForm() {
  const form = useForm<IcustomerRequestDTO>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      user_id: "",
      password: "",
      nama_customer: "",
      email: "",
      jumlah_toko: 1,
      created_at: new Date().toISOString().slice(0, 10), // default ke tanggal hari ini
    },
  });

  const onSubmit = (data: IcustomerRequestDTO) => {
    console.log("Form data:", data);
    alert("Data berhasil disubmit!");
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
      <div className="grid grid-cols-2 gap-2">
        {/* User ID */}
        <RenderTextInput
          type="text"
          control={form.control}
          name="user_id"
          placeholder="Masukkan User id"
          label="User Id"
        />

        {/* Password */}
        <RenderTextInput
          type="password"
          control={form.control}
          name="password"
          placeholder="Masukkan Password"
          label="Password"
        />

        {/* Nama Customer */}
        <RenderTextInput
          type="text"
          control={form.control}
          name="nama_customer"
          placeholder="Masukkan Nama Customer"
          label="Nama Customer"
        />

        {/* Email */}
        <RenderTextInput
          type="email"
          control={form.control}
          name="email"
          placeholder="Masukkan Email"
          label="Email"
        />

        <RenderTextInput
          type="number"
          control={form.control}
          name="jumlah_toko"
          placeholder="Masukkan Jumlah Toko"
          label="Jumlah Toko"
        />

        <RenderTextInput
          type="date"
          control={form.control}
          name="created_at"
          label="Tanggal Dibuat"
        />
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Simpan
      </button>
    </form>
  );
}
