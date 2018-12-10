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

carObj

let hours = Array.from([1,2,3],index => index + 1);

const toCamelCase = str => {
    let s = str && str .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                       .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()) .join('');
                       return s.slice(0, 1).toLowerCase() + s.slice(1);
}

console.log(toCamelCase('some_database_field_name'));

