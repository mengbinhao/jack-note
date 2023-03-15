### 1 概论
![](./images/learn-20.png)
shell是我们通过命令行与操作系统沟通的语言

shell脚本可以直接在命令行中执行，也可以将一套逻辑组织成一个文件，方便复用

Linux中常见的shell脚本有很多种，常见的有：

- Bourne Shell（/usr/bin/sh or /bin/sh）

- Bourne Again Shell（/bin/bash）

- C Shell（/usr/bin/csh）

- K Shell（/usr/bin/ksh）

- zsh

- ...

  > 在一般情况下，并不区分Bourne Shell和Bourne Again Shell，所以像#!/bin/sh，可以改为#!/bin/bash

### 2 运行方式

- 作为可执行文件

  ```bash
  acs@9e0ebfcd82d7:~$ chmod +x test.sh  # 使脚本具有可执行权限
  acs@9e0ebfcd82d7:~$ ./test.sh  # 当前路径下执行
  acs@9e0ebfcd82d7:~$ /home/acs/test.sh  # 绝对路径下执行
  acs@9e0ebfcd82d7:~$ ~/test.sh  # 家目录路径下执行
  ```

  > 运行时一定要写成./test.sh，因为直接写test.sh，Linux会去PATH里寻找，而一般只有/bin,/sbin,/usr/bin,/usr/sbin等在PATH中，所以使用./test.sh告诉系统，就在本目录下找

- 解释器执行

  ```bash
  acs@9e0ebfcd82d7:~$ bash test.sh
  ```

### 3 注释

- 单行注释 每行中#之后的内容均是注释

- 多行注释

  ```bash
  # 其中EOF可以换成其它任意字符串
  :<<EOF
  第一行注释
  第二行注释
  第三行注释
  EOF
  ```

### 4 内建命令和外部命令

- 内建命令不需要创建子进程
- 内建命令对当前Shell生效

### 5 变量

#### 变量命名规则

1. 变量名称可以由字母、数字和下划线组成,但是不能以数字开头
2. 等号两侧不能有空格
3. 变量名称一般习惯为大写
4. 在bash中,变量默认类型都是字符串类型,无法直接进行数值运算
5. 变量的值如果有空格,需要使用双引号或单引号括起来


```bash
# 定义变量
name1='yxc'  # 单引号定义字符串
name2="yxc"  # 双引号定义字符串
name3=yxc    # 也可以不加引号，同样表示字符串

# 使用变量
name=yxc
echo $name  # 输出yxc
echo ${name}  # 输出yxc
echo ${name}acwing  # 输出yxcacwing

# 只读变量
name=yxc
readonly name
declare -r name  # 两种写法均可
name=abc  # 会报错，因为此时name只读

# 删除变量
name=yxc
unset name
echo $name  # 输出空行

# 静态变量不能unset
readonly B=99
# 命令结果赋值
C = `ls -al`  
D = $(ls -al)
```

#### 变量类型

 - 自定义变量（局部变量，子进程不能访问的变量 ）

 - 环境变量（全局变量，子进程可以访问的变量）

    - `$HOME、$PATH、$PWD、$USER、$SHELL、\$PS1`

 - 自定义变量改成环境变量

   ```bash
   acs@9e0ebfcd82d7:~$ name=yxc  # 定义变量
   acs@9e0ebfcd82d7:~$ export name  # 第一种方法
   acs@9e0ebfcd82d7:~$ declare -x name  # 第二种方法
   ```

- 环境变量改为自定义变量

  ```bash
  acs@9e0ebfcd82d7:~$ export name=yxc  # 定义环境变量
  acs@9e0ebfcd82d7:~$ declare +x name  # 改为自定义变量
  ```

#### 字符串

字符串可以用单引号，也可以用双引号，也可以不用引号

- 单引号与双引号的区别
   - 单引号中的内容会原样输出，不会执行、不会取变量

   - 双引号中的内容可以执行、可以取变量

     ```bash
     name=yxc  # 不用引号
     echo 'hello, $name \"hh\"'  # 单引号字符串，输出 hello, $name \"hh\"
     echo "hello, $name \"hh\""  # 双引号字符串，输出 hello, yxc "hh"
     ```

