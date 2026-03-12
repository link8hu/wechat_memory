import { ExportBundle, Platform } from "../types.js";

export interface Exporter {
  platform: Platform;
  run(sourcePath: string): ExportBundle;
}
