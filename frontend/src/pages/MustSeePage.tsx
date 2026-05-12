import { useNavigate, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";
import heroBg from "../assets/images/fon.jpg";

// КАРТИНКИ
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

            {/* HEADER */}
            <Header />

            {/* FILTER */}
            <div className="flex justify-center gap-20 py-6">

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
            <div className="px-10">
                <div
                    className="rounded-2xl px-10 py-8 min-h-[300px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                >

                    <button onClick={() => navigate(-1)} className="mb-6 text-sm">
                        ← Назад
                    </button>

                    <h1 className="text-3xl font-semibold mb-4 max-w-[800px]">
                        MUST SEE: 5 выставок, которые нельзя пропустить этим летом
                    </h1>

                    <div className="bg-[#525252]/35 px-4 py-3 w-[900px] text-sm">
                        Самые значимые и резонансные выставки сезона. Эти экспозиции уже стали событиями культурной жизни города и получили восторженные отзывы критиков и посетителей.
                    </div>

                </div>
            </div>

            {/* GRID */}
            <div className="px-12 py-10">
                <div className="grid grid-cols-3 gap-8">

                    {exhibitions.map((item, i) => (
                        <div key={i} className="bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col">

                            <img src={item.img} className="h-48 w-full object-cover" />

                            <div className="p-5 flex flex-col flex-1">

                                <p className="text-sm font-medium mb-2">{item.title}</p>

                                <div className="flex items-center gap-1 text-xs text-gray-700 mb-2">
                                    <MapPin size={14} />
                                    {item.place}
                                </div>

                                <p className="text-xs text-gray-700 mb-4 line-clamp-2">
                                    {item.desc}
                                </p>

                                <div className="flex justify-between items-end mt-auto">

                                    <div>
                                        <p className="text-xs text-gray-400">от</p>
                                        <p className="text-xl font-semibold">{item.price}</p>
                                    </div>

                                    <button
                                        onClick={() => navigate("/booking", { state: item })}
                                        className="bg-[#8B2635] text-white px-4 py-2 rounded-xl text-sm"
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

        </div>
    );
}