import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import logo from "../assets/images/logo.png";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
  if (pathname === "/admin") return false; 
  return pathname === path;
};
  const linkClass = (path: string) =>
    `px-4 py-3 rounded-xl text-center transition font-medium ${
      isActive(path)
        ? "bg-[#8B2635] text-white"
        : "bg-[#5A1E27] text-white hover:bg-[#7A2A34] active:scale-95"
    }`;

const handleLogout = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("role");

  navigate("/");
};



  return (
    <div className="w-64 bg-gradient-to-b from-[#1a1a1a] to-black text-white flex flex-col justify-between">
      
      <div>
        <div className="p-6 flex items-center gap-4">
            <img src={logo} alt="logo" className="w-12 h-12" />

          <div>
            <p className="text-lg font-semibold">ArtTicket</p>
            <p className="text-sm text-gray-400">Админ-панель</p>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col gap-3 px-4 mt-6">
          <Link to="/admin" className={linkClass("/admin")}>
            Дашборд
          </Link>

          <Link to="/admin/bookings" className={linkClass("/admin/bookings")}>
            Бронирование
          </Link>

          <Link to="/admin/chat" className={linkClass("/admin/chat")}>
            Чат
          </Link>
        </div>
      </div>

      {/* Низ */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <LogOut size={18} />
          Выход
        </button>
      </div>
    </div>
  );
};