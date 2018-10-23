//rest parameter
let restFun1 = (...args) => {
    console.log(`arguments: ${args}`);
    let [arr1, arr2, ...arr3] = args
    console.log(`arr1=${arr1},arr2=${arr2},arr3=${arr3}`);
}

//restFun1(1,2,3,4,5)

//invoke use rest parameter
let restFun2 = (...args) => {
    foo(...args);
    foo.call(null, ...args);
    foo.apply(null, args);
};

let foo = (p1, p2, p3) => {
    console.log(p1 + p2 + p3);
}

restFun2(1, 2, 3, 4)

//invoke use rest parameter
let restFun3 = (param1, ...args) => {
    console.log(`arguments: ${args}`);
}

// judge params in nodejs
let checkParams = (err, params1, params2, callback) => {
    if (typeof params1 === 'function') {
        callback = params1;
        params1 = null;
        params2 = null;
    } else if (typeof params2 === 'function') {
        callback = params2;
        params1 = null;
    } else if (typeof callback !== 'function') {
        throw new Error('参数错误');
    }
}

//invoke use rest parameter
let checkParams2 = (err, ...args) => {
    const callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
    const [params1 = null, params2 = null] = args;
}

//use defualt and deconstruction
let defaultFun = (a, {opt1 = '1',opt2 = '2'} = {}) => {
    console.log(a, opt1, opt2);
}

let mergeFun = (a, opts) => {
    // 使用 Object.assign 赋予默认值
    opts = Object.assign({
            opt1: '1',
        },
        opts
    );

    // 和 Object.assign 类似
    opts = {
        opt1: '1',
        ...opts,
    };

    const {opts1 = '1', opts2 = '2'} = opts;
}

//check null params
let mandatory = () => {
    throw new Error('Missing parameter');
}

let foo2 = (mustBeProvided = mandatory()) => {
    return mustBeProvided;
}

let checkLengthFun = (x, y, ...extra) => {
    if (extra.length > 0) {
        throw new Error();
    }
}

//deconstruction
let user = {
    name: 'jenny',
    id: 18,
    desc: {
        pos: {
            lng: 111,
            lat: 333
        }
    }
}

let {name,id = 16,job = 'engineer'} = user
let {name: localName,id: localId} = user
let {name: otherName = 'lee',job: otherJob = 'teacher'} = user
let {desc: {pos}} = user
let {desc: {pos: {lng}}} = usser
let {desc: {pos: {lng: longitude}}} = user