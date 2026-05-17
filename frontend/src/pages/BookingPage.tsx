import { useEffect, useState } from "react";

const StatusBadge = ({ status }: { status: string }) => {

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

export default function BookingPage() {

  const [tickets, setTickets] = useState<any[]>([]);

  // загрузка бронирований из backend
  useEffect(() => {

    const loadBookings = async () => {

      try {

        const response = await fetch(
          "http://localhost:8082/admin/bookings"
        );

        const data = await response.json();

        console.log(data);

        // защита чтобы всегда был массив
        if (Array.isArray(data)) {

          setTickets(data);

        } else {

          setTickets([]);

        }

      } catch (err) {

        console.log(err);

        setTickets([]);

      }
    };

    // первая загрузка
    loadBookings();

    // автообновление
    const interval = setInterval(
      loadBookings,
      2000
    );

    return () => clearInterval(interval);

  }, []);

  // статистика
  const total = tickets.reduce(
    (sum, t) => sum + (t.price || 0),
    0
  );

  const paid = tickets.filter(
    (t) => t.status === "Оплачен"
  ).length;

  const pending = tickets.filter(
    (t) =>
      t.status !== "Оплачен" &&
      t.status !== "Посещён"
  ).length;

  return (
    <div>

      <div className="mb-6">

        <h1 className="text-2xl font-semibold mb-4">
          Бронирование
        </h1>

        <div className="h-[1px] bg-[#E5E5E5]" />

      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-[#F5F5F5] p-4 rounded-xl">
          Всего: {tickets.length}
        </div>

        <div className="bg-[#F5F5F5] p-4 rounded-xl text-green-600">
          Оплачено: {paid}
        </div>

        <div className="bg-[#F5F5F5] p-4 rounded-xl text-yellow-600">
          Ожидает: {pending}
        </div>

        <div className="bg-[#F5F5F5] p-4 rounded-xl">
          Сумма: {total} ₽
        </div>

      </div>

      <div className="bg-[#F5F5F5] rounded-2xl p-4">

        <table className="w-full text-sm">

          <thead>

            <tr className="text-gray-400 text-left">

              <th className="px-4 py-2">ID</th>

              <th className="px-4 py-2">Клиент</th>

              <th className="px-4 py-2">Выставка</th>

              <th className="px-4 py-2">Дата</th>

              <th className="px-4 py-2">Билеты</th>

              <th className="px-4 py-2">Сумма</th>

              <th className="px-4 py-2">Статус</th>

            </tr>

          </thead>

          <tbody>

            {/* если бронирований нет */}
            {tickets.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-400"
                >
                  Нет бронирований
                </td>

              </tr>
            )}

            {/* список бронирований */}
            {tickets.map((t, i) => (

              <tr
                key={i}
                className="border-t border-gray-300 hover:bg-[#EEEEEE] transition"
              >

                <td className="px-4 py-3">
                  {t.id}
                </td>

                <td className="px-4 py-3">

                  <div>
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

                <td className="px-4 py-3">
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