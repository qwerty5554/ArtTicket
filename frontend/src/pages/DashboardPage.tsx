import { useEffect, useState } from "react";
import {
  DollarSign,
  Ticket,
  Users,
  Calendar,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
  bg,
}: any) => {

  return (

    <div className="bg-[#F5F5F5] rounded-2xl p-4 flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <p className="text-xl font-semibold mt-1">
          {value}
        </p>
      </div>

      <div className={`p-2 rounded-lg ${bg}`}>
        {icon}
      </div>

    </div>
  );
};

const StatusBadge = ({
  status,
}: {
  status: string;
}) => {

  const styles =
    status === "Оплачен"
      ? "bg-green-200 text-green-700"
      : status === "Посещён"
      ? "bg-gray-300 text-gray-700"
      : "bg-yellow-200 text-yellow-700";

  return (

    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {status}
    </span>

  );
};

export default function DashboardPage() {

  // Данные бронирований
  const [tickets, setTickets] = useState<any[]>([]);

  // Загрузка данных с backend
  useEffect(() => {

    const loadBookings = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8082/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log(data);

        setTickets(data || []);

      } catch (err) {

        console.log(err);

      }
    };

    loadBookings();

    const interval = setInterval(
      loadBookings,
      2000
    );

    return () => clearInterval(interval);

  }, []);

  // Общая выручка
  const totalMoney = tickets.reduce(
    (sum, t) =>
      sum + (t.price || 0),
    0
  );

  // Общее крличество билетов
  const totalTickets = tickets.reduce(
    (sum, t) =>
      sum + (t.count || 0),
    0
  );

  // Количество пользователей
  const totalUsers =
    new Set(
      tickets.map(
        (t) => t.email
      )
    ).size;

  // Количество выставок
  const totalExhibitions =
    new Set(
      tickets.map(
        (t) => t.exhibition
      )
    ).size;

  return (

    <div>

      <div className="mb-6">

        <h1 className="text-2xl font-semibold mb-4">
          Дашборд
        </h1>

        <div className="h-[1px] bg-[#E5E5E5]" />

      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Общая выручка"
          value={`${totalMoney} ₽`}
          icon={<DollarSign size={20} />}
          bg="bg-green-100 text-green-600"
        />

        <StatCard
          title="Продано билетов"
          value={totalTickets}
          icon={<Ticket size={20} />}
          bg="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="Посетителей"
          value={totalUsers}
          icon={<Users size={20} />}
          bg="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Активных выставок"
          value={totalExhibitions}
          icon={<Calendar size={20} />}
          bg="bg-purple-100 text-purple-600"
        />

      </div>

      <div className="bg-[#F5F5F5] rounded-2xl p-4">

        <div className="flex justify-between items-center mb-4">

          <h2 className="font-semibold">
            Последние бронирования
          </h2>

        </div>

        <table className="w-full text-sm">

          <thead className="border-b border-[#E5E5E5]">

            <tr className="text-gray-400 text-left">

              <th className="px-4 py-2">
                ID
              </th>

              <th className="px-4 py-2">
                Клиент
              </th>

              <th className="px-4 py-2">
                Выставка
              </th>

              <th className="px-4 py-2">
                Дата/Время
              </th>

              <th className="px-4 py-2">
                Билеты
              </th>

              <th className="px-4 py-2">
                Сумма
              </th>

              <th className="px-4 py-2">
                Статус
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-400"
                >

                  Нет данных

                </td>

              </tr>

            )}

            {tickets
              .slice(0, 10)
              .map((t, i) => (

              <tr
                key={i}
                className="border-t border-[#E5E5E5] hover:bg-[#eeeeee] transition"
              >

                <td className="px-4 py-3">

                  {t.id}

                </td>

                <td className="px-4 py-3">

                  <div className="font-medium">
                    {t.client}
                  </div>

                  <div className="text-xs text-gray-400">
                    {t.email}
                  </div>

                </td>

                <td className="px-4 py-3">

                  {t.exhibition}

                </td>

                <td className="px-4 py-3">

                  {t.date} {t.time}

                </td>

                <td className="px-4 py-3">

                  {t.count}

                </td>

                <td className="px-4 py-3 font-medium">

                  {t.price} ₽

                </td>

                <td className="px-4 py-3">

                  <StatusBadge
                    status={t.status}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}