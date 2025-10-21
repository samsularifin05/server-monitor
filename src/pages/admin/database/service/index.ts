import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../../../../utils/axios";
import { IDatabaseResponseDTO } from "../types/response.dto";
import { IDatabaseRequestDTO } from "../types/request.dto";

// Ambil daftar produk berdasarkan user & tenant aktif
const get = async (): Promise<IDatabaseResponseDTO[]> => {
  try {
    const group = await apiInstance.get<IDatabaseResponseDTO[]>(`/databases`);
    return group.data || [];
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};
const deleteId = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/databases/${id}`);
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};
const create = async (data: IDatabaseRequestDTO): Promise<void> => {
  try {
    await apiInstance.post(`/databases`, data);
  } catch (error) {
    console.error("Error creating group:", error);
  }
};

const edit = async (data: IDatabaseRequestDTO): Promise<void> => {
  try {
    await apiInstance.put(`/databases/${data._id}`, data);
  } catch (error) {
    console.error("Error updating group:", error);
  }
};

// Hook ambil semua produk
export function useDatabase() {
  return useQuery<IDatabaseResponseDTO[], Error>({
    queryKey: ["tm_databases"],
    queryFn: get,
  });
}

export function useDelete() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_databases"] });
    },
  });
}

// Hook tambah produk baru
export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IDatabaseRequestDTO>({
    mutationFn: (createData) => create(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_databases"] });
    },
  });
}

// Hook edit data produk
export function useEdit() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IDatabaseRequestDTO>({
    mutationFn: (editData) => edit(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_databases"] });
    },
  });
}
