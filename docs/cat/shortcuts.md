---
slug: Keyboard shortcuts
---

## General

| Shortcut | Action                        | Note |
| -------- | ----------------------------- | ---- |
| ⌘ G      | Find Next                     |      |
| ⇧ ⌘ G    | Find Previous                 |      |
| ⌃ Tab    | Jump to the next open tab     |      |
| ⇧ ⌃ Tab  | Jump to the previous open tab |      |

## macOS

- [Mac keyboard shortcuts](https://support.apple.com/en-hk/HT201236)

| Shortcut | Action       | Note |
| -------- | ------------ | ---- |
| ⌘ V      | Paste        |      |
| ⌥ ⌘ V    | Cut          |      |
| ⌥ ⌘ D    | Dock         |      |
| ⇧ ⌘ .    | Hidden files |      |

## Chrome

- [keyboard shortcuts](https://support.google.com/chrome/answer/157179?hl=en)

| Shortcut | Action                         | Note |
| -------- | ------------------------------ | ---- |
| ⇧ ⌘ B    | Show or hide the Bookmarks Bar |      |

- [Vimium - The Hacker's Browser](https://github.com/philc/vimium)

Vimium Options -> Custom key mappings

```
map f LinkHints.activateModeToOpenInNewTab
map F LinkHints.activateMode
map CO closeOtherTabs
map >> closeTabsOnRight
```

_Key Bindings_

Navigating the current page:

    d       scroll down half a page
    u       scroll up half a page
    yy      copy the current url to the clipboard

Navigating to new pages:

    o       Open URL, bookmark, or history entry
    O       Open URL, bookmark, history entry in a new tab
    b       Open bookmark
    B       Open bookmark in a new tab

Navigating your history:

    H       go back in history
    L       go forward in history

Manipulating tabs:

    t       create tab
    x       close current tab
    X       restore closed tab (i.e. unwind the 'x' command)
    W       move current tab to new window

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
