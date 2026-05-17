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

      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-10">

        <div className="text-center mb-8 md:mb-12">

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-3 leading-tight">
            Афиша музеев и выставок
          </h1>

          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Искусство ближе, чем кажется. Прикоснись к прекрасному без очередей.
          </p>

        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 md:mb-14">

          <button
            onClick={() => navigate("/")}
            className="px-5 md:px-8 py-2.5 rounded-2xl bg-[#8B2635] text-white text-sm md:text-base transition"
          >
            Главная
          </button>

          <button
            onClick={() => navigate("/museums")}
            className="px-5 md:px-8 py-2.5 rounded-2xl bg-white border text-gray-600 hover:bg-[#8B2635] hover:text-white transition text-sm md:text-base"
          >
            Музеи
          </button>

          <button
            onClick={() => navigate("/exhibitions")}
            className="px-5 md:px-8 py-2.5 rounded-2xl bg-white border text-gray-600 hover:bg-[#8B2635] hover:text-white transition text-sm md:text-base"
          >
            Выставки
          </button>

        </div>

        <section className="mb-12 md:mb-16">

          <h2 className="text-base md:text-xl font-semibold mb-5 md:mb-7 flex items-center gap-3">

            <img
              src={collectionsIcon}
              className="w-6 h-6 md:w-8 md:h-8"
            />

            ПОДБОРКИ ОТ РЕДАКЦИИ

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

            {collections.map((item, i) => (
              <div
                key={i}
                className="bg-[#F5F5F5] rounded-3xl p-5 md:p-6 flex flex-col min-h-[180px] shadow-sm"
              >

                <p className="text-sm md:text-base leading-relaxed">
                  {item.title}
                </p>

                <button
                  onClick={() => navigate(item.path)}
                  className="mt-auto bg-[#8B2635] hover:opacity-90 transition text-white py-3 rounded-2xl text-sm md:text-base"
                >
                  Смотреть →
                </button>

              </div>
            ))}

          </div>

        </section>

        <section>

          <h2 className="text-base md:text-xl font-semibold mb-5 md:mb-7 flex items-center gap-3">

            <img
              src={exhibitionsIcon}
              className="w-6 h-6 md:w-8 md:h-8"
            />

            ВЫСТАВКИ НЕДЕЛИ

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">

            {exhibitions.map((item, i) => (
              <div
                key={i}
                className="bg-[#F5F5F5] rounded-3xl overflow-hidden shadow-sm"
              >

                <img
                  src={item.img}
                  className="h-52 md:h-64 w-full object-cover"
                />

                <div className="p-5 md:p-6 flex flex-col">

                  <p className="text-sm md:text-base font-medium mb-3 leading-relaxed">
                    {item.title}
                  </p>

                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-5">
                    <MapPin size={15} />
                    <span>{item.place}</span>
                  </div>

                  <div className="flex items-end justify-between gap-4">

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        от
                      </p>

                      <p className="text-xl md:text-2xl font-semibold">
                        {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/booking", { state: item })}
                      className="bg-[#8B2635] hover:opacity-90 transition text-white px-5 py-3 rounded-2xl text-sm md:text-base whitespace-nowrap"
                    >
                      Купить
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

      </main>

      <footer className="bg-[#111111] text-white mt-14">

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <img
                  src={logo}
                  className="w-10 h-10"
                />

                <span className="font-semibold text-lg">
                  ArtTicket
                </span>

              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                Покупайте билеты в лучшие музеи и выставки онлайн
              </p>

            </div>

            <div>

              <p className="font-semibold mb-4">
                Помощь
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-400">

                <Link to="/faq">
                  Часто задаваемые вопросы
                </Link>

                <Link to="/refund">
                  Условия возврата
                </Link>

                <Link to="/rules">
                  Правила посещения
                </Link>

              </div>

            </div>

            <div>

              <p className="font-semibold mb-4">
                Контакты
              </p>

              <div className="flex flex-col gap-2 text-sm text-gray-400">

                <span>Email: info@artticket.ru</span>

                <span>Телефон: +7 (495) 123-45-67</span>

                <span>Поддержка: support@artticket.ru</span>

              </div>

            </div>

          </div>

          <div className="h-[1px] bg-gray-800 mb-5" />

          <p className="text-center text-gray-500 text-sm">
            © 2026 ArtTicket. Все права защищены.
          </p>

        </div>

      </footer>

      {open && <AuthModal onClose={() => setOpen(false)} />}

    </div>
  );
}