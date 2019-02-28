### concept
- 栈是一种“操作受限”的线性表
- 当某个数据集合只涉及在一端插入和删除数据，并且满足后进先出、先进后出的特性，我们就应该首选“栈”这种数据结构

### implement
栈既可以用数组来实现，也可以用链表来实现。用数组实现的栈，我们叫作顺序栈,用链表实现的栈，我们叫作链式栈


```javascript
class MyStack {
    constructor() {
        this.stack = []
    }

    push(item) {
        this.stack.push(item)
    }

    pop() {
        if (this.stack.length === 0) return null
        return this.stack.splice(this.stack.length - 1, 1).toString()
    }

    getLength() {
        return this.stack.length
    }
}

var t = new MyStack()
console.log(t.getLength())
t.push('1')
t.push('2')
t.push('3')
console.log(t)
console.log(t.pop())
console.log(t.pop())
console.log(t.pop())
console.log(t.pop())
```