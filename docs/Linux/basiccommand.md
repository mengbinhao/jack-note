### Common

- init 3 //服务器终端登录
- init 0 //关机
- env
- ==ctrl + c== 终止加换行
- ==ctrl + u== 清空命令至行首
- ctrl + k 清空命令至行尾
- ==clear== 清屏
- ==tab== 一次或两次补全
- 复制文本
      windows/Linux下：Ctrl + insert，Mac下：command + c
- 粘贴文本
      windows/Linux下：Shift + insert，Mac下：command + v
- ctrl + r 搜索执行过的命令
- `type command`
- `which command`
- `tree xxx`  树状图列出目录的内容
- `ssh <username>@<hostname or IP address>`  远程登录
- `scp -P port -r /local/dir username@servername:/remote/dir` 上传文件夹到远程服务器
- `scp -P port -r username@servername:/remote/dir/ /local/dir` 从远程服务器下载文件夹
- `git`
- `maven`

### 帮助指令

- `man ls`
- help
  1. type xxx
  2. xxx help(内部命令)or xxx --help(外部命令)
- info ls

### 注销、关机、重启

- shutdown
    - shutdown -h now  立即关机
    - shutdown -h 1    1分后关机
    - shutdown -r now  立即重启
- halt(关机)
- reboot

> 关机前执行`sync`保存内存中的东西到磁盘

### 用户

- `useradd [options] username`

    - useradd -g groupname username

- `userdel [options] username`
  
    - userdel -r username //删除家目录
    
- `passwd [username]`

- 查询

    - `id [username]`
    - `whoami`
    - tail -10  /etc/passwd
    - tail -10  /etc/shadow
    - tail -10  /etc/group

- 修改用户属性

    - `usermod -g groupname username`
    - `usermod -d 目录名 用户名`
    - chage

- `exit / logout / ctrl+d` 注销(在运行级别3下有效)

- 切换用户

    - su - [username]   # - 代表运行环境也切换
    - sudo 以其他用户身份执行命令

    >1. root运行visudo
    >2. username ALL=/sbin/shutdown -c增加相应的命令权限
    >3. 切换用户执行

- 用户配置文件
  -  /etc/passwd    7属性
  - /etc/shadow
  -  /etc/group       4属性

### 用户组

- `groupadd groupname`
- `groupdel groupname`

### 权限
- 文件类型

    - \-    普通文件
    - d   目录
    - b   块特殊文件
    - c   字符特殊文件
    - l    符号链接
    - f    命名管道
    - s   套接字文件

- `chmod`

    - chmod u=rwx,g=rx,o=x xxx
    - chmod o+w xxx
    - chmod a-x xxx
    - chmod 755 xxx

- `chown`

    - chown newowner fileName
    - chown [newowner]:newgroup fileName
    - chown -R tom kkk/

- `chgrp`

    - chgrp newgroup file

- `-rwxrw-r-- 1 root root 6 Feb 2 09:39 abc`

    > - 第0位文件类型
    > - 1-3 owner权限 4-6 group权限 7-9 other权限
    > - 如果是文件表示硬链接的数,如果是目录则表述该目录的子目录个数
    > - root 拥有者
    > - root 所属组
    > - 文件大小,如果是目录显示4096
    > - 最后修改时间
    > - 文件名
    > - r=4、w=2、x=1

- ##### rwx作用在文件

    1. r 可读查看
    2. w 可写,但不一定能删除,删除前提条件是对文件所在的目录有w权限
    3. x 可执行

- ##### rwx作用在目录

    1. rx 显示目录内文件名
    2. wx 可修改,目录内创建 + 删除 + 重命名
    3. x 进入目录
    
- 当权限冲突以属主优先

    > `-----w---- user1 group1` user1不能w, group1其他用户可以w

- 特殊权限

  ![](./images/command-1.png)


### 目录列表
- `ls [-alrtRh] [目录名...]`
  - `ls /root /etc`
  - `ls -l [.]`
