### 1.CSS变量和预处理器中的变量有什么不同?

CSS变量是浏览器中直接可用的CSS属性，而预处理中的变量是用于编译成常规的CSS代码，浏览器其实对它们一无所知.

这意味着，你可以在样式表中，在内联样式中，在SVG的标签中直接更新CSS变量，甚至可以在运行时用JavaScript直接修改它。而你是无法对预处理器中的变量做上面这些操作的.

### 2.CSS变量：语法

```css
//区分大小写
//scope
:root {
    --my-cool-background: #73a4f4;
}
#foo {
    background-color: var(--my-cool-background);
    color: var(--main-color, #333);	 //default value
}
```

### 3.涉及到计算

```css
.bubble {
  --direction-y: 30px;
  --transparency: 0;
  animation: bubbling 3s forwards infinite;
}
@keyframes bubbling {
  0% {
    transform: translatey(var(--direction-y));
    opacity: var(--transparency);
  }
  40% {
    opacity: calc(var(--transparency) + 0.2);
  }
  70% {
    opacity: calc(var(--transparency) + 0.1);
  }
  100% {
    opacity: var(--transparency);
  }
}
```

### 4.如何通过JavaScript操作CSS变量

```javascript
// 缓存你即将操纵的元素
const sidebarElement = document.querySelector('.sidebar');
// 缓存sidebarElement的样式于cssStyles中
const cssStyles = getComputedStyle(sidebarElement);
// 获取 --left-pos CSS变量的值
const cssVal = String(cssStyles.getPropertyValue('--left-pos')).trim();
// 将CSS 变量的值打印到控制台: 100px
console.log(cssVal);
sidebarElement.style.setProperty('--left-pos', '200px');
```

### 5.CSS变量的浏览器支持

```css
section {
    color: gray;
}
@supports(--css: variables) {
    section {
        --my-color: blue;
        color: var(--my-color, 'blue');
    }
}
```

