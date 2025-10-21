import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../../../../utils/axios";
import { IcustomerResponseDTO } from "../types/response.dto";
import { IcustomerRequestDTO } from "../types/request.dto";

// Ambil daftar produk berdasarkan user & tenant aktif
const get = async (): Promise<IcustomerResponseDTO[]> => {
  try {
    const customer = await apiInstance.get<IcustomerResponseDTO[]>(
      `/customers`
    );
    return customer.data || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};
const deleteId = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/customers/${id}`);
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};
const create = async (data: IcustomerRequestDTO): Promise<void> => {
  try {
    await apiInstance.post(`/customers`, data);
  } catch (error) {
    console.error("Error creating customer:", error);
  }
};

const edit = async (data: IcustomerRequestDTO): Promise<void> => {
  try {
    await apiInstance.put(`/customers/${data.id}`, data);
  } catch (error) {
    console.error("Error updating customer:", error);
  }
};

// Hook ambil semua produk
export function useCustomer() {
  return useQuery<IcustomerResponseDTO[], Error>({
    queryKey: ["tm_customers"],
    queryFn: get,
  });
}

export function useDelete() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_customers"] });
    },
  });
}

// Hook tambah produk baru
export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IcustomerRequestDTO>({
    mutationFn: (createData) => create(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_customers"] });
    },
  });
}

// Hook edit data produk
export function useEdit() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IcustomerRequestDTO>({
    mutationFn: (editData) => edit(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_customers"] });
    },
  });
}
