const getTestModule = () => import('./testModule.js')
export default {
	methods: {
		show() {
			getTestModule().then((testModule) => {
				this.isModuleRegistered = true
				this.$store.registerModule('testModule', testModule)
				this.$store.dispatch('testModule/load')
			})
		},
	},
	beforeDestroy() {
		if (this.isModuleRegusterred) {
			this.$store.unregisterModule('testModule')
		}
	},
}
