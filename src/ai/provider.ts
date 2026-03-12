import { ExportBundle, AiSummary } from "../types.js";

export interface AiProvider {
  summarize(bundle: ExportBundle): Promise<AiSummary>;
}
