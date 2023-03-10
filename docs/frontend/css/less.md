### [less](http://lesscss.org/#)
less是一种动态样式语言,属于css预处理器的范畴,它扩展了 CSS 语言,
增加了变量、Mixin、函数等特性,使 CSS 更易维护和扩展
LESS既可以在客户端上运行 ,也可以借助Node.js在服务端运行

### Less编译工具
[koala](http://koala-app.com/)

### less中的注释
- 以//开头的注释,不会被编译到css文件中
- 以/**/包裹的注释会被编译到css文件中

### grammar

#### variable
##### variable grammar
```less
@width : 100px;
.w {
width: @width;
}
```

##### variable scope
```less
@width : 1px;
.meng {
	@width : 2px;
	.long {
		@width : 90px;
		width:@width;
		@width : 22px;
	}
	width: @width;
}
```

```less
.long {
  width: @w;
  @o: 9%;
}
@w: @o;
@o: 100%;
```

##### 字符串插值
```less
@myUrl: "http://www.ibeifeng.com ";
.meng {
	background-image: url("@{myUrl}/images/bg.png");
}
```

##### selector插值
```less
@Myname: meng1314;
.@{Myname} {
  width:1000000000000px;
}
```

##### media query as variable
```less
@singleQuery: ~"(max-width: 768px)";
div {
	background-color: red;
}
@media screen and @singleQuery {
	div {
		background-color: blue;
	}
}
```

##### variable引用variable
```less
@meng : 5201314px;
@loveDay : meng;
div {
	width:@@loveDay;
}
```

#### Mixins
##### 继承类名
```less
.width {
	width:1232px;
}
#height {
	height:2980px;
}
.long {
	.width;
	.meng {
		#height;
		.width;
	}
}
```

##### 带参数混合
```less
.width (@width) {
	width:@width;
}
#height (@height) {
	height:@height;
}
.long {
	.width(20px);
	.meng {
		#height(30em);
		.width(50%);
	}
}
```

##### 隐藏属性继承
```less
.width() {
	width:1234px;
}
#height() {
	height:5678px;
}
.long {
	.width();
	.meng {
		#height();
		.width();
	}
}
```

##### 默认值混合
```less
.width (@width:2345px) {
	width:@width;
}
#height (@height:6789px) {
	height:@height;
}
.long {
	.width();
	#height(753px);
	.meng {
		#height();
		.width(951px);
	}
}
```

##### 多参数混合
- 多个参数可以使用分号戒者逗号分隔,这里推荐使用分号分隔,因为逗号有
两重含义:它既可以表示混合的参数,也可以表示一个参数中一组值的分隔
符
- 使用分号作为参数分隔符意味着可以将逗号分隔的一组值作为一个变量处
理.换句话说,如果编译器在混合的定义戒者是调用中找到至少一个分号,
就会假设参数是使用分号分隔的,所有的逗号都属亍参数中的一组值的分隔
符
- 2 个参数,每个参数都含有通过逗号分隔的一组值的情况:`.name(1, 2, 3 ;
something, else)`
- 3 个参数,每个参数叧含一个数字的情况:`.name(1, 2, 3)`
- 使用一个象征性的分号可以创建一个叧含一个参数,但参数包含一组值的混
合:`.name(1, 2, 3;)`
- 逗号分隔的一组值参数的默认值:`.name(@param1: red, blue;)`

```less
.mixin(@width) {
	width-1: @width;
}
.mixin(@width; @height:2em) {
	width-2: @width;
	height-2: @height;
}
.mixin(@width; @height; @margin: 2em) {
	width-3: @width;
	height-3: @height;
	margin: @margin @margin @margin @margin;
}
h1 {
	.mixin(red);
}
div {
	.mixin(#000,3px);
}
span {
	.mixin(#fff,3px,5px);
}
```

##### @arguments
```less
.transition (@moveStyle :all;@delayTime : 4s;@moveType : ease-in; @moveTime :
2s) {
	-webkit-transition: @arguments;
	-moz-transition: @arguments;
	-o-transition: @arguments;
	-ms-transition: @arguments;
	transition: @arguments;
}

div {
	.transition;
}
span {
	.transition (width);
}
h1 {
	.transition (height; 80s);
}
li {
	.transition (all; 80s; ease-out);
}
dd {
	.transition (color; 80s; ease-in-out; 30s);
}
```

##### !important 关键字
```less
.my (@width : 20px; @height : 50px){
	width:@width;
	height : @height;
}
.meng {
	.my;
}
.long {
	.my(40px);
}
.menglong {
	.my(234px; 299px);
}
.meng2 {
	.my !important;
}
.long2 {
	.my(40px) !important;
}
.menglong2 {
	.my(234px; 299px) !important;
}
```

##### 高级参数用法
```less
/*接受 0-N 个参数*/
.mixin1 (...) {
	padding:@arguments;
}
div {
	.mixin1(20px);
	div {
		.mixin1(20px 30px);
			div {
				.mixin1(20px 50px 203px);
				div {
					.mixin1(20px 4px 4px 8px);
				}
			}
	}
}

/*不接受任何参数*/
.mixin2 () {
	height : 131px;
}
span {
.mixin2;
}
/*接受 0-1 个参数*/
.mixin3 (@a: #fff) {
	color : @a;
}
h1 {
	.mixin3;
	h2 {
		.mixin3(#eee);
	}
}

/*接受 0-N 个参数*/
.mixin4 (@a: 1, ...) {
	margin : @arguments;
}
a {
	.mixin4;
	span {
		.mixin4(32%,223em,231px,111px);
	}
}
/*接受 1-N 个参数*/
.mixin5 (@a, ...) {
	margin : @arguments;
}
.meng {
	.mixin5(90px);
	span {
		.mixin5(32%,223em,231px,111px);
	}
}
```

##### 模式匹配与 Guard 表达式
```less
.mixin (dark, @color) {
	color: darken(@color, 10%);
}
.mixin (light, @color) {
	color: lighten(@color, 10%);
}
.mixin (@_, @color) {
	display: block;
}
@switch: light;
.long {
	.mixin(@switch, #888);
}
@switch2 : dark;
.meng {
	.mixin(@switch2, #666);
}
```

###### 也可以根据参数的数量迚行匹配
```less
.mixin (@a) {
	color: @a;
}
.mixin (@a, @b) {
	color: fade(@a, @b);
}
.meng {
	.mixin(#000);
}
.long {
	.mixin(#fff, 10%);
}
```

##### 条件混合(guarded mixins)
###### 通过 LESS 自带的函数判断
```less
.mixin (@a) when (lightness(@a) >= 50%) {
	background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
	background-color: white;
}
.mixin (@a) {
	color: @a;
}
.meng {
	.mixin(#ddd);
}
.long {
	.mixin(#555);
}
```

###### 运算符判断
Guards 支持的运算符包括:> >= = =< <.说明一下,true 关键字是唯
一被判断为真的值,也就是这两个混合是相等的

```less
@IE : true;
@w : 10;
.IE (@bTure) when (@bTure){
	*display:block;
}
.IE1 (@bTure) when (@bTure){
	*margin:0;
}
.IE2 (@bTure) when (@bTure >=0){
	*padding:@bTure;
}
.IE3 (@bTure) when (@bTure >0){
	*height:20px;
}
div {
	.IE(@IE);
	.IE1(@IE);
	.IE2(@w);
	.IE3(@w);
}
```

###### 多个条件
多个 Guards 可以通过逗号表示分隔,如果其中任意一个结果为 true,则匹配成
功
```less
@IE : true;
@w : 10;
.IE (@bTure, @b) when (@bTure), (@b < -10){
	*display:block;
}
.IE1 (@bTure, @b) when (@bTure = false), (@b < -10){
	*width:20px;
}
.IE2 (@bTure, @b) when (@bTure = true), (@b < -10){
	*height:20px;
}
div {
	.IE(@IE, @w);
	.IE1(@IE, @w);
	.IE2(@IE, @w);
}
```
###### 参数间比较
```less
@h : 20;
@w : 10;
.mixin (@h, @w) when (@h < @w){
	width:@h;
}
.mixin1 (@h, @w) when (@h > @w){
	height:@w;
}
div {
	.mixin(@h, @w);
	.mixin1(@h, @w);
}
```

###### guard 中的 and
```less
@h : 20;
@w : 10;
@true : true;
.mixin (@h, @w) when (@h > @w) and (@true) {
	width:@h;
}
div {
	.mixin(@h, @w);
}
```

###### guard 中的 not
```less
@h : 20;
.mixin (@h) when not(@h < 0) {
	width:@h;
}
div {
	.mixin(@h);
}
```

#### 嵌套语法
```less
.meng { color: red;
	.long { font:bold 12px/20px "宋体"; }
	a {
		color:#000;
		span {padding: 10px;}
		i {
			width:10px;
			em {
				height : 90px;
			}
		}
	}
}
```

#### &的用法
& 符号的使用 — 如果你想写串联选择器,而不是写后代选择器,就可以用到 &了.这点对伪类尤其有用如 :hover 和 :focus
```less
.meng {
	color: red ;
	.long { font:bold 12px/20px "宋体" ; }
		a {
			color:#000;
			&:hover {
			text-decoration:none;
			}
			&:focus {
			color:#999;
			}
		}
		.menglong {
			background:red;
			&:hover {
				background:#777;
			}
	}
}
```
#### &的高级用法
```less
.meng, .long {
	div & {
		color: black ;
	}
	& + & {
		color: red;
	}
	& ~ & {
		color: red;
	}
}
```

#### LESS 详解之命名空间
```less
@height:100px;
.meng {
	.meng_button () {
		display: block;
		border: 1px solid black;
		background-color: grey;
		&:hover {
			background-color: white;
		}
	}
	.meng_tab () {
		height:@height
		width:100px;
	}
		.meng_citation () {
		@height:200px;
		height:@height
	}
}
div {
	.meng > .meng_tab;
}
h1 {
	.meng > .meng_citation;
}
```

### function

#### String

- escape `escape('a=1') => a%3D1`
- e
- % format
- replace

#### List

- length
- extract
- range
- each

#### Math

- ceil、floor、round
- percentage
- sqrt、abs
- sin、asin、cos、acos、tan、atan
- pi、pow、mod
- min、max

#### Type

- isnumber
- isstring
- iscolor
- iskeyword
- isurl
- ispixel
- isem
- ispercentage
- isunit
- isruleset

#### Misc

- color
- convert
- data-uri
- default
- unit、getunit
- image-size、image-width、image-height
- svg-gradient

#### Color series

- rgb、rgba
- ....

#### function & operation

```less
@the-border: 1px;
@base-color: #111;
@red: #842210;
#header {
    color: @base-color * 3;
    border-left: @the-border;
    border-right: @the-border * 2;
}
#footer {
    color: @base-color + #003300;
    border-color: desaturate(@red, 10%);
}
```

### example

```html
<!-- 以下大部分使用的html -->
<div id="somediv" style="width:200px;height:50;background-color:blue">
</div>
```



#### 简单的圆角半径

```less
/* Mixin */
.border-radius (@radius: 5px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;
}
/* Implementation */
#somediv {
	.border-radius(20px);
}
```

#### 四角的半径定制

```less
/* Mixin */
.border-radius-custom (@topleft: 5px, @topright: 5px, @bottomleft: 5px,
@bottomright: 5px) {
    -webkit-border-radius: @topleft @topright @bottomright @bottomleft;
    -moz-border-radius: @topleft @topright @bottomright @bottomleft;
    border-radius: @topleft @topright @bottomright @bottomleft;
}
/* Implementation */
#somediv {
	.border-radius-custom(20px, 20px, 0px, 0px);
}
```

#### Box Shadow

```less
/* Mixin */
.box-shadow (@x: 0px, @y: 3px, @blur: 5px, @alpha: 0.5) {
    -webkit-box-shadow: @x @y @blur rgba(0, 0, 0, @alpha);
    -moz-box-shadow: @x @y @blur rgba(0, 0, 0, @alpha);
    box-shadow: @x @y @blur rgba(0, 0, 0, @alpha);
}
/* Implementation */
#somediv {
	.box-shadow(5px, 5px, 6px, 0.3);
}
```

#### Transition

```less
/* Mixin */
.transition (@prop: all, @time: 1s, @ease: linear) {
    -webkit-transition: @prop @time @ease;
    -moz-transition: @prop @time @ease;
    -o-transition: @prop @time @ease;
    -ms-transition: @prop @time @ease;
    transition: @prop @time @ease;
}
/* Implementation */
#somediv {
	.transition(all, 0.5s, ease-in);
}
#somediv:hover {
	opacity: 0.5;
}
```

#### Transform

```less
/* Mixin */
.transform (@rotate: 90deg, @scale: 1, @skew: 1deg, @translate: 10px) {
    -webkit-transform: rotate(@rotate) scale(@scale) skew(@skew)
    translate(@translate);
    -moz-transform: rotate(@rotate) scale(@scale) skew(@skew)
    translate(@translate);
    -o-transform: rotate(@rotate) scale(@scale) skew(@skew)
    translate(@translate);
    -ms-transform: rotate(@rotate) scale(@scale) skew(@skew)
    translate(@translate);
    transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
}
/* Implementation */
#someDiv {
	.transform(5deg, 0.5, 1deg, 0px);
}
```

#### Linear Gradient

```less
/* Mixin */
.gradient (@origin: to left, @start: #ffffff, @stop: #000000) {
    background-color: @start;
    background-image: -webkit-linear-gradient(@origin, @start, @stop);
    background-image: -moz-linear-gradient(@origin, @start, @stop);
    background-image: -o-linear-gradient(@origin, @start, @stop);
    background-image: -ms-linear-gradient(@origin, @start, @stop);
    background-image: linear-gradient(@origin, @start, @stop);
}
/* Implementation */
#someDiv {
	.gradient(to left, #663333, #333333);
}
```

#### Quick Gradient

```less
/* Mixin */
.quick-gradient (@origin: to left, @alpha: 0.2) {
    background-image: -webkit-linear-gradient(@origin, rgba(0,0,0,0.0),
    rgba(0,0,0,@alpha));
    background-image: -moz-linear-gradient(@origin, rgba(0,0,0,0.0),
    rgba(0,0,0,@alpha));
    background-image: -o-linear-gradient(@origin, rgba(0,0,0,0.0),
    rgba(0,0,0,@alpha));
    background-image: -ms-linear-gradient(@origin, rgba(0,0,0,0.0),
    rgba(0,0,0,@alpha));
    background-image: linear-gradient(@origin, rgba(0,0,0,0.0),
    rgba(0,0,0,@alpha));
}
/* Implementation */
#somediv {
background-color: #000000;
	.quick-gradient(to top, 0.2);
}
```

#### Webkit Reflection

```less
/* Mixin */
.reflect (@length: 50%, @opacity: 0.2){
    -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom,
    from(transparent), color-stop(@length, transparent),
    to(rgba(255,255,255,@opacity)));
}
/* Implementation */
#somediv {
	.reflect(20%, 0.2);
}
```

#### 互补色方案

```html
<!-- 以下使用的html -->
<div class="one" style="width:30px;height:100px;float:left"></div>
<div class="two" style="width:30px;height:100px;float:left"></div>
<div class="three" style="width:30px;height:100px;float:left"></div>
<div class="four" style="width:30px;height:100px;float:left"></div>
<div class="five" style="width:30px;height:100px;float:left"></div>
```



```less
/* Mixin */
@base: #663333;
@complement1: spin(@base, 180);
@complement2: darken(spin(@base, 180), 5%);
@lighten1: lighten(@base, 15%);
@lighten2: lighten(@base, 30%);
/* Implementation */
.one {background-color: @base;}
.two { background-color: @complement1;}
.three { background-color: @complement2;}
.four { background-color: @lighten1;}
.five { background-color: @lighten2;}
```

#### 颜色微调

```less
/* Mixin */
@base: #663333;
@lighter1: lighten(spin(@base, 5), 10%);
@lighter2: lighten(spin(@base, 10), 20%);
@darker1: darken(spin(@base, -5), 10%);
@darker2: darken(spin(@base, -10), 20%);
/* Implementation */
.one {background-color: @base;}
.two { background-color: @lighter1;}
.three { background-color: @lighter2;}
.four { background-color: @darker1;}
.five { background-color: @darker2;}
```

#### 递归案例

```less
//分析 1 - 奇数行为 PtzControl-*-out ,偶数行为 PtzControl-*- over
//分析 2 – 共 18 行,9 个迭代( 从 1 到 9 )
//分析 3 - background-position : A B,其中的 B -80 为一个递增引子
@cons:-80px;
.myLoop(@counter,@i:0) when (@i <@counter) {
    @c:@i+1;
    .PtzControl-@{c}-out {
    background-position: 0 @cons * (@i*2);
    }
    .PtzControl-@{c}-over {
    background-position: 0 @cons * (@i*2+1);
    }
    .myLoop(@counter,@i + 1); // next iteration
}
.myLoop(9);
```