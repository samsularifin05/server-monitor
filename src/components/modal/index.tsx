import { ReactNode, useEffect } from "react";
import { useModal } from "../../store/useModal";

interface GlobalModalProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  position?: "center" | "top";
  size?: "sm" | "md" | "lg" | "xl";
}

export default function GlobalModal({
  title,
  children,
  footer,
  position = "top",
  size = "md",
}: GlobalModalProps) {
  const { isOpen, closeModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div
        className={`relative w-full ${sizeClass} mx-4 text-gray-800 bg-white border shadow-xl rounded-2xl backdrop-blur-md border-white/40 transition-all ${
          position === "top" ? "mt-10 sm:mt-14" : "my-auto"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-gray-300 bg-white/90 backdrop-blur-md rounded-t-2xl">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-700 transition-colors cursor-pointer hover:text-red-600"
          >
            ✕
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>

        {/* Footer (optional) */}
        {footer && (
          <div className="sticky bottom-0 z-10 flex justify-end gap-3 px-5 py-3 border-t border-gray-300 bg-white/90 backdrop-blur-md rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
