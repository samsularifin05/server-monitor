/* eslint-disable */
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface AddButtonConfig {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  show?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchPlaceholder?: string;
  addButton?: AddButtonConfig;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 5,
  searchPlaceholder = "Cari...",
  addButton = {
    label: "Tambah Data",
    icon: <Plus className="w-5 h-5" />,
    show: true,
  },
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter data
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  // Generate pagination numbers (with “...”)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 10) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 4) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      {/* <h1 className="text-xl font-semibold text-gray-800">{title}</h1> */}

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {addButton?.show && (
          <button
            onClick={addButton?.onClick}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
          >
            {addButton.icon ?? <Plus className="w-5 h-5" />}
            {addButton.label ?? "Tambah Data"}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors border-b border-gray-100 hover:bg-gray-50"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
        <span>
          Halaman {page} dari {totalPages || 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1.5 cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Sebelumnya
          </button>

          {getPageNumbers().map((num, i) =>
            num === "..." ? (
              <span
                key={i}
                className="px-2 text-gray-400 cursor-pointer select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(Number(num))}
                className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                  page === num
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            )
          )}

          <button
            onClick={handleNext}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1.5 cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
