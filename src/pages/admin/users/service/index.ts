import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../../../../utils/axios";
import { IuserResponseDTO } from "../types/response.dto";
import { UserFormData } from "../validate";
import { IUserUpdatePassword } from "../types/request.dto";

// Ambil daftar produk berdasarkan user & tenant aktif
const get = async (): Promise<IuserResponseDTO[]> => {
  try {
    const customer = await apiInstance.get<IuserResponseDTO[]>(`/users`);
    return customer.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
const deleteId = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`/users/delete/${id}`);
  } catch (error) {
    throw error;
  }
};
const create = async (data: UserFormData): Promise<void> => {
  try {
    await apiInstance.post(`/users`, data);
  } catch (error) {
    throw error;
  }
};

const edit = async (data: UserFormData): Promise<void> => {
  try {
    await apiInstance.put(`/users/edit/${data._id}`, data);
  } catch (error) {
    throw error;
  }
};
const editPassword = async (data: IUserUpdatePassword): Promise<void> => {
  try {
    await apiInstance.put(`/users/edit-password/${data._id}`, data);
  } catch (error) {
    throw error;
  }
};

// Hook ambil semua produk
export function useCustomer() {
  return useQuery<IuserResponseDTO[], Error>({
    queryKey: ["tm_users"],
    queryFn: get,
  });
}

export function useDelete() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_users"] });
    },
  });
}

// Hook tambah produk baru
export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserFormData>({
    mutationFn: (createData) => create(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_users"] });
    },
  });
}

// Hook edit data produk
export function useEdit() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserFormData>({
    mutationFn: (editData) => edit(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_users"] });
    },
  });
}
export function useEditPassword() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IUserUpdatePassword>({
    mutationFn: (editData) => editPassword(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tm_users"] });
    },
  });
}
