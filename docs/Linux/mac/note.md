#### hot key

- space
- ⌘ + control + space emoji

- ⌘ + C 复制
- ⌘ + X 剪切
- ⌘ + V 粘贴
- ⌘ + option + V 粘贴,原复制对象不会保留,相当于「移动」
- ⌘ + Z 撤销
- ⌘ + A 全选
- ⌘ + delete 删除
- ⌘ + S 保存
- ⌘ + N 新建
- ⌘ + p 打印

- ⌘ + W 关闭当前的软件窗口,相当于点了左上角的红色叉叉
- ⌘ + Q 真正退出软件
- ⌘ + option + esc 强制退出某个软件.通常在软件无响应时使用
- ⌘ + control + 电源按钮 强制重启

- control + space 切换输入法
- ⌘ + space search
- ⌘ + tab

- ⌘ + shift + 3 截取整屏
- ⌘ + shift + 4 截选定区域
- ⌘ + shift + 4 + space 截取窗口

- ⌘ + l 定位到地址栏
- ctrl + tab 切换标签页
- ⌘ + +/-
- ⌘ + r

- fn + control + up/down
- control + u
- alias
- 可以直接.. or ...

#### Multi-Touch

- 点按 / 辅助点按
- 双指缩小放大网页or图片 / 双指上下滑 / 双指联系轻点放大 / 双指从中间左右滑动向前向后翻页
- 三指轻扫在桌面和全屏app切换
- 三指向上轻扫查看运行app
- 四指合拢/打开查看所有app
- 双指右侧划入触控板打开通知中心

#### app

- .app / .dmg / .pkg
- 直接拖到应用程序 / ⌘ + delete

#### others
- 触发角
- handoff
- AriDrop
- ⌘ + 拖动 状态栏图标
- 终端输入`sudo spctl --master-disable`打开『允许未知来源』

#### dev

- [homebrew](https://brew.sh/) + [iTerm2](https://iterm2.com/) + zsh + git + [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) + fd + fzf + bat + z
```bash
# brew will install xcode first
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# change mirror to tuna???
cd "$(brew --repo)"
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# install zsh if needed
# https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH
# brew install zsh
zsh --version
# change to default
chsh -s /bin/zsh
# check
echo $SHELL

# install git
brew install git

# install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# install syntax highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc

# enable syntax highlighting in the current interactive shell
source ./zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# install zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# install neofetch or screenfetch
brew install neofetch

# install nerd-fonts
brew cask install font-hack-nerd-font

# configure spaceship-prompt theme
git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt"

ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
ZSH_THEME="avit"

# configure ~/.zshrc
vim ~/.zshrc
plugins=(
    git
    zsh-autosuggestions
)

source $ZSH_CUSTOM/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source $ZSH_CUSTOM/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source ~/.zshrc

# install fd fzf bat z
brew install fd fzf bat z

# config fd + fzf + z in .zshrc
vim ~/.zshrc
export FZF_DEFAULT_COMMAND='fd --type file --exclude={.git,.idea,.vscode,.sass-cache,node_modules}'
export FZF_CTRL_T_COMMAND=$FZF_DEFAULT_COMMAND
export FZF_ALT_C_COMMAND="fd -t d . "
export FZF_DEFAULT_OPTS="--height 40% --layout=reverse --preview (bat --style=numbers --color=always {} || cat {}) 2> /dev/null | head -500'"

. /usr/local/etc/profile.d/z.sh
unalias z
q() {
  if [[ -z "$*" ]]; then
      cd "$(_z -l 2>&1 | fzf +s | sed 's/^[0-9,.]* *//')"
  else
      _last_z_args="$@"
      _z "$@"
  fi
}

qq() {
    cd "$(_z -l 2>&1 | sed 's/^[0-9,.]* *//' | fzf -q $_last_z_args)"
}
source ~/.zshrc

# change key-bindings
vim /usr/local/opt/fzf/shell/key-bindings.zsh

# - 66 bindkey '\ec' fzf-cd-widget
# + 66 bindkey '^\' fzf-cd-widget
source /usr/local/opt/fzf/shell/key-bindings.zsh
```
- Vim
```bash
git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime
sh ~/.vim_runtime/install_awesome_vimrc.sh

# 下面是配置
vim ~/.vimrc
set runtimepath+=~/.vim_runtime
set nocompatible               # 去掉有关vi一致性模式，避免以前版本的bug和局限
set nu!                        #  显示行号
set history=1000               #  记录历史的行数
set autoindent                 # vim使用自动对齐，也就是把当前行的对齐格式应用到下一行(自动缩进)
set cindent                    #  cindent是特别针对 C语言语法自动缩进
set smartindent                # 依据上面的对齐格式，智能的选择对齐方式，对于类似C语言编写上有用
set tabstop=4                  # 设置tab键为4个空格，
set ai!
set showmatch                  # 设置匹配模式，类似当输入一个左括号时会匹配相应的右括号
set guioptions-=T              #  去除vim的GUI版本中得toolbar
set vb t_vb=                   # 当vim进行编辑时，如果命令错误，会发出警报，该设置去掉警报
set ruler                      # 在编辑过程中，在右下角显示光标位置的状态行
set incsearch
set mouse=a                    # 鼠标控制光标

source ~/.vim_runtime/vimrcs/basic.vim
source ~/.vim_runtime/vimrcs/filetypes.vim
source ~/.vim_runtime/vimrcs/plugins_config.vim
source ~/.vim_runtime/vimrcs/extended.vim

try
  source ~/.vim_runtime/my_configs.vim
catch
  endtry

call plug#begin('~/.vim/plugged')   # 设置完:PlugInstall 参考 https://github.com/junegunn/vim-plug

call plug#end()

let g:seoul256_background = 236     # theme
silent! colo seoul256

# 特别注意 配置完之后 一定不要 source ~/.vimrc
```
3. `brew install wget zip unzip`
4. `brew cask install google-chrome` + [shadowsocks](https://github.com/shadowsocks/ShadowsocksX-NG/releases) + proxychains-ng(命令行翻墙)
```bash
brew install proxychains-ng
# add conf file
strict_chain
quiet_mode
proxy_dns

remote_dns_subnet 224
tcp_read_time_out 15000
tcp_connet_time_out 8000
[ProxyList]
# from ss
socks5 127.0.0.1 1086
# use proxychains4
proxychains4 -f ~/proxychains.conf curl -L www.goole.com
# add alias to .zshrc
alias pc="proxychains4 -f ~/proxychains.conf"
source ~/.zshrc
pc curl -L www.goole.com
```
5. vscode(⌘ + shift + p)
6. node.js
7. java + maven

#### some tips

- bash function