const util = require('util');

function Base() {
    this.name = 'Base';
    this.base = 1983,
        this.sayHello = () => {
            console.log('hello ' + this.name);
        }
}

Base.prototype.showName = function () {
    console.log(this.name);
}

function Sub() {
    this.name = 'Sub';
}

//inherits
util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);





function Person() {
    this.name = "Hank";
    this.toString = function () {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true, null, true));