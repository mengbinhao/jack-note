### Shell
![](./images/learn-20.png)
Shell 是一个命令行解释器,它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序,用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序

- `cat /etc/shells`
- `echo $SHELL`

### Type
- Bourne Shell（/usr/bin/sh或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）

  > 在一般情况下，并不区分Bourne Shell和Bourne Again Shell，所以像#!/bin/sh，它同样也可以改为#!/bin/bash

### 执行方式

1. `bash ./xxx.sh``  执行时开启一个子进程，执行完退出，不对当前Shell生效，不需要x权限
2. `./xxx.sh`  执行时开启一个子进程，执行完退出，不对当前Shell生效，需要x权限，使用系统默认shell执行，然后里面根据脚本里的sha-bang解释器解释
3. `source ./xxx.sh  ` 对当前Shell生效
4. `. ./xxx.sh ` 对当前Shell生效

**运行时一定要写成./test.sh，因为直接写test.sh，linux会去PATH里寻找，而一般只有/bin,/sbin,/usr/bin,/usr/sbin等在PATH中，所以使用./test.sh告诉系统，就在本目录下找**

### 内建命令和外部命令的区别

- 内建命令不需要创建子进程
- 内建命令对当前Shell生效

### 管道和重定向

#### 管道

- 将前一个命令的结果传递给后面的命令
- `car xxx | more`
- `cat | ps -f`
- 其为前后两个命令建立两个子进程，内部命令的结果不会传递给子Shell，因此使用管道的时候规避使用内建命令

#### 重定向

- 一个进程默认会打开标准输入、标准输出、错误输出3个文件描述符
- <
  - `read var < file`

- \>、\>\>、2\>、&\>
  - `echo 123 > file`
- `cat > file << EOF`

### Shell特殊字符

#### {}

```bash
mkdir {0..9}
echo {0..9}
```

#### 通配符

- *代表多个字母或数字
- ?代表一个字母或数字
`ls a* ls a? ls f080[1-6].tif`

#### 转义字符\

`ls /mnt/win1/My\Documents`

#### 单引号：不处理任何变量和命令

`echo 'Welcome $NAME, the date is date'`

#### 双引号：处理变量但不处理命令

`echo "Welcome $NAME, the date is date"`

#### 反引号：把引号中的每个单词作为一个命令,如果是变量则先求值然后作为一个命令处理

```bash
NAME=pwd
echo "Welcome `$NAME`, the date is `date`"
```

### 注释
```bash
# 单行
# 多行
:<<!
e21e1e1
13213131
!
```
### 变量(系统变量、用户变量)


#### 变量命名规则

1. 变量名称可以由字母、数字和下划线组成,但是不能以数字开头
2. 等号两侧不能有空格
3. 变量名称一般习惯为大写
4. 在bash中,变量默认类型都是字符串类型,无法直接进行数值运算
5. 变量的值如果有空格,需要使用双引号或单引号括起来


```bash
# 不允许使用空格，默认都是字符串类型
echo "PATH=$PATH"
A=100
echo "A=$A"
# 删除
unset A
echo "A=$A"
# 静态变量不能unset
readonly B=99
# 命令结果赋值
C = `ls -al`  
D = $(ls -al)
```

####系统变量 

- \$HOME、\$PATH、\$PWD、\$USER、\$SHELL、\$PS1
- set or env

#### 查看变量

```bash
# 查看变量 部分情况下可省略{}
echo ${NAME}
```

#### 变量作用范围

- 默认作用范围
- 使用source执行xxx.sh的时候子进程可以获取父进程的变量
- `export xxxx` # 子进程可以获取父进程变量,临时加入一个系统路径
- `source xxx`  使生效

#### 预定义变量

- \$$  当前进程PID
- \$!  后台运行的最后进程号
- \$?  最后一次执行命令的返回状态,0正确,非0执行不正确
- \$0 执行的环境

#### 位置参数变量

- \$n  n为数字 $0命令本身 \$1-\$9, 十以上大括号包含\${10}
- \$*  所有参数
- \$@  所有参数,用于遍历
- \$#  参数个数

```bash
echo "$0 $1 $2"
echo "$*"
echo "$@"
echo "$#"

