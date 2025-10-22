import { create } from "zustand";

interface ConfirmState {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  openConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  message: "",
  onConfirm: undefined,
  onCancel: undefined,

  openConfirm: (message, onConfirm, onCancel) =>
    set({ isOpen: true, message, onConfirm, onCancel }),

  closeConfirm: () =>
    set({
      isOpen: false,
      message: "",
      onConfirm: undefined,
      onCancel: undefined,
    }),
}));
