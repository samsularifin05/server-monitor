export interface IVpsRequestDTO extends Record<string, unknown> {
  _id?: string;
  kode_vps: string;
  fungsional: string;
  akun_email?: string;
  password_akun?: string;
  port?: string;
  user_login?: string;
  password_vps?: string;
  login_vnc?: string;
  expire_ssl?: string;
}
