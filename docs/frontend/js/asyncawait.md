### why async

- CB

- Promise

    - 解决问题

        - 多层嵌套的问题
        - 每种任务的处理结果存在两种可能性（fulfilled or rejected, default is pending），那么需要在每种任务执行结束后分别处理这两种可能性

    - 如何解决

        - 回调函数延迟绑定
        - 返回值穿透
        - 错误冒泡

    - 缺点

        - 无法取消Promise,一旦新建它就会立即执行，无法中途取消
        - 如果不设置回调函数，promise内部抛出的错误，不会反应到外部
        - 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

    - API

        - Promise.resolve

            - 若参数是`Promise`实例，那么`Promise.resolve`将不做任何修改，原封不动地返回这个实例
            - 若参数是`thenable`对象，`Promise.resolve`方法会将这个对象转为`Promise`对象，然后就立即执行`thenable`对象的`then`方法
            - 若参数是一个原始值，或是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 `Promise` 对象，状态为`resolved`
            - 若不带有任何参数，直接返回一个`resolved`状态的 Promise 对象

        - Promise.reject（`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致）

        - Promise.race

            - 适合场景：把异步操作和定时器放到一起，如果定时器先触发，认为超时，告知用户

                ```javascript
                const timeOut = time => {
                    return result = new Promise((resolve,reject) => {
                        setTimeout(() => {
                            resolve("请求超时")
                        }, time)
                    });
                }
                
                Promise.race([timeOut(200), fetch('xxx')]).then(val => {})
                ```

            - 适合场景：如果图片等资源有多个存放路径，但是不确定哪个路径的资源更快，可以用该方法同时请求多个路径，哪个路径的资源最先拿到，使用哪个资源

            - 适合场景：如果指定时间内没有获得结果，就将 Promise 的状态变为`reject`，否则变为`resolve`

                ```javascript
                const p = Promise.race([
                  fetch('/xxxx'),
                  new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('request timeout')), 5000)
                  })
                ])
                
                p.then(console.log).catch(console.error)
                ```

        - Promise.all（其中任意一个 `promise` 被 `reject` ，`Promise.all` 就会立即被 `reject` ，数组中其它未执行完的 `promise` 依然在执行， `Promise.all` 没有任何措施可以取消它们的执行）

            - 适合场景：彼此相互依赖，其中任何一个被 `reject` ，其它都失去了实际价值

        - Promise.allSettled（大多数场景中，我们期望传入的这组 `promise` 无论执行失败或成功，都能获取每个 `promise` 的执行结果）

            - 适合场景：彼此互不依赖，其中任何一个被 `reject` ，对其它都没有影响

            - 适合场景：期望知道每个 `promise` 的执行结果

                ```javascript
                const promises = [
                  fetch('/api-1'),
                  fetch('/api-2'),
                  fetch('/api-3'),
                ];
                const results = await Promise.allSettled(promises)
                // 过滤出成功的请求
                const successfulPromises = results.filter(p => p.status === 'fulfilled');
                
                // 过滤出失败的请求，并输出原因
                const errors = results
                  .filter(p => p.status === 'rejected')
                  .map(p => p.reason);
                
                removeLoadingIndicator();// 移除加载的滚动图标
                ```

        - Promise.any

        - Promise.prototype.then

        - Promise.prototype.finally

            - 由于无法知道`promise`的最终状态，所以`finally`的回调函数中不接收任何参数，仅用于无论最终结果如何都要执行的情况
            - 与`Promise.resolve(2).then(() => {}, () => {})` （resolved的结果为`undefined`）不同，`Promise.resolve(2).finally(() => {})` resolved的结果为 `2`，同样的`Promise.reject(3).finally(() => {})`rejected 的结果为 `3`

    - Knowledge Point

        - 三种状态：`pending`、`fulfilled`和`rejected`

        - 初始状态是`pending`, 执行了`resolve`，`Promise`状态会变成`fulfilled`; 执行了`reject`，`Promise`状态会变成`rejected`

        - Promise只以第一次为准，第一次成功就永久为`fulfilled`，第一次失败就永远状态为`rejected`

        - Promise中有`throw`的话，就相当于执行了`reject`

        - Promise里没有执行`resolve`、`reject`以及`throw`的话，这个promise的状态也是`pending`

        - 基于上一条，`pending`状态下的promise不会执行`then`中的回调函数

        - 必须给`Promise`对象传入一个执行函数，否则报错

            

- Generator

    ```javascript
    function* gen() {
        let a = yield 111;
        console.log(a);
        let b = yield 222;
        console.log(b);
        let c = yield 333;
        console.log(c);
        let d = yield 444;
        console.log(d);
    }
    let t = gen();
    t.next(1); //第一次调用next函数时，传递的参数无效，故无打印结果
    t.next(2); // a输出2;
    t.next(3); // b输出3; 
    t.next(4); // c输出4;
    t.next(5); // d输出5;
    ```

- AA

### async

`async`函数返回的是一个`Promise`对象。`async`函数（包含函数语句、函数表达式、Lambda表达式）会返回一个`Promise`对象，如果在函数中`return`一个直接量，`async`会把这个直接量通过`Promise.resolve()`封装成`Promise`对象

如果`async`函数没有返回值， 它会返回`Promise.resolve(undefined)`

### await作用是什么
`await`等待的是一个表达式，这个表达式的计算结果是`Promise`对象或者其它值（换句话说，`await`可以等任意表达式的结果）。

如果它等到的不是一个`Promise`对象，那`await`表达式的运算结果就是它等到的东西。

如果它等到的是一个`Promise`对象，`await`就忙起来了，它会阻塞后面的代码，等着 `Promise`对象`resolve`，然后得到`resolve`的值，作为`await`表达式的运算结果

### demo
```javascript
async getBookByAuthor(authorId) {
    const books = await bookModel.fetchAll()
    return books.filter(b => b.authorId === authorId)
}

getBooksByAuthor2(authorId) {
    return bookModel.fetchAll()
            .then(books => books.filter(b => b.authorId === authorId))
}
```

### async确保返回的是promise
```javascript
getBooksByAuthor2(authorId) {
    if (!authorId) return null
    return bookModel.fetchAll()
            .then(books => books.filter(b => b.authorId === authorId))
}
```

### 坑
#### 太过串行化
```javascript
async getBooksByAuthor(authorId) {
    const books = await bookModel.fetchAll()
    const author = await authorModel.fetch(author)
    return {
        author,
        books: books.filter(book => book.authorId === authorId)
    }
}
```
改成
```javascript
async getBooksByAuthor(authorId) {
    const bookPromise = bookModel.fetchAll()
    const authorPromise = authorModel.fetch(author)
    const book = await bookPromise
    const author = await authorPromise
    return {
        author,
        books: books.filter(book => book.authorId === authorId)
    }
}
```

```javascript
async getAuthors(authorIds) {
    //以下串行调用
    const authors = _.map(
        authorIds,
        id => await authorModel.fetch(id)
    )

    //correct
    const promises = _.map(authorIds, id => authorModel.fetch(id))
    const authors = await Promise.all(promises)
}
```

### 错误处理
```javascript
class BookModel {
    fetchAll() {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {reject({'error':400})}, 1000)
        })
    }
}
async getBooksByAuthor(authorIds) {
    try {
        const books = await bookModel.fetchAll()
    }catch(error) {
        console.log(error)
    }
}
```


```javascript
class BookModel {
    fetchAll() {
        cb()
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {reject({'error':400})}, 1000)
        })
    }
}

try {
    bookModel.fetchAll()
}catch(error) {
    console.log(error) //cb is not define
}
```

