##### Basic Concept

1. 解释器

   - CPython 、IPython、PyPy、Jython、IronPython

2. 区分大小写

3. 标识符可以包括英文、数字以及下划线(_)，但不能以数字开头

4. 语句无分号，但有这个操作符

5. **.py起名不要和系统文件重名不要重名不要重名不要重名不要重名**

6. 单行注释#加个空格    多行注释    """xxxxx"""`

7. 冒号缩进代替开始和结束大括号, 4个空格

8. 弱类型(变量或参数无需声明)（整数、浮点数、字符串（转义\、unicode、格式化）布尔值、空值None）
   - `r'' `     不转义
   - `'''...'''`  多行
   - `r'''...'''`  混用
   - 布尔值（True  False）（and or not 与或非运算符）
   - 字符串   不变   使用+连接

9. 变量

   ```
   a = b = c = 1
   a, b, c = 1, 2, "john"
   
   global xxxx
   ```


10. 常量大写

11.  //取整 （算数  比较  赋值 逻辑 位  成员in / not in 身份is / is not 优先级）

    **is 用于判断两个变量引用对象是否为同一个， == 用于判断引用变量的值是否相等**

12. <u>**pydoc.exe**</u>   

    ​	python -m pydoc -p 1111 

13. butild-in function 

   - help()  
   - int()  hex()  oct()  bin()  str()  repr()  bool()  bytearray()  bytes()  float()  set()  range()  list()   dict()  tuple()  sort()  slice() all() any()  filter()  reversed()  
   - abs() min()  sum() pow() max() round()
   - id()  object()  **isinstance**()  **type()** **enumerate**()  **iter()** **dir()**  super()  issubclass() property()  frozenset()  classmethod() staticmethod()  **hasattr()  delattr() hash() setattr()   getattr()** 
   - next()   divmod()  exec()  callable()  locals()  globals()  zip()  compile() complex() memoryview()  
   - ord() chr()  **len()**  **print() **format()  encode()  decode() ascii()   
   - input()  eval()   open() 

14. ``#!/usr/bin/env python3      # -*- coding: utf-8 -*-``

15. **list and tuple**

    ```
    L = [1,2,3,4,5]
    L * 2
    L + [6,6,6]
    
    # tuple操作同list
    tup1 = (50,)  #只包含一个元素
    ```

16. **dict**(类似于map)   /    set   **dict的key必须是不可变对象(str int 元组)  set也只能放不可变对象**

    ```
    和list比较，dict有以下几个特点(dict的key必须是不可变对象(str int))
    
    查找和插入的速度极快，不会随着key的增加而变慢；
    需要占用大量的内存，内存浪费多。
    
    而list相反：
    查找和插入的时间随着元素的增加而增加；
    占用空间小，浪费内存很少。
    ```

17. if else 

    ```
    age = 3
    if age >= 18:
        print('adult')
    elif age >= 6:
        print('teenager')
    else:
        print('kid')
    ```

    express value **只要x是非零数值、非空字符串、非空list  ()等，就判断为True，否则为False**

    ```
    if x:
        print('True')
    ```

18. **for in**  /    while  / else

    - break
    - continue

    ```
    count = 0
    while count < 5:
       print count, " is  less than 5"
       count = count + 1
    else:
       print count, " is not less than 5"
    ```


19. **Data Type**

Python3 中有六个标准的数据类型：

- Number（数字）  (int bool float complex)
- String（字符串）
- List（列表）
- Tuple（元组）
- Sets（集合）
- Dictionary（字典）

Python3 的六个标准数据类型中：

- **不可变数据（四个）：**Number（数字）、String（字符串）、Tuple（元组）、Sets（集合）；
- **可变数据（两个）：**List（列表）、Dictionary（字典）

 None是个特殊值

##### Function

