import http from "node:http";
import { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { exportFromWeFlowApi } from "./weflow-api.js";

let server: http.Server;
let baseUrl: string;

beforeAll(async () => {
  server = http.createServer((req, res) => {
    const url = req.url ?? "";
    if (url.startsWith("/health")) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }
    if (url.startsWith("/api/v1/sessions")) {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          sessions: [{ username: "wxid_demo", displayName: "Demo" }],
        })
      );
      return;
    }
    if (url.startsWith("/api/v1/contacts")) {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          contacts: [{ userName: "wxid_demo", nickName: "Demo Nick" }],
        })
      );
      return;
    }
    if (url.startsWith("/api/v1/messages")) {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          hasMore: false,
          meta: { ownerId: "wxid_me" },
          messages: [
            { sender: "wxid_me", timestamp: 1710000000000, type: 0, content: "hello" },
            { sender: "wxid_demo", timestamp: 1710000001000, type: 1, content: "[图片]", mediaPath: "http://x/image.jpg" },
            { sender: "wxid_demo", timestamp: 1710000002000, type: 2, content: "[语音]", mediaPath: "http://x/voice.mp3" },
          ],
        })
      );
      return;
    }

    res.statusCode = 404;
    res.end();
  });

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as AddressInfo;
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
});

describe("exportFromWeFlowApi", () => {
  it("loads sessions and maps text/image/voice", async () => {
    const bundle = await exportFromWeFlowApi({
      platform: "desktop",
      baseUrl,
    });

    expect(bundle.conversations).toHaveLength(1);
    expect(bundle.contacts).toHaveLength(1);
    expect(bundle.messages).toHaveLength(3);
    expect(bundle.messages[0]?.type).toBe("text");
    expect(bundle.messages[1]?.type).toBe("image");
    expect(bundle.messages[2]?.type).toBe("voice");
  });
});
