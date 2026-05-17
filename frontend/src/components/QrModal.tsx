import { QRCodeCanvas } from "qrcode.react";
import closeIcon from "../assets/images/close.png";

export const QrModal = ({ ticket, onClose }: any) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[340px] min-h-[620px] p-6 relative shadow-xl flex flex-col">

        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <img src={closeIcon} className="w-5 h-5 opacity-80" />
        </button>

        {/* QR */}
        <div className="bg-[#8B2635] rounded-2xl p-5 flex justify-center mb-6 mt-3">
          <div className="bg-white p-2 rounded-xl">
            <QRCodeCanvas value={JSON.stringify(ticket)} size={160} />
          </div>
        </div>

        {/* текст */}
        <div className="text-[13px] leading-[1.4]">

          <p className="text-gray-400 mb-1">Выставка</p>
          <p className="font-semibold text-[14px] mb-3">
            {ticket.title}
          </p>

          <p className="text-gray-400 mb-1">Музей</p>
          <p className="mb-3">{ticket.place}</p>

          <div className="flex justify-between mb-3">
            <div>
              <p className="text-gray-400">Дата</p>
              <p className="font-medium">{ticket.date}</p>
            </div>

            <div>
              <p className="text-gray-400">Время</p>
              <p className="font-medium">{ticket.time}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-400">Номер билета</p>
            <p className="font-medium">{ticket.id}</p>
          </div>

        </div>

        <div className="bg-[#8B2635]/50 text-[#404040] text-[16px] text-center py-3 px-3 rounded-xl leading-[1.3] mt-auto">
          При входе предъявите QR-код с экрана телефона
          <br />
          или распечатанный билет
        </div>

      </div>
    </div>
  );
};