- 获取字符串长度

  ```bash
  name="yxc"
  echo ${#name}  # 输出3
  ```

- 提取子串

  ```bash
  name="hello, yxc"
  echo ${name:0:5}  # 提取从0开始的5个字符
  ```

#### 预定义变量

 - 文件参数变量（在执行shell脚本时，可以向脚本传递参数。$1是第一个参数，$2是第二个参数，10以上大括号包含\${10}，以此类推。特殊的，$0是文件名包含路径

   创建文件test.sh：

   ```bash
   #! /bin/bash
   
   echo "文件名："$0
   echo "第一个参数："$1
   echo "第二个参数："$2
   echo "第三个参数："$3
   echo "第四个参数："$4
   ```

   然后执行该脚本：

   ```bash
   acs@9e0ebfcd82d7:~$ chmod +x test.sh 
   acs@9e0ebfcd82d7:~$ ./test.sh 1 2 3 4
   文件名：./test.sh
   第一个参数：1
   第二个参数：2
   第三个参数：3
   第四个参数：4
   ```

 - 其它参数相关变量

   | 参数              | 说明                                                         |
   | ----------------- | ------------------------------------------------------------ |
   | `$#`              | 代表文件传入的参数个数，如上例中值为4                        |
   | `$*`              | 由所有参数构成的用空格隔开的字符串，如上例中值为"$1 $2 $3 $4" |
   | `$@`              | 每个参数分别用双引号括起来的字符串，如上例中值为"$1" "$2" "$3" "$4" |
   | `$$`              | 当前进程PID                                                  |
   | `$?`              | 上一条命令的退出状态（注意不是stdout，而是exit code）。0表示正常退出，其他值表示错误 |
   | `$(command) 	` | 返回command这条命令的stdout（可嵌套）                        |
   | \`command\`       | 返回command这条命令的stdout（不可嵌套）                      |

- 环境变量配置文件(数字代表加载顺序，第二列数字是nologin加载顺序)
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

### 6 shell特殊字符

- `{}`

```bash
mkdir {0..9}
echo {0..9}
```

- 通配符

  - `*`代表多个字母或数字
  - `?`代表一个字母或数字 `ls a* ls a? ls f080[1-6].tif`

- 转义字符`\`   `ls /mnt/win1/My\Documents`

- 单引号：不处理任何变量和命令 `echo 'Welcome $NAME, the date is date'`

- 双引号：处理变量但不处理命令 `echo "Welcome $NAME, the date is date"`

- 反引号：把引号中的每个单词作为一个命令,如果是变量则先求值然后作为一个命令处理

  ```bash
  NAME=pwd
  echo "Welcome `$NAME`, the date is `date`"
  ```

### 7 运算符

- \$((运算式)) or $[运算式]
- expr m + n (+、-、*、/、**、%)   # expr运算符间要有空格

```bash
# 双圆括号是let命令简化
RESULT1=$(((2+3)×4))
# 推荐
RESULT2=$[(2+3)×4]

TEMP=`expr 2 + 3`
RESULT3=`expr $TEMP \* 4`

SUM=$[$1+$2]
```

### 8 数组

数组中可以存放多个不同类型的值，只支持一维数组，初始化时不需要指明数组大小。
数组下标从0开始

```bash
# 数组用小括号表示，元素之间用空格隔开
array=(1 abc "def" yxc)

# 也可以直接定义数组中某个元素的值
array[0]=1
array[1]=abc
array[2]="def"
array[100]=yxc

# 读取数组中某个元素的值
echo ${array[index]}

# 读取整个数组
echo ${array[@]}  # 第一种写法
echo ${array[*]}  # 第二种写法

