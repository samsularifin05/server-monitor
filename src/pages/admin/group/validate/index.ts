import { z } from "zod";
export const GroupSchema = z.object({
  _id: z.string().optional(),
  kode_group: z.string().nonempty("Kode Group harus diisi"),
  nama_group: z
    .string()
    .min(2, "Nama Group minimal 2 karakter")
    .nonempty("Nama Group harus diisi"),
  deskripsi: z.string().nonempty("Deskripsi harus diisi"),
});
export type GroupFormData = z.infer<typeof GroupSchema>;
