路由

- onhashchange  (#xxx)

- router.addRoutes 比构造函数配置更灵活

- $route  只读

- $router  只写

- 嵌套路由

- 路由meta元数据-->meta是对于路由规则是否需要权限验证的配置
  - 路由对象中和name属性同级 { meta: {isChecked.true}}

- 路由钩子--> 权限控制的函数执行时期
  - 每次路由匹配后,渲染组建到router-view之前
  - router.beforeEach(function(to, from, next){ })

- 编程导航
  - this.$router.push({ name:'xxx', query:{id:1}, para,s:{name:'abc'}})
  - 配置规则 {name:'xxx', path:'/xxx/:name'}
  - this.$router.go(-1|1)