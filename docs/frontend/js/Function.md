### Function refactor
1. 数据抽象
2. 过程抽象

### 过程抽象

#### Once

1. requirement
```javascript
//在列表项消失前，如果快速地点击多次列表元素，在控制台上会出现异常信息
//Failed to execute 'removeChild' on 'Node'
const list = document.querySelector('ul')
const buttons = list.querySelectorAll('button')
buttons.forEach((button) => {
	button.addEventListener('click', (evt) => {
		const target = evt.target
		target.parentNode.className = 'completed'
		setTimeout(() => {
			list.removeChild(target.parentNode)
		}, 2000)
	})
})
```

2. some methods
  - addEventListener增加once参数
  - removeEventListener方法
  - disabled属性

3. 函数装饰器
```javascript
const once = fn => {
  return function (...args) => {
    if (fn) {
      let ret = fn.apply(this, args)
      fn = null
      return ret
    }
  }
}


const once = (fn,replace = null) => {
  return function (...args) => {
    if (fn) {
      let ret = fn.apply(this, args)
      fn = null
      return ret
    }
    if (replace) {
      replace.apply(this, args)
    }
  }
}
```

#### interceptor

```javascript
function intercept(fn, {beforeCall = null, afterCall = null}) {
  return function (...args) {
    if(!beforeCall || beforeCall.call(this, args) !== false) {
      // 如果beforeCall返回false，不执行后续函数
      const ret = fn.apply(this, args);
      if(afterCall) return afterCall.call(this, ret);
      return ret;
    }
  };
}
```

1. 监控一个函数的执行过程，不修改代码的情况下获取函数的执行信息

    ```javascript
    function sum(...list) {
      return list.reduce((a, b) => a + b);
    }

    sum = intercept(sum, {
      beforeCall(args) {
        console.log(`The argument is ${args}`);
        console.time('sum'); // 监控性能
      },
      afterCall(ret) {
        console.log(`The result is ${ret}`);
        console.timeEnd('sum');
      }
    });

    sum(1, 2, 3, 4, 5);
    ```

2. 调整参数顺序

    ```javascript
    const mySetTimeout = intercept(setTimeout,  {
      beforeCall(args) {
        [args[0], args[1]] = [args[1], args[0]];
      }
    });

    mySetTimeout(1000, () => {
      console.log('done');
    });
    ```

3. 校验函数的参数类型

    ```javascript
    const foo = intercept(foo, {
      beforeCall(args) {
        assert(typeof args[1] === 'string');
      }
    });
    ```

#### batch

- Pure Function:需要减少函数对外部环境的依赖，以及减少该函数对外部环境的改变。一个严格的纯函数，是具有**确定性**、**无副作用**，**幂等**的特点。也就是说，纯函数不依赖外部环境，也不改变外部环境，不管调用几次，不管什么时候调用，只要参数确定，返回值就确定

```javascript
export function setStyle(el, key, value) {
  el.style[key] = value;
}

export function setStyles(els, key, value) {
  els.forEach(el => setStyle(el, key, value));
}

function batch(fn) {
  return function(subject, ...args) {
    if(Array.isArray(subject)) {
      return subject.map((s) => {
        return fn.call(this, s, ...args);
      });
    }
    return fn.call(this, subject, ...args);
  }
}

export const setStyle = batch((el, key, value) => {
  el.style[key] = value;
});
```

### High Ordered Functions范式

```javascript
function HOF0(fn) {
  return function(...args) {
    return fn.apply(this, args);
  }
}
```

