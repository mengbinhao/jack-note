### CSS 属性

- font

  - font-size、font-family、font-weight、font-style

- color

- text-decoration

  - text-transform

- text-align

- vertical-align (图片、表格)

- line-height

  - letter-spacing

- height

- weight

- border

  - border-width、border-style、border-color

- margin、padding

- background-color

- background-image、background-repeat、background-position

  - background-attachment

- list-style-type

  - border-collapse

- cursor

- float、clear

- position、top、bottom、left、right
  - z-index

### BFC(Block formatting context)

- 触发
  - 根元素
  - float非none    
    - **不完全脱离文档流**  box中的文字会让，box范围不让
    - float的破坏性主要是指它会使父容器的**高度塌陷**
      - 父元素设置高度
      - 父元素BFC
      - 兄弟元素clear
      - 父元素伪元素
  - position：absolute、fixed
  - display：flex、inline-block 等
  - overflow非visible的块元素
  - 。。。
- 解决问题
  - 父子外边距合并,父元素设置BFC
  - 兄弟外边距合并，给一个兄弟添加父容器并设置BFC或伪元素
  - 清除浮动
  - 阻止元素被浮动元素覆盖

### position

- 常规
- absolute
  - 脱离原来位置进行定位
  - 相对于最近的有定位的父级进行定位，若没有则相对于文档进行定位
  - 使用场景：鼠标提示：悬浮在上方，鼠标经过出现，鼠标离开消失
- relative
  - 保留原来位置进行定位（仍处于标准文档流）
  - 相对于自己原来的位置进行定位
  - 使用场景：**给 absolute 元素做爸爸**
- fix
  - 参照浏览器窗口
  - 使用场景：广告窗口，回到顶部按钮

### middle

- 水平居中

  - 先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中

- 垂直居中

- 水平&垂直居中

  - 单行文本水平&垂直居中

    ```css
    div {
      line-height：200;
      height：200;
      text-align:center;
    }
    ```

  - 仅居中元素定宽高

    - absolute + 负 margin
    - absolute + margin auto
    - absolute + calc

  - 居中元素不定宽高

    - absolute + transform
    - flex
    - grid

### layout

### 动画

- animation
  - `animation: name duration timing-function delay iteration-count direction fill-mode play-state`
- transition(类似 animation，需条件触发、一次性、就 2 帧)
  - `transition: property duration timing-function delay`
- transform（只能作用在块级元素上）
  - translate、translateX、translateY、translateZ、translate3d
  - scale 同上
  - rotate 同上
  - skew 同上
  - 组合

### Media Query

- max-width、min-width

- only、and、or、not 操作符

- `<link rel="stylesheet" media="(max-width: 640px)" href="max-640px.css">`

- ```css
  @media (max-width: 640px) {
  	/*当视窗宽度小于或等于 640px 时，这里的样式将生效*/
  }
  ```

- vw + rem
