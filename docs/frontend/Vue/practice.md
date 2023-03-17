### Vue
<<<<<<< HEAD

#### 1 watch

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
//有请求需要再没初始化的时候就执行一次，然后监听他的变化
watch: {
    searchInputValue:{
        handler: 'fetchPostList',
        immediate: true
    }
}



=======
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
>>>>>>> dev
//优化deep
watch: {
  obj: {
    handler(newName, oldName) {
<<<<<<< HEAD
      console.log('obj.a changed');
    },
    immediate: true,
    deep: true
  }
}

=======
      console.log('obj.a changed')
    },
    deep: true
  }
}
>>>>>>> dev
//改成
watch: {
  'obj.a': {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
<<<<<<< HEAD
    immediate: true
  }
}


//全局watch定义的时候需要注销watch
const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log(`${newVal} : ${oldVal}`);
})

unWatch();
```

#### 2 computed

```javascript
//setter
```

#### 2 watch + computed

```javascript
//Not recommended 1
data(){
    return {
        keyword:'',
        region:'',
        deviceId:'',
        page:1
    }
},
methods:{
    fetchData(params={
        keyword:this.keyword,
        region:this.region,
        deviceId:this.deviceId,
        page:this.page,
    }){
        this.$http.get("/list",params).then("do some thing")
    }
},
created(){
    this.fetchData()
},
watch: {
    keyword(data){
        this.keyword=data
        this.fetchData()
    },
    region(data){
        this.region=data
        this.fetchData()
    },
    deviceId(data){
        this.deviceId=data
        this.fetchData()
    },
    page(data){
        this.page=data
        this.fetchData()
    },
    requestParams(params){
        this.fetchData(params)
    }
}


//Not recommended 2
data(){
    return {
        keyword:'',
        region:'',
        deviceId:'',
        page:1
    }
},
methods:{
    paramsChange(paramsName,paramsValue){
        this[paramsName]=paramsValue
        this.fetchData()
    },
    fetchData(params={
        keyword:this.keyword,
        region:this.region,
        deviceId:this.deviceId,
        page:this.page,
    }){
        this.$http.get("/list",params).then("do some thing")
    }
},
created(){
    this.fetchData()
}

//recommended
<el-pagination
    layout="total, prev, pager, next, jumper"
    :total="total"
    prev-text="上一页"
    next-text="下一页"
    @current-change="paramsChange('page',$event)"
    >
</el-pagination>


//需要在模板里面每个参数change的地方绑定事件，并传递参数值,比如分页change时：
data(){
    return {
        keyword:'',
        region:'',
        deviceId:'',
        page:1
    }
},
computed:{
    requestParams() {
        return {
            page: this.page,
            region: this.region,
            id: this.deviceId,
            keyword: this.keyword
        }
    }
},
methods:{
    fetchData(params={
        keyword:this.keyword,
        region:this.region,
        deviceId:this.deviceId,
        page:this.page,
    }){
        this.$http.get("/list",params).then("do some thing")
    }
},
watch: {
    requestParams: {
        handler: 'fetchData',
        immediate: true
    }
},
```

#### 3 监听页面刷新和关闭

```javascript
//beforeDestroy 只能监听到页面间的跳转，无法监听到页面刷新和关闭标签页
//页面加载时只执行 onload 事件
//页面关闭时，先 onbeforeunload 事件，再 onunload 事件
//页面刷新时先执行 onbeforeunload事件，然后 onunload 事件，最后 onload 事件
created() {
    this.initCart()
    window.addEventListener('beforeunload', this.updateHandler)
},
beforeDestroy() {
    this.finalCart()
},
destroyed() {
    window.removeEventListener('beforeunload', this.updateHandler)
},
methods: {
    updateHandler() {
        this.finalCart()
    },
    finalCart() {...}
}
```

#### 4 修改子组件样式

```javascript
//可以在一个组件中同时使用有作用域和无作用域的样式
<style lang="sass" scoped>
/* 本地样式 */
</style>
<style lang="sass">
/* 全局样式
*  修改子组件样式，最好在子组件外嵌套一个类
*/
</style>


//深选择器
<style scoped>
  .myHeader >>> .title {
    color: red;
  }
</style>

