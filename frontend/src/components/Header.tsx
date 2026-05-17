import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { searchData } from "../data/searchData";

import logo from "../assets/images/logo.png";
import searchIcon from "../assets/images/search.png";
import { useLocation } from "react-router-dom";
import profileIcon from "../assets/images/profile.png";
import chatIcon from "../assets/images/chat.png";
import logoutIcon from "../assets/images/logout.png";
import homeIcon from "../assets/images/home.png";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = localStorage.getItem("isAuth");

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setShow(false);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
    setShow(true);
  };

  return (
    <>
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">

        <div className="px-4 md:px-10 py-4 flex items-center justify-between">

          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="h-8 md:h-10" />
            <span className="text-lg md:text-xl font-semibold">
              ArtTicket
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 flex-1 justify-end relative">

            {/* поиск */}
            <div className="flex items-center gap-3 bg-[#F3F3F3] px-5 py-2 rounded-full w-[400px] relative">

              <img src={searchIcon} className="w-4 h-4 opacity-60" />

              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate("/search", { state: { query } });
                    setShow(false);
                  }
                }}
                placeholder="Поиск выставок или музеев..."
                className="bg-transparent outline-none text-sm w-full"
              />

              {show && results.length > 0 && (
                <div className="absolute top-14 left-0 w-full bg-white rounded-2xl shadow-xl overflow-hidden border">

                  {results.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        navigate(item.route, { state: item.data });
                        setShow(false);
                        setQuery("");
                      }}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.type}</p>
                    </div>
                  ))}

                </div>
              )}

            </div>

            {!isAuth ? (
              <button
                onClick={() => setOpen(true)}
                className="bg-[#8B2635] text-white px-5 py-2 rounded-xl text-sm"
              >
                Войти
              </button>
            ) : (
              <div className="flex items-center gap-6 text-sm text-gray-600">

                <div
  onClick={() =>
    navigate(
      location.pathname === "/profile"
        ? "/"
        : "/profile"
    )
  }
  className="cursor-pointer"
>

  <img
    src={
      location.pathname === "/profile"
        ? homeIcon
        : profileIcon
    }
    className="w-4 h-4 inline"
  />

  {location.pathname === "/profile"
    ? " Главная"
    : " Профиль"}

</div>

                <button
                  onClick={() => navigate("/support")}
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <img src={chatIcon} className="w-4 h-4" />
                  Чат
                </button>

                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <img src={logoutIcon} className="w-4 h-4" />
                  Выйти
                </button>

              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

        {/* мобильное меню */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 bg-white border-t">

            <div className="flex items-center gap-3 bg-[#F3F3F3] px-4 py-3 rounded-2xl mb-4 mt-4 relative">

              <img src={searchIcon} className="w-4 h-4 opacity-60" />

              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Поиск..."
                className="bg-transparent outline-none text-sm w-full"
              />

            </div>

            {show && results.length > 0 && (
              <div className="bg-white rounded-2xl shadow mb-4 overflow-hidden border">

                {results.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigate(item.route, { state: item.data });
                      setShow(false);
                      setMobileMenu(false);
                    }}
                    className="px-4 py-3 border-b last:border-b-0"
                  >
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                ))}

              </div>
            )}

            {!isAuth ? (
              <button
                onClick={() => {
                  setOpen(true);
                  setMobileMenu(false);
                }}
                className="w-full bg-[#8B2635] text-white py-3 rounded-2xl"
              >
                Войти
              </button>
            ) : (
              <div className="flex flex-col gap-3">

                <div
                  onClick={() =>
                    navigate(
                      location.pathname === "/profile"
                        ? "/"
                        : "/profile"
                    )
                  }
                  className="cursor-pointer"
                >

                  <img
                    src={
                      location.pathname === "/profile"
                        ? homeIcon
                        : profileIcon
                    }
                    className="w-4 h-4 inline"
                  />

                  {location.pathname === "/profile"
                    ? " Главная"
                    : " Профиль"}

                </div>

                <button
                  onClick={() => navigate("/support")}
                  className="flex items-center gap-3 text-left"
                >
                  <img src={chatIcon} className="w-4 h-4" />
                  Чат
                </button>

                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-3 text-left text-red-600"
                >
                  <img src={logoutIcon} className="w-4 h-4" />
                  Выйти
                </button>

              </div>
            )}

          </div>
        )}

      </header>

      {open && <AuthModal onClose={() => setOpen(false)} />}
    </>
  );
};