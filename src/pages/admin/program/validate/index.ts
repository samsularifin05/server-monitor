import { z } from "zod";
export const ProgramSchema = z.object({
  _id: z.string().optional(),
  kode_toko: z.string().nonempty("Kode Toko harus diisi"),
  kode_group: z.string().nonempty("Kode Group harus diisi"),
  kode_vps: z.string().nonempty("Kode VPS harus diisi"),
  nama_domain: z.string().nonempty("Nama Domain harus diisi"),
  kode_subdomain: z.string().nonempty("Kode Subdomain harus diisi"),
  nama_program: z
    .string()
    .min(2, "Nama Program minimal 2 karakter")
    .nonempty("Nama Program harus diisi"),
  deskripsi: z.string().optional(),
  port: z.string().nonempty("Port harus diisi"),
  tgl_expire_ssl: z.string().optional(),
  tgl_expire_domain: z.string().optional(),
});
export type ProgramFormData = z.infer<typeof ProgramSchema>;