//像 SASS 之类的预处理器无法正确解析 >>>,用 /deep/
<style scoped>
  .myHeader /deep/ .title {
    color: red;
  }
</style>
```

#### 5 mixins

```javascript
/**
 *   mixin/table.js
 */
export default {
    data() {
        return {
            keyword: '',
            requestKeyword: '',
            pages: 1,
            size: 10,
            total: 0,
            tableData: []
        }
    }
}

//改成
import mixin from '@/mixin/table'
export default {
    mixins: [mixin]
    ...
}

//mixin对象只应该被调用一次，以下每个组件都打点，代码改到根实例中，通过this.$root访问
Vue.mixin({
    mounted() {
        console.log('xxxxxxxxxxxxxx')
    }
})
```

#### 6 基本组件注册(也适用于全局filter and directive)

```javascript
//main.js动态require组件,也可以单独抽离文件
=======
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
>>>>>>> dev
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
<<<<<<< HEAD
  './components', false, /base-[\w-]+\.vue$/
)

requireComponent.keys().forEach(fileName => {

  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.vue/, ''))
  )

  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig)
})


//filter
import * as custom from './common/filters/custom'
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))
```

#### 静态属性传给$options而不是data或computed

```javascript
export default {
    phone: 138888888,
    city: 'xi\'an'
}
component.$options.phone
component.$options.city
```

#### 考虑将非响应式(non-reactive)的数据转变为响应式(reactive)

```javascript
export default {
    data() {
        return {
            token: null
        }
    },
    method: {
        updateToken() {
            this.token = Cookies.get('xxx')
        }
    }
}
Cookies.set('xxx', 'yyy')
component.updateToken()
```

#### render

```javascript
//唯一组件根元素(可以用render函数来渲染)
functional: true,
render(h, { props }) {
  return props.routes.map(route =>
    <li key={route.name}>
      <router-link to={route}>
        {route.title}
      </router-link>
    </li>
  )
}

<template>
  <div>
    <child :level="level">Hello world!</child>
  </div>
</template>

<script type='text/javascript'>
  import Vue from 'vue'
  Vue.component('child', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  }
    }
  })
  export default {
    name: 'hehe',
    data() { return { level: 3 } }
  }
</script>

//除了:is也可以实现动态组件
<template>
  <div>
    <button @click='level = 0'>嘻嘻</button>
    <button @click='level = 1'>哈哈</button>
    <hr>
    <child :level="level"></child>
  </div>
</template>

<script type='text/javascript'>
  import Vue from 'vue'
  import Jack from './Jack'
  import Haha from './Haha'
  Vue.component('child', {
    render(h) {
      const tag = ['Jack', 'haha'][this.level]
      return h(tag, this.$slots.default)
    },
    props: { level: { type: Number, required: true } },
    components: { Jack, Haha }
  })
  export default {
    name: 'hehe',
    data() { return { level: 0 } }
  }
</script>
```

#### .syn或v-model

```javascript
//父组件获取子组件的数据
//parent.vue
<my-comp :prop1.sync="prop1">

//child.vue
export default {
    props:['prop1'],
    methods: {
    	update() {
            this.$emit('update:prop1', 1)
    	}
    }
}

// v-model
//parent.vue
<template>
  <div class="home">
    <myDialog v-model="show"></myDialog>
    <button @click="toggle">Toggle</button>
  </div>
</template>
<script>
  import myDialog from '@/components/myDialog.vue'

  export default {
    name: 'home',
    components: {
      myDialog
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggle() {
        this.show = !this.show
      }
    }
  }
</script>

//child.vue
<template>
  <div>
    <div v-if="value" class="modal">
      {{value}}
      <button @click="close">x</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['value'],
    methods: {
      close() {
        this.$emit('input', false)
      }
    }
  }
</script>
```

#### $nextTick

```javascript
//应用场景
//在created 生命周期执行DOM操作
//在数据变化后需要进行基于DOM结构的操作
<template>
	<div class="app">
        <div ref="contentDiv">{{content}}</div>
        <div>在nextTick执行前获取内容:{{content1}}</div>
        <div>在nextTick执行之后获取内容:{{content2}}</div>
        <div>在nextTick执行前获取内容:{{content3}}</div>
    </div>
