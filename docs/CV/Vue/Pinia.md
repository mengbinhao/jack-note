### 对比Vuex

1. Vue3、Vue2都支持
2. 抛弃Mutations、modules，只有state、getters、action
3. 完整支持TS
4. 轻巧、代码简洁

### Get Started

1. install Pinia

   ```bash
   npm init vite
   npm i pinia
   ```

2. use in Vue根组件(main.js)

   ```javascript
   import { createPinia } from 'pinia'
   createApp(App).use(createPinia()).mount('#app')
   ```

3. define store/xxx.js

   ```javascript
   import { defineStore } from 'pinia'
   import { useOtherStore } from './other'
   
   export const useCounterStore = defineStore('counter', {
   	state: () => {
   		return {
   			helloWorld: 'helloWorld',
   			count: 0,
   			phone: 18088881234,
   		}
   	},
   	//cache
   	getters: {
   		phoneHidden() {
   			return this.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
   		},
   	},
   	actions: {
   		changeState() {
   			this.count++
   		},
   		getOtherStore() {
   			console.log(useOtherStore().prop)
   		},
       async fillData() {
         this.products = (await import("@/data/product.json")).default
       }
   	},
   })
   ```

### 修改state五种方式

```javascript
<template>
  <div><button @click="handler">change state - 1</button></div>
  <div><button @click="handlerPatchObj">change state - patch</button></div>
  <div><button @click="handlerPatchFun">change state - method</button></div>
  <div><button @click="store.changeState()">change state - 4</button></div>
  <div><button @click="handlerGetters">change getters</button></div>
  <div><button @click="handlerOtherStore">get other state</button></div>
</template>

<script setup>
import { useCounterStore } from '../store/counter'
const counter = useCounterStore()
const handler = () => {
  counter.count++
}
const handlerPatchObj = () => {
  counter.$patch({
    count: counter.count + 1,
    helloWorld: counter.helloWorld === 'Jack' ? 'helloWorld' : 'Jack'
  })
}

const handlerPatchFun = () => {
  counter.$patch((state) => {
    state.count++,
    state.helloWorld = main.helloWorld === 'Jack' ? 'helloWorld' : 'Jack'
  })
}

const handlerGetters = () => {
  counter.phone = '13355558888'
}

const handlerOtherStore = () => {
  counter.getOtherStore()
}

const five = () => {
  counter.$state = {
    //...
  }
}
</script>
```

### $reset、$subscribe、$onAction

### 注意

1. 组件里**解构**后就丢失响应,需使用storeToRefs

   ```javascript
   <template>
     <div>{{ count }}</div>
   </template>
   
   <script setup>
   import { useCounterStore } from '../store/counter'
   import { storeToRefs } from 'pinia'
   const store = useCounterStore()
   const { count } = storeToRefs(store)
   </script>
   ```

2. use mapWritableState in stead of mapState