# 当传值使用，当空赋值为_
pos=${2-_}
```

#### 环境变量配置文件(数字代表加载顺序，第二列数字是nologin加载顺序)

- /etc/profile          1
- /etc/profile.d/
- ~/.bash_profile   2 
- ~/.bashrc            3        1
- /etc/bashrc         4        2

> etc下面代表所有用户通用配置
>
> ～开头代表用户特有配置，一个login shell，一个nologin shell
>
> su - root  带减号login shell

### 数组
- 定义
`array_name=( value0 value1 value2 value3 )` # 使用空格分隔元素

​      `array_name[0]=value0 / array_name[1]=value1 `# 下标可以不连续
- 读取
  - 单个读取：${array_name[index]}
  - 全部读取：${array_name[@]}
- 获取长度：
  - 数组长度：length=\${#array_name[@]}
  - 单个元素长度：lengthn=${#array_name[n]}

### 运算符
- \$((运算式)) or $[运算式]
- expr m + n (+、-、*、/、**、%)   # expr运算符间要有空格
```bash
# 双圆括号是let命令简化
RESULT1=$(((2+3)×4))
# 推荐推荐推荐
RESULT2=$[(2+3)×4]

TEMP=`expr 2 + 3`
RESULT3=`expr $TEMP \* 4`

SUM=$[$1+$2]
```

### test利用程序是否正常退出返回0或1
**Shell里0表示True 非0表示false**

- 文件测试

  - 按照文件权限(-r可读权限 -w可写权限 -x执行权限)
  - 按照文件类型(-f存在并是常规文件 -e文件存在 -d存在并是目录)

- 整数比较测试(-lt -le -eq -gt -ge -ne)

- 字符串测试

  > 多条件判断(&& 表示前一条命令执行成功时,才执行后一条命令,|| 表示上一条命令执行失败后,才执行下一条命令)

```bash
# 一般中括号可以用test替换test $num = $num2
# 两个中括号才能使用<>
[ $var -eq 0 ]
# 文件是否存在
[ -e $var ]
# 是否是目录
[ -d $var ]
# 两个字符串是否相同
[[ $var1 = $var2 ]]

-a/-o：and/or
-e : exist
-r : 是否可读
-w : 是否可写
-n ：判断字符串长度是否非0
-z ：判断字符串长度是否为0
$ :判断字符串是否非空
```

### 流程控制
#### if
```bash
# if后要有空格
# [ 条件判断式 ]中括号和条件判断式之间必须有空格
# 条件非空即为true,[ atguigu ]返回true,[] 返回false
if [ "ok" = "ok" ]  
then
    echo "equal"
fi

if [ 23 -gt 22 ]
then
    echo "dayu"
fi

if [ -e /root/shell/aaa.txt ]
then
    echo "existing"
fi

if [ $1 -ge 60 ]
then
    echo "xxx"
else [ $1 -lt 60 ]
    echo "yyy"
fi

if [ $1 -ge 60 ]
then
    echo "xxx"
elif [ $1 -lt 60 ]
then
    echo "yyy"
else
		echo "zzz"
fi
```
#### case
```bash
case "$1" in
  "a")
      echo "a"
  ;;
  "b")
      echo "b"
  ;;
  *)
      echo "other"
  ;;
esac
```
1. case行尾必须为单词“in”,每一个模式匹配必须以右括号“）”结束
2. 双分号“;;”表示命令序列结束,相当于java中的break
3. 最后的“*）”表示默认模式,相当于java中的default


#### for
```bash
for i in "$*"
do
    echo "$i"
done

for j in "$@"
do
    echo "$j"
done

# for sc_name in /etc/profile.d/*.sh
for $filename in `ls *.mp3`
do
	mv $filename $(basename $filename .mp3).mp4 
done

# advanced-language style
SUM=0
for((i=1;i<=100;i++))
do
    SUM=$[$SUM+$i]
done
echo "sum=$SUM"
```
> \$*和\$@都表示传递给函数或脚本的所有参数,不被双引号包含时,都以\$1 \$2 …\$n的形式输出所有参数,当它们被双引号包含时,\$\*会将所有的参数作为一个整体,以"\$1 \$2 …\$n"的形式输出所有参数；$@会将各个参数分开,以“\$1” “\$2”…”\$n”的形式输出所有参数
>
> 使用反引号或\$()方式执行命令，命令的结果到做参数列表
>
> 列表包含多个变量，变量使用空格分隔
>
> 对文本处理，要使用文本查看命令取出文本内容，默认逐行处理，若文本出现空格会当作多行处理

#### while(until：与while相反操作，条件为true时退出循环)
```bash
a=1
while [ $a -lt 10 ]
do
		((a++))
    echo $a
done

# 构建死循环
while :
do
	echo xxxx
