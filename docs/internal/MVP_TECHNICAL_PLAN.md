# MVP Technical Plan

## 1) Reference Project Analysis

Based on collected reports:

- `BlueMatthew/WechatExporter`: strong C++ parser/template pipeline, complete message-type handling, iTunes backup path strategy, HTML template rendering and incremental export ideas.
- `hicccc77/WeFlow`: modern TypeScript architecture, adapter/service separation, worker-based heavy tasks, local-first processing, strong export and report patterns.

Key takeaway for this repo:

1. Use a **unified normalized schema** so iOS/Android/Desktop share one core pipeline.
2. Keep export pipeline local: `ingest -> normalize -> ai(optional) -> render`.
3. Separate platform adapters from website rendering and AI processing.

## 2) MVP Scope

MVP must satisfy:

- Export WeChat records for `ios|android|desktop` inputs.
- Support text/image/voice message categories.
- Produce JSON export and static HTML memory website (timeline + stats + theme).
- Support AI summarize/emotion/story via user API key.
- Support OpenClaw skill integration.

MVP input contract:

- User provides readable WeChat message DB artifact (single `.db` or `db_storage/message/message_*.db` tree).
- Tool does not upload chat data; all processing stays local.

## 3) Module Design

- `src/exporters/*`: platform adapters and SQLite extraction.
- `src/ai/*`: AI provider and summary pipeline.
- `src/website/*`: HTML + JSON generation.
- `src/cli.ts`: orchestrates full flow.
- `skills/wechat-export/SKILL.md`: OpenClaw integration contract.

## 4) Acceptance Criteria

1. CLI supports `--platform ios|android|desktop` and runs end-to-end.
2. Export JSON includes normalized contacts/conversations/messages.
3. Text/image/voice messages are classified in output.
4. `output/website/index.html` and `output/website/data/messages.json` are generated.
5. `--ai` uses `OPENAI_API_KEY` to generate summary data.