# 数组长度
${#array[@]}  # 第一种写法
${#array[*]}  # 第二种写法
```

### 9 expr命令

- expr 表达式
  - 用空格隔开每一项
  - 用反斜杠放在shell特定的字符前面（发现表达式运行错误时，可以试试转义）
  - 对包含空格和其他特殊字符的字符串要用引号括起来
  - expr会在stdout中输出结果。如果为逻辑关系表达式，则结果为真，stdout为1，否则为0
  - expr的exit code：如果为逻辑关系表达式，则结果为真，exit code为0，否则为1

- 字符串表达式

  - `length STRING`

  - `index STRING CHARSET` CHARSET中任意单个字符在STRING中最前面的字符位置，下标从1开始。如果在STRING中完全不存在CHARSET中的字符，则返回0

  - `substr STRING POSITION LENGTH` 返回STRING字符串中从POSITION开始，长度最大为LENGTH的子串。如果POSITION或LENGTH为负数，0或非数值，则返回空字符串

    ```bash
    str="Hello World!"
    
    echo `expr length "$str"`  # ``不是单引号，表示执行该命令，输出12
    echo `expr index "$str" aWd`  # 输出7，下标从1开始
    echo `expr substr "$str" 2 3`  # 输出 ell
    ```

- 整数表达式

  - expr支持普通的算术操作，算术表达式优先级低于字符串表达式，高于逻辑关系表达式

  - `+ -` 加减运算。两端参数会转换为整数，如果转换失败则报错

  - `* / %` 乘，除，取模运算。两端参数会转换为整数，如果转换失败则报错

  - `()` 表示优先级，但需要用反斜杠转义

    ```bash
    a=3
    b=4
    
    echo `expr $a + $b`  # 输出7
    echo `expr $a - $b`  # 输出-1
    echo `expr $a \* $b`  # 输出12，*需要转义
    echo `expr $a / $b`  # 输出0，整除
    echo `expr $a % $b` # 输出3
    echo `expr \( $a + 1 \) \* \( $b + 1 \)`  # 输出20，值为(a + 1) * (b + 1)
    ```

- 逻辑关系表达式

  - `|` 如果第一个参数非空且非0，则返回第一个参数的值，否则返回第二个参数的值，但要求第二个参数的值也是非空或非0，否则返回0。如果第一个参数是非空或非0时，不会计算第二个参数

  - `&` 如果两个参数都非空且非0，则返回第一个参数，否则返回0。如果第一个参为0或为空，则不会计算第二个参数

  - `< <= = == != >= >` 比较两端的参数，如果为true，则返回1，否则返回0。”==”是”=”的同义词。”expr”首先尝试将两端参数转换为整数，并做算术比较，如果转换失败，则按字符集排序规则做字符比较

  - `()` 表示优先级，但需要用反斜杠转义

    ```bash
    a=3
    b=4
    
    echo `expr $a \> $b`  # 输出0，>需要转义
    echo `expr $a '<' $b`  # 输出1，也可以将特殊字符用引号引起来
    echo `expr $a '>=' $b`  # 输出0
    echo `expr $a \<\= $b`  # 输出1
    
    c=0
    d=5
    
    echo `expr $c \& $d`  # 输出0
    echo `expr $a \& $b`  # 输出3
    echo `expr $c \| $d`  # 输出5
    echo `expr $a \| $b`  # 输出3
    ```

### 10 read命令

read命令用于从标准输入中读取单行数据。当读到文件结束符时，exit code为1，否则为0

参数说明

	- `-p`: 后面可以接提示信息
	- `-t`：后面跟秒数，定义输入字符的等待时间，超过等待时间后会自动忽略此命令

```bash
acs@9e0ebfcd82d7:~$ read name  # 读入name的值
acwing yxc  # 标准输入
acs@9e0ebfcd82d7:~$ echo $name  # 输出name的值
acwing yxc  #标准输出
acs@9e0ebfcd82d7:~$ read -p "Please input your name: " -t 30 name  # 读入name的值，等待时间30秒
Please input your name: acwing yxc  # 标准输入
acs@9e0ebfcd82d7:~$ echo $name  # 输出name的值
acwing yxc  # 标准输出
```

### 11 echo命令

- 显示普通字符串

  ```bash
  echo "Hello AC Terminal"
  echo Hello AC Terminal  # 引号可以省略
  ```

- 显示转义字符

  ```bash
  echo "\"Hello AC Terminal\""  # 注意只能使用双引号，如果使用单引号，则不转义
  echo \"Hello AC Terminal\"  # 也可以省略双引号
  ```

- 显示变量

  ```bash
  name=yxc
  echo "My name is $name"  # 输出 My name is yxc
  ```

- 显示换行

  ```bash
  echo -e "Hi\n"  # -e 开启转义
  echo "acwing"
  ```

- 显示不换行

  ```bash
  echo -e "Hi \c" # -e 开启转义 \c 不换行
  echo "acwing"
  ```

- 显示结果定向至文件

  ```bash
  echo "Hello World" > output.txt
  ```

- 原样输出字符串，不进行转义或取变量(用单引号)

  ```bash
  name=acwing
  echo '$name\"'
  ```

- 显示命令的执行结果

  ```bash
  echo `date`
  ```

### 12 printf命令

`printf format-string [arguments...]`     默认不会在字符串末尾添加换行符

```bash
printf "%10d.\n" 123  # 占10位，右对齐
printf "%-10.2f.\n" 123.123321  # 占10位，保留2位小数，左对齐
printf "My name is %s\n" "yxc"  # 格式化输出字符串
printf "%d * %d = %d\n"  2 3 `expr 2 \* 3` # 表达式的值作为参数
```

### 13 test命令与判断符号[]

- 逻辑运算符&&和||

  - && 表示与，|| 表示或

  - 二者具有短路原则

    > expr1 && expr2：当expr1为假时，直接忽略expr2
    > expr1 || expr2：当expr1为真时，直接忽略expr2

  - 表达式的exit code为0，表示真；为非零，表示假

- test命令

  - 在命令行中输入man test，可以查看test命令的用法

  - test命令用于判断文件类型，以及对变量做比较

  - test命令用exit code返回结果，而不是使用stdout。0表示真，非0表示假

    ```bash
    test 2 -lt 3  # 为真，返回值为0
    echo $?  # 输出上个命令的返回值，输出0
    
    acs@9e0ebfcd82d7:~$ ls  # 列出当前目录下的所有文件
    homework  output.txt  test.sh  tmp
    acs@9e0ebfcd82d7:~$ test -e test.sh && echo "exist" || echo "Not exist"
    exist  # test.sh 文件存在
    acs@9e0ebfcd82d7:~$ test -e test2.sh && echo "exist" || echo "Not exist"
    Not exist  # testh2.sh 文件不存在
    ```

  - 文件类型判断 `test -e filename  # 判断文件是否存在`

    | 参数 | 代表意义     |
    | ---- | ------------ |
    | -e   | 文件是否存在 |
    | -f   | 是否为文件   |
    | -d   | 是否为目录   |

  - 文件权限判断 `test -r filename  # 判断文件是否可读`

    | 参数 | 代表意义       |
    | ---- | -------------- |
    | -r   | 文件是否可读   |
    | -w   | 文件是否可写   |
    | -x   | 文件是否可执行 |
    | -s   | 是否为非空文件 |

  - 整数间的比较 `test $a -eq $b  # a是否等于b`

    | 参数 | 代表意义       |
    | ---- | -------------- |
    | -eq  | a是否等于b     |
    | -ne  | a是否不等于b   |
    | -gt  | a是否大于b     |
    | -lt  | a是否小于b     |
    | -ge  | a是否大于等于b |
    | -le  | a是否小于等于b |

  - 字符串比较
  
    | 参数              | 代表意义                                               |
    | ----------------- | ------------------------------------------------------ |
    | test -z STRING    | 判断STRING是否为空，如果为空，则返回true               |
    | test -n STRING    | 判断STRING是否非空，如果非空，则返回true（-n可以省略） |
    | test str1 == str2 | 判断str1是否等于str2                                   |
    | test str1 != str2 | 判断str1是否不等于str2                                 |
  
  - 多重条件判定 `test -r filename -a -x filename`
  
    | 参数 | 代表意义                                            |
    | ---- | --------------------------------------------------- |
    | -a   | 两条件是否同时成立                                  |
    | -o   | 两条件是否至少一个成立                              |
    | !    | 取反。如 test ! -x file，当file不可执行时，返回true |

- 判断符号[]

  []与test用法几乎一模一样，更常用于if语句中。另外[[]]是[]的加强版，支持的特性更多

  ```bash
  [ 2 -lt 3 ]  # 为真，返回值为0
  echo $?  # 输出上个命令的返回值，输出0
  
  acs@9e0ebfcd82d7:~$ ls  # 列出当前目录下的所有文件
  homework  output.txt  test.sh  tmp
  acs@9e0ebfcd82d7:~$ [ -e test.sh ] && echo "exist" || echo "Not exist"
  exist  # test.sh 文件存在
  acs@9e0ebfcd82d7:~$ [ -e test2.sh ] && echo "exist" || echo "Not exist"
  Not exist  # testh2.sh 文件不存在
  
  # example
  [ $var -eq 0 ]
  # 文件是否存在
  [ -e $var ]
  # 是否是目录
  [ -d $var ]
  # 两个字符串是否相同
  [[ $var1 = $var2 ]]
  ```
  
  > []内的每一项都要用空格隔开
  >
  > 中括号内的变量，最好用双引号括起来
  >
  > 中括号内的常数，最好用单或双引号括起来
  
  ```bash
  name="acwing yxc"
  [ $name == "acwing yxc" ]  # 错误，等价于 [ acwing yxc == "acwing yxc" ]，参数太多
  [ "$name" == "acwing yxc" ]  # 正确
  ```

### 14 判断语句

> if后要有空格
>
> [ 条件判断式 ]中括号和条件判断式之间必须有空格
>
> 条件非空即为true,[ atguigu ]返回true,[] 返回false

- 单层if

  ```bash
  if condition
  then
      语句1
      语句2
      ...
  fi
  
  # example
  a=3
  b=4
  
  if [ "$a" -lt "$b" ] && [ "$a" -gt 2 ]
  then
      echo ${a}在范围内
  fi
  
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
  ```

- 单层if-else

  ```bash
  if condition
  then
      语句1
      语句2
      ...
  else
      语句1
      语句2
      ...
  fi
  
  # example
  a=3
  b=4
  
  if ! [ "$a" -lt "$b" ]
  then
      echo ${a}不小于${b}
  else
      echo ${a}小于${b}
  fi
  
  if [ $1 -ge 60 ]
  then
      echo "xxx"
  else [ $1 -lt 60 ]
      echo "yyy"
  fi
  ```

- 多层if-elif-elif-else

  ```bash
  if condition
  then
      语句1
      语句2
      ...
  elif condition
  then
      语句1
      语句2
      ...
  elif condition
  then
      语句1
      语句2
  else
      语句1
      语句2
      ...
  fi
  
  # example
  a=4
  
  if [ $a -eq 1 ]
  then
      echo ${a}等于1
  elif [ $a -eq 2 ]
  then
      echo ${a}等于2
  elif [ $a -eq 3 ]
  then
      echo ${a}等于3
  else
      echo 其他
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

- case…esac形式

  ```bash
  case $变量名称 in
      值1)
          语句1
          语句2
          ...
          ;;  # 类似于C/C++中的break
      值2)
          语句1
          语句2
          ...
          ;;
      *)  # 类似于C/C++中的default
          语句1
          语句2
          ...
          ;;
  esac
  
  # example
  a=4
  
  case $a in
      1)
          echo ${a}等于1
          ;;  
      2)
          echo ${a}等于2
          ;;  
      3)                                                
          echo ${a}等于3
          ;;  
      *)
          echo 其他
          ;;  
  esac
  
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

