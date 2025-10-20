import * as z from "zod";

export const loginSchema = z.object({
  user_id: z.string().nonempty("User ID is required"), // nonempty untuk string tidak kosong
  password: z.string().nonempty("Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
