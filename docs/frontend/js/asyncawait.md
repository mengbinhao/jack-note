### async
`async`函数返回的是一个`Promise`对象。`async`函数（包含函数语句、函数表达式、Lambda表达式）会返回一个`Promise`对象，如果在函数中`return`一个直接量，`async`会把这个直接量通过`Promise.resolve()`封装成`Promise`对象。

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
    if (！authorId){
        return null
    }
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

