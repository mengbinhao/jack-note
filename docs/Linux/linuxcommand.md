### 用户
- `sudo -i` 切到管理员
- `su username`  切换用户


### 权限
- `sudo rm a.txt` 使用管理员执行命令
- `chmod 777 filename.txt`


### wget / apt / yum
- `apt update`
- `apt install xxx`
- `apt remove xxx`
- `apt search`
- `apt purge` 移除软件包及配置文件
- `wget http://file.tgz` 文件下载
- `curl http://file.tgz` 文件下载
  - curl xxx > yyy


### 管道命令|


### 目录列表
- `ls -al`
- `pwd`
- `cd`
  - `cd ~` 用户目录
  - `cd -` 返回上次目录


### 输出
- `echo $PATH`
- `echo $JAVA_HOME`


### 文件
- `touch xxx`
- `mkdir xxxx`
- `cp -a /sourceFolder /targetFolder`
- `rm -rf /xxx/yyy/zzz`
- `mv /temp/movefile /targetFolder`
- `mv oldNameFile newNameFile` 重命名
- `source xxxx` 重载配置文件
- **`~/.bashrc or ~/.zshrc` 环境变量配置**


### 文件内容
- head
  - `head -n 10 xxx.txt`
  - `head -n -10 file` 不打印文件后十行内容
- tail
  - `tail -n 10 xxx.txt`
  - tail -n +100 file 只打印100行以后的内容
- cat
  - `cat -n xxxxx` 将该文件的内容输出到标准输出中，并显示行号
  - `cat file1 file2 > file3`  将file1 file2的内容依次添加到file3当中
- tac
- more ${FILE_NAME} 向下翻动文件
- less ${FILE_NAME} 向上/下翻动文件
- grep [-acinv] [--color=auto] 'keyword' filename


### 压缩 & 解压
- `tar -czf test.tar.gz /test1 /test2` //压缩文件可以多个
- `tar -zxvf test.tar.gz`


### 查找
- find
  - `find / -name filename.txt`
    - 第一个参数代表从哪里找，可以指定目录或.或者..或者/根目录,可省略
    - filename.txt可以使用匹配  *.xml
  - `find -name x.txt| xargs grep 234` 结合管道命令查找文件内容
  - `find ./ -size 0 | xargs rm -f` 根据size查找并删除
  - `ls -l | grep 'jar'` 查找包含jar字符的文件
  - `find / -mtime 0` 查找24小时内被修改过的文件
  - `find /etc -mtime 3` 查找3天前的24小时内被修改的文件
  - `find / -mtime +3` 查找3天前（不含3天本身）被更改的文件
  - `find / -mtime -3` 查找3天内被更改的文件
  - `find / -user name` 查找用户名为name的文件
  - `find / -group name` 查找群组名为name的文件
  - `find / -nouser` 找不属于任何用户的文件，可能出现于网络文件，或是已经被删除的用户创建的文件
  - `find / -type TYPE` 查找某一类文件，f：正规文件，b：设备文件，d：目录，l：连接文件，s：socket，p：FIFO
- grep查找内容
  - `grep 'test' d*`显示所有以d开头的文件中包含test的行
  - `grep 'test' aa bb cc`显示在aa、bb、cc文件中匹配test的行
  - `grep '[a-z]/{5/}' aa`显示所有包含每个字符串至少有5个连续小写字符的字符串的行


### 进程
- ps
  - ps -ef | grep tomcat
  - ps aux| grep java
- `kill -9 xxxxx`


### 网络
- `netstat -tln | grep 8080` 查看端口8080的使用情况
- `lsof -i :8080`  查看端口属于哪个程序
- `ping www.taobao.com`


### other
- `type command`
- `which command`
- `whereis command`
- `tree xxx`  树状图列出目录的内容
- `ssh userName@ip`  远程登录
- `git`
- `maven`