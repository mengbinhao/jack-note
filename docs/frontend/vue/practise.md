### watch

```javascript
created(){
    this.fetchPostList()
},
watch: {
    searchInputValue(){
        this.fetchPostList()
    }
}

//改成
//有请求需要再没初始化的时候就执行一次，然后监听他的变化
watch: {
    searchInputValue:{
        handler: 'fetchPostList',
        immediate: true
    }
}
```





### common filter

```javascript
import Vue from 'vue'
import moment from 'moment'

/**
 * @filter dateFormat 时间格式化
 * @param {String, Date} value 可被 new Date 解析的字符串
 * @param {String} formatStr moment 的 format 字符串
 * 使用方法 {{ 2019-1-1 | dateFormat() }}
 */
Vue.filter('dateFormat', (value, formatStr = 'YYYY-MM-DD hh:mm:ss') => {
  return moment(value).format(formatStr)
})

/**
 * @filter digitUppercase 人民币金额转成汉字大写
 * @param {Number} value 金额数字
 * 使用方法 {{ 1111 | digitUppercase }}
 */
Vue.filter('digitUppercase', value => {
  if (Number(value)) {
    let fraction = ['角', '分']
    let digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ]
    let unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ]

    let head = value < 0 ? '欠' : ''
    value = Math.abs(value)
    let s = ''
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(value * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    value = Math.floor(value)
    for (let i = 0; i < unit[0].length && value > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && value > 0; j++) {
        p = digit[value % 10] + unit[1][j] + p
        value = Math.floor(value / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  } else {
    return '零元整'
  }
})
```

### common directive
```javascript
import Vue from 'vue'

/**
 * @directive preventReClick 防止按钮在短时间内多次点击造成的多次请求(一般用于提交按钮)
 * @param {Element} el 绑定的元素
 * @param {Number} binding 绑定的时间
 * 使用方式 <el-button v-prevent-replace-click></el-button>
 */
Vue.directive('preventReplaceClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.classList.add('is-disabled')
        const i = document.createElement('i')
        i.classList.add('el-icon-loading')
        el.prepend(i)
        el.classList.add('is-loading')
        el.disabled = true

        setTimeout(() => {
          el.disabled = false
          el.classList.remove('is-disabled')
          el.classList.remove('is-loading')
          el.removeChild(i)
        }, binding.value || 1000)
      }
    })
  }
})
```

### utils

```javascript
/**
  * 应用场景
  * debounce(抖动)
  * search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
  * window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
  *
  * throttle(节流)
  * 鼠标不断点击触发，mousedown(单位时间内只触发一次)
  * 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
 */

// 防抖
export function debounce (fn, delay = 200) {
  let timer
  return function () {
    let context = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
// 节流
export function throttle (fn, interval = 200) {
  let last = 0
  return function() {
    let now = +new Date()
    if (now - last >= interval) {
      fn.apply(this, arguments)
      last = +new Date()
    }
  }
}

// 格式化 startDate 和 endDate
import moment from 'moment'
import _ from 'lodash'

/**
 * @method timerByAdd 计算相对当前时间后N个单位时间的日期(加法)
 * @param num {Number} 相对于几个时间点
 * @param timer {String} 时间单位 'days' 'months' 'years‘ 更多时间单位参考moment官方文档
 * @param formatStr {String} moment 的 format 字符串
 * @return {Object} {startDate,endDate}
 */
export function timerByAdd ({
  num,
  timer = 'days'
} = {}, formatStr = 'YYYY-MM-DD') {
  let startDate
  let endDate = moment().format(formatStr)

  num ? startDate = moment().add(num, timer).format(formatStr) : startDate = endDate
  let result = {
    startDate,
    endDate
  }
  return result
}

/**
 * @method timerBySubtract 计算相对当前时间前N个单位时间的日期(减法)
 * @param num {Number} 相对于几个时间点
 * @param timer {String} 时间单位 'days' 'months' 'years‘ 更多时间单位参考moment官方文档
 * @param formatStr {String} moment 的 format 字符串
 * @return {Object} {startDate,endDate}
 */
export function timerBySubtract ({
  num,
  timer = 'days'
} = {}, formatStr = 'YYYY-MM-DD') {
  let startDate
  let endDate = moment().format(formatStr)

  num ? startDate = moment().subtract(num, timer).format(formatStr) : startDate = endDate
  let result = {
    startDate,
    endDate
  }
  return result
}

/**
 * @method timerFormat 将对象时间转成数组形式
 * @param {Object} timer {startDate, endDate}
 */
export function timerFormat (timer) {
  if (_.isObject(timer)) {
    return _.values(timer)
  }
}
```

