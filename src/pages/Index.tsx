import { useState } from "react";
import AdventCalendar from "@/components/AdventCalendar";
import Icon from "@/components/ui/icon";

const PRIZES = [
  { icon: "🚗", label: "Автомобильные ключи", color: "#FFD700" },
  { icon: "💵", label: "Денежные призы", color: "#4CAF50" },
  { icon: "📱", label: "Смартфоны", color: "#2196F3" },
  { icon: "👕", label: "Мерч Авторадио", color: "#E91E63" },
];

export default function Index() {
  const [openDoor, setOpenDoor] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* HERO — полноэкранный с референсным фоном */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Фон — 4 сезона */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/bucket/715d6499-bc05-47bf-be3d-8c1b5fca7a77.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* Затемняющий градиент снизу */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        {/* ЛОГОТИП АВТОРАДИО вверху */}
        <div className="relative z-10 flex flex-col items-center pt-10 pb-0 w-full">
          <div className="flex items-center gap-3 bg-white/95 rounded-2xl px-6 py-3 shadow-2xl mb-8">
            <div className="flex flex-col items-center leading-none">
              <span
                className="text-3xl md:text-4xl font-black text-[#1a3fa8] leading-none tracking-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                АВТО
              </span>
              <span
                className="text-3xl md:text-4xl font-black text-[#1a3fa8] leading-none tracking-tight"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                РАДИО
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-10 h-1.5 rounded-full bg-[#1a3fa8]" />
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full border-2 border-[#1a3fa8] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#1a3fa8]" />
                </div>
                <div className="w-5 h-1.5 rounded-full bg-[#1a3fa8]" />
              </div>
              <div className="w-8 h-1.5 rounded-full bg-[#1a3fa8]" />
            </div>
          </div>
        </div>

        {/* ЗАГОЛОВОК */}
        <div className="relative z-10 text-center px-4 mt-auto mb-8">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-none mb-4"
            style={{ fontFamily: "Chewy, cursive", letterSpacing: "0.03em", textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
          >
            <span className="text-[#FFD700]">НОВЫЙ ГОД</span>
            <br />
            <span className="text-white">КРУГЛЫЙ ГОД!</span>
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-medium drop-shadow-lg mb-6 max-w-lg mx-auto">
            Открывай двери, выигрывай призы каждый месяц!
          </p>
          <a
            href="#calendar"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
            style={{ boxShadow: "0 0 40px rgba(220,38,38,0.5)" }}
          >
            <Icon name="Gift" size={22} />
            Открыть календарь
          </a>
        </div>

        {/* Прокрутка вниз */}
        <div className="relative z-10 mb-8 animate-bounce">
          <Icon name="ChevronDown" size={36} className="text-white/60" />
        </div>
      </section>

      {/* ПРИЗЫ */}
      <section className="bg-[#0d1b3e] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center text-3xl md:text-4xl font-black text-white mb-2"
            style={{ fontFamily: "Chewy, cursive" }}
          >
            🎁 Что можно выиграть?
          </h2>
          <p className="text-center text-blue-300 mb-8">Каждый месяц новые призы — слушай и участвуй!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRIZES.map((prize) => (
              <div
                key={prize.label}
                className="flex flex-col items-center gap-3 bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all hover:scale-105"
              >
                <span className="text-5xl">{prize.icon}</span>
                <span className="text-white font-semibold text-center text-sm">{prize.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* АДВЕНТ-КАЛЕНДАРЬ */}
      <section id="calendar" className="bg-gradient-to-b from-[#0d1b3e] to-[#1a0a2e] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-4xl md:text-5xl font-black text-[#FFD700] mb-3"
              style={{ fontFamily: "Chewy, cursive" }}
            >
              🗓 Адвент-календарь
            </h2>
            <p className="text-blue-300 text-lg">12 дверей — 12 месяцев сюрпризов</p>
          </div>
          <AdventCalendar openDoor={openDoor} setOpenDoor={setOpenDoor} />
        </div>
      </section>

      {/* КАК УЧАСТВОВАТЬ */}
      <section className="bg-[#0d1b3e] py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center text-3xl md:text-4xl font-black text-white mb-10"
            style={{ fontFamily: "Chewy, cursive" }}
          >
            🚀 Как участвовать?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Слушай Авторадио", desc: "Включай нас на волне или в приложении каждый день", icon: "Radio" },
              { step: "2", title: "Открывай двери", desc: "Каждый месяц новая дверь календаря с заданием и призом", icon: "DoorOpen" },
              { step: "3", title: "Получай призы", desc: "Выполняй задания и выигрывай крутые подарки от Авторадио", icon: "Trophy" },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white/10 rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <Icon name={item.icon} size={32} className="text-[#FFD700] mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ДЕД МОРОЗ В КАБРИОЛЕТЕ — финальный баннер */}
      <section className="relative overflow-hidden py-16 px-4 bg-gradient-to-r from-red-900 via-red-700 to-red-900">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-white select-none"
              style={{
                left: `${(i * 37 + 13) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                fontSize: `${10 + (i % 4) * 8}px`,
                opacity: 0.3 + (i % 3) * 0.2,
              }}
            >
              {["❄", "✦", "⋆", "❅", "✼"][i % 5]}
            </span>
          ))}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-4xl md:text-5xl font-black text-[#FFD700] mb-4 leading-tight"
              style={{ fontFamily: "Chewy, cursive" }}
            >
              Дед Мороз уже едет!
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Каждый месяц он привозит новые призы слушателям Авторадио. Не пропусти свой подарок!
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#calendar"
                className="inline-flex items-center gap-2 bg-white text-red-700 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-all hover:scale-105"
              >
                <Icon name="Gift" size={18} />
                Участвовать
              </a>
              <a
                href="https://avtoradio.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white/20 transition-all"
              >
                <Icon name="Radio" size={18} />
                avtoradio.ru
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/bucket/715d6499-bc05-47bf-be3d-8c1b5fca7a77.png"
              alt="Авторадио"
              className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-white/30"
            />
          </div>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="bg-[#060d1f] py-8 px-4 text-center border-t border-white/10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span
            className="text-[#1a3fa8] bg-white rounded-lg px-3 py-1 font-black text-lg"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            АВТО РАДИО
          </span>
        </div>
        <p className="text-white/40 text-sm">© 2025 Авторадио. Новый год круглый год.</p>
      </footer>
    </div>
  );
}