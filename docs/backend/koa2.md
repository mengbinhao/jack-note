### 1.get started

```javascript
npm init -y
npm i koa

const Koa = require('koa')
const app = new Koa()

app.use( async (ctx, next) => {
  ctx.body = 'hello koa2'
}).listen(3000, () => {
  console.log('server is starting at port 3000')
})

node index.js
```

#### ctx
ctx作为上下文使用，Koa将node的request, response对象封装进一个单独对象。即ctx.request 、 ctx.response。Koa内部又对一些常用的属性或者方法做了代理操作，使得我们可以直接通过ctx获取。比如，ctx.request.url 可以写成ctx.url

除此之外，Koa还约定了一个中间件的存储空间ctx.state。通过state可以存储一些数据，比如用户数据，版本信息等。如果你使用webpack打包的话，可以使用中间件，将加载资源的方法作为ctx.state的属性传入到view层，方便获取资源路径

#### next
next 参数的作用是将处理的控制权转交给下一个中间件

```javascript
//try remove await next() behind console.log('222, 然后doSomething') to see what happens 
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next)=>{
  let startTime = new Date().getTime()
  await next()
  let endTime = new Date().getTime()
  console.log(`此次的响应时间为：${endTime - startTime}ms`)
})

app.use(async (ctx, next) => {
  console.log('111, 然后doSomething')
  await next()
  console.log('111 end')
})

app.use(async (ctx, next) => {
  console.log('222, 然后doSomething')
  await next()
  console.log('222 end')
})

app.use(async (ctx, next) => {
  console.log('333, 然后doSomething')
  await next()
  console.log('333 end')
})

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})
```
### 2.koa2特性

- 只提供封装好http上下文、请求、响应，以及基于`async/await`的中间件容器。

- 利用ES7的`async/await`的来处理传统回调嵌套问题和代替koa@1的generator，但是需要在node.js 7.x的harmony模式下才能支持`async/await`。

- 中间件只支持 `async/await` 封装的，如果要使用koa@1基于generator中间件，需要通过中间件koa-convert封装一下才能使用。


## koa2中间件开发(顺序很重要)

```javascript
/* ./middleware/logger-async.js */

function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next()
  }
}

//app.js
const Koa = require('koa') // koa v2
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('server is starting at port 3000')
```


### 3.路由

```javascript
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})
```

koa-router也支持嵌套写法，通过一个总路由装载所有子路由，也非常的方便。
```javascript
onst Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

// 子路由1
let oneRouter = new Router()

oneRouter.get('/', async (ctx, next) => {
  ctx.body = '你好，我这里是oneRouter页'
})

// 子路由2
let twoRouter = new Router()

twoRouter.get('/', async (ctx, next) => {
  ctx.body = '你好, 我这里是twoRouter页'
}).get('/home', async (ctx , next) => {
  ctx.body = '你好, 我这里是home页'
})

// 装载所有子路由
let indexRouter = new Router()

indexRouter.use('/one',oneRouter.routes(), oneRouter.allowedMethods())
indexRouter.use('/two',twoRouter.routes(), twoRouter.allowedMethods())

app
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})
```

### 4.请求数据获取

1. get

   1. 从上下文中直接获取
      - 请求对象ctx.query，返回如 { a:1, b:2 }
      - 请求字符串 ctx.querystring，返回如 a=1&b=2
   2. 从上下文的request对象中获取
      - 请求对象ctx.request.query，返回如 { a:1, b:2 }
      - 请求字符串 ctx.request.querystring，返回如 a=1&b=2

   ```javascript
   const Koa = require('koa')
   const app = new Koa()
   app.use(async (ctx) => {
       let url = ctx.url
       // 从上下文的request对象中获取
       let request = ctx.request
       let req_query = request.query
       let req_querystring = request.querystring
       // 从上下文中直接获取
       let ctx_query = ctx.query
       let ctx_querystring = ctx.querystring
       ctx.body = {
           url,
           req_query,
           req_querystring,
           ctx_query,
           ctx_querystring
       }
   })
   app.listen(3000, () => {
       console.log('[demo] request get is starting at port 3000')
   })
   ```

  ```javascript
  router.get('/data/:id', async (ctx, next) => {

    // 也从ctx中拿到我们想要的数据，不过使用的是params对象
    let data = ctx.params

    ctx.body = data
  })
  ```

