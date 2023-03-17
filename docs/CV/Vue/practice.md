### Vue
#### template

- 把一个`<template>` 元素当做不可见的包裹元素，并在上面使用 v-if, 最终的渲染结果将不包含 `<template>` 

#### props

```javascript
//对于多类型场景
<template>
  <button :style="computedWidth">{{ computedWidth }}</button>
</template>

<script>
  export default {
    props: {
      width: [String, Number]
    },
    computed: {
      computedWidth () {
        let obj = {}
        if (typeof this.width === 'string') o.width = this.width
        if (typeof this.width === 'number') o.width = this.width + 'px'
        return obj
      }
    }
  }
</script>
```

#### watch

```javascript
created(){
  this.fetchPostList()
},
watch: {
  searchInputValue(){
    this.fetchPostList()
  }
}
//改成
watch: {
  searchInputValue:{
    handler: 'fetchPostList',
    immediate: true
  }
}
```

```javascript
//优化deep
watch: {
  obj: {
    handler(newName, oldName) {
      console.log('obj.a changed')
    },
    deep: true
  }
}
//改成
watch: {
  'obj.a': {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
  }
}
```

```javascript
//全局watch定义的时候需要注销watch
const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log(`${newVal} : ${oldVal}`)
})
unWatch()
```

#### computed

- 数据缓存、依赖响应式数据、减少模板中的计算逻辑
- 最佳实践是computed定义一个属性，这个属性依赖多个响应式，watch这个属性

#### is && keep-alive

```javascript
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

#### v-slot

```javascript
//具名插槽
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
<!-- 默认插槽也可不用加上template和v-slot -->
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

//作用域插槽
//子组件抛出自己的状态，父组件在外面使用
<!-- current-user组件 -->
<span>
  <slot :user="user">
    {{ user.lastName }}
  </slot>
</span>

<!-- 父级组件通过自定义名称访问子级作用域 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

<!-- 支持缩写和解构 -->
<current-user>
  <template #default="{ user = { firstName: Gust } }">
    {{ user.firstName }}
  </template>
</current-user>
```

#### mixins

- Vue.extend策略同mixins相同

- 混入属性发生冲突时,以组件数据优先(浅合并第一层属性)

- 混入方法发生冲突时,会将函数合并为一个数组,优先执行混入方法,其次执行组件方法

  ```javascript
  //table.js
  import mixin from '@/mixin/table'
  export default {
      mixins: [mixin]
      ...
  }
  //mixin对象只应该被调用一次，以下每个组件都打点，代码改到根实例中，通过this.$root访问
  Vue.mixin({
  	mounted() {
  		console.log('xxxxxxxxxxxxxx')
  	},
  })
  ```

#### $options

- 静态属性传给`$options`而不是`data`或`computed`

```javascript
export default {
  name: 'Jack',
  age: 33
}
component.$options.phone
component.$options.city
```

#### 自定义事件事件命名

- 自定义事件事件名为小写或-分隔

#### `v-once`

- 组件包含大量静态内容时,可使用`v-once`来标记,缓存静态内容

#### $forceUpdate强制更新view

#### 动态属性名

```html
<a :[name]="url"> ... </a>
<img :[sss]="/img/test.png"/>
<img :[change1()]="change2()"/>

data: {
  name: 'href',
  sss: 'src'
}
```

#### 监听页面刷新和关闭

```javascript
//beforeDestroy 只能监听到页面间的跳转，无法监听到页面刷新和关闭标签页
//页面加载时只执行onload
//页面关闭时先onbeforeunload，再onunload
//页面刷新时先执行onbeforeunload，然后onunload，最后onload
created() {
  this.initCart()
  window.addEventListener('beforeunload', this.updateHandler)
},
beforeDestroy() {
  this.finalCart()
  window.removeEventListener('beforeunload', this.updateHandler)
},
methods: {
  updateHandler() {
    this.finalCart()
  },
  finalCart() {
    //...
  }
}
```

#### 修改子组件样式

```javascript
<style>
/*添加要覆盖的样式*/
</style>
<style scoped>
/* 本地样式 */
</style>
```

```javascript
<style lang="scss">
.box >>> input {
  width: 166px;
  text-align: center;
}
//像SASS之类的预处理器无法正确解析>>>,用 /deep/
.box {
  /deep/ input {
    width: 166px;
    text-align: center;
  }
}
</style>
```

#### $nextTick

1. 在`mounted`生命周期执行DOM操作
2. 在数据变化后需要进行基于DOM结构的操作
```javascript
<template>
	<div class="app">
    <div ref="contentDiv">{{content}}</div>   ---After NextTick
    <div>在nextTick执行前获取内容:{{content1}}</div>   ---Before NextTick
    <div>在nextTick执行之后获取内容:{{content2}}</div> ---After NextTick
    <div>在nextTick执行前获取内容:{{content3}}</div>   ---Before NextTick
  </div>
