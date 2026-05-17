import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Message = {
  text: string;
  sender: string;
  time: string;
};

export default function ChatPage() {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // авто-обновление 
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
      sender:
        localStorage.getItem("role") === "admin"
          ? "admin"
          : "user",
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
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Чат</h1>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Администратор</p>
              <p className="text-xs text-gray-400">admin@artticket.ru</p>
            </div>

            <div className="w-10 h-10 bg-[#8B2635] text-white flex items-center justify-center rounded-full">
              АД
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#E5E5E5]" />
      </div>

      {/* чат */}
      <div className="flex-1 bg-[#F5F5F5] rounded-2xl p-4 flex flex-col">
        <div className="mb-4 pb-3 border-b border-[#E5E5E5]">
          <p className="text-sm font-medium">Служба поддержки</p>
          <p className="text-xs text-green-500">Онлайн</p>
        </div>

        {/* сообщения */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`w-fit max-w-[60%] p-3 rounded-2xl text-sm ${msg.sender === "admin"
                ? "ml-auto bg-gray-300"
                : "bg-[#EAEAEA]"
                }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
          ))}
        </div>

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
  );
}