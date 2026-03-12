import path from "node:path";
import fs from "fs-extra";
import dotenv from "dotenv";
import { Command } from "commander";
import { defaultInputPath } from "./config.js";
import { Platform } from "./types.js";
import { androidExporter } from "./exporters/android.js";
import { iosExporter } from "./exporters/ios.js";
import { desktopExporter } from "./exporters/desktop.js";
import { exportFromWeFlowApi } from "./exporters/weflow-api.js";
import { runAi } from "./ai/analysis.js";
import { generateWebsite } from "./website/generator.js";

dotenv.config();

function resolveExporter(platform: Platform) {
  if (platform === "ios") {
    return iosExporter;
  }
  if (platform === "android") {
    return androidExporter;
  }
  return desktopExporter;
}

const program = new Command();

program
  .name("wechat-memory-export")
  .description("Local-first WeChat memory export MVP")
  .option("-p, --platform <platform>", "ios|android|desktop", "desktop")
  .option("--source <source>", "native|weflow", "weflow")
  .option("-i, --input <path>", "input path for db_storage or message db file")
  .option("-o, --output <path>", "output directory", "./output")
  .option("--weflow-url <url>", "WeFlow API base URL", "http://127.0.0.1:5031")
  .option("--talker <id>", "optional WeFlow talker/session id")
  .option("--theme <theme>", "classic|warm", "warm")
  .option("--ai", "run AI summary/emotion/story")
  .action(async (opts: {
    platform: Platform;
    source: "native" | "weflow";
    input?: string;
    output: string;
    weflowUrl: string;
    talker?: string;
    theme: "classic" | "warm";
    ai?: boolean;
  }) => {
    const platform = opts.platform;
    if (!["ios", "android", "desktop"].includes(platform)) {
      throw new Error("platform must be ios|android|desktop");
    }

    let bundle;
    if (opts.source === "weflow") {
      bundle = await exportFromWeFlowApi({
        platform,
        baseUrl: opts.weflowUrl,
        talker: opts.talker,
      });
    } else {
      const sourcePath = opts.input ?? defaultInputPath(platform);
      const exporter = resolveExporter(platform);
      bundle = exporter.run(sourcePath);
    }

    const exportDir = path.resolve(opts.output);
    await fs.ensureDir(exportDir);
    await fs.writeJson(path.join(exportDir, "export.json"), bundle, { spaces: 2 });

    const aiResult = opts.ai ? await runAi(bundle, process.env.OPENAI_API_KEY) : undefined;
    const websiteDir = path.join(exportDir, "website");
    await generateWebsite({ bundle, ai: aiResult, theme: opts.theme }, websiteDir);

    process.stdout.write(`Export complete. JSON: ${path.join(exportDir, "export.json")}\n`);
    process.stdout.write(`Website: ${path.join(websiteDir, "index.html")}\n`);
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