- `pwd`
- `cd`
  - `cd [~]` 
  - `cd -` 
  - `cd /xxx/yyy` 绝对路径
  - cd xxx/yyy 相对路径(可用.和..)


### 输出
- `echo $PATH`
- `echo $JAVA_HOME`
- echo 'hello JACK'


### 文件/文件夹
- `touch filename [filename2] [filenameX]`
- `mkdir foldername...`
    - mkdir -p /a/b/c   //递归创建
- `rm `
    - rm fileName...  //删除文件
    - rm [-rf] dirName... //删除非空目录
- `cp`
    - cp aaa.txt ./test2/
    - cp -r ./test/ ./test2/   //复制目录
    - cp -r  dir1 ../../newdir //复制并改名
    - cp -p xxx yyy   //时间不变
    - cp -a xxx yyy   //所有属性不变
- `mv`
    - mv 1.txt 2.txt
    - mv 1.txt ../1.txt
- `source xxxx` //重载配置文件
- **`~/.bashrc or ~/.zshrc` 环境变量配置**


### 文件内容查看
- cat fileName... / tac
  
  - `cat -n xxxxx` 将该文件的内容输出到标准输出中，并显示行号
- `cat file1 file2 > file3`  将file1和file2的内容依次添加到file3当中
  
  - cat -n /etc/profile | more
  
- head
  
  - `head -n xxx ` //默认10行
- `head -n -10 file` //不打印文件后十行内容
  
- tail
  - `tail -n xxx ` //默认10行
  -  `tail -n +100 xxx`  //显示100行以后的内容
  - `tail -f xxx`  //实时追踪文件变化

- `wc -l xxx` //行数

- more xxx 向下翻动文件

    ![](images/learn-7.png)

- less xxx 向上/下翻动文件 (分屏显示大文件)

    ![](images/learn-8.png)

- \>(输出重定向) / >>(追加)

    - ls -l > aaa.txt
    - ls -l >> aaa.txt
    - ls -l ./home/ > /home/info.txt
    - cat aaa.txt > bbb.txt
    - echo 'xxxx' >> bbb.txt
    - pbcopy < aaa.txt //复制到剪切板

- ln -s [源文件或目录] 软连接名

    - ln -s ./root linkToRoot
    - rm -rf linkToRoot

### 管道命令 |

### 打包/解包/压缩/解压缩

> .tar 打包
>
> .tar.gz / .tar.bz2 打包加压缩
>
> .tbz2和.tgz是双扩展名的缩写

- `tar -czf test.tar.gz /test1 /test2` //打包压缩文件可多个

- `tar -cjf test.tar.bz2 /test1 /test2` 

- `tar -zxf a.tar.gz -C /opt/ `  //指定解压到的目录需提前存在

- `tar -jxf test.tar.bz2`

    ![](images/learn-9.png)

- `apt-get install zip unzip`//zip unzip需要另行安装, 不会保留压缩前的文件

    - zip -r mypackage.zip /home/
    - unzip -d /opt/tmp/ mypackage.zip


### 查找
- find
  - `find / -name filename.txt`
    - 第一个参数代表从哪里找，可以指定目录或.或者..或者/根目录,可省略

    - filename.txt可以使用匹配  *.xml

        ```bash
        find /home -name hello.txt
        find /opt -user root  查找用户名为name的文件
        find / -group name 查找群组名为name的文件
        find / -size +20M
        find / -size -20480k
        find / -size 20M
        find / -name *.txt
        find /home -amin -10：十分钟内存取的文件或目录
        find / -mtime 0 查找24小时内被修改过的文件
        find /etc -mtime 3 查找3天前的24小时内被修改的文件
        find / -mtime +3 查找3天前（不含3天本身）被更改的文件
        find / -mtime -3 查找3天内被更改的文件
        find / -nouser 找不属于任何用户的文件，可能出现于网络文件，或是已经被删除的用户创建的文件
        find / -type TYPE 查找某一类文件，f：正规文件，b：设备文件，d：目录，l：连接文件，s：socket，p：FIFO
        ```

  - 结合管道命令

      ```bash
      find -name x.txt | xargs grep 234 结合管道命令查找文件内容
      find ./ -size 0 | xargs rm -f 根据size查找并删除
      ls -l | grep 'jar' 查找包含jar字符的文件
      ```

