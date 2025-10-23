import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../../../../utils/axios";
import { IProgramResponseDTO } from "../types/response.dto";
import { IProgramRequestDTO } from "../types/request.dto";
import { SubdomainProps } from "../types/response-subdomain.dto";
import { VpsProps } from "../types/response-server.dto";

// Ambil daftar produk berdasarkan user & tenant aktif
const get = async (kode_group?: string): Promise<IProgramResponseDTO[]> => {
  try {
    const program = await apiInstance.get<IProgramResponseDTO[]>(`/program`, {
      kode_group: kode_group,
    });
    return program.data || [];
  } catch (error) {
    console.error("Error fetching program:", error);
    return [];
  }
};
const deleteId = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/program/${id}`);
  } catch (error) {
    // console.error("Error deleting group:", error);
    throw error;
  }
};
const create = async (data: IProgramRequestDTO): Promise<void> => {
  try {
    await apiInstance.post(`/program`, data);
  } catch (error) {
    throw error;
  }
};

const edit = async (data: IProgramRequestDTO): Promise<void> => {
  try {
    await apiInstance.put(`/program/${data._id}`, data);
  } catch (error) {
    throw error;
  }
};

// Hook ambil semua produk
export function useProgram(kode_group?: string) {
  return useQuery<IProgramResponseDTO[], Error>({
    queryKey: ["tm_program", kode_group],
    queryFn: () => get(kode_group),
    initialData: [],
  });
}
export function useServer() {
  return useQuery<VpsProps[], Error>({
    queryKey: ["tm_server"],
    queryFn: async () => {
      try {
        const program = await apiInstance.get<VpsProps[]>(`/server`);
        return program.data || [];
      } catch (error) {
        console.error("Error fetching program:", error);
        return [];
      }
    },
    initialData: [],
  });
}
export function useSubDomain() {
  return useQuery<SubdomainProps[], Error>({
    queryKey: ["tm_subdomain"],
    queryFn: async () => {
      try {
        const program = await apiInstance.get<SubdomainProps[]>(`/subdomain`);
        return program.data || [];
      } catch (error) {
        console.error("Error fetching program:", error);
        return [];
      }
    },
    initialData: [],
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
