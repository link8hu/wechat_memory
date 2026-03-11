# WeChat Memory Export 📝

微信聊天记录导出工具 - 为"两个人的回忆"网站生成数据

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/yourusername/wechat-memory-export)](https://github.com/yourusername/wechat-memory-export)

## 🎯 项目目标

基于 GitHub 优秀开源项目，开发一个简单易用的微信聊天记录导出工具，用于生成"两个人的回忆"网站数据。

## 📚 参考项目

本项目借鉴了以下优秀开源项目：

| 项目 | Stars | 语言 | 特点 |
|------|-------|------|------|
| [BlueMatthew/WechatExporter](https://github.com/BlueMatthew/WechatExporter) | 7.7k | C++ | 跨平台，支持 iOS/Android |
| [hicccc77/WeFlow](https://github.com/hicccc77/WeFlow) | 4.6k | TypeScript | 年度报告，数据可视化 ⭐ |
| [tsycnh/WeChatExporter](https://github.com/tsycnh/WeChatExporter) | 1.5k | JavaScript | 快速导出查看 |
| [humiaozuzu/wechat-explorer](https://github.com/humiaozuzu/wechat-explorer) | 526 | Python | 分析工具 |

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- iTunes (iOS 用户)
- 微信电脑版 (可选)

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/wechat-memory-export.git
cd wechat-memory-export

# 安装依赖
npm install
```

### 使用

```bash
# 导出聊天记录
npm run export -- --contact <联系人/群聊>

# 生成网站数据
npm run generate -- --output ./website-data
```

## 📋 功能特性

- ✅ iTunes 备份解析
- ✅ 微信数据库解密
- ✅ 文字/图片/语音导出
- ✅ HTML 格式导出
- ✅ JSON 格式导出 (用于网站)
- ✅ 批量导出
- ✅ 增量导出
- 🔄 年度报告生成 (规划中)
- 🔄 数据可视化 (规划中)

## 🛠️ 技术栈

- **后端**: Node.js + SQLite
- **前端**: Vue.js 3 / React
- **数据库**: SQLite (微信原生)
- **导出格式**: HTML + JSON

## 📖 使用文档

### 方法 1: iOS 用户 (推荐)

1. 使用 iTunes 备份 iPhone 数据
2. 导出微信 Documents 文件夹
3. 运行工具解析数据

### 方法 2: Android 用户

1. Root 设备或使用模拟器
2. 提取微信数据库文件
3. 运行工具解析数据

### 方法 3: 电脑版微信

1. 登录电脑版微信
2. 提取本地数据库
3. 运行工具解析

## 📁 项目结构

```
wechat-memory-export/
├── src/                    # 源代码
│   ├── parser/            # 数据库解析
│   ├── decrypt/           # 解密模块
│   ├── exporter/          # 导出模块
│   └── cli/               # 命令行工具
├── docs/                   # 文档
│   ├── database-schema.md # 数据库结构
│   └── user-guide.md      # 用户指南
├── examples/               # 示例数据
├── tests/                  # 测试
└── package.json            # 项目配置
```

## 🔒 隐私与安全

- ✅ 所有数据本地处理
- ✅ 不上传任何数据到云端
- ✅ 开源代码，可审计
- ✅ 支持数据加密存储

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 💡 灵感来源

本项目灵感来自于 [hicccc77/WeFlow](https://github.com/hicccc77/WeFlow) 的年度报告功能，希望能帮助更多人保存和回顾珍贵的聊天记录。

## 📮 联系方式

- 项目地址：https://github.com/yourusername/wechat-memory-export
- 问题反馈：https://github.com/yourusername/wechat-memory-export/issues

---

**Made with ❤️ for preserving precious memories**
