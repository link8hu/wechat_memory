# 技术架构设计

## 🎯 产品定位

**开源免费的微信聊天记录 AI 回忆整理工具**

- 使用用户自己的 AI API Key
- 100% 本地处理，保护隐私
- 作为 OpenClaw Skill 集成
- 完全免费，无商业化计划

---

## 🏗️ 整体架构

```
┌────────────────────────────────────────────────────────────┐
│                    OpenClaw Platform                        │
└────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌────────────────────────────────────────────────────────────┐
│              WeChat Memory Export (Skill)                   │
├────────────────────────────────────────────────────────────┤
│  Input: 微信备份数据                                         │
│  Output: AI 整理的回忆网站                                    │
└────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
   ┌──────────┐        ┌──────────┐         ┌──────────┐
   │  导出层  │        │  AI 层   │         │ 展示层  │
   │          │        │          │         │          │
   │ 解析备份 │  ──→  │ AI 处理  │  ──→   │ 生成网站 │
   │ 提取数据 │        │ 总结分析 │         │ 可视化   │
   └──────────┘        └──────────┘         └──────────┘
```

---

## 📦 模块设计

### 1️⃣ 导出层 (Exporter)

**职责：** 解析微信备份，提取聊天记录

#### iOS 导出
```typescript
interface IOSExporter {
  // 输入：iTunes 备份路径
  input: string;
  
  // 解析微信数据库
  parseWeChatDB(): Promise<WeChatData>;
  
  // 提取消息
  extractMessages(): Promise<Message[]>;
  
  // 提取多媒体
  extractMedia(): Promise<MediaFile[]>;
}
```

**流程：**
```
iTunes 备份
    ↓
解压备份文件
    ↓
找到微信数据库 (MM.sqlite)
    ↓
解密数据库 (需要密钥)
    ↓
提取消息表 (Chat_xxxx)
    ↓
输出 JSON 格式
```

#### Android 导出
```typescript
interface AndroidExporter {
  // 输入：微信数据目录
  input: string;
  
  // 需要 Root 权限或模拟器
  requiresRoot: boolean;
  
  // 解析数据库
  parseDB(): Promise<WeChatData>;
}
```

#### 电脑版导出
```typescript
interface DesktopExporter {
  // Windows: C:\Users\{user}\Documents\WeChat Files\
  // macOS: ~/Library/Containers/com.tencent.xinWeChat/Data/
  
  platforms: ['windows', 'macos'];
  
  // 自动检测微信数据位置
  autoDetect(): Promise<string>;
  
  // 导出聊天记录
  export(): Promise<ExportResult>;
}
```

---

### 2️⃣ AI 层 (AI Processor)

**职责：** 使用 AI 大模型分析、总结、创作

#### AI 总结器
```typescript
interface AISummary {
  // 输入：聊天记录
  messages: Message[];
  
  // 使用用户配置的 AI
  provider: 'openai' | 'claude' | 'qwen' | 'kimi' | 'zhipu';
  apiKey: string;
  
  // 总结类型
  async summarize(type: 'daily' | 'monthly' | 'yearly' | 'custom'): Promise<string>;
  
  // 提取关键时刻
  async extractMilestones(): Promise<Milestone[]>;
  
  // 生成故事
  async generateStory(theme: string): Promise<string>;
}
```

**Prompt 示例：**
```
基于以下聊天记录，总结我们的爱情故事：

时间范围：2023-01-01 到 2024-12-31
消息数量：12,345 条

请总结：
1. 我们的第一次对话
2. 重要的里程碑（第一次约会、表白等）
3. 最感人的对话片段
4. 我们的聊天习惯

要求：
- 温暖感人的语气
- 突出重要时刻
- 包含具体日期和对话
```

#### 情感分析
```typescript
interface EmotionAnalysis {
  // 情感趋势分析
  analyzeTrend(): Promise<EmotionTrend[]>;
  
  // 关键词提取
  extractKeywords(): Promise<Keyword[]>;
  
  // 关系洞察
  generateInsights(): Promise<Insight[]>;
}

interface EmotionTrend {
  date: string;
  score: number;  // -1 到 1，负面向正面
  label: 'negative' | 'neutral' | 'positive';
}
```

#### 数据洞察
```typescript
interface DataInsight {
  // 聊天统计
  getStatistics(): Promise<Statistics>;
  
  // 活跃时间分析
  getActiveHours(): Promise<HourlyDistribution>;
  
  // 常用词分析
  getTopWords(): Promise<WordFrequency[]>;
}

interface Statistics {
  totalMessages: number;
  totalWords: number;
  avgMessagesPerDay: number;
  mostActiveDay: string;
  mostUsedEmoji: string;
  // ...
}
```

---

### 3️⃣ 展示层 (Website Generator)

**职责：** 生成静态回忆网站

#### 网站生成器
```typescript
interface WebsiteGenerator {
  // 输入：AI 处理后的数据
  inputData: ProcessedData;
  
  // 选择模板
  template: 'love-story' | 'friendship' | 'family' | 'custom';
  
  // 生成网站
  async generate(outputDir: string): Promise<void>;
  
  // 预览
  async preview(): Promise<string>;  // 返回本地 URL
}
```

