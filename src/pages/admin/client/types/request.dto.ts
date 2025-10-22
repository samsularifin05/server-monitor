import { UserLevel } from "./response.dto";

export interface IUserRequestDTO {
  _id?: string;
  user_id: string;
  user_name: string;
  password: string;
  email: string;
  level: UserLevel;
  kode_group: string;
  no_whatsapp?: string;
}

export interface IUserUpdatePassword {
  _id?: string;
  password: string;
}
