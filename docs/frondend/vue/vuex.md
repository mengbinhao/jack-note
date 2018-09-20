Vuex  (state  getter  mutation action module)

>1 引入Vuex
>
>2 安装插件
>
>3 创建store
>
>4 配置store里面的数据
>
>5 将store对象关联vue实例   //不要直接this.$store.state.xxx改数据！！！！
>
>6 mutation(只能同步代码),action进行异步操作,再mutation里面dispatch然后action异步操作后commit
>
>7 抽取module