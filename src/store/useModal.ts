import { create } from "zustand";

interface ModalState<T = unknown> {
  isOpen: boolean;
  modalType: string | null;
  modalData?: T | null;
  openModal: (type: string, data?: T) => void;
  closeModal: () => void;
}

// 🔹 Store global tanpa tipe spesifik (pakai unknown)
const _useModal = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  modalData: null,

  openModal: (type, data) =>
    set({
      isOpen: true,
      modalType: type,
      modalData: data ?? null,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      modalType: null,
      modalData: null,
    }),
}));

// 🔹 Wrapper yang menambahkan generic type untuk modalData
export const useModal = <T = unknown>() => _useModal() as ModalState<T>;
