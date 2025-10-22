export interface IProgramResponseDTO {
  _id: string;
  kode_program: string;
  kode_toko: string;
  nama_program: string;
  nama_vps: string;
  deskripsi: string;
  kode_vps?: string;
  domain: string;
  port: string;
  tgl_expire_ssl: string;
  tgl_expire_domain: string;
  status_online: boolean;
  status_created: boolean;
}
