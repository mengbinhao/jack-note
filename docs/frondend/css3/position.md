### float

#### 1.介紹
**让block元素无视float元素，让inline元素像流水一样围绕着float元素实现浮动布局**

#### 2.特性
- 包裹性
- 高度塌陷
- 块状化
- 没有任何margin合并

##### 2.1 包裹性
所谓"包裹性"，其实是由"包裹"和"自适应"两部分组成

```css
.father{
    border: 1px solid deeppink;
    width: 200px;
}
.son {
    float: left;
    font-size: 0;
    border: 1px solid blue;
    padding: 5px;
}
.father img {
    width: 128px;
}
```
1. 包裹。本例中将浮动元素父元素宽度设置为200px，浮动元素的子元素是一个128px宽度的图片，则此时浮动元素宽度表现为"包裹"，也就是里面图片的宽度128px。

```html
<div class="father">
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
</div>
```
![](../images/position-1.png)

2）自适应性。在浮动子元素的中增加一些文字：
```html
<div class="father">
    <div class="son">
        <img src="../../lib/img/mm1.png">
        <span style="font-size: 12px">美女1，美女2，美女3，美女4，美女5，美女6，后宫1，后宫2，后宫3，后宫</span>
    </div>
</div>
```
此时，浮动元素宽度就自适应父元素的200px宽度，最终的宽度表现也是200px。如下图所示：

![](../images/position-2.png)

##### 2.2 高度塌陷
float属性有一个著名的特性：**会让父元素的高度塌陷**。如章节2.1中的效果图，父元素div的高度并没有被子元素撑开(粉色区域)。float给`div.son`施了个障眼法，让该元素的高度塌陷为0了，这样外层div计算高度时，认为`div.son`的高度为0，相当于`div.son`的content的高度为0，则`div.father`认为其没有子元素，所以产生了高度塌陷。后文中将讲述如何解决高度塌陷的问题。

##### 2.3 块状化
块状化的意思是，一旦元素float的属性不为none，则其display计算值就是block或者table

```javascript
var span = document.createElement('span')
document.body.appendChild(span)
console.log('1.' + window.getComputedStyle(span).display)
// 设置元素左浮动
span.style.cssFloat = 'left'
console.log('2.' + window.getComputedStyle(span).display)
```

这里的块状化意思是可以像block元素一样设置宽和高，并不是真正的块元素。
因此，没有任何理由出现下面的样式组合：
```css
span{
    display: block; /* 多余 */
    float: left;
}
span{
    float: left;
    vertical-align: middle; /* 多余 */
}
```
##### 2.4 没有任何的margin重叠
在这里，我们将`.son`类增加`margin:10px`样式，在浏览器中查看实际效果。

```html
<div class="father">
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
</div>
```
我们增加.son类的margin为10px，在浏览器中查看相邻的.son元素的空白区域的高度是20px，可以发现设置了float属性的元素没有任何的margin重叠，这和普通的元素margin重叠不一样。

![](../images/position-3.png)

> 什么是外边距(margin)重叠
> 外边距重叠是指两个或多个盒子(可能相邻也可能嵌套)的相邻边界(其间没有任何非空内容、补白、边框)重合在一起而形成一个单一边界

```html
<style>
    *{
        margin:0;
        padding: 0;
    }
    .divout{
        width: 100px;
        height: 100px;
        background: yellow;
        margin-bottom: 50px;
        border: 1px solid black;
    }
    .divout1{
        width:50px;
        height: 50px;
        background: yellow;
        margin-top: 80px;
            /*float:left;*/
        /*position:absolute;*/
        border: 1px solid black;
    }
</style>
<body>
    <div class="divout">
    </div>
    <div class="divout1">
    </div>
</body>
```

#### 3.float与流体布局
使用float可以通过破坏正常的文档流实现CSS环绕，但是却带来了**高度塌陷**的问题！然而我们可以利用float破坏正常文档流的特性实现一些常用的布局：

- 文字环绕变身-中间内容居中，左中右布局

```html
<div class="box">
    <a href="javascript:;" class="fl">左青龙</a>
    <a href="javascript:;" class="fr">右白虎</a>
    <h3 class="text-center">标题</h3>
</div>
```

