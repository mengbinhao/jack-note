### react-router
#### concept
1. react的一个插件库
2. 专门用来实现一个SPA应用
3. 基于react的项目基本都会用到此库

#### SPA
1. 单页Web应用（single page web application，SPA）
2. 整个应用只有一个完整的页面
3. 点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
4. 当点击路由链接时, 只会做页面的局部更新
5. 数据都需要通过ajax请求获取, 并在前端异步展现

#### 路由
1. 一个路由就是一个`key:value`映射关系, `key`为路由路径, `value`可能是`function/component`
2. 后台路由: `node`服务器端路由, `value`是`function`, 用来处理客户端提交的请求并返回一个响应数据,注册路由`router.get(path, function(req, res))`,当`node`接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
3. 前台路由: 浏览器端路由, `value`是`component`, 当请求的是路由`path`时, 浏览器端前没有发送`http`请求, 但界面会更新显示对应的组件,注册路由`<Route path="/about" component={About}>`,当浏览器的`hash`变为`about`时, 当前路由组件就会变为`About`组件

#### 前端路由的实现
1. [history库](https://github.com/ReactTraining/history)
2. history API
    - History.createBrowserHistory(): 得到封装window.history的管理对象
    - History.createHashHistory(): 得到封装window.location.hash的管理对象
    - history.push(): 添加一个新的历史记录
    - history.replace(): 用一个新的历史记录替换当前的记录
    - history.goBack(): 回退到上一个历史记录
    - history.goForword(): 前进到下一个历史记录
    - history.listen(function(location){}): 监视历史记录的变化

#### react-router API
##### 组件
- \<BrowserRouter>
- \<HashRouter>
- \<Route>
- \<Redirect>
- \<Link>
- \<NavLink>
- \<Switch>
- \<StaticRouter>
- `match` object
- `history` object
- `location` object

##### 传递参数
```javascript
<Route path="/about/:id" component={About}></Route>


//in other component
componentDidMount() {
    this.setState({
        id: this.props.match.params.id
    })
}
```
##### 嵌套路由(see demo02)
##### 路由跳转方式
- `<Redirect to="/home/" />`
- `this.props.history.push('/home/')`













