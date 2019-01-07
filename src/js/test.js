const myReduce = (f, acc, arr) => {
    if (arr.length === 0) return acc;
    const [head, ...tail] = arr;
    return reduce(f, f(head, acc), tail);
}

const numbers = [10, 20, 30]

const doubleOver50 = numbers.reduce((result, num) => {
    num = num * 2
    if (num > 50) {
        result.push(num)
    }
    return result
}, [])

const isParentBalance = (str) => {
    return str.split('').reduce((count, char) => {
        if (count < 0) {
            return count
        } else if (char === '(') {
            return ++count
        } else if (char === ')') {
            return --count
        } else {
            return count
        }
    }, 0)
}

const cars = ['BWM', 'Benz', 'Toyota', 'Benz']
const carObj = cars.reduce((obj, car) => {
    obj[car] = obj[car] ? ++obj[car] : 1
    return obj
}, {})

let hours = Array.from([1,2,3],index => index + 1)


let testArray = [1,2,3,2,2,1,3,4,2,5]

let test = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1)
                //in case like [2,2]
                j--
            }
        }
    }
    return arr
}

let test2 = (arr) => {
    let obj = {},
        ret = [];
    arr.forEach((item) => {
        if (!obj[item]) {
            obj[item] = true
            ret.push(item)
        }
    })
    return ret
}

let r = test(testArray)
let r2 = test2(testArray)