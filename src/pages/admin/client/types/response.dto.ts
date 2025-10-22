export type UserLevel = "SU" | "ADMIN" | "DEVOPS" | "CLIENT";
export interface IuserResponseDTO {
  _id: string;
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  level: UserLevel;
  kode_group?: string;
  no_whatsapp: string;
  input_by: string;
}
