# WeChat Memory Export 📝

**微信聊天记录导出 + AI 回忆整理工具**

> 💡 不只是导出，更是回忆的整理者

---

## 🚀 5 分钟快速开始

### 第一步：安装 WeFlow

1. 下载 WeFlow：https://weflow.io/
2. 安装并登录微信

### 第二步：开启 API 服务

1. 打开 WeFlow
2. 进入 **设置** → **API 服务**
3. 点击 **启动服务**（默认地址：`127.0.0.1:5031`）

### 第三步：运行导出命令

```bash
# 进入项目目录
cd wechat-memory-export

# 安装依赖（首次运行）
npm install

# 导出所有聊天记录
npm run dev -- --source weflow --platform desktop --output ./output
```

### 第四步：查看结果

打开 `output/website/index.html` 文件，在浏览器中查看你的回忆网站！

---

## 📋 常用命令

```bash
# 导出特定联系人（替换 wxid_xxx）
npm run dev -- --source weflow --talker wxid_xxx --output ./output

# 带 AI 总结（需要 API Key）
OPENAI_API_KEY="sk-xxx" npm run dev -- --source weflow --platform desktop --output ./output --ai

# 更换主题（classic 或 warm）
npm run dev -- --source weflow --platform desktop --output ./output --theme classic
```

---

## 📁 输出文件说明

| 文件 | 说明 |
|------|------|
| `output/export.json` | 导出的原始聊天记录数据 |
| `output/website/index.html` | 生成的回忆网站（直接用浏览器打开） |
| `output/website/data/messages.json` | 网站用的消息数据 |
| `output/website/data/ai.json` | AI 总结/情感分析（如果启用了 --ai） |

---

## ❓ 常见问题

### Q: 需要连接手机吗？
**A:** 不需要！直接读取电脑版微信的数据。

### Q: 必须保持电脑开机吗？
**A:** 是的，导出时需要：
- 电脑开着
- 微信登录着
- WeFlow 运行着

### Q: 数据安全吗？
**A:** 完全本地处理，不上传任何数据到云端。AI 功能是可选的，使用你自己的 API Key。

### Q: 支持哪些平台？
**A:** 目前支持电脑版微信（Windows/macOS）。iOS 和 Android 版本开发中。

### Q: AI 总结需要什么？
**A:** 需要一个大模型 API Key，支持：
- OpenAI
- Claude
- 通义千问
- Kimi
- 智谱 AI

---

## 📖 更多文档

- **用户指南** → [docs/user/USER_GUIDE.md](docs/user/USER_GUIDE.md)
- **AI 配置指南** → [docs/user/AI_CONFIG_GUIDE.md](docs/user/AI_CONFIG_GUIDE.md)

---

## 🛠️ 开发者

技术文档和架构说明在 [docs/internal/](docs/internal/) 目录。

---

**Made with ❤️** | [GitHub](https://github.com/link8hu/wechat_memory)
