### 水平居中

#### 行内元素

`text-align:center; `

#### 块级元素

```css
.div {
  width: 50%;
  margin: 0 auto;
}
```

### 垂直居中

#### 单行文字

```css
.font-ct {
  height: 40px;
  line-height: 40px;
}
```

#### 多行文字（也适用于单行文字）

```css
.font-ct {
  height: 100px;
  display:table-cell;
  vertical-align:middle;
}
```

#### image

```html
<!-- 浏览器的兼容问题 -->
<img align="absmiddle" src="">
```

### 仅居中元素定宽高适用

```css

absolute + 负margin
absolute + margin auto
absolute + calc
```

### 居中元素不定宽高

```css
absolute + transform
line-height
flex
grid
```

```html
<div class="wp">
    <div class="box size">123123</div>
</div>
```

```css
/* 公共代码 */
.wp {
    border: 1px solid red;
    width: 300px;
    height: 300px;
}

.box {
    background: green;
}

.box.size{
    width: 100px;
    height: 100px;
}
```
#### absolute + 负margin(已知子元素宽高)

```css
.wp {
    position: relative;
}
.box {
    position: absolute;;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```


#### absolute + margin auto(已知子元素宽高)

```html
<div class="wp">
    <div class="box size">123123</div>
</div>
```

```css
.wp {
    position: relative;
}
.box {
    position: absolute;;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

#### absolute + calc

```html
<div class="wp">
    <div class="box size">123123</div>
</div>
```

```css
.wp {
    position: relative;
}
.box {
    position: absolute;;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
}
```

#### absolute + transform

```html
<div class="wp">
    <div class="box">123123</div>
</div>
```

```css
.wp {
    position: relative;
}
.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

#### line-height

```html
<div class="wp">
    <div class="box">123123</div>
</div>
```

```css
.wp {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.box {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left; /* 修正文字 */
}
```

#### flex

```html
<div class="wp">
    <div class="box">123123</div>
</div>
```

```css
.wp {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

#### grid

```html
<div class="wp">
    <div class="box">123123</div>
</div>
```

```css
.wp {
    display: grid;
}
.box {
    align-self: center;
    justify-self: center;
}
```

### 总结

- PC端有兼容性要求，宽高固定，推荐absolute + 负margin
- PC端有兼容要求，宽高不固定，推荐css-table
- PC端无兼容性要求，推荐flex
- 移动端推荐使用flex

| 方法                   | 居中元素定宽高固定 | PC兼容性                     | 移动端兼容性      |
| ---------------------- | ------------------ | ---------------------------- | ----------------- |
| absolute + 负margin    | 是                 | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| absolute + margin auto | 是                 | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| absolute + calc        | 是                 | ie9+, chrome19+, firefox4+   | 安卓4.4+, iOS6+   |
| absolute + transform   | 否                 | ie9+, chrome4+, firefox3.5+  | 安卓3+, iOS6+     |
| writing-mode           | 否                 | ie6+, chrome4+, firefox3.5+  | 安卓2.3+, iOS5.1+ |
| line-height             | 否                 | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| table                  | 否                 | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| css-table              | 否                 | ie8+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| flex                   | 否                 | ie10+, chrome4+, firefox2+   | 安卓2.3+, iOS6+   |
| grid                   | 否                 | ie10+, chrome57+, firefox52+ | 安卓6+, iOS10.3+  |