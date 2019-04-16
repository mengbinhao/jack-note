### 1.Hotkey

- ctrl + p      change  file
- ctrl + shift + p    command
- ctrl + f
- ctrl + shift + f    global search
- ctrl + g
- ctrl + d   multi-select then multi-change
- ctrl + left click   multi-select then multi-change

### 2.ELements (right click on a dom element)

1. Styles
   - :hov
   - color selector
   - shift + click to change color betweent rgba、hsl and hexadecimal
2. Computed
3. Event Listeners
4. Properties
5. DOM Breakpoints

### 3.Console

- abbreviation(support jQuery selector)

  > $() : document.querySelector()的缩写，返回本页第一个与之匹配的CSS选择器的元素
  >
  > \$\$() : document.querySelectorAll()的缩写，返回一个数组，里面是与之匹配的CSS选择器的元素
  >
  > \$0–4 : 依次返回五个最近你在元素面板选择过的DOM元素的历史记录，$0是最新的记录，以此类推
  >
  > \$_  检索最后一个结果的值

- \$x("//p")     locate by xpath

- **console.dir()**  keys()  values()

- console.time() timeEnd() / group() groupEnd() / profile() profileEnd()
- console.log() warn()
- console.assert() //对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台
- console.trace()
- console.count()
```
for(let i = 0; i < 10000; i++) {
  if(i % 2) {
    console.count('odds');
  }
  if(!(i % 5)) {
    console.count('multiplesOfFive');
  }
  if(isPrime(i)) {
    console.count('prime');
  }
}
```
- console.table()
```
const data = [{
  id: "7cb1-e041b126-f3b8",
  seller: "WAL0412",
  buyer: "WAL3023",
  price: 203450,
  time: 1539688433
},
{
  id: "1d4c-31f8f14b-1571",
  seller: "WAL0452",
  buyer: "WAL3023",
  price: 348299,
  time: 1539688433
},
{
  id: "b12c-b3adf58f-809f",
  seller: "WAL0012",
  buyer: "WAL2025",
  price: 59240,
  time: 1539688433
}];
```
- clear()
#### 将浏览器转换为编辑器
`document.body.contentEditable=true`

#### 查找与DOM中的元素关联的事件
`getEventListeners($(‘selector’))`

#### 监控事件
- monitorEvents($(‘selector’)) 将监视与选择器的元素关联的所有事件，然后在它们被触发时将它们打印到控制台
- monitorEvents($(‘selector’),’eventName’) 将打印与元素绑定的特定事件
- monitore($(selector)，[eventName1, eventName3'， .])将根据您自己的需求记录多个事件
- unmonitorEvents($(selector)):这将停止监视和打印控制台中的事件

#### 检查DOM中的一个元素
`inspect($0)`


### 4.Sources

- {}   format
- Filesystem
- Network
- Snippets
- blackbox script

### 5.Network

### 6.Application

### 7.Settings

- Show user agent shadow DOM
- Log XMLHttprequests







