import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getQuiz, submitQuiz } from "@/lib/api";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_option: number;
}

export default function QuizBlock({ quizId }: { quizId: number }) {
  const [quiz, setQuiz] = useState<{ title: string } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuiz(quizId).then((data) => {
      setQuiz(data.quiz);
      setQuestions(data.questions || []);
      setLoading(false);
    });
  }, [quizId]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct_option) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = async () => {
    if (current + 1 >= questions.length) {
      await submitQuiz(quizId, score + (selected === questions[current].correct_option ? 1 : 0));
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  if (loading) return <div className="text-center py-4 text-muted-foreground">Загружаю...</div>;
  if (!questions.length) return <div className="text-muted-foreground">Вопросов пока нет</div>;

  if (finished) {
    const finalScore = score;
    const total = questions.length;
    return (
      <div className="text-center space-y-4 py-4">
        <div className="text-5xl">{finalScore === total ? "🏆" : finalScore >= total / 2 ? "🎉" : "😅"}</div>
        <h3 className="text-xl font-bold text-accent">Результат: {finalScore}/{total}</h3>
        <p className="text-muted-foreground">
          {finalScore === total ? "Идеально! Ты настоящий знаток!" : finalScore >= total / 2 ? "Отличный результат!" : "Попробуй ещё раз!"}
        </p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{quiz?.title}</span>
        <span>{current + 1}/{questions.length}</span>
      </div>
      <h3 className="font-bold text-lg text-foreground">{q.question}</h3>
      <div className="grid gap-2">
        {q.options.map((opt, idx) => {
          let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
          if (selected !== null) {
            if (idx === q.correct_option) variant = "default";
            else if (idx === selected) variant = "destructive";
          }
          return (
            <Button
              key={idx}
              variant={variant}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null && idx !== selected && idx !== q.correct_option}
            >
              {opt}
            </Button>
          );
        })}
      </div>
      {selected !== null && (
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90">
          {current + 1 >= questions.length ? "Завершить" : "Следующий вопрос"}
        </Button>
      )}
    </div>
  );
}
