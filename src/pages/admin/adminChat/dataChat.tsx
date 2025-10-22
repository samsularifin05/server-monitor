import { Conversation } from "./types";

export const dataChat: Conversation[] = [
  {
    id: "1",
    name: "Toko Mas Laris",
    avatar: "https://i.pravatar.cc/40?img=2",
    lastMessage: "Servernya kenapa ya? Sistem tidak bisa login.",
    time: "5m ago",
    unread: 3,
    online: true,
    messages: [
      {
        from: "user",
        text: "Halo admin, servernya kenapa ya? Sistem tidak bisa login.",
        time: new Date(),
      },
      {
        from: "admin",
        text: "Halo Toko Mas Laris, sedang kami cek ya, mohon tunggu sebentar.",
        time: new Date(),
      },
      {
        from: "user",
        text: "Baik, tolong segera ya, kasir tidak bisa input transaksi.",
        time: new Date(),
      },
    ],
  },
  {
    id: "2",
    name: "Toko Mas Suryajaya",
    avatar: "https://i.pravatar.cc/40?img=4",
    lastMessage: "Database error, stok tidak muncul.",
    time: "20m ago",
    unread: 1,
    online: false,
    messages: [
      {
        from: "user",
        text: "Selamat siang, database error. Stok tidak muncul di aplikasi.",
        time: new Date(),
      },
      {
        from: "admin",
        text: "Terima kasih laporannya. Kami sedang restart database server.",
        time: new Date(),
      },
      {
        from: "user",
        text: "Baik, mohon kabarnya setelah normal kembali ya.",
        time: new Date(),
      },
    ],
  },
  {
    id: "3",
    name: "Toko Mas Italy Bandung",
    avatar: "https://i.pravatar.cc/40?img=8",
    lastMessage: "Aplikasinya tidak bisa dibuka sama sekali.",
    time: "1h ago",
    unread: 2,
    online: true,
    messages: [
      {
        from: "user",
        text: "Selamat pagi, aplikasinya tidak bisa dibuka sama sekali.",
        time: new Date(),
      },
      {
        from: "admin",
        text: "Apakah muncul pesan error tertentu saat dibuka?",
        time: new Date(),
      },
      {
        from: "user",
        text: "Tidak muncul pesan apa-apa, langsung force close.",
        time: new Date(),
      },
    ],
  },
  {
    id: "4",
    name: "Toko Mas Suryajaya 2",
    avatar: "https://i.pravatar.cc/40?img=9",
    lastMessage: "Sudah bisa login lagi, terima kasih.",
    time: "3h ago",
    unread: 0,
    online: false,
    messages: [
      {
        from: "user",
        text: "Barusan server down, semua cabang tidak bisa login.",
        time: new Date(),
      },
      {
        from: "admin",
        text: "Sudah kami perbaiki, silakan coba login ulang.",
        time: new Date(),
      },
      {
        from: "user",
        text: "Sudah bisa login lagi, terima kasih.",
        time: new Date(),
      },
    ],
  },
];