1. 定义
2. **pass**
3. 可以返回多个值,其实是一个tuple
4. no return 返回的是None
5. **param**

   1. 位置参数

      ```
      def printinfo( name, age ):
         print("Name: ", name)
         print("Age ", age)
         return;
       
      printinfo( age=50, name="miki" );
      ```


   2. 默认参数(注意以下区别)

      1. enroll('Bob', 'M', 7)

      2. enroll('Adam', 'M', city='Tianjin')

      3. **默认参数必须指向不变对象！**默认值只被赋值一次   eg: addEnd

         ```
         def f(a, L=[]):
             L.append(a)
             return L
         
         print(f(1))
         print(f(2))
         print(f(3))
         
         [1]
         [1, 2]
         [1, 2, 3]
         ```


   3. 可变参数

      ```
      def calc(*numbers):
          sum = 0
          for n in numbers:
              sum = sum + n * n
          return sum
      
      nums = [1, 2, 3]
      print(calc(*nums))
      ```


   4. 关键字参数

      ```
      def person(name, age, **kw):
          print('name:', name, 'age:', age, 'other:', kw)
      
      extra = {'city': 'Beijing', 'job': 'Engineer'}
      #person('Jack', 24, city=extra['city'], job=extra['job'])
      person('Jack', 24, **extra)
      ```


   5. 命名关键字参数

      ```
      def person(name, age, *, city='Beijing', job):
          print(name, age, city, job)
      person('Jack', 24, city='Beijing', job='Engineer')
      
      def person(name, age, *args, city, job):
          print(name, age, args, city, job)
      ```


   6. **参数定义的顺序**：必选参数、默认参数、可变参数、命名关键字参数和关键字参数

   7. 对于任意函数,都可以通过`func(*args, **kw)`的形式调用它,无论它的参数是如何定义的

      ```
      def f1(a, b, c=0, *args, **kw):
          print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)
      
      def f2(a, b, c=0, *, d, **kw):
          print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)
      
      f1(1, 2)
      f1(1, 2, c=3)
      f1(1, 2, 3, 'a', 'b')
      f1(1, 2, 3, 'a', 'b', x=99)
      f2(1, 2, d=99, ext=None)
      
      args = (1, 2, 3, 4)
      kw = {'d': 99, 'x': '#'}
      f1(*args, **kw)
      
      args = (1, 2, 3)
      kw = {'d': 88, 'x': '#'}
      f2(*args, **kw)
      ```



##### Advance Function

1. **切片**

```
L = [1,2,3,4,5]
L[0:3]   =  L[:3]
L[-2:]
#倒数切片第一个索引是-1
L[-3:-1]
L[:10]
L[-10:]
L[10:20]
L[:10:2]
L[::5]
L[:]
(0, 1, 2, 3, 4, 5)[:3]
'ABCDEFG'[:3]
```

2. 迭代

3. **列表生成式**

   ```
   vec = [2, 4, 6]
   [3*x for x in vec]
   [[x, x**2] for x in vec]
   [3*x for x in vec if x > 3]
   
   freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
   [weapon.strip() for weapon in freshfruit]
   
   
   vec1 = [2, 4, 6]
   vec2 = [4, 3, -9]
   [x*y for x in vec1 for y in vec2]
   [x+y for x in vec1 for y in vec2]
   [vec1[i]*vec2[i] for i in range(len(vec1))]
   
   
   [str(round(355/113, i)) for i in range(1, 6)]
   ```

4. 生成器  generator 

5. 迭代器  

6. 总结

   凡是可作用于`for`循环的对象都是`Iterable`类型；

   凡是可作用于`next()`函数的对象都是`Iterator`类型，它们表示一个惰性计算的序列；

   集合数据类型如`list`、`dict`、`str`等是`Iterable`但不是`Iterator`，不过可以通过`iter()`函数获得一个`Iterator`对象。

   Python的`for`循环本质上就是通过不断调用`next()`函数实现的

   ```
   isinstance(iter([]), Iterator)
   ```

7. Higher Order Function

   1. map reduce filter sort

   2. return function  返回闭包时牢记一点：返回函数不要引用任何循环变量，或者后续会发生变化的变量。

   3. anonymous function

   4. decorator 

   5. 偏函数


