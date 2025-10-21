// components/LoadingFallback.tsx
import Logo from "../../assets/nsi-logo-min.png"; // ganti dengan path logomu

export default function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gold-300">
      <img src={Logo} alt="Logo" className="w-auto h-24 animate-pulse" />
    </div>
  );
}
