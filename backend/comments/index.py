"""Комментарии: получение и добавление комментариев"""
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
        season = params.get("season")
        limit = int(params.get("limit", 20))

        if season:
            cur.execute(
                "SELECT id, author_name, content, season, created_at FROM comments WHERE is_approved = true AND season = %s ORDER BY created_at DESC LIMIT %s",
                (season, limit)
            )
        else:
            cur.execute(
                "SELECT id, author_name, content, season, created_at FROM comments WHERE is_approved = true ORDER BY created_at DESC LIMIT %s",
                (limit,)
            )
        rows = cur.fetchall()
        comments = [{
            "id": r[0],
            "author_name": r[1],
            "content": r[2],
            "season": r[3],
            "created_at": str(r[4]),
        } for r in rows]

        conn.close()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"comments": comments}, ensure_ascii=False),
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        author_name = (body.get("author_name") or "Аноним").strip()[:100]
        content = (body.get("content") or "").strip()[:500]
        season = body.get("season")

        if not content:
            conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Content required"})}

        cur.execute(
            "INSERT INTO comments (author_name, content, season) VALUES (%s, %s, %s) RETURNING id, created_at",
            (author_name, content, season),
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"success": True, "id": row[0], "created_at": str(row[1])}, ensure_ascii=False),
        }

    conn.close()
    return {"statusCode": 405, "headers": headers, "body": "Method Not Allowed"}
