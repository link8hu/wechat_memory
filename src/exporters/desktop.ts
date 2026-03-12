import { Exporter } from "./base.js";
import { exportFromSQLite } from "./sqlite-reader.js";

export const desktopExporter: Exporter = {
  platform: "desktop",
  run(sourcePath) {
    return exportFromSQLite("desktop", sourcePath);
  },
};
