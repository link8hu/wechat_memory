# wechat-export

OpenClaw Skill for local-first WeChat memory export.

## Usage

```bash
openclaw skill run wechat-export --source weflow --platform desktop --output "./output"
```

## Command Mapping

The skill should invoke:

```bash
npm run dev -- --platform <ios|android|desktop> --input <path> --output <path> [--ai] [--theme warm]
npm run dev -- --source weflow --platform desktop --output <path> [--talker <wxid>] [--ai] [--theme warm]
```

## Requirements

- Local processing only.
- Use user-provided AI key (`OPENAI_API_KEY`) when `--ai` is enabled.
- Output `export.json` and static website files.
