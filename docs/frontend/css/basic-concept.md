### 引入方式
    - 外部链接 `<link ref="stylesheet" type="text/css" href="">`
    - 页面css
    - 行间

### 只有一种快注释

    /*   xxxxxxxxxxxx   */

### 标签类型
- 凡是带有inline的都有文字特性  eg：img   4px
- 行级元素只能嵌套行级元素
- 块级元素可以嵌套任何元素
- 设置了float和position:absolute后,该元素内部转换成inline-block

> 规定：
> p不能套div
> a不能套a

1. 行级元素=内联元素     `display:inline`
    - 内容就是元素所占位置
    - 不可通过css改变宽高 `span em strong a del input`

2. 块级元素    `display:block`
    - 独占一行
    - 默认显示在左上角
    - 可以通过css改变宽高 `div  p  ul li ol form`

3. 行级块元素     `display: inline-block`
    - 内容就是大小
    - 可以改变宽高
    `img  -->只设置宽或高另一项等比例缩放`

### 盒子模型 (box-sizing)
- content-box : border + padding + width/height + margin (向外扩展)
- border-box  : 尺寸width 向内扩展