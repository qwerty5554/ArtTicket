import { useNavigate, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "../components/AuthModal";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";
import img1 from "../assets/images/vangogh.jpg";
import img2 from "../assets/images/renaissance.jpg";
import img3 from "../assets/images/museum.jpg";

import collectionsIcon from "../assets/images/book.png";
import exhibitionsIcon from "../assets/images/time.png";

export default function HomePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const collections = [
    {
      title: "MUST SEE: 5 выставок, которые нельзя пропустить этим летом",
      path: "/must-see",
    },
    {
      title: "Топ-3 музея, которые нужно посетить каждому",
      path: "/top-museums",
    },
    {
      title: "Эрмитаж за один день: 5 точек на карте, которые вы запомните",
      path: "/hermitage-day",
    },
  ];

  const exhibitions = [
    {
      title: "Мультимедийная выставка “Быть Ван Гогом”",
      place: "Музей ВДНХ",
      price: "600 ₽",
      img: img1,
    },
    {
      title: "Эпоха Неизвестного. К 100-летию художника",
      place: "Третьяковская галерея",
      price: "650 ₽",
      img: img2,
    },
    {
      title: "Драгоценности: Блеск русского двора",
      place: "Государственный исторический музей",
      price: "500 ₽",
      img: img3,
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

      {/* 🔥 ЕДИНЫЙ HEADER */}
      <Header />

      {/* CONTENT */}
      <div className="flex-1 px-12 py-10">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold mb-3">
            Афиша музеев и выставок
          </h1>
          <p className="text-gray-500 text-sm">
            Искусство ближе, чем кажется. Прикоснись к прекрасному без очередей.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-20 mb-12">

          <button
            onClick={() => navigate("/")}
            className="px-8 py-2 rounded-xl text-gray-500 hover:bg-[#8B2635] hover:text-white transition"
          >
            Главная
          </button>

          <button
            onClick={() => navigate("/museums")}
            className="px-8 py-2 rounded-xl text-gray-500 hover:bg-[#8B2635] hover:text-white transition"
          >
            Музеи
          </button>

          <button
            onClick={() => navigate("/exhibitions")}
            className="px-8 py-2 rounded-xl text-gray-500 hover:bg-[#8B2635] hover:text-white transition"
          >
            Выставки
          </button>

        </div>

        {/* ПОДБОРКИ */}
        <div className="mb-14">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-3">
            <img src={collectionsIcon} className="w-8 h-8" />
            ПОДБОРКИ ОТ РЕДАКЦИИ
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {collections.map((item, i) => (
              <div
                key={i}
                className="bg-[#F5F5F5] rounded-2xl p-5 flex flex-col h-[150px]"
              >
                <p className="text-sm">
                  {item.title}
                </p>

                <button
                  onClick={() => navigate(item.path)}
                  className="mt-auto bg-[#8B2635] text-white py-2 rounded-xl text-sm"
                >
                  Смотреть →
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* ВЫСТАВКИ */}
        <div>
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-3">
            <img src={exhibitionsIcon} className="w-8 h-8" />
            ВЫСТАВКИ НЕДЕЛИ
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {exhibitions.map((item, i) => (
              <div key={i} className="bg-[#F5F5F5] rounded-2xl overflow-hidden">

                <img src={item.img} className="h-52 w-full object-cover" />

                <div className="p-5 flex flex-col">

                  <p className="text-sm font-medium mb-3">
                    {item.title}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                    <MapPin size={14} />
                    {item.place}
                  </div>

                  <div className="flex justify-between items-end">

                    <div>
                      <p className="text-xs text-gray-400">от</p>
                      <p className="text-lg font-semibold">
                        {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/booking", { state: item })}
                      className="bg-[#8B2635] text-white px-4 py-2 rounded-xl text-sm"
                    >
                      Купить
                    </button>

                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="bg-black text-white px-12 py-10">
        <div className="grid grid-cols-3 gap-10 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} className="w-10 h-10" />
              <span className="font-semibold">ArtTicket</span>
            </div>

            <p className="text-gray-400 text-sm">
              Покупайте билеты в лучшие музеи и выставки онлайн
            </p>
          </div>

          <div>
            <p className="font-semibold mb-3">Помощь</p>

            <div className="text-gray-400 text-sm flex flex-col gap-2">
              <Link to="/faq">Часто задаваемые вопросы</Link>
              <Link to="/refund">Условия возврата</Link>
              <Link to="/rules">Правила посещения</Link>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-3">Контакты</p>

            <div className="text-gray-400 text-sm flex flex-col gap-1">
              <span>Email: info@artticket.ru</span>
              <span>Телефон: +7 (495) 123-45-67</span>
              <span>Поддержка: support@artticket.ru</span>
            </div>
          </div>

        </div>

        <div className="h-[1px] bg-gray-800 mb-4" />

        <p className="text-center text-gray-500 text-sm">
          © 2026 ArtTicket. Все права защищены.
        </p>
      </div>

      {open && <AuthModal onClose={() => setOpen(false)} />}

    </div>
  );
}