let assert = require('assert');

function add(a, b) {
    return a + b;
}

let expected = add(1, 2);

assert(expected == 3, '预期1+2等于3');
assert.ok(expected == 3, '预期1+2等于3');
assert.equal(expected, 3, '预期1+2等于3');
assert.notEqual(expected, 4, '预期不等于4');

var list1 = [1, 2, 3, 4, 5];
var list2 = [1, 2, 3, 4, 5];
assert.deepEqual(list1, list2, '预期两个数组应该有相同的属性');

var person1 = {
    "name": "john",
    "age": "21"
};
var person2 = {
    "name": "john",
    "age": "21"
};
assert.deepEqual(person1, person2, '预期两个对象应该有相同的属性');
//assert.notDeepEqual(list1, list2, '预期两个对象不相等');

//assert.notStrictEqual()
assert.strictEqual(1, 1, '预期严格相等');

//assert.throws()
assert.throws(
    function () {
        throw new Error("Wrong value");
    },
    Error,
    '不符合预期的错误类型'
);

assert.throws(
    function () {
        throw new Error("Wrong value");
    },
    /value/,
    '不符合预期的错误类型'
);

assert.throws(
    function () {
        throw new Error("Wrong value");
    },
    function (err) {
        if ((err instanceof Error) && /value/.test(err)) {
            return true;
        }
    },
    '不符合预期的错误类型'
);

//assert.doesNotThrow()
// assert.doesNotThrow(
//     function () {
//         console.log("Nothing to see here");
//     },
//     '预期不抛出错误'
// );

//assert.ifError()

//assert.fail(21, 42, 'Test Failed', '###')
// AssertionError: Test Failed
//assert.fail(21, 21, 'Test Failed', '###')
// AssertionError: Test Failed
//assert.fail(21, 42, undefined, '###')