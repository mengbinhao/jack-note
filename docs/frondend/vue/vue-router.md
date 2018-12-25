### get started
1. define router component
2. register router
3. \<router-link> \<router-view>

### 嵌套路由

### 路由缓存`<keep-alive>`

### 路由传参
- param
```
{
    path: '/home/message/detail/:id',
    component: MessageDetail
}
<router-link :to="`/home/message/detail/${message.id}`">
```
- query
```
{
    path: '/home/message/detail',
    component: MessageDetail
}
<router-link :to="`/home/message/detail/id=${message.id}`">
```
- \<router-view>
```
<router-view msg="abc"/>

//组件内直接props接收
```

### tips
```javascript
//默认根路由定位
{
    path: '/',
    redirect: '/about'
}

//默认子路由定位
{
    path: '',
    redirect: '/about/news'
}

//子路由简写
{
    path: 'message',
    component: Message
}
```

### 路由编程导航
- this.$router.push({ name:'xxx', query:{id:1}, params:{name:'abc'}})
- this.$router.replace({ name:'xxx', query:{id:1}, params:{name:'abc'}})
- 配置规则 {name:'xxx', path:'/xxx/:name'}
- this.$router.go(-1|1)
- this.$router.back()

### 路由钩子(权限控制的函数执行时期)
- 每次路由匹配后,渲染组建到router-view之前
- router.beforeEach(function(to, from, next){})


### 路由(k->v 前端就是组件 后端就是回调函数)
- onhashchange  (#xxx)
- router.addRoutes 比构造函数配置更灵活
- $route  只读
- $router  只写
- 路由meta元数据-->meta是对于路由规则是否需要权限验证的配置
  - 路由对象中和name属性同级 { meta: {isChecked.true}}
