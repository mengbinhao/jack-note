### get started
1. define router component
2. register router in main.js($route只读 $router只写)
3. use router \<router-link> \<router-view>

### use
1. create router folder
2. create index.js
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import About from '../views/About'
import News from '../views/News'
import Message from '../views/Message'
import MessageDetail from '../views/MessageDetail'

Vue.use(VueRouter)

export default new VueRouter({
    routers: [
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: '/home/news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        //动态path
                        //对应的<router-link :to="`/home/message/detail/${message.id}`">{{ message.title}}</router-link>
                        path: 'detail/:id',
                        component: MessageDetail
                    ]
                },
                //默认定位
                {
                    path: '',
                    redirect: '/home/news'
                }
            ]
        },
        {
            path: '/about',
            component: About
        },
        //默认定位
        {
            path: '/',
            redirect: '/home'
        }
    ]
})
```
3. change main.js
```javascript
import Vue from 'vue'
import router from './router'
//配置属性名确定
new Vue({
    ...
    router
})
```

### 嵌套路由


### 路由缓存
```javascript
<keep-alive>
    <router-view></router-view>
</keep-alive>
```

### 路由传参
1. param
```
{
    path: '/home/message/detail/:id',
    component: MessageDetail
}
<router-link :to="`/home/message/detail/${message.id}`">

//$route.params.id可以取到值

watch: {
    $route: function (value) {
        const id = value.params.id * 1
        this.messageDetail = this.allMessages.find(detail => detail.id === id)
    }
}
```
2. query
```
{
    path: '/home/message/detail',
    component: MessageDetail
}
<router-link :to="`/home/message/detail/id=${message.id}`">
```
3. \<router-view>
```
<router-view msg="abc"/>
or
<router-view :msg="xxx"/>
//组件内直接props接收
```

### 路由编程导航
- this.$router.push(`/home/message/detail/${id}`)  //相当于点击路由链接(可以返回到当前路由界面)
- this.$router.replace(`/home/message/detail/${id}`) //用新路由替换当前路由(不可以返回到当前路由界面
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
