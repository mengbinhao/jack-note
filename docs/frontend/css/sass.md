### [Sass](https://sass-lang.com/)
same as less, but more powerful than less

### Sass编译工具
[koala](http://koala-app.com/)

### Sass中的注释
- 以//开头的注释,不会被编译到css文件中
- 以/**/包裹的注释会被编译到css文件中

### Sass使用
`sass --watch input.scss output.css`

`sass --watch app/sass:public/stylesheets`

`sass --update inFolder:outFolder`

`.scss`和`.sass`两种后缀,`.sass`没分号与大括号
### grammar

#### variable
##### variable grammar
```scss
$highlight-color: #F90;
$basic-border: 1px solid black;
$plain-font: "Myriad Pro", "HelveticaNeue", "Liberation Sans";
nav { $width: 100px; width: $width; color: $nav-color; }
```

#### 嵌套语法
```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```

##### 父选择器&
& 符号的使用 — 如果你想写串联选择器,而不是写后代选择器,就可以用到 &了.这点对伪类尤其有用如 :hover 和 :focus
```scss
article a {
  color: blue;
  &:hover { color: red }
}
```
```scss
//当用户在使用IE 浏觅器时,会通过JavaScript在<body>标签上添加一个ie类名
#content aside {
  color: red;
  body.ie & { color: green }
}
```
##### 群组选择器的嵌套
**有利必有弊,你需要特别注意群组选择器嵌套生成的css.虽然 Sass让你样式表看上去很小,但实际生成css却可能非常大,返会降低网站的速度**
```scss
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
nav, aside {
  a {color: blue}
}
```

##### 子组合选择器和同层组合选择器
```scss
article section { margin: 5px }
article > section { border: 1px solid #ccc } //article下紧跟着的子section
元素中命中 section 选择器癿元素
header + p { font-size: 1.1em }//header元素后紧跟的p元
article ~ article { border-top: 1px dashed #ccc } //article后面的同层article
```

```scss
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

##### 嵌套属性
```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
```

```scss
nav {
  border: 1px solid #ccc {
    left: 0px;
    right: 0px;
  }
  background-color:#ccc;
}
```
#### import
```scss
//可以省略后缀名
@import "xxx"
```
##### 使用SASS部分文件
- Sass局部文件文件名以下划线开头.这样Sass就不会在编译时
单独编译返个文件输出css,而叧把返个文件用作导入`themes/_night-sky.scss`
- 当`@import`一个局部文件时,可以省略文件名开头的下划线`@import "themes/night-sky"`

##### 默认变量值
```scss
//若没有则其值是400px
$fancybox-width: 400px !default;
.fancybox {
  width: $fancybox-width;
}

```

##### 嵌套导入
```scss
//_blue-theme.scss
aside {
  background: blue;
  color: white;
}

//other scss
.blue-theme {@import "blue-theme"}
```

##### 原生css导入
- 被导入文件的名字以.css 结尾；
- 被导入文件的名字是一个 URL 地址(比如 http://www.sass.hk/css/css.css)
- 被导入文件的名字是 CSS 的 url()值

#### 混合器
```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```

##### 混合器css规则
```scss
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}

ul.plain {
  color: #444;
  @include no-bullets;
}
```

##### 给混合器传参
```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
a {
  @include link-colors(blue, red, green);
}
//以下可以忽略参数顺序
a {
  @include link-colors(
    $normal: blue,
    $visited: green,
    $hover: red
  );
}
```

##### 默认参数值
```scss
@mixin link-colors(
  $normal,
  $hover: $normal,
  $visited: $normal
)
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

#### inherit
```scss
.error {
  border: 1px red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

```scss
//.seriousError不仅会继承.error自身所有样式,任何跟.error有关的组合选择器样式也会被.seriousError以组合选择器的形式继承
.error a { //应用到.seriousError a
  color: red;
  font-weight: 100;
}
h1.error { //应用到 hl.seriousError
  font-size: 1.2rem;
}
```

```scss
//要继承癿不仅仅是一个类名,可以是一个id,也可以是一个元素,也可以是某个状态,任何选择器都能继承
hoverlink {
  @extend a:hover;
}
a:hover {
  text-decoration: underline;
}
```

##### 继承多个选择器
```scss
.one {
  width:100px;height:100px;
}
.two {
  /*继承的样式*/
  //@extend .one;
  //@extend .three;
  @extend .one, .three;
  /*独立的样式*/
  background:red;
  border:5px solid #000;
}
.three {
  padding:10px;
}
```
##### 继承的局限性
虽然能够继承的选择器数量很多,但是也有很多选择器并不被支持继承,如包含选择器(.one .two)或者相邻兄弟选择器(.one+.two)目前还是不支持继承.但若继承的元素是"a",恰巧"a"又有hover状态的样式,那么hover状态的样式也会被继承
```scss
.myLink {
  @extend a;
}
a {
  color: blue;
  &:hover {
    text-decoration: underline;
  }
}
```

##### 继承交叉合并选择
```scss
//父级改成相同即可.若父级不能改的话,那么就乖乖的再写一遍
写一遍
.meng a {
  font-weight:bold;
}
.long .link {
  @extend a;
}
```

##### 继承带%的东西
```scss
#meng a%long {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
.notice {
  @extend %long;
}
```

##### 继承在指令中的作用域
```scss
.one {
  height:300px;
}
//wrong
@media print {
  .two {
    @extend .one;
    width:300px;
  }
}

//right
@media print {
  .one {
    height:300px;
  }
  .two {
    @extend .one;
    width:300px;
  }
}
```
### function
#### Strings
- quote
```scss
//wrong
//去掉空格or加上引号
.test1 {
  content: quote(Hello Sass);
}
```
- unquote

#### Numbers
- percentage `percentage(2px / 10px)单位必须一致`
- round
- value
- ceil
- floor
- abs
- min
- max

#### Lists
- length
- nth
- join
- append
- zip
- index

#### Introspection
- type-of
- ...

#### Colors
- rgb
- rgba
- mix
- ...

#### Customize
```scss
//去掉一个值的单位,如 12px => 12
@function stripUnits($number){
  @return $number / ($number * 0 + 1);
}
//eg. double(5px) => 10px
@function double($n) {
  @return $n * 2;
}
```

### Sass高级用法
#### 条件
```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if (not 1 + 1 == 2) { border: 3px dotted; }
  @if (5 > 3 & 3 > 2) { border: 3px dotted; }
  @if (5 > 3 and 3 > 2) { border: 3px dotted; }
  @if (5 > 3 or 31 < 2) { border: 3px dotted; }
}

@function myColor($color) {
  @if lightness($color) > 30% {
    background-color: #000;
  } @else {
    background-color: #fff;
  }
}

.test {
  background-color:myColor(red)
}
```
#### 循环
```scss
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

```scss
@each $member in a, b, c, d {
  .#{$member} {
    background-image: url("/image/#{$member}.jpg");
  }
}
```