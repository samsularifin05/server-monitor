import { LogIn, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "./validate";
import { RenderTextInput } from "../../components";
import { apiInstance } from "../../utils/axios";
import { setItem } from "../../utils/localStroage";
import { IResponseLoginDto } from "../../types/userdata";

import { withGuest } from "../../middleware/guestOnly";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_id: "engineer",
      password: "developer-b3r4sm3r4h",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await toast.promise(
        apiInstance.post<IResponseLoginDto>("/auth/login", {
          user_id: data.user_id,
          password: data.password,
        }),
        {
          loading: "Logging in...",
          success: <b>Login berhasil!</b>,
          error: <b>Login gagal.</b>,
        }
      );
      if (response.status === 200) {
        setItem("userdata", response.data);
        if (["ADMIN", "SU"].includes(response.data.level)) {
          navigate("/admin");
        } else {
          navigate("/customer");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login gagal. Silakan periksa kembali kredensial Anda.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4 bg-blue-600 rounded-xl">
            <Server className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">ServerMonitor</h1>
          <p className="mt-2 text-gray-500">Pantau status server Anda</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <RenderTextInput
            type="text"
            control={control}
            name="user_id"
            placeholder="Masukkan User id"
            label="User Id"
          />

          {/* Password */}
          <RenderTextInput
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Masukkan password"
          />

          <button
            type="submit"
            className="flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            <LogIn className="w-5 h-5" />
            Masuk
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/status"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Lihat Status Server Publik →
          </a>
        </div>
      </div>
    </div>
  );
}

const GuestLoginPage = withGuest(LoginPage);

export default GuestLoginPage;
