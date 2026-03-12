# 用户指南 - 详细版

> 📖 本指南适合第一次使用的用户，每一步都有详细说明。

---

## 📋 目录

1. [环境准备](#1-环境准备)
2. [安装 WeFlow](#2-安装-weflow)
3. [配置 WeFlow API](#3-配置-weflow-api)
4. [下载并安装项目](#4-下载并安装项目)
5. [导出聊天记录](#5-导出聊天记录)
6. [查看结果](#6-查看结果)
7. [常见问题](#7-常见问题)

---

## 1. 环境准备

### 1.1 检查是否已安装 Node.js

打开终端（macOS）或命令提示符（Windows），输入：

```bash
node --version
```

**如果显示版本号**（如 `v18.x.x` 或更高），跳过此步。

**如果提示 "command not found"**，需要安装 Node.js：

#### macOS 安装 Node.js
```bash
# 使用 Homebrew（推荐）
brew install node

# 或访问官网下载：https://nodejs.org/
```

#### Windows 安装 Node.js
1. 访问 https://nodejs.org/
2. 下载 LTS 版本（长期支持版）
3. 双击安装，一路 Next 即可

### 1.2 检查是否已安装 Git

```bash
git --version
```

**如果提示 "command not found"**：

- **macOS**: 运行 `xcode-select --install` 安装
- **Windows**: 访问 https://git-scm.com/ 下载安装

---

## 2. 安装 WeFlow

WeFlow 是一个微信管理工具，我们需要用它来读取聊天记录。

### 2.1 下载 WeFlow

1. 访问官网：https://weflow.io/
2. 点击 "Download" 下载
3. 选择对应版本：
   - macOS: 下载 `.dmg` 文件
   - Windows: 下载 `.exe` 文件

### 2.2 安装 WeFlow

#### macOS:
1. 打开下载的 `.dmg` 文件
2. 将 WeFlow 拖到 Applications 文件夹
3. 在 Applications 中打开 WeFlow

#### Windows:
1. 双击下载的 `.exe` 文件
2. 按照安装向导完成安装
3. 启动 WeFlow

### 2.3 登录微信

1. 打开 WeFlow
2. 会弹出一个二维码
3. 用手机微信扫描二维码
4. 在手机上确认登录

> ⚠️ **注意**: 必须登录电脑版微信，WeFlow 才能读取聊天记录

---

## 3. 配置 WeFlow API

### 3.1 打开设置

1. 在 WeFlow 主界面，找到右上角的 **设置图标**（⚙️）
2. 点击进入设置页面

### 3.2 开启 API 服务

1. 在设置页面，找到 **"API 服务"** 或 **"Developer"** 选项卡
2. 找到 **"启用 API 服务"** 开关
3. 打开开关

### 3.3 确认服务地址

开启后，会显示服务地址，默认是：
```
http://127.0.0.1:5031
```

> ✅ **记住这个地址**，后面要用到！

### 3.4 验证 API 是否正常

打开浏览器，访问：
```
http://127.0.0.1:5031
```

如果看到类似 JSON 的响应，说明 API 正常！

---

## 4. 下载并安装项目

### 4.1 克隆项目

打开终端（或命令提示符），运行：

```bash
# 选择一个你喜欢的目录
cd ~/Documents

# 克隆项目
git clone https://github.com/link8hu/wechat_memory.git

# 进入项目目录
cd wechat_memory
```

### 4.2 安装依赖

```bash
npm install
```

> ⏱️ **等待时间**: 大约 1-3 分钟，取决于网络速度
> 
> 如果下载慢，可以使用国内镜像：
> ```bash
> npm config set registry https://registry.npmmirror.com
> npm install
> ```

### 4.3 验证安装

```bash
npm run dev -- --help
```

如果显示帮助信息，说明安装成功！

---

## 5. 导出聊天记录

### 5.1 基础导出（所有联系人）

确保：
- ✅ WeFlow 已启动
- ✅ 微信已登录
- ✅ API 服务已开启

运行：

```bash
cd ~/Documents/wechat_memory

npm run dev -- --source weflow --platform desktop --output ./output
```

### 5.2 导出特定联系人

如果你想导出和某个人的聊天记录：

```bash
npm run dev -- --source weflow --talker wxid_xxx --output ./output
```

**如何获取 talker ID？**

1. 打开 WeFlow
2. 找到你想导出的联系人/群聊
3. 查看会话信息，找到 ID（通常是 `wxid_xxx` 或 `xxx@chatroom`）
4. 替换命令中的 `wxid_xxx`

### 5.3 带 AI 分析（可选）

如果你想让 AI 帮你总结聊天记录：

#### 第一步：获取 API Key

推荐使用以下任一：

| 服务商 | 推荐模型 | 申请地址 |
|--------|---------|---------|
| 通义千问 | qwen-plus | https://dashscope.console.aliyun.com/ |
| Kimi | kimi-plus | https://platform.moonshot.cn/ |
| 智谱 AI | glm-4 | https://open.bigmodel.cn/ |

#### 第二步：设置 API Key

**macOS / Linux:**
```bash
# 通义千问
export DASHSCOPE_API_KEY="sk-你的 key 在这里"

# 或 Kimi
export KIMI_API_KEY="sk-你的 key 在这里"
```

**Windows (PowerShell):**
```powershell
$env:DASHSCOPE_API_KEY="sk-你的 key 在这里"
```

#### 第三步：运行带 AI 的导出

```bash
npm run dev -- --source weflow --platform desktop --output ./output --ai
```

---

## 6. 查看结果

### 6.1 输出文件位置

导出完成后，文件在 `output` 目录：

```
output/
├── export.json              # 原始聊天记录数据
└── website/
    ├── index.html           # 📄 回忆网站（用浏览器打开这个）
    └── data/
        ├── messages.json    # 网站用的消息数据
        └── ai.json          # AI 分析结果（如果启用了 --ai）
```

### 6.2 打开回忆网站

#### macOS:
```bash
open output/website/index.html
```

#### Windows:
```bash
start output/website/index.html
```

或直接用浏览器打开 `output/website/index.html` 文件。

### 6.3 分享网站

生成的网站是纯静态的，你可以：

- 直接发送 `output/website` 文件夹给别人
- 部署到 GitHub Pages、Vercel 等平台
- 用任意 Web 服务器托管

---

## 7. 常见问题

### Q1: WeFlow API 连接失败

**错误信息:**
```
Error: connect ECONNREFUSED 127.0.0.1:5031
```

**解决方法:**
1. 确认 WeFlow 已启动
2. 确认微信已登录
3. 确认 API 服务已开启（设置 → API 服务）
4. 尝试重启 WeFlow

---

### Q2: 没有找到聊天记录

**可能原因:**
- 微信没有登录
- 选择的联系人没有聊天记录
- WeFlow 权限不足

**解决方法:**
1. 确认微信已登录且有聊天记录
2. 尝试导出所有联系人（不用 `--talker` 参数）
3. 检查 WeFlow 是否有访问微信数据的权限

---

### Q3: npm install 失败

**可能原因:**
- 网络问题
- Node.js 版本太低

**解决方法:**
```bash
# 使用国内镜像
npm config set registry https://registry.npmmirror.com

# 清除缓存重试
npm cache clean --force
npm install

# 检查 Node.js 版本（需要 18+）
node --version
```

---

### Q4: AI 分析失败

**可能原因:**
- API Key 错误
- 网络问题
- 账户余额不足

**解决方法:**
1. 检查 API Key 是否正确
2. 确认账户有余额
3. 检查网络连接
4. 尝试换一个 API 服务商

---

### Q5: 导出的数据不完整

**可能原因:**
- WeFlow 读取限制
- 聊天记录太多

**解决方法:**
1. 尝试分批次导出（使用 `--talker` 指定不同联系人）
2. 检查 WeFlow 是否有最新权限设置
3. 联系 WeFlow 支持

---

## 📞 需要帮助？

如果遇到问题：

1. 查看项目 Issues: https://github.com/link8hu/wechat_memory/issues
2. 提交新的 Issue 描述你的问题
3. 查看 FAQ 更新

---

**祝你使用愉快！** 🎉
