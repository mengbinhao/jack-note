// let set = new Set([1,2,2,3,3])

// const each = (value:any) => {
//   let iter:any = value[Symbol.iterator]()
//   let next:any = {done: false}
//   while (!next.done) {
//     next = iter.next()
//     console.log(next.value)
//   }
// }

// let obj = {
//   current: 0,
//   max: 5,
//   [Symbol.iterator]() {
//     return {
//       max: this.max,
//       current: this.current,
//       next() {
//         if (this.current === this.max) {
//           return {value: undefined, done: true}
//         } else {
//           return  {value: this.current++, done: false}
//         }
//       }
//     }
//   }
// }

// for (let val of obj) {
//   console.log(val);
// }

const met:MethodDecorator = (...args) => {
  console.log(args);
}

class A {
  constructor() {

  }
  @met
  getName ():string {
      return '小满'
  }
}

const a = new A();