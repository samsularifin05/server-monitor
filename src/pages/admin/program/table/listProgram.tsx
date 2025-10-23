import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useProgram } from "../service";
import { useState } from "react";
import { useModal } from "@/store/useModal";
// import GlobalModal from "@/components/modal";

const ListProgram = () => {
  const { data, isLoading } = useProgram();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data by search term
  const filteredData = data.filter((program) => {
    const term = searchTerm.toLowerCase();
    return (
      program.nama_program?.toLowerCase().includes(term) ||
      program.kode_program?.toLowerCase().includes(term) ||
      program.domain?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const { openModal } = useModal();
  // const [selectedProgram, setSelectedProgram] =
  //   useState<IProgramResponseDTO | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Program Management
            </h1>
            <p className="text-slate-600">Manage and monitor your programs</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                className="w-full px-4 py-2 pr-10 placeholder:text-gray-400 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gold-400 text-base bg-white shadow"
                placeholder="Search program..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search size={18} />
              </span>
            </div>
            <button
              onClick={() => openModal("Add")}
              className="px-5 py-2 flex cursor-pointer rounded-lg bg-gold-400 text-white font-semibold shadow hover:bg-gold-500 transition-colors text-base"
            >
              <Plus /> Tambah Program
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading || data.length === 0
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl cursor-pointer shadow-lg animate-pulse border border-slate-100 group overflow-hidden relative min-h-[260px]"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gray-200 via-gray-100 to-gray-300 opacity-70 transition-all"></div>
                  <div className="p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="border-t border-slate-100" />
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-1">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
            : currentData.map((program) => (
                <div
                  key={program._id}
                  className="bg-white rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group overflow-hidden relative"
                  onClick={() => {
                    // setSelectedProgram(program);
                    openModal("Detail", program);
                  }}
                >
                  {/* Decorative gradient bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gold-200 via-gold-100 to-gold-400 opacity-70 group-hover:opacity-100 transition-all"></div>
                  <div className="p-6 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <div className="text-lg font-bold text-slate-800 tracking-tight mb-0.5">
                          {program.nama_program}
                        </div>
                        <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                          {program.kode_program}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span
                          className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
                            program.status_online
                              ? "bg-blue-100 text-blue-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{
                              background: program.status_online
                                ? "#2563eb"
                                : "#e11d48",
                            }}
                          ></span>
                          {program.status_online ? "Online" : "Offline"}
                        </span>
                        <span
                          className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
                            program.status_created
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{
                              background: program.status_created
                                ? "#059669"
                                : "#64748b",
                            }}
                          ></span>
                          {program.status_created ? "Created" : "Not Created"}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-100" />

                    {/* Domain & Description */}
                    <div className="flex flex-col gap-1.5">
                      <div>
                        <span className="text-xs text-slate-500 font-medium">
                          Domain:
                        </span>
                        <span className="ml-1 text-sm font-semibold text-slate-700">
                          {program.domain}
                        </span>
                      </div>
                      {program.deskripsi !== "-" && (
                        <div>
                          <span className="text-xs text-slate-500 font-medium">
                            Deskripsi:
                          </span>
                          <span className="ml-1 text-sm text-slate-700">
                            {program.deskripsi}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-1">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">
                          Kode Toko:
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {program.kode_toko && program.kode_toko !== "-"
                            ? program.kode_toko
                            : "-"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">
                          Port:
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {program.port ? program.port : "-"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">
                          Expire Domain:
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {program.tgl_expire_domain &&
                          program.tgl_expire_domain !== "-"
                            ? program.tgl_expire_domain
                            : "-"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">
                          Expire SSL:
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {program.tgl_expire_ssl &&
                          program.tgl_expire_ssl !== "-"
                            ? program.tgl_expire_ssl
                            : "-"}
                        </span>
                      </div>
                      {program.kode_vps && program.kode_vps !== "-" && (
                        <div className="flex flex-col col-span-2">
                          <span className="text-xs text-slate-500 font-medium">
                            Kode VPS:
                          </span>
                          <span className="text-sm font-semibold text-slate-700">
                            {program.kode_vps}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(endIndex, data.length)}
              </span>{" "}
              of <span className="font-medium">{data.length}</span> results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border cursor-pointer border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1">
                {/* Custom pagination with ellipsis if totalPages > 5 */}
                {(() => {
                  const pages = [];
                  if (totalPages <= 5) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    if (currentPage <= 3) {
                      pages.push(1, 2, 3, 4, "...", totalPages);
                    } else if (currentPage >= totalPages - 2) {
                      pages.push(
                        1,
                        "...",
                        totalPages - 3,
                        totalPages - 2,
                        totalPages - 1,
                        totalPages
                      );
                    } else {
                      pages.push(
                        1,
                        "...",
                        currentPage - 1,
                        currentPage,
                        currentPage + 1,
                        "...",
                        totalPages
                      );
                    }
                  }
                  return pages.map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={"ellipsis-" + idx}
                        className="px-2 py-2 text-gray-400 select-none cursor-pointer"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(Number(page))}
                        className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-slate-800 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  );
                })()}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border cursor-pointer border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProgram;
