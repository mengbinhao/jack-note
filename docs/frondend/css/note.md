1. 定位参照于谁块来定位
- 没有定位 :包含块
- 相对: 元素本来的位置
- 绝对: 包含块
    - 如果最近的祖先元素中存在定位元素，则这个定位元素就是包含块
    - 如果没有，包含块为初始包含块
- 固定: 视口

2. 什么是初始包含块
    - 是一个视窗大小的矩形，不等于视窗

3. **属性默认值**
    - left top right bottom width height 默认值为auto
    - margin padding 默认值 0
    - boder-width 如果不存在border-style

4. **属性是否可继承**
   - left top right bottom width height 默认值为auto不可继承

5.   百分比参照于谁
- width margin padding:包含块的width
- height:包含块的height
- left:包含块的width
- top :包含块的height

6. 浮动
浮动提升半层

7. 三列布局
- 需求
  - 两边固定，当中自适应
  - 中间列要完整的显示
  - 中间列要优先加载
- 四种实现
    - 定位
    - 浮动
    - 圣杯(推荐)
    - 双飞翼(推荐)


8. margin为负值(margin不影响元素的位置)
负值:将元素的边界往里收
正值:将元素的边界往外扩

9. 伪等高布局

10.  fixed
怎么使用绝对定位来模拟固定定位
    1. 禁止系统滚动条
	2. 将滚动条加给body
	3. 让body的尺寸变为视口的尺寸

11. 粘连布局

12. BFC
- 两列布局
- margin叠加
- 清浮动
13. 文本 字体

14. 垂直水平居中
- 已知宽高
    - 绝对定个位盒子的特性
- 未知宽高
- 图片

15. css hack(主要针对IE10以下)