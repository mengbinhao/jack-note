console.log('loaded');
let name;

exports.setName = (newName) => {
    name = newName || 'feifei';
}

exports.sayHello = () => {
    console.log('Hello ' + name);
}