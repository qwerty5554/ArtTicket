import { useLocation, useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";

import logo from "../assets/images/logo.png";

import locationIcon from "../assets/images/location.png";
import timeIcon from "../assets/images/clock.png";

import ermitagImg from "../assets/images/ermitag.jpg";
import tretyakovImg from "../assets/images/tretyakov.jpg";
import vdnkhImg from "../assets/images/vdnkh.jpg";
import garageImg from "../assets/images/garage.jpg";
import historyImg from "../assets/images/history.jpg";
import gmiiImg from "../assets/images/gmii2.jpg";

import img1 from "../assets/images/hermitage1.jpg";
import img2 from "../assets/images/hermitage2.jpg";
import img3 from "../assets/images/hermitage3.jpg";
import img4 from "../assets/images/hermitage4.jpg";
import img5 from "../assets/images/hermitage5.jpg";
import img6 from "../assets/images/tree.jpg";
import img7 from "../assets/images/renaissance.jpg";
import img8 from "../assets/images/vangogh.jpg";
import img9 from "../assets/images/life.jpg";
import img10 from "../assets/images/gmii.jpg";
import img11 from "../assets/images/golland.jpg";
import img12 from "../assets/images/zerkalo.jpg";
import img13 from "../assets/images/tishina.jpeg";
import img14 from "../assets/images/nikolai.jpg";
import img15 from "../assets/images/museum.jpg";

export default function MuseumDetailsPage() {

    const navigate = useNavigate();

    const location = useLocation();

    const museum: any = location.state || {
        title: "Эрмитаж"
    };

    const museumsData: any = {

        "Эрмитаж": {
            img: ermitagImg,
            desc: "Один из крупнейших и наиболее значительных художественных и культурно-исторических музеев мира. Музей был основан в 1764 году как частное собрание императрицы Екатерины II, а с 1852 года открыт для публики.",
            place: "Дворцовая площадь, 2",
            time: "Вт–Вс: 10:30–18:00, Ср: до 21:00",
        },

        "Третьяковская галерея": {
            img: tretyakovImg,
            desc: "Один из главных художественных музеев России, посвящённый русскому искусству от древности до современности.",
            place: "Лаврушинский пер., 10",
            time: "Вт–Вс: 10:00–20:00, Пн: выходной",
        },

        "ГМИИ им. А.С. Пушкина": {
            img: gmiiImg,
            desc: "Государственный музей изобразительных искусств имени А. С. Пушкина — один из крупнейших музеев зарубежного искусства в России.",
            place: "ул. Волхонка, 12",
            time: "Вт–Вс: 11:00–21:00, Пн: выходной",
        },

        "Музей ВДНХ": {
            img: vdnkhImg,
            desc: "Современное выставочное пространство, посвящённое истории ВДНХ.",
            place: "пр-т Мира, 119",
            time: "Вт–Вс: 11:00–22:00",
        },

        "Музей современного искусства «Гараж»": {
            img: garageImg,
            desc: "Первый в России музей современного искусства.",
            place: "ул. Крымский Вал, 9",
            time: "Ежедневно 11:00–22:00",
        },

        "Государственный исторический музей": {
            img: historyImg,
            desc: "Крупнейший национальный исторический музей России.",
            place: "Красная площадь, 1",
            time: "Пн–Вс: 10:00–22:00",
        },
    };

    const exhibitionsByMuseum: any = {

        "Эрмитаж": [
            { title: "Иорданская лестница", date: "до 31 мая 2026", price: "700 ₽", img: img1 },
            { title: "Часы “Павлин”", date: "до 1 июля 2026", price: "500 ₽", img: img2 },
            { title: "Две Мадонны Леонардо", date: "до 19 мая 2026", price: "700 ₽", img: img3 },
            { title: "Рыцарский зал", date: "до 22 октября 2026", price: "500 ₽", img: img4 },
            { title: "Зимний дворец Петра I", date: "до 26 февраля 2026", price: "600 ₽", img: img5 },
        ],

        "Третьяковская галерея": [
            { title: "Современное искусство XXI века", date: "до 6 сентября 2026", price: "800 ₽", img: img6 },
            { title: "Эпоха Неизвестного. К 100-летию художника", date: "до 12 мая 2026", price: "650 ₽", img: img7 },
        ],

        "Музей ВДНХ": [
            { title: "Мультимедийная выставка “Быть Ван Гогом”", date: "до 6 мая 2026", price: "600 ₽", img: img8 },
            { title: "“12 признаков живого”", date: "до 26 мая 2026", price: "500 ₽", img: img9 },
        ],

        "ГМИИ им. А.С. Пушкина": [
            { title: "Экскурсия в картинную галерею ГМИИ", date: "до 22 марта 2026", price: "700 ₽", img: img10 },
            { title: "Золотой век голландской живописи", date: "до 26 января 2026", price: "1200 ₽", img: img11 },
        ],

        "Музей современного искусства «Гараж»": [
            { title: "Томас Деманд “Зеркало без памяти”", date: "до 8 августа 2026", price: "700 ₽", img: img12 },
            { title: "Павел Альтхамер “Тишина”", date: "до 7 сентября 2026", price: "800 ₽", img: img13 },
        ],

        "Государственный исторический музей": [
            { title: "Выставка “Николай I. Идеальный самодержец”", date: "до 22 июня 2026", price: "700 ₽", img: img14 },
            { title: "Драгоценности! Блеск русского двора", date: "до 12 мая 2026", price: "500 ₽", img: img15 },
        ],
    };

    const data =
        museumsData[museum?.title] ||
        museumsData["Эрмитаж"];

    const exhibitions =
        exhibitionsByMuseum[museum?.title] || [];

    return (

        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

            <Header />

            <div className="px-4 lg:px-12 mt-4 lg:mt-6">

                <div className="relative rounded-2xl overflow-hidden h-[420px] lg:h-[320px]">

                    <img
                        src={data.img}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/50"></div>

                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 text-white text-sm z-10 bg-black/30 px-3 py-1 rounded-xl backdrop-blur-sm"
                    >
                        ← Назад
                    </button>

                    <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 text-white z-10">

                        <h1 className="text-2xl lg:text-3xl font-semibold mb-3">
                            {museum.title}
                        </h1>

                        <p className="text-sm leading-relaxed opacity-90">
                            {data.desc}
                        </p>

                    </div>

                </div>

                <div className="flex flex-col lg:flex-row gap-5 lg:gap-16 mt-6 text-sm text-gray-700">

                    <div className="flex items-start gap-2">

                        <img
                            src={locationIcon}
                            className="w-4 h-4 mt-[2px]"
                        />

                        <div>

                            <p className="font-semibold">
                                Адрес
                            </p>

                            <p>
                                {data.place}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-2">

                        <img
                            src={timeIcon}
                            className="w-4 h-4 mt-[2px]"
                        />

                        <div>

                            <p className="font-semibold">
                                Режим работы
                            </p>

                            <p>
                                {data.time}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="px-4 lg:px-12 mt-8 lg:mt-10">

                <h2 className="text-xl font-semibold mb-6">
                    Выставки
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-start">

                    {exhibitions.map((item: any, i: number) => (

                        <div
                            key={i}
                            className="bg-white rounded-2xl p-4 shadow-sm flex flex-col h-fit"
                        >

                            <img
                                src={item.img}
                                className="h-56 lg:h-32 w-full object-cover object-center rounded-xl mb-3"
                            />

                            <p className="text-sm font-medium mb-2 leading-relaxed min-h-[44px]">

                                {item.title}

                            </p>

                            <p className="text-xs text-gray-400 mb-3">

                                {item.date}

                            </p>

                            <div className="h-[1px] bg-gray-200 my-1"></div>

                            <div className="flex items-end justify-between gap-3 mt-auto">

                                <div className="shrink-0">

                                    <p className="text-xs text-gray-400">
                                        от
                                    </p>

                                    <p className="text-xl font-semibold whitespace-nowrap leading-none">

                                        {item.price}

                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate("/booking", {
                                            state: {
                                                ...item,
                                                place: museum.title,
                                            },
                                        })
                                    }
                                    className="bg-[#8B2635] text-white px-5 py-2 rounded-xl text-sm min-w-[110px]"
                                >
                                    Купить
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <div className="bg-black text-white px-4 lg:px-12 py-10 mt-6">

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