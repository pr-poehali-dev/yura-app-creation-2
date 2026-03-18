const ADVENT_URL = "https://functions.poehali.dev/eb90cee5-d8f7-4f4b-a473-1edbe4cb2319";
const QUIZ_URL = "https://functions.poehali.dev/28a0d6fe-8fe9-46df-a334-81d5bda1cd9e";
const POLL_URL = "https://functions.poehali.dev/6954b0f6-ee8b-4fa7-9070-0badc31479f7";
const COMMENTS_URL = "https://functions.poehali.dev/f8b6212c-527f-4caf-a667-277c2bdbef4f";
const GALLERY_URL = "https://functions.poehali.dev/83f924e3-c725-4f9e-93d8-98bdd605fd78";

function getSessionId(): string {
  let id = localStorage.getItem("session_id");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("session_id", id);
  }
  return id;
}

async function parseBody(res: Response) {
  const text = await res.text();
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === "string") return JSON.parse(parsed);
    return parsed;
  } catch {
    return text;
  }
}

export async function getAdventCells() {
  const res = await fetch(ADVENT_URL);
  return parseBody(res);
}

export async function getQuiz(quizId: number) {
  const res = await fetch(`${QUIZ_URL}?quiz_id=${quizId}`);
  return parseBody(res);
}

export async function submitQuiz(quizId: number, score: number) {
  const res = await fetch(QUIZ_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quiz_id: quizId, session_id: getSessionId(), score }),
  });
  return parseBody(res);
}

export async function getPolls() {
  const res = await fetch(POLL_URL);
  return parseBody(res);
}

export async function getPollResults(pollId: number) {
  const res = await fetch(`${POLL_URL}?poll_id=${pollId}`);
  return parseBody(res);
}

export async function vote(pollId: number, optionIndex: number) {
  const res = await fetch(POLL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ poll_id: pollId, session_id: getSessionId(), option_index: optionIndex }),
  });
  return parseBody(res);
}

export async function getComments(season?: string) {
  const url = season ? `${COMMENTS_URL}?season=${season}` : COMMENTS_URL;
  const res = await fetch(url);
  return parseBody(res);
}

export async function addComment(authorName: string, content: string, season?: string) {
  const res = await fetch(COMMENTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author_name: authorName, content, season }),
  });
  return parseBody(res);
}

export async function getPhotos(season?: string) {
  const url = season ? `${GALLERY_URL}?season=${season}` : GALLERY_URL;
  const res = await fetch(url);
  return parseBody(res);
}

export async function uploadPhoto(authorName: string, caption: string, photoData: string, contentType: string, season: string) {
  const res = await fetch(GALLERY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author_name: authorName, caption, photo_data: photoData, content_type: contentType, season }),
  });
  return parseBody(res);
}
