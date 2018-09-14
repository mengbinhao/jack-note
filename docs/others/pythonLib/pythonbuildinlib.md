### 1.datetime  & time & calendar

```python
time
	time.time（）
	time.sleep(secs)
	time.localtime([secs]) --> struct_time
	time.strftime(format[, t])
	time.mktime(t)
```

```python
datetime
	datetime.date
		datetime.date.today()
		datetime.date(2014, 8, 18)
		datetime.date.today().strftime('%Y-%m-%d %H:%M:%S')
		datetime.date.today().timetuple()
		time.mktime(tdate.today().timetuple())
		datetime.date.today().replace(year=2013))
    datetime.time
    	ttime = datetime.time(8, 45, 20)
	    ttime.strftime('%Y-%m-%d %H:%M:%S')
	    ttime.replace(hour=9)
	datetime.datetime
		datetime.datetime.today()
		datetime.datetime.today().timestamp()   -->datetime转换为timestamp
		datetime.datetime.fromtimestamp(timestamp)  -->timestamp转换为datetime
		datetime.datetime.utcfromtimestamp(timestamp) # UTC时间
		datetime.datetime.strptime('2015-6-1 18:19:59', '%Y-%m-%d %H:%M:%S')  -->str转datetime
		datetime.datetime.now().strftime('%a, %b %d %H:%M')  -->datetime转str
		datetime.datetime(2014, 8, 15, 8, 12, 34, 790945)
		datetime.datetime.now([tz])
		datetime.datetime.strftime('%Y-%m-%d %H:%M:%S')
		datetime.datetime.now().timetuple()
		time.mktime(datetime.datetime.now().timetuple())
		datetime.datetime.replace(year, month, day)
	datetime.timedelta
		today = datetime.datetime.today()
		yesterday = today - datetime.timedelta(days=1)
```



### 2.collections

1. namedtuple （具名tuple）

   ```python
   from collections import namedtuple
   Point = namedtuple('Point', ['x', 'y'])
   p = Point(1, 2)
   p.x
   p.y
   ```

2. deque (高效插入和删除)

   ```python
   from collections import deque
   q = deque(['a', 'b', 'c'])
   q.append('x')
   q.appendleft('y')
   q
   deque(['y', 'a', 'b', 'c', 'x'])
   ```

3. defaultdict

   ```python
   from collections import defaultdict
   dd = defaultdict(lambda: 'N/A')
   dd['key1'] = 'abc'
   dd['key1'] # key1存在'abc'
   dd['key2'] # key2不存在，返回默认值'N/A'
   ```

4. OrderedDict

   ```python
   from collections import OrderedDict
   d = dict([('a', 1), ('b', 2), ('c', 3)]) --> {'a': 1, 'c': 3, 'b': 2}
   od = OrderedDict([('a', 1), ('b', 2), ('c', 3)]) -->OrderedDict([('a', 1), ('b', 2), ('c', 3)])
   ```

5. Counter

   ```python
   from collections import Counter
   c = Counter()
   for ch in 'programming':
   	c[ch] = c[ch] + 1
   >>> c
   Counter({'g': 2, 'm': 2, 'r': 2, 'a': 1, 'i': 1, 'o': 1, 'n': 1, 'p': 1})
   ```

   

### 3.itertools

1. count() / cycle('jack') /  repeat(‘a’)

   ```python
   natuals = itertools.count(1)
   for n in natuals:
       print(n)

   #第二个参数限制了循环次数
   ns = itertools.repeat('A', 3)

   #takewhile
   natuals = itertools.count(1)
   ns = itertools.takewhile(lambda x: x <= 10, natuals)
   print(list(ns))
   ```


