[git simple mvvm](https://github.com/DMQ/mvvm)

1. 数据代理
通过一个对象代理另一个对象中属性的操作
2. 模板解析
3. 数据绑定

Dep vs Watcher
- 什么关系?
  - 多对多
  - data属性->Dep->n个Watcher(模板中多个表达式使用了此属性 {{a}} / v-text="a")
  - 表达式->Watcher->n个Dep(多层表达式子a.b.c)
- 如何建立的?