import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";

// ИКОНКИ
import locationIcon from "../assets/images/location.png";
import timeIcon from "../assets/images/clock.png";

// КАРТИНКИ
import img1 from "../assets/images/ermitag.jpg";
import img2 from "../assets/images/tretyakov.jpg";
import img3 from "../assets/images/gmii2.jpg";
import img4 from "../assets/images/history.jpg";
import img5 from "../assets/images/vdnkh.jpg";
import img6 from "../assets/images/garage.jpg";

export default function MuseumsPage() {
    const navigate = useNavigate();

    // Текущая страница пагинации
    const [currentPage, setCurrentPage] = useState(1);

    // Массив музеев
    const museums = [
        {
            title: "Эрмитаж",
            desc: "Один из крупнейших и наиболее значительных художественных и культурно-исторических музеев мира.",
            place: "Дворцовая площадь, 2",
            time: "Вт–Вс 10:30–18:00, Ср до 21:00",
            img: img1,
        },
        {
            title: "Третьяковская галерея",
            desc: "Художественный музей, основной функцией которого является сохранение и популяризация русского искусства.",
            place: "Лаврушинский пер., 10",
            time: "Вт-Вс: 10:00-20:00, Пн: выходной",
            img: img2,
        },
        {
            title: "ГМИИ им. А.С. Пушкина",
            desc: "Музей изобразительных искусств имени Пушкина с уникальной коллекцией.",
            place: "ул. Волхонка, 12",
            time: "Вт-Вс: 11:00-21:00, Пн: выходной",
            img: img3,
        },
        {
            title: "Государственный исторический музей",
            desc: "Крупнейший национальный исторический музей России. Расположен на Красной площади в Москве.",
            place: "Красная площадь, 1",
            time: "Пн, Ср, Чт, Вс 10:00–22:00",
            img: img4,
        },
        {
            title: "Музей ВДНХ",
            desc: "Открытый после масштабной реставрации музей стал современным выставочным пространством.",
            place: "пр-т Мира, 119",
            time: "Вт-Вс 11:00–22:00",
            img: img5,
        },
        {
            title: "Музей современного искусства «Гараж»",
            desc: "Первый в России музей, полностью посвященный современному искусству.",
            place: "ул. Крымский Вал, 9",
            time: "Ежедневно 11:00–22:00",
            img: img6,
        },
    ];

    // Количество карточек на мобильной странице
    const itemsPerPage = 3;

    // Индексы текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Карточки текущей страницы
    const currentMuseums = museums.slice(startIndex, endIndex);

    // Количество страниц
    const totalPages = Math.ceil(museums.length / itemsPerPage);

    return (
        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

            {/* HEADER */}
            <Header />

            {/* КНОПКА НАЗАД */}
            <div className="px-4 lg:px-10 mt-4 max-w-[420px] lg:max-w-none mx-auto w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm hover:opacity-70 transition"
                >
                    ← Назад
                </button>
            </div>

            {/* ЗАГОЛОВОК */}
            <div className="text-center mt-5 mb-8 px-4 max-w-[420px] lg:max-w-none mx-auto w-full">

                <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
                    Музеи
                </h1>

                <p className="text-gray-500 text-sm lg:text-base">
                    Лучшие музеи с актуальными выставками и экспозициями
                </p>

            </div>

            {/* КОНТЕЙНЕР */}
            <div className="w-full max-w-[420px] lg:max-w-none mx-auto px-4 lg:px-12 pb-12 lg:pb-16">

                {/* МОБИЛЬНАЯ СЕТКА */}
                <div className="grid grid-cols-1 lg:hidden gap-5">

                    {currentMuseums.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
                        >

                            {/* ИЗОБРАЖЕНИЕ */}
                            <img
                                src={item.img}
                                className="h-52 w-full object-cover"
                            />

                            {/* КОНТЕНТ */}
                            <div className="p-4 flex flex-col flex-1">

                                <p className="font-medium text-sm mb-2">
                                    {item.title}
                                </p>

                                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                    {item.desc}
                                </p>

                                {/* АДРЕС */}
                                <div className="flex items-start gap-2 text-xs text-gray-500 mb-2">

                                    <img
                                        src={locationIcon}
                                        className="w-3 h-3 mt-[2px] opacity-70"
                                    />

                                    <span>{item.place}</span>

                                </div>

                                {/* ВРЕМЯ */}
                                <div className="flex items-start gap-2 text-xs text-gray-500 mb-5">

                                    <img
                                        src={timeIcon}
                                        className="w-3 h-3 mt-[2px] opacity-70"
                                    />

                                    <span>{item.time}</span>

                                </div>

                                {/* КНОПКА */}
                                <button
                                    onClick={() =>
                                        navigate("/museum", {
                                            state: item,
                                        })
                                    }
                                    className="mt-auto bg-[#8B2635] text-white py-2.5 rounded-xl text-sm hover:bg-[#6E1F2B] transition"
                                >
                                    Смотреть выставки
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

                {/* DESKTOP СЕТКА */}
                <div className="hidden lg:grid grid-cols-3 gap-8">

                    {museums.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
                        >

                            {/* ИЗОБРАЖЕНИЕ */}
                            <img
                                src={item.img}
                                className="h-44 w-full object-cover"
                            />

                            {/* КОНТЕНТ */}
                            <div className="p-4 flex flex-col flex-1">

                                <p className="font-medium mb-1">
                                    {item.title}
                                </p>

                                <p className="text-xs text-gray-500 mb-2">
                                    {item.desc}
                                </p>

                                {/* АДРЕС */}
                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">

                                    <img
                                        src={locationIcon}
                                        className="w-3 h-3 opacity-70"
                                    />

                                    {item.place}

                                </div>

                                {/* ВРЕМЯ */}
                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">

                                    <img
                                        src={timeIcon}
                                        className="w-3 h-3 opacity-70"
                                    />

                                    {item.time}

                                </div>

                                {/* КНОПКА */}
                                <button
                                    onClick={() =>
                                        navigate("/museum", {
                                            state: item,
                                        })
                                    }
                                    className="mt-auto bg-[#8B2635] text-white py-2 rounded-xl text-sm hover:bg-[#6E1F2B] transition"
                                >
                                    Смотреть выставки
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

                {/* PAGINATION */}
                <div className="flex lg:hidden items-center justify-center gap-3 mt-8">

                    {/* НАЗАД */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className={`text-xl ${
                            currentPage === 1
                                ? "text-gray-300"
                                : "text-[#8B2635]"
                        }`}
                    >
                        ‹
                    </button>

                    {/* СТРАНИЦЫ */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 rounded-md text-sm transition ${
                                currentPage === index + 1
                                    ? "bg-[#8B2635] text-white"
                                    : "border"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* ВПЕРЕД */}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className={`text-xl ${
                            currentPage === totalPages
                                ? "text-gray-300"
                                : "text-[#8B2635]"
                        }`}
                    >
                        ›
                    </button>

                </div>

            </div>

            {/* FOOTER */}
            <div className="bg-black text-white px-4 lg:px-12 py-10 mt-auto">

                <div className="max-w-[420px] lg:max-w-none mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">

                    {/* ЛОГО */}
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

                    {/* ПОМОЩЬ */}
                    <div>

                        <p className="font-semibold mb-3">
                            Помощь
                        </p>

                        <div className="text-gray-400 text-sm flex flex-col gap-2">

                            <Link
                                to="/faq"
                                className="hover:text-white transition"
                            >
                                Часто задаваемые вопросы
                            </Link>

                            <Link
                                to="/refund"
                                className="hover:text-white transition"
                            >
                                Условия возврата
                            </Link>

                            <Link
                                to="/rules"
                                className="hover:text-white transition"
                            >
                                Правила посещения
                            </Link>

                        </div>

                    </div>

                    {/* КОНТАКТЫ */}
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