2. chain() / groupby() / compress() / dropwhile() / ifilter() / islice() /and so on

   ```python
   # chain() groupby()
   itertools.chain
   itertools.groupby('AaaBBbcCAAa', lambda c: c.upper())

   itertools.compress('ABCDEF', [1,0,1,0,1,1])
   list(itertools.dropwhile(lambda x: x<5, [1,4,6,4,1]))
   itertools.ifilter(lambda x: x%2, range(10))
   itertools.ifilterfalse(lambda x: x%2, range(10))

   itertools.islice('ABCDEFG', 2) --> A B
   itertools.islice('ABCDEFG', 2, 4) --> C D
   itertools.islice('ABCDEFG', 2, None) --> C D E F G
   itertools.islice('ABCDEFG', 0, None, 2) --> A C E G
   itertools.imap(pow, (2,3,10), (5,2,3)) --> 32 9 1000
   itertools.starmap(pow, [(2,5), (3,2), (10,3)]) --> 32 9 1000
   ```



### 4.contextlib

1. with

2. @contextmanager

   ```python
   @contextmanager
   def tag(name):
       print("<%s>" % name)
       yield
       print("</%s>" % name)

   with tag("h1"):
       print("hello")
       print("world")
   ```

3. @closing



### 5.sys        命令行参数

```python
sys.argv 是一个 list,包含所有的命令行参数.
sys.exit(exit_code) 退出程序 0正常退出
sys.version  #获取Python解释程序的版本信息
sys.modules 是一个dictionary，表示系统中所有可用的module
sys.platform 得到运行的操作系统环境
sys.path 是一个list,指明所有查找module，package的路径.
```


### 6.os    启动新进程；操作文件和目录   dir(os)    help(os)

```python
os.environ 一个dictionary 包含环境变量的映射关系
os.environ["HOME"] 可以得到环境变量HOME的值
os.getenv('PATH')
os.putenv('PATH','/home/sy/下载') # 将一个目录添加到环境变量中(临时增加仅对当前脚本有效)
os.system(cmdcommand) 利用系统调用，运行cmd命令
os.umask() # 设置umask


os.getcwd() # 得到当前目录
os.chdir(dir) # 改变当前目录 os.chdir('d:\\outlook')  \\转义
os.listdir()
os.mkdir()
os.makedirs()
os.rmdir('girls') # 删除空目录
os.removedirs('/home/sy/a/b/c/d') # 递归删除文件夹  必须都是空目录
os.rename('02.txt','002.txt')
os.stat('/home/sy/PycharmProject/Python3/10.27/01.py)


os.curdir
os.pardir
os.name
os.extsep
os.sep     #输出操作系统特定的路径分隔符，win下为"\\",Linux下为"/"
os.linesep  #输出当前平台使用的行终止符，win下为"\r\n",Linux下为"\n"
os.pathsep  #输出用于分割文件路径的字符串,win下为";",Linux下为":"
os.name
```


### 7.os.path

```python
#abspath()  将相对路径转化为绝对路径
path = './boys'#相对
result = os.path.abspath(path)
print(result)

#dirname()  获取完整路径当中的目录部分  &  basename()获取完整路径当中的主体部分
path = '/home/sy/boys'
result = os.path.dirname(path)
print(result)

result = os.path.basename(path)
print(result)

#split() 将一个完整的路径切割成目录部分和主体部分
path = '/home/sy/boys'
result = os.path.split(path)
print(result)

#join() 将2个路径合并成一个
var1 = '/home/sy'
var2 = '000.py'
result = os.path.join(var1,var2)
print(result)

#splitext() 将一个路径切割成文件后缀和其他两个部分,主要用于获取文件的后缀
path = '/home/sy/000.py'
result = os.path.splitext(path)
print(result)

#getsize()  获取文件的大小
#path = '/home/sy/000.py'
#result = os.path.getsize(path)
#print(result)

#isfile() 检测是否是文件
path = '/home/sy/000.py'
result = os.path.isfile(path)
print(result)

#isdir()  检测是否是文件夹
result = os.path.isdir(path)
print(result)

#islink() 检测是否是链接
path = '/initrd.img.old'
result = os.path.islink(path)
print(result)

#getctime() 获取文件的创建时间 get create time
#getmtime() 获取文件的修改时间 get modify time
#getatime() 获取文件的访问时间 get active time

import time
filepath = '/home/sy/下载/chls'

result = os.path.getctime(filepath)
print(time.ctime(result))

result = os.path.getmtime(filepath)
print(time.ctime(result))

result = os.path.getatime(filepath)
print(time.ctime(result))

#exists() 检测某个路径是否真实存在
filepath = '/home/sy/下载/chls'
result = os.path.exists(filepath)
print(result)

#isabs() 检测一个路径是否是绝对路径
path = '/boys'
result = os.path.isabs(path)
print(result)

#samefile() 检测2个路径是否是同一个文件
path1 = '/home/sy/下载/001'
path2 = '../../../下载/001'
result = os.path.samefile(path1,path2)
print(result)
```


