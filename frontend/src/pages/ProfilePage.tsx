import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { QrModal } from "../components/QrModal";

import logo from "../assets/images/logo.png";
import { Header } from "../components/Header";
import chatIcon from "../assets/images/chat.png";

import ticketsIcon from "../assets/images/ticket.png";
import historyIcon from "../assets/images/history.png";

export default function ProfilePage() {

  const navigate = useNavigate();

  const [tab, setTab] = useState("tickets");

  // QR
  const [showQR, setShowQR] = useState(false);

  const [currentTicket, setCurrentTicket] = useState<any>(null);

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const [tickets, setTickets] = useState<any[]>([]);

  // Загрузка билетов
  useEffect(() => {

    const loadTickets = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8082/tickets/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setTickets(data || []);

      } catch (err) {

        console.log(err);

      }
    };

    loadTickets();

  }, []);

  // Авто QR после покупки
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

  const activeTickets = tickets.filter(
    (ticket: any) =>
      ticket.status !== "Посещён"
  );

  // ИСТОРИЯ
  const historyTickets = tickets.filter(
    (ticket: any) =>
      ticket.status === "Посещён"
  );

  return (

    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

      <Header />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 lg:px-14 py-6 lg:py-10 flex-1">

        <div className="w-full lg:w-[280px] bg-[#F5F5F5] rounded-2xl p-6 h-fit">

          <div className="flex flex-col items-center mb-8">

            <div className="w-24 h-24 rounded-full bg-[#8B2635] flex items-center justify-center text-white text-3xl">

              {user.firstName?.[0] || "И"}
              {user.lastName?.[0] || "И"}

            </div>

            <p className="mt-4 font-medium text-base text-center">

              {user.firstName || "Иван"}{" "}
              {user.lastName || "Иванов"}

            </p>

            <p className="text-sm text-gray-500 text-center break-all">

              {user.email || "ivan@example.com"}

            </p>

          </div>

          <div className="flex flex-col gap-3 text-sm">

            <button
              onClick={() => setTab("tickets")}
              className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition ${tab === "tickets"
                ? "bg-[#8B2635]/40"
                : "bg-white hover:bg-[#8B2635]/20"
                }`}
            >

              <img src={ticketsIcon} className="w-5 h-5" />

              Мои билеты

            </button>

            <button
              onClick={() => setTab("history")}
              className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition ${tab === "history"
                ? "bg-[#8B2635]/40"
                : "bg-white hover:bg-[#8B2635]/20"
                }`}
            >

              <img src={historyIcon} className="w-5 h-5" />

              История

            </button>

            {/* ЧАТ */}
            <button
              onClick={() => navigate("/support")}
              className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white hover:bg-[#8B2635]/20 transition"
            >

              <img src={chatIcon} className="w-5 h-5" />

              Чат поддержки

            </button>

          </div>

        </div>

        <div className="flex-1 min-w-0">

          <h1 className="hidden lg:block text-3xl font-semibold mb-10">
            Личный кабинет
          </h1>

          {tab === "tickets" && (

            <div className="flex flex-col gap-4 lg:gap-6 max-w-[920px]">

              {activeTickets?.length === 0 && (
                <p className="text-gray-500">
                  У вас пока нет билетов
                </p>
              )}

              {activeTickets?.map((t: any, i: number) => (

                <div
                  key={i}
                  className="bg-[#F5F5F5] rounded-2xl p-4 lg:p-8 relative"
                >

                  <span className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">

                    {t.status}

                  </span>

                  <p className="text-sm lg:text-base font-medium pr-24 leading-relaxed">

                    {t.exhibition}

                  </p>

                  <p className="text-xs lg:text-sm text-gray-500 mt-1">

                    {t.museum}

                  </p>

                  <div className="grid grid-cols-2 lg:flex lg:gap-16 gap-y-4 mt-6 text-sm">

                    <div>

                      <p className="text-gray-400 text-xs">
                        Дата
                      </p>

                      <p className="text-sm">
                        {t.date}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-400 text-xs">
                        Время
                      </p>

                      <p className="text-sm">
                        {t.time}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-400 text-xs">
                        Билетов
                      </p>

                      <p className="text-sm">
                        {t.count}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-400 text-xs">
                        Сумма
                      </p>

                      <p className="text-sm">
                        {t.price} ₽
                      </p>

                    </div>

                  </div>

                  <div className="h-[1px] bg-[#D4D4D4] my-5 lg:my-6" />

                  <button
                    onClick={() => {
                      setCurrentTicket(t);
                      setShowQR(true);
                    }}
                    className="w-full lg:w-auto bg-[#8B2635] text-white px-5 py-3 lg:py-2 rounded-xl text-sm"
                  >

                    Показать QR-код

                  </button>

                </div>
              ))}

            </div>
          )}

          {/* ИСТОРИЯ */}
          {tab === "history" && (

            <div className="max-w-[920px]">

              {/* Если истории нет */}
              {historyTickets?.length === 0 && (

                <div className="bg-[#F5F5F5] rounded-2xl p-6 lg:p-8 border border-[#E3E3E3]">

                  <h2 className="text-lg font-medium mb-4 text-center">
                    История посещений
                  </h2>

                  <div className="bg-[#EFEFEF] border border-[#DDDDDD] rounded-2xl px-4 py-6 text-center">

                    <p className="text-sm text-gray-500">
                      История ваших посещений появится здесь
                    </p>

                  </div>

                </div>

              )}

              {/* Если история есть  */}
              {historyTickets?.length > 0 && (

                <div className="flex flex-col gap-4 lg:gap-6">

                  {historyTickets?.map((t: any, i: number) => (

                    <div
                      key={i}
                      className="bg-[#F5F5F5] rounded-2xl p-4 lg:p-8 relative opacity-80"
                    >

                      <span className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">

                        Посещён

                      </span>

                      <p className="text-sm lg:text-base font-medium pr-24 leading-relaxed">

                        {t.exhibition}

                      </p>

                      <p className="text-xs lg:text-sm text-gray-500 mt-1">

                        {t.museum}

                      </p>

                      <div className="grid grid-cols-2 lg:flex lg:gap-16 gap-y-4 mt-6 text-sm">

                        <div>

                          <p className="text-gray-400 text-xs">
                            Дата
                          </p>

                          <p className="text-sm">
                            {t.date}
                          </p>

                        </div>

                        <div>

                          <p className="text-gray-400 text-xs">
                            Время
                          </p>

                          <p className="text-sm">
                            {t.time}
                          </p>

                        </div>

                        <div>

                          <p className="text-gray-400 text-xs">
                            Билетов
                          </p>

                          <p className="text-sm">
                            {t.count}
                          </p>

                        </div>

                        <div>

                          <p className="text-gray-400 text-xs">
                            Сумма
                          </p>

                          <p className="text-sm">
                            {t.price} ₽
                          </p>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              )}

            </div>
          )}

        </div>

      </div>

      <div className="bg-black text-white px-4 lg:px-12 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">

          <div>

            <div className="flex items-center gap-2 mb-3">

              <img src={logo} className="w-10 h-10" />

              <span className="font-semibold">
                ArtTicket
              </span>

            </div>

            <p className="text-gray-400 text-sm">

              Покупайте билеты в лучшие музеи и выставки онлайн

            </p>

          </div>

          <div>

            <p className="font-semibold mb-3">
              Помощь
            </p>

            <div className="text-gray-400 text-sm flex flex-col gap-2">

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

            <p className="font-semibold mb-3">
              Контакты
            </p>

            <div className="text-gray-400 text-sm flex flex-col gap-1">

              <span>
                Email: info@artticket.ru
              </span>

              <span>
                Телефон: +7 (495) 123-45-67
              </span>

              <span>
                Поддержка: support@artticket.ru
              </span>

            </div>

          </div>

        </div>

        <div className="h-[1px] bg-gray-800 mb-4" />

        <p className="text-center text-gray-500 text-sm">
          © 2026 ArtTicket
        </p>

      </div>

      {/* QR */}
      {showQR && (

        <QrModal
          ticket={currentTicket}
          onClose={() => setShowQR(false)}
        />

      )}

    </div>
  );
}