##### Module

1. 模块名要遵循Python变量命名规范，不要使用中文、特殊字符

2. 模块名不要和系统模块名冲突，通过在Python交互环境检查`import abc`，若成功则说明系统存在此模块

3. 作用域：_开头是private的变量或函数 目的是隐藏

4. 包管理工具pip (安装勾选`pip`和`Add python.exe to Path`)

5. [Anaconda](https://www.anaconda.com/) 

6. 模块搜索路径   import sys  sys.path

   ```
   import fibo  #文件名fibo.py
   fibo.fib(1000)
   
   from fibo import fib, fib2
   fib(500)
   
   from fibo import *
   
   #运行脚本
   python fibo.py <arguments>
   
   if __name__ == "__main__":
       import sys
       fib(int(sys.argv[1]))
       
   python fibo.py 50
   ```

##### Package

1. 包中的 __init__.py 代码定义了一个名为 __all__ 的列表,__all__ = ["echo", "surround", "reverse"]

2. `from Package import func1 [,fun2....]  

3. ```
   import   //模块.函数
   from ... import ...  // 直接使用函数名使用就可以了
   
   from . import echo
   from .. import formats
   from ..filters import equalizer
   ```

```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

##### Class

1. 前后双下划线  特殊变量 可以直接访问

2. __xx 限制外部访问  但可以强制访问

   ```
   __foo__: 定义的是特殊方法，一般是系统定义名字 ，类似 __init__() 之类的。
   
   _foo: 以单下划线开头的表示的是 protected 类型的变量，即保护类型只能允许其本身与子类进行访问，不能用于 from module import *
   
   __foo: 双下划线的表示的是私有类型(private)的变量, 只能是允许这个类本身进行访问了。
   ```

3. 继承和多态

4. type()   可以动态创建类

   ```
   type(123)==type(456)
   type(123)==int
   type('abc')==type('123')
   type('abc')==str
   import types
   type(fn)==types.FunctionType
   type(abs)==types.BuiltinFunctionType
   type(lambda x: x)==types.LambdaType
   type((x for x in range(10)))==types.GeneratorType
   ```

5. isinstance()（**总是优先使用isinstance()判断类型**，可以将指定类型及其子类“一网打尽”）

   ```
   #判断多个
   isinstance([1, 2, 3], (list, tuple))
    
    
   class A:
       pass
   
   class B(A):
       pass
   
   isinstance(A(), A)  # returns True
   type(A()) == A      # returns True
   isinstance(B(), A)    # returns True
   type(B()) == A        # returns False
   ```

6. **dir()  /  dir(builtins)**  

7. 实例属性 、类属性

   - 不要对实例属性和类属性使用相同的名字,因为相同名称的实例属性将屏蔽掉类属性 


##### Advance Class

1. 动态绑定方法到类或实例

2. \__slot__

3. @property

4. 多重继承      [当心掉进Python多重继承里的坑](https://www.jianshu.com/p/71c14e73c9d9)

5. 定制类

6. 枚举类

7. 元类 metaclass

8. decorator

   - @classmethod
   - @property 
   - @staticmethod 
   - @test


##### try-except-finally  / raise

```
import logging

try:
    print('try...')
    r = 10 / int('2c')
    print('result:', r)
#exception基类BaseException
except ValueError as e:
    print('ValueError:', e)
    logging.exception(e)
except ZeroDivisionError as e:
    print('ZeroDivisionError:', e)
#捕获所有异常
except:
    print("Unexpected error:", sys.exc_info()[0])
    #raise ValueError('input error!')
    raise 
#没有exception触发
else:
    print('no error!')
finally:
    print('finally...')
print('END')
```



##### Debug

1. print()
2. assert
3. import logging
4. IDE

##### Unit Test

1. 单元测试可以有效地测试某个程序模块的行为，是未来重构代码的信心保证
2. 单元测试的测试用例要覆盖常用的输入组合、边界条件和异常
3. 单元测试代码要非常简单，如果测试代码太复杂，那么测试代码本身就可能有bug
4. 单元测试通过了并不意味着程序就没有bug了，但是不通过程序肯定有bug
5. `python -m unittest mydict_test`
6. `pip install nose`
7. `pip install pytest  ` 


##### 正则

1. 切分字符串
2. 分组
3. 贪婪非贪婪
4. 编译  `re_telephone = re.compile(r'^(\d{3})-(\d{3,8})$')`

##### 常用内建模块

1. **datetime**

2. **collections**
   1. namedtuple
   2. deque
   3. defaultdict
   4. OrderedDict
   5. Counter

3. base64

4. struct

5. hashlib

6. hmac

7. **itertools**
   1. count()
   2. cycle()
   3. repeat()
   4. takewhile()
   5. chain()
   6. groupby()

8. contextlib

   1. with
   2. @contextmanager
   3. @closing

9. urllib   request   smtplib urlparse BeautifulSoup  http

10. HTMLParser

11. glob      从目录通配符搜索中生成文件列表 

12. sys        命令行参数

    ```
    sys.argv 是一个 list,包含所有的命令行参数.    
    sys.stdout sys.stdin sys.stderr 分别表示标准输入输出,错误输出的文件对象.    
    sys.stdin.readline() 从标准输入读一行 sys.stdout.write("a") 屏幕输出a    
    sys.exit(exit_code) 退出程序 0正常退出
    sys.modules 是一个dictionary，表示系统中所有可用的module    
    sys.platform 得到运行的操作系统环境    
    sys.path 是一个list,指明所有查找module，package的路径.  
    ```

13. <u>**os         启动新进程；操作文件和目录   dir(os)    help(os)**</u>

    ```
    os.environ 一个dictionary 包含环境变量的映射关系   
    os.environ["HOME"] 可以得到环境变量HOME的值     
    os.chdir(dir) 改变当前目录 os.chdir('d:\\outlook')   
    注意windows下用到转义     
    os.getcwd() 得到当前目录     
    os.getegid() 得到有效组id os.getgid() 得到组id     
    os.getuid() 得到用户id os.geteuid() 得到有效用户id     
    os.setegid os.setegid() os.seteuid() os.setuid()     
    os.getgruops() 得到用户组名称列表     
    os.getlogin() 得到用户登录名称     
    os.getenv 得到环境变量     
    os.putenv 设置环境变量     
    os.umask 设置umask     
    os.system(cmd) 利用系统调用，运行cmd命令   
    ```

14. 系统直接调用函数

    ```
    help(obj) 在线帮助, obj可是任何类型    
    callable(obj) 查看一个obj是不是可以像函数一样调用    
    repr(obj) 得到obj的表示字符串，可以利用这个字符串eval重建该对象的一个拷贝    
    eval_r(str) 表示合法的python表达式，返回这个表达式    
    dir(obj) 查看obj的name space中可见的name    
    hasattr(obj,name) 查看一个obj的name space中是否有name    
    getattr(obj,name) 得到一个obj的name space中的一个name    
    setattr(obj,name,value) 为一个obj的name   
    space中的一个name指向vale这个object    
    delattr(obj,name) 从obj的name space中删除一个name    
    vars(obj) 返回一个object的name space。用dictionary表示    
    locals() 返回一个局部name space,用dictionary表示    
    globals() 返回一个全局name space,用dictionary表示    
    type(obj) 查看一个obj的类型    
    isinstance(obj,cls) 查看obj是不是cls的instance    
    issubclass(subcls,supcls) 查看subcls是不是supcls的子类  
    
    ##################    类型转换  ##################
    
    chr(i) 把一个ASCII数值,变成字符    
    ord(i) 把一个字符或者unicode字符,变成ASCII数值    
    oct(x) 把整数x变成八进制表示的字符串    
    hex(x) 把整数x变成十六进制表示的字符串    
    str(obj) 得到obj的字符串描述    
    list(seq) 把一个sequence转换成一个list    
    tuple(seq) 把一个sequence转换成一个tuple    
    dict(),dict(list) 转换成一个dictionary    
    int(x) 转换成一个integer    
    float(x) 转换成一个浮点数    
    complex(x) 转换成复数    
    max(...) 求最大值    
    min(...) 求最小值  
    ```

15. <u>**re          正则**</u>

16. <u>**xml**</u>

17. <u>**random**</u>

18. <u>**logging**</u>

19. configparser 读取配置文件 

20. jenkinsapi 访问jenkins 

21. pickle 序列化

22. json 序列化

23. shutil   日常的文件和目录管理任务 

24. uuid 生成唯一码 

25. math

26. zlib gzip bz2 lzma  zipfile tarfile

27. inspect 提供自省和反射功能

28. importlib 支持动态导入

29. bitstring二进制数据处理 

30. defaultdict 带默认值的字典 

31. fcntl 操作文件描述符 

32. signal 信号处理 

33. threading 线程库，构建并发应用 

34. psutil 系统性能参数 

##### PIP

- pip list
- pip list --outdated 
- pip install xxxx
- pip install --upgrade SomePackage 
- pip show --files xxxx
- pip uninstall xxxx
- pip -h

##### 常用第三方模块

1. Pillow
2. requests
3. chardet
4. psutil
5. demjson
6. pyperclip  右键黏贴
7. other
   - jinja2
   - aiomysql
   - aiohttp

##### virtualenv(“隔离”Python运行环境) 

1. pip install virtualenv

2. virtualenv xxxx

   virtualenv ``-``p ``/``usr``/``local``/``bin``/``python3 venv

3. xxxxxxxx\venv\Scripts\activate    //goto scripts folder, activate  vitualenv, note add prefix to cmd

4. pip list  /   pip install request

5. rm -rf xxxx

6. deactivate

7. original python.exe ---> pip install virtualenvwrapper-win    //  linux下运行pip install virtualenvwrapper

8. set  WORKON_HOME env param.   add to path

9. mkvirtualenv xxxxxx  //因为设置了WORKON_HOME，所有虚拟环境将安装到其目录下

   mkvirtualenv -p C:\Users\T5810\AppData\Local\Programs\Pyt
   hon\Python37\python.exe env37

10. workon  //这里不能查看到virtualenv创建的虚拟环境，只能查看mkvirtualenv创建的虚拟环境

11. workon xxxxxx  // go in one mkvirtualenv 

12. rmvirtualenv xxxxxx  

13. deactivate

##### pipenv

##### 图形界面

##### 网络编程

##### 电子邮件

##### 访问数据库

##### Web开发

##### 异步IO

- open()
- close()
- write()
- read()
- readline()
- tell()
- seek()

##### 最佳实践

- 使用 4 空格缩进，而非 TAB

  在小缩进（可以嵌套更深）和大缩进（更易读）之间，4空格是一个很好的折中。TAB 引发了一些混乱，最好弃用

- 折行以确保其不会超过 79 个字符

  这有助于小显示器用户阅读，也可以让大显示器能并排显示几个代码文件

- 使用空行分隔函数和类，以及函数中的大块代码

- 可能的话，注释独占一行

- 使用文档字符串

- 把空格放到操作符两边，以及逗号后面，但是括号里侧不加空格：`a = f(1, 2) + g(3, 4)`

- 统一函数和类命名

  推荐类名用 `驼峰命名`， 函数和方法名用 `小写_和_下划线`。总是用 `self` 作为方法的第一个参数

- 不要使用花哨的编码，如果你的代码的目的是要在国际化环境。Python 的默认情况下，UTF-8，甚至普通的 ASCII 总是工作的最好

- 同样，也不要使用非 ASCII 字符的标识符，除非是不同语种的会阅读或者维护代码。

- 不要使用 from xxx import *

- ```
  with open('/path/to/file', 'r') as f:
      print f.read()
  ```

