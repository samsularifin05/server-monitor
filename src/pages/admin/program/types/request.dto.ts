export interface IProgramRequestDTO {
  _id?: string;
  kode_toko: string;
  kode_subdomain: string;
  nama_program: string;
  deskripsi?: string;
  nama_domain: string;
  kode_vps: string;
  kode_group: string;
  port: string;
  tgl_expire_ssl?: string;
  tgl_expire_domain?: string;
}
