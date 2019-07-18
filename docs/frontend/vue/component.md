#### 1 局部/全局注册

> 全局加载的组件可以从应用程序中的任何模板访问。它限制了将全局组件导入子组件的次数。它会使你的应用程序膨胀，即使不使用，它仍然会包含在你的 Webpack 构建中。
>
> 局部加载组件使你能够隔离组件，并且只在必要时加载它们。当与 Webpack 结合使用时，你可以只在使用组件时延迟加载它们。这使你的应用程序初始文件较小，并减少了初始加载时间。

```javascript
import Vue from 'vue';
import Editor from './componetns/Editor.vue'
 
Vue.component('editor', Editor);
```

```javascript
<template>
  <section>
    <editor></editor>
  </section>
</template>
 
<script>
import Editor from './Editor'
export default {
  name: 'dashboard',
  components: {
    Editor
  }
}
</script>
```

#### 2 延迟加载/异步组件

> 使用 Webpack 的动态导入来延迟加载组件。Vue 支持在渲染时延迟加载组件和代码分割。这些优化让你可以只在需要时加载组件代码，从而减少 HTTP 请求、文件大小，并自动提高性能。这个特性的重要之处在于，它既可以处理全局加载的组件，也可以处理局部加载的组件。

```javascript
import Vue from 'vue';
Vue.component('editor', () => import('./componetns/Editor.vue'))

Vue.component('asyncComponent', function(resolve, reject) {
  require(['./test.vue'], resolve)
})
```

```javascript
<template>
  <section>
    <editor></editor>
  </section>
</template>
 
<script>
export default {
  name: 'dashboard',
  components: {
    'Editor': () => import('./Editor')
      //asyncComponent: (resolve, reject) => require(['./test.vue'], resolve)
  }
}
</script>
```

#### 3 props对象写法

```javascript
oneProp: {
    type: Object,
    required: true,
    default: function () {
       return { message: 'hello' }
    }，
    validator: function (value) {
       return ['success', 'warning', 'danger'].indexOf(value) !== -1
    }
}
```

####  4 `$emit` 触发自定义事件(单向数据流)

```javascript
//child.vue
<template>
  <section>
    <button @click="onClick">Save</button>
  </section>
</template>
 
<script>
export const SAVE_EVENT = 'save';
export default {
  name: 'triggerEvent',
  methods: {
    onClick() { 
      this.$emit(SAVE_EVENT);
    }
  }
}
</script>


//parent.vue
<template>
  <section>
  <p v-show="showSaveMsg">Thanks for Listening for the saved event</p>
  <trigger-event @save="onSave"></trigger-event>
  </section>
</template>
 
<script>
export default {
  name: 'TriggerEvent',
  data(){
    return {
      showSaveMsg: false
    }
  },
  components:{
    TriggerEvent: () => import('./TriggerEvent')
  },
  methods: {
    onSave() { 
        this.showSaveMsg = true;
    }
  }
}
```

#### 5 在组件中修改 Props

```javascript
//确实需要这些更新，则使用computed属性来组合值
<template>
  <main>
    <section>
      <h2>Non Reactive</h2>
      <p>{{ localFirstName }}</p>
      <button @click.prevent="changeLocalFirstName">Update First Name</button>
    </section>
    <section>
      <h2>Reactive List</h2>
      <ol>
        <li v-for="item in itemsList" :key="item">{{ item }}</li>
      </ol>
    </section>
  </main>
</template>
 
<script>
export default {
  name: "FullName",
  props: {
    firstName: {
      type: String,
      default: "Mike"
    },
    items: {
      type: Array,
      default() {
        return ["lemons", "oranges"];
      }
    }
  },
  computed: {
    //挂载到组件实例上
    itemsList() {
      return [...this.items, ...this.localItems];
    }
  },
  data() {
    return {
      localItems: ["mangos", "apples"],
      localFirstName: this.firstName //挂载到组件实例上
    };
  },
  methods: {
    changeLocalFirstName() {
      this.localFirstName = "Jackson";
    }
  }
};
</script>
 
<style scoped>
</style>
```

#### 6 将组件分解为逻辑块

> 1 解组件的第一种方法是基于数据变化率。如果数据在组件的某个部分始终在变化，而在其他部分没有变化，那么它可能应该自成组件。这样做的原因是，如果你的数据 /HTML 在模板的一个部分中不断变化，那么整个模板都需要检查和更新。但是，如果将相同的 HTML 放入它自己的组件中，并使用 props 传递数据，那么当它的 props 发生更改时，只有那个组件才会更新。
>
> 2 另一种从逻辑上分解组件的方法是重用。如果你的 HTML、图形或功能在整个应用程序中始终如一地使用，比如按钮、复选框、徽标动画、操作调用或文本简单变化的图形，那么它们就是可以隔离到一个可重用的新组件中的很好的候选项。可重用组件具有易于维护的潜在好处，因为你可以更改一个组件，而不必在代码库中查找替换和更改多个地方。

#### 7 Test Utils Mount 与 Shallow Mount

> 有两种方法可以在 Vue tests utils 中创建和引导组件。一个是 mount，另一个是 shallow mount
>
> 当你希望在组件及其子组件之间进行共生测试时，mount 技术非常有效。它让你可以测试父组件是否正确地与子组件进行预期的交互。相反，正如名称所示，shallow mount 只实例化父组件并在完全隔离的情况下渲染它，而不考虑它的任何子组件。
