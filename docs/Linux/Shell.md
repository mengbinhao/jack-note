### Shell
![](./images/learn-20.png)
Shell 是一个命令行解释器,它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序,用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序
- cat /etc/shells
- bin目录下 ll | grep bash
- echo $SHELL

### 执行方式
1. #!/bin/bash开头
2. ./xxx.sh(x权限) 或 sh ./myShell.sh(不推荐)

### shell通配符
- *代表多个字母或数字
- ?代表一个字母或数字
`ls a* ls a? ls f080[1-6].tif`

### 转义字符\
`ls /mnt/win1/My\Documents`

### 单引号：不处理任何变量和命令
`echo 'Welcome $NAME, the date is date'`

### 双引号：处理变量但不处理命令
`echo "Welcome $NAME, the date is date"`

### 反引号：把引号中的每个单词作为一个命令,如果是变量则先求值然后作为一个命令处理
echo "Welcome $NAME, the date is `date`"

### 注释
```bash
# comments
# 多行注释
:<<!
e21e1e1
13213131
!
```
### 变量(系统变量、用户变量)
- \$HOME、\$PATH、\$PWD、\$USER、\$SHELL等 `export可以临时加入一个系统路径,如export PATH=$PATH:$HOME/bin:/root/test/t1`
- set //显示所有变量
- 变量=值

#### 变量命名规则
1. 变量名称可以由字母、数字和下划线组成,但是不能以数字开头。
2. 等号两侧不能有空格
3. 变量名称一般习惯为大写
4. 在bash中,变量默认类型都是字符串类型,无法直接进行数值运算
5. 变量的值如果有空格,需要使用双引号或单引号括起来


```bash
echo "PATH=$PATH"
A=100
echo "A=$A"
unset A
echo "A=$A"
readonly B=99 #静态变量不能unset

C = `ls -al`  #命令结果赋值
D = $(ls -al)
```

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
```

#### 预定义变量
- \$$  进程ID
- \$!  后台运行的最后进程号
- \$?  最后一次执行命令的返回状态,0正确执行,非0执行不正确

### 运算符
- \$((运算式)) or $[运算式]
- expr m + n (- \\* / %)   //expr运算符间要有空格
```bash
RESULT1=$(((2+3)×4))
RESULT2=$[(2+3)×4]  #####推荐

TEMP=`expr 2 + 3`
RESULT3=`expr $TEMP \* 4`

SUM=$[$1+$2]
```

### 条件判断
1. 两个整数比较(= -lt -le -eq -gt -ge -ne)
2. 按照文件权限(-r可读权限 -w可写权限 -x执行权限)
3. 按照文件类型(-f存在并是常规文件 -e文件存在 -d存在并是目录)
4. 多条件判断(&& 表示前一条命令执行成功时,才执行后一条命令,|| 表示上一条命令执行失败后,才执行下一条命令)

```bash
if [ "ok" = "ok" ]  ### condition前后要有空格
#### 注意：条件非空即为true,[ atguigu ]返回true,[] 返回false

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
```

### 流程控制
#### if
```bash
## if后要有空格
### [ 条件判断式 ],中括号和条件判断式之间必须有空格
if [ $1 -ge 60 ];then
  程序
fi


if [ $1 -ge 60 ]
then
    echo "xxx"
elif [ $1 -lt 60 ]
then
    echo "yyy"
fi
```
#### case
```bash
case $1 in
"1")
    echo "1"
;;
"2")
    echo "2"
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
```
- \$*和\$@都表示传递给函数或脚本的所有参数,不被双引号包含时,都以\$1 \$2 …\$n的形式输出所有参数,当它们被双引号包含时,\$*会将所有的参数作为一个整体,以“\$1 \$2 …\$n”的形式输出所有参数；“$@”会将各个参数分开,以“\$1” “\$2”…”\$n”的形式输出所有参数

```bash
SUM=0
for((i=1;i<=100;i++))
do
    SUM=$[$SUM+$i]
done
echo "sum=$SUM"
```
#### while
```bash
SUM=0
i=0
while [ $i -le $1 ]
do
    SUM=$[$SUM+$i]
    i=$[$1+1]
done
echo "sum=$SUM"

```

#### 控制台输入
```bash
read -p "请输入n=" NUM1

