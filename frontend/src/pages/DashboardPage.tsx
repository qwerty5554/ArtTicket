import { useEffect, useState } from "react";
import { DollarSign, Ticket, Users, Calendar } from "lucide-react";

const StatCard = ({ title, value, icon, bg }: any) => {
  return (
    <div className="bg-[#F5F5F5] rounded-2xl p-4 flex items-center justify-between">
      
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>

      <div className={`p-2 rounded-lg ${bg}`}>
        {icon}
      </div>

    </div>
  );
};

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

export default function DashboardPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const load = () => {
      const data = JSON.parse(localStorage.getItem("tickets") || "[]");
      setTickets(data);
    };

    load();

    // авто-обновление как в чате
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalMoney = tickets.reduce((s, t) => s + (t.price || 0), 0);
  const totalTickets = tickets.reduce((s, t) => s + (t.count || 0), 0);

  return (
    <div>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Дашборд</h1>
        <div className="h-[1px] bg-[#E5E5E5]" />
      </div>

      {/* СТАТЫ */}
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
          value={tickets.length}
          icon={<Users size={20} />}
          bg="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Активных выставок"
          value={new Set(tickets.map(t => t.exhibition)).size}
          icon={<Calendar size={20} />}
          bg="bg-purple-100 text-purple-600"
        />

      </div>

      {/* ПОСЛЕДНИЕ БРОНИРОВАНИЯ */}
      <div className="bg-[#F5F5F5] rounded-2xl p-4">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Последние бронирования</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b border-[#E5E5E5]">
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
                  Нет данных
                </td>
              </tr>
            )}

            {tickets.slice(-5).reverse().map((t, i) => (
              <tr key={i} className="border-t border-[#E5E5E5] hover:bg-[#eeeeee] transition">

                <td className="px-4 py-3">{t.id}</td>

                <td className="px-4 py-3">
                  <div>{t.name}</div>
                  <div className="text-xs text-gray-400">{t.userEmail}</div>
                </td>

                <td className="px-4 py-3">{t.exhibition}</td>

                <td className="px-4 py-3">
                  {t.date} {t.time}
                </td>

                <td className="px-4 py-3">{t.count}</td>

                <td className="px-4 py-3 font-medium">{t.price} ₽</td>

                <td className="px-4 py-3">
                  <StatusBadge status={t.status} />
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}