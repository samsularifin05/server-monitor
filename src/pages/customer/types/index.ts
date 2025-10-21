export type StoreType = {
  id: number;
  name: string;
  server: string;
  status: "normal" | "gangguan" | "down";
  lastUpdate: string;
};

// Props
export type StoresTableProps = {
  stores: StoreType[];
};
