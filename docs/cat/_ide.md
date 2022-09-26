---
sidebar_position: 98
---

IDE 快捷键

## GoLand

### Todo

cmd+[ Navigate back 侧键
cmd+] Navigate forward  
cmd+b Go to declaration _中键_  
[中键跳转](https://blog.csdn.net/xw486223221/article/details/89419675)

**config**

- [live templates ](https://www.jetbrains.com/help/go/using-live-templates.html#live_templates_configure)
  err fori forr err
- [保存时自动格式化代码](https://www.jianshu.com/p/104b33439ac2)
  tab limit  
  mark modified(\*)  
  show tabs in one row 取消勾选  
  live template fmt.Println()

### IntelliJ IDEA

设置 Ctrl+右键 查看实现类，Keymap-搜索 implementation-Add Mouse Shortcut
`.null` 判空，非空则是 notnull  
.p &  
.len len()  
设置 pl 和 pln

- 字体 Fira Code Light 勾选 Enable font ligatures
- 插件 Rainbow Brackets

ctrl + [\] 跳转到开始和结尾处， ctrl + shift + [\] 选中光标开始到代码块结束处

### general

| Command                           | Key     | Remark           |
| :-------------------------------- | :------ | ---------------- |
| Find in Files                     | ⇧⌘F     |                  |
| Replace                           | ⌘R      |                  |
| Go to Line                        | ⌘L      |                  |
| Insert Line Above                 | ⌥⌘Enter |                  |
| Insert Line Below                 | ⇧Enter  |                  |
| Move Line Up                      | ⇧⌥↑     |                  |
| Move Line Down                    | ⇧⌥↓     |                  |
| Copy Line Down                    | ⌘D      |                  |
| Add Selection for Next Occurrence | ⌃G      | Unselect ⌃⇧G     |
| Select All Occurrences            | ⌃⌘G     |                  |
| Expand                            | ⌘+      | Expand All ⇧⌘+   |
| Collapse                          | ⌘-      | Collapse All ⇧⌘- |
| Find Action                       | ⇧⌘A     |                  |
| Toggle Line Comment               | ⌘/      |                  |
| Toggle Block Comment              | ⌥⌘/     |                  |

### shortcuts

| Command                 | Key   | Remark                     |
| :---------------------- | :---- | -------------------------- |
| 打开关闭终端            | ⌥F12  |                            |
| Run                     | ⌘R    |                            |
| Project                 | ⌘ 1   |                            |
| Run Console             | ⌘ 4   |                            |
| Structure               | ⌘ 7   |                            |
| File Structure          | ⌘ F12 | 可以搜索                   |
| Insert Live Template    | ⌘J    | 插入模版                   |
| Extract Variable        | ⌥⌘B   | 调用方法补全参数           |
| Extract Method          | ⌥⌘M   | Todo                       |
| Go to implementation(s) | ⌥⌘B   | Todo                       |
| Find usages             | ⌥F7   | Todo                       |
| Show usages             | ⌥⌘F7  | Todo                       |
| Implement methods       | ⌘     | 实现接口                   |
| External Doc            | ⇧F1   | 直接在浏览器打开？不要尝试 |
| Goto next splitter      | ⌥Tab  |                            |
| Recent files popup      | ⌘E    |                            |
| Next highlighted error  | F2    |                            |
| Rename                  | ⇧F6   |                            |

## Visual Studio Code

### shortcuts

| Command                  | Key          | Remark          |
| :----------------------- | :----------- | --------------- |
| 多光标                   | ⌥ Leftclick  |                 |
| 竖向多光标               | ⌥⇧ Leftclick | GoLand❌ ⇧⌘8    |
| 行尾多光标（选定）       | ⌥⇧I          |                 |
| 设置语言                 | ⌘K M         | 先按 ⌘ K 再按 M |
| 打开                     | ⌘O           |                 |
| Toggle Markdown Preview  | ⇧⌘V          |                 |
| Split Editor             | ⌘\           |                 |
| Jump to matching bracket | ⇧⌘\          | VSCode✅        |
| 打开/关闭 Terminal       | ⌃\`          |                 |
| 新建 Terminal            | ⌃⇧\`         |                 |
| Copy paths               | ⇧⌘V          | 复制文件路径    |

### settings.json

```json
{
  "workbench.colorTheme": "Solarized Dark",
  "window.zoomLevel": 1,
  "workbench.iconTheme": "vscode-icons",
  "editor.fontSize": 16,
  "editor.formatOnSave": true,
  "files.autoSave": "onWindowChange",
  "workbench.editor.enablePreview": false,
  "code-runner.runInTerminal": true,
  "code-runner.saveFileBeforeRun": true,
  "terminal.integrated.fontSize": 16
}
```

### snippets

```json
{
  "Print to console": {
    "prefix": "cl",
    "body": ["console.log($1);"],
    "description": "Log output to console"
  }
}
```

## references

1. [GoLand Shortcuts](https://resources.jetbrains.com/storage/products/goland/docs/GoLand_ReferenceCard_macOS.pdf)
1. [Key Bindings for Visual Studio Code](https://code.visualstudio.com/docs/getstarted/keybindings)
