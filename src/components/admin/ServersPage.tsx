import { Plus, Search, Edit2, Trash2, Server, RefreshCw } from 'lucide-react';
import AdminLayout from './AdminLayout';

export default function ServersPage() {
  const servers = [
    { id: 1, name: 'MongoDB Server', status: 'normal', connectedStores: 45, lastUpdate: '2 menit lalu', description: 'Semua sistem berjalan normal' },
    { id: 2, name: 'Alibaba Cloud', status: 'gangguan', connectedStores: 32, lastUpdate: '15 menit lalu', description: 'Sedang terjadi gangguan di data kami, tim sedang memperbaikinya' },
    { id: 3, name: 'Biznet Server', status: 'normal', connectedStores: 28, lastUpdate: '1 jam lalu', description: 'Operasional lancar' },
    { id: 4, name: 'AWS Server', status: 'down', connectedStores: 22, lastUpdate: '30 menit lalu', description: 'Server dalam maintenance terjadwal' },
    { id: 5, name: 'Google Cloud', status: 'normal', connectedStores: 18, lastUpdate: '3 jam lalu', description: 'Semua layanan tersedia' },
    { id: 6, name: 'Azure Cloud', status: 'normal', connectedStores: 11, lastUpdate: '5 jam lalu', description: 'Status normal' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-700';
      case 'gangguan': return 'bg-yellow-100 text-yellow-700';
      case 'down': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'gangguan': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'gangguan': return 'Gangguan';
      case 'down': return 'Down';
      default: return 'Unknown';
    }
  };

  return (
    <AdminLayout activePage="servers">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari server..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Tambah Server
          </button>
        </div>

        {/* Servers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Nama Server
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Toko Terhubung
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Update Terakhir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {servers.map((server) => (
                  <tr key={server.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Server className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{server.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(server.status)}`}></span>
                        {getStatusLabel(server.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{server.connectedStores} toko</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {server.lastUpdate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {server.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors" title="Update Status">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
