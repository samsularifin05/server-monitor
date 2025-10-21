import { z } from "zod";

export const DatabaseSchema = z.object({
  _id: z.string().optional(),
  kode_database: z.string().nonempty("Kode Database harus diisi"),
  nama_database: z.string().nonempty("Nama Database harus diisi"),
  basis_data: z.string().nonempty("Basis Data harus diisi"),
  akun: z.string().optional(),
  port: z.string().optional(),
  user: z.string().optional(),
  password_akun: z.string().optional(),
  password_koneksi: z.string().optional(),
  backend_uri: z.string().nonempty("Backend URI harus diisi"),
});

export type DatabaseFormData = z.infer<typeof DatabaseSchema>;
