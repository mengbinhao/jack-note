1. 语义化标签

          header  section article footer aside ....

          兼容性IE8:
                     solution1：  display:block
                                  document.createElement("header")

                     solution2：  html5shiv.js

    完美解决多余请求
    ```javascript
    <!--[if lte IE 8]>
        <script src='xxxx'></script>
    <![endif]-->
    ```

2. 多媒体

     兼容性写法
     ```javascript
     <video>
        <source src="1.ogg"></source>
        <source src="2.mp4"></source>
     </video>
     ```

3. 表单增强
    - 新的 form 属性：
        - autocomplete
        - novalidate
    - 新的 input 属性：
        - autocomplete
        - autofocus
        - form     值为form的id,
        - list
        - min, max 和 step
        - multiple
        - pattern (regexp)
        - placeholder
        - required

4. DOM增强
   ```javascript
    document.querySelector("div p") //只获取第一个
    document.querySelectorAll("div p")
    document。getElementsByClassName(styleName)
    classList
        add(styleName)
        remove(styleName)
        toggle(styleName)
        contains(styleName)
    dataset
   ```

5. 文件读取
   ```javascript
    let file = document.querySelector('#f1');
        file.onchange = function() {
    		let fRead = new FileReader();
                fRead.readAsText(file.files[0]);
                fRead.onload = function () {
                document. querySelector('.cls').src = this.result;
            }
        }
    ```
6. 地理定位(走google需翻墙)

7. 本地存储
    - sessionStorage   浏览器窗口关闭 5m 同窗口可共享
    - localStorage 永久 20m 多窗口共存

8. canvas

9. css3
    - 样式操作
    ```css
    //图片从哪显示
    background-origin：border-box / padding-box / content-box
    //图片在哪显示
    background-clip: border-box / padding-box / content-box

    background-size: contains / cover

    border-radius:
    //水平  垂直 模糊度  阴影颜色  inset内部阴影
    box-shadow: 10px 20px 5px blue inset;
    //选择图片作为边框背景
    border-image-source:
    //切割图片
    border-image-slice
    border-image-repeat

    //水平  垂直 模糊度  阴影颜色
    text-shadow
    ```

    - [selector](../css/selector.md)
    > 元素选择、关系选择、属性选择、伪类、伪元素)

        ```
        p~ul
        a[href^='E']
        a[href$='E']
        a[href*='E']
        p:target
        p::selection
        div:first-letter
        div:first-line
        li:first-child
        li:last -child
        li:nth-child(3)
        li:nth-last-child(3)
        li:nth-child(odd)
        li:nth-child(even)
        ```

    - 颜色渐变(线性/径向)
        ```css
        border-image: linear-gradient(to right, yellow, green)
        border-image: linear-gradient(0deg/90deg, yellow, green)
        border-image: radial-gradient(100 at center, red, green)
        border-image: radial-gradient(100 at 10px 150px, red 10%, green 50%)
        ```

    - 2D和3D转换
        ```css
        transform: translate(100px, [100px])
        transform: rotate(60deg)
        transform: scale(2, [2])
        transform: skew(30deg, [30deg])

        prespective: 1000px //透视效果
        transform: translateX(100px)
        transform: translateY(100px)
        transform: translateZ(100px)
        rotateX / rotateY / rotateZ
        scaleX / scaleY / scaleZ
        skewX / skewY
        ```

    - 动画
        ```css
         //过渡
        transition-property: all | width(other);
        transition-delay: 1s;
        transition-duration: 1s;
        transition-timing-function: linear;

        animation-name: rotate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;
        animation-delay: 1s;
        animation-fill-mode: forwards;
        animation-play-state: paused;

        @keyframnes rotate {
            from {
                transform: rotateZ(0deg);
            }
            to {
                transform: rotateZ(360deg);
            }
        }

        @keyframnes rotate {
            0% {
            }
            20% {
            }
            100% {
            }
        }
        ```

    - 网页布局
        ```css
        //父元素设置为flex
        display: flex
        //主轴对齐方式
        justify-content: flex-end | flex-start | center | space-between | space-around
        //主轴水平反转
        flex-direction: row-reverse | row | column | column-reverse
        //侧轴对齐方式
        align-items:flex-end | flex-start | center | stretch
        //子元素换行
        flex-wrap: wrap | nowrap | wrap-reverse
        //子元素换行后重新设置主轴方向
        align-content: flex-start
        //设置子元素
        flex: 1
        ```









