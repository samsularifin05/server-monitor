import { z } from "zod";

export const VpsSchema = z.object({
  _id: z.string().optional(),
  kode_vps: z.string().nonempty("Kode VPS harus diisi"),
  fungsional: z.string().nonempty("Fungsional harus diisi"),
  akun_email: z.string().optional(),
  password_akun: z.string().optional(),
  port: z.string().optional(),
  user_login: z.string().optional(),
  password_vps: z.string().optional(),
  login_vnc: z.string().optional(),
  expire_ssl: z.string().optional(),
});

export type VpsFormData = z.infer<typeof VpsSchema>;
