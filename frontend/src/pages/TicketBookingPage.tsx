import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { QRCodeCanvas } from "qrcode.react";

import calendarIcon from "../assets/images/calendar.png";
import ticketIcon from "../assets/images/verified.png";
import formIcon from "../assets/images/market.png";

export default function TicketBookingPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const savedExhibition = JSON.parse(
    localStorage.getItem("currentExhibition") || "null"
  );

  const exhibition: any = location.state || savedExhibition || {
    title: "Не выбрано",
    place: "Не выбрано",
  };

  const [step, setStep] = useState(1);

  const [monthIndex, setMonthIndex] = useState(4);

  const [selectedDay, setSelectedDay] =
    useState<number | null>(null);

  const [selectedTime, setSelectedTime] =
    useState("");

  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  // 🔥 ОПЛАТА
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

  const daysInMonth = new Date(
    year,
    monthIndex + 1,
    0
  ).getDate();

  const firstDay =
    (new Date(year, monthIndex, 1).getDay() + 6) % 7;

  const total =
    adult * 600 + child * 400;

  const changeMonth = (dir: number) => {

    setMonthIndex(prev =>
      (prev + dir + 12) % 12
    );

    setSelectedDay(null);

    setSelectedTime("");
  };

  const fullDate = selectedDay
    ? `${selectedDay} ${months[monthIndex]} ${year}`
    : "";

  // 🔥 FINISH PAYMENT
  const finishPayment = async () => {

    console.log("BUY CLICK");

    // 🔹 USER
    const user = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    // 🔹 TOKEN
    const token =
      localStorage.getItem("token");

    console.log("TOKEN:", token);

    // 🔹 ПРОВЕРКА АВТОРИЗАЦИИ
    if (!token) {

      alert("Необходимо войти в аккаунт");

      return;
    }

    // 🔹 TICKET
    const ticket: any = {

      // пользователь
      userEmail: user?.email || "",

      name:
        (user?.firstName || "") +
        " " +
        (user?.lastName || ""),

      // ДЛЯ ПРОФИЛЯ
      title:
        exhibition?.title || "Без названия",

      place:
        exhibition?.place || "Не указан",

      total: total,

      // ДЛЯ АДМИНКИ
      exhibition:
        exhibition?.title || "Без названия",

      museum:
        exhibition?.place || "Не указан",

      // БИЛЕТЫ
      count: adult + child,

      status: "Оплачен",

      // дата
      date: fullDate,

      time: selectedTime,

      // цена
      price: total,
    };

    console.log(ticket);

    try {

      const response = await fetch(
        "http://localhost:8082/tickets",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            // 🔥 JWT
            "Authorization": `Bearer ${token}`,
          },

          body: JSON.stringify(ticket),
        }
      );

      const data = await response.json();

console.log(data);

// 🔥 ID ИЗ BACKEND
ticket.id = data.id;

console.log("NEW TICKET:", ticket);

console.log("TICKET RESPONSE:", data);

console.log("STATUS:", response.status);

if (!response.ok) {

  alert(
    data.error ||
    "Ошибка покупки билета"
  );

  return;
}

      // 🔥 ВРЕМЕННО
      // пока profile читает localStorage
      const oldTickets = JSON.parse(
        localStorage.getItem("tickets") || "[]"
      );

      localStorage.setItem(
        "tickets",
        JSON.stringify([...oldTickets, ticket])
      );

      // 🔥 QR
      localStorage.setItem(
        "justBought",
        "true"
      );

      // 🔹 PROFILE
      localStorage.setItem(
  "lastTicketId",
  String(ticket.id)
);

localStorage.setItem(
  "justBought",
  "true"
);

