import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";
import heroBg from "../assets/images/fon2.png";

// КАРТИНКИ
import img1 from "../assets/images/ermitag.jpg";
import img2 from "../assets/images/tretyakov.jpg";
import img3 from "../assets/images/gmii2.jpg";

export default function TopMuseumsPage() {
    const navigate = useNavigate();

    const museums = [
        {
            title: "Эрмитаж",
            desc: "Главный музей страны, расположенный в великолепном Зимнем дворце. 3 миллиона экспонатов — от каменных орудий до шедевров Рембрандта. Чтобы обойти все залы, понадобится несколько лет, но у вас есть целый день, чтобы увидеть главное: часы «Павлин», Малахитовую гостиную и творения Да Винчи.",
            img: img1,
        },
        {
            title: "Третьяковская галерея",
            desc: "Главная сокровищница русского искусства. Именно здесь хранятся легендарная «Троица» Андрея Рублева и самый узнаваемый медведь в мире с картины «Утро в сосновом лесу». Пройдите через залы Васнецова, Репина и Врубеля, чтобы понять душу русской живописи.",
            img: img2,
        },
        {
            title: "ГМИИ им. А.С. Пушкина",
            desc: "Хотите увидеть подлинники Ван Гога, Моне и Ренуара, не вылетая в Париж? Вам сюда. Пушкинский музей славится потрясающей коллекцией импрессионистов, а также загадочными египетскими мумиями и слепками античных статуй. Идеальное место для свидания с искусством.",
            img: img3,
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
                    className="rounded-2xl px-10 py-8 min-h-[250px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                >

                    <button onClick={() => navigate(-1)} className="mb-6 text-sm">
                        ← Назад
                    </button>

                    <h1 className="text-3xl font-semibold mb-4 max-w-[800px]">
                        Топ-3 музея, которые нужно посетить каждому
                    </h1>

                    <div className="bg-[#525252]/35 px-4 py-3 w-[800px] text-sm">
                        Подборка самых знаменитых музеев мира, где собраны шедевры искусства и уникальные исторические артефакты. Эти места позволяют прикоснуться к культуре разных эпох и стран, увидеть подлинные произведения великих мастеров и глубже понять историю человечества.
                    </div>

                </div>
            </div>

            {/* GRID */}
            <div className="px-12 py-10">
                <div className="grid grid-cols-3 gap-8">

                    {museums.map((item, i) => (
                        <div key={i} className="bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col">

                            <img src={item.img} className="h-48 w-full object-cover" />

                            <div className="p-5 flex flex-col flex-1">

                                <p className="text-sm font-medium mb-2">
                                    {item.title}
                                </p>

                                <p className="text-xs text-gray-700 mb-4 line-clamp-3">
                                    {item.desc}
                                </p>

                                <button className="mt-auto bg-[#8B2635] text-white px-4 py-2 rounded-xl text-sm">
                                    Подробнее
                                </button>

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