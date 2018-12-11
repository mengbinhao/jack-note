### 数组解构
```javascript
let [a, b, c] = [1, 2, 3] // a=1, b=2, c=3
let [d, [e], f] = [1, [2], 3] // 嵌套数组解构
let [g, ...h] = [1, 2, 3] // 数组拆分
let [i,,j] = [1, 2, 3] // 不连续解构
let [k,l] = [1, 2, 3] // 不完全解构
```

### 对象解构
```javascript
let {a, b} = {a: 'aaaa', b: 'bbbb'} // a='aaaa' b='bbbb'
let obj = {d: 'aaaa', e: {f: 'bbbb'}}
let {d, e:{f}} = obj // 嵌套解构 d='aaaa' f='bbbb'
let g;
(g = {g: 'aaaa'}) // 以声明变量解构 g='aaaa'???????
let [h, i, j, k] = 'nice' // 字符串解构
```

### 使用场景
#### 变量赋值

`const {userName, password} = {userName: 'aaaa', password: 123456}`
#### 函数参数的定义

```javascript
//不需要参数顺序
function personInfo({name, age, address, gender}) {
  console.log(name, age, address, gender)
}
personInfo({gender: 'man', address: 'changsha', name: 'william', age: 18})
```

#### 交换变量的值
#### 函数的默认参数
```javascript
//es3使用 ||
function saveInfo({name= 'william', age= 18, address= 'changsha', gender= 'man'} = {}) {
  console.log(name, age, address, gender)
}
saveInfo()
```