### 8.shutil

```python
f1 = open("p_test.py",encoding="utf-8")
f2 = open("p1.py","w",encoding="utf-8")
#将文件p_test.py内容拷贝到另一个文件p1.py中，可以部分内容
shutil.copyfileobj(f1,f2)
shutil.copyfile(src, dst)
shutil.copymode(src, dst) # 仅拷贝权限（内容、组、用户均不变
shutil.copystat(src, dst) # 拷贝状态的信息，包括：mode bits, atime, mtime, flags
shutil.copy(src, dst) # 拷贝文件和权限
shutil.copy2(src, dst) # 拷贝文件和状态信息
shutil.ignore_patterns(*patterns)
shutil.copytree(src, dst, symlinks=False, ignore=None) #递归的去拷贝文件：
shutil.rmtree(path[, ignore_errors[, onerror]])  递归的去删除文件
shutil.move(src, dst) # 递归的去移动文件
shutil.make_archive(base_name, format,...) # 创建压缩包并返回文件路径
```



### 9.subprocess

```python
subprocess.call() # 0 normal
subprocess.check_call() # throw exception
subprocess.check_output

Popen.pid # 获取子进程的进程ID。
Popen.returncode # 获取进程的返回码。如果进程未结束，将返回None。

res = subprocess.Popen(
      cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
sout, serr = res.communicate()
//异步异步异步异步异步异步异步
child = subprocess.Popen(["ping","-c","5","www.google.com"])
child.wait()
child.poll()           # 检查子进程状态
child.kill()           # 终止子进程
child.send_signal()    # 向子进程发送信号
child.terminate()      # 终止子进程
```



### 10.re

```python
re.compile()
re.search()
re.match()
re.findall()
re.finditer()
re.split()
re.sub()
re.subn()
match和search一旦匹配成功，就是一个match object对象，而match object对象有以下方法：
    group() 返回被 RE 匹配的字符串
    start() 返回匹配开始的位置
    end() 返回匹配结束的位置
    span() 返回一个元组包含匹配 (开始,结束) 的位置
    group() 返回re整体匹配的字符串，可以一次输入多个组号，对应组号匹配的字符串。
    a. group（）返回re整体匹配的字符串，
	b. group (n,m) 返回组号为n，m所匹配的字符串，如果组号不存在，则返回indexError异常
	c.groups（）groups() 方法返回一个包含正则表达式中所有小组字符串的元组，从 1 到所含的小组号，通常	  groups()不需要参数，返回一个元组，元组中的元就是正则表达式中定义的组

re.match只匹配字符串的开始，如果字符串开始不符合正则表达式，则匹配失败，函数返回None；而re.search匹配整个字符串，直到找到一个匹配。
a=re.search('[\d]',"abc33").group()
p=re.match('[\d]',"abc33")
b=re.findall('[\d]',"abc33")
执行结果：3 / None / ['3', '3']

print(re.split('a','1A1a2A3',re.I))  #输出结果并未能区分大小写
print(re.split('a','1A1a2A3',flags=re.I))

对于子进程返回的乱码 pip install chardet
import chardet
# check character coding
t = b' \xc7\xfd\xb6\xaf\xc6\xf7 C \xd6\xd0\xb5\xc4\xbe\xed\xca\xc7 OS\r\n'
print(chardet.detect(t))
{'encoding': 'gb2312', 'confidence': 0.99, 'language': ''}
print(bytes(t).decode('gb2312'))
```



