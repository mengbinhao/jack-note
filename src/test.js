function createPerson(name) {
	let age = 0

	return {
		getName() {
			return name
		},
		getAge() {
			return age
		},
		setAge(val) {
			age = val
		},
	}
}

let person = createPerson('Jack')
console.log(person.getName(), person.getAge())
person.setAge(33)
console.log(person.getAge())
