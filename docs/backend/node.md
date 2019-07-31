### 1. CommonJS规范
ecmascipt / 语法 / 内置对象

node 扩展后 -> net、db、file...
顶层对象global

### 2. feature

   - 异步I/O
   - 事件驱动

### 3. node --help

### 4. npm --help
   ```bash
   //set init parameter value
   npm config set init.author.email "mengbinhao2018@gmail.com"
   npm config set init.author.name "jack"
   npm config set init.author.url "http://github.com/mengbinhao"
   npm config set init.license "MIT"
   npm config set init.version "0.0.1"

   //excute when meet strange error
   npm cache clean --force

   npm root [-g]
   npm init [-y]

   //publish
   npm adduser
   npm whoami
   npm version patch
   npm version minor
   npm version major
   npm publish

   npm set xxx
   npm config set registry=https://registry.npm.taobao.org
   npm config get registry
   npm config delete registry
   npm [config] list [-g] [<pkg>...]
   npm view [<@scope>/]<pkg>[@<version>]
   npm search [search terms ...]
   npm i [<@scope>/]<name>
   npm i -P|-D|-S
   npm un [<@scope>/]<pkg>[@<version>]
   npm update [-g] [<pkg>...]
   npm outdated [[<@scope>/]<pkg> ...]
   npm run command

   npm home <pkg>//打开 xxx 包的主页
   ```

> install path
>
> C:\Users\xxx\AppData\Roaming\npm\node_modules

### 5. [see package.json](https://docs.npmjs.com/files/package.json)

### 6. example

   > http-example.js
   >
   > mock-event-emitter.js
   >
   > read-file
   >
   > read-file-sync.js

### 7. module

      1. 单次加载 (modules/firstmodule.js)
      2. 导出对象 (modules/hello.js)
      3. 一个文件就是一个模块
      4. 相对`require(./x.js)` ,绝对`require(/x/y/z.js)`,`require(x.js)`  加载核心模块
      5. 加载机制顺序`require('./x')`不加扩展名字 -> .js > .json > .node
      6. `module.exports === exports`,`require`进来的其实就是`module.exports,不要切断`module.exports`和`exports`之间的关系
      7. `__filename` and `__dirname`(都是当前模块解析过后的绝对路径)

### 8. package

   >包在模块基础上更进一步抽象，NodeJS包类似于Java类库，它将某个独立功能封装起来，用于发布、更新、依赖管理、版本控制。NodeJS根据CommonJS规范实现了包机制，通过npm来解决包的发布和获取需求。
   >
   >NodeJS包是一个目录，其中包含一个说明文件`package.json`，严格符合CommonJS规范的包应具备这些特征：package.json必须放在包的根目录、二进制文件保存在bin目录、JavaScript代码保存在lib目录、文档放置在doc目录、单元测试保存在test目录。

### 9. build-in module

      1. `Global`

      2. **Buffer**

      1. 专门存储/操作二进制数据流(TPC/图像/文件/网络),js数组不行,数组效率也不行
      2. 直接使用不需要引入
      3. buffer中存储的数据都是二进制,但是显示是16进制
      4. buffer中每一个元素占用1个字节 1byte = 8bit
      5. buffer中每一个元素范围00-ff    0-255
      6. buffer大小一旦确定,不能修改,实际上是对内存的直接操作
      7. some API
         - `buf.write(string[, offset[, length]][, encoding])`

         - `buf.toString([encoding[, start[, end]]])`

         - `buf.toJSON()`

         - `buf.slice([start[, end]])`

         - `buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])`

         - `Buffer.concat(list[, totalLength])`

         - `Buffer.isEncoding(encoding)`

         - `Buffer.isBuffer(obj)`

         - `Buffer.byteLength(string[, encoding])` 字符串长度 / 字节长度

      3. **Stream**
        - data/readable/end/close/error
        - pause() / resume()
        - readable / writable / duplex / transform  ---> pipe()
      4. Net
      5. assert

      6. **url**
        - `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`
        - url.format()
        - url.resolve()

      7. **path**`join()、resolve()、parse()`

      8. crypto

      9. **querystring**
        - querystring.stringify({name:'jack',age:33})
        - querystring.parse('name=jack&age=33')
        - querystring.escape('<哈哈>')
        - querystring.unescape('%3C%E5%93%88%E5%93%88%3E')

      10. Process 
   ```javascript
