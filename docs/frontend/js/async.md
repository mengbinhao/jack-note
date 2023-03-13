![](../images/asyncTypes.png)

### why async

#### 传统callback方式

```javascript
asyncCallone(() => {
  asyncCallTwo(() => {
    asyncCallThree(() => {
      ...
    })
  })
})
```

#### Promise

- 解决问题

    - 多层嵌套的问题
    - 每种任务的处理结果存在两种可能性（fulfilled or rejected, default is pending），那么需要在每种任务执行结束后分别处理这两种可能性
- 如何解决

    - 回调函数延迟绑定
    - 返回值穿透
    - 错误冒泡
- 缺点

    1. 无法取消Promise,一旦新建它就会立即执行，无法中途取消
    2. 如果不设置回调函数，promise内部抛出的错误，不会反应到外部
    3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
- API

    - `Promise.resolve`
        - 若参数是`Promise`实例，那么`Promise.resolve`将不做任何修改，原封不动地返回这个实例
        - 若参数是`thenable`对象，`Promise.resolve`方法会将这个对象转为`Promise`对象，然后就立即执行`thenable`对象的`then`方法
        - 若参数是一个原始值，或是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 `Promise` 对象，状态为`resolved`
        - 若不带有任何参数，直接返回一个`resolved`状态的 `Promise` 对象
    - `Promise.reject`（其参数会原封不动地作为`reject`的理由，变成后续方法的参数,这一点与`Promise.resolve`方法不一致）
    - `Promise.all`（其中任意一个 `promise` 被 `reject` ，`Promise.all` 就会立即被 `reject` ，数组中其它未执行完的 `promise` 依然在执行， `Promise.all` 没有任何措施可以取消它们的执行）
        - 适合场景：彼此相互依赖，其中任何一个被 `reject` ，其它都失去了价值
    - `Promise.allSettled`
        - 适合场景：彼此互不依赖，其中任何一个被 `reject` ，对其它都没有影响

        - 适合场景：期望知道每个 `promise` 的执行结果

    - Promise.any
    - Promise.prototype.then
    - Promise.prototype.finally

        - 由于无法知道`promise`的最终状态，所以`finally`的回调函数中不接收任何参数，仅用于无论最终结果如何都要执行的情况
        - 与`Promise.resolve(2).then(() => {}, () => {})` （resolved的结果为`undefined`）不同，`Promise.resolve(2).finally(() => {})` resolved的结果为2，同样的`Promise.reject(3).finally(() => {})`rejected 的结果为3
- Knowledge Point

    - 三种状态：`pending`、`fulfilled`和`rejected`

    - 初始状态是`pending`, 执行了`resolve`，`Promise`状态会变成`fulfilled`; 执行了`reject`，`Promise`状态会变成`rejected`

    - `Promise`状态不受外界影响

    - Promise只以第一次决议为准，第一次成功就永久为`fulfilled`，第一次失败就永远状态为`rejected`

    - Promise中有`throw`的话，就相当于执行了`reject`

    - Promise里没有执行`resolve`、`reject`以及`throw`的话，这个promise的状态也是`pending`

    - 基于上一条，`pending`状态下的promise不会执行`then`中的回调函数
    
    - 必须给`Promise`对象传入一个执行函数，否则报错

#### Generator

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
t.next(2); // 2
t.next(3); // 3
t.next(4); // 4
t.next(5); // 5
```

#### A/A

- 语法简洁，更像是同步代码，也更符合普通的阅读习惯
- 改进JS中异步操作串行执行的代码组织方式，减少callback的嵌套
- Promise中不能自定义使用try/catch进行错误捕获，但是在Async/await中可以像处理同步代码处理错误

##### async

`async`函数返回的是一个`Promise`对象。`async`函数（包含函数语句、函数表达式、Lambda表达式）会返回一个`Promise`对象，如果在函数中`return`一个直接量，`async`会把这个直接量通过`Promise.resolve()`封装成`Promise`对象

如果`async`函数没有返回值， 它会返回`Promise.resolve(undefined)`

##### await作用是什么

`await`等待的是一个表达式，这个表达式的计算结果是`Promise`对象或者其它值（换句话说，`await`可以等任意表达式的结果）

如果它等到的不是一个`Promise`对象，那`await`表达式的运算结果就是它等到的东西

如果它等到的是一个`Promise`对象，`await`就忙起来了，它会阻塞后面的代码，等着 `Promise`对象`resolve`，然后得到`resolve`的值，作为`await`表达式的运算结果

##### demo

```javascript
async getBookByAuthor(authorId) {
  const books = await bookModel.fetchAll()
  return books.filter(b => b.authorId === authorId)
}
//promise way
getBooksByAuthor2(authorId) {
  return bookModel.fetchAll().then(books => books.filter(b => b.authorId === authorId))
}
```

```javascript
let p1 = Promise.reject(100)
async function fn1() {
  let result = await p1
  console.log(1) //dead code
}
```

### Practices

#### 并行调用

```javascript
//wrong
async getBooksByAuthor(authorId) {
  const books = await bookModel.fetchAll()
  const author = await authorModel.fetch(author)
  return {
    author,
    books: books.filter(book => book.authorId === authorId)
  }
}

