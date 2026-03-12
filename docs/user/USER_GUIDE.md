# 用户指南

## 完整使用流程

### 1. 环境准备

```bash
# 克隆项目
git clone https://github.com/link8hu/wechat_memory.git
cd wechat_memory

# 安装依赖
npm install
```

### 2. 配置 WeFlow

1. 下载并安装 WeFlow：https://weflow.io/
2. 登录微信
3. 打开 WeFlow 设置 → API 服务 → 启动服务
4. 确认服务运行在 `127.0.0.1:5031`

### 3. 导出聊天记录

#### 基础导出
```bash
npm run dev -- --source weflow --platform desktop --output ./output
```

#### 导出特定联系人
```bash
# 先获取联系人列表（查看 WeFlow API 或日志）
# 然后用 talker 参数指定
npm run dev -- --source weflow --talker wxid_xxx --output ./output
```

#### 带 AI 分析
```bash
# 设置 API Key（任选其一）
export OPENAI_API_KEY="sk-xxx"
export ZHIPU_API_KEY="xxx"
export KIMI_API_KEY="xxx"

# 运行导出 + AI
npm run dev -- --source weflow --platform desktop --output ./output --ai
```

### 4. 查看结果

直接用浏览器打开：
```
output/website/index.html
```

---

## 命令行参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--source` | 数据源：`weflow` 或 `native` | `weflow` |
| `--platform` | 平台：`desktop`、`ios`、`android` | `desktop` |
| `--input` | 输入路径（native 模式用） | 自动检测 |
| `--output` | 输出目录 | `./output` |
| `--talker` | 指定联系人/会话 ID | 全部 |
| `--theme` | 网站主题：`warm`、`classic` | `warm` |
| `--ai` | 启用 AI 分析 | 关闭 |
| `--weflow-url` | WeFlow API 地址 | `http://127.0.0.1:5031` |

---

## 主题预览

- **warm** - 温暖风格，适合情侣/家人
- **classic** - 经典风格，简洁专业

---

## 故障排除

### WeFlow API 连接失败
```
Error: connect ECONNREFUSED 127.0.0.1:5031
```
**解决：** 确保 WeFlow 已启动 API 服务

### 没有找到聊天记录
**解决：** 确保微信已登录，且有聊天记录

### AI 分析失败
**解决：** 检查 API Key 是否正确，网络是否通畅

---

## 隐私说明

- ✅ 所有数据本地处理
- ✅ 不上传聊天记录到任何服务器
- ✅ AI 分析可选，使用你自己的 API Key
- ✅ 生成的网站完全本地运行