### 15 循环语句

- for…in…do…done

  ```bash
  for var in val1 val2 val3
  do
      语句1
      语句2
      ...
  done
  
  # example
  for i in a 2 cc
  do
      echo $i
  done
  
  for file in `ls`
  do
      echo $file
  done
  
  for i in $(seq 1 10)
  do
      echo $i
  done
  
  for i in {a..z}
  do
      echo $i
  done
  
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
  ```

- for ((…;…;…)) do…done

  ```bash
  for ((expression; condition; expression))
  do
      语句1
      语句2
  done
  
  # example
  for ((i=1; i<=10; i++))
  do
      echo $i
  done
  
  SUM=0
  for((i=1;i<=100;i++))
  do
      SUM=$[$SUM+$i]
  done
  echo "sum=$SUM"
  ```

- while…do…done循环

  ```bash
  while condition
  do
      语句1
      语句2
      ...
  done
  
  # example
  # 文件结束符为Ctrl+d，输入文件结束符后read指令返回false。
  while read name
  do
      echo $name
  done
  
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

- until…do…done循环(当条件为真时结束)

  ```bash
  until condition
  do
      语句1
      语句2
      ...
  done
  
  # 当用户输入yes或者YES时结束，否则一直等待读入
  until [ "${word}" == "yes" ] || [ "${word}" == "YES" ]
  do
      read -p "Please input yes/YES to stop this program: " word
  done
  ```

- break命令(跳出当前一层循环，注意与C/C++不同的是：break不能跳出case语句)

  ```bash
  # 该示例每读入非EOF的字符串，会输出一遍1-7
  # 该程序可以输入Ctrl+d文件结束符来结束，也可以直接用Ctrl+c杀掉该进程
  while read name
  do
      for ((i=1;i<=10;i++))
      do
          case $i in
              8)
                  break
                  ;;
              *)
                  echo $i
                  ;;
          esac
      done
  done
  ```

- continue命令

  ```bash
  # 该程序输出1-10中的所有奇数
  for ((i=1;i<=10;i++))
  do
      if [ `expr $i % 2` -eq 0 ]
      then
          continue
      fi
      echo $i
  done
  ```

- 死循环的处理方式

  - 使用top命令找到进程的PID，输入kill -9 PID即可关掉此进程
  - Ctrl+c

### 16 函数

- bash中的函数类似于C/C++中的函数，但return的返回值与C/C++不同，返回的是exit code，取值为0-255，0表示正常结束
- 如果想获取函数的输出结果，可以通过echo输出到stdout中，然后通过$(function_name)来获取stdout中的结果
- 必须在调用函数地方之前,先声明函数,shell脚本是逐行运行，不会像其它语言一样先编译
- 函数返回值,只能通过\$?系统变量获得,可以显示加：return返回,如果不加,将以最后一条命令运行结果,作为返回值。return后跟数值n(0-255)
- 局部变量local修饰，不进行修饰那么函数执行后，其他地方也可以使用
- 函数的参数\$1 \$2 ... \$n

```bash
# 命令格式
[function] func_name() {  # function关键字可以省略
    语句1
    语句2
    ...
    [return int;]
}