//correct
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

async getAuthors(authorIds) {
  //wrong
  const authors = _.map(
    authorIds,
    id => await authorModel.fetch(id)
  )
  //correct
  const promises = _.map(authorIds, id => authorModel.fetch(id))
  const authors = await Promise.all(promises)
}
```

#### 让Promise.all正常执行完成即使出现异常

```javascript
function getBannerList(){
  return new Promise((resolve,reject)=>{
    setTimeout(function(){
      // 假设这里 reject 一个异常
      reject(new Error('error'))
    },300)
  })
}

function getStoreList(){
 // ...
}

function getCategoryList(){
 // ...
}

function initLoad(){
  Promise.all([
    getBannerList().catch(err=>err),
    getStoreList().catch(err=>err),
    getCategoryList().catch(err=>err)
  ]).then(res=>{
    if(res[0] instanceOf Error){
      // 处理异常
    } else {
      // 渲染数据
    }

    if(res[1] instanceOf Error){
      // 处理异常
    } else {
      // 渲染数据
    }

    if(res[2] instanceOf Error){
     // 处理异常
    } else {
      // 渲染数据
    }
  })
}

initLoad()
```

#### race使用场景

- 使用`Promise.race`把异步操作和定时器放到一起，若定时器先触发，认为超时，告知用户
- 图片等资源有多个存放路径，但是不确定哪个路径的资源更快，可以用该方法同时请求多个路径，哪个路径的资源最先拿到，使用哪个资源

```javascript
function requestImg(path){
  return new Promise(function(resolve, reject){
    let img = new Image()
    img.onload = resolve
    img.onerror = reject 
    img.src = path
  })
}

// 定时功能的延迟函数
const timeout = (delay = 3000) => {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      reject('Picture request timeout')
    }, delay)
  })
}

Promise
.race([requestImg(), timeout(3000)])
.then(function(results){
  // 该资源请求在指定时间内完成
  console.log(results)
})
.catch(function(reason){
  // 该资源请求被在指定时间内没有完成
  console.log(reason)
});
```

#### allSettled使用场景

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

#### 红黄绿灯

```javascript
const red = () => console.log('red')
const yellow = () => console.log('yellow')
const green = () => console.log('green')

const light = (cb, timeout) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			cb()
			resolve()
		}, timeout)
	})
}

let endCnt = 0
const start = () => {
	if (endCnt++ >= 3) {
		console.log('finish lighting~~')
		return
	}
	Promise.resolve()
		.then(() => {
			return light(red, 3000)
		})
		.then(() => {
			return light(yellow, 2000)
		})
		.then(() => {
			return light(green, 1000)
		})
		.then(() => {
			start()
		})
}

start()
```

#### 异步执行函数

```javascript
const repeat = (cb, times, delay = 1000) => {
	return async function (...args) {
		for (let i = 0; i < times; i++) {
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					cb.call(null, ...args)
					resolve()
				}, delay)
			})
		}
	}
}
const repeatFn = repeat(console.log, 4, 1000)
repeatFn('hello')
```

#### generator实现

```javascript
function* repeatedArr(arr) {
	let i = 0
	while (true) {
		yield arr[i++ % arr.length]
	}
}

let infiniteNameList = repeatedArr(starks)

let sleep = (ms) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})

;(async () => {
	for (const name of infiniteNameList) {
		await sleep(1000)
		console.log(name)
	}
})()
```

#### PromiseQueue

```javascript
class PromiseQueue {
	constructor(tasks, concurrentCount = 1) {
		this.totals = tasks.length
		this.todo = tasks
		this.count = concurrentCount
		this.running = []
		this.complete = []
	}

	runNext() {
		return this.running.length < this.count && this.todo.length
	}

	run() {
		while (this.runNext()) {
			let promise = this.todo.shift()
			promise.then(() => {
				this.complete.push(this.running.shift())
				this.run()
			})
			this.running.push(promise)
		}
	}
}
```

