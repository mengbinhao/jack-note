##### 1 原理

基于GUI功能测试工具的基本原理是：将操作应用程序的各种动作和输入记录下来，如将键盘操作，鼠标单击等捕捉下来，生成一个脚本文件，这个脚本以后可以被“回放”，也就是能重复上一次所操作的动作，实现自动运行。

##### 2 主流测试工具

| 功能自动化测试工具 | **编程语言**                                           | 适用场景 | 备注                                                         | 商业支持 |
| ------------------ | ------------------------------------------------------ | -------- | ------------------------------------------------------------ | -------- |
| UFT(QTP)           | VBS                                                    | web+c/s  | 录制+回放,大而全                                             | 付费     |
| Ranorex            | C#、VB.NET                                             | web+c/s  | 录制+回放 ,大而全 ,支持包括web 2.0, Win32, MFC, WPF, Flash/Flex, .Net和ava(SWT) Ranorex没有自己的脚本语言,用户可以使用业界流行的编程语言C#, VB.NET编写它的测试用例 | 付费     |
| **Squish**         | Python、js、ruby                                       | web+c/s  | 用于测试基于Qt C++开发的GUI,支持跨平台自动化测试,windows,Linnux均可,Squish可以获取到Qt的具体控件,**可能QTP和AutoIt是获取不到的** | 付费     |
| Sikuli             | Python                                                 | c/s      | 通过截图进行测试                                             | 开源     |
| **Autoit**         | 类VBS                                                  | c/s      | 模拟键盘按键，鼠标移动和窗口/控件的组合来实现自动化任务      | 开源     |
| **PyAutoGUI**      | Python                                                 | c/s      | PyAutoGUI是一个纯Python的GUI自动化工具，可以用程序自动控制鼠标和键盘操作，多平台支持（Windows,OS X,Linux） | 开源     |
| **Pywinauto**      | Python                                                 | c/s      | 主要操作于Windows标准图形界面。可以允许你很容易的发送鼠标、键盘动作给Windows的对话框和控件。其中，最主要功能为对windows标准控件的一系列动作可编程处理。包括对窗口的指定、鼠标或键盘操作、获得控件属性等等。程序的开始为对所需应用的启 动或连接。获得程序连接后，pywinauto通过窗口的名称、类名、是否可见等属性寻找匹配的窗口，进而通过类似方法寻找用户所需的控件，并获得相应的 句柄。之后，用户可通过易理解的编程方式对指定控件进行相关操作的编程，包括鼠标点击、键盘输入、判断控件间关系、获取控件属性等。 | 开源     |
| Robot Framework    | Python                                                 | web+c/s  | 关键字驱动的自动测试框架。测试用例位于HTML或者TSV(以tab分隔值)文件，使用在测试库中实现的关键词来在测试中运行程序。因为灵活和可扩展性，所以它很合适用于测试具有多种接口的复杂软件：用户接口，命令行，web service，编程接口等 | 开源     |
| TestComplete       | VBScript、JScript、DelphiScript、C++Script、C#Script   | web+c/s  | 录制+回放  大而全                                            | 付费     |
| RFT                | Java                                                   | web+c/s  | 录制+回放,需要获得当前浏览器和电脑屏幕的位置，要求屏幕始终打开。这需要人围的支持，提高项目开发的成本 | 付费     |
| Rational Robot     | Java HTML 和 DHTML Visual Basic Visual C++ ActiveX XML | c/s      | 是测试 .NET 应用程序的首选工具，可以为 .NET 控件（包括 VB.NET、C#、J# 和 Managed C++）的测试提供全面的本机支持的测试工具，基于 Microsoft Visual Studio.NET WinForms 和 WebForms 构架的应用程序的功能测试、分布式功能测试和回归测试自动化，并将 .NET 应用程序的配置测试加以简化和自动化。 | 付费     |
| SilkTest           | 4Test                                                  | web+c/s  | 测试的计划和管理；直接的数据库访问及校验；灵活、强大的4Test 脚本语言，内置的恢复系统(Recovery System)；以及具有使用同一套脚本进行跨平台、跨浏览器和技术进行测试的能力。 | 付费     |
| Watir              | Ruby                                                   | web      | 非常适合做ui自动化                                           | 开源     |
| Selenium           | RC支持C#，Java，Python， Ruby等                        | web      | 分类较多,IDE仅支持FF录制，回放； B/S中UFT对手，占有率上升明显 | 开源     |