</template>

<script>
export default {
	name: 'App',
	data: {
		content: 'Before NextTick',
		content1: '',
		content2: '',
		content3: '',
	},
	methods: {
		changeContent() {
			this.content = 'After NextTick'
			this.content1 = this.$refs.contentDiv.innerHTML
			this.$nextTick(() => {
				this.content2 = this.$refs.contentDiv.innerHTML
			})
			this.content3 = this.$refs.contentDiv.innerHTML
		},
	},
	mounted() {
		this.changeContent()
	},
}
</script>
```
#### 基础组件全局注册

```javascript
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    // 获取和目录深度无关的文件名
    camelCase(fileName.replace(/^\.\//, '').replace(/\.vue/, ''))
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根
    componentConfig.default || componentConfig
  )
})
```

#### element-UI related

- 禁止浏览器`Auto complete`
```javascript
//设置 <el-input/> 为只读模式
//在focus事件中去掉只读模式
<el-input
	type="text"
	v-model="addData.loginName"
	readonly
	@focus="handleFocusEvent"
/>

methods: {
	handleFocusEvent(event) {
		event.target && event.target.removeAttribute('readonly')
	}
}
```
- 阻止`<el-form>`默认提交`<el-form @submit.native.prevent>`
- [el-scrollbar](https://codepen.io/gongph/pen/JwJXZZ)
- 根据业务合并`el-table`中的行和列
```javascript
<template>
	<el-table
		:data="formattedList"
		:span-method="handleColspanMethod"
	>
	...
	</el-table>
</template>
<script>
import Api from '@/api/assign'
export default {
	data() {
		return {
			list: [], // 后台返回的数据
			formattedList:[], // 格式化后的数据
			spanArr: [], // 保存要合并的行列数据
		}
	},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			Api.fetchList().then(response => {
				this.list = response.data.data
				// 格式化数据
				this.formattedList = this.formatArray(this.list)
				// 获取合并位置
				this.getSpanArr()
			})
		},
		/**
		* 格式化数组
		* {Array} sources 源数组
		* {Array} arrayed 格式化后的数组
		* return 返回格式化后的数组
		*/
		formatArray: function f(sources, arrayed) {
			if (!sources) return []

			const arr = arrayed || []
			const len = sources.length

			for (let i = 0; i < len; i++) {
				const children = sources[i].list || []
				arr.push(sources[i])
				if (children.length > 0) {
					f(sources[i].list, arr)
				}
			}
			return arr
		},
		/**
		* 获取合并位置信息
		*/
		getSpanArr() {
			// 重置 spanArr，因为翻页的时候数据就变了
			// 之前的数据如果不清空，其他页也会受影响
			this.spanArr = []
			const data = this.formattedList
			if (!data || data.length <= 0) return
			// 遍历
			for (let i = 0; i < data.length; i++) {
				if (i === 0) {
					this.spanArr.push(1)
					// 其实就是行索引
					this.pos = 0
				} else {
					// 如果当前对象和上一个对象的 appKey 相等
					// 说明需要合并
					if (data[i].appKey === data[i - 1].appKey) {
						this.spanArr[this.pos] += 1
						this.spanArr.push(0)
					} else {
						this.spanArr.push(1)
						this.pos = i
					}
				}
			}
		},
		/**
		* 处理跨行列合并
		*/
		handleColspanMethod({ row, column, rowIndex, columnIndex}) {
			if (columnIndex < 2) {
				const _spa = this.spanArr[rowIndex]
				const _row = _spa ? _spa : 0
				const _col = _row > 0 ? 1 : 0
				return {
					rowspan: _row,
					colspan: _col
				}
			}
		}
	}
}
</script>
```

### Vue Router
#### `$router` vs `$route`

- `this.$router`指路由器,只写,`this.$route`指当前路由,只读

#### regex path

- 当使用一个通配符时,`$route.params`内会自动添加一个名为`pathMatch`参数。它包含URL通过通配符被匹配的部分

```javascript
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
```

- 使用了push时,如果提供的path不完整,则params会被忽略,需要提供路由的name或手写完整的带有参数的path
```javascript
const userId = '123'
router.push({ name: 'user', params: { userId }})  // -> /user/123
router.push({ path: `/user/${userId}` })          // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

