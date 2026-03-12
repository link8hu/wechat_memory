# 🚀 推送到 GitHub 指南

## ✅ 已完成
- ✅ 本地 Git 仓库已初始化
- ✅ 首次提交已完成
- ✅ 远程仓库地址已设置

## 📋 推送方法

### 方法 1: 使用 GitHub CLI (最简单)

```bash
cd ~/.openclaw/workspace/wechat-memory-export

# 如果还没登录，先登录
gh auth login

# 推送代码
gh repo sync --source origin/main
# 或者
git push -u origin main
```

### 方法 2: 使用 HTTPS

```bash
cd ~/.openclaw/workspace/wechat-memory-export

# 推送代码 (会提示输入 GitHub 用户名和密码/Token)
git push -u origin main
```

**使用 Personal Access Token:**
1. 访问 https://github.com/settings/tokens
2. 生成新 Token (勾选 `repo` 权限)
3. 使用 Token 作为密码推送

### 方法 3: 配置 SSH (推荐长期使用)

```bash
# 1. 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 添加 SSH 密钥到 GitHub
# 复制公钥内容
cat ~/.ssh/id_ed25519.pub | pbcopy

# 访问 https://github.com/settings/keys
# 点击 "New SSH key"，粘贴公钥

# 3. 测试连接
ssh -T git@github.com

# 4. 切换回 SSH 地址并推送
cd ~/.openclaw/workspace/wechat-memory-export
git remote set-url origin git@github.com:link8hu/wechat_memory.git
git push -u origin main
```

## 🎯 快速推送脚本

创建一个推送脚本 `push.sh`:

```bash
#!/bin/bash
# push.sh - 快速推送到 GitHub

cd ~/.openclaw/workspace/wechat-memory-export

echo "📝 Adding changes..."
git add .

echo "💾 Committing..."
git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"

echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Done!"
```

使用方法：
```bash
chmod +x push.sh
./push.sh
```

## ✅ 推送后检查

1. 访问 https://github.com/link8hu/wechat_memory
2. 检查文件是否正确显示
3. 检查 README 是否正确渲染
4. 添加项目标签 (Topics)

## 🏷️ 添加项目标签

在 GitHub 仓库页面：
1. 点击右上角 ⚙️ (设置图标)
2. 找到 "Topics"
3. 添加以下标签：
   ```
   wechat
   chat-export
   memory
   backup
   ios
   android
   sqlite
   nodejs
   typescript
   ```

## 📊 下一步

推送成功后：

1. **完善 README**
   - 添加项目徽章
   - 更新仓库链接
   - 添加截图/GIF

2. **配置 GitHub Actions**
   - 自动测试
   - 自动发布

3. **添加许可证**
   ```bash
   # 在项目根目录创建 LICENSE 文件
   ```

4. **启动 Oh My OpenAgent 开发**
   ```bash
   cd ~/.openclaw/workspace/wechat-memory-export
   opencode
   ultrawork 开始开发微信导出工具
   ```

---

**选择一种方法推送代码吧！** 🚀
