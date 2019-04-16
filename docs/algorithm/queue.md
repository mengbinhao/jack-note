### concept
- 操作受限的线性表数据结构。
- 先进者先出，这就是典型的“队列”

![](../images/algorithm_13.png)


### implement
用数组实现的队列叫作顺序队列,，用链表实现的队列叫作链式队列

```javascript
class MyQueue {
    constructor() {
        this.queue = []
        this.head = 0
        this.tail = 0
    }

    enqueue(item) {
        this.queue.push(item)
        this.tail++
    }

    dequeue() {
        if (this.head === this.tail) return null
        this.head++
        return this.queue.splice(0, 1).toString()
    }

    getLength() {
        return this.queue.length
    }
}
var t = new MyQueue()
console.log(t.getLength())
t.enqueue('1')
t.enqueue('2')
t.enqueue('3')
console.log(t)
console.log(t.dequeue())
console.log(t)
console.log(t.dequeue())
console.log(t)
console.log(t.dequeue())
console.log(t)
console.log(t.dequeue())
console.log(t)
```