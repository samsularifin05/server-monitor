import { z } from "zod";
export const CustomerSchema = z.object({
  id: z.number().optional(),
  user_id: z.string().nonempty("User ID harus diisi"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .nonempty("Password harus diisi"),
  nama_customer: z
    .string()
    .nonempty("Nama customer harus diisi")
    .min(2, "Nama customer minimal 2 karakter"),
  email: z
    .string()
    .nonempty("Email harus diisi")
    .pipe(z.email("Format email tidak valid")),
  jumlah_toko: z.number().min(1, "Minimal 1 toko"),
  created_at: z.string().nonempty("Tanggal dibuat harus diisi"),
});

export type CustomerFormData = z.infer<typeof CustomerSchema>;
