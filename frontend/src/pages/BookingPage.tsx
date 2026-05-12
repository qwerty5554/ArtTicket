import { useEffect, useState } from "react";

const StatusBadge = ({ status }: { status: string }) => {
  const styles =
    status === "Оплачен"
      ? "bg-green-200 text-green-700"
      : "bg-yellow-200 text-yellow-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};

export default function BookingPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  // 🔥 загрузка
  const loadTickets = () => {
    try {
      const data = JSON.parse(localStorage.getItem("tickets") || "[]");
      setTickets(data);
    } catch {
      setTickets([]);
    }
  };

  useEffect(() => {
    loadTickets();

    // 🔥 авто-обновление (как чат)
    const interval = setInterval(() => {
      loadTickets();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 защита от undefined
  const total = tickets.reduce((sum, t) => sum + (t.price || 0), 0);
  const paid = tickets.filter((t) => t.status === "Оплачен").length;
  const pending = tickets.filter((t) => t.status !== "Оплачен").length;

  return (
    <div>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Бронирование</h1>
        <div className="h-[1px] bg-[#E5E5E5]" />
      </div>

      {/* СТАТИСТИКА */}
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

      {/* ТАБЛИЦА */}
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
            {tickets.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  Нет бронирований
                </td>
              </tr>
            )}

            {tickets.map((t, i) => (
              <tr key={i} className="border-t border-gray-300">

                <td className="px-4 py-3">
                  {t.id || "—"}
                </td>

                <td className="px-4 py-3">
                  <div>{t.name || "—"}</div>
                  <div className="text-xs text-gray-400">
                    {t.userEmail || ""}
                  </div>
                </td>

                <td className="px-4 py-3">
                  {t.exhibition || "—"}
                </td>

                <td className="px-4 py-3">
                  {t.date || "—"} {t.time || ""}
                </td>

                <td className="px-4 py-3">
                  {t.count || 1}
                </td>

                <td className="px-4 py-3">
                  {t.price || 0} ₽
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={t.status || "Ожидает"} />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}