[git simple mvvm](https://github.com/DMQ/mvvm)

1. 数据代理
- 通过一个对象代理对另一个对象中属性的操作
- vue数据代理: 通过`vm`对象来代理`data`对象中所有属性的操作,更方便的操作`data`中的数据
- 基本实现流程
    - 通过`Object.defineProperty()`给`vm`添加与`data`对象的属性对应的属性描述符
    - 所有添加的属性都包含`getter/setter`
    - `getter/setter`内部去操作`data`中对应的属性数据
1. 模板解析
2. 数据绑定

Dep vs Watcher
- 什么关系?
  - 多对多
  - data属性->Dep->n个Watcher(模板中多个表达式使用了此属性 {{a}} / v-text="a")
  - 表达式->Watcher->n个Dep(多层表达式子a.b.c)
- 如何建立的?