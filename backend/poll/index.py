"""Голосования: получение опросов, голосование и просмотр результатов"""
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
        poll_id = params.get("poll_id")

        if poll_id:
            cur.execute("SELECT id, question, season, options FROM polls WHERE id = %s", (int(poll_id),))
            p = cur.fetchone()
            if not p:
                conn.close()
                return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Poll not found"})}

            options = p[3]
            cur.execute(
                "SELECT option_index, COUNT(*) FROM poll_votes WHERE poll_id = %s GROUP BY option_index",
                (int(poll_id),)
            )
            vote_rows = cur.fetchall()
            votes = {str(r[0]): r[1] for r in vote_rows}
            total = sum(v for v in votes.values())

            results = []
            for i, opt in enumerate(options):
                count = votes.get(str(i), 0)
                results.append({
                    "option": opt,
                    "count": count,
                    "percent": round(count / total * 100) if total > 0 else 0,
                })

            conn.close()
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({
                    "poll": {"id": p[0], "question": p[1], "season": p[2]},
                    "results": results,
                    "total": total,
                }, ensure_ascii=False),
            }
        else:
            cur.execute("SELECT id, question, season, options FROM polls WHERE is_active = true ORDER BY id")
            polls = [{"id": r[0], "question": r[1], "season": r[2], "options": r[3]} for r in cur.fetchall()]
            conn.close()
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({"polls": polls}, ensure_ascii=False),
            }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        poll_id = body.get("poll_id")
        session_id = body.get("session_id", "anon")
        option_index = body.get("option_index")

        cur.execute(
            "INSERT INTO poll_votes (poll_id, session_id, option_index) VALUES (%s, %s, %s) ON CONFLICT (poll_id, session_id) DO UPDATE SET option_index = EXCLUDED.option_index",
            (poll_id, session_id, option_index),
        )
        conn.commit()

        cur.execute(
            "SELECT option_index, COUNT(*) FROM poll_votes WHERE poll_id = %s GROUP BY option_index",
            (poll_id,)
        )
        vote_rows = cur.fetchall()
        votes = {str(r[0]): r[1] for r in vote_rows}
        total = sum(v for v in votes.values())

        cur.execute("SELECT options FROM polls WHERE id = %s", (poll_id,))
        options = cur.fetchone()[0]
        results = []
        for i, opt in enumerate(options):
            count = votes.get(str(i), 0)
            results.append({
                "option": opt,
                "count": count,
                "percent": round(count / total * 100) if total > 0 else 0,
            })

        conn.close()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"success": True, "results": results, "total": total}, ensure_ascii=False),
        }

    conn.close()
    return {"statusCode": 405, "headers": headers, "body": "Method Not Allowed"}
