
### 文件内容查看
- cat
```
cat [-AbEnTv] ${FILE_NAME)
cat -n /etc/issue 将该文件的内容输出到标准输出中，并显示行号
cat file1 file2 > file3  将file1 file2的内容依次添加到file3当中
```
- tac
- nl  (添加行号打印)
```
nl [-bnw] ${FILE_NAME}
nl -b a file1 即使空白行也显示行号
nl -b a -n rz file 空白行也显示行号，并且行号在字段的最右方显示，且行号不用加0对齐
```
- more/less
```
more ${FILE_NAME} 向下翻动文件
less ${FILE_NAME} 向上/下翻动文件
```

- head/tail
```
head/tail [-n number] ${FILE_NAME}
head -n 10 file 读取文件前十行的内容
tail -n 10 file 读取文件后十行的内容
head -n -10 file 不打印文件后十行内容
tail -n +100 file 只打印100行以后的内容
tail -f file 打开文件并持续更新，直到ctrl+c才退出。这个常用于查看最新的日志
```


### 命令与文件查询
- type
```
type [-tpa] name
-t: 加入-t参数时，会显示命令的类型，file表示为外部命令，alias表示为命令别名设置的名称，builtin表示为bash内置的命令功能
-p: 如果name为外部命令，会显示完整的文件名
-a: 会将所有在PATH路径下包含name的命令显示出来
```

- which
```
which [-a] command #-a会将所有由PATH目录中可以找到的命令均列出，而不只第一个被找到的指令
which ifconfig #在非root用户下会查找不到，因为ifconfig位于/sbin/ifconfig下，而非root用户的PATH中不包含该路径，所以找不到
which cd #找不到，因为cd为bash的内置命令
```

- whereis
```
whereis [-bmsu] 文件或目录名
-b 只找二进制文件
-m 只找在manual路径下的文件
-s 只找source源文件
-u 查找不在上述选项中的其他特殊文件
```

- find

```
find [PATH] [option] [action]
find / -mtime 0 #查找24小时内被修改过的文件
find /etc -mtime 3 #查找3天前的24小时内被修改的文件
find / -mtime +3 #查找3天前（不含3天本身）被更改的文件
find / -mtime -3 #查找3天内被更改的文件
find / -user name #查找用户名为name的文件
find / -group name #查找群组名为group的文件
find / -nouser #查找不属于任何用户的文件，可能出现于网络文件，或是已经被删除的用户创建的文件
find / -name filename #查找文件名为filename的文件
find / -type TYPE #查找某一类文件，f：正规文件，b：设备文件，d：目录，l：连接文件，s：socket，p：FIFO
```

- grep

```
grep [-acinv] [--color=auto] '关键词' 文件名
-a: 将binary文件以text文件的方式进行查找
-c: 打印出现的次数
-i: 忽略大小写
-n: 同时输出行号
-v: 反向选择，即选择不存在关键字的行
--color=auto： 将关键字加上颜色显示

last | grep 'root' | cut -d ' ' -f 1
```

### 压缩与打包
#### 常见压缩扩展名
```
*.Z: compress程序压缩文件
*.gz: gzip程序压缩文件
*.bz2: bzip2程序压缩的文件
*.tar: tar程序打包的文件，但没有被压缩
*.tar.gz: tar程序打包的文件，其中经过gzip的压缩
*.tar.bz2: tar程序打包的文件，其中经过bzip2压缩
```

- gzip

```
gzip [-cdtv#] 文件名
-c: 将压缩的数据输出到屏幕上，可通过数据流重定向来处理
-d: 解压缩的参数
-t: 可以用来校验一个压缩文件的一致性
-v: 显示压缩比等信息
-#: 压缩等级，-1最快，-9最慢但压缩程度最高，默认-6

gzip -d filename: 会将压缩文件解压缩，并删除压缩文件
```

- tar

```
tar [-j|-z] [cv] [-f 新建的文件名] filename #压缩
tar [-j|-z] [xv] [-f 打包文件名] [-C 目录] #解压缩
-c: 新建打包文件，可配合v查看过程中被打包的文件名
-x: 解打包或解压缩功能，可以搭配-C在特定目录中解开
-j: 通过bzip2的支持进行压缩和解压缩
-z: 通过gzip支持压缩和解压缩
-v: 将正在处理的文件名显示出来
-C: 在特定目录中解压缩
-p: 保留备份数据的原本权限和属性
-P: 保留绝对路径,一般情况下都是相对路径，防止数据覆盖
--exclude=FILE: 在压缩过程中不要讲FILE打包进去
--newer: 打包ctime和mtime在日期后面的文件
--newer-mtime：打包mtime在日期后面的文件
tar -zcv -f filename.tar.gz filename #压缩打包为filename.tar.gz
tar -zxv -f filename.tart.gz -C 欲解压缩的目录 filename
```

 - curl
> curl -v www.baidu.com