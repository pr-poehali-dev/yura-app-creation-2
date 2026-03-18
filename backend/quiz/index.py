"""Квизы: получение вопросов и сохранение результата"""
import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    method = event.get("httpMethod", "GET")
    conn = get_conn()
    cur = conn.cursor()

    if method == "GET":
        params = event.get("queryStringParameters") or {}
        quiz_id = params.get("quiz_id")

        if quiz_id:
            cur.execute("SELECT id, title, season FROM quizzes WHERE id = %s", (int(quiz_id),))
            q = cur.fetchone()
            if not q:
                conn.close()
                return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Quiz not found"})}

            cur.execute("""
                SELECT id, question, options, correct_option, position
                FROM quiz_questions WHERE quiz_id = %s ORDER BY position
            """, (int(quiz_id),))
            questions = []
            for r in cur.fetchall():
                questions.append({
                    "id": r[0],
                    "question": r[1],
                    "options": r[2],
                    "correct_option": r[3],
                    "position": r[4],
                })
            conn.close()
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({"quiz": {"id": q[0], "title": q[1], "season": q[2]}, "questions": questions}, ensure_ascii=False),
            }
        else:
            cur.execute("SELECT id, title, season FROM quizzes WHERE is_active = true ORDER BY id")
            quizzes = [{"id": r[0], "title": r[1], "season": r[2]} for r in cur.fetchall()]
            conn.close()
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({"quizzes": quizzes}, ensure_ascii=False),
            }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        quiz_id = body.get("quiz_id")
        session_id = body.get("session_id", "anon")
        score = body.get("score", 0)

        cur.execute(
            "INSERT INTO quiz_answers (quiz_id, session_id, score) VALUES (%s, %s, %s) RETURNING id",
            (quiz_id, session_id, score),
        )
        answer_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"success": True, "answer_id": answer_id}),
        }

    conn.close()
    return {"statusCode": 405, "headers": headers, "body": "Method Not Allowed"}
