function Animal() {
    this.name = 'Animal';
}

Animal.prototype.changeName = function (name) {
    this.name = name;
}

function Cat() {
    this.name = 'Cat';
}

var animal = new Animal();

Cat.prototype = animal;
Cat.prototype.constructor = Cat;

var cat = new Cat();

animal.changeName('Tiger');

console.log(cat.name)