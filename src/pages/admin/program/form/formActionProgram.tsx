import { useModal } from "@/store/useModal";
import { IProgramResponseDTO } from "../types/response.dto";

const FormActionProgram = () => {
  const { modalData, closeModal } = useModal<IProgramResponseDTO>();
  if (!modalData) return null;

  const {
    domain,
    deskripsi,
    kode_toko,
    port,
    tgl_expire_domain,
    tgl_expire_ssl,
    kode_vps,
    status_online,
    nama_vps,
  } = modalData;

  const renderField = (label: string, value?: string | number) => (
    <div className="flex flex-col">
      <span className="text-xs text-slate-500 font-medium">{label}</span>
      <span className="text-sm font-semibold text-slate-700">
        {value && value !== "-" ? value : "-"}
      </span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {renderField("VPS", nama_vps)}
        {renderField("Domain", domain)}
        {renderField("Kode Toko", kode_toko)}
        {renderField("Port", port)}
        {renderField("Expire Domain", tgl_expire_domain)}
        {renderField("Expire SSL", tgl_expire_ssl)}
        {kode_vps && kode_vps !== "-" && renderField("Kode VPS", kode_vps)}
      </div>

      {deskripsi && deskripsi !== "-" && (
        <div className="pt-1">
          <span className="text-xs text-slate-500 font-medium">Deskripsi:</span>
          <p className="text-sm text-slate-700 mt-0.5">{deskripsi}</p>
        </div>
      )}

      <div className="flex gap-3 pt-2 w-full justify-between">
        {status_online ? (
          <button
            onClick={closeModal}
            className="px-4 py-2 w-full rounded-lg bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors"
          >
            Nonaktifkan
          </button>
        ) : (
          <button
            onClick={closeModal}
            className="px-4 py-2 w-full rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            Aktifkan
          </button>
        )}
      </div>
    </div>
  );
};

export default FormActionProgram;
