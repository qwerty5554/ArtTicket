import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Send } from "lucide-react";
import logo from "../assets/images/logo.png";

type Message = {
  text: string;
  sender: string;
  time: string;
};


export default function SupportPage() {
  const ws = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {

    ws.current = new WebSocket(
      "ws://localhost:8082/ws/chat"
    );

    ws.current.onopen = () => {
      console.log("WS CONNECTED");
    };

    ws.current.onmessage = (event) => {

      console.log("MESSAGE:", event.data);

      const data = JSON.parse(event.data);

      setMessages((prev) => [
        ...prev,
        data,
      ]);
    };

    return () => {
      ws.current?.close();
    };

  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    console.log("SEND:", newMessage);

    ws.current?.send(
      JSON.stringify(newMessage)
    );

    setInput("");
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">

      <Header />

      {/* НАЗАД */}
      <div className="px-12 mt-4">
        <button onClick={() => navigate(-1)} className="text-sm">
          ← Назад
        </button>
      </div>

      {/* TITLE */}
      <div className="px-12 mt-4 mb-6">
        <h1 className="text-2xl font-semibold">
          Чат с поддержкой
        </h1>
      </div>

      {/* ЧАТ */}
      <div className="px-12 flex justify-center mb-10">

        <div className="w-full max-w-[1200px] h-[650px] bg-[#F5F5F5] rounded-2xl p-6 flex flex-col shadow-sm">
          {/* HEADER */}
          <div className="mb-4 pb-3 border-b border-[#E5E5E5]">
            <p className="text-sm font-medium">Служба поддержки</p>
            <p className="text-xs text-green-500">Онлайн</p>
          </div>

          {/* СООБЩЕНИЯ */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`w-fit max-w-[60%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                  ? "ml-auto bg-gray-300"
                  : "bg-[#EAEAEA]"
                  }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-500">
                  {msg.time}
                </span>
              </div>
            ))}

          </div>

          {/* INPUT */}
          <div className="mt-4 border-t border-[#E5E5E5] pt-4">
            <div className="flex items-center gap-2 bg-white rounded-xl p-2 border border-gray-300">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-3 py-2 outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />

              <button
                onClick={sendMessage}
                className="p-2 border rounded-lg hover:bg-gray-100 transition"
              >

                <Send size={18} />

              </button>

            </div>
          </div>

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