```css
.box{
    background-color: #f5f5f5;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.text-center{
    text-align: center;
}
```
![](../images/position-4.png)


- 文字环绕的衍生-单侧固定

```html
<div class="father">
    <img src="../../lib/img/008.JPG">
    <p class="girl">美女1，美女2，美女3，美女4，美女5，美女6，后宫1，后宫2，后宫3，后宫4，后宫5，后宫6</p>
</div>
```

```css
.father{
    border: 1px solid #444;
    overflow: hidden;
}
.father > img {
    width: 60px; height: 64px;
    float: left;
}
.girl {
    /* 环绕和自适应的区别所在 */
    margin-left: 70px;
}
```
和文字环绕效果相比，区别就是`.girl`多了一个`margin-left: 70px`，同时图片的宽度设置60px，因此不会发生文字环绕的效果。这里，我们也可以不使用`margin-left`，改用`border-left`或者`padding-left`都可以达到改变content box的尺寸，从而实现宽度自适应布局效果。

![](../images/position-5.png)

#### 4.float的克星

##### 4.1 clear属性

```css
clear: none | left | right | both
```
如果单从字面上的意思来理解，clear:left应该是**清除左浮动**，clear:right应该是**清除右浮动**，实际上，这种说法是有问题的，**因为浮动一直还在，并没有清除！只能清除浮动带来的影响**。

官方对clear属性的解释是："**元素盒子的边不能和前面的浮动元素相邻**"。注意这里的"前面的"3个字，也就是clear属性对"后面的"浮动元素是不闻不问的。clear属性只能清除元素的自身，不能影响其他的元素。接着看下面的这个例子：

```html
<div class="box1"></div>
<div class="box2"></div>
```

```css
.box1 {
    float: left;
    width: 100px;
    height: 60px;
    padding: 10px;
    border: 3px solid black;
    background: url("../../lib/img/mm1.png") center no-repeat;
}
.box2 {
    border: 3px solid red;
    padding:10px;
    width:100px;
    height: 60px;
    background: url("../../lib/img/mm2.jpg") center no-repeat;
}
```

![](../images/position-6.png)

如上图所示，box1元素为设置了左浮动，已经脱离了正常的文档流，所以box2能够在box1的底层显示。如果想让box2能够换行排列，则只需要在`.box2`类中增加`clear:left`样式即可。如下图所示：

![](../images/position-7.png)

##### 4.2 clear属性的不足

clear属性只对块级元素有效，但是::after等伪元素默认都是内联水平，因此，在实际工作中，我们常常使用下面的代码来清除浮动带来的影响：

```css
.clear::after{
    content: "";
    display: table;/*也可以是'block'或者是'list-item'*/
    clear: both;
}
```
由于`clear:both`作用的本质是让自己不和float元素在一行显示，并不是真正意义上的清除浮动，因此float元素有一些不好的特性依然存在，表现在：

- 如果clear:both元素前面的元素就是float元素，则设置margin-top无效

```html
<div class="box1"></div>
<div class="box2"></div>
```

```css
.box1 {
    float: left;
    width: 100px;
    height: 60px;
    padding: 10px;
    border: 3px solid black;
    background: url("../../lib/img/mm1.png") center no-repeat;
}
.box2 {
    clear: both;
    margin-top: -20px;
    border: 3px solid red;
    padding:10px;
    width:100px;
    height: 60px;
    background: url("../../lib/img/mm2.jpg") center no-repeat;
}
```
在本例中，设置.box2中的margin-top没有任何的效果，如下图所示：

![](../images/position-8.png)

- `clear:both`后面的元素依旧可能会发生文字环绕现象。

```html
<div class="father">
    <div class="float">
        <img src="../../lib/img/mm1.png">
    </div>
    <p>美女1，美女2，美女3，美女4，美女5，美女6，后宫1，后宫2，后宫3，后宫</p>
</div>
<div>我要美女1，我还要美女2</div>
```

