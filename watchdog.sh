#!/bin/bash
# OpenCode 任务守护进程
# 用途：持续监督 OpenCode 任务运行，确保整晚不中断

LOG_FILE=~/Documents/project/wechat-memory-export/opencode-watchdog.log
PROJECT_DIR=~/Documents/project/wechat-memory-export

echo "🐕 OpenCode 守护进程已启动 - $(date)" >> $LOG_FILE
echo "=========================================" >> $LOG_FILE

# 保持系统唤醒
caffeinate -dimsu &
CAFFEINATE_PID=$!
echo "✅ 防睡眠模式已启动 (PID: $CAFFEINATE_PID)" >> $LOG_FILE

# 检查 OpenCode 是否在运行
check_opencode() {
    if pgrep -f "opencode-cli" > /dev/null; then
        echo "✅ OpenCode 正在运行 - $(date)" >> $LOG_FILE
        return 0
    else
        echo "⚠️  OpenCode 未运行，尝试重启..." >> $LOG_FILE
        return 1
    fi
}

# 检查项目目录
check_project() {
    if [ -d "$PROJECT_DIR" ]; then
        echo "✅ 项目目录存在：$PROJECT_DIR" >> $LOG_FILE
        return 0
    else
        echo "❌ 项目目录不存在！" >> $LOG_FILE
        return 1
    fi
}

# 主循环
while true; do
    echo "" >> $LOG_FILE
    echo "📋 检查点 - $(date)" >> $LOG_FILE
    
    # 检查项目
    if ! check_project; then
        echo "❌ 项目检查失败，退出守护进程" >> $LOG_FILE
        break
    fi
    
    # 检查 OpenCode
    if ! check_opencode; then
        echo "🔄 尝试重启 OpenCode..." >> $LOG_FILE
        cd $PROJECT_DIR
        /Applications/OpenCode.app/Contents/MacOS/opencode-cli serve --port 55713 --hostname 0.0.0.0 &
        sleep 5
        
        if check_opencode; then
            echo "✅ OpenCode 重启成功" >> $LOG_FILE
        else
            echo "❌ OpenCode 重启失败" >> $LOG_FILE
        fi
    fi
    
    # 显示系统状态
    echo "📊 系统状态：" >> $LOG_FILE
    echo "   - CPU: $(top -l 1 | grep "CPU usage" | awk '{print $3}')%" >> $LOG_FILE
    echo "   - 内存：$(vm_stat | awk '/Pages active/ {print $3}' | tr -d '.') pages" >> $LOG_FILE
    echo "   - 运行进程：$(ps aux | wc -l)" >> $LOG_FILE
    
    # 每 5 分钟检查一次
    sleep 300
done

# 清理函数
cleanup() {
    echo "" >> $LOG_FILE
    echo "🛑 守护进程停止 - $(date)" >> $LOG_FILE
    kill $CAFFEINATE_PID 2>/dev/null
    echo "✅ 防睡眠模式已关闭" >> $LOG_FILE
    exit 0
}

# 捕获退出信号
trap cleanup SIGINT SIGTERM

# 启动守护进程
echo "🚀 守护进程开始运行..." >> $LOG_FILE
