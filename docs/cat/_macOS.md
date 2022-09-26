---
sidebar_position: 97
---

## Tools

- [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)
- [Homebrew](https://brew.sh)
- [iTerm2](https://www.iterm2.com)
- [tmux](https://github.com/tmux/tmux)
- [fzf](https://github.com/junegunn/fzf)
- [ag](https://github.com/ggreer/the_silver_searcher)
- [z](https://github.com/rupa/z)

> plugins

```bash
cd ~/.oh-my-zsh/plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
```

> .zshrc

```bash
export GOPATH=/Users/lysander/go
export PATH=$GOPATH/bin:$PATH

alias vsc="'/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code'"
alias pxy="export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;"

setopt EXTENDED_HISTORY
setopt HIST_EXPIRE_DUPS_FIRST
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_ALL_DUPS
setopt HIST_IGNORE_SPACE
setopt HIST_FIND_NO_DUPS
setopt HIST_SAVE_NO_DUPS
setopt HIST_BEEP

export ZSH="/Users/lysander/.oh-my-zsh"
ZSH_THEME="ys"
plugins=(z zsh-syntax-highlighting)
source $ZSH/oh-my-zsh.sh

export HOMEBREW_NO_AUTO_UPDATE=true

export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
```

### Remove Duplicate

[Remove Duplicate zsh History](https://leetschau.github.io/remove-duplicate-zsh-history.html)

bash 会将所有终端的输入历史保存在 ~/.bash_history 中，同理，zsh 会保存在 ~/.zsh_history 中。

zsh 使用 HISTFILE 变量来管理保存的 zsh_history 文件，默认一般保存在 ~/.zsh_history 中。

### GNU command

[Using GNU command line tools in macOS instead of FreeBSD tools](https://ryanparman.com/posts/2019/using-gnu-command-line-tools-in-macos-instead-of-freebsd-tools)

**Choosing GNU for Consistency**

You can install most of the GNU flavored tools with:

```bash
brew install coreutils ed findutils gawk gnu-sed gnu-tar grep make
```

Assuming you have a fairly standard Terminal/shell environment, and assuming that you want to use the GNU versions instead of the BSD versions for everything you’ve installed with Homebrew, you can append the following to your ~/.profile file.

```bash
# Get list of gnubin directories
export GNUBINS="$(find /usr/local/opt -type d -follow -name gnubin -print)";

for bindir in ${GNUBINS[@]}; do
  export PATH=$bindir:$PATH;
done;
```

Using the GNU flavor of command line tools (instead of the FreeBSD flavor) should simplify the task of writing shell scripts which can work across macOS and GNU/Linux.

## General

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
| Close                    | ⌘W         | ⌥⌘W Close All             |
| Quit                     | ⌘Q         |                           |
| Find                     | ⌘F         |                           |
| Find Next                | ⌘G         | Find Previous ⇧⌘G         |
| Go to Beginning of Line  | ⌃A         | ⌘←                        |
| Go to End of Line        | ⌃E         | ⌘→                        |
| Paste from History       | ⇧⌘V        | GoLand √                  |
| Go to Beginning of File  | ⌘↑         | GoLand ⌘Home              |
| Go to End of File        | ⌘↓         | GoLand ⌘End               |
| Next Tab                 | ⌃Tab       | GoLand ⇧⌘]                |

## Terminal

> 选中自动复制，鼠标中键粘贴

> iTerm2 `⌘ + leftclick` 可以打开文件/文件夹

| Command            | Key                           | Remark                    |
| :----------------- | :---------------------------- | ------------------------- |
| quit               | q                             |                           |
| recently visited   | d                             | Enter numbers to jump     |
| view path          | Which                         |                           |
| horizontal split   | ⌘D                            | ⇧⌘D Vertical split screen |
| switch window      | ⌥⌘ Number                     |                           |
| switch tab         | ⌥⌘ Arrow                      | ⌘ Number                  |
| clear current line | ⌃U                            |                           |
| directory          | ⌃T                            | fzf                       |
| history            | ⌃T                            | fzf                       |
| equivalent to ↑/↓  | ⌃K/J                          | fzf                       |
| preview            | fzf --preview 'cat {}'        | fzf                       |
| list               | tmux ls                       | tmux                      |
| attach             | tmux -CC a -t <session-name>  | tmux                      |
| switch             | tmux switch -t <session-name> | tmux                      |

## Useful

### Magnet

[售价 ¥18.00](https://apps.apple.com/cn/app/magnet/id441258766?mt=12)，用键盘更方便！Mac 自带的分屏功能鼠标点击好麻烦...

### Automator

**设置快捷键 调用浏览器打开指定网页，[Alfred 也有类似功能](https://www.zhihu.com/question/32227549/answer/650519870)**  
自动操作-选取文稿类型-快速操作-运行 AppleScript
{{< code lang="applescript" >}}
on run {input, parameters}

    set myLink to "https://www.google.com"
    tell application "Chrome"
        activate
        tell front window to make new tab at after (get active tab) with properties {URL:myLink} -- open a new tab after the current tab
    end tell

    return input

end run
{{< /code >}}

系统偏好设置-键盘-快捷键-服务-通用，找到刚才保存的服务，设置快捷键即可

### Spotlight

聚焦搜索 不仅能快速打开软件、当计算器、查找文件，还能查汇率，算单位。例如「1 公斤等于多少磅？」或者「1 美元等于多少人民币」

### Handoff

[使用“连续互通”连接 Mac、iPhone、iPad](https://support.apple.com/zh-cn/HT204681)

### Hot Corners

系统偏好设置-桌面与屏幕保护程序-触发角，我一般把右下角设定为「将显示器置入睡眠状态」

## references

1. [iTerm2 integrated with tmux](https://www.iterm2.com/documentation-tmux-integration.html)
1. [iTerm2 整合 Tmux](https://blog.csdn.net/lvhdbb/article/details/95035743)
1. [Tmux 使用教程](http://www.ruanyifeng.com/blog/2019/10/tmux.html)
1. [终端 iTerm2](https://www.studytime.xin/article/mac-os-iterm.html)
