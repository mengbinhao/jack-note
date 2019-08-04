### macos
- type xx  # 是否内建命令
- which xx # 更偏向于查询可执行文件的具体路径
- curl xxx > yyy
- source
- vi / vim
- ~ //用户目录
- open
- touch
- mkdir

### required app

#### Alfred
- 粘贴板
- workflow

#### shadowsocks + chrome
  - shadowsocks-libev
  - chrome Proxy SwitchyOmega
  - proxychains-ng

#### vmware?

#### Dash
### cheatsheet(⌘)


### dev
#### homebrew
```bash
brew update
brew --help
man brew
brew [cask] install xxx
brew uninstall xxx
brew search xxx
brew list
brew update
brew outdated
brew upgrade xxx
brew info xxx
brew home xxx
brew cleanup
brew cleanup xxx
```

#### iterm2
- Split Panes
- Hotkey Window
- Search
- Autocomplete
- Mouseless Copy
- Paste History
- Instant Replay
- Configurability
- ...

#### zsh + oh-my-zsh
- control + u 删除一行

#### fd(代替find)
```bash
fd

fd xxx

fd -e ext

fd txt -t f

# 排除wp-content目录
fd test -E wp-content

# 指定目录
fd test ./testDirectory

fd -e jpg -x chmod 777

fd '^[A-D]'
```

#### fzf
- 查找文件
- 历史命令查询
- 快速进入目录

```bash
# ** or tab 自动补全

find . type -f | fff

find . type -f | fff > test

# history command
control + r

fzf = control + t
# 列出当前目录下目录
control + \

# 支持正则
^1 | 2&

fzf --preview 'cat {}'
fzf --preview 'head -100 {}'
```
##### git plugin
```bash
gapa    git add --patch
gc!    git commit -v --amend
gcl    git clone --recursive
gclean    git reset --hard && git clean -dfx
gcm    git checkout master
gcmsg    git commit -m
gco    git checkout
gd    git diff
gdca    git diff --cached
gp    git push
grbc    git rebase --continue
gst    git status
gup    git pull --rebase
```
#### vscode
- ⌘ + shift + p
#### SourceTree?
#### autojump?
#### z?