// process.js
const {argv, execPath, env} = process
argv.forEach((val, index) => {
    console.log(`${index}: ${val}`)
})
console.log(execPath)
console.log(env)
console.log(process.cwd())
   ```

   11. **Console**

   12. **Util**`inherits()、inspect()、isXXX()`

   13. **Events**

       ​    Event Emitter 的实例方法

       - `EventEmitter.on(event, listener)/emitter.addListener(eventName, listener)`：为指定事件注册监听器，接受1个字符串事件名event和1个回调函数listener
       - `EventEmitter.emit(event,[arg1],[arg2],[...])`：发射event事件，传递若干可选参数到事件监听器的参数列表。
       - `EventEmitter.once(event, listener)`：为指定事件注册1个单次监听器，即该监听器最多只会触发一次，触发后立刻解
       - `EventEmitter.removeListener(event, listener)`：移除指定事件的某个监听器，listener必须是该事件已经注册过的监听器
       - `EventEmitter.removeAllListeners([event])`：移除所有事件的所有监听器，如果指定event，则移除指定事件的所有监听器
       - `emitter.listenerCount(eventName)`

   14. **File System** (一般同步异步两个版本)

       1.  简单文件读写
       2.  流式文件读写(大文件)`fs.createWriteStream()`
          ```javascript
          let ws = fs.createWriteStream('xxx')
          ws.once('open', function() {
       
          })
          ws.once('close', function() {
       
          })
          ws.write('xxxxxxxxxxxxxxxx')
          //ws.close()
          ws.end()
          ```
       3.  pipe  `rs.pipe(ws)`
       4.  some API
           - fs.open(path, flags[, mode], callback)
           - fs.read(fd, buffer, offset, length, position, callback)
           - fs.write(fd, buffer[, offset[, length[, position]]], callback)
           - fs.write(fd, string[, position[, encoding]], callback)
           - fs.close(fd, callback)
           - fs.existsSync(path)
           - fs.stat(path, callback)
           - fs.unlink(path, callback)
           - fs.readdir(path)
           - fs.truncate(path, len, callback)
           - fs.mkdir(path)
           - fs.rmdir(path)
           - fs.rename(oldPath, newPath, callback)
           - fs.watchFile(filename[, options][, listener])
           - fs.appendFile(file, data[, options], callback)


      15. **Http**

          1. `http.Server`的事件 (request、connection、close)
          2. `http.serverRequest `   `http.IncomingMessage`的一个实例
              - `httpVersion`
              - `headers`
              - `url`
              - `method`
          3. `http.ServerResponse`
             - `response.setHeader(name, value)`
             - `response.writeHead(statusCode,[headers])`：向请求的客户端发送响应头。`statusCode`是HTTP状态码，`headers`对象表示响应头的每个属性。该函数在1个请求内最多只能调用1次，如果不显式调用，则会自动生成一个响应头
             - `response.write(data, [encoding])`：向请求的客户端发送响应内容。`data`是`Buffer`或字符串，表示要发送的内容。如果`data`是字符串，那么需要通过`encoding`说明其编码方式(默认是utf-8)。在`response.end()`调用之前，`response.write()`可以被多次调用
             - `response.end([data],[encoding])`：结束响应，告知客户端全部响应已经完成。当所有响应内容发送完毕后，该函数必须被调用1次。接受2个可选参数，意义与`response.write()`相同。如果不调用该函数，客户端将永远处于等待状态
          4. 根据path模拟router -> 结合fs分离html
          5. 处理get或post method
          6. http.get() / http.request()

### 10. 模块加载机制

   1. NodeJS模块分为是**核心模块**、**文件模块**：

      - **核心模块**：NodeJS标准API提供的模块（例如`fs、http、net、vm`等），可以直接通过require 直接获取，例如require(‘fs’)。核心模块拥有最高的加载优先级，即如果有模块与其命名冲突，NodeJS总会优先加载核心模块
      - **文件模块**：存储为单独文件或文件夹的模块（*JavaScript代码、JSON、编译的C/C++代码*）。文件模块的加载方法复杂但是灵活，尤其是与npm结合使用时。在不显式指定文件模块扩展名时，NodeJS会试图按**不带扩展名、`.js`、`.json`、`.node`扩展名**顺序进行加载

   2. 文件模块加载方式
      1. **按路径加载(相对或绝对)**：如果require参数以/开头，就以绝对路径方式查找，例如`require(‘/hank/uinika’)`将会按优先级依次尝试加载/hank/uinika.js、uinika.json、uinika.node。 如果以./或../开头，则以相对路径方式查找，例如`require(‘./uinika’)`用来加载相同文件夹下的uinika.js

          > 千万不要写成`require('xxx.js')`, 其意思是加载核心模块

      2. **查找node_modules加载**：如果`require()`函数参数不以`/、./、../`开头，该模块又不是核心模块，那么需要通过查找`node_modules`加载模块（*npm获取的包就是以这种方式加载*）。 例如`node_modules`目录之外的`app.js`可以直接使用`require('express')`代替`require('./node_modules/express')`。 当`require()`遇到一个既非核心模块，又不以路径表示的模块时，会试图在当前目录下的`node_modules`当中进行查找。如果没有找到，则会进入上一层目录的`node_modules`继续查找，直至遇到根目录

   3. NodeJS模块不会被重复加载，因为NodeJS通过文件名缓存所有加载过的文件模块，再次访问时将不会重复加载

### 11. 循环中回调函数的陷阱

    > trap.js

### 12. timer 异步

    > timer.js

### 13. NodeJS的瓶颈

1. 计算密集型程序
    NodeJS不善于处理计算密集型应用，当事件回调函数需要进行复杂运算，那么事件循环中所有请求都要等待计算完成之后才能响应。解决这个问题，需要将复杂运算拆解成若干逻辑，但这样又会提高代码的复杂度。
2. 单用户多任务型应用
    单用户多任务的情况下，需要进程之间相互协作，NodeJS当中处理类似场景不方便。NodeJS多进程往往是在执行同一任务，通过多进程来利用多核处理器资源，但当遇到多进程需要相互协作的时候，就显得捉襟见肘。
3. 逻辑复杂的事务
    NodeJS的控制流被一个个事件拆散，是非线性的，但是人类思维是线性的，这样容易造成开发复杂度的提高。NodeJS更善于处理逻辑简单但访问频繁的任务，而不适合完成逻辑十分复杂的工作。

### 14. debug
1. vs-code
2. `iron-node`
3. `supervisor`
4. `node --inspect index.js`，点击chrome绿色node icon进入调试状态