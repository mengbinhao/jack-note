let test1 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`1`)
      resolve()
    }, 1000)
  })
}

let test2 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`2`)
      resolve()
    }, 1000)
  })
}

let test3 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`3`)
      resolve()
    }, 1000)
  })
}

//sync way
async function allSync() {
  const a = await test1()
  const b = await test2()
  const c = await test3()
}
//allSync()

//Promise.all
function all() {
  Promise.all([test1(), test2(), test3()])
}

//all()

//loop issue
const users = [{ id: 1 }, { id: 2 }, { id: 3 }]
function getUserInfo(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${id}`)
      resolve(`${id}`)
    }, 1000)
  })
}
// const userInfos = []
// users.forEach(async user => {
//   const ret = await getUserInfo(user.id)
//   userInfos.push(ret)
// })
// console.log(userInfos)

//resolve loop issue, 继发式
// const userInfos2 = []
// async function resolveLoopIssue() {
//   for ({ id } of users) {
//     const ret = await getUserInfo(id)
//     userInfos2.push(ret)
//   }
//   console.log(userInfos2)
// }

// resolveLoopIssue()

//并发式,promise all返回的数组的顺序与请求的顺序一致
let userInfos3 = []
const promises = users.map(user => getUserInfo(user.id))
Promise.all(promises).then(res => {
  userInfos3 = res
  console.log(userInfos3)
})

//practise
//practise
//practise
var p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('1')
  }, 3000)
  resolve(1)
})
  .then(() => {
    // 描述：.then() 1-1
    Promise.resolve().then(() => {
      // 描述：.then() 2-1
      Promise.resolve().then(() => {
        // 描述：.then() 3-1
        console.log('2')
      })
    })
  })
  .then(() => {
    // 描述：.then() 1-2
    console.log('3')
  })

const p0 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('1')
  }, 3000)
  resolve(1)
})
  .then(() => {
    // 描述：.then() 1-1
    Promise.resolve().then(() => {
      // 描述：.then() 2-1
      Promise.resolve().then(() => {
        // 描述：.then() 3-1
        console.log('2')
      })
    })
  })
  .then(() => {
    // 描述：.then() 1-2
    console.log('3')
  })

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('1')
  }, 3000)
  resolve(1)
}).then(() => {
  // 描述：.then() 1-1
  Promise.resolve()
    .then(() => {
      // 描述：.then() 2-1
      console.log('2')
    })
    .then(() => {
      // 描述：.then() 1-2
      console.log('3')
    })
})

const p3 = Promise.race([
  fetch('index.php'),
  new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])

p3.then(console.log).catch(console.error)
