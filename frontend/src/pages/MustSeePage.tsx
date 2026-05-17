import { useNavigate, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";
import heroBg from "../assets/images/fon.jpg";

import img1 from "../assets/images/tree.jpg";
import img2 from "../assets/images/golland.jpg";
import img3 from "../assets/images/van.jpg";
import img4 from "../assets/images/skulp.jpg";
import img5 from "../assets/images/gmii.jpg";

export default function MustSeePage() {

    const navigate = useNavigate();

    const exhibitions = [
        {
            title: "Современное искусство XXI века",
            place: "Третьяковская галерея",
            desc: "Уникальная коллекция современного искусства от ведущих мировых художников",
            price: "800 ₽",
            img: img1,
        },
        {
            title: "Золотой век голландской живописи",
            place: "ГМИИ им. А.С. Пушкина",
            desc: "Шедевры Рембрандта, Вермеера и Халса - жемчужины мирового искусства",
            price: "1200 ₽",
            img: img2,
        },
        {
            title: "Ван Гог: Путешествие в желтое",
            place: "Эрмитаж",
            desc: "Погружение в мир яркой живописи великого постимпрессиониста",
            price: "600 ₽",
            img: img3,
        },
        {
            title: "Античные скульптуры",
            place: "Эрмитаж",
            desc: "Подлинные шедевры древнего мира из Греции и Рима",
            price: "500 ₽",
            img: img4,
        },
        {
            title: "Экскурсия в ГМИИ",
            place: "ГМИИ им. А.С. Пушкина",
            desc: "Обзорная экскурсия по картинной галерее Главного здания посвящена шедеврам живописи в собрании ГМИИ им. А.С. Пушкина",
            price: "700 ₽",
            img: img5,
        },
    ];

    return (

        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

            <Header />

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

            <div className="px-4 lg:px-10 mt-4 lg:mt-0">

                <div
                    className="rounded-2xl overflow-hidden relative min-h-[420px] lg:min-h-[300px] bg-cover lg:bg-center bg-top"
                    style={{ backgroundImage: `url(${heroBg})` }}
                >

                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="relative z-10 px-5 lg:px-10 py-5 lg:py-8 text-white">

                        <button
                            onClick={() => navigate(-1)}
                            className="mb-6 text-sm bg-black/30 px-4 py-2 rounded-xl backdrop-blur-sm"
                        >
                            ← Назад
                        </button>

                        <h1 className="text-3xl lg:text-3xl font-semibold mb-5 max-w-[850px] leading-tight">

                            MUST SEE: 5 выставок, которые нельзя пропустить этим летом

                        </h1>

                        <div className="bg-[#525252]/40 backdrop-blur-sm px-5 py-5 rounded-2xl text-sm leading-8 lg:leading-7 max-w-[900px]">

                            Самые значимые и резонансные выставки сезона.
                            Эти экспозиции уже стали событиями культурной жизни города
                            и получили восторженные отзывы критиков и посетителей.

                        </div>

                    </div>

                </div>

            </div>

            <div className="px-4 lg:px-12 py-8 lg:py-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                    {exhibitions.map((item, i) => (

                        <div
                            key={i}
                            className="bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col h-full"
                        >

                            <img
                                src={item.img}
                                className="h-56 lg:h-48 w-full object-cover object-center"
                            />

                            <div className="p-5 flex flex-col flex-1">

                                <p className="text-base lg:text-sm font-medium mb-3 leading-relaxed min-h-[48px]">

                                    {item.title}

                                </p>

                                <div className="flex items-center gap-1 text-xs text-gray-700 mb-4">

                                    <MapPin size={14} />

                                    <span className="leading-none">
                                        {item.place}
                                    </span>

                                </div>

                                <p className="text-sm lg:text-xs text-gray-700 leading-7 lg:leading-6 flex-1">

                                    {item.desc}

                                </p>

                                <div className="flex items-center justify-between gap-4 mt-6">

                                    <div className="flex flex-col shrink-0">

                                        <span className="text-xs text-gray-400">
                                            от
                                        </span>

                                        <span className="text-2xl lg:text-xl font-semibold leading-none whitespace-nowrap">

                                            {item.price}

                                        </span>

                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate("/booking", {
                                                state: item
                                            })
                                        }
                                        className="bg-[#8B2635] text-white h-[44px] px-6 rounded-xl text-sm min-w-[112px] flex items-center justify-center"
                                    >

                                        Купить

                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <div className="bg-black text-white px-4 lg:px-12 py-10 mt-auto">

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

        </div>
    );
}