done
```

#### break、continue

### function
#### 系统函数

- /etc/init.d/fucntions   系统函数脚本

```bash
# '导入'直接用
source /etc/init.d/fucntions
xxxx

basename /home/aaa/test.txt
basename /home/aaa/test.txt .txt
dirname /home/aaa/test.txt
```

#### 自定义函数
```bash
# function可省略
function fname() {
	Action;
	[return int;]
}
fname
unset fname

cdls() {
	cd $1
	ls
}
cdls

checkpid() {
 	local i
 	for i in $*:
 	do
 		[ -d "/proc/$i" ] && return 0
 	done
 	return 1
}
```
- 必须在调用函数地方之前,先声明函数,shell脚本是逐行运行，不会像其它语言一样先编译

- 函数返回值,只能通过\$?系统变量获得,可以显示加：return返回,如果不加,将以最后一条命令运行结果,作为返回值。return后跟数值n(0-255)

- 局部变量local修饰，不进行修饰那么函数执行后，其他地方也可以使用
- 函数的参数\$1 \$2 ... \$n

### 信号

- kill默认发送15信号给应用程序

- ctrl + c发送2信号给应用程序

- 9信号不可阻塞

  ```bash
  trap "echo sig 15" 15
  trap "echo sig 2" 2
  
  echo $$
  
  while :
  do
  	:
  done
  ```

### 文本操作

#### 正则元字符(. * [] ^ & \\ +  ？｜)

```bash
# 查找. 
grep "\." xxxxxxx
```

#### find

- find 路径 查找条件 [补充条件]

  ```bash
  ls passwd*
  find passwd
  find /etc/ -name pass*
  find /etc/ -regex .*wd$
  find /etc/ --type f -regex .*wd$
  find /etc/ --atime 8
  LANG=C stat filename
  
  touch /tmp/{1..9}.txt
  find /tmp/*.txt -exec rm -v {} \
  
  grep pass /root/xxx.cfg | cut -d " " -f 1
  ```

#### cut
cut的工作就是“剪”,具体的说就是在文件中负责剪切数据用的。cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段输出
- cut [选项参数] filename(-f 列号 -d 分隔符 -b字节分割)
- 说明：默认分隔符是制表符
```bash
# 统计相同shell类型个数
cut -d ":" -f7 /etc/passwd | sort | uniq -c | sort -r

#数据准备
touch cut.txt
vim cut.txt
dong shen
guan zhen
wo  wo
lai  lai
le  le

cut -b 1-4 cut.txt #切割每一行第 1-4 个字节
cut -d " " -f 1 cut.txt #切割cut.txt第一列
cut -d " " -f 2,3 cut.txt #切割cut.txt第2,3列
cat cut.txt | grep "guan" | cut -d " " -f 1 #在cut.txt文件中切割出guan
echo $PATH | cut -d: -f 2- # 选取系统PATH变量值,第2个“：”开始后的所有路径
ifconfig eth0 | grep "inet addr" | cut -d: -f 2 | cut -d" " -f1 #切割IP地址
```

#### sed
sed是一种流编辑器,它一次处理一行内容。处理时,把当前处理的行存储在临时缓冲区中,称为“模式空间”,接着用sed命令处理缓冲区中的内容,处理完成后,把缓冲区的内容送往屏幕。接着处理下一行,这样不断重复,直到文件末尾
- 替换命令s
  - sed 's/old/new' filename...
  - sed -e 's/old/new' 's/old/new' filename...
  - sed -i 's/old/new' 's/old/new' filename...
  - sed 's/正则/new' filename...
  - sed -r 's/扩展正则/new' filename... (+ ? |)

``` bash
sed 's/a/aa/' afile

#	替换/，使用别的分隔符
sed 's!/!aa!' afile

# 多命令
sed -e 's/a/aa' -e 's/a/aa' afile
# 简写
sed 's/a/aa;s/a/aa' afile

# 直接修改源文本
sed -i 's/a/aa' afile
# 重定向
sed 's/a/aa' afile > bfile

# 正则
head -5 /etc/passwd | sed 's/...//'
head -5 /etc/passwd | sed 's/s*bin//'
head -5 /etc/passwd | sed 's/s^root//'
# 全局
head -5 /etc/passwd | sed 's/s^root//g'
# 替换第二个
head -5 /etc/passwd | sed 's/s^root//2'
# 扩展正则
sed -r 's/ab+/!/' bfile
sed -r 's/a|b/!/' bfile
sed -r 's/(aa)|(bb)/!/' bfile

# 反向饮用
sed -r 's/(a.*b)/\1:\1/' cfile

# 打印模式空间
head -5 /etc/passwd | sed 's/s^root//p'
# 只输出替换成功行
head -5 /etc/passwd | sed -n 's/s^root//p'

# 输出到文件
head -5 /etc/passwd | sed 's/s^root//w' /tmp/a.txt

# 寻址
head -6 /etc/passwd | sed '1s/s^root/!/'
head -6 /etc/passwd | sed '1,3s/s^root/!/'
head -6 /etc/passwd | sed '1,$s/s^root/!/'
head -6 /etc/passwd | sed '/root/s/bash/!/'
head -6 /etc/passwd | sed '/^bin/s/bash/!/'
head -6 /etc/passwd | sed '/^bin/,$s/bash/!/'
head -6 /etc/passwd | sed '/^bin/,$s/bash/!/g'

# 分组

# 删除d
sed '/ab/d' bfile
# 注意d改变控制流,比如先替换再删除
sed '/ab/d;s/a/!/' bfile

# 追加a，上一行加
sed '/ab/a hello' bfile
# 插入i，下一行加
sed '/ab/i hello' bfile
# 更改c
sed '/ab/c hello' bfile

# 读文件和写文件
sed '/ab/r afile' bfile > cfile

# n下一行
# =打印行号
# q退出
sed 10q afile
sed -n 1,10p afile
```

- 多行模式N、D、P

```bash
sed 'N;s/hel.lo/!/' afile
```

- 保持空间
  - h和H将模式空间内容存放到保持空间
  - g和G将保持空间内容取出到模式空间
  - x交换模式空间和保持空间内容

```bash
# practise
# 数据准备
touch sed.txt
vim sed.txt
dong shen
guan zhen d
wo  wo
lai  lai

le  le

# 将“mei nv”这个单词插入到sed.txt第二行后
sed '2a mei nv' sed.txt
# 删除sed.txt文件所有包含wo的行
sed '/wo/d' sed.txt 
# 将sed.txt文件中wo替换为ni
sed 's/wo/ni/g' sed.txt
# 将sed.txt文件中的第二行删除并将wo替换为ni
sed -e '2d' -e 's/wo/ni/g' sed.txt
```
#### awk
一个强大的文本分析工具,把文件逐行的读入,以空格为默认分隔符将每行切片,切开的部分再进行分析处理
- awk [选项参数]‘pattern1{action1}pattern2{action2}...’filename(pattern：表示AWK在数据中查找的内容,就是匹配模式 action：在找到匹配内容时所执行的一系列命令)
- 选项参数说明(-F 指定输入文件折分隔符 -v 赋值一个用户定义变量)
```bash
# 输出menu开始的行
awk '/^menu/{ print $0 }' /boot/grub2/grub.cfg
# F指定分隔符
awk -F "'" '/^menu/{ print $2 }' /boot/grub2/grub.cfg
#打印行号
awk -F "'" '/^menu/{ print x++,$2 }' /boot/grub2/grub.cfg
```

- 表达式
  - 复制操作符
  - 算数操作符
  - 系统变量FS、NFS、RS、NR、NFR、NF
  - 关系操作符
  - 布尔操作符
- 条件语句
- 循环语句
- 数组
- 函数

```bash
# practise
# 数据准备
cp /etc/passwd ./

# 搜索passwd文件以root关键字开头的所有行,并输出该行的第7列
awk -F: '/^root/{print $7}' passwd
# 搜索passwd文件以root关键字开头的所有行,并输出该行的第1列和第7列,中间以“,”号分割。注意：只有匹配了patter的行才会执行action
awk -F: '/^root/{print $1","$7}' passwd
# 显示/etc/passwd的第一列和第七列,以逗号分割,且在所有行前面添加列名user,shell在最后一行添加"dahaige,/bin/zuishuai",注意：BEGIN 在所有数据读取行之前执行；END 在所有数据执行之后执行
awk -F : 'BEGIN{print "user, shell"} {print $1","$7} END{print "dahaige,/bin/zuishuai"}' passwd
# 将passwd文件中的用户id增加数值1并输出
awk -F: -v i=1 '{print $3+i}' passwd
```

- awk的内置变量(FILENAME 文件名 NR 已读的记录数 NF 浏览记录的域的个数)
```bash
# 统计passwd文件名,每行的行号,每行的列数
awk -F: '{print "filename:"  FILENAME ", linenumber:" NR  ",columns:" NF}' passwd

# 切割IP
ifconfig eth0 | grep "inet addr" | awk -F: '{print $2}' | awk -F " " '{print $1}'

# 查询sed.txt中空行所在的行号
awk '/^$/{print NR}' sed.txt
```
#### sed vs awk

- awk更像脚本语言
- awk用于“比较规范”的文本处理，用于统计数量并输出制定字段
- sed将不规范的文本处理成“比较规范”的文本

#### sort

sort命令是在Linux里非常有用,它将文件进行排序,并将排序结果标准输出
- sort(选项)(参数)(-n 依照数值的大小排序 -r	以相反的顺序来排序 -t 定排序时所用的栏位分隔字符 -k 指定需要排序的栏位 参数：指定待排序的文件列表)
```bash
#数据准备
ouch sort.sh
vim sort.sh
bb:40:5.4
bd:20:4.2
xz:50:2.3
cls:10:3.5
ss:30:1.6

#按照“：”分割后的第三列倒序排序
sort -t : -nrk 3  sort.sh
```

#### 企业真题
- 使用Linux命令查询file1中空行所在的行号`awk '/^$/{print NR}' sed.txt`
- 有文件内容如下 张三 40 李四 50 王五 60(三行),使用Linux命令计算第二列的和并输出`cat chengji.txt | awk -F " " '{sum+=$2} END{print sum}'`
- 请用shell脚本写出查找当前文件夹（/home）下所有的文本文件内容中包含有字符”shen”的文件名称`grep -r "shen" /home | cut -d ":" -f 1`
- Shell脚本里如何检查一个文件是否存在？如果不存在该如何处理？
```bash
#!/bin/bash
if [ -f file.txt ]; then
   echo "文件存在!"
else
   echo "文件不存在!"
fi
```
- 用shell写一个脚本，对文本中无序的一列数字排序
```bash
cat test.txt
9
8
7
6
5
4
3
2
10
1

sort -n test.txt|awk '{a+=$0;print $0}END{print "SUM="a}'
```

#### example
```bash
//查询所有用户
for user in `cat /etc/passwd | cut -d ":" -f 1`
do
    echo "$user"
done
```

```bash
//删除配置文件中所有的注释行和空行
sed -i '/[:blank:]*#/^$/d' config.cnf
```

```bash
//在非#注释行前加*
sed -i 's/^[^#]/\*&/g' config.cnf
```

```shell
//用户输入num,求1-num之和
while true
do
    read -p "pls input a positive number: " num
    expr $num + 1 &> /dev/null
    if [ $? -eq 0 ];then
        if [ `expr $num \> 0` -eq 1 ];then
            for((i=1;i<=$num;i++))
            do
                sum=`expr $sum + $i`
            done    
            echo "1+2+3+....+$num = $sum"
            exit
        fi
    fi
    echo "error,input enlegal"
    continue
done
```

```shell
//启动nginx
nginx_num_process=$(ps -ef | grep nginx | grep -v grep | wc -l)
if [ nginx_num_process -eq 0 ];then
    systemctl start nginx
fi
```

```shell
//检查Nginx是否正常运行，宕机则启动它
this_pid=$$

while true
do
ps -ef | grep nginx | grep -v grep | grep -v $this_pid &> /dev/null

if [ $? -eq 0 ];then
    echo "Nginx is running well"
    sleep 3
else
    systemctl start nginx
    echo "Nginx is down,Start it...."
fi
done
```

```shell
//查找mysql配置文件中有几段
FILE_NAME=/root/lesson/5.6/my.cnf
function get_all_segments
{
    echo "`sed -n '/\[.*\]/p' $FILE_NAME  | sed -e 's/\[//g' -e 's/\]//g'`"
}
function count_items_in_segment
{
    items=`sed -n '/\['$1'\]/,/\[.*\]/p' $FILE_NAME | grep -v "^#" | grep -v "^$" | grep -v "\[.*\]"`
    index=0
    for item in $items
    do
        index=`expr $index + 1`
    done
    echo $index
}
number=0
for segment in `get_all_segments`
do
    number=`expr $number + 1`
    items_count=`count_items_in_segment $segment`
    echo "$number: $segment  $items_count"
done
```

```bash
//文本格式化数据插入mysql
sed -i 's/^[^#]/\*&/g' config.cnf
```

```shell
//脚本使用ftp
ftp -inv << EOF
open ftp_ip_addr
user user_name password

put file_name
bye
EOF #必须顶格写
```
