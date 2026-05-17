import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { QRCodeCanvas } from "qrcode.react";

import logo from "../assets/images/logo.png";

import calendarIcon from "../assets/images/calendar.png";
import ticketIcon from "../assets/images/verified.png";
import formIcon from "../assets/images/market.png";

export default function TicketBookingPage() {

  const navigate = useNavigate();
  const location = useLocation();

  // Выставка
  const savedExhibition = JSON.parse(
    localStorage.getItem("currentExhibition") || "null"
  );

  const exhibition: any = location.state || savedExhibition || {
    title: "Не выбрано",
    place: "Не выбрано",
  };

  // Шаг
  const [step, setStep] = useState(1);

  // Календарь
  const [monthIndex, setMonthIndex] = useState(4);

  const [selectedDay, setSelectedDay] =
    useState<number | null>(null);

  const [selectedTime, setSelectedTime] =
    useState("");

  // Билеты
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  // Оплата
  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [isPaying, setIsPaying] =
    useState(false);

  const year = 2026;

  const months = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const times = [
    "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00"
  ];

  // Дни
  const daysInMonth = new Date(
    year,
    monthIndex + 1,
    0
  ).getDate();

  // Первый день
  const firstDay =
    (new Date(year, monthIndex, 1).getDay() + 6) % 7;

  const total =
    adult * 600 + child * 400;

  // Смена месяца
  const changeMonth = (dir: number) => {

    setMonthIndex(prev =>
      (prev + dir + 12) % 12
    );

    setSelectedDay(null);

    setSelectedTime("");
  };

  // Полная дата
  const fullDate = selectedDay
    ? `${selectedDay} ${months[monthIndex]} ${year}`
    : "";

  // покупка
  const finishPayment = async () => {

    const user = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    const token =
      localStorage.getItem("token");

    // Проверка
    if (!token) {

      alert("Необходимо войти в аккаунт");

      return;
    }

    // билет
    const ticket: any = {

      userEmail: user?.email || "",

      name:
        (user?.firstName || "") +
        " " +
        (user?.lastName || ""),

      title:
        exhibition?.title || "Без названия",

      place:
        exhibition?.place || "Не указан",

      total: total,

      exhibition:
        exhibition?.title || "Без названия",

      museum:
        exhibition?.place || "Не указан",

      count: adult + child,

      status: "Оплачен",

      date: fullDate,

      time: selectedTime,

      price: total,
    };

    try {

      const response = await fetch(
        "http://localhost:8082/tickets",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            "Authorization": `Bearer ${token}`,
          },

          body: JSON.stringify(ticket),
        }
      );

      const data = await response.json();

      ticket.id = data.id;

      if (!response.ok) {

        alert(
          data.error ||
          "Ошибка покупки билета"
        );

        return;
      }

      // LOCALSTORAGE
      const oldTickets = JSON.parse(
        localStorage.getItem("tickets") || "[]"
      );

      localStorage.setItem(
        "tickets",
        JSON.stringify([...oldTickets, ticket])
      );

      localStorage.setItem(
        "justBought",
        "true"
      );

      localStorage.setItem(
        "lastTicketId",
        String(ticket.id)
      );

      navigate("/profile");

    } catch (err) {

      console.error(err);

      alert(String(err));

    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

      <Header />

      <div className="px-4 lg:px-10 mt-4">

        <button
          onClick={() =>
            step === 1
              ? navigate(-1)
              : setStep(step - 1)
          }
          className="text-sm"
        >
          ← Назад
        </button>

      </div>

      <div className="mt-6 mb-10 px-4">

        {/* DESKTOP */}
        <div className="hidden lg:flex justify-center gap-10">

          {[1, 2, 3].map((s, i) => (

            <div key={s} className="flex items-center">

              <div className="flex flex-col items-center">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                  ${step === s
                      ? "bg-[#8B2635]"
                      : step > s
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                >
                  {s}
                </div>

                <p className="text-xs mt-2">

                  {s === 1 && "Дата и время"}

                  {s === 2 && "Билеты"}

                  {s === 3 && "Оплата"}

                </p>

              </div>

              {i !== 2 && (
                <div
                  className={`w-16 h-[2px] mx-4 ${step > s
                      ? "bg-green-500"
                      : "bg-gray-300"
                    }`}
                />
              )}

            </div>
          ))}

        </div>

        {/* MOBILE */}
        <div className="flex lg:hidden justify-center">

          <div className="flex items-start">

            {[1, 2, 3].map((s, i) => (

              <div
                key={s}
                className="flex items-center"
              >

                {/* STEP */}
                <div className="flex flex-col items-center min-w-[72px]">

                  {/* КРУГ */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium
                    ${step === s
                        ? "bg-[#8B2635]"
                        : step > s
                          ? "bg-green-500"
                          : "bg-[#D9D9D9]"
                      }`}
                  >
                    {s}
                  </div>

                  <p
                    className={`mt-2 text-[10px] text-center leading-tight
                    ${step === s || step > s
                        ? "text-black"
                        : "text-[#B5B5B5]"
                      }`}
                  >

                    {s === 1 && "Дата и время"}

                    {s === 2 && "Билеты"}

                    {s === 3 && "Оплата"}

                  </p>

                </div>

                {i !== 2 && (
                  <div
                    className={`w-10 h-[2px] mx-1 mb-6 ${step > s
                        ? "bg-green-500"
                        : "bg-[#D9D9D9]"
                      }`}
                  />
                )}

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-6 px-4 lg:px-10 pb-10 max-w-[1200px] mx-auto w-full">

        <div className="w-full max-w-[420px] lg:max-w-[600px] mx-auto">

          {/* ЗАКАЗ MOBILE */}
          <div className="lg:hidden bg-[#F5F5F5] rounded-2xl p-4 mb-4">

            <p className="text-sm text-gray-400 mb-2">
              Ваш заказ
            </p>

            <p className="text-xs text-gray-400">
              Выставка
            </p>

            <p className="font-medium text-sm leading-relaxed mb-4">
              {exhibition?.title}
            </p>

            <p className="text-xs text-gray-400">
              Дата и время
            </p>

            <p className="text-sm mb-4">
              {fullDate || "—"}
              {selectedTime && `, ${selectedTime}`}
            </p>

            <div className="flex justify-between text-sm mb-1">

              <span>
                Взрослых: {adult}
              </span>

              <span>
                {adult * 600} ₽
              </span>

            </div>

            {child > 0 && (
              <div className="flex justify-between text-sm mb-2">

                <span>
                  Детских: {child}
                </span>

                <span>
                  {child * 400} ₽
                </span>

              </div>
            )}

            <div className="border-t my-3"></div>

            <div className="flex justify-between items-center">

              <span className="text-sm">
                Итого:
              </span>

              <span className="text-[#8B2635] text-2xl font-semibold">
                {total} ₽
              </span>

            </div>

          </div>

          {/* ОСНОВНОЙ БЛОК */}
          <div className="bg-[#F5F5F5] rounded-2xl p-4 lg:p-6">

            {/* STEP 1 */}
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-2 mb-5">

                  <img
                    src={calendarIcon}
                    className="w-5 h-5"
                  />

                  <p className="font-medium text-sm lg:text-base">
                    Выберите дату посещения
                  </p>

                </div>

                {/* МЕСЯЦ */}
                <div className="flex justify-between items-center mb-5">

                  <span className="font-medium text-sm lg:text-base">
                    {months[monthIndex]} {year}
                  </span>

                  <div className="flex gap-4">

                    <button
                      onClick={() => changeMonth(-1)}
                    >
                      ‹
                    </button>

                    <button
                      onClick={() => changeMonth(1)}
                    >
                      ›
                    </button>

                  </div>

                </div>

                {/* MOBILE */}
                <div className="lg:hidden">

                  {/* КАЛЕНДАРЬ */}
                  <div className="grid grid-cols-7 gap-2 text-center mb-6">

                    {[
                      "Пн",
                      "Вт",
                      "Ср",
                      "Чт",
                      "Пт",
                      "Сб",
                      "Вс"
                    ].map(d => (
                      <div
                        key={d}
                        className="text-[10px] text-gray-400"
                      >
                        {d}
                      </div>
                    ))}

                    {Array.from({
                      length: firstDay
                    }).map((_, i) => (
                      <div key={i}></div>
                    ))}

                    {Array.from({
                      length: daysInMonth
                    }).map((_, i) => {

                      const day = i + 1;

                      return (
                        <button
                          key={day}
                          onClick={() =>
                            setSelectedDay(day)
                          }
                          className={`h-10 rounded-lg text-sm ${selectedDay === day
                              ? "bg-[#8B2635] text-white"
                              : "bg-white hover:bg-gray-200"
                            }`}
                        >
                          {day}
                        </button>
                      );
                    })}

                  </div>

                  {/* ВРЕМЯ MOBILE */}
                  {selectedDay && (
                    <>
                      <p className="mb-3 text-sm">
                        Выберите время
                      </p>

                      <div className="grid grid-cols-3 gap-2 mb-6">

                        {times.map(t => (
                          <button
                            key={t}
                            onClick={() =>
                              setSelectedTime(t)
                            }
                            className={`py-2 rounded-lg text-sm ${selectedTime === t
                                ? "bg-[#8B2635] text-white"
                                : "bg-gray-200"
                              }`}
                          >
                            {t}
                          </button>
                        ))}

                      </div>
                    </>
                  )}

                </div>

                {/* DESKTOP */}
                <div className="hidden lg:flex gap-6">

                  {/* КАЛЕНДАРЬ */}
                  <div className="grid grid-cols-7 gap-2 text-center flex-1">

                    {[
                      "Пн",
                      "Вт",
                      "Ср",
                      "Чт",
                      "Пт",
                      "Сб",
                      "Вс"
                    ].map(d => (
                      <div
                        key={d}
                        className="text-xs text-gray-400"
                      >
                        {d}
                      </div>
                    ))}

                    {Array.from({
                      length: firstDay
                    }).map((_, i) => (
                      <div key={i}></div>
                    ))}

                    {Array.from({
                      length: daysInMonth
                    }).map((_, i) => {

                      const day = i + 1;

                      return (
                        <button
                          key={day}
                          onClick={() =>
                            setSelectedDay(day)
                          }
                          className={`h-10 rounded-lg ${selectedDay === day
                              ? "bg-[#8B2635] text-white"
                              : "bg-white hover:bg-gray-200"
                            }`}
                        >
                          {day}
                        </button>
                      );
                    })}

                  </div>

                  {/* ВРЕМЯ DESKTOP */}
                  {selectedDay && (

                    <div className="w-[180px]">

                      <p className="mb-2 text-sm">
                        Выберите время
                      </p>

                      <div className="grid grid-cols-2 gap-2">

                        {times.map(t => (
                          <button
                            key={t}
                            onClick={() =>
                              setSelectedTime(t)
                            }
                            className={`py-2 rounded text-sm ${selectedTime === t
                                ? "bg-[#8B2635] text-white"
                                : "bg-gray-200"
                              }`}
                          >
                            {t}
                          </button>
                        ))}

                      </div>

                    </div>
                  )}

                </div>

                {/* КНОПКА */}
                <button
                  disabled={
                    !selectedDay ||
                    !selectedTime
                  }
                  onClick={() =>
                    setStep(2)
                  }
                  className="w-full lg:w-auto lg:px-6 bg-[#8B2635] text-white py-3 lg:py-2 rounded-xl disabled:opacity-50 mt-6"
                >
                  Далее →
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className="flex items-center gap-2 mb-2">

                  <img
                    src={ticketIcon}
                    className="w-5 h-5"
                  />

                  <p className="font-medium text-sm lg:text-base">
                    Выберите билеты
                  </p>

                </div>

                <p className="text-xs text-gray-400 mb-6">
                  Укажите количество билетов
                </p>

                {/* ВЗРОСЛЫЕ */}
                <div className="flex justify-between items-center mb-5">

                  <div>
                    <p>Взрослый</p>

                    <p className="text-xs text-gray-400">
                      600 ₽
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        setAdult(Math.max(0, adult - 1))
                      }
                      className="w-8 h-8 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{adult}</span>

                    <button
                      onClick={() =>
                        setAdult(adult + 1)
                      }
                      className="w-8 h-8 bg-gray-200 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* ДЕТСКИЕ */}
                <div className="flex justify-between items-center mb-6">

                  <div>
                    <p>Детский</p>

                    <p className="text-xs text-gray-400">
                      400 ₽
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        setChild(Math.max(0, child - 1))
                      }
                      className="w-8 h-8 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{child}</span>

                    <button
                      onClick={() =>
                        setChild(child + 1)
                      }
                      className="w-8 h-8 bg-gray-200 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full lg:w-auto lg:px-6 bg-[#8B2635] text-white py-3 lg:py-2 rounded-xl"
                >
                  Далее →
                </button>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div className="flex items-center gap-2 mb-4">

                  <img
                    src={formIcon}
                    className="w-5 h-5"
                  />

                  <p className="font-medium text-sm lg:text-base">
                    Контактные данные и оплата
                  </p>

                </div>

                <div className="flex flex-col gap-3 mb-6">

                  <input
                    placeholder="Email *"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="border p-3 rounded-xl text-sm"
                  />

                  <input
                    placeholder="Телефон *"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    className="border p-3 rounded-xl text-sm"
                  />

                  <input
                    placeholder="Имя *"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="border p-3 rounded-xl text-sm"
                  />

                </div>

                {/* ОПЛАТА */}
                <p className="mb-3 text-sm">
                  Способ оплаты
                </p>

                <div className="flex flex-col gap-3 mb-5">

                  <label className="flex items-center gap-2 text-sm">

                    <input
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() =>
                        setPaymentMethod("card")
                      }
                    />

                    Банковская карта

                  </label>

                  <label className="flex items-center gap-2 text-sm">

                    <input
                      type="radio"
                      checked={paymentMethod === "sbp"}
                      onChange={() =>
                        setPaymentMethod("sbp")
                      }
                    />

                    СБП

                  </label>

                </div>

                {/* КНОПКА */}
                <button
                  disabled={
                    !paymentMethod ||
                    !email ||
                    !phone ||
                    !name
                  }
                  onClick={() =>
                    setIsPaying(true)
                  }
                  className="w-full lg:w-auto lg:px-6 bg-[#8B2635] text-white py-3 lg:py-2 rounded-xl disabled:opacity-40"
                >
                  Оплатить
                </button>

                {/* КАРТА */}
                {isPaying && paymentMethod === "card" && (
                  <div className="mt-6 p-4 bg-white rounded-xl border">

                    <p className="mb-3 font-medium">
                      Данные карты
                    </p>

                    <input
                      placeholder="Номер карты"
                      className="w-full border p-3 mb-2 rounded-xl"
                    />

                    <input
                      placeholder="MM/YY"
                      className="w-full border p-3 mb-2 rounded-xl"
                    />

                    <input
                      placeholder="CVV"
                      className="w-full border p-3 mb-3 rounded-xl"
                    />

                    <button
                      onClick={finishPayment}
                      className="w-full bg-[#8B2635] text-white py-3 rounded-xl"
                    >
                      Подтвердить
                    </button>

                  </div>
                )}

                {/* СБП */}
                {isPaying && paymentMethod === "sbp" && (
                  <div className="mt-6 p-4 bg-white rounded-xl border text-center">

                    <p className="mb-3 font-medium">
                      Оплатите через СБП
                    </p>

                    <div className="flex justify-center mb-4">

                      <QRCodeCanvas
                        value="payment"
                        size={150}
                      />

                    </div>

                    <button
                      onClick={finishPayment}
                      className="w-full bg-[#8B2635] text-white py-3 rounded-xl"
                    >
                      Я оплатил
                    </button>

                  </div>
                )}
              </>
            )}

          </div>

        </div>

        {/* DESKTOP  */}
        <div className="hidden lg:block bg-[#F5F5F5] rounded-2xl p-6 w-[320px] h-fit sticky top-24">

          <p className="text-sm text-gray-400 mb-2">
            Ваш заказ
          </p>

          <p className="text-xs text-gray-400">
            Выставка
          </p>

          <p className="font-medium mb-4">
            {exhibition?.title}
          </p>

          <p className="text-xs text-gray-400">
            Дата и время
          </p>

          <p className="mb-4">
            {fullDate || "—"}
            {selectedTime && `, ${selectedTime}`}
          </p>

          <div className="flex justify-between text-sm mb-1">

            <span>
              Взрослых: {adult}
            </span>

            <span>
              {adult * 600} ₽
            </span>

          </div>

          {child > 0 && (
            <div className="flex justify-between text-sm mb-1">

              <span>
                Детских: {child}
              </span>

              <span>
                {child * 400} ₽
              </span>

            </div>
          )}

          <div className="border-t my-3"></div>

          <div className="flex justify-between">

            <span>
              Итого:
            </span>

            <span className="text-[#8B2635] text-xl font-semibold">
              {total} ₽
            </span>

          </div>

        </div>

      </div>

      <div className="bg-black text-white px-4 lg:px-12 py-10 mt-auto">

        <div className="max-w-[420px] lg:max-w-none mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">

          <div>

            <div className="flex items-center gap-2 mb-3">

              <img
                src={logo}
                className="w-10 h-10"
              />

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

    </div>
  );
}