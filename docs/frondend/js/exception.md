### js异常的一般处理方法

`throw new Error('something went wrong')`

### 异常对象

异常对象有两个属性供我们使用。第一个是message,第二个参数是异常堆栈跟踪，非常重要。
`new Error('This is the message')`

### try....catch

```javascript
const a = 5

try {
    console.log(b) // b is not defined, so throws an error
} catch (err) {
    console.error(err) // will log the error with the error stack
}

console.log(a) // still gets executed
```

### finally

```javascript
const a = 5

try {
    console.log(b) // b is not defined, so throws an error
} catch (err) {
    console.error(err) // will log the error with the error stack
} finally {
    console.log(a) // will always get executed
}
```

### 异步——回调
```javascript
myAsyncFunc(someInput, (err, result) => {
    if(err) return console.error(err) // we will see later what to do with the error object.
    console.log(result)
})
```

### 异步——Promises

```javascript
Promise.resolve(1)
    .then(res => {
        console.log(res) // 1

        throw new Error('something went wrong')

        return Promise.resolve(2)
    })
    .then(res => {
        console.log(res) // will not get executed
    })
    .catch(err => {
        console.error(err) // we will see what to do with it later
        return Promise.resolve(3)
    })
    .then(res => {
        console.log(res) // 3
    })
    .catch(err => {
        // in case in the previous block occurs another error
        console.error(err)
    })
```

### async / await

```javascript
;(async function() {
    try {
        await someFuncThatThrowsAnError()
    } catch (err) {
        console.error(err) // we will make sense of that later
    }

    console.log('Easy!') // will get executed
})()
```

### 构建一个自定义error构造函数
```javascript
class CustomError extends Error {
    constructor(code = 'GENERIC', status = 500, ...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.code = code
        this.status = status
    }
}

module.exports = CustomError
```