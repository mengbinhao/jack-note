### 1.Chrome hotkey
- `ctrl + +|-|0`
- `ctrl + 1~9`
- `ctrl + T`
- `ctrl + <-|->`

### 2.Hotkey
- `ctrl + p` -> `?`查看可用命令
- `ctrl + shift + p`
- `ctrl + f`
- `ctrl + shift + f`
- `ctrl + [|]` 切換面板
- `sources panel -> ctrl + shift + p -> coverage (red section is useless)`
- `ctrl + p + ! + snippetName`

### 3.ELements (right click on a dom element)
1. Styles
   - :hov
   - color selector
   - shift + click to change color between rgba、hsl and hexadecimal
   - long press +
   
2. Computed

3. Event Listeners
   
    - show function define
    
4. Properties

5. DOM Breakpoints

6. element related

    1. **`h`** //hidden or show element
    2. drag element
    3. `ctrl + ⬆ | ⬇` move up / down element
    4. `ctrl + c/v/z` element
    5. Shadow editor and Timing function editor
    6. `expand recursively`
    7. break on (subtree modifications、attribute modifications、node removal)

### 4.Console
1. abbreviation(support jQuery selector)
  > `$()` : document.querySelector()的缩写，返回本页第一个与之匹配的CSS选择器的元素,$$(selector,[startNode])
  >
  > `\$\$()` : document.querySelectorAll()的缩写，返回一个数组，里面是与之匹配的CSS选择器的元素,$$(selector,[startNode])
  >
  > `\$0–4` : 依次返回五个最近你在元素面板选择过的DOM元素的历史记录，$0是最新的记录，以此类推
  >
  > `\$_`  上一次結果引用

- `\$x("//p")`     locate by xpath,$x(selector,[startNode])

-  `keys() / values()`

- `group() groupEnd() / profile() profileEnd()`

- `console.log() / warn() / error()`

- `console.trace()`

- `console.count('xxx')`

- `clear()`

- `Live expression`

- `ctrl + shift + p -> timestamps`

- `console.time([tagString]) timeEnd([tagString])`

- `await xxxx` 可以直接console寫await

    ```javascript
    await navigator.storage.estimate()
    console.table(await navigator.getBattery())
    await caches.keys()
    ```

- `console.assert()` //对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台

- `dir($1)`

- **`table(obj, [colName, colName2])`**  //類數組或對象

- **`copy(obj)`**

- `inspect($('selector'))`

- **Sotore as global variable**

- **堆棧信息保存到文件**
2. **`console.log(var1, var2, var3) -> console.log({var1, var2, var3})`**

3. **监控事件**

- `monitorEvents($(‘selector’))` 将监视与选择器的元素关联的所有事件，然后在它们被触发时打印到控制台
- `monitorEvents($(‘selector’),’eventName’)` 将打印与元素绑定的特定事件
- `monitorEvents($(selector)，[eventName1, ...'])`将根据您自己的需求记录多个事件
- `unmonitorEvents($(selector))`这将停止监视和打印控制台中的事件
- `monitor/unmonitor` `monitor` 是 `DevTools` 的一个方法， 它能够让你 "潜入"到任何 `_function calls`中：每当一个 被潜入的方法运行的时候，console 控制台会把它的实例打印出来，包含 **函数名** 以及 **调用它的参数** 

4. `queryObjects(Person)`
5. `getEventListeners($(‘selector’))` //查找与DOM中的元素关联的事件
6. `document.body.contentEditable=true `   //将浏览器转换为编辑器

### 5.Sources
- {} => format

- Filesystem

- Snippets

- blackbox script

- condition breakpoint
  
    - 可以直接console.log(), 返回時falsy不會暫停
    
- pause on exception

- ctrl+shift+p-> 查看代码coverage

- Local overrides

    - Local overrides 模拟 Mock 数据

### 6.Network
- **自定義顯示列**

- **filter(`larger-than` 、`status-code`、 `mine-type`、`method`、`mime-type`)**
  
    - `ctrl + space` //see all keywords
    
- **initiator**

- **right click瀏覽器refresh按鈕多條件刷新**

    ![](./images/chrome.png)

- **`replay XHR`**
  
    - Sources面板增加XHR/fetch斷點(填入url固定某個請求或留空任意xhr請求)
    
- block request  URL

- Preserve log

- block request

- copy response

- settings

### 7. Drawer

- 任意面板點`ESC`打開drawer
- **Coverage**
- Changes
- Quick source
- 控制传感器
- 模拟网络状态

### 8. workspace

- 在 `Chrome` 中修改你的文件

- `Workspace` 支持即时同步样式

- 为新选择器选择目标位置

- `Workspace` 允许 `CSS` 注入

### 9.Application
- local storage
- session storage
- cookie

### 10.Settings
- Show user agent shadow DOM
- Log XMLHttprequests
- Enable custom formatters

### 11. Performance

- `> performance monitor`  性能监视器
- FPS选择第一项,FPS实时监控性能
- `screenshot` 截图相关
- `coverage`  查看代码利用率