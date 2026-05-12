import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";

// ИКОНКИ
import checkIcon from "../assets/images/check.png";
import warningIcon from "../assets/images/clock (1).png";
import closeIcon from "../assets/images/circle.png";

export default function RefundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col">

      <Header />

      {/* НАЗАД */}
      <div className="px-12 mt-4">
        <button onClick={() => navigate(-1)} className="text-sm">
          ← На главную
        </button>
      </div>

      {/* TITLE */}
      <div className="px-12 mt-6 mb-6">
        <h1 className="text-2xl font-semibold mb-1">
          Условия возврата билетов
        </h1>
        <p className="text-gray-500 text-sm">
          На ArtTicket мы стремимся обеспечить максимальное удобство для наших посетителей.
          Ознакомьтесь с правилами возврата билетов.
        </p>
      </div>

      {/* КОНТЕНТ ПО ЦЕНТРУ */}
      <div className="px-12 flex justify-center">
        <div className="flex flex-col gap-6 w-full max-w-[700px]">

          {/* ОСНОВНЫЕ ПРАВИЛА */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6">

            <h2 className="text-center font-medium mb-6">
              Основные правила возврата
            </h2>

            <div className="flex flex-col gap-5">

              {/* ПОЛНЫЙ */}
              <div className="flex items-start gap-3">
                <img src={checkIcon} className="w-5 h-5 mt-[2px]" />

                <div>
                  <p className="font-medium">Полный возврат</p>
                  <p className="text-gray-600 text-sm">
                    Возврат билета возможен не позднее чем за 24 часа до даты и времени посещения.
                    Возврат производится в полном объеме стоимости билета на тот же счет,
                    с которого была произведена оплата.
                  </p>
                </div>
              </div>

              {/* ЧАСТИЧНЫЙ */}
              <div className="flex items-start gap-3">
                <img src={warningIcon} className="w-5 h-5 mt-[2px]" />

                <div>
                  <p className="font-medium">Частичный возврат</p>
                  <p className="text-gray-600 text-sm">
                    При возврате билета менее чем за 24 часа, но не позднее 3 часов до начала сеанса,
                    возврат составляет 50% от стоимости билета. Комиссия сервиса не возвращается.
                  </p>
                </div>
              </div>

              {/* НЕЛЬЗЯ */}
              <div className="flex items-start gap-3">
                <img src={closeIcon} className="w-7 h-7 flex-shrink-0" />

                <div>
                  <p className="font-medium">Возврат невозможен</p>
                  <p className="text-gray-600 text-sm">
                    Возврат билета менее чем за 3 часа до начала сеанса или после начала мероприятия невозможен.
                    Исключения составляют случаи отмены мероприятия со стороны организатора.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ОСОБЫЕ СЛУЧАИ */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6">

            <h2 className="text-center font-medium mb-6">
              Особые случаи
            </h2>

            <div className="flex flex-col gap-5">

              {/* ОТМЕНА */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-[2px]" />

                <div>
                  <p className="font-medium">Отмена мероприятия</p>
                  <p className="text-gray-600 text-sm">
                    Если музей или выставка отменяет мероприятие, вам будет предложен полный возврат средств
                    или перенос билета на другую дату. Уведомление придет на email, указанный при покупке.
                  </p>
                </div>
              </div>

              {/* ТЕХ ПРОБЛЕМЫ */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-[2px]" />

                <div>
                  <p className="font-medium">Технические проблемы</p>
                  <p className="text-gray-600 text-sm">
                    Если вы не смогли попасть на мероприятие из-за технических проблем с нашей стороны
                    (например, QR-код не сработал), обратитесь в службу поддержки.
                    Мы рассмотрим вашу ситуацию индивидуально.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-black text-white px-12 py-10 mt-16">
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

    </div>
  );
}