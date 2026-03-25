import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  openDoor: number | null;
  setOpenDoor: (n: number | null) => void;
}

const DOOR_COLORS = [
  "#C0392B", // 1 — тёмно-красный
  "#2980B9", // 2 — синий
  "#27AE60", // 3 — зелёный
  "#8E44AD", // 4 — фиолетовый
  "#E67E22", // 5 — оранжевый
  "#16A085", // 6 — бирюзовый
  "#2C3E50", // 7 — тёмно-синий
  "#E91E63", // 8 — розовый
  "#7CB342", // 9 — салатовый
  "#795548", // 10 — коричневый
  "#F06292", // 11 — светло-розовый
  "#D4AC0D", // 12 — золотой
];

const DOOR_PRIZES = [
  "Автомобильные ключи 🚗",
  "Денежный приз 💵",
  "Мерч Авторадио 👕",
  "Смартфон 📱",
  "Сертификат в ресторан 🍽️",
  "Тур выходного дня ✈️",
  "Беспроводные наушники 🎧",
  "Фирменный мяч Авторадио ⚽",
  "Денежный приз 💵",
  "Мерч-набор Авторадио 🎁",
  "Смартфон 📱",
  "Главный приз — СЮРПРИЗ! 🎉",
];

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

// Текущий месяц (1-12)
const CURRENT_MONTH = new Date().getMonth() + 1;

export default function AdventCalendar({ openDoor, setOpenDoor }: Props) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  function handleDoor(num: number) {
    if (num > CURRENT_MONTH) return;
    const next = new Set(flipped);
    if (next.has(num)) {
      next.delete(num);
    } else {
      next.add(num);
    }
    setFlipped(next);
    setOpenDoor(flipped.has(num) ? null : num);
  }

  return (
    <div className="w-full">
      {/* Обложка календаря */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-[#8B6F47] mx-auto"
        style={{
          background: "linear-gradient(135deg, #f5f0e8 0%, #ede3d0 100%)",
          maxWidth: 800,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 4px rgba(139,111,71,0.3)",
        }}
      >
        {/* Верхняя "кожаная" обложка */}
        <div
          className="h-12 w-full flex items-center justify-center"
          style={{ background: "linear-gradient(180deg, #5D3A1A 0%, #8B5E3C 100%)" }}
        >
          <div className="flex gap-2">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-6 h-2 rounded-full bg-[#D4AC0D]/60" />
            ))}
          </div>
        </div>

        {/* Сетка дверей 4x3 */}
        <div className="p-4 md:p-6 grid grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
            const color = DOOR_COLORS[num - 1];
            const isUnlocked = num <= CURRENT_MONTH;
            const isOpen = flipped.has(num);
            const month = MONTHS[num - 1];

            return (
              <div key={num} className="relative" style={{ perspective: "600px" }}>
                <button
                  onClick={() => handleDoor(num)}
                  disabled={!isUnlocked}
                  className="w-full relative transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
                  style={{ aspectRatio: "3/4" }}
                  title={isUnlocked ? `${month} — нажми, чтобы открыть` : `Откроется в ${month}`}
                >
                  {/* Дверь */}
                  <div
                    className="absolute inset-0 rounded-xl flex flex-col items-center justify-between p-2 shadow-lg"
                    style={{
                      background: isOpen
                        ? `linear-gradient(135deg, #FFD700 0%, #FFA500 100%)`
                        : `linear-gradient(160deg, ${color}dd 0%, ${color} 60%, ${color}bb 100%)`,
                      border: isOpen ? "3px solid #FFD700" : `3px solid ${color}88`,
                      boxShadow: isOpen
                        ? `0 0 20px rgba(255,215,0,0.6), 0 4px 15px rgba(0,0,0,0.3)`
                        : `0 4px 15px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Венок */}
                    {!isOpen && (
                      <div className="text-center">
                        <span className="text-base md:text-lg">🎄</span>
                      </div>
                    )}

                    {/* Содержимое двери */}
                    {isOpen ? (
                      <div className="flex flex-col items-center justify-center h-full gap-1 px-1">
                        <span className="text-2xl md:text-3xl">🎁</span>
                        <span className="text-[10px] md:text-xs text-center font-bold text-yellow-900 leading-tight">
                          {DOOR_PRIZES[num - 1]}
                        </span>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <span
                          className="font-black text-white/90 drop-shadow-md leading-none"
                          style={{
                            fontFamily: "Chewy, cursive",
                            fontSize: "clamp(24px, 6vw, 42px)",
                            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                          }}
                        >
                          {num}
                        </span>
                      </div>
                    )}

                    {/* Месяц снизу */}
                    {!isOpen && (
                      <div className="text-[8px] md:text-[10px] text-white/70 font-medium text-center leading-tight">
                        {month}
                      </div>
                    )}

                    {/* Замок для закрытых */}
                    {!isUnlocked && (
                      <div className="absolute top-1 right-1">
                        <Icon name="Lock" size={12} className="text-white/60" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Блик на обложке */}
        <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)" }}
        />
      </div>

      {/* Легенда */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <div className="w-4 h-4 rounded bg-yellow-400 shadow-sm" />
          <span>Открыто</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <div className="w-4 h-4 rounded bg-red-600 shadow-sm" />
          <span>Доступно</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Icon name="Lock" size={14} className="text-white/40" />
          <span>Откроется позже</span>
        </div>
      </div>

      {/* Подсказка */}
      <p className="text-center text-blue-400/60 text-sm mt-3">
        Нажми на дверь, чтобы узнать приз месяца
      </p>
    </div>
  );
}
