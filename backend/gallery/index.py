"""Фотогалерея: получение фото и загрузка новых"""
import json
import os
import base64
import uuid
import psycopg2
import boto3


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


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
        limit = int(params.get("limit", 24))

        if season:
            cur.execute(
                "SELECT id, author_name, caption, photo_url, season, created_at FROM gallery_photos WHERE is_approved = true AND season = %s ORDER BY created_at DESC LIMIT %s",
                (season, limit)
            )
        else:
            cur.execute(
                "SELECT id, author_name, caption, photo_url, season, created_at FROM gallery_photos WHERE is_approved = true ORDER BY created_at DESC LIMIT %s",
                (limit,)
            )
        rows = cur.fetchall()
        photos = [{
            "id": r[0],
            "author_name": r[1],
            "caption": r[2],
            "photo_url": r[3],
            "season": r[4],
            "created_at": str(r[5]),
        } for r in rows]

        conn.close()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"photos": photos}, ensure_ascii=False),
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        author_name = (body.get("author_name") or "Аноним").strip()[:100]
        caption = (body.get("caption") or "").strip()[:200]
        season = body.get("season", "winter")
        photo_data = body.get("photo_data")
        content_type = body.get("content_type", "image/jpeg")

        if not photo_data:
            conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Photo required"})}

        if "," in photo_data:
            photo_data = photo_data.split(",", 1)[1]

        image_bytes = base64.b64decode(photo_data)
        ext = "jpg" if "jpeg" in content_type else content_type.split("/")[-1]
        key = f"gallery/{uuid.uuid4()}.{ext}"

        s3 = get_s3()
        s3.put_object(Bucket="files", Key=key, Body=image_bytes, ContentType=content_type)

        project_id = os.environ["AWS_ACCESS_KEY_ID"]
        photo_url = f"https://cdn.poehali.dev/projects/{project_id}/files/{key}"

        cur.execute(
            "INSERT INTO gallery_photos (author_name, caption, photo_url, season) VALUES (%s, %s, %s, %s) RETURNING id",
            (author_name, caption, photo_url, season),
        )
        photo_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"success": True, "id": photo_id, "photo_url": photo_url}, ensure_ascii=False),
        }

    conn.close()
    return {"statusCode": 405, "headers": headers, "body": "Method Not Allowed"}
