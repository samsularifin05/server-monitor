import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../../../../utils/axios";
import { IProgramResponseDTO } from "../types/response.dto";
import { IProgramRequestDTO } from "../types/request.dto";

// Ambil daftar produk berdasarkan user & tenant aktif
const get = async (): Promise<IProgramResponseDTO[]> => {
  try {
    const group = await apiInstance.get<IProgramResponseDTO[]>(`/progrms`);
    return group.data || [];
  } catch (error) {
    console.error("Error fetching progrms:", error);
    return [];
  }
};
const deleteId = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/progrms/${id}`);
  } catch (error) {
    // console.error("Error deleting group:", error);
    throw error;
  }
};
const create = async (data: IProgramRequestDTO): Promise<void> => {
  try {
    await apiInstance.post(`/progrms`, data);
  } catch (error) {
    throw error;
  }
};

const edit = async (data: IProgramRequestDTO): Promise<void> => {
  try {
    await apiInstance.put(`/progrms/${data._id}`, data);
  } catch (error) {
    throw error;
  }
};

// Hook ambil semua produk
export function useProgram() {
  return useQuery<IProgramResponseDTO[], Error>({
    queryKey: ["tm_program"],
    queryFn: get,
  });
}

export function useDelete() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_program"] });
    },
  });
}

// Hook tambah produk baru
export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IProgramRequestDTO>({
    mutationFn: (createData) => create(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_program"] });
    },
  });
}

// Hook edit data produk
export function useEdit() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IProgramRequestDTO>({
    mutationFn: (editData) => edit(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_program"] });
    },
  });
}
