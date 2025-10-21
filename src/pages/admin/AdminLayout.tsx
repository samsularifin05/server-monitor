import { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Server,
  AlertCircle,
  LogOut,
  Menu,
  X,
  BoxIcon,
  Database,
  MessageCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStroage";
import { IResponseLoginDto } from "../../types/userdata";

interface AdminLayoutProps {
  children: ReactNode;
  padding?: boolean;
  activePage: string;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    id: "group",
    label: "Data Group",
    icon: BoxIcon,
    path: "/admin/group",
  },
  {
    id: "client",
    label: "Data Client",
    icon: Users,
    path: "/admin/client",
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    path: "/admin/database",
  },
  {
    id: "vps",
    label: "Virtual Private Server",
    icon: Server,
    path: "/admin/vps",
  },
  {
    id: "updates",
    label: "Update Gangguan",
    icon: AlertCircle,
    path: "/admin/updates",
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    badge: 3,
    path: "/admin/chat",
  },
];

export default function AdminLayout({
  children,
  padding = true,
  activePage,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const logoutApp = () => {
    localStorage.clear();
    navigate("/");
  };

  const datausers = getItem<IResponseLoginDto>("userdata");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="fixed top-0 left-0 flex-col hidden w-64 h-full bg-white border-r border-gray-200 md:flex">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ServerMonitor</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>

                {item?.badge !== undefined && item?.badge > 0 && (
                  <span className="ml-auto bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => logoutApp()}
            className="flex items-center w-full gap-3 px-4 py-3 text-red-600 transition-all rounded-lg cursor-pointer hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-opacity-50 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="fixed top-0 left-0 flex flex-col w-64 h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    ServerMonitor
                  </h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <Link
                    to={item.path}
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => logoutApp()}
                className="flex items-center w-full gap-3 px-4 py-3 text-red-600 transition-all rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 md:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 transition-colors rounded-lg md:hidden hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.id === activePage)?.label ||
                "Dashboard"}
            </h2>
            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-gray-800">
                  {datausers.user_name}
                </p>
                <p className="text-xs text-gray-500">{datausers.level}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 font-medium text-white bg-blue-600 rounded-full">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`${padding ? "p-4 md:p-8" : ""}`}>{children}</main>
      </div>
    </div>
  );
}
