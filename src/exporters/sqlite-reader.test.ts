import path from "node:path";
import os from "node:os";
import fs from "fs-extra";
import Database from "better-sqlite3";
import { describe, expect, it } from "vitest";
import { exportFromSQLite } from "./sqlite-reader.js";

describe("exportFromSQLite", () => {
  it("reads text/image/voice records", async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "wx-export-"));
    const dbPath = path.join(tempDir, "message_0.db");
    const db = new Database(dbPath);
    db.exec(
      "CREATE TABLE MSG (MsgSvrID INTEGER, Type INTEGER, IsSender INTEGER, CreateTime INTEGER, StrTalker TEXT, StrContent TEXT)"
    );
    const insert = db.prepare("INSERT INTO MSG VALUES (?, ?, ?, ?, ?, ?)");
    insert.run(1, 1, 1, 1710000000, "wxid_a", "hello");
    insert.run(2, 3, 0, 1710000100, "wxid_a", "img");
    insert.run(3, 34, 1, 1710000200, "wxid_a", "voice");
    db.close();

    const bundle = exportFromSQLite("desktop", dbPath);
    expect(bundle.messages).toHaveLength(3);
    expect(bundle.messages[0]?.type).toBe("text");
    expect(bundle.messages[1]?.type).toBe("image");
    expect(bundle.messages[2]?.type).toBe("voice");
  });
});