```css
.father{
    border: 1px solid deeppink;
    width: 500px;
    height: 70px;
}
.father:after{
    content: '';
    display: table;
    clear: both;
}
.float{
    float: left;
}
.father img {
    width: 60px;
    height: 70px;
}
```
在本例中，设置`clean:both`来阻止浮动对后面元素的影响，但是最后的错位效果依然发生了（可以设置`.father`的字体大小为0，然后设置p标签的字体大小解决错误的问题）。

![](../images/position-9.png)

由此可见，clear:both只能在一定程度上消除浮动的影响，要想完美去除浮动元素的影响，借助其他的手段——BFC

#### 5.CSS世界的结界——BFC

##### 5.1 BFC的定义
BFC全称`block formatting contex`t，中文为**块级格式化上下文**。BFC的表现原则为：如果一个元素具有BFC，那么它的内部子元素再怎么翻江倒海，都不会影响外部的元素。因此，BFC元素是不可能发生margin重叠的，另外，BFC元素也可以用来清除浮动的影响。

那么满足什么条件才会有BFC呢？只要满足下面任意一个条件就会触发BFC:

- html根元素；
- float的值不为none；
- overflow的值为auto、scroll或者hidden；
- display的值为table-cell、table-caption和inline-block中的任何一个；
- position的值不为relative和static；
触发BFC后，就不需要使用clear:both属性去清除浮动的影响。

##### 5.1 BFC的作用
- 清除margin重叠

```html
<div class="parent">
    <p>item 1</p>
    <p>item 2</p>
    <p>item 3</p>
    <p>item 4</p>
</div>
```

```css
.parent{
    width: 300px;
    background-color: black;
    overflow: hidden;
}
p {
    background-color: white;
    margin: 10px 0;
    text-align: center;
}
```
在这种情况下，出现了margin重叠的效果。如下图所示：
![](../images/position-10.png)

**利用BFC能消除margin重叠，谨记：只有当元素在同一个BFC中时，垂直方向上的margin才会clollpase**。如果它们属于不同的BFC，则不会有margin重叠。因此我们可以再建立一个BFC去阻止margin重叠的发生。所以为了让他们的margin变成20px，我们只需要用div,建立一个BFC，令p元素处于不同BFC即可。请看例子：

```html
div class="parent">
    <p>item 1</p>
    <p>item 2</p>
    <div style="overflow: hidden">
        <p>item 3</p>
    </div>
    <p>item 4</p>
</div>
```
![](../images/position-11.png)

- 清除高度塌陷的问题
在上面的章节中，如果子元素设置浮动属性，则父元素就会出现高度塌陷的问题。在这里，我们可以借助BFC消除高度塌陷的问题了，请看下面的这个例子：

```html
<div style="border: 1px solid deeppink;width: 200px; overflow: hidden">
    <img src="../../lib/img/mm1.png" style="border: 1px solid blue; float: left">
</div>
```
从下图中可以看到，设置`overflow:hidden`样式后就产生了BFC，根据BFC的表现规则，内部元素的样式不会影响外部元素的样式，因此没有出现高度塌陷的问题。

![](../images/position-12.png)

- 自适应布局（阻止文本换行）

```html
<div class="parent">
    <img src="../../lib/img/mm1.png">
    <p class="girl">美女1,美女2,美女3,美女4,美女5,美女6,后宫1,后宫2,后宫3,后宫4,</p>
</div>
```

```css
.parent{
    border: 1px solid deeppink;
    width: 200px;
    font-size: 0;
}
.parent img{
    border: 1px solid blue;
    float: left;
}
.girl{
    /*overflow: hidden;*/
    font-size: 12px;
    background-color: #cdcdcd;
}
```
如果我们给.girl元素设置具有BFC特性的属性，如：`overflow: hidden`就可以实现更健壮、更智能的自适应布局。

![](../images/position-13.png)

这里的.girl元素为了不和浮动元素产生任何交集，顺着浮动边缘形成自己的封闭上下文。

普通元素在设置了`overflow:hidden`后，会自动填满容器中除了浮动元素意外的剩余空间，形成自适应效果，这种自适应布局和纯流体布局相比：

- 自适应内容由于封闭而更加健壮，容错性更强；
- 自适应内容能够填满除浮动元素以外区域，不需要关心浮动元素宽度。

### absolute


### relative