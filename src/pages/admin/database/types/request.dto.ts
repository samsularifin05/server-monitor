export interface IDatabaseRequestDTO extends Record<string, unknown> {
  _id?: string;
  kode_database: string;
  nama_database: string;
  basis_data: string;
  akun?: string;
  port?: string;
  user?: string;
  password_akun?: string;
  password_koneksi?: string;
  backend_uri: string;
}
