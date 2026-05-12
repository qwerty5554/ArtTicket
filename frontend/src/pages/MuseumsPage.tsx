import { useNavigate, Link } from "react-router-dom";
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
            time: "Пн,Ср,Чт,Вс 10:00–22:00",
            img: img4,
        },
        {
            title: "Музей ВДНХ",
            desc: "Открытый в 2017 году после масштабной реставрации, музей стал современным выставочным пространством, посвященным истории главной выставки страны.",
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

    return (
        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

            <Header />

            {/* НАЗАД */}
            <div className="px-10 mt-4">
                <button onClick={() => navigate(-1)}
                    className="text-sm hover:opacity-70"
                >
                    ← Назад
                </button>
            </div>

            {/* TITLE */}
            <div className="text-center mt-6 mb-10">
                <h1 className="text-3xl font-semibold mb-2">Музеи</h1>
                <p className="text-gray-500">
                    Лучшие музеи с актуальными выставками и экспозициями
                </p>
            </div>

            {/* GRID */}
            <div className="px-12 pb-16">
                <div className="grid grid-cols-3 gap-8">

                    {museums.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">

                            {/* IMAGE */}
                            <img src={item.img} className="h-44 w-full object-cover" />

                            {/* CONTENT */}
                            <div className="p-4 flex flex-col flex-1">

                                <p className="font-medium mb-1">
                                    {item.title}
                                </p>

                                <p className="text-xs text-gray-500 mb-2">
                                    {item.desc}
                                </p>

                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                    <img src={locationIcon} className="w-3 h-3 opacity-70" />
                                    {item.place}
                                </div>

                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                                    <img src={timeIcon} className="w-3 h-3 opacity-70" />
                                    {item.time}
                                </div>

                                {/* КНОПКА */}
                                <button onClick={() =>
                                    navigate("/museum", {
                                        state: item,
                                    })
                                }
                                    className="mt-auto bg-[#8B2635] text-white py-2 rounded-xl text-sm hover:bg-[#6E1F2B]
                        transition"
                                >
                                    Смотреть выставки
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* FOOTER (как на главной) */}
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
                            <Link to="/faq" className="hover:text-white">
                                Часто задаваемые вопросы
                            </Link>
                            <Link to="/refund" className="hover:text-white">
                                Условия возврата
                            </Link>
                            <Link to="/rules" className="hover:text-white">
                                Правила посещения
                            </Link>
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