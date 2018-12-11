### 数据结构
数据结构决定了数据存储的空间和时间效率问题，数据的写入和提取速度要求也决定了应该选择怎样的数据结构。

根据对场景需求的不同，我们设计不同的数据结构，比如：

- 读得多的数据结构，应该想办法提高数据的读取效率，比如IP数据库，只需要写一次，剩下的都是读取；
- 读写都多的数据结构，要兼顾两者的需求平衡，比如LRU Cache算法。
算法是数据加工处理的方式，一定的算法会提升数据的处理效率。比如有序数组的二分查找，要比普通的顺序查找快很多，尤其是在处理大量数据的时候。

- 简单数据结构（必须理解掌握）
  - 有序数据结构：栈、队列、链表，有序数据结构省空间（存储空间小）
  - 无序数据结构：集合、字典、散列表，无序数据结构省时间（读取时间快）
- 复杂数据结构
  - 树、堆
  - 图

> 使用 ECMAScript（JS）代码实现一个事件类Event，包含下面功能：绑定事件、解绑事件和派发事件。

```javascript
class Event {
    constructor() {
        // 存储事件的数据结构
        // 为了查找迅速，使用了对象（字典）
        this._cache = {};
    }
    // 绑定
    on(type, callback) {
        // 为了按类查找方便和节省空间，
        // 将同一类型事件放到一个数组中
        // 这里的数组是队列，遵循先进先出
        // 即先绑定的事件先触发
        let fns = (this._cache[type] = this._cache[type] || []);
        if (fns.indexOf(callback) === -1) {
            fns.push(callback);
        }
        return this;
    }
    // 触发
    trigger(type, data) {
        let fns = this._cache[type];
        if (Array.isArray(fns)) {
            fns.forEach((fn) => {
                fn(data);
            });
        }
        return this;
    }
    // 解绑
    off(type, callback) {
        let fns = this._cache[type];
        if (Array.isArray(fns)) {
            if (callback) {
                let index = fns.indexOf(callback);
                if (index !== -1) {
                    fns.splice(index, 1);
                }
            } else {
                //全部清空
                fns.length = 0;
            }
        }
        return this;
    }
}
// 测试用例
const event = new Event();
event.on('test', (a) => {
    console.log(a);
});
event.trigger('test', 'hello world');

event.off('test');
event.trigger('test', 'hello world');
```

### 算法的效率是通过算法复杂度来衡量的
- 时间复杂度
- 空间复杂度


常见的时间复杂度有：
- 常数阶 O(1)
- 对数阶 O(logN)
- 线性阶 O(n)
- 线性对数阶 O(nlogN)
- 平方阶 O(n^2)
- 立方阶 O(n^3)
- !k次方阶 O(n^k)
- 指数阶O(2^n)

### 人人都要掌握的基础算法
枚举和递归

> 实现 JS 对象的深拷贝

> 求斐波那契数列（兔子数列） 1,1,2,3,5,8,13,21,34,55,89...中的第n项

### 快排和二分查找
### 正则匹配解题

> 字符串中第一个出现一次的字符
```javascript
function find(str){
    for (var i = 0; i < str.length; i++) {
        let char = str[i]
        let reg = new RegExp(char, 'g');
        let l = str.match(reg).length
        if(l===1){
            return char
        }
    }
}
```

> 将1234567 变成 1,234,567，即千分位标注

```javascript
function exchange(num) {
    num += ''; //转成字符串
    if (num.length <= 3) {
        return num;
    }

    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, (v) => {
        console.log(v)
        return v + ',';
    });
    return num;
}
```

[正向预言等](https://deerchao.net/tutorials/regex/regex.htm#lookaround)




