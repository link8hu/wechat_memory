import { Exporter } from "./base.js";
import { exportFromSQLite } from "./sqlite-reader.js";

export const iosExporter: Exporter = {
  platform: "ios",
  run(sourcePath) {
    return exportFromSQLite("ios", sourcePath);
  },
};
