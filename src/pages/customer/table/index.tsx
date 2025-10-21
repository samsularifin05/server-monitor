import React, { useState } from "react";
import { Store as StoreIcon } from "lucide-react";
import { StoresTableProps } from "../types";

// Tipe untuk store

// Helpers
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

const StoresTable: React.FC<StoresTableProps> = ({ stores }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Daftar Toko Anda
        </h3>
        <input
          type="text"
          placeholder="Cari nama toko..."
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
            {paginatedStores.length > 0 ? (
              paginatedStores.map((store) => (
                <tr
                  key={store.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold-100 rounded-lg">
                        <StoreIcon className="w-5 h-5 text-gold-600" />
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
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-sm text-center text-gray-500"
                >
                  Tidak ada toko yang cocok dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-600">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border cursor-pointer ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400"
                : "hover:bg-gray-100"
            }`}
          >
            Sebelumnya
          </button>

          <span>
            Halaman {currentPage} dari {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400"
                : "hover:bg-gray-100"
            }`}
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
};

export default StoresTable;
