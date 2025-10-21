import { create } from "zustand";

type LoadingType = "button" | "form" | "table" | "screen";
type LoadingKey = string; // unik per instance, misalnya "fetchProduk" atau "btnTambah"

interface LoadingState {
  // nested map: { type: { key: boolean } }
  loadingMap: Record<LoadingType, Record<LoadingKey, boolean>>;
  messageMap: Record<LoadingType, Record<LoadingKey, string | null>>;

  startLoading: (type: LoadingType, key: LoadingKey, message?: string) => void;
  stopLoading: (type: LoadingType, key: LoadingKey) => void;
  isLoading: (type: LoadingType, key: LoadingKey) => boolean;
}

export const useLoading = create<LoadingState>((set, get) => ({
  loadingMap: {
    button: {},
    form: {},
    table: {},
    screen: {},
  },
  messageMap: {
    button: {},
    form: {},
    table: {},
    screen: {},
  },

  startLoading: (type, key, message) =>
    set((state) => ({
      loadingMap: {
        ...state.loadingMap,
        [type]: { ...state.loadingMap[type], [key]: true },
      },
      messageMap: {
        ...state.messageMap,
        [type]: { ...state.messageMap[type], [key]: message ?? null },
      },
    })),

  stopLoading: (type, key) =>
    set((state) => ({
      loadingMap: {
        ...state.loadingMap,
        [type]: { ...state.loadingMap[type], [key]: false },
      },
      messageMap: {
        ...state.messageMap,
        [type]: { ...state.messageMap[type], [key]: null },
      },
    })),

  isLoading: (type, key) => !!get().loadingMap[type]?.[key],
}));