</template>

<script>
    export default {
        name:'App',
        data: {
            content: 'Before NextTick',
            content1: '',
            content2: '',
            content3: ''
        },
        methods: {
            changeContent () {
                this.content = 'After NextTick' // 在此处更新content的数据
                this.content1 = this.$refs.contentDiv.innerHTML //获取DOM中的数据
                this.$nextTick(() => {
                    // 在nextTick的回调中获取DOM中的数据
                    this.content2 = this.$refs.contentDiv.innerHTML
                })
                this.content3 = this.$refs.contentDiv.innerHTML
            }
        },
        mount () {
            this.changeContent()
        }
    }
</script>
```

#### 7 common filter

```javascript
import Vue from 'vue'
import moment from 'moment'

/**
 * @filter dateFormat 时间格式化
 * @param {String, Date} value 可被 new Date 解析的字符串
 * @param {String} formatStr moment 的 format 字符串
 * 使用方法 {{ 2019-1-1 | dateFormat() }}
 */
Vue.filter('dateFormat', (value, formatStr = 'YYYY-MM-DD hh:mm:ss') => {
  return moment(value).format(formatStr)
})

/**
 * @filter digitUppercase 人民币金额转成汉字大写
 * @param {Number} value 金额数字
 * 使用方法 {{ 1111 | digitUppercase }}
 */
Vue.filter('digitUppercase', value => {
  if (Number(value)) {
    let fraction = ['角', '分']
    let digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ]
    let unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ]

    let head = value < 0 ? '欠' : ''
    value = Math.abs(value)
    let s = ''
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(value * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    value = Math.floor(value)
    for (let i = 0; i < unit[0].length && value > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && value > 0; j++) {
        p = digit[value % 10] + unit[1][j] + p
        value = Math.floor(value / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  } else {
    return '零元整'
  }
})
```

#### 8 common directive
```javascript
import Vue from 'vue'

/**
 * @directive preventReClick 防止按钮在短时间内多次点击造成的多次请求(一般用于提交按钮)
 * @param {Element} el 绑定的元素
 * @param {Number} binding 绑定的时间
 * 使用方式 <el-button v-prevent-replace-click></el-button>
 */
Vue.directive('preventReplaceClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.classList.add('is-disabled')
        const i = document.createElement('i')
        i.classList.add('el-icon-loading')
        el.prepend(i)
        el.classList.add('is-loading')
        el.disabled = true

        setTimeout(() => {
          el.disabled = false
          el.classList.remove('is-disabled')
          el.classList.remove('is-loading')
          el.removeChild(i)
        }, binding.value || 1000)
      }
    })
  }
})
```

#### 9 utils

```javascript
/**
  * 应用场景
  * debounce(抖动)
  * search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
  * window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
  *
  * throttle(节流)
  * 鼠标不断点击触发，mousedown(单位时间内只触发一次)
  * 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
 */

