import {
  Store,
  Server,
  LogOut,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const customerName = "PT Teknologi Maju";
  const customerEmail = "info@tekmaju.com";

  const stores = [
    {
      id: 1,
      name: "Toko Cabang Jakarta Pusat",
      server: "MongoDB Server",
      status: "normal",
      lastUpdate: "2 menit lalu",
    },
    {
      id: 2,
      name: "Toko Cabang Bandung",
      server: "Alibaba Cloud",
      status: "gangguan",
      lastUpdate: "15 menit lalu",
    },
    {
      id: 3,
      name: "Toko Cabang Surabaya",
      server: "MongoDB Server",
      status: "normal",
      lastUpdate: "1 jam lalu",
    },
    {
      id: 4,
      name: "Toko Cabang Medan",
      server: "Google Cloud",
      status: "normal",
      lastUpdate: "30 menit lalu",
    },
    {
      id: 5,
      name: "Toko Cabang Yogyakarta",
      server: "Biznet Server",
      status: "normal",
      lastUpdate: "45 menit lalu",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "warning",
      message:
        "Alibaba Cloud mengalami gangguan. Toko Cabang Bandung mungkin terpengaruh.",
      time: "15 menit lalu",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-700";
      case "gangguan":
        return "bg-yellow-100 text-yellow-700";
      case "down":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "gangguan":
        return "bg-yellow-500";
      case "down":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal";
      case "gangguan":
        return "Gangguan";
      case "down":
        return "Down";
      default:
        return "Unknown";
    }
  };

  const normalStores = stores.filter((s) => s.status === "normal").length;
  const problemStores = stores.filter((s) => s.status !== "normal").length;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 py-4 mx-auto max-w-7xl md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  ServerMonitor
                </h1>
                <p className="text-xs text-gray-500">Customer Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-gray-800">
                  {customerName}
                </p>
                <p className="text-xs text-gray-500">{customerEmail}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-blue-600 rounded-full">
                {customerName.charAt(0)}
              </div>
              <button
                onClick={() => navigate("/")}
                className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 mx-auto space-y-6 max-w-7xl md:px-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">Total Toko</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stores.length}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">Toko Normal</p>
                <p className="text-3xl font-bold text-green-600">
                  {normalStores}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">Toko Bermasalah</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {problemStores}
                </p>
              </div>
              <div className="p-3 bg-yellow-500 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600  mt-0.5" />
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-yellow-900">
                  Notifikasi Gangguan
                </h3>
                <div className="space-y-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <p className="text-sm text-yellow-800">{notif.message}</p>
                      <span className="text-xs text-yellow-600 whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stores Table */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Daftar Toko Anda
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Nama Toko
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Server
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Update Terakhir
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stores.map((store) => (
                  <tr
                    key={store.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Store className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          {store.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {store.server}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          store.status
                        )}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${getStatusDot(
                            store.status
                          )}`}
                        ></span>
                        {getStatusLabel(store.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {store.lastUpdate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
