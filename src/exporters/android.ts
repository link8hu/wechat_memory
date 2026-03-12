import { Exporter } from "./base.js";
import { exportFromSQLite } from "./sqlite-reader.js";

export const androidExporter: Exporter = {
  platform: "android",
  run(sourcePath) {
    return exportFromSQLite("android", sourcePath);
  },
};
