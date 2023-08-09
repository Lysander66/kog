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
| Preview                  | Space      |                           |
| Switch input             | ⌃Space     |                           |
| Switch Input             | ⇪          | Long press to switch case |
| Folder                   | ⌘↑/↓       | Finder √                  |
| Dispatch center          | ⌃↑         |                           |
| Desktop                  | F11        |                           |
| Delete                   | ⌘Backspace |                           |
| Paste without Formatting | ⌥⇧⌘V       |                           |
| Undo                     | ⌘Z         | ⇧⌘Z Redo                  |
| Close                    | ⌘W         | ⌥⌘W Close All             |
| Quit                     | ⌘Q         |                           |
| Find                     | ⌘F         |                           |

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

### Handoff

[使用“连续互通”连接 Mac、iPhone、iPad](https://support.apple.com/zh-cn/HT204681)

### 触控手势

[触控手势](https://support.apple.com/zh-cn/HT204895)

## references

1. [iTerm2 integrated with tmux](https://www.iterm2.com/documentation-tmux-integration.html)
1. [Tmux 使用教程](http://www.ruanyifeng.com/blog/2019/10/tmux.html)
