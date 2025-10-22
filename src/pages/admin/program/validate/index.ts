import { z } from "zod";
export const ProgramSchema = z.object({
  _id: z.string().optional(),
  kode_program: z.string().nonempty("Kode Program harus diisi"),
  kode_toko: z.string().nonempty("Kode Toko harus diisi"),
  domain: z.string().optional(),
  nama_program: z
    .string()
    .min(2, "Nama Program minimal 2 karakter")
    .nonempty("Nama Program harus diisi"),
  deskripsi: z.string().optional(),
});
export type ProgramFormData = z.infer<typeof ProgramSchema>;
