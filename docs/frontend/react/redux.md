### redux
1. https://redux.js.org/
2. http://www.redux.org.cn/
3. redux是一个独立专门用于做状态管理的JS库(不是react插件库),它可以用在react, angular, vue等项目中, 但基本与react配合使用
4. 作用: 集中式管理react应用中多个组件共享的状态

#### 流程图
![](../images/react-4.png)

1. action
```
1)	标识要执行行为的对象
2)	包含2个方面的属性
a.	type: 标识属性, 值为字符串, 唯一, 必要属性
b.	xxx: 数据属性, 值类型任意, 可选属性
3)	例子:
		const action = {
			type: 'INCREMENT',
			data: 2
		}
4)	Action Creator(创建Action的工厂函数)
		const increment = (number) => ({type: 'INCREMENT', data: number})
```
2. reducer
```
1)	根据老的state和action, 产生新的state的纯函数
2)	样例
		export default function counter(state = 0, action) {
		  switch (action.type) {
		    case 'INCREMENT':
		      return state + action.data
		    case 'DECREMENT':
		      return state - action.data
		    default:
		      return state
		  }
		}
3)	注意
a.	返回一个新的状态
b.	不要修改原来的状态
```

3. store
```
1)	将state,action与reducer联系在一起的对象
2)	如何得到此对象?
		import {createStore} from 'redux'
		import reducer from './reducers'
		const store = createStore(reducer)
3)	此对象的功能?
		getState(): 得到state
		dispatch(action): 分发action, 触发reducer调用, 产生新的state
		subscribe(listener): 注册监听, 当产生了新的state时, 自动调用
```

#### 什么情况下需要使用redux
1. 总体原则: 能不用就不用, 如果不用比较吃力才考虑使用
2. 某个组件的状态，需要共享
3. 某个状态需要在任何地方都可以拿到
4. 一个组件需要改变全局状态
5. 一个组件需要改变另一个组件的状态

#### redux的核心API
1. createStore() 创建包含指定reducer的store对象
```javascript
import {createStore} from 'redux'
import counter from './reducers/counter'
const store = createStore(counter)
```

2. store对象(redux库最核心的管理对象)
    - 它内部维护着state / reducer
    - getState() / dispatch(action) / subscribe(listener)

```javascript
store.getState()
store.dispatch({type:'INCREMENT', number})
store.subscribe(render)
```

3. applyMiddleware()(应用上基于redux的中间件(插件库))
```javascript
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'  // redux异步中间件
const store = createStore(
  counter,
  applyMiddleware(thunk) // 应用上异步中间件
)
```

4. combineReducers()(合并多个reducer函数)
```javascript
export default combineReducers({
  user,
  chatUser,
  chat
})
```

### react-redux
1. 一个react插件库
2. 专门用来简化react应用中使用redux(解耦)

#### React-Redux将所有组件分成两大类
- UI组件
    - 只负责 UI 的呈现，不带有任何业务逻辑
    - 通过props接收数据(一般数据和函数)
    - 不使用任何 Redux 的 API
    - 一般保存在components文件夹下
- 容器组件
    - 负责管理数据和业务逻辑，不负责UI的呈现
    - 使用 Redux 的 API
    - 一般保存在containers文件夹下

#### API
- Provider
```
让所有组件都可以得到state数据
<Provider store={store}>
    <App />
</Provider>
```
- connect()
```
用于包装UI组件生成容器组件
import { connect } from 'react-redux'
  connect(
    mapStateToprops,
    mapDispatchToProps
  )(Counter)
```
- mapStateToprops()
```
将外部的数据（即state对象）转换为UI组件的标签属性
  const mapStateToprops = function (state) {
   return {
     value: state
   }
  }
```
- mapDispatchToProps()
```
将分发action的函数转换为UI组件的标签属性
简洁语法可以直接指定为actions对象或包含多个action方法的对象
```

###  redux异步编程(默认不支持)
- npm install --save redux-thunk

![](../images/react-5.png)


















