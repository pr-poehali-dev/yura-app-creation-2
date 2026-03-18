import { useState, useEffect } from "react";
import AdventCell from "@/components/AdventCell";
import PollBlock from "@/components/PollBlock";
import CommentsBlock from "@/components/CommentsBlock";
import GalleryBlock from "@/components/GalleryBlock";
import { getAdventCells } from "@/lib/api";

const SEASONS = [
  { key: "all", label: "Все", emoji: "🎄" },
  { key: "winter", label: "Зима", emoji: "❄️" },
  { key: "spring", label: "Весна", emoji: "🌸" },
  { key: "summer", label: "Лето", emoji: "☀️" },
  { key: "autumn", label: "Осень", emoji: "🍂" },
];

const SEASON_BG: Record<string, string> = {
  winter: "from-blue-950 via-indigo-900 to-blue-900",
  spring: "from-pink-950 via-rose-900 to-pink-800",
  summer: "from-yellow-900 via-orange-900 to-amber-800",
  autumn: "from-orange-950 via-red-900 to-orange-900",
  all: "from-slate-950 via-blue-950 to-indigo-950",
};

const SNOWFLAKES = ["❄", "✦", "✧", "⋆", "❅", "✼"];

function FloatingSnow({ count = 20 }: { count?: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute text-white/20 animate-bounce select-none"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            fontSize: `${12 + (i % 4) * 6}px`,
            animationDelay: `${(i * 0.4) % 3}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        >
          {SNOWFLAKES[i % SNOWFLAKES.length]}
        </span>
      ))}
    </div>
  );
}

export default function Index() {
  const [cells, setCells] = useState<Record<string, unknown>[]>([]);
  const [activeSeason, setActiveSeason] = useState("all");
  const [activeSection, setActiveSection] = useState("advent");

  useEffect(() => {
    getAdventCells().then((data) => setCells(data.cells || []));
  }, []);

  const bg = SEASON_BG[activeSeason] || SEASON_BG.all;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg} text-foreground transition-all duration-700`}>
      <FloatingSnow count={25} />

      {/* HERO */}
      <header className="relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
          <div className="mb-6">
            <span className="inline-block bg-red-600/30 border border-red-400/40 text-yellow-200 px-4 py-1 rounded-full text-sm font-medium mb-4">
              📻 Акция радиостанции
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold mb-3 leading-tight"
              style={{ fontFamily: "'Chewy', cursive", letterSpacing: "0.02em" }}
            >
              <span className="text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.5)]">Новый год</span>
              <br />
              <span className="text-white">круглый год</span>
            </h1>
            <p className="text-blue-200 text-lg md:text-xl max-w-xl mx-auto">
              Открывай окошки адвент-календаря, участвуй в викторинах, голосуй и делись фото!
            </p>
          </div>

          {/* Дед Мороз в кабриолете */}
          <div className="relative max-w-3xl mx-auto mb-8">
            <img
              src="https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/files/cb25d011-ae2a-41ae-9e21-392960ff9842.jpg"
              alt="Дед Мороз в кабриолете"
              className="w-full rounded-3xl border-2 border-yellow-400/40 shadow-2xl shadow-yellow-400/10 object-cover max-h-72"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg whitespace-nowrap">
              🎅 Дед Мороз уже едет!
            </div>
          </div>

          {/* Фильтр сезонов */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {SEASONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSeason(s.key)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 border text-sm ${
                  activeSeason === s.key
                    ? "bg-yellow-400 text-yellow-900 border-yellow-400 scale-105 shadow-lg shadow-yellow-400/30"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3">
            {[
              { key: "advent", label: "🎄 Календарь" },
              { key: "poll", label: "🗳️ Голосование" },
              { key: "gallery", label: "📸 Галерея" },
              { key: "comments", label: "💬 Комментарии" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex-none px-4 py-2 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  activeSection === item.key
                    ? "bg-red-600 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-10 space-y-16">

        {/* АДВЕНТ-КАЛЕНДАРЬ */}
        {activeSection === "advent" && (
          <section>
            <div className="text-center mb-8">
              <h2
                className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2"
                style={{ fontFamily: "'Chewy', cursive" }}
              >
                🎄 Адвент-календарь
              </h2>
              <p className="text-blue-200">24 окошка с сюрпризами, викторинами и подарками от радиостанции</p>
            </div>

            {/* Времена года */}
            <div className="max-w-2xl mx-auto mb-10">
              <img
                src="https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/files/a5517905-792f-489d-9573-1085819b8b20.jpg"
                alt="Все времена года"
                className="w-full rounded-2xl border border-white/20 shadow-xl"
              />
            </div>

            {cells.length === 0 ? (
              <div className="text-center py-16 text-white/50">
                <div className="text-6xl mb-4">🎁</div>
                <p>Загружаю календарь...</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-w-4xl mx-auto">
                {cells.map((cell) => (
                  <AdventCell key={cell.cell_number} cell={cell} />
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-6 bg-white/10 rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{cells.filter((c) => Boolean(c.is_unlocked)).length}</div>
                  <div className="text-xs text-white/60">открыто</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{cells.length}</div>
                  <div className="text-xs text-white/60">всего</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ГОЛОСОВАНИЕ */}
        {activeSection === "poll" && (
          <section className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className="text-4xl font-bold text-yellow-300 mb-2"
                style={{ fontFamily: "'Chewy', cursive" }}
              >
                🗳️ Голосование
              </h2>
              <p className="text-blue-200">Твой голос влияет на наш эфир!</p>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((pollId) => (
                <div key={pollId} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <PollBlock pollId={pollId} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ГАЛЕРЕЯ */}
        {activeSection === "gallery" && (
          <section>
            <div className="text-center mb-8">
              <h2
                className="text-4xl font-bold text-yellow-300 mb-2"
                style={{ fontFamily: "'Chewy', cursive" }}
              >
                📸 Фотогалерея
              </h2>
              <p className="text-blue-200">Фотографии слушателей со всех времён года</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <GalleryBlock season={activeSeason !== "all" ? activeSeason : undefined} />
            </div>
          </section>
        )}

        {/* КОММЕНТАРИИ */}
        {activeSection === "comments" && (
          <section className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className="text-4xl font-bold text-yellow-300 mb-2"
                style={{ fontFamily: "'Chewy', cursive" }}
              >
                💬 Комментарии
              </h2>
              <p className="text-blue-200">Общайтесь, делитесь пожеланиями!</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <CommentsBlock season={activeSeason !== "all" ? activeSeason : undefined} />
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-10 text-center">
          <img
            src="https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/files/1f02be02-38d9-471c-a1ee-03c4213489f6.jpg"
            alt="Адвент дверь"
            className="w-20 h-20 mx-auto rounded-2xl object-cover border border-white/20 mb-4"
          />
          <h3
            className="text-2xl font-bold text-yellow-300 mb-2"
            style={{ fontFamily: "'Chewy', cursive" }}
          >
            Новый год круглый год
          </h3>
          <p className="text-white/60 text-sm mb-6">Твоя любимая радиостанция — с тобой в любое время года!</p>
          <div className="flex justify-center gap-6">
            {["❄️", "🌸", "☀️", "🍂"].map((emoji, i) => (
              <span key={i} className="text-2xl hover:scale-125 transition-transform cursor-default select-none">
                {emoji}
              </span>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-6">© 2025 Радиостанция. Акция «Новый год круглый год»</p>
        </div>
      </footer>
    </div>
  );
}