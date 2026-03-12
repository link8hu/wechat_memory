# GitHub 仓库创建指南

## 🎯 目标
创建 GitHub 仓库：`wechat-memory-export`

## 📋 步骤

### 方法 1: 使用 GitHub CLI (推荐)

```bash
# 1. 登录 GitHub
gh auth login

# 2. 选择认证方式 (推荐 HTTPS)
? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Login with a web browser

# 3. 按提示在浏览器中授权

# 4. 创建仓库
cd ~/.openclaw/workspace/wechat-memory-export
gh repo create wechat-memory-export --public --description "📝 微信聊天记录导出工具 - 生成两个人的回忆网站数据"

# 5. 推送代码
git init
git add .
git commit -m "Initial commit: WeChat Memory Export"
git branch -M main
git remote add origin https://github.com/<你的用户名>/wechat-memory-export.git
git push -u origin main
```

### 方法 2: 使用 GitHub 网页

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `wechat-memory-export`
   - **Description**: `📝 微信聊天记录导出工具 - 生成两个人的回忆网站数据 | WeChat Chat History Exporter for Memory Website`
   - **Visibility**: ✅ Public
   - ❌ 不要勾选 "Initialize this repository with a README"
3. 点击 "Create repository"
4. 按页面提示推送本地代码：

```bash
cd ~/.openclaw/workspace/wechat-memory-export
git init
git add .
git commit -m "Initial commit: WeChat Memory Export"
git branch -M main
git remote add origin https://github.com/<你的用户名>/wechat-memory-export.git
git push -u origin main
```

## 📝 仓库信息模板

**名称**: `wechat-memory-export`

**描述**: 
```
📝 微信聊天记录导出工具 - 生成两个人的回忆网站数据 | WeChat Chat History Exporter for Memory Website
```

**标签 (Topics)**:
```
wechat
chat-export
memory
backup
ios
android
sqlite
nodejs
```

**许可证**: MIT

## 🔗 参考项目

创建完成后，可以在 README 中添加参考项目链接：

- [BlueMatthew/WechatExporter](https://github.com/BlueMatthew/WechatExporter) - 7.7k stars
- [hicccc77/WeFlow](https://github.com/hicccc77/WeFlow) - 4.6k stars (最近还在更新！)
- [tsycnh/WeChatExporter](https://github.com/tsycnh/WeChatExporter) - 1.5k stars

## ✅ 创建后检查

1. ✅ README 正确显示
2. ✅ LICENSE 文件已上传
3. ✅ 添加项目标签 (Topics)
4. ✅ 设置 GitHub Pages (可选，用于演示网站)
5. ✅ 启用 Issues
6. ✅ 添加项目看板 (Project Board)

## 🎨 后续优化

1. 添加 GitHub Actions CI/CD
2. 设置自动发布 (Releases)
3. 添加贡献指南 (CONTRIBUTING.md)
4. 设置 Issue 模板
5. 添加代码质量检查 (CodeQL)

---

**准备好后，选择一种方法创建仓库吧！** 🚀
