---
description: 配置开发环境
sidebar_position: 1
---

## brew
先安装 Chrome、Warp、Homebrew
> core
- git
- telnet
- cmake
- gnu-sed
- graphviz 依赖很多
- ffmpeg 依赖很多，官网下载更快

`brew install go@1.17`

> cask
- clashx
- raycast
- snipaste
- the-unarchiver
- visual-studio-code
- sourcetree
- charles
- insomnia
- iina
- obs
- baidunetdisk

## Git
```bash
git config -l
git config --global user.name "Lysander"
git config --global alias.st status
```
或者直接修改配置文件 `git config --edit --global`
```
[init]
        defaultBranch = main
[user]
        name = Lysander
        email = mgician3@gmail.com
[alias]
        br = branch
        pl = pull
        st = status
        sw = switch
        ls = stash list
        pop = stash pop
        lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## [nvm](https://github.com/nvm-sh/nvm)
```
nvm install --lts node
```
> Homebrew installation is not supported. If you have issues with homebrew-installed nvm, please brew uninstall it, and install it using the instructions below, before filing an issue.


## .zshrc
```bash
alias dps='docker ps'
alias dre='docker-compose restart'
alias dup='docker-compose up -d'
alias ddown='docker-compose down'

setopt EXTENDED_HISTORY
setopt HIST_EXPIRE_DUPS_FIRST
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_ALL_DUPS
setopt HIST_IGNORE_SPACE
setopt HIST_FIND_NO_DUPS
setopt HIST_SAVE_NO_DUPS
setopt HIST_BEEP

export HOMEBREW_NO_AUTO_UPDATE=1
export HOMEBREW_NO_INSTALL_CLEANUP=1

export PATH="/usr/local/opt/go@1.17/bin:$PATH"
```

## Visual Studio Code
settings.json
```json
{
  "workbench.colorTheme": "Solarized Dark",
  "window.zoomLevel": 1,
  "workbench.iconTheme": "vscode-icons",
  "editor.fontSize": 16,
  // 格式化
  "editor.formatOnSave": true,
  "files.autoSave": "onWindowChange",
  "remote.SSH.configFile": "/Users/lysander/dev3/foo/config",
  "workbench.editor.enablePreview": false,
  "code-runner.runInTerminal": true,
  "code-runner.saveFileBeforeRun": true,
  "terminal.integrated.fontSize": 16,
  "editor.columnSelection": false,
  "explorer.confirmDragAndDrop": false,
  "vsicons.dontShowNewVersionMessage": true,
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    // "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[proto3]": {
    "editor.defaultFormatter": "zxh404.vscode-proto3"
  },
  "security.workspace.trust.untrustedFiles": "open",
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "[jsonc]": {
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "workbench.editor.untitled.hint": "hidden",
  "git.enableSmartCommit": true,
  // 修改注释颜色
  // "editor.tokenColorCustomizations": {
  //   "comments": {
  //     "fontStyle": "bold",
  //     "foreground": "#82e0aa"
  //   }
  // },
  // 配置文件类型识别
  "files.associations": {
    "*.js": "javascript",
    "*.json": "jsonc",
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "extensions.ignoreRecommendations": false,
  "files.exclude": {
    "**/.DS_Store": true,
    "**/.git": true,
    "**/.hg": true,
    "**/.svn": true,
    "**/CVS": true,
    "**/node_modules": false,
    "**/tmp": true
  },
  // "javascript.implicitProjectConfig.experimentalDecorators": true,
  "typescript.updateImportsOnFileMove.enabled": "prompt",
  "git.confirmSync": false,
  "editor.tabSize": 2,
  "editor.fontWeight": "500",
  "editor.tabCompletion": "on",
  "vsicons.projectDetection.autoReload": true,
  "editor.fontFamily": "Monaco, 'Courier New', monospace, Meslo LG M for Powerline",
  "debug.console.fontSize": 14,
  "editor.minimap.enabled": true,
  "emmet.extensionsPath": [""],
  // eslint配置项，保存时自动修复错误
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "vetur.ignoreProjectWarning": true,
  // 让vetur使用vs自带的js格式化工具
  // uni-app和vue 项目使用
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "javascript.format.semicolons": "remove",
  // // 默认使用prettier格式化支持的文件
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.bracketSameLine": true,
  // 函数前面加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "prettier.singleQuote": true,
  "prettier.semi": false,
  // eslint end
  // react
  // 当按tab键的时候，会自动提示
  "emmet.triggerExpansionOnTab": true,
  "emmet.showAbbreviationSuggestions": true,
  "emmet.includeLanguages": {
    // jsx的提示
    "javascript": "javascriptreact",
    "vue-html": "html",
    "vue": "html",
    "wxml": "html"
  },
  // @路径提示
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src"
  },
  "git.ignoreMissingGitWarning": true
}
```

## locale
解决 `manpath: can't set the locale; make sure $LC_* and $LANG are correct`

`sudo vim /etc/ssh/ssh_config`
把这行注释
```
#    SendEnv LANG LC_*
```

## Keyboard Shortcuts
- General

| Command                  | Key        | Remark                    |
| :----------------------- | :--------- | ------------------------- |
| Open Settings            | ⌘,         |                           |
| Dock                     | ⌥⌘D        |                           |
| Preview                  | Space      |                           |
| Switch input             | ⌃Space     |                           |
| Switch Input             | ⇪          | Long press to switch case |
| Hidden files             | ⇧⌘.        | Finder √                  |
| Folder                   | ⌘↑/↓       | Finder √                  |
| Dispatch center          | ⌃↑         |                           |
| Desktop                  | F11        |                           |
| Delete                   | ⌘Backspace |                           |
| Paste                    | ⌘V         | ⌥⌘V Cut                   |
| Paste without Formatting | ⌥⇧⌘V       |                           |
| Undo                     | ⌘Z         | ⇧⌘Z Redo                  |
| Close                     | ⌘W         | ⌥⌘W Close All             |
| Quit                     | ⌘Q         |                           |
| Find                     | ⌘F         |                           |
| Find Next                | ⌘G         | Find Previous ⇧⌘G         |
| Go to Beginning of Line  | ⌃A         | ⌘←                        |
| Go to End of Line        | ⌃E         | ⌘→                        |
| Go to Beginning of File  | ⌘↑         | GoLand ⌘Home              |
| Go to End of File        | ⌘↓         | GoLand ⌘End               |

- Raycast

Clipboard History ⌃ ⇧ C  
System-Lock Screen ⌃ ⇧ L   
Strong Password Generator ⌃ ⇧ P  
Search Google ⌃ ⇧ G  

Window Management
Center ⌃⌥C 
Left Half ⌃ ⌥ ←  
Right Half ⌃ ⌥ →  
Top Half ⌃ ⌥ ↑  
Bottom Half ⌃ ⌥ ↓  
Maximize ⌃ ⌥ Enter

baidu 划译 ⌥ D
