import React, { useState } from "react";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface RenderTextInputProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

const RenderTextInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  placeholder = "",
  readOnly = false,
  label = "",
  type = "text",
  required = false,
  className = "",
}: RenderTextInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "hidden") {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />
    );
  }

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          {label && (
            <label
              htmlFor={name}
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              {label}
            </label>
          )}

          {/* wrapper untuk input + ikon */}
          <div className="relative">
            <input
              autoComplete="off"
              id={name}
              {...field}
              readOnly={readOnly}
              type={inputType}
              placeholder={placeholder}
              required={required}
              className={`w-full px-4 py-2 border ${
                readOnly ? "bg-gray-200" : ""
              } placeholder-gray-400 rounded-lg outline-none transition-all
                ${
                  fieldState.error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : `border-gray-300 ${
                        !readOnly
                          ? "focus:border-gold-500 focus:ring-gold-500"
                          : ""
                      }`
                }
                ${isPassword ? "pr-10" : ""} ${className}`}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>

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

export default RenderTextInput;
