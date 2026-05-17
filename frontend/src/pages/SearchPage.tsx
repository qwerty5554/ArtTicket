import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { searchData } from "../data/searchData";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = location.state?.query || "";

  const filtered = searchData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">

      <Header />

      <div className="px-12 mt-4">
        <button onClick={() => navigate(-1)} className="text-sm">
          ← Назад
        </button>
      </div>

      <div className="px-12 mt-6">

        <h1 className="text-2xl font-semibold mb-2">
          Результаты поиска
        </h1>

        <p className="text-gray-500 mb-6">
          По запросу: <span className="font-medium">{query}</span>
        </p>

        <div className="flex flex-col gap-4">

          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.route, { state: item.data })}
              className="bg-[#F5F5F5] p-4 rounded-xl cursor-pointer hover:bg-gray-200"
            >
              {item.title}
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}