read -t 10 -p "请输入n=" NUM1
```

### function
#### 系统函数
`basename /home/aaa/test.txt`

`basename /home/aaa/test.txt .txt`

`dirname /home/aaa/test.txt`

#### 自定义
```bash
[ function ] funname[()]
{
	Action;
	[return int;]
}
funname


function getSum(){
    SUM=$[$n1+$n2]
    echo "$SUM"
}
getSum


function sum()
{
    s=0
    s=$[ $1 + $2 ]
    echo "$s"
}

read -p "Please input the number1: " n1
read -p "Please input the number2: " n2
sum $n1 $n2
```
1. 必须在调用函数地方之前,先声明函数,shell脚本是逐行运行。不会像其它语言一样先编译。
2. 函数返回值,只能通过\$?系统变量获得,可以显示加：return返回,如果不加,将以最后一条命令运行结果,作为返回值。return后跟数值n(0-255)

#### 实例
![](./images/learn-21.png)
![](./images/learn-22.png)

### **Shell工具**
#### cut
cut的工作就是“剪”,具体的说就是在文件中负责剪切数据用的。cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段输出
- cut [选项参数] filename(-f 列号 -d 分隔符 -b字节分割)
- 说明：默认分隔符是制表符
```bash
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
sed是一种流编辑器,它一次处理一行内容。处理时,把当前处理的行存储在临时缓冲区中,称为“模式空间”,接着用sed命令处理缓冲区中的内容,处理完成后,把缓冲区的内容送往屏幕。接着处理下一行,这样不断重复,直到文件末尾。文件内容并没有改变,除非你使用重定向存储输出
- sed [选项参数]  ‘command’  filename(-e 直接在指令列模式上进行sed的动作编辑 -i	直接修改读取的文档内容,而不是由屏幕输出)
- command功能描述(a 新增,a的后面可以接字串,在下一行出现 d 删除 i 插入,i的后面可以接字串 s 查找并替换)
```bash
#数据准备
touch sed.txt
vim sed.txt
dong shen
guan zhen
wo  wo
lai  lai

le  le

sed '2a mei nv' sed.txt #将“mei nv”这个单词插入到sed.txt第二行后 注意：文件并没有改变
sed '/wo/d' sed.txt #删除sed.txt文件所有包含wo的行
sed 's/wo/ni/g' sed.txt #将sed.txt文件中wo替换为ni 注意：‘g’表示global,行内全部替换
sed -e '2d' -e 's/wo/ni/g' sed.txt #将sed.txt文件中的第二行删除并将wo替换为ni
```
#### awk
一个强大的文本分析工具,把文件逐行的读入,以空格为默认分隔符将每行切片,切开的部分再进行分析处理
- awk [选项参数]‘pattern1{action1}pattern2{action2}...’filename(pattern：表示AWK在数据中查找的内容,就是匹配模式 action：在找到匹配内容时所执行的一系列命令)
- 选项参数说明(-F 指定输入文件折分隔符 -v 赋值一个用户定义变量)
```bash
#数据准备
cp /etc/passwd ./

awk -F: '/^root/{print $7}' passwd  #搜索passwd文件以root关键字开头的所有行,并输出该行的第7列
awk -F: '/^root/{print $1","$7}' passwd  #搜索passwd文件以root关键字开头的所有行,并输出该行的第1列和第7列,中间以“,”号分割。注意：只有匹配了patter的行才会执行action
awk -F : 'BEGIN{print "user, shell"} {print $1","$7} END{print "dahaige,/bin/zuishuai"}' passwd #只显示/etc/passwd的第一列和第七列,以逗号分割,且在所有行前面添加列名user,shell在最后一行添加"dahaige,/bin/zuishuai",注意：BEGIN 在所有数据读取行之前执行；END 在所有数据执行之后执行。
awk -F: -v i=1 '{print $3+i}' passwd #将passwd文件中的用户id增加数值1并输出
```

- awk的内置变量(FILENAME 文件名 NR 已读的记录数 NF 浏览记录的域的个数)
```bash
#统计passwd文件名,每行的行号,每行的列数
awk -F: '{print "filename:"  FILENAME ", linenumber:" NR  ",columns:" NF}' passwd

#切割IP
ifconfig eth0 | grep "inet addr" | awk -F: '{print $2}' | awk -F " " '{print $1}'

#查询sed.txt中空行所在的行号
awk '/^$/{print NR}' sed.txt
```
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