func_name
unset func_name
```

- 不获取 return值和stdout值

  ```bash
  func() {
      name=yxc
      echo "Hello $name"
  }
  
  func
  ```

- 获取 return值和stdout值

  ```bash
  func() {
      name=yxc
      echo "Hello $name"
  
      return 123
  }
  
  output=$(func)
  ret=$?
  
  echo "output = $output"
  echo "return = $ret"
  ```

- 函数的输入参数

  在函数内，$1表示第一个输入参数，$2表示第二个输入参数，依此类推。

  注意：函数内的$0仍然是文件名，而不是函数名

  ```bash
  func() {  # 递归计算 $1 + ($1 - 1) + ($1 - 2) + ... + 0
      word=""
      while [ "${word}" != 'y' ] && [ "${word}" != 'n' ]
      do
          read -p "要进入func($1)函数吗？请输入y/n：" word
      done
  
      if [ "$word" == 'n' ]
      then
          echo 0
          return 0
      fi  
  
      if [ $1 -le 0 ] 
      then
          echo 0
          return 0
      fi  
  
      sum=$(func $(expr $1 - 1))
      echo $(expr $sum + $1)
  }
  
  echo $(func 10)
  ```

- 函数内的局部变量

  可以在函数内定义局部变量，作用范围仅在当前函数内。

  可以在递归函数中定义局部变量

  ```bash
  # 命令格式
  local 变量名=变量值
  
  # example
  #! /bin/bash
  
  func() {
      local name=yxc
      echo $name
  }
  func
  
  echo $name
  
  
  checkpid() {
   	local i
   	for i in $*:
   	do
   		[ -d "/proc/$i" ] && return 0
   	done
   	return 1
  }
  ```

### 17 exit命令

exit命令用来退出当前shell进程，并返回一个退出状态；使用$?可以接收这个退出状态

exit命令可以接受一个整数值作为参数，代表退出状态。如果不指定，默认状态值是 。

exit退出状态只能是一个介于 0~255 之间的整数，其中只有 0 表示成功，其它值都表示失败

```bash
# 创建脚本test.sh
#! /bin/bash

