import Vue from 'vue'
const Store = function Store(options = {}) {
	const { state = {}, mutations = {} } = options
	this._vm = new Vue({
		data: {
			$$state: state,
		},
	})
	this.mutations = mutations
}

Store.prototype.commit = function (type, payload) {
	if (this.mutations[type]) this.mutations[type](this.state, payload)
}

Object.defineProperties(Store.prototype, {
	state: {
		get() {
			return this._vm._data.$$state
		},
	},
})
export default { Store }

//使用
Vue.prototype.$Store = store
