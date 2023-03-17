### 组件间通信基本原则
1. 不能在子组件中直接修改父组件的状态数据
2. 数据在哪, 更新数据的行为(函数)就定义在哪

### Vue组件间通信方式

#### 1 props/$emit
```vue
//父组件
<Child :title="title" @changeTitle="title = $event" />
  or
<Child :title="title" @changeTitle="handler" />

 methods: {
  onEnlargeText: function (newTitle) {
    this.title = newTitle
  }
}
//子组件
this.$emit('changeTitle', newTitle)
```
> 1. 父组件传递数据时类似在标签中写了一个属性
>     1. 字符串是静态时可直接传入无需在属性前加v-bind
>     2. 数字，布尔，对象，数组，因为这些是js表达式而不是字符串，所以即使这些传递的是静态的也需要加v-bind，把数据放到data中引用
> 2. 如果prop传到子组件中的数据是一个对象的话，要注意传递的是一个对象引用，虽然父子组件看似是分离的但最后都是在同一对象下
>     1. 如果prop传到子组件的值只是作为初始值使用，且在父组件中不会变化则赋值到data中使用
>     2. 如果传到子组件的prop的数据在父组件会被改变的，放到计算属性中监听变化使用。因为如果传递的是个对象的话，只改变下面的某个属性子组件中是不会响应式更新的，如果子组件需要在数据变化时响应式更新那只能放到computed中或者用watch深拷贝deep:true才能监听到变化
>     3. 如果又需要在子组件中通过prop传递数据的变化做些操作，那么写在computed中会报警告，因为计算属性中不推荐有任何数据的改变,只进行计算。如果非要进行数据的操作那么可以把监听写在watch（注意deep深拷贝）或者使用computed的get和set
>     4. 但问题又来了，如果传进来的是个对象，同时又需要在子组件中操作传进来的这个数据，那么在父组件中的这个数据也会改变，**因为你传递的只是个引用， 即使你把prop的数据复制到data中也是一样的**，无论如何赋值都是引用的赋值，只能对对象做深拷贝创建一个副本才能继续操作，可以用JSON方法先转化字符串再转成对象
>     5. 所以在父子传递数据时要先考虑好数据要如何使用，否则你会遇到很多问题或子组件中修改了父组件中的数据，这是很隐蔽并且很危险的

##### 父组件传递函数(数据在哪,操作在哪),可以一层一层传，子组件直接调用

```vue
<AddComment :addComment="addComment"/>
```
##### slot传标签(父传子,相关的js代码父组件直接定义好)

```vue
//父组件，相关属性和方法从子组件定义到父组件
<TodoFooter>
  <template #checkAll>
    <input type="checkbox" v-model="checkAll" />
  </template>
	<template #size>
  	<span>已完成{{completeSize}} / 全部{{todos.length}}</span>
	</template>
	<template #delete>
  	<button class="btn btn-danger" v-show="completeSize" @click="deleteAllCompleted">清除已完成任务</button>
	</template>
</TodoFooter>

//子组件
<div class="todo-footer">
  <label>
    <slot name="checkAll"></slot>
  </label>

  <span>
    <slot name="size"></slot>
  </span>

  <slot name="delete"></slot>
</div>
```
#### 2 Event Bus(\$emit / \$on)

```javascript
//bus.js
import Vue from 'vue'
export default new Vue
```

```javascript
import Bus from './bus.js'
export default {
  methods: {
    bus () {
      Bus.$emit('EVENT_NAME', payload)
    }
  }
}
```

```javascript
import Bus from './bus.js'
export default {
  mounted() {
    Bus.$on('EVENT_NAME', (payload) => {
      console.log(e)
    })
  }
}
```

#### 3 pubsub-js(发布订阅)

```javascript
//订阅组件
import PubSub from 'pubsub-js'
PubSub.subscribe('deleteItem', (msg, index) => {
  this.deleteComment(index)
})
//发布组件
import PubSub from 'pubsub-js'
PubSub.publish('deleteItem', index);
```

#### 4 provide/inject

- 不论组件层次有多深，并在其上下游关系成立的时间里始终生效)
- 注入的不是响应式的数据，需配合计算属性达到

```vue
Vue.component('child', {
	inject: ['for'], //得到父组件传递过来的数据
	data() {
		return {
			myMessage: this.for,
		}
	},
	template: `
			<div>
			<input type="tet" v-model="myMessage">
			</div>`,
})

Vue.component('parent', {
	template: `
			<div>
			<p>this is parent component!</p>
			<Child></Child>
			</div>
			`,
	provide: {
		//obj: this 响应式
		for: 'test',
	},
	data() {
		return {
			message: 'hello',
		}
	},
})

var app = new Vue({
	el: '#app',
	template: `
			<div>
			<parent></parent>
			</div>
			`,
})
```
```javascript
export default {
  //方式一
  provide: {
    message: 'hello!'
  }
	//方式二
	provide() {
    // 使用函数的形式
    return {
      message: this.message
    }
  }
}

export default {
  inject: ['message'],
  created() {
    console.log(this.message)
  },
	data() {
    return {
      fullMessage: this.message
    }
  }
}

export default {
  inject: {
    /* 本地属性名 */ 
    localMessage: {
      from: 'message'  /* 注入来源名 */ 
    }
  }
}

export default {
  // 当声明注入的默认值时
  // 必须使用对象形式
  inject: {
    message: {
      from: 'message', // 当与原注入名同名时，这个属性是可选的
      default: 'default value'
    },
    user: {
      // 对于非基础类型数据，如果创建开销比较大，或是需要确保每个组件实例
      // 需要独立数据的，使用工厂函数
      default: () => ({ name: 'John' })
    }
  }
}

//Vue3可响应注入
provide() {
  this.theme = Vue.observable({
    color: "blue"
  });
  return {
    theme: this.theme
  };
}

//Vue3可响应注入
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // 显式提供一个计算属性
      message: computed(() => this.message)
    }
  }
}
```


