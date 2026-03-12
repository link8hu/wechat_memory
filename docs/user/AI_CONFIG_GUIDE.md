# AI 配置指南

## 快速配置

### 1. 获取 API Key

推荐使用以下任一服务：

| 服务商 | 推荐模型 | 申请地址 |
|--------|---------|---------|
| 通义千问 | qwen-plus | https://dashscope.console.aliyun.com/ |
| Kimi | kimi-plus | https://platform.moonshot.cn/ |
| 智谱 AI | glm-4 | https://open.bigmodel.cn/ |
| OpenAI | gpt-4o | https://platform.openai.com/ |

### 2. 设置环境变量

**macOS / Linux:**
```bash
# 通义千问
export DASHSCOPE_API_KEY="sk-xxx"

# 或 Kimi
export KIMI_API_KEY="sk-xxx"

# 或 OpenAI
export OPENAI_API_KEY="sk-xxx"
```

**Windows (PowerShell):**
```powershell
$env:DASHSCOPE_API_KEY="sk-xxx"
```

### 3. 运行带 AI 的导出

```bash
npm run dev -- --source weflow --platform desktop --output ./output --ai
```

---

## 支持的模型

自动检测以下环境变量：

- `DASHSCOPE_API_KEY` → 通义千问
- `KIMI_API_KEY` → Kimi
- `ZHIPU_API_KEY` → 智谱 AI
- `OPENAI_API_KEY` → OpenAI

---

## AI 能做什么

启用 `--ai` 后，会自动生成：

1. **聊天总结** - 你们聊了什么主题
2. **情感分析** - 情感变化趋势
3. **重要时刻** - 里程碑事件
4. **数据洞察** - 聊天习惯统计

结果保存在 `output/website/data/ai.json`

---

## 成本参考

| 模型 | 价格（约） | 百条消息成本 |
|------|----------|-------------|
| qwen-plus | ¥0.004/1K tokens | ¥0.1-0.5 |
| kimi-plus | ¥0.002/1K tokens | ¥0.05-0.3 |
| gpt-4o | $0.005/1K tokens | ¥0.5-2 |

**建议：** 日常使用推荐通义千问或 Kimi，性价比高。

---

## 常见问题

**Q: 没有 API Key 能用吗？**  
A: 可以！AI 功能是可选的，不影响基础导出。

**Q: 会上传我的聊天记录吗？**  
A: 不会。数据只在你本地处理，AI 调用使用你自己的 Key。

**Q: 导出失败怎么办？**  
A: 检查：
- API Key 是否正确
- 网络是否通畅
- 账户余额是否充足
