// class Animal {
//     constructor() {
//     }
//     move() {
//     }
// }

//不支持共有属性的写法
// class Animal {
//     constructor() {

//     }
//     move() {

//     }
// }

// class Human extends Animal{
//     constructor(options) {
//         super()
//         this.name = options.name
//         this.birthday = options.birthday
//     }

//     useTool() {

//     }
// }

// var h1 = new Human({
//     name: 'jack',
//     birthday: '2000-10-10'
// })


class Animal {
    constructor() {

    }
    move() {

    }
}

class Human extends Animal{
    constructor(options) {
        super()
        this.name = options.name
        this.birthday = options.birthday
        this.species = options.species
    }

    useTool() {

    }
}

var h1 = new Human({
    name: 'jack',
    birthday: '2000-10-10',
    species: '人'
})

class Asian extends Human{
    constructor(options) {
        super(options)
        this.city = options.city
        this.fuse = options.fuse
    }
}

var a1 = new Asian({
    name: 'jack',
    birthday: '2000-10-10',
    species: '亚洲人',
    fuse: '黄',
    city: '北京'
})
