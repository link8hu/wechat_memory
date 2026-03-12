import { AiSummary, ExportBundle } from "../types.js";
import { OpenAiProvider } from "./openai-provider.js";

export async function runAi(bundle: ExportBundle, apiKey?: string): Promise<AiSummary | undefined> {
  if (!apiKey) {
    return undefined;
  }
  const provider = new OpenAiProvider(apiKey);
  return provider.summarize(bundle);
}
