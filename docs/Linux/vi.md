![](./images/vim-1.png)


### Normal-mode
- h、j、k、l方向
- 删除光标后字符x、删除光标前字符X
- yy复制行、y$复制光标之后、yw复制单词、`#yy或#yw`(#个字或行)
- dd剪切、d$、#dd
- 粘帖p
- 撤销u、ctrl + r反撤销
- G跳到末尾、gg跳到行首、#gg、:行号+回车
- r替换
- ^ / $ 行首末
- control + u / d 翻半页

### Insert-mode
- [shift] + i、a、o 

### Open

- vi [fineName] 直接:w

### Command-mode(读取、存盘、替换、显示行号、退出vi等)

- : or /
- 行号 :set nu、:set nonu
- 查找/xxx+enter  n后找  N前找
- :w [fileName],若通过加文件名打开的vi则可以直接:w
- :q :q! :wq
- :!执行命令
- 替换
  - :s/old/new 只替换光标后
  - :%s/old/new
  - :%s/old/new/g
  - :3,5s/old/new/g
  - :%s@/@//@g  修改/为//
- vim file1 file2 同时打开两个文件， 第一个文件使用yy复制， 使用:next 打开下一个文件 ，使用p命令粘贴，返回上一个文件使用:prev

### Visual-mode

- v、V、ctrl+v

### configration

- /etc/virc、/etc/vimrc
  - add`set nu` in last row