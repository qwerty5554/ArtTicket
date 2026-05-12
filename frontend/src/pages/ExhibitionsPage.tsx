import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";

// ИКОНКИ
import locationIcon from "../assets/images/location.png";
import timeIcon from "../assets/images/clock.png";

// КАРТИНКИ 
import img1 from "../assets/images/tree.jpg";
import img2 from "../assets/images/hermitage5.jpg";
import img3 from "../assets/images/museum.jpg";
import img4 from "../assets/images/skulp.jpg";
import img5 from "../assets/images/gmii.jpg";
import img6 from "../assets/images/hermitage1.jpg";
import img7 from "../assets/images/hermitage2.jpg";
import img8 from "../assets/images/golland.jpg";
import img9 from "../assets/images/hermitage4.jpg";
import img10 from "../assets/images/hermitage3.jpg";
import img11 from "../assets/images/vangogh.jpg";
import img12 from "../assets/images/renaissance.jpg";
import img13 from "../assets/images/van.jpg";
import img14 from "../assets/images/life.jpg";
import img15 from "../assets/images/zerkalo.jpg";
import img16 from "../assets/images/tishina.jpeg";
import img17 from "../assets/images/nikolai.jpg";

export default function ExhibitionsPage() {
    const navigate = useNavigate();

    const exhibitions = [
        {
            title: "Современное искусство XXI века",
            place: "Третьяковская галерея",
            time: "3 июля 2025 - 6 сентября 2026",
            price: "800 ₽",
            img: img1,
        },
        {
            title: "Зимний дворец Петра I",
            place: "Эрмитаж",
            time: "20 ноября 2025 - 26 февраля 2026",
            price: "600 ₽",
            img: img2,
        },
        {
            title: "Драгоценности! Блеск русского двора",
            place: "Государственный исторический музей",
            time: "18 декабря 2025 - 12 мая 2026",
            price: "500 ₽",
            img: img3,
        },
        {
            title: "Античные скульптуры",
            place: "Эрмитаж",
            time: "20 ноября 2025 - 5 февраля 2026",
            price: "500 ₽",
            img: img4,
        },
        {
            title: "Экскурсия в картинную галерею ГМИИ",
            place: "ГМИИ им. А.С. Пушкина",
            time: "20 января 2026 - 22 марта 2026",
            price: "700 ₽",
            img: img5,
        },
        {
            title: "Иорданская лестница",
            place: "Эрмитаж",
            time: "18 марта 2026 - 31 мая 2026",
            price: "700 ₽",
            img: img6,
        },
        {
            title: "Часы “Павлин”",
            place: "Эрмитаж",
            time: "8 марта 2026 - 1 июля 2026",
            price: "500 ₽",
            img: img7,
        },
        {
            title: "Золотой век голландской живописи",
            place: "ГМИИ им. А.С. Пушкина",
            time: "28 августа 2025 - 26 января 2026",
            price: "1200 ₽",
            img: img8,
        },
        {
            title: "Рыцарский зал",
            place: "Эрмитаж",
            time: "1 июля 2025 - 22 октября 2026 ",
            price: "500 ₽",
            img: img9,
        },
        {
            title: "Две Мадонны Леонардо да Винчи",
            place: "Эрмитаж",
            time: "21 февраля 2026 - 19 мая 2026",
            price: "700 ₽",
            img: img10,
        },
        {
            title: "Мультимедийная выставка “Быть Ван Гогом””",
            place: "Музей ВДНХ",
            time: "27 ноября 2025 - 6 мая 2026",
            price: "600 ₽",
            img: img11,
        },
        {
            title: "Эпоха Неизвестного. К 100-летию художника",
            place: "Третьяковская галерея",
            time: "16 декабря 2025 - 12 мая 2026 ",
            price: "650 ₽",
            img: img12,
        },
        {
            title: "Ван Гог: Путешествие в желтое",
            place: "Эрмитаж",
            time: "9 ноября 2025 - 24 мая 2026",
            price: "600 ₽",
            img: img13,
        },
        {
            title: "“12 признаков живого”",
            place: "Музей ВДНХ",
            time: "20 марта 2026 - 26 мая 2026",
            price: "500 ₽",
            img: img14,
        },
        {
            title: "Томас Деманд “Зеркало без памяти”",
            place: "Музей современного искусства “Гараж”",
            time: "12 апреля 2026 - 8 августа 2026",
            price: "700 ₽",
            img: img15,
        },
        {
            title: "Павел Альтхамер “Тишина”",
            place: "Музей современного искусства “Гараж”",
            time: "10 января 2026 - 7 сентября 2026",
            price: "800 ₽",
            img: img16,
        },
        {
            title: "Выставка “Николай I. Идеальный самодержец”",
            place: "Государственный исторический музей",
            time: "17 сентября 2025 - 22 июня 2026",
            price: "700 ₽",
            img: img17,
        },
    ];

    return (
        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

            <Header />

            <div className="px-10 mt-4">
                <button onClick={() => navigate(-1)} className="text-sm hover:opacity-70">
                    ← Назад
                </button>
            </div>

            <div className="text-center mt-6 mb-10">
                <h1 className="text-3xl font-semibold mb-2">Выставки</h1>
                <p className="text-gray-500">
                    Полный каталог актуальных выставок и экспозиций
                </p>
            </div>

            <div className="px-12 pb-16">
                <div className="grid grid-cols-3 gap-8">

                    {exhibitions.map((item, i) => (
                        <div
                            key={i}
                            className="bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col"
                        >

                            <img src={item.img} className="h-48 w-full object-cover" />

                            <div className="p-5 flex flex-col flex-1">

                                <p className="text-sm font-medium mb-2">
                                    {item.title}
                                </p>

                                <div className="flex items-center gap-1 text-xs text-gray-700 mb-2">
                                    <img src={locationIcon} className="w-3 h-3" />
                                    {item.place}
                                </div>

                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                                    <img src={timeIcon} className="w-3 h-3" />
                                    {item.time}
                                </div>

                                <div className="border-t border-[#D4D4D4] my-3"></div>

                                <div className="flex justify-between items-end mt-auto">

                                    <div>
                                        <p className="text-xs text-gray-400">от</p>
                                        <p className="text-xl font-semibold">
                                            {item.price}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            localStorage.setItem("currentExhibition", JSON.stringify(item)); 
                                            navigate("/booking", { state: item });
                                        }}
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