- `grep`and | (查找内容)

  - `grep 'test' d*`显示所有以d开头的文件中包含test的行

  - `grep 'test' aa bb cc`显示在aa、bb、cc文件中匹配test的行

  - `grep '[a-z]/{5/}' aa`显示所有包含每个字符串至少有5个连续小写字符的字符串的行

  - cat hello.txt | grep xxx

  - cat hello.txt | grep -n xxx

  - cat hello.txt | grep -i xxx

    ```bash
    grep pass /root/xxx.cfg | cut -d " " -f 1
    ```

- locate

    - updatedb
    - locate hello.txt

### 历史命令

- history 10
- !178 //运行编号178的命令
- !ls //执行最后一次以ls开头的命令

### 时间日期

- date
  - date "+%Y"
  - date "+%m"
  - date "+%d"
  - date "+%Y-%m-%d %H:%M:%S"
  - date -s "2018-10-10 11:22:22" //set date
- cal
  - cal 2020

### 进程查看

- ps

  - ps -ef | grep tomcat

  - ps -aux | grep java  // a显示当前终端所有进程 u用户格式显示进程信息  x显示后台进程运行的参数)

    ![](images/learn-16.png)

- kill -l

- kill [-9] pid  # 支持通配符 9信号强制杀

- killall gedit

- ./a.sh &  # 后台运行

- pstree

- top(动态监控进程)

  - 监控中按u,输入用户名进行用户过滤
  - 监控中按k,再输入要结束的进程号

  ![](images/learn-18.png)

- 进程放入后台

  - <命令> & 把命令放入后台，并在后台执行
  - <命令> 执行后按下 ctrl + z 快捷键，放在后台暂停
  - 查看正在后台的工作，可以使用`jobs [-l] `命令，-l 是显示工作的 PID

- 恢复到前台

  - fg %工作号 将后台暂停的工作恢复到前台执行，这里的%可以省略，注意工作号和PID的区别
  - bg %工作号 将后台暂停的工作恢复到后台执行，后台恢复执行的命令，是不能和前台有交互的，否则不能恢复到后台执行

- 后台命令脱离登陆终端执行的方法
  - 把需要后台执行的命令加入/etc/rc.local文件
  - 使用系统定时任务，让系统在指定的时间执行某个后台命令
  - nohup <命令> &

### 内存查看

- free [-m | -g]
- top

### 磁盘查看

- fdisk -l
- parted -l
- df -h
- du xxx
- du compare ls # du实际容量大小 ls所占空间

### 网络查看

- ifconfig ｜ ip
- ping
- telnet
- netstat -ntpl | grep 80

### 系统综合状态查看

- sar
- iftop -p

### install

> CentOS、RedHat使用yum包管理器，软件包安装格式为rpm
>
> Debian、Ubuntu使用apt包管理器，软件包安装格式为deb

#### rpm

![](./images/learn-23.png)

```bash
# rpm 无法解决依赖， 软件包来源不可靠
rpm -i jdk-XXX_linux-x64_bin.rpm
rpm -ivh firefox
rpm -qa
rpm -qa | grep jdk
rpm -qa | more
# 查询是否安装
rpm -q firefox
rpm -e firefox
# 强制卸载
rpm -e --nodeps firefox
```

#### **yum**

```bash
# yum
# 修改到国内镜像源
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo

yum makecache

yum list | grep firefox
yum search jdk
yum install xxx
yum remove xxx
yum update [xxx]
```

#### 编译源码安装

#### [curl](https://segmentfault.com/a/1190000020436170)

- wget http://file.tgz`  # 文件下载
- `curl http://file.tgz` # 文件下载
  - curl xxx > yyy