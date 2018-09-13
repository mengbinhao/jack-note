#### 1 网格容器

将属性 `display` 值设为 `grid` 或 `inline-grid` 就创建了一个网格容器，所有容器直接子结点自动成为网格项目

```css
grid  {
    display: grid;
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-1.png)

```css
/** 网格项目按行排列，网格项目宽度由自身宽度决定 */
grid  {
    display: inline-grid;
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-2.png)

#### 2 显示网格

属性`grid-template-rows`和`grid-template-columns`用于显示定义网格，分别用于定义行轨道和列轨道

```css
/**
属性`grid-template-rows`用于定义行的尺寸，即轨道尺寸。轨道尺寸可以是任何非负的长度值（px，%，em，等）
网格项目1的行高是50px，网格项目2的行高是100px。
因为只定义了两个行高，网格项目3和4的行高取决于其本身的高度。
*/
grid  {
    display: grid;
    grid-template-rows: 50px 100px；
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-3.png)

```css
/**
类似于行的定义，属性`grid-template-columns`用于定义列的尺寸。
因为定义中只有三列，所以项目4，5，6排在新的一行; 并因为它们位于第1，2，3列的轨道上，所以其宽度等于定义中第1，2，3列轨道的宽度。
网格项目的第1列，第2列，第3列的宽度分别是 90px, 50px 和 120px 。
*/
grid  {
    display: grid;
    grid-template-columns: 90px 50px 120px；
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-4.png)

```css
/**
单位fr用于表示轨道尺寸配额，表示按配额比例分配可用空间。
本例中，项目1占 1/4 宽度，项目2占 1/4 宽度，项目3占 1/2 宽度。
*/
grid  {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr；
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-5.png)

```css
/**
单位fr和其它长度单位混合使用时，fr的计算基于其它单位分配后的剩余空间。
本例中，1fr = (容器宽度 - 3rem - 容器宽度的25%) / 3
*/
grid  {
    display: grid;
    grid-template-columns: 3rem 25% 1fr 2fr；
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-6.png)

#### 3 轨道的最小最大尺寸设置

函数`minmax()`用于定义轨道最小/最大边界值。

```css
/**
函数minmax()接收两个参数：第一个参数表示最小轨道尺寸，第二个参数表示最大轨道尺寸。长度值可以是auto，表示轨道尺寸可以根据内容大小进行伸长或收缩。
本例中，第一行最小高度设置成100px，但是最大高度设置成auto，表示行高可以根据内容伸长超过100px。
本例中，第一列宽度的最大值设置成50%，表示其宽度不能超过整个容器宽度的50%。
*/
grid  {
    display: grid;
    grid-template-rows:    minmax(100px, auto);
    grid-template-columns: minmax(auto, 50%) 1fr 3em;
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-7.png)

#### 4 重复的网格轨道

函数`repeat()`用来定义重复的网格轨道，尤其适用于有多个相同项目的情况下。

```css
/**
函数repeat()接收两个参数：第一个参数表示重复的次数，第二个参数表示轨道尺寸。
*/
grid  {
    display: grid;
    grid-template-rows:    repeat(4, 100px);
    grid-template-columns: repeat(3, 1fr);
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-8.png)

```css
/**
函数repeat()可以用在轨道定义列表当中。
本例中，第1列和第5列的宽度是30px。函数repeat()创建了中间3列，每一列宽度都是1fr。
*/
grid  {
    display: grid;
    grid-template-columns: 30px repeat(3, 1fr) 30px;
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-9.png)

#### 5 定义网格间隙

属性`grid-column-gap` 和 `grid-row-gap`用于定义网格间隙。

网格间隙只创建在行列之间，项目与边界之间无间隙。

```css
/** 间隙尺寸可以是任何非负的长度值（px，%，em等） */
grid  {
    display: grid;
    grid-row-gap:    20px;
    grid-column-gap: 5rem;
｝
```

![](C:\Users\jack\Desktop\jack-note\docs\frondend\images\grid-10.png)































