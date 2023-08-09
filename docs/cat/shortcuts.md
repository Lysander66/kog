---
title: Keyboard shortcuts
---

## Common

| Shortcut | Action                                                                            | Note |
| -------- | --------------------------------------------------------------------------------- | ---- |
| ⌘ A      | Select All items                                                                  |      |
| ⌘ W      | Close the front window                                                            |      |
| ⌥ ⌘ W    | Close all windows of the app                                                      |      |
| ⌃ A      | Move to the beginning of the line or paragraph                                    |      |
| ⌃ E      | Move to the end of a line or paragraph                                            |      |
| ⇧ ⌘ ←    | Select the text between the insertion point and the beginning of the current line |      |
| ⇧ ⌘ →    | Select the text between the insertion point and the end of the current line       |      |
| ⇧ ⌘ ↑    | Select the text between the insertion point and the beginning of the document     |      |
| ⇧ ⌘ ↓    | Select the text between the insertion point and the end of the document           |      |
| ⌘ G      | Find Next                                                                         |      |
| ⇧ ⌘ G    | Find Previous                                                                     |      |
| ⌃ Tab    | Jump to the next open tab                                                         |      |
| ⇧ ⌃ Tab  | Jump to the previous open tab                                                     |      |

- [Mac keyboard shortcuts](https://support.apple.com/en-hk/HT201236)

| Shortcut | Action                                          | Note                           |
| -------- | ----------------------------------------------- | ------------------------------ |
| ⌘ V      | Paste                                           |                                |
| ⌥ ⌘ V    | Cut                                             |                                |
| ⌘ ,      | Open preferences for the front app              | 打开最前面的 App 的偏好设置    |
| ⌃ ⌘ Q    | Immediately lock your screen                    | 立即锁定屏幕                   |
| ⌘ D      | Duplicate the selected files                    | 复制所选文件                   |
| ⌘ R      | Show the original file for the selected alias   | Finder                         |
| ⌥ ⌘ D    | Dock                                            | 显示或隐藏“程序坞”             |
| ⇧ ⌘ P    | Show or hide the Preview pane in Finder windows | 隐藏或显示“访达”窗口中的路径栏 |
| ⇧ ⌘ .    | Hidden files                                    |                                |

## Chrome

- [keyboard shortcuts](https://support.google.com/chrome/answer/157179?hl=en)

| Shortcut | Action                         | Note |
| -------- | ------------------------------ | ---- |
| ⇧ ⌘ B    | Show or hide the Bookmarks Bar |      |

- [Vimium - The Hacker's Browser](https://github.com/philc/vimium)

_Key Bindings_

Navigating the current page:

    yy      copy the current url to the clipboard

Navigating to new pages:

    o       Open URL, bookmark, or history entry
    O       Open URL, bookmark, history entry in a new tab
    b       Open bookmark
    B       Open bookmark in a new tab

Manipulating tabs:

    t       create tab
    x       close current tab
    X       restore closed tab (i.e. unwind the 'x' command)
    W       move current tab to new window

_Vimium Options -> Custom key mappings_

```
unmap u
unmap d
unmap H
unmap L
map <c-u> scrollPageUp
map <c-d> scrollPageDown
# 跟 GoLand 一致
map <m-[> goBack
# 跟 GoLand 一致
map <m-]> goForward
map >> closeTabsOnRight
map CO closeOtherTabs
```

## GoLand

- [Keyboard shortcuts](https://www.jetbrains.com/help/go/reference-keymap-mac-default.html#navigate_from_symbols)

| Shortcut        | Action                      | Note |
| --------------- | --------------------------- | ---- |
| Double `⇧Shift` | Search Everywhere           |      |
| ⌘ B             | Go to Declaration or Usages |      |
| ⌥ ⌘ F7          | Show Usages                 |      |
| ⌘ ]             | navigate forward            |      |
| ⌘ [             | navigate backwards          |      |
| ⇧ ⌘ ]           | Select Next Tab             |      |
| ⇧ ⌘ [           | Select Previous Tab         |      |
| ⌘ +             | Expand                      |      |
| ⌘ -             | Collapse                    |      |
| ⇧ ⌘ +           | Expand All                  |      |
| ⇧ ⌘ -           | Collapse All                |      |

- [.ideavimrc](https://plugins.jetbrains.com/plugin/164-ideavim)

```vim
Plug 'easymotion/vim-easymotion'
" set <leader> to <space>
let mapleader = " "
set easymotion
map <Leader> <Plug>(easymotion-prefix)

set showmode
inoremap jj <Esc>
nnoremap o o<esc>
nnoremap O O<esc>

set incsearch
set hlsearch
```

## Visual Studio Code

- [Key Bindings](https://code.visualstudio.com/docs/getstarted/keybindings)

| Shortcut | Action                    | Note |
| -------- | ------------------------- | ---- |
| ⌘ B      | Toggle Sidebar Visibility |      |
| ⌘ J      | Toggle Panel              |      |

settings.json

```json
{
  "vim.useSystemClipboard": true,
  "vim.useCtrlKeys": true,
  "vim.handleKeys": {
    "<C-c>": false,
    "<C-v>": false,
    "<C-w>": false,
    "<C-a>": false,
    "<C-f>": false,
    "<C-g>": false,
    "<C-r>": false,
    "<C-b>": false,
    "<C-j>": false
  },
  "vim.insertModeKeyBindings": [
    {
      "before": ["j", "j"],
      "after": ["<Esc>"]
    }
  ],
  "vim.leader": "<space>",
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "d"],
      "after": ["d", "d"]
    },
    {
      "before": ["<C-n>"],
      "commands": [":nohl"]
    },
    {
      "before": ["K"],
      "commands": ["lineBreakInsert"],
      "silent": true
    }
  ],
  "vim.normalModeKeyBindings": [
    {
      "before": ["o"],
      "after": ["o", "<Esc>"]
    },
    {
      "before": ["O"],
      "after": ["O", "<Esc>"]
    },
    {
      "before": ["<leader>", "s"],
      "after": ["<leader>", "<leader>", "s"]
    },
    {
      "before": ["<leader>", "t", "n"],
      "commands": [":tabnext"]
    },
    {
      "before": ["<leader>", "t", "p"],
      "commands": [":tabprev"]
    },
    {
      "before": ["<leader>", "t", "f"],
      "commands": [":tabfirst"]
    },
    {
      "before": ["<leader>", "t", "l"],
      "commands": [":tablast"]
    }
  ],
  "vim.incsearch": true,
  "vim.hlsearch": true,
  "vim.ignorecase": false,
  "vim.easymotion": true,
  "vim.sneak": false,
  "vim.surround": false,
  "vim.statusBarColorControl": true,
  "vim.statusBarColors": {
    "normal": "#005f5f",
    "insert": "#5f0000",
    "visual": "#5f00af",
    "visualline": "#005f87",
    "visualblock": "#86592d",
    "replace": "#000000"
  },
  "workbench.colorCustomizations": {
    "statusBar.background": "#005f5f",
    "statusBar.noFolderBackground": "#005f5f",
    "statusBar.debuggingBackground": "#005f5f"
  }
}
```
