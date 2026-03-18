"""Адвент-календарь: получение ячеек и данных для открытых ячеек"""
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

    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT cell_number, title, content, content_type, content_id, season, is_unlocked, unlock_date
        FROM advent_cells
        ORDER BY cell_number
    """)
    rows = cur.fetchall()

    cells = []
    for r in rows:
        cells.append({
            "cell_number": r[0],
            "title": r[1],
            "content": r[2],
            "content_type": r[3],
            "content_id": r[4],
            "season": r[5],
            "is_unlocked": r[6],
            "unlock_date": str(r[7]) if r[7] else None,
        })

    conn.close()
    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"cells": cells}, ensure_ascii=False),
    }
