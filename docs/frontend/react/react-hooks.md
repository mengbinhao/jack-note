
1. `require react version ^16.8`
2. 有状态组建可以写成`Hooks`形式
3. `useState`不能写到if判断里面,它的顺序必须是固定的
```javascript
const [ age , setAge ] = useState(18)
const [ sex , setSex ] = useState('男')
const [ work , setWork ] = useState('前端程序员')
```
4. `useEffect`
   1. `React`首次渲染和之后的每次渲染都会调用一遍`useEffec`t函数，而之前我们要用两个生命周期函数分别表示首次渲染`componentDidMonut`和更新导致的重新渲染`componentDidUpdate`
    ```javascript
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
    })
    ```
   2. `useEffect`中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而`componentDidMonut`和`componentDidUpdate`中的代码都是同步执行的。个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了
   3. 模拟`componentWillUnMount`注意的坑,`useEffect`第二个参数的用法
    ```javascript
    useEffect(() => {
      console.log(`hi, you come in`)
      return () => {
        console.log(`hi, you come out`)
      }
    }, [count])
    ```
5. `useContext` 模拟父子组建传值
```javascript
const CountContext = createContext()

<CountContext.Provider value={count}>
  <Sub />
</CountContext.Provider>

const Sub = () => {
  let count = useContext(CountContext)
  return <h4>sub component: {count}</h4>
}
```
6. `useReducer` 类似`redux`的`reducer`
```javascript
function UseReducerDemo() {
  const [count, dispatch] = useReducer((state, action) => {
    switch(action) {
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      default:
        return state
    }
  },0)

  return (
    <div>
      <div>count is : { count } </div>
      <div>
        <button onClick={() => {dispatch('add')}}>add</button>
        <button onClick={() => {dispatch('sub')}}>sub</button>
      </div>
    </div>
  )
}
```
7. `useContext` + `useReducer` 实现 `redux`
- `useContext`：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理
- `useReducer`：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性

8. `useMemo`
**useCallback returns its function uncalled so you can call it later, while useMemo calls its function and returns the result.也就是说一个缓存方法，一个缓存结果变量**
```javascript
const actionXiaohong = useMemo(() => actionXiaoHong(name), [name])
```

9. `useRef`
- 用`useRef`获取`React JSX`中的`DOM`元素，获取后就可以控制`DOM的`任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制
- 用`useRef`来保存变量，这个在工作中也很少能用到，我们有了`useContext`这样的保存其实意义不大

10. myhook