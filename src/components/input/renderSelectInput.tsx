import { useState, useEffect, useRef } from "react";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { X } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}

interface RenderSelectInputSearchableProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  required?: boolean;
  className?: string;
  options: Option[];
  placeholder?: string;
}

export default function RenderSelectInput<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  label = "",
  required = false,
  className = "",
  options,
  placeholder = "Cari atau pilih opsi...",
}: RenderSelectInputSearchableProps<TFieldValues>) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);
        const filteredOptions = options.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase())
        );

        // Jika user hapus manual input, reset value
        useEffect(() => {
          if (search === "" && selectedOption) {
            field.onChange("");
          }
        }, [search]);

        return (
          <div className="relative w-full" ref={containerRef}>
            {label && (
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                {label}
              </label>
            )}

            <div className="relative">
              {/* Input pencarian */}
              <input
                autoComplete="off"
                id={name}
                type="text"
                required={required}
                value={search || selectedOption?.label || ""}
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpen(true);
                }}
                className={`w-full px-4 py-2 pr-8 border rounded-lg bg-white outline-none transition-all
                  ${
                    fieldState.error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-gold-500"
                  }
                  ${className}`}
              />

              {/* Tombol clear (X) */}
              {(selectedOption || search) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    field.onChange("");
                    setOpen(false);
                  }}
                  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dropdown list */}
            {open && (
              <ul className="absolute z-20 mt-1 w-full max-h-48 overflow-auto bg-white border border-gray-200 rounded-lg shadow-md">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        field.onChange(opt.value);
                        setSearch(opt.label);
                        setOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gold-100 ${
                        opt.value === field.value
                          ? "bg-gold-50 font-semibold"
                          : ""
                      }`}
                    >
                      {opt.label}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">
                    Tidak ada hasil
                  </li>
                )}
              </ul>
            )}

            {fieldState.error && (
              <p className="mt-1 text-sm text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
