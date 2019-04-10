class Animal {
	constructor() {
			this.species = '动物'
	}
	move() {
			console.log('move')
	}
}

class Person extends Animal{
	constructor(name, age){
			super()
			this.name = name
			this.age = age
			this._private = 'private attribute'
	}
	walk() {
			console.log('I can walk')
	}
	static staticMethod() {
			return 'static'
	}
	get private() {
			return this._private
	}
	set private(val) {
			this._private = val
	}
}

var p1 = new Person('jack',33)
