### 渐进式
Vue 的另一个大特点就是「渐进式」，意思就是你可以渐渐地用Vue。而 React 几乎做不到这一点
1. 你可以继续操作 DOM
2. 你可以很方便地做 SEO
3. 你可以局部做单页面
4. 你可以整体做单页面

### feature
1. 遵守MVVM
2. 编码简洁,体积小,运行效率高,适合PC/移动端开发
3. 本身只关注UI

### compare
1. 借鉴Augular的模板和数据绑定
2. 借鉴React组件化和虚拟DOM

### plugins
- vue-cli
- axio
- vue-router
- vuex
- vue-lazyload
- vue-scroll
- mint-ui
- element-ui


### grammar

#### vue属性

- el
- data
- template
- methods
- components
- filters
- watch -> singel data
- computed -> mutiple data(写法类似方法,但当属性用)
  - `computed`是计算一个新的属性,并将该属性挂载到vm上,而`watch`是监听已经存在且已挂载到`vm`上的数据,所以用`watch`同样可以监听`computed`计算属性的变化(其它还有 `data`、`props`)
  - `computed`本质是一个惰性求值的观察者,具有缓存性,只有当依赖变化后,第一次访问`computed`属性,才会计算新的值,而`watch`则是当数据发生变化便会调用执行函数
  - 从使用场景上说,`computed`适用一个数据被多个数据影响,而`watch`适用一个数据影响多个数据,`watch`适合异步或开销大的场景
  - `methods`没有缓存
  - `computed`的`getter` and `setter`
- `class` and `style`
  - 对象语法 `<div v-bind:class="{ active: isActive }"></div>`
  - 对象语法`<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>`

#### 插值表达式

- 对象
- 字符串
- 判断后的布尔值
- 三元

#### directive / 指令修饰符

- v-text、v-once、v-cloak、v-if、v-show
- v-for
- v-bind ==> :
- v-on   ==> @
- v-model:lazy

#### event
- 事件修饰符
- 自定义事件

#### 表单输入绑定
- 基础用法
- 值绑定
- 修饰符

#### filter(global / local)

#### component(global / local)

#### slot（默认 | 具名）

#### clock

#### 获取DOM

- \$el、\$root、\$parent
- \$refs  获取组建内的元素 (eg: focus)

#### 父子组件(父传子-自定义属性 子传父--自定义事件)
- prop + emit
- slot(相关的js代码父组件直接定义好)
- 直接父组件传递函数(原则数据在哪,操作在哪)
- 钩子函数绑定
```javascriopt
//父组件
mounted() {
    this.$refs.xxx.$on('functionName', this.functionName)
}

<TodoHeader ref="xxx" />
```
- pubsub-js(父孙,兄弟等关系进行传递数据比prop方便很多)
- \$attrs、 \$listeners
- \$children、\$refs、\$parent

##### 多层父子组件通信
通过vm.$parent.$parent访问，同理，子级的子级可以用vm.$children[index].$children[index]的方式
##### 非父子组件通信
通过共同的父级页面转换成父子通信，二是event bus

#### 生命周期

#### 初始化显示
- beforeCreate
- created
- beforeMount
- **mounted** 发送AJAX 启动定时器...

#### 更新
- beforeUpdate
- updated


#### 销毁
- **beforeDestroy** 收尾 清除定时器...
- destroyed


### 动画


#### 路由

- onhashchange  (#xxx)

- router.addRoutes 比构造函数配置更灵活

- $route  只读

- $router  只写

- 嵌套路由

- 路由meta元数据-->meta是对于路由规则是否需要权限验证的配置

  - 路由对象中和name属性同级 { meta: {isChecked.true}}

- 路由钩子 --> 权限控制的函数执行时期
  - 每次路由匹配后,渲染组建到router-view之前
  - router.beforeEach(function(to, from, next){ })

- 编程导航
  - this.$router.push({ name:'xxx', query:{id:1}, para,s:{name:'abc'}})
  - 配置规则 {name:'xxx', path:'/xxx/:name'}
  - this.$router.go(-1|1)

- 多视图

- axios
  - 属性
  - 拦截器

- Webpack

  - package.json

    ```
    "script": {
        "dev": "webpack ./main.js ./build.js --watch"
    }
    ```

  - webpack.config.js

    ```
    //webpack.config.js
      const HtmlWebpacjPlugin = requiew('html-webpack-plugin'); //install first
      module.exports = {
          entry
          output
          module: {
              //属性名后面版本roles
              loaders: [
                  {
                      test: /\.css$/,
                      //顺序相反的
                      loader: 'style-loader!css-loader'
                  },
                  {
                      test: /\.(jpg|png|gif|svg)$/,
                      //?后面加属性
                      //若图片大于limit 生成文件
                      //若图片小于生成base64,会有30%增大
                      //建议比较小的图片用base64
                      loader: 'url-loader?limit=4096'
                  },
                  {
                      test: /\.less$/,
                      loader: 'style-loader!css-loader!less-loader'
                  },
                   {
                      test: /\.js$/,
                      loader: 'babel-loader',
                      exclude: /node_modules/,
                      options: {
                          presets: ['env'], //处理关键字
                          plugins: ['transform-runtime'] //处理函数
                      }
                  },
                  {
                      test: /\.vue$/,
                      loader: 'vue-loader'
                  }
              ]
          },
          plugins: [
              new HtmlWebpacjPlugin({
                  template:''  //参照物
              })
          ]
      }
      import './xxx.css'
      import xxx from './xxx.js'
      import img from './xxx.jpg'
    ```

  - package.json

    ```
    "script": {
    	//--open --hot --inline --port
    	"dev": "webpack-dev-server --open --config ./webpack.dev.config.js"
        "dev": "webpack --config ./webpack.dev.config.js"
        "prod": "webpack --config ./webpack.prod.config.js"
    }
    ```

  - webpack-dev-server、babel-core、babel-loader、babel-preset-env、  babel-plugin-transform-runtime

  - 开发恢复  npm i

  - 生产恢复  npm i --production