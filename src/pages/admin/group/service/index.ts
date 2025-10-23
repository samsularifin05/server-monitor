import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../../../../utils/axios";
import { IGroupResponseDTO } from "../types/response.dto";
import { IgroupRequestDTO } from "../types/request.dto";

// Ambil daftar produk berdasarkan user & tenant aktif
const get = async (): Promise<IGroupResponseDTO[]> => {
  try {
    const group = await apiInstance.get<IGroupResponseDTO[]>(`/groups`);
    return group.data || [];
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};
const deleteId = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/groups/${id}`);
  } catch (error) {
    // console.error("Error deleting group:", error);
    throw error;
  }
};
const create = async (data: IgroupRequestDTO): Promise<void> => {
  try {
    await apiInstance.post(`/groups`, data);
  } catch (error) {
    throw error;
  }
};

const edit = async (data: IgroupRequestDTO): Promise<void> => {
  try {
    await apiInstance.put(`/groups/${data._id}`, data);
  } catch (error) {
    throw error;
  }
};

// Hook ambil semua produk
export function useGroup() {
  return useQuery<IGroupResponseDTO[], Error>({
    queryKey: ["tm_groups"],
    queryFn: get,
    initialData: [],
  });
}

export function useDelete() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_groups"] });
    },
  });
}

// Hook tambah produk baru
export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IgroupRequestDTO>({
    mutationFn: (createData) => create(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_groups"] });
    },
  });
}

// Hook edit data produk
export function useEdit() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IgroupRequestDTO>({
    mutationFn: (editData) => edit(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_groups"] });
    },
  });
}