if [ $# -ne 1 ]  # 如果传入参数个数等于1，则正常退出；否则非正常退出。
then
    echo "arguments not valid"
    exit 1
else
    echo "arguments valid"
    exit 0
fi

# 执行该脚本
acs@9e0ebfcd82d7:~$ chmod +x test.sh 
acs@9e0ebfcd82d7:~$ ./test.sh acwing
arguments valid
acs@9e0ebfcd82d7:~$ echo $?  # 传入一个参数，则正常退出，exit code为0
0
acs@9e0ebfcd82d7:~$ ./test.sh 
arguments not valid
acs@9e0ebfcd82d7:~$ echo $?  # 传入参数个数不是1，则非正常退出，exit code为1
1
```

### 18 文件重定向和管道

每个进程默认打开3个文件描述符

- stdin标准输入，从命令行读取数据，文件描述符为0

- stdout标准输出，向命令行输出数据，文件描述符为1

- stderr标准错误输出，向命令行输出数据，文件描述符为2

| 命令             | 说明                                  |
| ---------------- | ------------------------------------- |
|                  |                                       |
| command > file   | 将stdout重定向到file中                |
| command < file   | 将stdin重定向到file中                 |
| command >> file  | 将stdout以追加方式重定向到file中      |
| command n> file  | 将文件描述符n重定向到file中           |
| command n>> file | 将文件描述符n以追加方式重定向到file中 |

- 输入和输出重定向

  ```bash
  echo -e "Hello \c" > output.txt  # 将stdout重定向到output.txt中
  echo "World" >> output.txt  # 将字符串追加到output.txt中
  
  read str < output.txt  # 从output.txt中读取字符串
  
  echo $str  # 输出结果：Hello World
  ```

- 同时重定向stdin和stdout

  ```bash
  # 创建bash脚本
  #! /bin/bash
  
  read a
  read b
  
  echo $(expr "$a" + "$b")
  
  # 创建input.txt
  3
  4
  
  # 执行命令
  acs@9e0ebfcd82d7:~$ chmod +x test.sh  # 添加可执行权限
  acs@9e0ebfcd82d7:~$ ./test.sh < input.txt > output.txt  # 从input.txt中读取内容，将输出写入output.txt中
  acs@9e0ebfcd82d7:~$ cat output.txt  # 查看output.txt中的内容
  7
  ```

- 管道
  - 将前一个命令的结果传递给后面的命令
  - `car xxx | more`
  - `cat | ps -f`

### 19 引入外部文件

```bash
# 语法格式
. filename  # 注意点和文件名之间有一个空格

或

source filename

# example
# 创建test1.sh
#! /bin/bash

name=yxc  # 定义变量name

# 然后创建test2.sh
#! /bin/bash

source test1.sh # 或 . test1.sh

echo My name is: $name  # 可以使用test1.sh中的变量

# 执行命令
acs@9e0ebfcd82d7:~$ chmod +x test2.sh 
acs@9e0ebfcd82d7:~$ ./test2.sh 
My name is: yxc
```

### 20 高级文本操作

#### 正则元字符(. * [] ^ & \\ +  ？｜)

```bash
# 查找. 
grep "\." xxxxxxx
```

#### find `find 路径 查找条件 [补充条件]`

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
##### sed vs awk

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

#### practise
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
