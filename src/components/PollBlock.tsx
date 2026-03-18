import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getPollResults, vote } from "@/lib/api";

interface PollResult {
  option: string;
  count: number;
  percent: number;
}

export default function PollBlock({ pollId }: { pollId: number }) {
  const [poll, setPoll] = useState<{ question: string } | null>(null);
  const [results, setResults] = useState<PollResult[]>([]);
  const [total, setTotal] = useState(0);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = `voted_poll_${pollId}`;
    if (localStorage.getItem(key)) setVoted(true);
    getPollResults(pollId).then((data) => {
      setPoll(data.poll);
      setResults(data.results || []);
      setTotal(data.total || 0);
      setLoading(false);
    });
  }, [pollId]);

  const handleVote = async (idx: number) => {
    const data = await vote(pollId, idx);
    setResults(data.results || []);
    setTotal(data.total || 0);
    setVoted(true);
    localStorage.setItem(`voted_poll_${pollId}`, "1");
  };

  if (loading) return <div className="text-center py-4 text-muted-foreground">Загружаю...</div>;

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-foreground">{poll?.question}</h3>
      {!voted ? (
        <div className="grid gap-2">
          {results.map((r, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="w-full justify-start h-auto py-3"
              onClick={() => handleVote(idx)}
            >
              {r.option}
            </Button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((r, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">{r.option}</span>
                <span className="text-accent font-bold">{r.percent}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
                  style={{ width: `${r.percent}%` }}
                />
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-right">Всего голосов: {total}</p>
        </div>
      )}
    </div>
  );
}
