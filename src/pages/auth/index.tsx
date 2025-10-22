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
      user_id: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      if (data.user_id.trim() === "demo" || data.password.trim() === "demo") {
        navigate("/customer");
        return;
      }
      const response = await toast.promise(
        apiInstance.post<IResponseLoginDto>("/auth/login", data),
        {
          loading: "Logging in...",
          success: <b>Login berhasil!</b>,
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
      toast.error("Login gagal. Silakan periksa kembali user ID dan password.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-dvh bg-linear-to-b from-white via-gold-50 to-gold-100 px-4 overflow-hidden">
      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gold-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4 bg-gold-400 rounded-xl shadow-md">
            <Server className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            Nagatech Dashboard
          </h1>
          <p className="mt-2 text-gray-500 text-center text-sm sm:text-base">
            Pantau status server Anda dengan mudah
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <RenderTextInput
            type="text"
            control={control}
            name="user_id"
            placeholder="Masukkan User ID"
            label="User ID"
          />

          <RenderTextInput
            control={control}
            name="password"
            type="password"
            label="Password"
            placeholder="Masukkan password"
          />

          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center w-full gap-2 py-3 font-medium text-white bg-gold-400 rounded-lg hover:bg-gold-500 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Masuk
          </button>
        </form>

        {/* Info demo */}
        <div className="mt-8 text-center text-gray-600 text-sm leading-relaxed">
          <p className="font-semibold text-gold-600">Akun Demo</p>
          <p className="mt-2">
            <span className="font-medium">Customer:</span> demo / demo
          </p>
          <p className="mt-1">
            <span className="font-medium">Admin:</span> engineer /
            developer-b3r4sm3r4h
          </p>
        </div>
      </div>

      {/* Wave background */}
      <svg
        className="absolute bottom-0 left-0 w-full animate-wave-slow"
        viewBox="0 0 1440 280"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#E8A504" />
            <stop offset="100%" stopColor="#FFD97A" />
          </linearGradient>
        </defs>

        <path
          fill="url(#waveGradient)"
          fillOpacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,192C672,203,768,213,864,197.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192V320H0Z"
        ></path>

        <path
          fill="#FFD97A"
          fillOpacity="0.5"
          d="M0,256L60,234.7C120,213,240,171,360,165.3C480,160,600,192,720,197.3C840,203,960,181,1080,176C1200,171,1320,181,1380,186.7L1440,192V320H0Z"
        ></path>
      </svg>
    </div>
  );
}

const GuestLoginPage = withGuest(LoginPage);
export default GuestLoginPage;
