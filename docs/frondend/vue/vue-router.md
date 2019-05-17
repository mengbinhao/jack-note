### get started
1. define router component
2. register router in main.js(\$route只读 $router只写)
3. use router \<router-link> \<router-view>

### how to use
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

### 单页面多路由区域

```javascript
//App.vue
<router-link to="/">首页</router-link>
<router-link to="/hi">Hi页面</router-link> 


<router-view ></router-view>
<router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
<router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>
```

```javascript
//router.js
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default:Hello,
        left:Hi1,
        right:Hi2
      }
    },{
      path: '/Hi',
      components: {
        default:Hello,
        left:Hi2,
        right:Hi1
      }
    }
 
  ]
})
```


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
//组件内直接props接收
<router-view :msg="xxx"/>
```
4. regex
```
path:'/params/:newsId(\\d+)/:newsTitle'
```
4. redirect with params
```
path:'/goParams/:newsId(\\d+)/:newsTitle',
redirect:'/params/:newsId(\\d+)/:newsTitle'
```

### 路由过渡动画

```javascript
<transition name="fade">
  <router-view ></router-view>
</transition>
```

1. fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除
2. fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除
3. fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除
4. fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除

```javascript
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
```



### 路由编程导航

- this.\$router.push(`/home/message/detail/${id}`)  //相当于点击路由链接(可以返回到当前路由界面)
- this.\$router.replace(`/home/message/detail/${id}`) //用新路由替换当前路由(不可以返回到当前路由界面
- this.$router.replace('/menu')
- this.$router.push({ name:'xxx', query:{id:1}, params:{name:'xxx'}})
- this.$router.push('/menu')
- this.$router.replace({ name:'xxx', query:{id:1}, params:{name:'xxx'}})
- 配置规则 {name:'xxx', path:'/xxx/:name'}
- this.$router.go(-1|1)
- this.$router.back()

### 路由钩子(权限控制)
- 每次路由匹配后,渲染组建到router-view之前

- `router.beforeEach`全局前置

- `router.beforeResolve` 全局解析

- `router.afterEach` 全局后置

- 路由独享守卫

    ```javascript
    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => {
            // ...
          }
        }
      ]
    })
    ```

- 组件内守卫

    ```javascript
    const Foo = {
      template: `...`,
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
      },
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      },
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
      }
    }
    ```

#### 完整的导航解析流程

1. 导航被触发
2. 在失活的组件里调用离开守卫
3. 调用全局的 `beforeEach` 守卫
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)
5. 在路由配置里调用 `beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件里调用 `beforeRouteEnter`
8. 调用全局的 `beforeResolve` 守卫 (2.5+)
9. 导航被确认
10. 调用全局的 `afterEach` 钩子
11. 触发 DOM 更新
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数

### 总结(k->v 前端就是组件 后端就是回调函数)

- 原理就是onhashchange  (#xxx)
- router.addRoutes 比构造函数配置更灵活
- $route  只读
- $router  只写
- 路由meta元数据-->meta是对于路由规则是否需要权限验证的配置
  - 路由对象中和name属性同级 { meta: {isChecked.true}}
