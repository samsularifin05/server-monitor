import { useConfirmStore } from "../../store/useConfirmStore";

export const ConfirmDialog = () => {
  const { isOpen, message, onConfirm, onCancel, closeConfirm } =
    useConfirmStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeConfirm();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Konfirmasi</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 cursor-pointer rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};