navigate("/profile");

    } catch (err) {

      console.error(
        "FETCH ERROR:",
        err
      );

      alert(String(err));

    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

      <Header />

      <div className="px-10 mt-4">

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

      <div className="flex justify-center mt-6 mb-10 gap-10">

        {[1, 2, 3].map((s, i) => (

          <div key={s} className="flex items-center">

            <div className="flex flex-col items-center">

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                ${
                  step === s
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
                className={`w-16 h-[2px] mx-4 ${
                  step > s
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            )}

          </div>
        ))}

      </div>

      <div className="flex justify-center gap-10 px-10">

        <div className="bg-[#F5F5F5] rounded-2xl p-6 w-[600px]">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={calendarIcon}
                  className="w-5 h-5"
                />

                <p className="font-medium">
                  Выберите дату посещения
                </p>
              </div>

              <div className="flex justify-between mb-4">

                <span>
                  {months[monthIndex]} {year}
                </span>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      changeMonth(-1)
                    }
                  >
                    ‹
                  </button>

                  <button
                    onClick={() =>
                      changeMonth(1)
                    }
                  >
                    ›
                  </button>

                </div>

              </div>

              <div className="flex gap-6">

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
                        className={`h-10 rounded-lg ${
                          selectedDay === day
                            ? "bg-[#8B2635] text-white"
                            : "bg-white hover:bg-gray-200"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}

                </div>

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
                          className={`py-2 rounded ${
                            selectedTime === t
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

              <div className="flex justify-end mt-6">

                <button
                  disabled={
                    !selectedDay ||
                    !selectedTime
                  }
                  onClick={() =>
                    setStep(2)
                  }
                  className="bg-[#8B2635] text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  Далее →
                </button>

              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <img src={ticketIcon} className="w-5 h-5" />
                <p className="font-medium">Выберите билеты</p>
              </div>

              <p className="text-xs text-gray-400 mb-6">
                Укажите количество билетов
              </p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p>Взрослый</p>
                  <p className="text-xs text-gray-400">600 ₽</p>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => setAdult(Math.max(0, adult - 1))} className="w-8 h-8 bg-gray-200 rounded">-</button>
                  <span>{adult}</span>
                  <button onClick={() => setAdult(adult + 1)} className="w-8 h-8 bg-gray-200 rounded">+</button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <p>Детский</p>
                  <p className="text-xs text-gray-400">400 ₽</p>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => setChild(Math.max(0, child - 1))} className="w-8 h-8 bg-gray-200 rounded">-</button>
                  <span>{child}</span>
                  <button onClick={() => setChild(child + 1)} className="w-8 h-8 bg-gray-200 rounded">+</button>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={() => setStep(3)} className="bg-[#8B2635] text-white px-6 py-2 rounded-lg">
                  Далее →
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <img src={formIcon} className="w-5 h-5" />
                <p className="font-medium">Контактные данные и оплата</p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <input placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />
                <input placeholder="Телефон *" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 rounded" />
                <input placeholder="Имя *" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
              </div>

              <p className="mb-2">Способ оплаты</p>

              <div className="flex flex-col gap-2 mb-4">
                <label>
                  <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  Банковская карта
                </label>

                <label>
                  <input type="radio" checked={paymentMethod === "sbp"} onChange={() => setPaymentMethod("sbp")} />
                  СБП
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  disabled={!paymentMethod || !email || !phone || !name}
                  onClick={() => setIsPaying(true)}
                  className="bg-[#8B2635] text-white px-6 py-2 rounded-xl disabled:opacity-40"
                >
                  Оплатить
                </button>
              </div>

              {/* КАРТА */}
              {isPaying && paymentMethod === "card" && (
                <div className="mt-6 p-4 bg-white rounded-xl border">
                  <p className="mb-3 font-medium">Данные карты</p>
                  <input placeholder="Номер карты" className="w-full border p-2 mb-2 rounded" />
                  <input placeholder="MM/YY" className="w-full border p-2 mb-2 rounded" />
                  <input placeholder="CVV" className="w-full border p-2 mb-3 rounded" />

                  <button onClick={finishPayment} className="w-full bg-[#8B2635] text-white py-2 rounded">
                    Подтвердить
                  </button>
                </div>
              )}

              {/* СБП */}
              {isPaying && paymentMethod === "sbp" && (
                <div className="mt-6 p-4 bg-white rounded-xl border text-center">
                  <p className="mb-3 font-medium">Оплатите через СБП</p>

                  <div className="flex justify-center mb-3">
                    <QRCodeCanvas value="payment" size={150} />
                  </div>

                  <button onClick={finishPayment} className="bg-[#8B2635] text-white px-4 py-2 rounded">
                    Я оплатил
                  </button>
                </div>
              )}
            </>
          )}

        </div>

        <div className="bg-[#F5F5F5] rounded-2xl p-6 w-[320px]">

          <p className="text-sm text-gray-400 mb-2">Ваш заказ</p>

          <p className="text-xs text-gray-400">Выставка</p>

          <p className="font-medium mb-4">
            {exhibition?.title}
          </p>

          <p className="text-xs text-gray-400">
            Дата и время
          </p>

          <p className="mb-4">
            {fullDate}, {selectedTime}
          </p>

          <p className="text-xs text-gray-400 mb-2">
            Билеты
          </p>

          <div className="flex justify-between text-sm">
            <span>Взрослых: {adult}</span>
            <span>{adult * 600} ₽</span>
          </div>

          {child > 0 && (
            <div className="flex justify-between text-sm">
              <span>Детских: {child}</span>
              <span>{child * 400} ₽</span>
            </div>
          )}

          <div className="border-t my-3"></div>

          <div className="flex justify-between">
            <span>Итого:</span>

            <span className="text-[#8B2635] text-xl font-semibold">
              {total} ₽
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}