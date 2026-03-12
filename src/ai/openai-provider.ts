import OpenAI from "openai";
import { AiProvider } from "./provider.js";
import { AiSummary, ExportBundle } from "../types.js";

function buildPrompt(bundle: ExportBundle): string {
  const sample = bundle.messages.slice(0, 200);
  return [
    "You are analyzing WeChat conversation records.",
    "Generate output in Chinese.",
    "Return three sections: summary, emotion, story.",
    `Total messages: ${bundle.messages.length}`,
    `Conversations: ${bundle.conversations.length}`,
    "Sample messages:",
    ...sample.map((m) => `${new Date(m.timestamp).toISOString()} [${m.sender}] ${m.content}`),
  ].join("\n");
}

export class OpenAiProvider implements AiProvider {
  private readonly client: OpenAI;

  constructor(apiKey: string, private readonly model: string = "gpt-4o-mini") {
    this.client = new OpenAI({ apiKey });
  }

  async summarize(bundle: ExportBundle): Promise<AiSummary> {
    const content = buildPrompt(bundle);
    const response = await this.client.responses.create({
      model: this.model,
      input: [
        {
          role: "user",
          content,
        },
      ],
    });

    const text = response.output_text || "";
    const parts = text.split(/\n\n+/);
    return {
      summary: parts[0] ?? "",
      emotion: parts[1] ?? "",
      story: parts.slice(2).join("\n\n") || "",
    };
  }
}