> 1 provide 选项是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性
>
> 2 provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而如果你传入了一个可监听的对象，那么其对象的属性还是可响应的
>
> 3 传输数据父级一次注入，子孙组件一起共享的方式

#### 5 $attrs(inheritAttrs)、\$listeners

> \$attrs包含了父作用域中不作为props被识别 (且获取) 的特性绑定(class和style除外)。当一个组件没有声明任props时，这里会包含所有父作用域的绑定(class和style除外)，并且可以通过v-bind="$attrs"传入内部组件 —— 在创建高级别的组件时非常有用
>
> \$listeners包含了父作用域中的(不含.native修饰器的)v-on事件监听器。它可以通过v-on="$listeners"传入内部组件 —— 在创建更高层次的组件时非常有用
>
> 简单来说，\$attrs 里存放的是父组件中绑定的非props属性，​\$listeners里面存放的是父组件中绑定的非原生事件
>
```vue
// 祖先组件
// 在祖先组件中直接传入output和input
<template>
  <div>
    <child1 :output="output" :input="input"></child1>
  </div>
</template>
<script>
import child1 from './child1.vue'
export default {
  components: {
    child1
  },
  data () {
    return {
      input: 'Jack',
      output: {
        name: '王文健',
        age: '18'
      }
    }
  }
</script>
```

```vue
//子組件
<template>
  <div
    <h1>{{input}}</h1>
    <child2 :child="child" v-bind='$attrs'></child2>
  </div>
</template>
<script>
import child2 from './child2.vue'
export default {
  components: {
    child2
  },
  props: {
    input: [String]
  },
  data () {
    return {
      child: 'child1'
    }
  },
// 默认为true，如果传入的属性子组件没有prop接受，就会以字符串的形式出现为标签属性
// 设为false，在dom中就看不到这些属性
  inheritAttrs: false,
  created () {
    // 在子组件中打印的$attrs就是父组件传入的值，刨去style,class,和子组件中已props的属性
    console.log(this.$attrs)  // 打印output
  }
}
</script>
```

```vue
//孙组件
<template>
  <div>
    {{$attrs.output.name}}
  </div>
</template>
<script>
export default {
  created () {
    // 打印output和child
    console.log(this.$attrs)
  }
}
</script>
```

#### 6 \$children、\$parent、$root

```javascript
this.$parent.$parent
this.$children[index].$children[index]
```

#### 7 $refs(如果在普通的DOM元素上使用，引用指向的就是DOM元素；如果用在子组件上，引用就指向组件)

> 父组件需要子组件的一个数据但子组件并不知道或者说没有能力在父组件想要的时候给父组件，那么这个时候就要用ref
>
> 1. 父组件在标签中定义ref属性，在js中直接调用this.$refs.xxx就是调用整个子组件，子组件的所有内容都能通过ref去调用，当然我们并不推荐因为这会使数据看起来非常混乱
> 2. 所以我们可以在子组件中定义一种专供父组件调用的函数，比如我们在这个函数中返回子组件data中某个数据,当父组件想要获取这个数据就直接主动调用ref执行这个函数获取这个数据,这样能适应很大一部分场景，逻辑也更清晰一点
> 3. 父向子传递数据也可以用ref，当需要在一个父组件中大量调用同一个子组件，而每次调用传递的prop数据都不同，并且传递数据会根据之后操作变化，这样需要在data中定义大量相关数据并改变它，可以直接用ref调用子组件函数直接把数据以参数的形式传给子组件，逻辑也更清晰一点
> 4. 如果调用基础组件可以在父组件中调用ref执行基础组件中暴露的各种功能接口，比如显示，消失等

#### 8 Vuex

1. Vuex分模块：项目不同模块间维护各自的Vuex数据
2. Mutation ：是修改State数据的唯一推荐方法，且只能进行同步操作
3. Getter ：Vuex允许在Store中定义 “ Getter”（类似于Store的计算属性）Getter 的返回值会根据他的依赖进行缓存，只有依赖值发生了变化，才会重新计算

```javascript
// index.js
import Vue from 'vue'
import Tpl from './index.vue'
import store from './store'

new Vue({
	store,
	render: (h) => h(Tpl),
}).$mount('#app')

// store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 1,
	},
	mutations: {
		increment(state) {
			state.count++
		},
		reduce(state) {
			state.count--
		},
	},
	actions: {
		actIncrement({ commit }) {
			setTimeout(() => {
				commit('increment')
			})
		},
		actReduce({ commit }) {
			setTimeout(() => {
				commit('reduce')
			})
		},
	},
	getters: {
		doubleCount: (state) => state.count * 2,
	},
})

export default store

// vue文件
<template>
  <div class="container">
    <p>我的count：{{count}}</p>
    <p>doubleCount:{{doubleCount}}</p>
    <button @click="this.actIncrement">增加</button>
    <button @click="this.actReduce">减少</button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "demo",
  data: function() {
    return {};
  },
  components: {},
  props: {},
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["doubleCount"])
  },
  methods: {
    ...mapActions(["actIncrement", "actReduce"])
  }
};
</script>
```

![](./images/vue-4.gif)

### Summary

- 父子通信：props / \$emit，​\$emit / ​\$on，Vuex，\$attrs / \$listeners，provide/inject，\$parent / \$children＆\$refs
- 兄弟通信：\$emit / ​\$on，Vuex
- 隔代（跨级）通信：\$emit / ​\$on，Vuex，provide / inject，​\$attrs / ​\$listeners