import path from "node:path";
import fs from "fs-extra";
import { WebsiteInput } from "../types.js";

function formatTime(ts: number): string {
  return new Date(ts).toLocaleString("zh-CN", { hour12: false });
}

function stats(messages: WebsiteInput["bundle"]["messages"]): { total: number; text: number; image: number; voice: number } {
  let text = 0;
  let image = 0;
  let voice = 0;
  for (const m of messages) {
    if (m.type === "text") {
      text += 1;
    } else if (m.type === "image") {
      image += 1;
    } else if (m.type === "voice") {
      voice += 1;
    }
  }
  return { total: messages.length, text, image, voice };
}

function renderHtml(input: WebsiteInput): string {
  const s = stats(input.bundle.messages);
  const rows = input.bundle.messages
    .slice(0, 1000)
    .map(
      (m) =>
        `<div class="msg"><div class="time">${formatTime(m.timestamp)}</div><div class="body"><b>${m.sender}</b> ${m.content || "[媒体消息]"}</div></div>`
    )
    .join("\n");

  const theme =
    input.theme === "warm"
      ? { bg: "#fff8f0", card: "#ffffff", text: "#3b2f2f" }
      : { bg: "#f5f7fb", card: "#ffffff", text: "#1f2937" };

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WeChat Memory</title>
  <style>
    :root { --bg: ${theme.bg}; --card: ${theme.card}; --text: ${theme.text}; }
    body { margin: 0; font-family: "Noto Sans SC", "PingFang SC", sans-serif; background: var(--bg); color: var(--text); }
    .wrap { max-width: 960px; margin: 0 auto; padding: 24px; }
    .card { background: var(--card); border-radius: 16px; padding: 16px; margin-bottom: 16px; box-shadow: 0 6px 24px rgba(0,0,0,0.06); }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .metric { padding: 12px; border-radius: 12px; background: #f8fafc; }
    .msg { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    .time { font-size: 12px; opacity: 0.7; }
    @media (max-width: 700px) { .grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>回忆时间线</h1>
      <p>平台: ${input.bundle.platform}</p>
      ${input.ai ? `<p><b>AI 总结：</b>${input.ai.summary}</p>` : ""}
    </div>

    <div class="card">
      <h2>统计</h2>
      <div class="grid">
        <div class="metric">总消息: ${s.total}</div>
        <div class="metric">文字: ${s.text}</div>
        <div class="metric">图片: ${s.image}</div>
        <div class="metric">语音: ${s.voice}</div>
      </div>
    </div>

    <div class="card">
      <h2>时间线（最多展示 1000 条）</h2>
      ${rows}
    </div>
  </div>
</body>
</html>`;
}

export async function generateWebsite(input: WebsiteInput, outputDir: string): Promise<void> {
  await fs.ensureDir(outputDir);
  await fs.ensureDir(path.join(outputDir, "data"));

  await fs.writeJson(path.join(outputDir, "data", "messages.json"), input.bundle, { spaces: 2 });
  await fs.writeJson(path.join(outputDir, "data", "ai.json"), input.ai ?? null, { spaces: 2 });
  await fs.writeFile(path.join(outputDir, "index.html"), renderHtml(input), "utf8");
}
