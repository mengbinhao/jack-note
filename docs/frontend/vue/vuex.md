#### Vuex  (state、getter、mutation、action、module)

>1 引入Vuex
>
>2 安装插件
>
>3 创建store
>
>4 配置store里面的数据
>
>5 将store对象关联vue实例   //不要直接this.$store.state.xxx改数据!
>
>6 mutation(修改同步state),action进行异步操作,在mutation里面dispatch然后action异步操作后commit
>
>7 抽取module

#### Vuex  是什么
简单来说: 对`Vue`应用中多个组件的共享状态进行集中式的管理(读/写)

#### 状态自管理应
- state: 驱动应用的数据源
- view: 以声明方式将state映射到视图
- actions: 响应在view上的用户输入导致的状态变化(包含n个更新状态的方法)
![](../images/vuex-1.png)

#### 把数据存入 Vuex 的理由

1. 数据对多个(独立的)组件来说必须是可访问的

2. 多个(独立的)组件会修改共享的数据

3. 客户端的持久化应用状态

#### 多组件共享状态的问题

1. 多个视图依赖于同一状态
2. 来自不同视图的行为需要变更同一状态
3. 以前的解决办法
   - 将数据以及操作数据的行为都定义在父组件
   - 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)

![](../images/vuex-2.png)

#### state
Vuex 管理的状态对象
```javascript
const state = {
    xxx: initValue
}
this.$store.state.xxx //取值 ----mapState
```

#### mutations
- 包含多个直接更新`state`的方法(回调函数)的对象
- 谁来触发: `action.commit('mutationName')`
- 只能包含同步的代码, 不能写异步代码
```javascript
const mutations = {
    //state and payload
    xxx (state, {data1}) {
      // 更新 state 的某个属性
    }
}
this.$store.commit('xxx') //赋值----mapMutations
```
#### actions
- 包含多个事件回调函数的对象
- 执行: commit()来触发`mutation`, 间接更新state
- 谁来触发: 组件中: `$store.dispatch('action 名称', data)` 执行定时器or ajax
```javascript
const actions = {
    //第一个参数是 context
    //rootState是多modules时使用
    xxx ({state, getters, commit, rootState, rootGetters}, data) {
      commit('yyy', {data1})
    }
}
this.$store.dispatch('xxx')//赋值----mapActions
```

#### getters
- 包含多个计算属性(get)的对象
- 组件中读取: $store.getters.xxx
```javascript
const getters = {
    xxx (state, getters, rootState, rootGetters) {
        return ...
    }
}
this.$store.getters.xxx //取值----mapGetters
```

##### Dynamic Vuex Getters

```javascript
//返回一个函数
const getters = {
    xxx () {
      return (product) => (product.inventory > 0)
    }
}
```

#### modules

- 包含多个module

- 一个module是一个store的配置对象

- 与一个组件(包含有共享数据)对应

- rootState、rootGetters

- 使用module后，默认getters、mutations和actions还是暴露在全局命名空间下，使用namespaced命隔离

  ```javascript
  export default {
    namespaced: true
    state: {},
    mutations :{},
    actions:{
      xxx(rootGetters) {
        //使用rootGetters['cart/oneCartGetter']方式访问module getters
      }
    },
    getters: {}
  }
  ```

- 模块中的便捷访问

  ```javascript
  //以下同样适用mapState、mapMutations、mapActions
  ...mapGetters({
    products: 'cart/cartProduct'
  })
  //or
  ...mapGetters('cart', {
    products: 'cartProduct'
  })
  ...mapState('cart', {
    prop: state => state.prop
  })
  ...mapActions('cart', ['xxx'])
  ```

- 当一个action需要commit多个模块的mutation时，需要第三个参数

  ```javascript
  //cart/xxxxx
  //product/xxxxx
  //不加第三个参数是 cart/product/xxxx
  commit('xxx', product, {root, true})
  ```

#### 向外暴露 store 对象

```javascript
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
```
#### 组件中便捷使用
```javascript
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
	computed: {
     //pass Obj
     mapState({
        newPropName: "count"
     })
    //pass func
    mapState({
        products: state => state.products
        //firstProduct: state => state.products[0]
        specificProduct(state) {
    			return state.products[this.productIdx]
        }
     })
     //pass array
		...mapState(["count", 'other']),
		...mapGetters(["count"])
	},
  methods: {
		...mapMutations(['add','reduce']),
		...mapActions(['addAction','reduceAction'])
	},
}
```

#### store对象
- 所有用vuex管理的组件中都多了一个属性$store, 它就是一个store对象

#### real example
```javascript
//store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
}

const actions = {
  increment ({commit}) {
    commit('INCREMENT')
  },
  decrement ({commit}) {
    commit('DECREMENT')
  },
  incrementIfOdd ({commit, state}) {
    if(state.count % 2 === 1) {
      commit('INCREMENT')
    }
  },
  incrementAsync ({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },
}

const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//In component
<p>click {{ $store.state.count }} times, count is {{evenOrOdd}}</p>
computed: {
    evenOrOdd () {
        return this.$store.getters.evenOrOdd
    }
},

methods: {
    increment () {
        this.$store.dispatch('increment')
    },
    decrement () {
        this.$store.dispatch('decrement')
    },
    incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
    },
    incrementAsync () {
        this.$store.dispatch('incrementAsync')
    }
}


//In component
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

computed: {
  ...mapState(['count']),
  ...mapGetters(['evenOrOdd'])
},
methods: {
  ...mapMutations(['add','reduce']),
  ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
}
```

#### in real project

以下没区分模块，创建一个store文件夹,一个index.js、state.js、action.js、mutation.js、getter.js、mutation-types.js
![](../images/vuex-3.png)
