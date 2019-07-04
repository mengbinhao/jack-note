### 1.TC resources

1.  [official latest doc](https://support.smartbear.com/testcomplete/docs/)
2.  [video](https://support.smartbear.com/testcomplete/videos)
3.  北航使用Qt4.8开发的,需要[qt-module 4.8 support](https://support.smartbear.com/downloads/testcomplete/qt-modules/)
    > TC_12_50_4142_Qt_4_8_0_Support for supporting other version of QT, because TC12 default only supports QT5.0

### 2.test type

- record keyword test(通过录制得到测试脚本，回放完成自动化)
- script test(通过执行特定的脚本语言，完成自动化，相比上一种更灵活)

### 3.tips
-   test suite
    -   stop on error
    -   count
    -   timeout
    -   indent level / group
-   add parameter 参数传递
-   script invoke script / keyword tests、keyword tests invoke keyword tests / script
-   store value for use (eg: checkpoints)
    -   create variable
    -   operation set variable
    -   add checkpoint
-   nameMapping
    -   edit object properties
    -   add new object to current project (tool -> current project  - > object mapping)
    -   extend find (drag to parent)
    -   dynamic property (eg : *)
-   run in different environment
-   statement  (eg: skip null value)
-   advance -> events (eg :  handle exception popup onscriptstart / onscriptstop)
-   make data loop / data-driven loop

### 4.configuration
-   disable stop on error [doc](https://support.smartbear.com/testcomplete/docs/testing-with/running/control-test-flow/overview.html?q=stop%20on%20error)
-   disable error dialog
    -   tools -> current project properties -> playback  (minimize testcomplete and others...)
-   enable / disable debug

### 5.some build-in objects

- `aqObject`  检查点对象
- `Runner `     执行用例对象
- `aqConvert`  转换对象
- `aqDateTim`  时间处理对象
- `aqString`   string相关
- `RegExpr`
- `aqUtils.delay(seconds) `  帮助对象
- `Log.Error / Warning / Message `
- `Sys / Process / Window / Desktop`  系统相关对象
- `LLPlayer `  鼠标对象
- `aqFileSystem / aqFolderInfo` 文件相关
- `Picture ` 图像相关
- `aqEnvironment ` 环境对象

### 6.[integrated with jenkins](https://support.smartbear.com/testcomplete/docs/working-with/integration/jenkins/index.html)

//每个星期五18点
0 18 * * 5

### 7.notes
    ```
    //Will continue excute if does not pass
    //so need to hanle below code
    aqObject.CompareProperty(ret, cmpNotEqual, -1, true, 3);

    //Runner.Stop(true) do not pass globle param (like indel), after cases all fail
    Runner.Stop(true);
    ```

-   action method instead of native method
-   onscriptstart / onscriptstop