// 防抖
export function debounce (fn, delay = 200) {
  let timer
  return function () {
    let context = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
// 节流
export function throttle (fn, interval = 200) {
  let last = 0
  return function() {
    let now = +new Date()
    if (now - last >= interval) {
      fn.apply(this, arguments)
      last = +new Date()
    }
  }
}

// 格式化 startDate 和 endDate
import moment from 'moment'
import _ from 'lodash'

/**
 * @method timerByAdd 计算相对当前时间后N个单位时间的日期(加法)
 * @param num {Number} 相对于几个时间点
 * @param timer {String} 时间单位 'days' 'months' 'years‘ 更多时间单位参考moment官方文档
 * @param formatStr {String} moment 的 format 字符串
 * @return {Object} {startDate,endDate}
 */
export function timerByAdd ({
  num,
  timer = 'days'
} = {}, formatStr = 'YYYY-MM-DD') {
  let startDate
  let endDate = moment().format(formatStr)

  num ? startDate = moment().add(num, timer).format(formatStr) : startDate = endDate
  let result = {
    startDate,
    endDate
  }
  return result
}

/**
 * @method timerBySubtract 计算相对当前时间前N个单位时间的日期(减法)
 * @param num {Number} 相对于几个时间点
 * @param timer {String} 时间单位 'days' 'months' 'years‘ 更多时间单位参考moment官方文档
 * @param formatStr {String} moment 的 format 字符串
 * @return {Object} {startDate,endDate}
 */
export function timerBySubtract ({
  num,
  timer = 'days'
} = {}, formatStr = 'YYYY-MM-DD') {
  let startDate
  let endDate = moment().format(formatStr)

  num ? startDate = moment().subtract(num, timer).format(formatStr) : startDate = endDate
  let result = {
    startDate,
    endDate
  }
  return result
}

/**
 * @method timerFormat 将对象时间转成数组形式
 * @param {Object} timer {startDate, endDate}
 */
export function timerFormat (timer) {
  if (_.isObject(timer)) {
    return _.values(timer)
  }
}
```

#### template

> 把一个`<template>` 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 `<template>` 元素

#### 11 组件包装、事件属性穿透问题

```javascript
//父组件
<BaseInput
    :value="value"
    label="密码"
    placeholder="请填写密码"
    @input="handleInput"
    @focus="handleFocus>
</BaseInput>

//子组件
<template>
  <label>
    {{ label }}
    <input
      :value="value"
      :placeholder="placeholder"
      @focus=$emit('focus', $event)"
      @input="$emit('input', $event.target.value)"
    >
  </label>
</template>

//这样写很不精简，很多属性和事件都是手动定义的
<input
    :value="value"
    v-bind="$attrs"
    v-on="listeners"
>

//$attrs包含了父作用域中不作为prop被识别(且获取)的特性绑定(class 和 style 除外)
//$listeners包含了父作用域中的(不含 .native 修饰器的)v-on事件监听器
computed: {
  listeners() {
    return {
      ...this.$listeners,
      input: event =>
        this.$emit('input', event.target.value)
    }
  }
}
```

#### vue-loader

```javascript
//preserveWhitespace 减少文件体积
{
  vue: {
    preserveWhitespace: false
  }
}

//transformToRequire
<template>
  <div>
    <avatar :default-src="DEFAULT_AVATAR"></avatar>
  </div>
</template>
<script>
  export default {
    created () {
      this.DEFAULT_AVATAR = require('./assets/default-avatar.png')
    }
  }
</script>

//通过配置 transformToRequire 后，vue-loader会把对应的属性自动 require 之后传给组件
{
  vue: {
    transformToRequire: {
      avatar: ['default-src']
    }
  }
}

<template>
  <div>
    <avatar default-src="./assets/default-avatar.png"></avatar>
  </div>
</template>
```

### vue-router

#### router key路由组件刷新

```javascript
//从/post-haorooms/a，跳转到/post-haorooms/b。页面跳转后数据没更新
//option 1
data() {
  return {
    loading: false,
    error: null,
    post: null
  }
},
watch: {
  '$route': {
    handler: 'resetData',
    immediate: true
  }
},
methods: {
  resetData() {
    this.loading = false
    this.error = null
    this.post = null
    this.getPost(this.$route.params.id)
  },
  getPost(id){

  }
}

//option 2
data() {
  return {
    loading: false,
    error: null,
    post: null
  }
},
created () {
  this.getPost(this.$route.params.id)
},
methods () {
  getPost(postId) {
    // ...
  }
}

//给router-view添加一个唯一的key，这样即使是公用组件，只要url变化了，就一定会重新创建这个组件
//一般应用在子路由里面，这样才可以不避免大量重绘，假设app.vue根目录添加这个属性，那么每次点击改变地址都会重绘，还是得不偿失的
<router-view :key="$route.fullpath"></router-view>
=======
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
>>>>>>> dev
```

#### 刷新当前页面

```javascript
<<<<<<< HEAD
<!-- html -->
<router-link :to="url" @click.native="refreshView">页面</router-link>
<router-view v-if="showView"/>

<!-- js -->
=======
<router-link :to="url" @click.native="refreshView">页面</router-link>
<router-view v-if="showView"/>

>>>>>>> dev
<script>
export default {
  data () {
    return {
<<<<<<< HEAD
      showView: true // 用于点击当前页的router时，刷新当前页
=======
      showView: true
>>>>>>> dev
    }
  },
  methods: {
    refreshView () {
<<<<<<< HEAD
      this.showView = false // 通过v-if移除router-view节点
      this.$nextTick(() => {
        this.showView = true // DOM更新后再通过v-if添加router-view节点
=======
      this.showView = false
      this.$nextTick(() => {
        this.showView = true
>>>>>>> dev
      })
    }
  }
}
</script>
```

#### 刷新页面参数丢失

<<<<<<< HEAD
```javascript
//1 使用 this.$router.push({ name: '模块名称', query: { // 各参数 } }) 方式传参
=======
- localStorage、sessionStorage、cookie

```javascript
//1 使用编程导航 
this.$router.push({ name: '模块名称', query: { // 各参数 } }) 方式传参
>>>>>>> dev

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

<<<<<<< HEAD
#### 精简vuex的modules引入

```javascript
import auth from './modules/auth'
import posts from './modules/posts'
import comments from './modules/comments'
// ...

export default new Vuex.Store({
  modules: {
    auth,
    posts,
    comments,
    // ...
  }
})

/* index.js */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import modules from './modules'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules
})

//改成
import camelCase from 'lodash/camelCase'
const requireModule = require.context('.', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
    if (fileName === './index.js') return
    const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
    modules[moduleName] = {
        namespaced: true,
        ...requireModule(fileName)
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

#### 刷新页面Vuex数据丢失

```javascript
////将状态保存在localStorage
=======
#### 刷新页面Vuex数据丢失

```javascript
//将状态保存在localStorage、sessionStorage
>>>>>>> dev
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ]
})

<<<<<<< HEAD

=======
>>>>>>> dev
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

<<<<<<< HEAD
#### some APIs

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    getCountPlusOne: state => state.count + 1
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

//watch
//watch 是将Vuex与其他外部代码整合的最有用的方法
const unsubscribe = store.watch(
  (state, getters) => {
    return [state.count, getters.getCountPlusOne];
  },
  watched => {
    console.log("Count is:", watched[0]);
    console.log("Count plus one is:", watched[1]);
  },
  {}
);

// To unsubscribe:
unsubscribe();


//SubscribeAction
//指定订阅处理函数的被调用时机应该在一个 action 分发之前还是之后 (默认行为是之前)
const unsubscribe2 = store.subscribeAction({
  before: (action, state) => {
    startBigLoadingSpinner();
  },
  after: (action, state) => {
    stoptBigLoadingSpinner();
  }
});

// To unsubscribe:
unsubscribe2();

```

### optimization

#### 1 路由异步加载

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


//区分env，组件在开发环境下是非懒加载，生产环境下是懒加载
//_import_production.js
module.exports = file => () => import('@/views/' + file + '.vue')

//_import_development.js (这种写法vue-loader版本至少v13.0.0以上)
module.exports = file => require('@/views/' + file + '.vue').default

//router/index.js
const _import = require('./_import_' + process.env.NODE_ENV)

export default new Router({
  routes: [{ path: '/login', name: '登陆', component: _import('login/index') }]
})
```

#### 2 按需引入

#### 3 模块按需加载(`LimitChunkCountPlugin`合并这些小包产生的http请求)

```javascript
//延迟加载 Vue 组件
const Hello = () => import('./components/Hello.vue')
Vue.component('xxx', Hello)

//or
const example = () => import(/* webpackChunkName: "group-example" */ '../components/example.vue')
//or
const example = resolve => require(['../components/example.vue'], resolve)

//单独封装地图组件
import China from 'echarts/map/json/china.json'
import provinceList from './provinceList.json'
// 注册地图
ECharts.registerMap('china', China)
provinceList.forEach(pro => {
  const map = require('echarts/map/json/province/' + pro.path)
  ECharts.registerMap(pro.py, map)
})
```

#### 4 Vuex按需加载

```javascript
// store.js
import { userAccountModule } from './modules/userAccount'
export const store = new Vuex.Store({
  modules: {
    user: userAccountModule,
  }
})
// test.vue
=======
#### Vuex动态加载

```javascript
>>>>>>> dev
<template>
  <div>
  	<button @click="show">show</button>
  </div>
<template/>
<<<<<<< HEAD
<script>
  const getTestModule = () => import('./testModule.js')
</script>
import adminModule from './admin.js'
export default {
  methods: {
      show() {
          getTestModule().then(testModule => {
              this.isModuleRegistered = true
              this.$store.registerModule('testModule', testModule)
              this.$store.dispatch('testModule/load')
          })
      }
  } ,
  beforeDestroy () {
      if (this.isModuleRegusterred) {
          this.$store.unregisterModule('testModule')
      }
  }
}
```

#### webpack

#####  公共库放到CDN(`webpack-cdn-plugin`)

1. webpack.config.js or vue.config.js

    ```bash
    externals: {
        vue:'Vue',
        'vue-router':'VueRouter',
        vuex:'Vuex',
        'element-ui':'ELEMENT',
        axios: 'axios'
    }
    ```

2. 对应的引用库注释掉

    ```javascript
    // import ElementUI from 'element-ui'
    // import { Button, Input, Form, FormItem, Message } from 'element-ui'
    // import 'element-ui/lib/theme-chalk/index.css'
    // Vue.use(ElementUI)
    ```

3. 卸载依赖的`npm`包，`npm uninstall axios element-ui vue vue-router vuex`

4. 项目首页引入CDN，并对CDN失效做处理 `index.html`

    ```html
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <!--<script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>-->
    <!-- 生产环境版本，优化了尺寸和速度 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
    <script>!window.Vue && document.write(unescape('%3Cscript src="/static/cdn/vue.min.js"%3E%3C/script%3E'))</script>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>!window.axios && document.write(unescape('%3Cscript src="/static/cdn/axios.min.js"%3E%3C/script%3E'))</script>

    <script src="https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.min.js"></script>
    <script>!window.VueRouter && document.write(unescape('%3Cscript src="/static/cdn/vue-router.min.js"%3E%3C/script%3E'))</script>

    <script src="https://cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js"></script>
    <script>!window.Vuex && document.write(unescape('%3Cscript src="/static/cdn/vuex.min.js"%3E%3C/script%3E'))</script>

    <script src="https://cdn.jsdelivr.net/npm/vue-i18n/dist/vue-i18n.min.js"></script>
    <script>!window.VueI18n && document.write(unescape('%3Cscript src="/static/cdn/vue-i18n.min.js"%3E%3C/script%3E'))</script>

    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script src="https://unpkg.com/element-ui/lib/umd/locale/zh-CN.js"></script>
    <script>!window.Element && document.write(unescape('%3Cscript src="/static/cdn/element.min.js"%3E%3C/script%3E'))</script>
    <script>!window.Element && document.write(unescape('%3Cscript src="/static/cdn/element-zh.min.js"%3E%3C/script%3E'))</script>


    <!-- CDN文件，配置在config/index.js下??????????????? -->
    <% for (var i in htmlWebpackPlugin.options.css) { %>
    <link href="<%= htmlWebpackPlugin.options.css[i] %>" rel="stylesheet">
    <% } %>
    <% for (var i in htmlWebpackPlugin.options.js) { %>
    <script src="<%= htmlWebpackPlugin.options.js[i] %>"></script>
    <% } %>
    ```

##### `SplitChunksPlugin`

##### webpack-chunk-name合并包

```javascript
const A1 = () => import(/* webpackChunkName: "A" */ '@/views/A1')
const A2 = () => import(/* webpackChunkName: "A" */ '@/views/A2')
const A3 = () => import(/* webpackChunkName: "A" */ '@/views/A3')
```

##### alias

```javascript
//vue.config.js or webpack.config.js
resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'),
      'img': resolve('src/assets/img'),
      'css': resolve('src/assets/css')
    }
}

//test.vue
<template>
  <div class="avatar">
    <img class="avatar-img" src="~img/avatar.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "Home"
  }
</script>

<style scoped lang="stylus">
  @import "~css/avatar";
</style>
```

##### Prerender (`prerender-spa-plugin`)

##### require.ensure

```javascript
Vue.component('asyncComponent', function (resolve, reject) {
   require.ensure([], function () {
     resolve(require('./test.vue'));
   }, 'asyncComponent'); // asyncComponent为chunkname
})
```

#### GZIP



=======
  
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
>>>>>>> dev