##### 3 选择原因

      1. 学习成本
      2. 开发效率(是否现成免费的IDE)
      3. 维护成本
      4. license
      5. 社区支持
      6. 扩展性(Jenkins、Maven等其他)
      7. report (能生成清晰的report界面或可以集成第三方)
      8. **结合公司适用场景（被测产品、开发技术、开发环境、使用场景、最终用户等）**

##### 4  初步筛选（黑色加粗）

| 工具                | 备注                   | 价格                               | doc                                                          |
| ------------------- | ---------------------- | ---------------------------------- | ------------------------------------------------------------ |
| **Autoit**          | 类VBS                  |                                    | [doc](https://www.autoitscript.com/autoit3/docs/)            |
| **PyAutoGUI**       | pip 安装               | 免费                               | [doc](http://pyautogui.readthedocs.io/en/latest/introduction.html) |
| **Pywinauto**       | pip 安装               | 免费                               | [doc](https://pywinauto.readthedocs.io/en/latest/index.html) |
| **Robot Framework** | pip 安装               | 免费                               | [doc](http://robot-framework.readthedocs.io/en/v3.0.4/)      |
| Cobra WinLDTP       | pip 安装               | 免费                               |                                                              |
| Sikuli              | 截图 / 2011后没更新    | 免费                               | [doc](http://sikulix-2014.readthedocs.io/en/latest/index.html) |
| **UFT(QTP)**        | 用的人最多             | 付费 $600 RT/3 months /可以定制    | [doc](https://software.microfocus.com/en-us/resources/uft)   |
| **Squish**          | 可以专门针对Qt程序进行 | 付费 NA                            | [doc](https://kb.froglogic.com/display/KB/Squish+Knowledge+Base) |
| Rational Robot      | IBM                    | 付费                               | [doc](https://blog.csdn.net/rubi/article/details/1533837)    |
| RFT                 | IBM                    | 付费 3600/year                     |                                                              |
| Ranorex             | 学习成本太高           | Floating license $3990/year        | [doc](https://www.ranorex.com/Documentation/Ranorex/)        |
| Testcomplete        | 录制+回放  大而全      | DeskTop $5400 / full version $8400 | [doc](https://support.smartbear.com/testcomplete/docs/testing-with/checkpoints/regions/about.html) |
| SilkTest            | 专门的脚本语言4Test    | 付费 NA                            | [doc](https://www.microfocus.com/products/silk-portfolio/silk-test/resources/) |

##### 5 Question

1. 如何传递快捷键到CS架构项目中？
2. 如何控制鼠标拉动滚动条？
3. 如何控制鼠标点击右键后弹框的内容？
4. 如何保证鼠标滚轴切换图像？
5. 更改显示设置（如分辨率）后如何保证case？

##### 6 其他工具

| 性能自动化测试工具 | **编程语言** | 备注                                                   | 商业支持 |
| ------------------ | ------------ | ------------------------------------------------------ | -------- |
| LR                 | 类C          | 支持录制，回放,大而全                                  | 付费     |
| Jmeter             | JAVA         | BadBoy+Jmeter 可进行录制； B/S中LR对手，占用率上升明显 | 开源     |



| 测试(缺陷)管理工具     | 编程语言 | 备注                               | 商业支持 |
| ---------------------- | -------- | ---------------------------------- | -------- |
| TestLink               | PHP      | 无缺陷管理，可与Mantis集成         | 开源     |
| HP Quality Center(ALM) | VBS      | 大而全                             | 付费     |
| Mantis                 | PHP      | 可与SVN、TestLink集成              | 开源     |
| JIRA                   | JAVA     | 简单好用                           | 付费     |
| Bugzilla               | TCL/Perl | Appach+PERL+MySQL无法定制,功能简单 | 开源     |