### 11.xml

```python
sax / dom / etree / lxml(third lib support xpath)
首选ET并且用ET.iterparse support xpath
1、对大型文件进行处理；
2、只需要文件的部分内容，或者只需从文件中得到特定信息。
3、想建立自己的对象模型的时候。
```



### 12.random

```python
print(random.uniform(10, 20))
print(random.randint(10, 20))  //integer
print(random.randrange(10, 20, 2))  //even
print(random.choice('abcdefg&#%^*f'))
print(random.sample('abcdefghij', 3))
string = 'jack'
print(string.join(random.sample(
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 3)).replace(" ", ""))
print(random.choice(['apple', 'pear', 'peach', 'orange', 'lemon']))
items = [1, 2, 3, 4, 5, 6]
random.shuffle(items)
print(items)
print('123'.join('jack'))
```



### 13.logging

```python
级别从低到高：CRITICAL 50 /ERROR 40 /WARNING 30 /INFO 20 /DEBUG 10 /NOTSET 0
import logging
logging.basicConfig(level = logging.INFO,format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
```

  > format: 指定输出的格式和内容，format可以输出很多有用信息，如上例所示:
  > %(levelno)s: 打印日志级别的数值
  > %(levelname)s: 打印日志级别名称
  > %(pathname)s: 打印当前执行程序的路径，其实就是sys.argv[0]
  > %(filename)s: 打印当前执行程序名
  > %(funcName)s: 打印日志的当前函数
  > %(lineno)d: 打印日志的当前行号
  > %(asctime)s: 打印日志的时间
  > %(name)s: 日志模块名
  > %(thread)d: 打印线程ID
  > %(threadName)s: 打印线程名称
  > %(process)d: 打印进程ID
  > %(message)s: 打印日志信息
  > datefmt: 指定时间格式，同time.strftime()

```python
Rthandler = RotatingFileHandler('myapp.log', maxBytes=10*1024*1024,backupCount=5)  //10M
logger.info("Start print log")
logger.debug("Do something")
logger.warning("Something maybe fail.")
logger.info("Finish")
```


### 14.configparser

```python
import configparser

config = configparser.ConfigParser()
config.read(r'C:\bin\python\module\configure.ini', encoding='utf-8')
ret = config.sections()
print(ret)
ret = config.items('section1')  # including default
options = config.options('bitbucket.org') # including default

# if the key is not exist get it from default
print(config['topsecret.server.com']['Compression'])
config.get('topsecret.server.com', 'Port')

has_sec = config.has_section('section1')   # check
config.add_section("SEC_1") # add section
config.remove_section("SEC_1") remove section

has_opt = config.has_option('section1', 'k1')
print(has_opt)

config.remove_option('section1', 'k1')
config.set('section1', 'k10', "123")
config.write(open('xxxooo', 'w'))
```


### 15.cvs

````python
see csvtest.py
python2 open(csv_file_path,'wb', newline='') as csv_file:
python3 加入参数去掉多余空行 with open(csv_file_path,'wt', newline='') as csv_file:
````



### 16.json & Demjson

```python
序列化    dumps：无文件操作            dump：序列化+写入文件
反序列化  loads：无文件操作            load： 读文件+反序列化

import demjson
demjson.encode( ['one',42,True,None] )  # From Python to JSON
demjson.decode( ['one',42,True,None] )  # From JSON to Python
```



### 17.chardet

