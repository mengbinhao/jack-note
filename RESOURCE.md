### front framework

- vue、vuex、vue-router
- nuxt.js(ssr)
- react、redux

### back framework

- [Express](https://www.npmjs.com/package/express)
  - 如果您想为 API、网站或单页应用程序使用轻量级 web 框架,请使用它
  - 您不介意使用回调作为默认的异步处理方式
  - 使用该框架的模块生态极为繁荣
  - 您需要一个支持和故障排除的大型社区
- [Koa](https://www.npmjs.com/package/koa)
  - 当您想要一个比 Express 更简洁的框架时使用
  - Koa 更像是一个中间件层,它不提供模板或开箱即用的路由,因此更适合 API 开发
  - 要想支持开箱即用,您需要 async / await
- Hapi
  - 你想要一个比 Express 或 Koa 有更多“部件”的框架时选它，但它集成的东西没 Sails 那么多
- Sails
  - 你想要像 Rails 之类的东西时就用它，它集成了一大堆东西（但其中有很多可能是你用不着的）

### Validation(前端验证)

- [vuelidate](https://github.com/vuelidate/vuelidate)
- [Ajv](https://www.npmjs.com/package/ajv)
  - 在需要验证JSON时使用(比如来自web请求)
  - 您希望与应用程序的其他非JS部分共享这些验证规则(因为它是JSON,所以您可以这样做)
- [Joi](https://www.npmjs.com/package/joi)
  - 在需要验证输入时使用,并且喜欢链式调用的风格,而不是在JSON中定义验证规则
  - 您正在使用Hapi(Hapi自带Joi)
  ```javascript
  const schema = joi.object().keys({
    id: joi
      .string()
      .guid()
      .required(),
    username: joi
      .string()
      .alphanum()
      .min(8)
      .required()
  })
  ```

### Authentication(身份认证)

- [Passport](https://www.npmjs.com/package/passport)
  - 当您需要为您的网站或API使用身份验证中间件时使用
  - 您希望能够在多种身份验证类型(Oauth,Facebook 等)之间进行选择
  - 您需要管理会话

### Asynchronous(异步)

- Async
  - 当您需要使用旧版本的Node,而该版本的Node支持只支持回调而不支持 Promises时
- ES6原生Promises
- async / await

### Database

- [mysql](https://www.npmjs.com/package/mysql) /[node-postgres](https://no de-postgres.com/)
  - 当您不需要完整的ORM,而是需要使用原始SQL查询数据库时使用(这些是驱动程序)
- [node-mongodb-native](https://github.com/mongodb/node-mongodb-native)
  - 当您不需要一个完整的ORM,而是要直接查询MongoDB时使用
- [Mongoose](https://www.npmjs.com/package/mongoose)
  - 当您希望为MongoDB使用ORM时使用
- [Knex](https://www.npmjs.com/package/knex)
  - 当您不需要一个完整的ORM解决方案,而只是需要一些工具使编写查询代码更容易,可以使用它
  - Knex是一个生成SQL的查询生成器
  - 您拥有Postgres、MSSQL、MySQL、MariaDB、SQLite3、Oracle 或 Amazon Redshift数据库
- [Objection.js](https://www.npmjs.com/package/objection)
  - 您希望ORM支持Knex支持的所有东西,不使用查询DSL(因此您编写的代码更接近原始SQL),具有基于Promise的API和良好的文档

### API documentation

- [Swagger-node](https://github.com/swagger-api/swagger-node)
  - 当您需要记录REST API并能够针对端点测试请求时使用

### bundle scripts

- [webpack](https://webpack.js.org/guides/getting-started/)
- rollup -g package small js to one
- parcel
- babel
- Browserify
- Grunt
- Gulp
- Yeoman

### CSS

- sass
- less
- stylus
- postcss

### test framework

- [Mocha](https://mochajs.org/)
  - 在需要编写和运行单元测试时使用
- [Chai](https://www.chaijs.com/)
  - 当您需要证明您的单元测试中的断言时
  - 注意:这将与 Mocha 一起使用
- [Chai-as-promised](https://www.npmjs.com/package/chai-as-promised)
  - 当您希望在Promises上证明您的断言时,而不是将断言放在then或catch中使用
- [Sinon](https://sinonjs.org/)
  - 当您需要用于测试的mock库时使用
- [Karma](http://karma-runner.github.io/latest/index.html)
- [Jest](https://jestjs.io/docs/en/getting-started.html)
- [vue-test-utils](https://vue-test-utils.vuejs.org/)
- istanbul test coverage
- Jasmine
- ava


### UI component

- buefy
- bulma 纯 CSS
- [iview](https://iviewui.com/docs/guide/install):一套基于 Vue.js 的高质量 UI 组件库(PC 端)
- iView Admin:搭配使用 iView UI 组件库形成的一套后台集成解决方案(PC 端)
- [Element UI](https://element.eleme.io/#/zh-CN/component/installation):一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库(PC 端)
- Vue Antd:Ant Design 的 Vue 实现,开发和服务于企业级后台产品(PC 端)
- VueStrap:一款 Bootstrap 风格的 Vue UI 库(PC 端)
- Mint UI:由饿了么前端开发的基于 Vue.js 的移动端组件库(移动端)
- Vonic:一个基于 vue.js 和 ionic 样式的 UI 框架,用于快速构建移动端单页应用(移动端)
- Vant:轻量、可靠的移动端 Vue 组件库(移动端)
- Cube UI:基于 Vue.js 实现的精致移动端组件库(移动端)
- vuetify:google 材质设计的实现
- vue-material:另一个 google 材质设计的实现
- vux:移动端 UI 框架
- muse-ui:移动端 UI 框架
- bootstrap-vue

### Logging

- [Winston](https://www.npmjs.com/package/winston)
  - 当您需要一个日志库并需要不同的日志输出格式时使用
- [Bunyan](https://www.npmjs.com/package/bunyan)
  - 当您需要一个日志库,并以JSON作为唯一日志输出格式时使用
  - 您希望为不同的组件、请求或函数使用不同的日志记录器(也就是说,这些日志记录器可能以不同的方式解析事件)
- [Morgan](https://www.npmjs.com/package/morgan)
  - 当您使用Express并且想要记录HTTP请求时使用
  - 注意:这将与Winston或Bunyan一起使用.由于它是中间件,它知道如何处理请求并记录它,但不处理Winston和Bunyan所做的日志输出的传输

### Templating(前端模板)

- [Pug(原 Jade)](https://pugjs.org/api/getting-started.html)
  - 当您需要服务器端模板引擎时,请使用该引擎,该引擎易于阅读,并且支持开箱即用的子组件代码块. 您只需要输出 HTML
- [EJS](https://www.npmjs.com/package/ejs)
  - 当您需要一个服务器端模板引擎,该引擎完全使用JS,并且允许空格缩进(Pug 不允许)
  - 注意:不支持异步JS函数

### 通用函数库

- [microjs](http://microjs.com/#)
- [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code)
- [awesome-javascript](https://github.com/sorrycc/awesome-javascript)
- [Lodash](https://www.npmjs.com/package/lodash)
  - 当您需要JS实用程序库时使用
  - 您使用了大量的OOP(面向对象编程)
- [Ramda](https://www.npmjs.com/package/ramda)
  - 当您希望使用函数式的编程风格时
  - 您想要像 lodash 这样的东西,但是在函数式编程范式中
- [underscorejs](https://underscorejs.org/#toArray)
- [lazy.js](https://github.com/dtao/lazy.js)
- [collect.js](https://github.com/ecrmnn/collect.js)
  > Convenient and dependency free wrapper for working with arrays and objects
- [voca](https://github.com/panzerdp/voca)
  > string library
- [mout](http://moutjs.com/)
  > utilities
- [outils](https://www.npmjs.com/package/outils)
  > 日期格式化、url 参数转对象、浏览器类型判断、节流函数等常用函数
- [Chance](http://chancejs.com/)
  > random thing
- [mathjs](https://github.com/josdejong/mathjs)
- [Moment.js](https://www.npmjs.com/package/moment)
  - 在需要解析、验证、操作和显示日期/时间时使用
- [UUID](https://www.npmjs.com/package/uuid)
  - 当您需要随机的、唯一的、难以破解的 id 时使用
- [day.js](https://github.com/iamkun/dayjs)
- [Sugar](https://github.com/andrewplummer/Sugar)
- [polished](https://polished.js.org/)
  > A lightweight toolset for writing styles in JavaScript
- [bluebird](https://github.com/petkaantonov/bluebird)
- [async](https://github.com/caolan/async)
- [es5-shim](https://github.com/es-shims/es5-shim)
- [handlebars](https://github.com/wycats/handlebars.js)
- [immer.js 实战讲解](https://segmentfault.com/a/1190000017270785)
- [Fs-extra](https://www.npmjs.com/package/fs-extra)
  - 当您需要能够递归地使用 mkdir、rm-rf 和 Node 中缺少的其他文件系统级功能时
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
  - 当您需要从 Node 发送电子邮件时使用
- [Dotenv](https://www.npmjs.com/package/dotenv)
  - 当您需要将`.env`文件中的环境变量加载到`process.env`时使用
- fabric.js

### CLI
- Commander
  - 你要构建一个 CLI 实用程序，将所有参数作为命令行上的标志时就用它。
- Inquirer
  - 你想要构建一个按顺序确定选项的“交互式”CLI 实用程序时用它（类似运行 npm init 时的方法，它会问你一系列问题来生成 package.json 文件）

### 前端存储

- [ustbhuangyi/storage](https://github.com/ustbhuangyi/storage)
- [store.js](https://github.com/marcuswestin/store.js/)

### 数据 Mock

- [Mock.js](http://mockjs.com/)
  > 生成随机数据,拦截 Ajax 请求
- [json-server](https://github.com/typicode/json-server)
- [http-server](https://github.com/indexzero/http-server)
- mock-server

### performance

- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- Hiper
- apache ab

### request

- [axios](https://www.npmjs.com/package/axios)当您需要基于`Promise`的`HTTP`请求时可选择它
- [Request](https://www.npmjs.com/package/request)当您需要基于回调的`HTTP`请求时可选择它,例如从一个`REST`服务连接到另一个

### 工具

- [ESdoc](https://www.npmjs.com/package/esdoc)
  - 当您想从您的代码中生成 API 文档,并且您正在使用最新的 JS 版本时
  - 默认情况下支持当前版本的JS(支持 class),因此如果在代码中使用 prototypes,请使用JSdoc
- JSdoc(jsdoc)
  - 当您需要支持ES6的代码API文档生成器时使用
  - 支持classes和prototypes
- ESlint

### Prototype

- [mockplus crack version](https://www.mockplus.com/)

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
- particle.js 粒子效果
- hammer.js 手势

### 数据可视化
- [ECharts](https://echarts.apache.org/zh/index.html)
- [v-charts](https://github.com/ElemeFE/v-charts)
- Chart.js、three.js、Dygraphs.js、D3.js、InfoVis、Springy.js
- vanilla-tilt.js 3D 瓦片
- parallax 视差效果

### calendar
- [11个顶级JavaScript日历插件](https://mp.weixin.qq.com/s?__biz=MzI3NzIzMDY0NA==&mid=2247487050&idx=1&sn=e1cf667260041a9a8df4b41be68b73ee)
### 时间选择器

- [layDate](https://aigodata.github.io/layDate/index.html)

### 图片懒加载

- [lozad](https://github.com/ApoorvSaxena/lozad.js)
- [lazyload](https://github.com/verlok/lazyload)

### other

- [fastclick](https://github.com/ftlabs/fastclick)
- [图片缩放](http://www.dowebok.com/demo/223/)
- [图片占位符](https://github.com/imsky/holder)

### 代码高亮

- [hightlight.js](https://highlightjs.org/)

### 滚动库

- [better-scroll](https://github.com/ustbhuangyi/better-scroll)
- [iscroll](https://github.com/cubiq/iscroll)

### 轮播图

- [Swiper](http://idangero.us/swiper/)
- [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)

### 输入提示

- [typeahead](https://twitter.github.io/typeahead.js/)

### 滚屏

- [fullpage](https://alvarotrigo.com/fullPage/)

### 弹出框

- [Bootbox.js](http://bootboxjs.com/)
- [layer](http://layer.layui.com/)

### 消息通知

- [PNotify](https://github.com/sciactive/pnotify)
- [Notyf](https://github.com/caroso1222/notyf)

### 表单验证

- [validator.js](https://github.com/ansman/validate.js)
- [vee-validate](https://github.com/baianat/vee-validate)

### 拖拽

- [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
- [dragula](https://github.com/bevacqua/dragula)
- [Draggabilly](https://github.com/desandro/draggabilly)
- [draggable](https://shopify.github.io/draggable/)

### 文件上传

- [WebUploader](http://fex.baidu.com/webuploader/)
- fine-uploader

### 复制粘贴插件

- [clipboard.js](https://github.com/zenorocha/clipboard.js)

### 相册(图片滑动切换展示效果)

- [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)
- [viewerjs](https://fengyuanchen.github.io/viewerjs/)

### 树插件

- [treejs](http://www.treejs.cn/v3/main.php#_zTreeInfo)
- ztree

### 导航插件

- [okayNav](https://github.com/VPenkov/okayNav/tree/v3.0)

### 下拉框

- [vue-multiselect](https://github.com/shentao/vue-multiselect)
- select2

### PDF 阅读器

- [pdf.js](https://github.com/mozilla/pdf.js)

### 主题色提取

- [RGBaster](https://github.com/briangonzalez/rgbaster.js)

### 前端国际化 i18n

- [vue-i18n](https://github.com/kazupon/vue-i18n)
- [i18next](https://github.com/i18next/i18next)

### [vue-timers](https://github.com/kelin2025/vue-timers)

### Process management

- [PM2](https://www.npmjs.com/package/pm2)
  - 当您希望进程管理器在服务崩溃时处理重新启动,并允许您控制集群时使用
  - 注意:PM2 所依据的 AGPL 许可证存在一些潜在的违规行为
- [forever](https://www.npmjs.com/package/forever)
  - 当您需要进程管理器来处理在服务崩溃时重新启动服务时使用
  - 您的部署规模较小(pm2 及其集群支持用于更大规模的部署).如果您只有少量的服务/进程,那么您可能可以使用它
- [nodemon](https://www.npmjs.com/package/nodemon)
  - 当您希望监视应用程序中的任何代码更改时使用,并在本地开发时自动重启服务器
  - 非常适合用于开发

### Web Sockets

- [Primus](https://www.npmjs.com/package/primus)
  - 当您需要`Web Sockets`但又不想被束缚在特定的`Web Sockets`实现时使用

### 富文本编辑器
- [wangEditor](http://www.wangeditor.com/) 
- [KindEditor](http://kindeditor.net/demo.php)
- [Simditor](https://simditor.tower.im/) 
- [Summernote](https://summernote.org/)
- [Slate](https://www.slatejs.org/#/rich-text)
- [MEditor.md](https://pandao.github.io/editor.md/)

### 弹幕视频播放器

- DanmuPlayer

### 视频播放器

- video.js
- flv.js
- chimee

### 级联选择器

### 手机端事件

### 条形码插件

### 二维码插件

### 地图
