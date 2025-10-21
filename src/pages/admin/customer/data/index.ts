import { IcustomerResponseDTO } from "../types/response.dto";

export const dataCustomers: IcustomerResponseDTO[] = [
  {
    id: 1,
    user_id: "cust001",
    nama_customer: "PT Teknologi Maju",
    email: "info@tekmaju.com",
    jumlah_toko: 12,
    created_at: "2025-01-15T00:00:00Z",
  },
  {
    id: 2,
    user_id: "cust002",
    nama_customer: "CV Digital Sukses",
    email: "contact@digitalsukses.com",
    jumlah_toko: 8,
    created_at: "2025-01-20T00:00:00Z",
  },
  {
    id: 3,
    user_id: "cust003",
    nama_customer: "PT Retail Indonesia",
    email: "admin@retailindo.com",
    jumlah_toko: 25,
    created_at: "2025-02-05T00:00:00Z",
  },
  {
    id: 4,
    user_id: "cust004",
    nama_customer: "PT Pasar Nusantara",
    email: "info@pasarnusantara.com",
    jumlah_toko: 15,
    created_at: "2025-02-12T00:00:00Z",
  },
  {
    id: 5,
    user_id: "cust005",
    nama_customer: "CV Tech Plus",
    email: "support@techplus.com",
    jumlah_toko: 6,
    created_at: "2025-03-01T00:00:00Z",
  },
];
