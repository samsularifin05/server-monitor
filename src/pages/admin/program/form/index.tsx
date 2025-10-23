import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RenderTextInput } from "../../../../components";
import { IProgramRequestDTO } from "../types/request.dto";
import { useCreate, useEdit, useServer, useSubDomain } from "../service";
import toast from "react-hot-toast";
import { useModal } from "../../../../store/useModal";
import { ProgramSchema } from "../validate";
import { useLoading } from "@/store/useLoading";
import { useGroup } from "../../group/service";
import RenderSelectInput from "@/components/input/renderSelectInput";
import React from "react";

// --- Komponen Form ---
export default function ProgramForm() {
  const { closeModal, modalData, modalType } = useModal();

  const form = useForm<IProgramRequestDTO>({
    resolver: zodResolver(ProgramSchema),
    defaultValues: modalData
      ? modalData
      : {
          _id: "",
          kode_toko: "",
          kode_subdomain: "",
          nama_program: "",
          deskripsi: "",
          nama_domain: "",
          kode_vps: "",
          kode_group: "",
          port: "",
          tgl_expire_ssl: "",
          tgl_expire_domain: "",
        },
  });

  const { startLoading, stopLoading, isLoading } = useLoading();
  const createProgram = useCreate();
  const editProgram = useEdit();
  const { data: datGroup } = useGroup();
  const { data: datServer } = useServer();
  const { data: datSubDomain } = useSubDomain();

  const formValues = form.watch();

  const onSubmit = async (data: IProgramRequestDTO) => {
    startLoading("button", "program");
    try {
      if (!data._id) {
        delete data._id;
        await createProgram.mutateAsync(data);
      } else {
        await editProgram.mutateAsync(data);
      }

      toast.success("Program berhasil disimpan");
      form.reset();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(`${error || "Gagal menyimpan Program"}`);
    }
    stopLoading("button", "program");
    // form.reset();
  };

  const loadingButton = isLoading("button", "program");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <RenderTextInput control={form.control} name="_id" type="hidden" />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="kode_toko"
            placeholder="Masukkan Kode Toko"
            label="Kode Toko"
          />
        </div>
        <div>
          <RenderSelectInput
            control={form.control}
            name="kode_group"
            options={datGroup.map((group) => ({
              value: group.kode_group,
              label: group.nama_group,
            }))}
            placeholder="Masukkan Kode Group"
            label="Kode Group"
          />
        </div>
        <div>
          <RenderSelectInput
            control={form.control}
            name="kode_vps"
            options={datServer.map((server) => ({
              value: server.kode_server,
              label: server.nama_server,
            }))}
            placeholder="Masukkan Kode VPS"
            label="Kode VPS"
          />
        </div>

        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="nama_program"
            placeholder="Masukkan Nama Program"
            label="Nama Program"
          />
        </div>
        <div>
          <RenderSelectInput
            control={form.control}
            name="kode_subdomain"
            options={datSubDomain.map((subdomain) => ({
              value: subdomain.kode_sub_domain,
              label: subdomain.nama_sub_domain,
            }))}
            placeholder="Masukkan Kode Subdomain"
            label="Kode Subdomain"
          />
        </div>
        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="nama_domain"
            placeholder="Masukkan Nama Domain"
            label="Nama Domain"
          />
        </div>

        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="port"
            placeholder="Masukkan Port"
            label="Port"
          />
        </div>
        {formValues.kode_subdomain === "SD-00004" && (
          <React.Fragment>
            <div>
              <RenderTextInput
                type="date"
                control={form.control}
                name="tgl_expire_domain"
                placeholder="Masukkan Tanggal Expire Domain"
                label="Tanggal Expire Domain"
              />
            </div>
            <div>
              <RenderTextInput
                type="date"
                control={form.control}
                name="tgl_expire_ssl"
                placeholder="Masukkan Tanggal Expire SSL"
                label="Tanggal Expire SSL"
              />
            </div>
          </React.Fragment>
        )}
        <div>
          <RenderTextInput
            type="text"
            control={form.control}
            name="deskripsi"
            placeholder="Masukkan Deskripsi"
            label="Deskripsi"
          />
        </div>

        <div className="mt-6">
          <Button
            label={modalType === "Add" ? "Simpan" : "Edit"}
            size="lg"
            loading={loadingButton}
            type="submit"
            fullWidth
          />
        </div>
      </div>
    </form>
  );
}
