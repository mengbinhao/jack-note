### 简介

1. CommonJS规范

2. 特点

   - 异步I/O
   - 事件驱动

3. node --help

4. npm --help

   ```n
   npm config set init.author.email "mengbinhao2018@gmail.com"
   npm config set init.author.name "jack"
   npm config set init.author.url "http://github.com/mengbinhao"
   npm config set init.license "MIT"
   npm config set init.version "0.0.1"
   
   npm init -y
   npm adduser
   npm whoami
   npm publish
   
   npm config list -l
   npm set xxx
   npm info xxx
   npm search xxx
   npm list [-g]
   npm i [-S|-D] xxx
   npm update xxx
   npm uninstall xxx
   npm run command
   ```

5. example 

   >http-example.js  mock-event-emitter.js  read-file  read-file-sync.js

6. module

   1. 单次加载 (modules/fiestmodule.js)
   2. 导出对象 (modules/hello.js)

7. package

   >包在模块基础上更进一步抽象，NodeJS包类似于Java类库，它将某个独立功能封装起来，用于发布、更新、依赖管理、版本控制。NodeJS根据CommonJS规范实现了包机制，通过npm来解决包的发布和获取需求。
   >
   >NodeJS包是一个目录，其中包含一个说明文件`package.json`，严格符合CommonJS规范的包应具备这些特征：package.json必须放在包的根目录、二进制文件保存在bin目录、JavaScript代码保存在lib目录、文档放置在doc目录、单元测试保存在test目录。

8. build-in module

   1. Global

   2. Buffer

   3. assert

   4. url  (resolve())

   5. path   (join()   resolve()  parse())

   6. crypto

   7. querystring

   8. Process  (global.process.argv)

   9. Console

   10. Util     (inherits   inspect)

   11. Events    

       ​    Event Emitter 的实例方法

       - `EventEmitter.on(event, listener)`：为指定事件注册监听器，接受1个字符串事件名event和1个回调函数listener
       - `EventEmitter.emit(event,[arg1],[arg2],[...])`：发射event事件，传递若干可选参数到事件监听器的参数列表。
       - `EventEmitter.once(event, listener)`：为指定事件注册1个单次监听器，即该监听器最多只会触发一次，触发后立刻解 
       - `EventEmitter.removeListener(event, listener)`：移除指定事件的某个监听器，listener必须是该事件已经注册过的监听器。
       - `EventEmitter.removeAllListeners([event])`：移除所有事件的所有监听器，如果指定event，则移除指定事件的所有监听器。

   12. File System (readFileSync() readFile()  open() read())

   13. Http

       1. http.Server的事件 (request  connection  close)
       2. http.serverRequest
       3. http.ServerResponse 
          - `response.writeHead(statusCode,[headers])`：向请求的客户端发送响应头。`statusCode`是HTTP状态码，`headers`对象表示响应头的每个属性。该函数在1个请求内最多只能调用`次，如果不显式调用，则会自动生成一个响应头。
          - `response.write(data, [encoding])`：向请求的客户端发送响应内容。`data`是`Buffer`或字符串，表示要发送的内容。如果`data`是字符串，那么需要通过`encoding`说明其编码方式(默认是utf-8)。在`response.end()`调用之前，`response.write()`可以被多次调用。
          - `response.end([data],[encoding])`：结束响应，告知客户端全部响应已经完成。当所有响应内容发送完毕后，该函数必须被调用1次。接受2个可选参数，意义与`response.write()`相同。如果不调用该函数，客户端将永远处于等待状态。

9. 模块加载机制

   1. NodeJS模块分为是**核心模块**、**文件模块**：

      - **核心模块**：NodeJS标准API提供的模块（例如fs、http、net、vm等），可以直接通过require 直接获取，例如require(‘fs’)。核心模块拥有最高的加载优先级，即如果有模块与其命名冲突，NodeJS总会优先加载核心模块。
      - **文件模块**：存储为单独文件或文件夹的模块（*JavaScript代码、JSON、编译的C/C++代码*）。文件模块的加载方法复杂但是灵活，尤其是与npm结合使用时。在不显式指定文件模块扩展名时，NodeJS会试图按顺序加上`.js`、`.json`、`.node`扩展名。
   2. 文件模块加载方式
      1. **按路径加载**：如果require参数以/开头，就以绝对路径方式查找，例如require(‘/hank/uinika’)将会按优先级依次尝试加载/hank/uinika.js、uinika.json、uinika.node。 如果以./或../开头，则以相对路径方式查找，例如require(‘./uinika’)用来加载相同文件夹下的uinika.js。 
      2. **查找node_modules加载**：如果`require()`函数参数不以`/、./、../`开头，该模块又不是核心模块，那么需要通过查找`node_modules`加载模块（*npm获取的包就是以这种方式加载*）。 例如`node_modules`目录之外的`app.js`可以直接使用`require('express')`代替`require('./node_modules/express')`。 当`require()`遇到一个既非核心模块，又不以路径表示的模块时，会试图在当前目录下的`node_modules`当中进行查找。如果没有找到，则会进入上一层目录的`node_modules`继续查找，直至遇到根目录。 
   3. NodeJS模块不会被重复加载，因为NodeJS通过文件名缓存所有加载过的文件模块，再次访问时将不会重复加载。 

10. 循环中回调函数的陷阱

    >trap.js

11. NodeJS的瓶颈

    1. 计算密集型程序

       NodeJS不善于处理计算密集型应用，当事件回调函数需要进行复杂运算，那么事件循环中所有请求都要等待计算完成之后才能响应。解决这个问题，需要将复杂运算拆解成若干逻辑，但这样又会提高代码的复杂度。

    2. 单用户多任务型应用

       单用户多任务的情况下，需要进程之间相互协作，NodeJS当中处理类似场景不方便。NodeJS多进程往往是在执行同一任务，通过多进程来利用多核处理器资源，但当遇到多进程需要相互协作的时候，就显得捉襟见肘。

    3. 逻辑复杂的事务

       NodeJS的控制流被一个个事件拆散，是非线性的，但是人类思维是线性的，这样容易造成开发复杂度的提高。NodeJS更善于处理逻辑简单但访问频繁的任务，而不适合完成逻辑十分复杂的工作。