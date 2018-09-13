function Hello () {
    let name;

    this.setName = (newName) => {
        name = newName || 'feifei';
    }

    this.sayHello = () => {
        console.log('Hello ' + name);
    }
}

module.exports = Hello;