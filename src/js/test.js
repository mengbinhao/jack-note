const myReduce = (f, acc, arr) => {
    console.log(acc);
    if (arr.length === 0) return acc;
    const [head, ...tail] = arr;
    return reduce(f, f(head, acc), tail);
};

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

let hours = Array.from([1,2,3],index => index + 1);

const myUsers = [
    { name: 'chuloo', likes: 'grilled chicken' },
    { name: 'chris', likes: 'cold beer' },
    { name: 'sam', likes: 'fish biscuits' }
]
const usersByFood = myUsers.map(item => {
    const container = {};
    container[item.name] = item.likes;
    container.age = item.name.length * 10;
    return container;
})

var myIterator  = function(arr) {
    let index = 0
    return {
        next: function() {
            return index < arr.length ?　{value: arr[index++], done: false} : {value: 'undefined', done: true}
        }
    }
}

let arr = [1,2,66]

let obj = myIterator(arr)
console.log(obj.next())
console.log(obj.next())
console.log(obj.next())
console.log(obj.next())
console.log(obj.next())

let targetData = {
    [Symbol.iterator]: function() {
        let index = 0
        return {
            next: function() {
                return index < this.length ?　{value: this[index++], done: false} : {value: 'undefined', done: true}
            }
        }
    }
}