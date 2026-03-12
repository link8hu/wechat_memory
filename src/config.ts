import path from "node:path";
import os from "node:os";
import { Platform } from "./types.js";

export function defaultInputPath(platform: Platform): string {
  const home = os.homedir();
  if (platform === "desktop") {
    if (process.platform === "darwin") {
      return path.join(
        home,
        "Library",
        "Containers",
        "com.tencent.xinWeChat",
        "Data",
        "Documents",
        "xwechat_files"
      );
    }
    return path.join(home, "Documents", "WeChat Files");
  }

  if (platform === "ios") {
    return path.join(home, "WeChatBackup", "iTunes", "Documents");
  }

  return path.join(home, "WeChatBackup", "Android", "db_storage");
}
