import actions from './post.actions'
import mutations from './post.mutations'
import getters from './post.getters'
import state from './post.state'

const post_module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default post_module