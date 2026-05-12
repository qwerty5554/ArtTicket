import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";

export default function RulesPage() {
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
          Правила посещения
        </h1>
        <p className="text-gray-500 text-sm max-w-[700px]">
          Для комфортного посещения музеев и выставок, пожалуйста, ознакомьтесь с общими правилами.
          Обратите внимание, что в отдельных музеях могут действовать дополнительные требования.
        </p>
      </div>

      {/* ЦЕНТР */}
      <div className="px-12 flex justify-center">
        <div className="flex flex-col gap-6 w-full max-w-[800px]">

          {/* ОБЩИЕ ПРАВИЛА */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6">

            <h2 className="text-center font-medium mb-6">
              Общие правила
            </h2>

            <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">

              <div>
                <p className="font-medium mb-1 text-black">Время посещения</p>
                <p>
                  Приходите за 10–15 минут до начала сеанса.
                  Вход может быть ограничен при опоздании.
                </p>
              </div>

              <div>
                <p className="font-medium mb-1 text-black">Документы</p>
                <p>
                  Иметь при себе билет (QR-код).
                  Для льготных категорий — подтверждающие документы.
                </p>
              </div>

              <div>
                <p className="font-medium mb-1 text-black">Фото и видео</p>
                <p>
                  Фото разрешено без вспышки, если иное не указано музеем.
                </p>
              </div>

              <div>
                <p className="font-medium mb-1 text-black">Тишина</p>
                <p>
                  Соблюдайте тишину в залах.
                  Переводите телефон в беззвучный режим.
                </p>
              </div>

              <div>
                <p className="font-medium mb-1 text-black">Гардероб</p>
                <p>
                  Верхнюю одежду, сумки и зонты рекомендуется сдавать в гардероб.
                </p>
              </div>

              <div>
                <p className="font-medium mb-1 text-black">Групповое посещение</p>
                <p>
                  Группы должны сопровождаться гидом и соблюдать установленный маршрут.
                </p>
              </div>

            </div>
          </div>

          {/* ЧТО РАЗРЕШЕНО */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6">

            <h2 className="font-medium mb-3">
              Что разрешено
            </h2>

            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Фотографировать без вспышки (если разрешено музеем)</li>
              <li>Использовать аудиогид</li>
              <li>Посещать выставки с детьми</li>
              <li>Приносить небольшие личные вещи</li>
              <li>Покупать билеты онлайн и предъявлять QR-код</li>
            </ul>

          </div>

          {/* ЧТО ЗАПРЕЩЕНО */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6">

            <h2 className="font-medium mb-3">
              Что запрещено
            </h2>

            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Трогать экспонаты, если это не предусмотрено экспозицией</li>
              <li>Использовать вспышку при фотосъёмке</li>
              <li>Проносить еду и напитки</li>
              <li>Громко разговаривать и мешать другим посетителям</li>
              <li>Бегать по залам</li>
              <li>Находиться в состоянии алкогольного опьянения</li>
            </ul>

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