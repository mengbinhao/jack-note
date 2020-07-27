const actions = () => {
	const functionA = () => {
		/*do sth*/
	}
	const functionB = () => {
		/*do sth*/
	}
	const functionC = () => {
		/*send log*/
	}
	return new Map([
		[/^guest_[1-4]$/, functionA],
		[/^guest_5$/, functionB],
		[/^guest_.*$/, functionC],
		//...
	])
}

const onButtonClick = (identity, status) => {
	let action = [...actions()].filter(([key, value]) =>
		key.test(`${identity}_${status}`)
	)
	action.forEach(([key, value]) => value.call(this))
}
