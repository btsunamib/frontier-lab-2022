# 前沿实验室 · 本地连接版

需要 Python 3.10 或更新版本，无其他依赖。

- Windows：双击 `start-windows.bat`。
- macOS / Linux：在解压文件夹运行 `python3 start-local.py`。
- 浏览器自动打开游戏，保持终端窗口开启；退出时按 Ctrl+C。

在游戏设置 → AI 接口填入 HTTP 或 HTTPS 地址，按 Tab 或点到下一栏后自动获取模型。可留空本地服务的密钥。Ollama 可填 `http://localhost:11434`；LM Studio 可填 `http://localhost:1234/v1`。从列表选择模型，或直接手动填写 ID，最后保存或生成评论。

本地连接器只监听 127.0.0.1，接口请求在这台电脑转发；不会写入或记录 API Key。网页端的跨域限制不会影响这条转发路径。HTTP 服务不提供传输加密，只连接你信任的服务。

GitHub Pages 与本地地址分别保存游戏进度。从原游戏“设置 / 存档”导出 JSON，再到新地址导入，即可接着玩。先保持原地址的进度，不要清理浏览器数据。
