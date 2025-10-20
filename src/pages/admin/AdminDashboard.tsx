import { Server, Users, Store, AlertTriangle } from "lucide-react";

import AdminLayout from "./AdminLayout";
import { withAuth } from "../../middleware/checkLogin";

function AdminDashboard() {
  const stats = [
    { label: "Total Server", value: "12", icon: Server, color: "bg-blue-500" },
    {
      label: "Total Customer",
      value: "48",
      icon: Users,
      color: "bg-green-500",
    },
    { label: "Total Toko", value: "156", icon: Store, color: "bg-purple-500" },
    {
      label: "Server Gangguan",
      value: "2",
      icon: AlertTriangle,
      color: "bg-yellow-500",
    },
  ];

  const recentServers = [
    {
      name: "MongoDB Server",
      status: "normal",
      update: "2 menit lalu",
      desc: "Semua sistem berjalan normal",
    },
    {
      name: "Alibaba Cloud",
      status: "gangguan",
      update: "15 menit lalu",
      desc: "Sedang terjadi gangguan di data kami",
    },
    {
      name: "Biznet Server",
      status: "normal",
      update: "1 jam lalu",
      desc: "Operasional lancar",
    },
    {
      name: "AWS Server",
      status: "down",
      update: "30 menit lalu",
      desc: "Server dalam maintenance",
    },
    {
      name: "Google Cloud",
      status: "normal",
      update: "3 jam lalu",
      desc: "Semua layanan tersedia",
    },
  ];

  const getStatusColor = (status: string) => {
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

  return (
    <AdminLayout activePage="dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Server Status */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Status Server Terkini
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Nama Server
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Update Terakhir
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Deskripsi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentServers.map((server, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Server className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-800">
                          {server.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${getStatusColor(
                            server.status
                          )}`}
                        ></span>
                        <span className="text-sm text-gray-700">
                          {getStatusLabel(server.status)}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {server.update}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {server.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const ProtectedAdminDashboard = withAuth(AdminDashboard);
export default ProtectedAdminDashboard;
