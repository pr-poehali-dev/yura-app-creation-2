import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QuizBlock from "@/components/QuizBlock";
import PollBlock from "@/components/PollBlock";
import GalleryBlock from "@/components/GalleryBlock";
import CommentsBlock from "@/components/CommentsBlock";

interface Cell {
  cell_number: number;
  title: string;
  content: string;
  content_type: string;
  content_id: number | null;
  season: string;
  is_unlocked: boolean;
}

const SEASON_STYLES: Record<string, { bg: string; border: string; emoji: string; gradient: string }> = {
  winter: { bg: "from-blue-900/80 to-blue-700/60", border: "border-blue-400", emoji: "❄️", gradient: "bg-gradient-to-br from-blue-800 to-indigo-900" },
  spring: { bg: "from-pink-800/80 to-rose-600/60", border: "border-pink-400", emoji: "🌸", gradient: "bg-gradient-to-br from-pink-700 to-rose-800" },
  summer: { bg: "from-yellow-700/80 to-orange-600/60", border: "border-yellow-400", emoji: "☀️", gradient: "bg-gradient-to-br from-yellow-600 to-orange-700" },
  autumn: { bg: "from-orange-800/80 to-red-700/60", border: "border-orange-400", emoji: "🍂", gradient: "bg-gradient-to-br from-orange-700 to-red-800" },
};

export default function AdventCell({ cell: rawCell }: { cell: Record<string, unknown> }) {
  const cell = rawCell as Cell;
  const [open, setOpen] = useState(false);
  const style = SEASON_STYLES[cell.season] || SEASON_STYLES.winter;

  return (
    <>
      <button
        onClick={() => cell.is_unlocked && setOpen(true)}
        className={`
          relative w-full aspect-square rounded-2xl border-2 ${style.border}
          bg-gradient-to-br ${style.bg} backdrop-blur-sm
          transition-all duration-300 group overflow-hidden
          ${cell.is_unlocked
            ? "hover:scale-105 hover:shadow-lg hover:shadow-white/10 cursor-pointer"
            : "opacity-50 cursor-not-allowed grayscale"}
        `}
      >
        {!cell.is_unlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl">🔒</span>
          </div>
        )}
        {cell.is_unlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 gap-1">
            <span className="text-2xl">{style.emoji}</span>
            <span className="text-white font-bold text-lg leading-tight">{cell.cell_number}</span>
          </div>
        )}
        <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none group-hover:border-white/40 transition-colors" />
        {cell.is_unlocked && (
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-chewy text-accent">{cell.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {cell.content_type === "text" && (
              <p className="text-foreground leading-relaxed">{cell.content}</p>
            )}
            {cell.content_type === "quiz" && cell.content_id && (
              <QuizBlock quizId={cell.content_id} />
            )}
            {cell.content_type === "poll" && cell.content_id && (
              <PollBlock pollId={cell.content_id} />
            )}
            {cell.content_type === "gallery" && (
              <>
                <p className="text-foreground leading-relaxed">{cell.content}</p>
                <GalleryBlock season={cell.season} compact />
              </>
            )}
            {cell.content_type === "text" && (
              <CommentsBlock season={cell.season} compact />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}