let add = (a, b, c) => {
    return a * b * c;
}

let curry = function (fn) {
    let args = [].slice.call(arguments, 1);
    let that = this;
    return function () {
        return fn.apply(that, args.concat([].slice.call(arguments)));
    }
}
let curryAdd = curry(add,3);
//console.log(curryAdd(3,4))

let obj = {
    a: 1,
    b: curry
}
obj.b(add)
//add args for passing needed
let curryFormalParameter = function (fn, args) {
    let length = fn.length,
        _args = args || [];
    that = this;
    return function () {
        let innerArgs = _args.concat([].slice.call(arguments));
        if (innerArgs.length < length) {
            return curryFormalParameter.call(that, fn, innerArgs)
        } else {
            return fn.apply(that, innerArgs);
        }
    }
}

let curraAddFormalParameter = curryFormalParameter(add);
console.log(curraAddFormalParameter(2)(3)(4));
// console.log(curraAddFormalParameter(2, 3, 4));
// console.log(curraAddFormalParameter(2)(3, 4));
// console.log(curraAddFormalParameter(2, 3)(4));
