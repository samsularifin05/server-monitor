/* eslint-disable */
import { Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useIsMobile } from "../../hook/useMobile";
import { ActionButton } from "./types";
import Button from "../button";

export interface Column<T> {
  key: keyof T | "action";
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
  loading?: boolean;
  actions?: ActionButton<T>[];
}

export default function DataTable<T extends Record<string, any>>({
  data = [],
  columns,
  loading = false,
  pageSize = 5,
  actions = [],
  searchPlaceholder = "Cari...",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const isMobile = useIsMobile();

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

  // Generate pagination numbers (with "...")
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= page - delta && i <= page + delta)
        ) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== "...") {
          pages.push("...");
        }
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Header: Search & Add Button */}
      <div
        className={`flex flex-col gap-2 ${
          isMobile ? "" : "sm:flex-row sm:items-center justify-between"
        }`}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {actions
          .filter((cek) => cek.isAdd)
          .map((action, actionIndex) => (
            <Button
              key={actionIndex}
              variant={action.variant || "default"}
              size={action.size || "md"}
              onClick={() => action.onClick({} as T)}
              className={action.className}
              disabled={action.disabled?.({} as T)}
            >
              <div className="flex gap-2 items-center">
                {action.icon} {action.label}
              </div>
            </Button>
          ))}
      </div>

      {/* Table */}
      <div
        className={`overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm ${
          isMobile ? "max-w-full" : ""
        }`}
      >
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase ${
                    isMobile && idx > 1 ? "hidden sm:table-cell" : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
              <th
                className={`px-6 py-3 items-center flex justify-center text-xs font-semibold tracking-wider text-gray-600 uppercase ${
                  isMobile ? "hidden sm:table-cell" : ""
                }`}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-gray-500"
                >
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors border-b border-gray-100 hover:bg-gray-50"
                >
                  {columns.map((col, idx) => (
                    <td
                      key={String(col.key)}
                      className={`px-6 py-4 ${
                        isMobile && idx > 1 ? "hidden sm:table-cell" : ""
                      }`}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}

                  <td
                    className={`px-6 py-4 gap-2  items-center flex justify-center ${
                      isMobile ? "hidden sm:table-cell" : ""
                    }`}
                  >
                    {actions.length > 0 &&
                      actions
                        .filter((cek) => !cek.isAdd)
                        .map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant={action.variant || "default"}
                            size={action.size || "md"}
                            onClick={() => action.onClick(row)}
                            className={action.className}
                            disabled={action.disabled?.(row)}
                          >
                            <div className="flex gap-2 items-center">
                              {action.icon} {action.label}
                            </div>
                          </Button>
                        ))}
                  </td>
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
      <div className="flex flex-col justify-between gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-0">
        <span className={`${isMobile ? "text-center w-full" : ""}`}>
          Halaman {page} dari {totalPages || 1}
        </span>

        {isMobile ? (
          <div className="flex justify-center gap-2">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
