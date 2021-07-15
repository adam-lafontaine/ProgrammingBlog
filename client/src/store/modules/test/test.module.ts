import actions from './test.actions'
import mutations from './test.mutations'
import getters from './test.getters'
import state from './test.state'

const test_module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default test_module