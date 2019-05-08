### 1.get started

```
mkdir xxxxxx
cd xxxxxx
npm init -y
npm i express
node index.js
```

### 2.[express-generator](https://www.npmjs.com/package/express-generator)

1 `express --git ./express-demo && cd ./express-demo`
2 `npm i`
3 `npm start`

> - bin, 存放启动项目的脚本文件
>
>    - node_modules, 存放所有的项目依赖库
>    - public 静态文件(css,js,img)
>    - routes，路由文件(controller)
>    - views，页面模板
>    - package.json，项目依赖配置及开发者信息
>    - app.js，应用核心配置文件

4 debug `DEBUG=express:* node index.js`

### 3.middleware(core concept)

>简单说，中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。从本质上来说，一个 Express 应用就是在调用各种中间件
>
>每个中间件可以从App实例，接收三个参数，依次为request对象、response对象，和 web 应用中处于请求-响应循环流程中的中间件 ,一般被命名为 next 的变量 。每个中间件都可以对HTTP请求（request对象）进行加工，并且决定是否调用next方法，将request对象再传给下一个中间件。
>
>- 执行任何代码
>- 修改请求和响应对象
>- 终结请求-响应循环
>- 调用堆栈中的下一个中间件

#### 1 应用级中间件（绑定到 [app 对象](http://www.expressjs.com.cn/4x/api.html#app) 使用 app.use() 和 app.METHOD()，METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写）

```javascript
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
// 注意中间件顺序注意中间件顺序注意中间件顺序
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});

//下面这个例子展示了在一个挂载点装载一组中间件
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

//作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});

//如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。 **注意**： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效
app.get('/user/:id', function (req, res, next) {
  if (req.params.id == 0) next('route');
  else next();
}, function (req, res, next) {
   res.render('regular');
});

app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```
#### 2 路由级中间件(绑定的对象为 express.Router(), 路由级使用 router.use() 或 router.METHOD() 加载)

```javascript
  var app = express();
   var router = express.Router();

   // 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
   router.use(function (req, res, next) {
       console.log('Time:', Date.now());
       next();
   });

   // 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
   router.use('/user/:id', function (req, res, next) {
       console.log('Request URL:', req.originalUrl);
       next();
   }, function (req, res, next) {
       console.log('Request Type:', req.method);
       next();
   });

   // 一个中间件栈，处理指向 /user/:id 的 GET 请求
   router.get('/user/:id', function (req, res, next) {
       // 如果 user id 为 0, 跳到下一个路由
       if (req.params.id == 0) next('route');
       // 负责将控制权交给栈中下一个中间件
       else next();
   }, function (req, res, next) {
       // 渲染常规页面
       res.render('regular');
   });
   // 处理 /user/:id， 渲染一个特殊页面
   router.get('/user/:id', function (req, res, next) {
       console.log(req.params.id);
       res.render('special');
   });
   // 将路由挂载至应用
   app.use('/', router);
```

#### 3 错误处理中间件

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

#### 4 内置中间件

```javascript
// express.static
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

// 每个应用可有多个静态目录
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

#### 5 [常用第三方中间件](http://expressjs.com/en/resources/middleware.html)

- body-parser
- compression
- serve-static
- session
- cookie-parser
- morgan
- express-session
- connect-mongo


### 4.Router(core concept)

1. 路由路径

   ```javascript
   app.get('/', function (req, res) {
     res.send('root');
   });
   
   app.get('/example/a', function (req, res) {
     res.send('Hello from A!');
   });
   
   // 正则
   app.get('/ab?cd', function(req, res) {
     res.send('ab?cd');
   });
   
   // 正则
   app.get('/ab(cd)?e', function(req, res) {
    res.send('ab(cd)?e');
   });
   
   // 正则
   app.get('/user/*man', function(req, res) {
    res.send('ab(cd)?e');
   });
   
   //使用多个回调函数处理路由
   app.get('/example/b', function (req, res, next) {
     console.log('response will be sent by the next function ...');
     next();
   }, function (req, res) {
     res.send('Hello from B!');
   });
   
   //使用回调函数数组处理路由
   var cb0 = function (req, res, next) {
     console.log('CB0');
     next();
   }
   
   var cb1 = function (req, res, next) {
     console.log('CB1');
     next();
   }
   
   app.get('/example/c', [cb0, cb1]);
   
   // 混合使用函数和函数数组处理路由
   var cb0 = function (req, res, next) {
     console.log('CB0');
     next();
   }
   
   var cb1 = function (req, res, next) {
     console.log('CB1');
     next();
   }
   
   app.get('/example/d', [cb0, cb1], function (req, res, next) {
     console.log('response will be sent by the next function ...');
     next();
   }, function (req, res) {
     res.send('Hello from D!');
   });
   ```

2. 响应方法

   | method             | description                                                  |
   | :----------------- | ------------------------------------------------------------ |
   | res.download()     | 提示下载文件                                                 |
   | res.jsonp()        | 发送一个支持 JSONP 的 JSON 格式的响应                        |
   | res.sendFile()     | 以八位字节流的形式发送文件  response.sendFile("/path/to/anime.mp4") |
   | res.sendStatus()   | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送   |
   | **res.json()**     | 发送一个 JSON 格式的响应                                     |
   | **res.redirect()** | 重定向请求   response.redirect("/hello/anime")     response.redirect("http://www.example.com")                                                     response.redirect(301, "http://www.example.com") |
   | **res.render()**   | 渲染视图模板                                                 |
   | **res.send()**     | 发送各种类型的响应                                           |
   | **res.end()**      | 终结响应处理流程                                             |

3. **express.Router()** 路由拆分

4. app.route()

   ```javascript
   app.route('/book')
     .get(function(req, res) {
       res.send('Get a random book');
     })
     .post(function(req, res) {
       res.send('Add a book');
     })
     .put(function(req, res) {
       res.send('Update the book');
     });
   ```

### 5.views(core concept)

#### 1 选择template engine策略

- 支持模版继承(extend)
- 支持模版扩展(block)
- 支持模版组合(include)
- 支持预编译

#### 2 `npm install --save xxxxx`

#### 3 use

```javascript
app.set('views', './views')
app.set('view engine', 'pug')
```

#### 4 static views

#### 5 dync views

### 8.Express some API

1. app.use([path], middleware)  //use是express注册中间件的方法

   ```javascript
   app.use("/home", function(request, response, next) {
     response.writeHead(200, { "Content-Type": "text/plain" });
     response.end("Welcome to the homepage!\n");
   });
   ```

2. 中间件顺序很重要  处理错误需要在最后

3. 请求必须返回,通过end、send、render等结束

4. all方法和HTTP动词方法(get post put delete...)

5. 模式匹配

6. set

7. response
