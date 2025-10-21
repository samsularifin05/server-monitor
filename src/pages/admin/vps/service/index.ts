import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../../../../utils/axios";
import { IVpsResponseDTO } from "../types/response.dto";
import { IVpsRequestDTO } from "../types/request.dto";

// Ambil daftar produk berdasarkan user & tenant aktif
const get = async (): Promise<IVpsResponseDTO[]> => {
  try {
    const group = await apiInstance.get<IVpsResponseDTO[]>(`/vps`);
    return group.data || [];
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};
const deleteId = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/vps/${id}`);
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};
const create = async (data: IVpsRequestDTO): Promise<void> => {
  try {
    await apiInstance.post(`/vps`, data);
  } catch (error) {
    console.error("Error creating group:", error);
  }
};

const edit = async (data: IVpsRequestDTO): Promise<void> => {
  try {
    await apiInstance.put(`/vps/${data._id}`, data);
  } catch (error) {
    console.error("Error updating group:", error);
  }
};

// Hook ambil semua produk
export function useVps() {
  return useQuery<IVpsResponseDTO[], Error>({
    queryKey: ["tm_vps"],
    queryFn: get,
  });
}

export function useDelete() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_vps"] });
    },
  });
}

// Hook tambah produk baru
export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IVpsRequestDTO>({
    mutationFn: (createData) => create(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_vps"] });
    },
  });
}

// Hook edit data produk
export function useEdit() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IVpsRequestDTO>({
    mutationFn: (editData) => edit(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_vps"] });
    },
  });
}
