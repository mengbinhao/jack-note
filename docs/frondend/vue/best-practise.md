1. v-model (1.x 双向、2.x 语法糖)
    1. 其实是两个单向绑定模拟双向绑定
    2. 实质 -> <input :value="user.name" @input="user.name = $event">
    3. 单向绑定优点
        1. 数据拥有者清楚地知道数据变化的原因和时机（因为是它自己操作数据的）
        2. 数据拥有者可以阻止数据变化
        3. 这些都是在双向绑定中很难做到的
    ![](../images/vue-1.jpg)

2. .sync
```javascript
Vue.component('child',{
  props: ['selected'],
  template: `
    <div>
      selected: {{selected}}
      <hr>
      <button @click="$emit('update:selected',1)">1</button>
      <button @click="$emit('update:selected',2)">2</button>
    </div>
  `
})
var vm = new Vue({
  el: '#app',
  data:{
    value:2
  },
  template:`
  <div>
    爸爸
    <div style="border: 1px solid red;">
    <child :selected="value" @update:selected="selected=$event"></child>
    //同上
    <child :selected.sync="value"></child>
    </div>
  </div>
`
})
```

3. vue没有事件冒泡