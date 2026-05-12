import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { QrModal } from "../components/QrModal";


import logo from "../assets/images/logo.png";

import homeIcon from "../assets/images/home.png";
import chatIcon from "../assets/images/chat.png";
import logoutIcon from "../assets/images/logout.png";

import ticketsIcon from "../assets/images/ticket.png";
import historyIcon from "../assets/images/history.png";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("tickets");
  const [showQR, setShowQR] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<any>(null);

  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [tickets, setTickets] = useState<any[]>([]);

  // 🔥 АВТО QR ПОСЛЕ ПОКУПКИ
  useEffect(() => {

  const justBought =
    localStorage.getItem("justBought");

  const lastTicketId =
    localStorage.getItem("lastTicketId");

  if (
    justBought &&
    lastTicketId &&
    tickets.length > 0
  ) {

    const ticket = tickets.find(
      (t: any) =>
        String(t.id) === String(lastTicketId)
    );

    if (ticket) {

      setCurrentTicket(ticket);

      setShowQR(true);
    }

    localStorage.removeItem("justBought");

    localStorage.removeItem("lastTicketId");
  }

}, [tickets]);

  useEffect(() => {

  const loadTickets = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8082/tickets/my",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setTickets(data || []);

    } catch (err) {

      console.log(err);

    }
  };

  loadTickets();

}, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="px-12 py-4 flex justify-between items-center border-b shadow-sm bg-white">

        <div className="flex items-center gap-3">
          <img src={logo} className="h-10" />
          <span className="text-xl font-semibold">ArtTicket</span>
        </div>

        <div className="flex items-center gap-8 text-sm text-gray-600">

          <div onClick={() => navigate("/")} className="flex items-center gap-1 cursor-pointer hover:text-black">
            <img src={homeIcon} className="w-4 h-4" />
            Главная
          </div>

          <div onClick={() => navigate("/support")} className="flex items-center gap-1 cursor-pointer hover:text-black">
            <img src={chatIcon} className="w-4 h-4" />
            Чат
          </div>

          <div
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="flex items-center gap-1 cursor-pointer hover:text-black"
          >
            <img src={logoutIcon} className="w-4 h-4" />
            Выйти
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="px-14 py-10 flex gap-10 flex-1">

        {/* SIDEBAR */}
        <div className="w-[280px] bg-[#F5F5F5] rounded-2xl p-6">

          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#8B2635] flex items-center justify-center text-white text-3xl">
              {user.firstName?.[0] || "И"}
              {user.lastName?.[0] || "И"}
            </div>

            <p className="mt-4 font-medium text-base">
              {user.firstName || "Иван"} {user.lastName || "Иванов"}
            </p>

            <p className="text-sm text-gray-500">
              {user.email || "ivan@example.com"}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">

            <button
              onClick={() => setTab("tickets")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl ${tab === "tickets" ? "bg-[#8B2635]/40" : "bg-white hover:bg-[#8B2635]/40"
                }`}
            >
              <img src={ticketsIcon} className="w-4 h-4" />
              Мои билеты
            </button>

            <button
              onClick={() => setTab("history")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl ${tab === "history" ? "bg-[#8B2635]/40" : "bg-white hover:bg-[#8B2635]/40"
                }`}
            >
              <img src={historyIcon} className="w-4 h-4" />
              История
            </button>

            <button
              onClick={() => navigate("/support")}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#8B2635]/40"
            >
              <img src={chatIcon} className="w-4 h-4" />
              Чат поддержки
            </button>

          </div>
        </div>

        {/* MAIN */}
        <div className="flex-1">

          <h1 className="text-3xl font-semibold mb-10">
            Личный кабинет
          </h1>

          {tab === "tickets" && (
            <div className="flex flex-col gap-6 max-w-[920px]">

              {tickets?.length === 0 && (
                <p className="text-gray-500">У вас пока нет билетов</p>
              )}

              {tickets?.map((t: any, i: number) => (
                <div key={i} className="bg-[#F5F5F5] rounded-2xl p-8 relative">

                  <span className="absolute top-6 right-6 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                    Оплачен
                  </span>

                  <p className="text-base font-medium">{t.title}</p>

                  <p className="text-sm text-gray-500 mt-1">{t.place}</p>

                  <div className="flex gap-16 mt-6 text-sm">

                    <div>
                      <p className="text-gray-400">Дата</p>
                      <p>{t.date}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Время</p>
                      <p>{t.time}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Билетов</p>
                      <p>{t.count}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Сумма</p>
                      <p>{t.price} ₽</p>
                    </div>

                  </div>

                  <div className="h-[1px] bg-[#D4D4D4] my-6" />

                  <button
                    onClick={() => {
                      setCurrentTicket(t);
                      setShowQR(true);
                    }}
                    className="bg-[#8B2635] text-white px-5 py-2 rounded-lg text-sm"
                  >
                    Показать QR-код
                  </button>

                </div>
              ))}

            </div>
          )}
        </div>
      </div>
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
          © 2026 ArtTicket
        </p>
      </div>

      {showQR && (
        <QrModal
          ticket={currentTicket}
          onClose={() => setShowQR(false)}
        />
      )}

    </div>
  );
}