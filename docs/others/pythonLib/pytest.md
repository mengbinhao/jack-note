### 1 feature

1. 简单灵活，容易上手
2. 能够支持简单的单元测试和复杂的功能测试，还可以用来做selenium/appnium等自动化测试、接口自动化测试（pytest+requests）
3. 支持参数化
4. pytest具有很多第三方插件，并且可以自定义扩展，比较好用的如pytest-selenium（集成selenium）、pytest-html（完美html测试报告生成）、pytest-rerunfailures（失败case重复执行）、pytest-xdist（多CPU分发）等
5. 测试用例的skip和xfail处理
6. 支持重复执行失败的case
7. 可以很好的和持续集成工具集成(jenkins)
8. 支持运行由nose, unittest编写的测试case

### 2 install

```
pip install -U pytest 
pip install -U pytest-html
pip install -U pytest-rerunfailures

pytest --version
pytest --fixtures # show available builtin function arguments  
pytest -h
```

### 3 home page

[pytest](https://pypi.org/project/pytest/)        [pytest-plugin](http://plugincompat.herokuapp.com/)       [pytest-html](https://pypi.org/project/pytest-html/)      [pytest-rerunfailures](https://pypi.org/project/pytest-rerunfailures/)

==pytest -s .\tpsautomation\test\ --html=C:\Users\T5810\Desktop\tpsautomation\tpsautomation\test\log\result.html==

### 4 how to find testcase

```
测试文件以test_开头（以_test结尾也可以）
测试类以Test开头，并且不能带有 __init__ 方法
测试函数以test_开头
断言使用基本的assert即可
设置pythonpath  查找路径是你自己自定的包的路径
```

### 5 how to use excute testcase

1. 默认执行当前目录下及其子目录所有==test\_*.py or *\_test.py中====test\_为前缀的函数==

   ```
   pytest # run all tests below current dir  
   pytest xxx.py  -->  under current folder, if py not in current folder, add according path 
   pytest somepath      # run all tests below somepath  
   pytest -k stringexpr # only run tests with names that match  
                        # the "string expression", e.g. "MyClass and not method"  
                        # will select TestMyClass.test_something  
                        # but not TestMyClass.test_method_simple  
   pytest test_mod.py::test_func # only run tests that match the "node ID",  
                                 # e.g "test_mod.py::test_func" will select  
                                 # only test_func in test_mod.py  
   ```

2. invoke in python 

   ​	pytest.main(['q', '--html=C:\Users\OUR\Desktop\tpsautomation\tpsautomation\test\result.html'])

3.  parametrizing test functions

   ```
   import pytest
   
   @pytest.mark.parametrize("test_input,expected", [ ("3+5", 8), ("2+4", 6), ("6*9", 42), ]) 
   def test_eval(test_input, expected): 
       assert eval(test_input) == expected
   
   ```

4. skip / skipif /xfail

   ```
   pytestmark = pytest.mark.skip("all tests still WIP")
   pytestmark = pytest.mark.skipif(sys.platform == "win32", "tests for linux only")
   docutils = pytest.importorskip("docutils")
   
   @pytest.mark.skipif(not pytest.config.getoption("--runslow"))
   import pytest
   xfail = pytest.mark.xfail
   @xfail 
   def test_hello(): 
   	assert 0
   @xfail(run=False) 
   def test_hello2(): 
   	assert 0
   @xfail("hasattr(os, 'sep')") 
   def test_hello3(): 
   	assert 0
   @xfail(reason="bug 110") 
   def test_hello4(): 
   	assert 0
   @xfail('pytest.__version__[0] != "17"') 
   def test_hello5(): 
   	assert 0
   def test_hello6(): 
   	pytest.xfail("reason")
   @xfail(raises=IndexError) 
   def test_hello7(): 
   	x = [] x[1] = 1
   
   ```

   skip  + xfail example

   ```
   import pytest
   @pytest.mark.parametrize( ("n", "expected"), 
   	[
   		(1, 2), 
   		pytest.param(1, 0, marks=pytest.mark.xfail), 
   		pytest.param(1, 3, marks=pytest.mark.xfail(reason="some bug")), 
   		(2, 3), 
   		(3, 4), 
   		(4, 5), 
   		pytest.param( 10, 11, marks=pytest.mark.skipif(sys.version_info >= (3, 0), reason="py2k")),
   	],
   ) 
   def test_increment(n, expected): 
   	assert n + 1 == expected
   
   ```

5. fixture -> fixture是pytest特有的功能，它用pytest.fixture标识，定义在函数前面。在你编写测试函数的时候，你可以将此函数名称做为传入参数，pytest将会以依赖注入方式，将该函数的返回值作为测试函数的传入参数

6. pytest.ini

   ```
   [pytest]
   # python_files = *.py
   # addopts = --maxfail=2 -rf # exit after 2 failures, report fail info
   norecursedirs = .svn _build tmp*
   # log_file = tpsautomation/test/logs/pytest-logs.txt
   ```

   