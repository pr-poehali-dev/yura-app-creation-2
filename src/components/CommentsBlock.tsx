import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getComments, addComment } from "@/lib/api";
import { toast } from "sonner";

interface Comment {
  id: number;
  author_name: string;
  content: string;
  season: string;
  created_at: string;
}

export default function CommentsBlock({ season, compact }: { season?: string; compact?: boolean }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getComments(season).then((data) => setComments(data.comments || []));
  }, [season]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await addComment(name || "Аноним", text, season);
      if (res.success) {
        const newComment: Comment = {
          id: res.id,
          author_name: name || "Аноним",
          content: text,
          season: season || "",
          created_at: res.created_at,
        };
        setComments([newComment, ...comments]);
        setText("");
        setName("");
        setShowForm(false);
        toast.success("Комментарий добавлен!");
      }
    } finally {
      setLoading(false);
    }
  };

  const displayComments = compact ? comments.slice(0, 3) : comments;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground text-sm">Комментарии {comments.length > 0 && `(${comments.length})`}</h4>
        <Button size="sm" variant="outline" onClick={() => setShowForm(!showForm)}>
          + Написать
        </Button>
      </div>

      {showForm && (
        <div className="space-y-2 p-3 bg-muted/30 rounded-xl border border-border">
          <Input
            placeholder="Твоё имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-card border-border"
          />
          <Textarea
            placeholder="Напиши что-нибудь..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="bg-card border-border"
          />
          <Button onClick={handleSubmit} disabled={loading || !text.trim()} size="sm" className="bg-primary">
            {loading ? "Отправляю..." : "Отправить"}
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {displayComments.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-2">Будь первым!</p>
        )}
        {displayComments.map((c) => (
          <div key={c.id} className="p-3 bg-muted/20 rounded-xl border border-border/50">
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-accent text-sm">{c.author_name}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(c.created_at).toLocaleDateString("ru-RU")}
              </span>
            </div>
            <p className="text-foreground text-sm">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
