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

function test({name} = {}) {
    console.log (name || 'unknown');
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



//多重判断时使用 Array.includes
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}

function test(fruit) {
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

    if (redFruits.includes(fruit)) {
        console.log('red');
    }
}

//更少的嵌套，尽早 Return
function test(fruit, quantity) {
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

    // 条件 1: 尽早抛出错误
    if (!fruit) throw new Error('No fruit!');

    // 条件 2: 必须是红色的
    if (redFruits.includes(fruit)) {
        console.log('red');

        // 条件 3: 必须是大质量的
        if (quantity > 10) {
            console.log('big quantity');
        }
    }
}

//倾向于对象遍历而不是Switch语句
function test(color) {
    // 使用条件语句来寻找对应颜色的水果
    switch (color) {
        case 'red':
            return ['apple', 'strawberry'];
        case 'yellow':
            return ['banana', 'pineapple'];
        case 'purple':
            return ['grape', 'plum'];
        default:
            return [];
    }
}

const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
};

function test(color) {
    return fruitColor[color] || [];
}

//使用Map实现相同的结果
const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
    return fruitColor.get(color) || [];
}

//Array.filter实现相同的效果
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'strawberry', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'pineapple', color: 'yellow' },
    { name: 'grape', color: 'purple' },
    { name: 'plum', color: 'purple' }
];

function test(color) {
    return fruits.filter(f => f.color == color);
}

//对所有/部分判断使用Array.every & Array.some
function test() {
    const isAllRed = fruits.every(f => f.color == 'red');
    console.log(isAllRed); // false
}

function test() {
    // 条件：任何一个水果是红色
    const isAnyRed = fruits.some(f => f.color == 'red');
    console.log(isAnyRed); // true
}