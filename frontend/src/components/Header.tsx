import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { searchData } from "../data/searchData";

import logo from "../assets/images/logo.png";
import searchIcon from "../assets/images/search.png";

import profileIcon from "../assets/images/profile.png";
import chatIcon from "../assets/images/chat.png";
import logoutIcon from "../assets/images/logout.png";

export const Header = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth");

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

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
      <div className="px-10 py-4 flex items-center justify-between border-b shadow-sm bg-white">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-10" />
          <span className="text-xl font-semibold">ArtTicket</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 flex-1 justify-end relative">

          {/* SEARCH */}
          <div className="flex items-center gap-3 bg-[#F1F1F1] px-5 py-2 rounded-full w-[400px] shrink-0">
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
          </div>

          {/* 🔥 DROPDOWN */}
          {show && results.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-lg z-50 overflow-hidden">

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

          {/* AUTH */}
          {!isAuth ? (
            <button
              onClick={() => setOpen(true)}
              className="bg-[#8B2635] text-white px-5 py-2 rounded-lg"
            >
              Войти
            </button>
          ) : (
            <div className="flex items-center gap-6 text-sm text-gray-600">

              <div onClick={() => navigate("/profile")} className="cursor-pointer">
                <img src={profileIcon} className="w-4 h-4 inline" /> Профиль
              </div>

              <div onClick={() => navigate("/support")} className="cursor-pointer">
                <img src={chatIcon} className="w-4 h-4 inline" /> Чат
              </div>

              <div
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="cursor-pointer"
              >
                <img src={logoutIcon} className="w-4 h-4 inline" /> Выйти
              </div>

            </div>
          )}
        </div>
      </div>

      {open && <AuthModal onClose={() => setOpen(false)} />}
    </>
  );
};