#### 命名视图

- 单页多路由,命名视图：router-view可设置名字,如果router-view没有设置名字,那么默认为default

```javascript
<router-view></router-view>
<router-view name="a"></router-view>
<router-view name="b"></router-view>

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

#### 路由参数设置为组件属性

```javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },
    // 对于包含命名视图的路由,你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      //props: { default: true, sidebar: false }
      props: true
    }
  ]
})

// URL /search?q=vue 会将 {name: 'vue'} 作为属性传递给 SearchUser 组件
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ name: route.query.q }) }
  ]
})
```

- 不同路由的组件复用
```javascript
// 1 使用watch来监控是否是同一个路由

//way 2
created () {
  this.getPost(this.$route.params.id)
},

// 3 设置key(推荐)
//<router-view :key="$route.fullpath"></router-view>
```

#### 路由设置参数

- 路由设置有参数时,若跳转页面后再通过返回键返回时,路由会保留有参数,若通过push跳转返回,则不会保留该参数,这在第三方调用模块传参时需要注意

#### 路由异步加载

```javascript
{
  path: '/admin',
  name: 'admin-dashboard',
  component:require('@views/admin').default
}
// or
{
  path: '/admin',
  name: 'admin-dashboard',
  component:() => import('@views/admin')
}
```

#### 刷新当前页面

```javascript
<router-link :to="url" @click.native="refreshView">页面</router-link>
<router-view v-if="showView"/>

<script>
export default {
  data () {
    return {
      showView: true
    }
  },
  methods: {
    refreshView () {
      this.showView = false
      this.$nextTick(() => {
        this.showView = true
      })
    }
  }
}
</script>
```

#### 刷新页面参数丢失

- localStorage、sessionStorage、cookie

```javascript
//1 使用编程导航 
this.$router.push({ name: '模块名称', query: { // 各参数 } }) 方式传参

//2 localStorage
// router.js
{
  path: 'paramsMode/:aka',
  name: 'paramsMode',
  component: ParamsMode
}

//ParamsMode.vue
<script>
export default {
  data () {
    return {
      testData: {}
    }
  },
  created () {
    const tempData = localStorage.getItem('tempData')
    if (tempData) {
      this.testData = JSON.parse(tempData)
    } else {
      this.testData = this.$route.params
      localStorage.setItem('tempData', JSON.stringify(this.$route.params))
    }
  },
  beforeDestroy () {
    localStorage.removeItem('tempData')
  }
}
</script>
```

### Vuex

#### 刷新页面Vuex数据丢失

```javascript
//将状态保存在localStorage、sessionStorage
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ]
})

//将状态保存在cookie
import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const store = new Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})
```

#### Vuex动态加载

```javascript
<template>
  <div>
  	<button @click="show">show</button>
  </div>
<template/>
  
<script>
  const getTestModule = () => import('./testModule.js')
</script>
const getTestModule = () => import('./testModule.js')
export default {
	methods: {
		show() {
			getTestModule().then((testModule) => {
				this.isModuleRegistered = true
				this.$store.registerModule('testModule', testModule)
				this.$store.dispatch('testModule/load')
			})
		},
	},
	beforeDestroy() {
		if (this.isModuleRegusterred) {
			this.$store.unregisterModule('testModule')
		}
	},
}

```

#### 自动注册vuex模块

```javascript
const requireModule = require.context('./modules', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
    const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
    modules[moduleName] = {
        namespaced: true,
        ...requireModule(fileName).default
    }
})

export default modules

/* index.js */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
```

#### mapState / mapMutations / mapGetters / mapActions

```javascript
import {mapState, mapGetters, mapActions} from 'vuex'

computed: {
  ...mapState(['count']),
  ...mapGetters(['evenOrOdd'])
},

methods: {
  ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
}
```

#### 事件常量代替mutation类型,放到单独文件中

```javascript
//mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

//store.js
import vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types.js'

const store = new Vuex.Store({
  state: {...},
  mutation: {
    [SOME_MUTATION](state) {
      //...
    }
  }
})
```

#### module

- 开启namespaced:true
- createNamespacedHelpers