#### 网站结构
```
generated-website/
├── index.html          # 首页（时间线）
├── story.html          # AI 写的故事
├── statistics.html     # 数据统计
├── gallery.html        # 图片/语音回顾
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── data/
    └── messages.json   # 聊天数据（可选）
```

#### 页面设计

**首页 - 时间线**
```
┌─────────────────────────────────────┐
│   💕 Our Story                      │
│   2023.01.01 - 2024.12.31          │
└─────────────────────────────────────┘
         ↓
[时间线展示]
2023-05-20  第一次相遇 💕
   ↓
2023-06-14  第一次约会 🌹
   ↓
2023-08-01  在一起 💑
   ↓
...
```

**故事页 - AI 创作**
```
第一章：相遇

那是一个普通的下午，
却因为你的出现，变得不再普通...

[AI 基于聊天记录创作的故事]
```

**统计页 - 数据可视化**
```
💬 聊天统计
- 总消息数：123,456 条
- 总字数：2,345,678 字
- 最活跃时间：22:00-23:00
- 最爱说的词："想你" (847 次)

[图表展示]
```

---

## 🔧 技术实现

### 核心依赖

```json
{
  "dependencies": {
    "sqlite3": "^5.1.0",        // 数据库解析
    "openai": "^4.0.0",         // AI 调用
    "vue": "^3.4.0",            // 前端框架
    "tailwindcss": "^3.4.0",    // CSS 框架
    "chart.js": "^4.0.0"        // 数据可视化
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^1.0.0",
    "rollup": "^4.0.0"
  }
}
```

### AI 适配器模式

```typescript
// 支持多种 AI 提供商
interface AIProvider {
  name: string;
  summarize(messages: Message[], prompt: string): Promise<string>;
  analyzeEmotion(messages: Message[]): Promise<EmotionAnalysis>;
  generateStory(context: string, theme: string): Promise<string>;
}

// OpenAI 实现
class OpenAIProvider implements AIProvider {
  name = 'openai';
  
  async summarize(messages, prompt) {
    // 调用 OpenAI API
  }
}

// Claude 实现
class ClaudeProvider implements AIProvider {
  name = 'claude';
  
  async summarize(messages, prompt) {
    // 调用 Claude API
  }
}

// 通义千问实现
class QwenProvider implements AIProvider {
  name = 'qwen';
  
  async summarize(messages, prompt) {
    // 调用通义千问 API
  }
}

// 工厂模式创建
function createAIProvider(type: string, apiKey: string): AIProvider {
  switch(type) {
    case 'openai': return new OpenAIProvider(apiKey);
    case 'claude': return new ClaudeProvider(apiKey);
    case 'qwen': return new QwenProvider(apiKey);
    // ...
  }
}
```

---

## 🔒 隐私保护设计

### 数据流向

```
用户电脑
    ↓
微信备份文件 (本地)
    ↓
导出工具 (本地运行)
    ↓
AI API (你的 Key，直接调用)
    ↓
回忆网站 (本地生成)
    ↓
存储在用户电脑
```

**关键点：**
- ✅ 数据不经过我们的服务器
- ✅ 用户使用自己的 AI API Key
- ✅ 所有处理在本地完成
- ✅ 生成的网站归用户所有

---

## 📊 性能优化

### 大数据处理

**问题：** 聊天记录可能几十万条

**解决方案：**
1. **分批处理** - 每次处理 1000 条
2. **流式处理** - 边读取边处理
3. **缓存机制** - 避免重复处理
4. **增量更新** - 只处理新增消息

```typescript
// 分批处理示例
async function processMessages(messages: Message[]) {
  const BATCH_SIZE = 1000;
  const results = [];
  
  for (let i = 0; i < messages.length; i += BATCH_SIZE) {
    const batch = messages.slice(i, i + BATCH_SIZE);
    const result = await ai.summarize(batch);
    results.push(result);
    
    // 显示进度
    updateProgress(i / messages.length);
  }
  
  return mergeResults(results);
}
```

---

## 🚀 部署方案

### 方案 1: 本地运行 (默认)
```bash
# 生成后直接在本地浏览器打开
open ./generated-website/index.html
```

### 方案 2: 静态托管
```bash
# 部署到 Vercel/Netlify/GitHub Pages
vercel deploy ./generated-website
```

### 方案 3: 私有服务器
```bash
# 上传到自己的服务器
scp -r ./generated-website user@server:/var/www/
```

---

## 📝 开发路线图

### Phase 1: MVP (2 周)
- [ ] iOS 导出功能
- [ ] 基础 AI 总结
- [ ] 简单网站模板
- [ ] OpenClaw Skill 集成

### Phase 2: 增强 (2 周)
- [ ] Android/电脑端导出
- [ ] 情感分析
- [ ] 数据可视化
- [ ] 多主题模板

### Phase 3: 完善 (2 周)
- [ ] 性能优化
- [ ] 文档完善
- [ ] 测试覆盖
- [ ] 社区推广

---

## 🤝 开源协作

### 贡献方向

1. **导出模块** - 支持更多平台
2. **AI 功能** - 新的分析维度
3. **网站模板** - 更多设计风格
4. **文档翻译** - 国际化支持

### 开发规范

- 使用 TypeScript
- 编写单元测试
- 遵循 ESLint 规则
- 提交前运行测试

---

**让我们一起打造这个有温度的开源项目！** ❤️
