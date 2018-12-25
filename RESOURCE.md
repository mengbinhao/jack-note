### front framework
- vue
- vuex
- vue-router
- nuxt.js   ssr
- react


### back framework
- [Express](https://www.npmjs.com/package/express)
  - 如果您想为 API、网站或单页应用程序使用轻量级 web 框架，请使用它
  - 您不介意使用回调作为默认的异步处理方式
  - 使用该框架的模块生态极为繁荣
  - 您需要一个支持和故障排除的大型社区
- [Koa](https://www.npmjs.com/package/koa)
  - 当您想要一个比 Express 更简洁的框架时使用
  - Koa 更像是一个中间件层，它不提供模板或开箱即用的路由，因此更适合 API 开发
  - 要想支持开箱即用，您需要 async / await
- [Hapi](https://www.npmjs.com/package/hapi)
  - 如果您想要一个比 Express 或 Koa 更“自带电池”(译者注:原文"batteries"意为您不必重复造轮子，大多数您需要的功能都能通过（已有）库完成。您能导入并使用它们。)的框架，但又不像 Sails 那么多，那就使用它
- [Sails](https://www.npmjs.com/package/sails)
  - 当您需要像 Rails 这样的东西时，请使用它，它具有几乎所有功能(但是根据您的应用程序可能不需要那么多)


### Validation(前端验证)
- [Ajv](https://www.npmjs.com/package/ajv)
  - 在需要验证 JSON 时使用(比如来自 web 请求)
  - 您希望与应用程序的其他非 JS 部分共享这些验证规则(因为它是 JSON，所以您可以这样做)
- [Joi](https://www.npmjs.com/package/joi)
  - 在需要验证输入时使用，并且喜欢链式调用的风格(译者注:代码见下方),而不是在 JSON 中定义验证规则
  - 您正在使用 Hapi（Hapi 自带 Joi）
  ```javascript
  const schema = joi.object().keys({
                    id: joi.string().guid().required(),
                    username: joi.string().alphanum().min(8).required()
                });
  ```


### Authentication (身份认证)
- [Passport](https://www.npmjs.com/package/passport)
  - 当您需要为您的网站或 API 使用身份验证中间件时使用
  - 您希望能够在多种身份验证类型（Oauth，Facebook 等）之间进行选择
  - 您需要管理会话


### Asynchronous (异步)
- [Async (library)](https://www.npmjs.com/package/async)
  - 当您需要使用旧版本的 Node，而该版本的 Node 支持只支持回调而不支持 Promises 时
- ES6原生promises(原生 JS, 非 npm)
  - 在使用大于 0.12 的 Node 版本时使用
- async / await(原生 JS，非 npm)
  - 当您为了逃脱“回调地狱”却又误闯“Promise 地狱”
  - 您有很多来自 Promises 的 .then 和 .catch


### Database
- [mysql](https://www.npmjs.com/package/mysql)
- [node-postgres](https://node-postgres.com/)
  - 当您不需要完整的 ORM，而是需要使用原始 SQL 查询数据库时使用(这些是驱动程序)
- [node-mongodb-native](https://github.com/mongodb/node-mongodb-native)
  - 当您不需要一个完整的 ORM，而是要直接查询 MongoDB 时使用
- [Mongoose](https://www.npmjs.com/package/mongoose)
  - 当您希望为 MongoDB 使用 ORM 时使用
- [Knex](https://www.npmjs.com/package/knex)
  - 当您不需要一个完整的 ORM 解决方案，而只是需要一些工具使编写查询代码更容易，可以使用它
  - Knex 是一个生成 SQL 的查询生成器
  - 您拥有 Postgres、MSSQL、MySQL、MariaDB、SQLite3、Oracle 或 Amazon Redshift 数据库
- [Objection.js](https://www.npmjs.com/package/objection)
  - 您希望 ORM 支持 Knex 支持的所有东西，不使用查询 DSL(因此您编写的代码更接近原始 SQL)，具有基于 Promise 的 API 和良好的文档


### API documentation
- [Swagger-node](https://github.com/swagger-api/swagger-node)
  - 当您需要记录 REST API 并能够针对端点测试请求时使用


### bundle scripts
- rollup -g  package small js to one
- webpack
- parcel
- babel
- Browserify
- Grunt
- Gulp
- Yeoman


### CSS
- sass
- less
- postcss


### test framework
- [Mocha](https://www.npmjs.com/package/mocha)
  - 在需要编写和运行单元测试时使用
- [Chai](https://www.npmjs.com/package/chai)
  - 当您需要证明您的单元测试中的断言时
  - 注意：这将与 Mocha 一起使用
- [Chai-as-promised](https://www.npmjs.com/package/chai-as-promised)
  - 当您希望在promises上证明您的断言时，而不是将断言放在then或catch中使用
- [Sinon](https://www.npmjs.com/package/sinon)
  - 当您需要用于测试的 mock 库时使用
- Karma
- Mock
- Jest
- Jasmine


### UI component
- buefy
- bulma  纯CSS
- iview：一套基于 Vue.js 的高质量 UI 组件库（PC端）
- iView Admin：搭配使用iView UI组件库形成的一套后台集成解决方案（PC端）
- Element UI：一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库（PC端）
- Vue Antd：Ant Design 的 Vue 实现，开发和服务于企业级后台产品（PC端）
- VueStrap：一款 Bootstrap 风格的 Vue UI 库（PC端）
- Mint UI：由饿了么前端开发的基于 Vue.js 的移动端组件库（移动端）
- Vonic：一个基于 vue.js 和 ionic 样式的 UI 框架，用于快速构建移动端单页应用（移动端）
- Vant：轻量、可靠的移动端 Vue 组件库（移动端）
- Cube UI：基于 Vue.js 实现的精致移动端组件库（移动端）


### Logging
- [Winston](https://www.npmjs.com/package/winston)
  - 当您需要一个日志库并需要不同的日志输出格式时使用
- [Bunyan](https://www.npmjs.com/package/bunyan)
  - 当您需要一个日志库,并以JSON作为唯一日志输出格式时使用
  - 您希望为不同的组件、请求或函数使用不同的日志记录器(也就是说，这些日志记录器可能以不同的方式解析事件)
- [Morgan](https://www.npmjs.com/package/morgan)
  - 当您使用Express并且想要记录HTTP请求时使用
  - 注意：这将与Winston或Bunyan一起使用。由于它是中间件，它知道如何处理请求并记录它，但不处理Winston和Bunyan所做的日志输出的传输


### Templating(前端模板)
- [Pug (原 Jade)](https://www.npmjs.com/package/pug)
  - 当您需要服务器端模板引擎时，请使用该引擎，该引擎易于阅读，并且支持开箱即用的子组件代码块。 您只需要输出 HTML
- [EJS](https://www.npmjs.com/package/ejs)
  - 当您需要一个服务器端模板引擎，该引擎完全使用 JS，并且允许空格缩进(Pug 不允许)
  - 注意：不支持异步 JS 函数


### 通用函数库
- [microjs](http://microjs.com/#)
- [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code)
- [awesome-javascript](https://github.com/sorrycc/awesome-javascript)
- [Lodash](https://www.npmjs.com/package/lodash)
  - 当您需要JS实用程序库时使用
  - 您使用了大量的 OOP(面向对象编程)
- [Ramda](https://www.npmjs.com/package/ramda)
  - 当您希望使用函数式的编程风格时
  - 您想要像 lodash 这样的东西，但是在函数式编程范式中
- [underscorejs](https://underscorejs.org/#toArray)
- [lazy.js](https://github.com/dtao/lazy.js)
- [collect.js](https://github.com/ecrmnn/collect.js)
    > Convenient and dependency free wrapper for working with arrays and objects
- [voca](https://github.com/panzerdp/voca)
    > string library
- [mout](http://moutjs.com/)
    > utilities
- [outils](https://www.npmjs.com/package/outils)
    > 日期格式化、url参数转对象、浏览器类型判断、节流函数等常用函数
- [Chance](http://chancejs.com/)
    > random thing
- [mathjs](https://github.com/josdejong/mathjs)
- [Moment.js](https://www.npmjs.com/package/moment)
  - 在需要解析、验证、操作和显示日期/时间时使用
- [UUID](https://www.npmjs.com/package/uuid)
  - 当您需要随机的、唯一的、难以破解的 id 时使用
- [NVM](https://github.com/creationix/nvm)
  - 当您希望能够在环境中安装的多个 Node 版本之间切换时使用
- [day.js](https://github.com/iamkun/dayjs)
- [Sugar](https://github.com/andrewplummer/Sugar)
- [polished](https://polished.js.org/)
    > A lightweight toolset for writing styles in JavaScript
- [bluebird](https://github.com/petkaantonov/bluebird)
- [async](https://github.com/caolan/async)
- [es5-shim](https://github.com/es-shims/es5-shim)
- [handlebars](https://github.com/wycats/handlebars.js)
- [immer.js实战讲解](https://segmentfault.com/a/1190000017270785)
- [Fs-extra](https://www.npmjs.com/package/fs-extra)
  - 当您需要能够递归地使用mkdir、rm-rf和Node中缺少的其他文件系统级功能时
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
  - 当您需要从Node发送电子邮件时使用
- [Dotenv](https://www.npmjs.com/package/dotenv)
  - 当您需要将`.env`文件中的环境变量加载到`process.env`时使用
- fabric.js


### 前端存储
- [ustbhuangyi/storage](https://github.com/ustbhuangyi/storage)
- [store.js](https://github.com/marcuswestin/store.js/)


### 数据 Mock
- [Mock.js](http://mockjs.com/)
    > 生成随机数据，拦截 Ajax 请求
- [json-server](https://github.com/typicode/json-server)
- [http-server](https://github.com/indexzero/http-server)


### 动画库
- [Animate.css](https://daneden.github.io/animate.css/)
- [animejs](http://animejs.com/)
- [Hover.css](http://ianlunn.github.io/Hover/)
- [wow.js](https://wowjs.uk/)
- [Magic.css](https://github.com/miniMAC/magic)
- [Waves](http://fian.my.id/Waves/)
- [move.js](https://github.com/visionmedia/move.js)
- [impress.js](http://www.webhek.com/post/impress-js.html)
- velocity.js
- particle.js  粒子效果
- hammer.js    手势


### 数据可视化
- [ECharts](https://ecomfe.github.io/echarts-doc/public/en/index.html)
- Chart.js、three.js、Dygraphs.js、D3.js、InfoVis、Springy.js
- vanilla-tilt.js 3D瓦片
- parallax 视差效果


### 时间选择器
- [layDate](https://aigodata.github.io/layDate/index.html)


### 图片懒加载
- [lozad](https://github.com/ApoorvSaxena/lozad.js)
- [lazyload](https://github.com/verlok/lazyload)

### 移动应用
- [phonegap](https://phonegap.com/getstarted/)


### other
- [fastclick](https://github.com/ftlabs/fastclick)
- [图片缩放](http://www.dowebok.com/demo/223/)


### 代码高亮
- [hightlight.js](https://highlightjs.org/)


### 滚动库
- [iscroll](https://github.com/cubiq/iscroll)
- [BetterScroll](https://github.com/ustbhuangyi/better-scroll)


### 轮播图
- [Swiper](http://idangero.us/swiper/)


### 输入提示
- [typeahead](https://twitter.github.io/typeahead.js/)

### 滚屏
- [fullpage](https://alvarotrigo.com/fullPage/)


### 弹出框
- [layer](http://layer.layui.com/)
- [Bootbox.js](http://bootboxjs.com/)


### 消息通知
- [PNotify](https://github.com/sciactive/pnotify)
- [Notyf](https://github.com/caroso1222/notyf)


### 表单验证
- [validator.js](https://github.com/ansman/validate.js)


### 拖拽
- [dragula](https://github.com/bevacqua/dragula)
- [Draggabilly](https://github.com/desandro/draggabilly)
- [draggable](https://shopify.github.io/draggable/)


### 文件上传
- [WebUploader](http://fex.baidu.com/webuploader/)
- fine-uploader


### 复制粘贴插件
- [clipboard.js](https://github.com/zenorocha/clipboard.js)


### 相册（图片滑动切换展示效果）
- [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)


### 颜色选择器
- Bootstrap Colorpicker


### 分页插件
- pagination


### 树插件
- zTree


### 导航插件
- okayNav


### 下拉框
- select2


### PDF 阅读器
- pdf.js


### 主题色提取
- RGBaster


### 前端国际化 i18n
- i18next
- vue-i18n


### 弹幕视频播放器
- DanmuPlayer


### 视频播放器
- Chimee
- flv.js
- Video.js


### 网页即时通讯
- LayIM
- 闲聊么


### 级联选择器


### 手机端事件


### 条形码插件


### 二维码插件


### 地图


### Process management
- [PM2](https://www.npmjs.com/package/pm2)
  - 当您希望进程管理器在服务崩溃时处理重新启动，并允许您控制集群时使用
  - 注意:PM2所依据的AGPL许可证存在一些潜在的违规行为
- [forever](https://www.npmjs.com/package/forever)
  - 当您需要进程管理器来处理在服务崩溃时重新启动服务时使用
  - 您的部署规模较小(pm2 及其集群支持用于更大规模的部署)。如果您只有少量的服务/进程，那么您可能可以使用它
- [nodemon](https://www.npmjs.com/package/nodemon)
  - 当您希望监视应用程序中的任何代码更改时使用，并在本地开发时自动重启服务器
  - 非常适合用于开发


### Web Sockets
- [Primus](https://www.npmjs.com/package/primus)
  - 当您需要 Web Sockets 但又不想被束缚在特定的 Web Sockets 实现时使用


### performance
- apache ab


### request
- [Request](https://www.npmjs.com/package/request)当您需要基于回调的 HTTP 请求时可选择它，例如从一个 REST 服务连接到另一个
- [Axios](https://www.npmjs.com/package/axios)当您需要基于 Promise的 HTTP 请求时可选择它


### CLI (命令行界面)
- [Commander](https://www.npmjs.com/package/commander)
  - 当您要构建一个 CLI 程序时使用，该程序将所有参数作为命令行上的标志
- [Inquirer](https://www.npmjs.com/package/inquirer)
  - 当您想要构建一个按顺序获取选项的“交互式”CLI 程序时使用(类似于运行 npm init 时的方式,它会询问您生成package.json文件的一系列问题)


### Tooling (开发工具)
- [ESdoc](https://www.npmjs.com/package/esdoc)
  - 当您想从您的代码中生成API文档，并且您正在使用最新的JS版本时
  - 默认情况下支持当前版本的JS(支持class)，因此如果在代码中使用prototypes，请使用JSdoc
- JSdoc(jsdoc)
  - 当您需要支持ES6的代码API文档生成器时使用
  - 支持classes和prototypes
