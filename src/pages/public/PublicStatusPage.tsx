import {
  Server,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PublicStatusPage() {
  const servers = [
    {
      id: 1,
      name: "MongoDB Server",
      status: "normal",
      description: "Semua sistem berjalan normal",
      lastUpdate: "2 menit lalu",
      uptime: "99.9%",
    },
    {
      id: 2,
      name: "Alibaba Cloud",
      status: "gangguan",
      description:
        "Sedang terjadi gangguan di data kami, tim sedang memperbaikinya",
      lastUpdate: "15 menit lalu",
      uptime: "98.5%",
    },
    {
      id: 3,
      name: "Biznet Server",
      status: "normal",
      description: "Operasional lancar",
      lastUpdate: "1 jam lalu",
      uptime: "99.8%",
    },
    {
      id: 4,
      name: "AWS Server",
      status: "down",
      description: "Server dalam maintenance terjadwal",
      lastUpdate: "30 menit lalu",
      uptime: "95.2%",
    },
    {
      id: 5,
      name: "Google Cloud",
      status: "normal",
      description: "Semua layanan tersedia",
      lastUpdate: "3 jam lalu",
      uptime: "99.9%",
    },
    {
      id: 6,
      name: "Azure Cloud",
      status: "normal",
      description: "Status normal",
      lastUpdate: "5 jam lalu",
      uptime: "99.7%",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "gangguan":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "down":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "border-green-200 bg-green-50";
      case "gangguan":
        return "border-yellow-200 bg-yellow-50";
      case "down":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "Operasional";
      case "gangguan":
        return "Ada Gangguan";
      case "down":
        return "Tidak Tersedia";
      default:
        return "Unknown";
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800";
      case "gangguan":
        return "bg-yellow-100 text-yellow-800";
      case "down":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const normalCount = servers.filter((s) => s.status === "normal").length;
  const gangguanCount = servers.filter((s) => s.status === "gangguan").length;
  const downCount = servers.filter((s) => s.status === "down").length;

  const overallStatus =
    downCount > 0 ? "down" : gangguanCount > 0 ? "gangguan" : "normal";

  return (
    <div className="min-h-screen from-gold-50 via-white to-gray-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 shadow-sm backdrop-blur bg-white/80">
        <div className="flex items-center max-w-6xl gap-3 px-4 py-4 mx-auto">
          <div className="bg-gold-400 p-2.5 rounded-lg shadow">
            <Server className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Informasi Status Server
            </h1>
            <p className="text-sm text-gray-500">Status Server Real-time</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl px-4 py-10 mx-auto space-y-8">
        {/* Overall Banner */}
        <div
          className={`rounded-2xl border-2 ${getStatusColor(
            overallStatus
          )} p-6 shadow-sm`}
        >
          <div className="flex items-center gap-4">
            {getStatusIcon(overallStatus)}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {overallStatus === "normal"
                  ? "Semua sistem berjalan normal"
                  : overallStatus === "gangguan"
                  ? "Beberapa sistem mengalami gangguan"
                  : "Beberapa sistem tidak tersedia"}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {normalCount} Operasional • {gangguanCount} Gangguan •{" "}
                {downCount} Down
              </p>
            </div>
          </div>
        </div>

        {/* Server List */}
        <div className="grid gap-6 md:grid-cols-2">
          {servers.map((server) => (
            <div
              key={server.id}
              className={`rounded-2xl border-2 ${getStatusColor(
                server.status
              )} p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(server.status)}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {server.name}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                    server.status
                  )}`}
                >
                  {getStatusText(server.status)}
                </span>
              </div>
              <p className="mb-3 text-sm text-gray-600">{server.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Update: {server.lastUpdate}</span>
                </div>
                <span className="font-semibold text-gray-700">
                  Uptime {server.uptime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Tentang Halaman Status
          </h3>
          <p className="max-w-2xl mx-auto text-sm text-gray-600">
            Halaman ini menampilkan status terkini dari semua server yang
            dipantau oleh Tim Kami. Data diperbarui otomatis setiap beberapa
            menit untuk memastikan informasi terbaru.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-xs">Operasional</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="text-xs">Ada Gangguan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-xs">Tidak Tersedia</span>
            </div>
          </div>

          <Link
            to="/login"
            className="inline-block mt-8 font-medium text-gold-600 transition-colors hover:text-gold-700"
          >
            Login untuk akses dashboard →
          </Link>
        </div>
      </main>
    </div>
  );
}
