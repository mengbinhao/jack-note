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
