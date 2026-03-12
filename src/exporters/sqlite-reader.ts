import path from "node:path";
import fs from "fs-extra";
import Database from "better-sqlite3";
import { ExportBundle, Message, Platform } from "../types.js";

function detectMessageDbs(rootPath: string): string[] {
  const candidates: string[] = [];
  const direct = path.join(rootPath, "message");
  if (fs.existsSync(direct)) {
    for (const entry of fs.readdirSync(direct)) {
      if (entry.startsWith("message_") && entry.endsWith(".db")) {
        candidates.push(path.join(direct, entry));
      }
    }
  }

  const walk = fs.readdirSync(rootPath, { withFileTypes: true });
  for (const entry of walk) {
    if (entry.isDirectory() && entry.name === "db_storage") {
      candidates.push(...detectMessageDbs(path.join(rootPath, entry.name)));
    }
  }

  return Array.from(new Set(candidates));
}

function mapType(typeValue: number): Message["type"] {
  if (typeValue === 1) {
    return "text";
  }
  if (typeValue === 3) {
    return "image";
  }
  if (typeValue === 34) {
    return "voice";
  }
  return "unknown";
}

export function exportFromSQLite(platform: Platform, sourcePath: string): ExportBundle {
  const dbFiles = sourcePath.endsWith(".db") ? [sourcePath] : detectMessageDbs(sourcePath);
  if (dbFiles.length === 0) {
    throw new Error(`No message database found under: ${sourcePath}`);
  }

  const messages: Message[] = [];
  for (const dbPath of dbFiles) {
    const db = new Database(dbPath, { readonly: true });
    try {
      const rows = db
        .prepare(
          "SELECT MsgSvrID, Type, IsSender, CreateTime, StrTalker, StrContent FROM MSG ORDER BY CreateTime"
        )
        .all() as Array<{
          MsgSvrID: number;
          Type: number;
          IsSender: number;
          CreateTime: number;
          StrTalker: string;
          StrContent: string;
        }>;

      for (const row of rows) {
        const mappedType = mapType(row.Type);
        const message: Message = {
          id: String(row.MsgSvrID),
          conversationId: row.StrTalker,
          sender: row.IsSender === 1 ? "self" : "peer",
          timestamp: row.CreateTime * 1000,
          type: mappedType,
          content: row.StrContent ?? "",
        };

        if (mappedType === "image") {
          message.media = { kind: "image", path: "image/unknown.jpg" };
        }
        if (mappedType === "voice") {
          message.media = { kind: "voice", path: "voice/unknown.mp3" };
        }

        messages.push(message);
      }
    } finally {
      db.close();
    }
  }

  const conversationIds = Array.from(new Set(messages.map((m) => m.conversationId)));
  const conversations = conversationIds.map((id) => ({ id, displayName: id }));
  const contacts = conversationIds.map((id) => ({ id, displayName: id }));

  return {
    platform,
    sourcePath,
    conversations,
    contacts,
    messages: messages.sort((a, b) => a.timestamp - b.timestamp),
    generatedAt: new Date().toISOString(),
  };
}