```python
data = '离离原上草，一岁一枯荣'.encode('gbk')
>>> chardet.detect(data)
{'encoding': 'GB2312', 'confidence': 0.7407407407407407, 'language': 'Chinese'}
```



### 18.psutil

```python
[p.info for p in psutil.process_iter(attrs=['pid', 'name']) if 'python' in p.info['name']]
```



### 19.copy

```python
copy.copy(xxx)
copy.deepcopy(xxx)
```



### 20.pyperclip

```python
pyperclip.copy(xxxx)
pyperclip.paste()
```



### 21.系统直接调用函数

```python
dir(obj) 查看obj的name space中可见的name
help(obj) 在线帮助, obj可是任何类型
type(obj) 查看一个obj的类型
isinstance(obj,cls) 查看obj是不是cls的instance
issubclass(subcls,supcls) 查看subcls是不是supcls的子类

callable(obj) 查看一个obj是不是可以像函数一样调用
repr(obj) 得到obj的表示字符串，可以利用这个字符串eval重建该对象的一个拷贝
eval(str) 表示合法的python表达式，返回这个表达式
hasattr(obj,name) 查看一个obj的namespace中是否有name
getattr(obj,name) 得到一个obj的namespace中的一个name
setattr(obj,name,value) 为一个obj的namespace中的一个name指向vale这个object
delattr(obj,name) 从obj的namespace中删除一个name
vars(obj) 返回一个object的namespace。用dictionary表示
locals() 返回一个局部namespace,用dictionary表示
globals() 返回一个全局namespace,用dictionary表示

##################    类型转换  ##################

chr(i) 把一个ASCII数值,变成字符
ord(i) 把一个字符或者unicode字符,变成ASCII数值
oct(x) 把整数x变成八进制表示的字符串
hex(x) 把整数x变成十六进制表示的字符串
complex(x) 转换成复数

str(obj) 得到obj的字符串描述
list(seq) 把一个sequence转换成一个list
tuple(seq) 把一个sequence转换成一个tuple
dict(),dict(list) 转换成一个dictionary
int(x) 转换成一个integer
float(x) 转换成一个浮点数

max(...) 求最大值
min(...) 求最小值
```



### 22.bat run py & py run py

```python
@py.exe  C:\bin\python\module\subprocesstest2.py %*

subprocess.Popen([r'C:\python36\python.exe', 'another.py'])
```



### 23.str / list / tuple / dict / set

```python
str
	upper() lower() isupper() islower()
	isalpha() islnum() isdecimal() isapace() istitle()
	startswith() endswith()
	','.join(['cat','dog','bird'])
	'xxxxx'.split([,])
	strip() rstrip() lstrip()
	replace() index() find()
	'py' [not] in  'python'
list
	l = [1,2]
	l = []
	l2 = [1]
	l3 = [2]
	l2 + l3
	len() append() insert() pop() sort() index() remove() extend
tuple
	t = (1, 2)
	t = ()
	t = (1,)
dict
	d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
	keys() values() item()
	pop(key)
	'name' in keys
    d.get('Thomas', -1)
    setdefault()
set
	s = set([1, 2, 3])
	s.add(4)
	s.remove(4)
	s1 = set([1, 2, 3])
	s2 = set([2, 3, 4])
	s1 & s2 --> {2, 3}
	s1 | s2 --> {1, 2, 3, 4}
```

### 24.other  & range() & 列表生成式 & setup

```python
def add_end(L=[]):
    L.append('END')
    return L
change to
def add_end(L=None):
    if L is None:
        L = []
    L.append('END')
    return L

list(range(10))
list(range(1, 11))
list(range(0, 30, 5))

[x * x for x in range(1, 11)]
[x * x for x in range(1, 11) if x % 2 == 0]
[m + n for m in 'ABC' for n in 'XYZ']
[k + '=' + v for k, v in d.items()]
[s.lower() for s in L]

python setup.py sdist
python setup.py install
```


### 25.example

```python
a, b, c = b, c, a

```