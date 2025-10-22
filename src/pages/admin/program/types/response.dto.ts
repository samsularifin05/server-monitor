export interface IProgramResponseDTO {
  _id: string;
  kode_program: string;
  kode_toko: string;
  nama_program: string;
  deskripsi?: string;
  domain?: string;
  status_online: boolean;
  status_created: boolean;
}
