import {
  Store,
  Server,
  LogOut,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import LiveChat from "../../components/chat";
import StoresTable from "./table";
import { StoreType } from "./types";

export default function CustomerDashboard() {
  const customerName = "PT Teknologi Maju";
  const customerEmail = "info@tekmaju.com";

  const stores: StoreType[] = [
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
  const normalStores = stores.filter((s) => s.status === "normal").length;
  const problemStores = stores.filter((s) => s.status !== "normal").length;

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Wave background */}
      <svg
        className="absolute bottom-0 left-0 w-full z-0"
        viewBox="0 0 1440 280"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#E8A504" />
            <stop offset="100%" stopColor="#FFD97A" />
          </linearGradient>
        </defs>

        {/* Lapisan utama (gradasi) */}
        <path
          fill="url(#waveGradient)"
          fillOpacity="1"
          d="M0,220 C200,180 400,260 720,220 C1040,180 1240,240 1440,200 L1440,320 L0,320 Z"
        />

        {/* Lapisan transparan (lapisan atas lebih lembut) */}
        <path
          fill="#FFD97A"
          fillOpacity="0.5"
          d="M0,240 C180,200 420,280 720,240 C1020,200 1260,260 1440,220 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-4 mx-auto max-w-7xl md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold-400 rounded-lg">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Nagatech Dashboard
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
              <div className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-gold-400 rounded-full">
                {customerName.charAt(0)}
              </div>
              <button
                onClick={() => navigate("/")}
                className="p-2 text-red-600 cursor-pointer transition-colors rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-8 mx-auto space-y-6 max-w-7xl md:px-8">
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
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
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

        <StoresTable stores={stores} />

        {/* Live Chat Floating */}
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
          <LiveChat />
        </div>
      </main>
    </div>
  );
}
