import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
}

export default function Button({
  label,
  loading = false,
  variant = "default",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  const variantStyle: Record<typeof variant, string> = {
    default: "bg-gold-400 text-white hover:bg-gold-500",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
    link: "text-gold-600 underline-offset-4 hover:underline bg-transparent",
  };

  const sizeStyle: Record<typeof size, string> = {
    sm: "h-9 rounded-md px-3 text-sm",
    md: "h-10 px-4 py-2 text-base",
    lg: "h-11 rounded-md px-8 text-lg",
    icon: "h-10 w-10 p-0",
  };

  return (
    <button
      type={props.type || "button"}
      disabled={loading || props.disabled}
      className={[
        baseStyle,
        variantStyle[variant],
        sizeStyle[size],
        fullWidth ? "w-full" : "",
        loading ? "opacity-70 cursor-not-allowed" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 /> Menyimpan...
        </>
      ) : (
        label || props.children
      )}
    </button>
  );
}
