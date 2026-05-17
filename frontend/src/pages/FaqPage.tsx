import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";
import arrowIcon from "../assets/images/down-arrow.png";

export default function FaqPage() {

  const navigate = useNavigate();

  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  // ОТКРЫТИЕ FAQ
  const toggle = (index: number) => {

    setOpenIndex(
      openIndex === index
        ? null
        : index
    );

  };

  // FAQ
  const sections = [

    {
      title: "Покупка билетов",

      items: [
        {
          q: "Как купить билет на выставку?",

          a: "Выберите интересующую вас выставку или музей на главной странице, нажмите кнопку «Купить билет», заполните форму с указанием даты посещения и количества билетов, выберите удобный способ оплаты и завершите покупку. После оплаты билет с QR-кодом будет доступен в вашем личном кабинете.",
        },

        {
          q: "Какие способы оплаты доступны?",

          a: "Вы можете оплатить билет банковской картой или через СБП.",
        },

        {
          q: "Можно ли купить билет на группу?",

          a: "Да, вы можете выбрать несколько билетов при оформлении заказа.",
        },
      ],
    },

    {
      title: "Личный кабинет и поддержка",

      items: [
        {
          q: "Что делать, если не получается войти в личный кабинет?",

          a: "Проверьте правильность введённых данных. Если проблема сохраняется — воспользуйтесь восстановлением пароля или обратитесь в поддержку.",
        },

        {
          q: "Как узнать о новых выставках?",

          a: "Следите за обновлениями на главной странице и в разделе выставок.",
        },

        {
          q: "Как связаться со службой поддержки?",

          a: "Напишите нам на support@artticket.ru или воспользуйтесь страницей поддержки.",
        },
      ],
    },

    {
      title: "Посещение",

      items: [
        {
          q: "Что делать, если опоздал на сеанс?",

          a: "Возможность входа зависит от правил музея. Рекомендуем приходить заранее.",
        },

        {
          q: "Можно ли фотографировать в музее?",

          a: "Зависит от конкретной выставки. Обычно разрешено без вспышки.",
        },

        {
          q: "Есть ли гардероб в музеях?",

          a: "Да, в большинстве музеев есть гардероб.",
        },
      ],
    },
  ];

  let globalIndex = 0;

  return (

    <div className="bg-white min-h-screen flex flex-col">

      <Header />

      <div className="px-4 lg:px-12 mt-4">

        <button
          onClick={() => navigate("/")}
          className="text-sm"
        >
          ← На главную
        </button>

      </div>

      <div className="px-4 lg:px-12 mt-6 mb-8">

        <h1 className="text-xl lg:text-2xl font-semibold mb-2">

          Часто задаваемые вопросы

        </h1>

        <p className="text-gray-500 text-sm leading-6">

          Ответы на самые популярные вопросы
          о сервисе ArtTicket

        </p>

      </div>

      <div className="px-4 lg:px-12 flex justify-center">

        <div className="flex flex-col gap-6 w-full max-w-[700px]">

          {sections.map((section, si) => (

            <div
              key={si}
              className="bg-[#F5F5F5] rounded-2xl overflow-hidden border border-[#E5E5E5]"
            >

              {/* TITLE */}
              <div className="text-center py-4 font-medium text-sm lg:text-base">

                {section.title}

              </div>

              {section.items.map((item, i) => {

                const currentIndex =
                  globalIndex++;

                return (

                  <div
                    key={i}
                    className="border-t border-[#D4D4D4]"
                  >

                    {/* QUESTION */}
                    <button
                      onClick={() =>
                        toggle(currentIndex)
                      }
                      className="w-full flex justify-between items-center gap-4 px-4 py-4 text-left text-sm bg-[#F5F5F5] hover:bg-[#ECECEC] transition"
                    >

                      <span className="leading-6">

                        {item.q}

                      </span>

                      <img
                        src={arrowIcon}
                        className={`w-4 h-4 transition flex-shrink-0 ${
                          openIndex === currentIndex
                            ? "rotate-180"
                            : ""
                        }`}
                      />

                    </button>

                    {openIndex === currentIndex && (

                      <div className="px-4 pb-5 text-sm text-gray-600 leading-6 bg-[#F5F5F5]">

                        {item.a}

                      </div>

                    )}

                  </div>
                );
              })}

            </div>
          ))}

        </div>

      </div>

      <div className="bg-black text-white px-4 lg:px-12 py-10 mt-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">

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

              Покупайте билеты в лучшие музеи
              и выставки онлайн

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

    </div>
  );
}