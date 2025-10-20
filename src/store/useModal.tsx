import { create } from "zustand";

interface ModalState<T> {
  isOpen: boolean;
  modalType: string | null;
  modalData?: T | null;
  openModal: (type: string, data?: T) => void;
  closeModal: () => void;
}

export const createModalStore = <T,>() =>
  create<ModalState<T>>((set) => ({
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

export const useModal = createModalStore();
