// function Animal() {}
// Animal.prototype.行动 = function () {}

var inherit = (function () {
    let F = function () {}
    return function (Target, Origin) {
        F.prototype = Origin.prototype
        Target.prototype = new F()
        Target.prototype.constructor = Target
        Target.uber = Origin.prototype
    }
})();


// function Animal() {}
// Animal.prototype.行动 = function () {}

// function Human(options) {
//     this.name = options.name
//     this.birthday = options.birthday
// }

// inherit(Human, Animal)

// Human.prototype.type = '人类'
// Human.prototype.useTool = function () {}
// var h1 = new Human({
//     name: 'Frank',
//     birthday: '2000-10-10'
// })
// console.log(h1);



function Animal() {}
Animal.prototype.行动 = function () {}

function Human(options) {
    this.name = options.name
    this.birthday = options.birthday
}

inherit(Human, Animal)

Human.prototype.type = '人类'
Human.prototype.useTool = function () {}
var h1 = new Human({
    name: 'jack',
    birthday: '2000-10-10'
})

function Asian(options) {
    Human.call(this, options)
    this.city = options.city
}

inherit(Asian, Human)

Asian.prototype.肤色 = '黄色'

var a1 = new Asian({
    city: '北京',
    name: 'jack',
    birthday: '2000-10-10'
})
