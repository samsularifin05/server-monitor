import { Save, AlertCircle } from "lucide-react";
import { useState } from "react";
import AdminLayout from "./AdminLayout";

export default function UpdateStatusPage() {
  const [selectedServer, setSelectedServer] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const servers = [
    "MongoDB Server",
    "Alibaba Cloud",
    "Biznet Server",
    "AWS Server",
    "Google Cloud",
    "Azure Cloud",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Removed incomplete console.log statement
  };

  return (
    <AdminLayout activePage="updates">
      <div className="flex flex-row gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="server"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pilih Server
              </label>
              <select
                id="server"
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="">-- Pilih Server --</option>
                {servers.map((server) => (
                  <option key={server} value={server}>
                    {server}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tanggal
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status Server
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`relative flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    status === "normal"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="normal"
                    checked={status === "normal"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="sr-only"
                  />
                  <span className="w-4 h-4 rounded-full bg-green-500"></span>
                  <span className="font-medium text-gray-800">Normal</span>
                </label>

                <label
                  className={`relative flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    status === "gangguan"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-200 hover:border-yellow-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="gangguan"
                    checked={status === "gangguan"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="sr-only"
                  />
                  <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                  <span className="font-medium text-gray-800">Gangguan</span>
                </label>

                <label
                  className={`relative flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    status === "down"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="down"
                    checked={status === "down"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="sr-only"
                  />
                  <span className="w-4 h-4 rounded-full bg-red-500"></span>
                  <span className="font-medium text-gray-800">Down</span>
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Deskripsi Gangguan
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Jelaskan kondisi server dan informasi yang perlu diketahui customer..."
                required
              ></textarea>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Simpan Update
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>

        {/* Example Preview */}
        <div className="bg-blue-50 border h-52 border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Contoh Penggunaan:
          </h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
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