2. post

    ```javascript
    const Koa = require('koa')
    const app = new Koa()

    app.use( async ( ctx ) => {

      if ( ctx.url === '/' && ctx.method === 'GET' ) {
        // 当GET请求时候返回表单页面
        let html = `
          <h1>koa2 request post demo</h1>
          <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
          </form>
        `
        ctx.body = html
      } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
        // 当POST请求的时候，解析POST表单里的数据，并显示出来
        let postData = await parsePostData( ctx )
        ctx.body = postData
      } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
      }
    })

    // 解析上下文里node原生请求的POST参数
    function parsePostData( ctx ) {
      return new Promise((resolve, reject) => {
        try {
          let postdata = "";
          ctx.req.addListener('data', (data) => {
            postdata += data
          })
          ctx.req.addListener("end",function(){
            let parseData = parseQueryStr( postdata )
            resolve( parseData )
          })
        } catch ( err ) {
          reject(err)
        }
      })
    }

    // 将POST请求参数字符串解析成JSON
    function parseQueryStr( queryStr ) {
      let queryData = {}
      let queryStrList = queryStr.split('&')
      console.log( queryStrList )
      for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
      }
      return queryData
    }

    app.listen(3000, () => {
      console.log('[demo] request post is starting at port 3000')
    })
    ```

3. koa-bodyparser

    ```javascript
    const Koa = require('koa')
    const app = new Koa()
    const bodyParser = require('koa-bodyparser')

    // 使用ctx.body解析中间件
    app.use(bodyParser())

    app.use( async ( ctx ) => {

      if ( ctx.url === '/' && ctx.method === 'GET' ) {
        // 当GET请求时候返回表单页面
        let html = `
          <h1>koa2 request post demo</h1>
          <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
          </form>
        `
        ctx.body = html
      } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.request.body
        ctx.body = postData
      } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
      }
    })

    app.listen(3000, () => {
      console.log('[demo] request post is starting at port 3000')
    })
    ```

### 5.koa-static

```javascript
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(static(path.join(__dirname, staticPath)))
app.use(async (ctx) => {
    ctx.body = 'hello world'
})
app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
})
```

### 6.cache
koa操作cookie是非常方便的，也是从上下文ctx中获取。

- ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
- ctx.cookies.set(name, value, [options]) 在上下文中写入cookie

```javascript
router.post('/post/result', async (ctx, next) => {
  // 我们可以从ctx的request.body拿到提交上来的数据
  let {name, num} = ctx.request.body

  if (name && num) {
    ctx.body = `hello，你最像的明星是:${name},ch你知道的车牌号是:${num}`
    ctx.cookies.set(
      'xunleiCode',num,
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/post/result',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2018-09-17'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
  } else {
    ctx.body = '啊哦~你填写的信息有误'
  }

})
```

### 7.cookie/session

```javascript
const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

// 配置存储session信息的mysql
let store = new MysqlSession({
  user: 'root',
  password: 'abc123',
  database: 'koa_demo',
  host: '127.0.0.1',
})

// 存放sessionId的cookie配置
let cookie = {
  maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  overwrite: true,  //是否可以overwrite    (默认default true)
  secure: '',
  sameSite: '',
  signed: true,  //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false  //(boolean) renew session when session is nearly expired,
}

// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

app.use( async ( ctx ) => {

  // 设置session
  if ( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {

    // 读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  }

})

app.listen(3000)
console.log('[demo] session is starting at port 3000')
```

### 8.view

```javascript
//index.js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000)
```



```ejs
<!--./view/index.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
```

### 9.upload
### 10.integrated with DB
### 11.jsonp
### 12.test

