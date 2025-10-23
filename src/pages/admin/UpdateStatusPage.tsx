import { Save, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminLayout from "./AdminLayout";
import { useServer } from "./program/service";
import RenderSelectInput from "@/components/input/renderSelectInput";
import RenderInputDate from "@/components/input/renderInputDate";

// ✅ Schema validasi pakai Zod
const UpdateStatusSchema = z.object({
  server: z.string().min(1, "Server wajib dipilih"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  status: z.enum(["normal", "gangguan", "down"], {
    error: "Status wajib dipilih",
  }),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
});

type UpdateStatusForm = z.infer<typeof UpdateStatusSchema>;

export default function UpdateStatusPage() {
  const { data: dataServer = [] } = useServer();

  // ✅ Setup form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<UpdateStatusForm>({
    resolver: zodResolver(UpdateStatusSchema),
    defaultValues: {
      server: "",
      date: "",
      status: "normal",
      description: "",
    },
  });

  const onSubmit = async (values: UpdateStatusForm) => {
    console.log("Form data:", values);
    // contoh submit: await updateStatus(values);
    // reset();
  };

  const status = watch("status");

  return (
    <AdminLayout activePage="updates">
      <div className="flex flex-col md:flex-row gap-6">
        {/* FORM */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 w-full md:w-2/3 lg:w-1/2 mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Update Status Gangguan
              </h2>
              <p className="text-gray-600">
                Perbarui status server dan informasikan kepada customer tentang
                kondisi terkini
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Server */}
            <div>
              <RenderSelectInput
                control={control}
                name="server"
                label="Pilih Server"
                options={dataServer.map((server) => ({
                  label: server.nama_server,
                  value: server.kode_server,
                }))}
                placeholder="Pilih Server"
              />
            </div>

            {/* Date */}
            <div>
              <RenderInputDate
                control={control}
                name="date"
                range={true}
                label="Tanggal"
                placeholder="Pilih Tanggal"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status Server
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["normal", "gangguan", "down"].map((val) => (
                  <label
                    key={val}
                    className={`relative flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      status === val
                        ? val === "normal"
                          ? "border-green-500 bg-green-50"
                          : val === "gangguan"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={val}
                      {...register("status")}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full ${
                        val === "normal"
                          ? "bg-green-500"
                          : val === "gangguan"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="font-medium text-gray-800 capitalize">
                      {val}
                    </span>
                  </label>
                ))}
              </div>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Gangguan
              </label>
              <textarea
                {...register("description")}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Jelaskan kondisi server dan informasi yang perlu diketahui customer..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 cursor-pointer bg-gold-400 hover:bg-gold-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? "Menyimpan..." : "Simpan Update"}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-3 cursor-pointer border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>

        {/* Example Preview */}
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 sm:p-6 w-full md:w-1/3 lg:w-1/2 mx-auto mt-6 md:mt-0 h-fit">
          <h3 className="font-semibold text-gold-900 mb-2">
            Contoh Penggunaan:
          </h3>
          <ol className="text-sm text-gold-800 space-y-1 list-decimal list-inside">
            <li>Pilih server yang ingin diupdate (misalnya: Alibaba Cloud)</li>
            <li>Masukkan tanggal update (misalnya: 20-10-2025)</li>
            <li>Pilih status: Normal / Gangguan / Down</li>
            <li>Isi deskripsi gangguan dengan detail yang jelas</li>
            <li>
              Klik "Simpan Update" untuk mengirim notifikasi ke customer terkait
            </li>
          </ol>
        </div>
      </div>
    </AdminLayout>
  );
}
