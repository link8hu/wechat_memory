# WeChat Memory Export 📝

**微信聊天记录导出 + AI 回忆整理工具**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)

> 💡 **不只是导出，更是回忆的整理者**
> 
> 基于 AI 大模型，将冰冷的聊天记录变成温暖的回忆故事

---

## 🎯 项目定位

### ❌ 我们不是
- 又一个微信导出工具
- 简单的聊天记录查看器
- 商业化的 SaaS 服务

### ✅ 我们是
- **AI 驱动的回忆整理工具** - 让 AI 帮你总结、分析、讲故事
- **100% 开源免费** - 完全免费，使用用户自己的 AI API Key
- **OpenClaw Skill** - 深度集成到 OpenClaw 生态
- **隐私优先** - 所有数据本地处理，不上传云端

---

## 🌟 核心功能

### 1️⃣ 多平台导出
- ✅ iOS (iTunes 备份)
- ✅ Android (需 Root 或模拟器)
- ✅ 电脑版微信 (Windows/macOS)

### 2️⃣ AI 智能整理
- 📝 **智能总结** - AI 帮你总结重要时刻
- 💕 **情感分析** - 分析聊天中的情感变化
- 📖 **故事生成** - 基于聊天记录创作故事
- 📊 **数据洞察** - 聊天习惯、关键词、里程碑

### 3️⃣ 回忆网站
- 🎨 **自动生成** - 一键生成精美网站
- 📱 **响应式** - 完美适配手机/平板/电脑
- 🎭 **多主题** - 多种风格模板可选
- 🔒 **本地部署** - 完全掌控自己的数据

---

## 🚀 快速开始

### 前置要求

- Node.js 18+
- OpenClaw 已安装
- AI API Key (推荐使用自己的)
  - OpenAI / Claude / 通义千问 / Kimi / 智谱等

### 安装

```bash
# 克隆项目
git clone https://github.com/link8hu/wechat_memory.git
cd wechat_memory

# 安装依赖
npm install

# 配置 AI (使用你自己的 API Key)
export OPENAI_API_KEY="sk-..."
# 或其他 AI 提供商
```

### 使用

#### 作为 OpenClaw Skill

```bash
# 在 OpenClaw 中调用
openclaw skill run wechat-export --contact <联系人>

# 导出并 AI 整理
openclaw skill run wechat-export \
  --export \
  --ai-summary \
  --generate-website
```

#### 独立使用

```bash
# 导出聊天记录
npm run export -- --contact "TA"

# AI 总结整理
npm run ai:summary -- --output summary.md

# 生成回忆网站
npm run website:generate -- --template love-story
```

---

## 🛠️ 技术架构

```
┌─────────────────────────────────────────────────────────┐
│              WeChat Memory Export                        │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
   ┌────────┐      ┌──────────┐      ┌──────────┐
   │ 导出层 │      │  AI 层    │      │ 展示层   │
   │        │      │          │      │          │
   │ • iOS  │      │ • 总结   │      │ • 时间线 │
   │ • 安卓 │      │ • 情感   │      │ • 故事   │
   │ • 电脑 │      │ • 洞察   │      │ • 数据   │
   └────────┘      └──────────┘      └──────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ↓
                  ┌──────────────┐
                  │  回忆网站    │
                  │  (自动生成)  │
                  └──────────────┘
```

### 技术栈

- **后端**: Node.js + TypeScript
- **AI**: 支持多种大模型 (OpenAI/Claude/通义千问/Kimi/智谱)
- **前端**: Vue.js 3 + TailwindCSS
- **数据库**: SQLite (微信原生格式)
- **部署**: 静态网站，可部署到任意平台

---

## 📁 项目结构

```
wechat_memory/
├── skills/                    # OpenClaw Skill
│   └── wechat-export/
│       ├── SKILL.md           # Skill 说明
│       ├── exporter/          # 导出模块
│       │   ├── ios.ts         # iOS 导出
│       │   ├── android.ts     # 安卓导出
│       │   └── desktop.ts     # 电脑版导出
│       ├── ai/
│       │   ├── summary.ts     # AI 总结
│       │   ├── emotion.ts     # 情感分析
│       │   ├── story.ts       # 故事生成
│       │   └── insight.ts     # 数据洞察
│       └── website/
│           ├── generator.ts   # 网站生成
│           └── templates/     # 网站模板
├── src/                       # 源代码
├── examples/                  # 示例数据
├── docs/                      # 文档
│   ├── usage.md              # 使用指南
│   ├── ai-setup.md           # AI 配置
│   └── deployment.md         # 部署指南
└── package.json              # 项目配置
```

---

## 🔒 隐私与安全

### 我们的承诺

- ✅ **100% 本地处理** - 所有数据在你的电脑上处理
- ✅ **不上传云端** - 不会将你的聊天记录发送到我们的服务器
- ✅ **使用自己的 AI Key** - 你完全掌控 API 调用
- ✅ **开源可审计** - 代码完全公开，随时可审查

### 数据安全

```
你的电脑 → 导出工具 → AI API → 回忆网站
    ↓          ↓          ↓         ↓
  完全掌控   本地运行   你的 Key   本地部署
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发环境设置

```bash
# Fork 项目
git clone https://github.com/yourusername/wechat_memory.git
cd wechat_memory

# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 运行测试
npm test
```

### 贡献方向

- 🐛 修复 Bug
- ✨ 新增功能
- 📖 完善文档
- 🎨 改进 UI
- 🌍 国际化

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

**完全免费，可商用，只需保留原作者声明**

---

## 💡 灵感来源

这个项目源于一个简单的问题：

> "如果有一天，我们想用 AI 回顾我们的聊天记录，
> 不是冷冰冰的数据，而是有温度的回忆，
> 那会是什么样子？"

我们希望这个工具能帮你：
- 记录重要的时刻
- 发现被遗忘的美好
- 用 AI 的视角重新理解你们的故事

---

## 📮 联系方式

- 项目地址：https://github.com/link8hu/wechat_memory
- 问题反馈：https://github.com/link8hu/wechat_memory/issues
- 讨论区：https://github.com/link8hu/wechat_memory/discussions

---

**Made with ❤️ by OpenClaw Community**

*让 AI 帮你保存最珍贵的回忆*
