import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface RenderSelectInputProps<
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

const RenderSelectInput = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label = "",
  required = false,
  className = "",
  options,
  placeholder = "Pilih opsi",
}: RenderSelectInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="relative w-full">
          {label && (
            <label
              htmlFor={name}
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              {label}
            </label>
          )}
          <select
            id={name}
            {...field}
            required={required}
            style={{ paddingTop: "11px" }}
            className={`w-full px-4 border py-2 rounded-lg outline-none transition-all bg-white
              ${
                fieldState.error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-gold-500 focus:ring-gold-500"
              }
              ${className}`}
          >
            <option value="">{placeholder}</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p className="mt-1 text-sm text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RenderSelectInput;
