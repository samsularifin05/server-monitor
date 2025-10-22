import { z } from "zod";

// Fungsi dinamis berdasarkan modalType
export const createUserSchema = (modalType?: string) =>
  z.object({
    _id: z.string().optional(),
    user_id: z.string().nonempty("User ID harus diisi"),
    user_name: z
      .string()
      .nonempty("Nama user harus diisi")
      .min(2, "Nama user minimal 2 karakter"),
    email: z.string().email("Email tidak valid").nonempty("Email harus diisi"),
    password:
      modalType === "Edit"
        ? z.string().optional() // tidak wajib diisi saat edit
        : z
            .string()
            .min(6, "Password minimal 6 karakter")
            .nonempty("Password harus diisi"),
    level: z.enum(["SU", "ADMIN", "DEVOPS", "CLIENT"], {
      message: "Level harus dipilih atau tidak valid",
    }),
    kode_group: z.string().default("-").optional(),
    no_whatsapp: z.string().default("-").optional(),
  });

export type UserFormData = z.infer<ReturnType<typeof createUserSchema>>;

// Fungsi dinamis berdasarkan modalType
export const EditPasswordSchema = z.object({
  _id: z.string().optional(),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .nonempty("Password harus diisi"),
});

export type EditPasswordFormData = z.infer<typeof EditPasswordSchema>;
