import { useNavigate, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";
import heroBg from "../assets/images/fon3.png";

// КАРТИНКИ
import img1 from "../assets/images/hermitage1.jpg";
import img2 from "../assets/images/hermitage2.jpg";
import img3 from "../assets/images/hermitage3.jpg";
import img4 from "../assets/images/hermitage4.jpg";
import img5 from "../assets/images/hermitage5.jpg";

export default function HermitagePage() {

    const navigate = useNavigate();

    // ТОЧКИ МАРШРУТА
    const places = [

        {
            title: "Иорданская лестница",
            desc: "Главная лестница Зимнего дворца встречала императоров, послов и гостей еще в XIX веке. Белоснежный мрамор, позолота, зеркала и огромный плафон на потолке создают ощущение торжественного подъема в другую эпоху.",
            place: "Эрмитаж",
            price: "700 ₽",
            img: img1,
        },

        {
            title: "Часы 'Павлин'",
            desc: "Уникальный автомат XVIII века, который до сих пор работает без изменений. Огромный механический павлин, петух и сова в стеклянном вольере оживают раз в неделю.",
            place: "Эрмитаж",
            price: "500 ₽",
            img: img2,
        },

        {
            title: "Две Мадонны Леонардо да Винчи",
            desc: "В Эрмитаже хранятся две из немногих сохранившихся в мире картин великого Леонардо. «Мадонна Бенуа» и «Мадонна Литта» написаны более 500 лет назад, но до сих пор поражают мягкостью образов и той самой загадочной улыбкой.",
            place: "Эрмитаж",
            price: "700 ₽",
            img: img3,
        },

        {
            title: "Рыцарский зал",
            desc: "Самый любимый зал у детей и взрослых, которые в душе остаются рыцарями. Десятки конных доспехов, латы для турниров и настоящих битв, мечи, шпаги и арбалеты.",
            place: "Эрмитаж",
            price: "500 ₽",
            img: img4,
        },

        {
            title: "Зимний дворец Петра I",
            desc: "Мало кто знает, но под современным Эрмитажем скрываются настоящие покои первого императора. Это не реконструкция, а подлинные комнаты, где жил и работал Петр Великий.",
            place: "Эрмитаж",
            price: "600 ₽",
            img: img5,
        },
    ];

    return (

        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

            <Header />

            {/* ФИЛЬТРЫ ТОЛЬКО ДЛЯ ПК */}
            <div className="hidden lg:flex justify-center gap-20 py-6">

                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 rounded-xl text-gray-500 hover:bg-[#8B2635] hover:text-white transition"
                >
                    Главная
                </button>

                <button
                    onClick={() => navigate("/museums")}
                    className="px-6 py-2 rounded-xl text-gray-500 hover:bg-[#8B2635] hover:text-white transition"
                >
                    Музеи
                </button>

                <button
                    onClick={() => navigate("/exhibitions")}
                    className="px-6 py-2 rounded-xl text-gray-500 hover:bg-[#8B2635] hover:text-white transition"
                >
                    Выставки
                </button>

            </div>

            {/* HERO */}
            <div className="px-4 lg:px-10 mt-4 lg:mt-0">

                <div
                    className="rounded-2xl px-4 lg:px-10 py-6 lg:py-8 min-h-[420px] lg:min-h-[250px] bg-top lg:bg-center relative overflow-hidden"
                    style={{
                        backgroundImage: `url(${heroBg})`,
                        backgroundSize:
                            window.innerWidth < 1024
                                ? "160%"
                                : "cover",
                    }}
                >

                    {/* ЗАТЕМНЕНИЕ */}
                    <div className="absolute inset-0 bg-black/35"></div>

                    {/* КОНТЕНТ */}
                    <div className="relative z-10">

                        {/* НАЗАД */}
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-6 text-sm text-white bg-black/30 px-3 py-1 rounded-xl backdrop-blur-sm"
                        >
                            ← Назад
                        </button>

                        {/* TITLE */}
                        <h1 className="text-2xl lg:text-3xl text-white font-semibold mb-4 max-w-[900px] leading-tight">

                            Эрмитаж за один день: 5 точек на карте, которые вы запомните

                        </h1>

                        {/* DESCRIPTION */}
                        <div className="bg-[#525252]/35 backdrop-blur-sm px-4 py-4 lg:py-3 w-full lg:w-[900px] text-sm text-white leading-relaxed rounded-2xl">

                            Первый поход в Эрмитаж легко превращается в растерянность: слишком много залов, слишком много искусства. Мы собрали маршрут по самым впечатляющим точкам.

                        </div>

                    </div>

                </div>

            </div>

            {/* КАРТОЧКИ */}
            <div className="px-4 lg:px-12 py-8 lg:py-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-start">

                    {places.map((item, i) => (

                        <div
                            key={i}
                            className="bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col h-fit"
                        >

                            {/* IMAGE */}
                            <img
                                src={item.img}
                                className="h-56 lg:h-48 w-full object-cover object-center"
                            />

                            {/* CONTENT */}
                            <div className="p-5 flex flex-col flex-1">

                                {/* TITLE */}
                                <p className="text-sm font-medium mb-2 leading-relaxed min-h-[44px]">

                                    {item.title}

                                </p>

                                {/* PLACE */}
                                <div className="flex items-center gap-1 text-xs text-gray-700 mb-3">

                                    <MapPin size={14} />

                                    Эрмитаж

                                </div>

                                {/* DESCRIPTION */}
                                <p className="text-xs text-gray-700 mb-5 leading-relaxed lg:line-clamp-3">

                                    {item.desc}

                                </p>

                                {/* НИЖНЯЯ ЧАСТЬ */}
                                <div className="flex items-end justify-between gap-3 mt-auto">

                                    {/* ЦЕНА */}
                                    <div>

                                        <p className="text-xs text-gray-400">
                                            от
                                        </p>

                                        <p className="text-xl font-semibold whitespace-nowrap leading-none">

                                            {item.price}

                                        </p>

                                    </div>

                                    {/* КНОПКА */}
                                    <button
                                        onClick={() =>
                                            navigate("/booking", {
                                                state: item
                                            })
                                        }
                                        className="bg-[#8B2635] text-white px-5 py-2 rounded-xl text-sm min-w-[110px]"
                                    >
                                        Купить
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            {/* FOOTER */}
            <div className="bg-black text-white px-4 lg:px-12 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">

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

                    {/* КОНТАКТЫ */}
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

                {/* ЛИНИЯ */}
                <div className="h-[1px] bg-gray-800 mb-4" />

                {/* COPYRIGHT */}
                <p className="text-center text-gray-500 text-sm">
                    © 2026 ArtTicket
                </p>

            </div>

        </div>
    );
}