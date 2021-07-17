import { MutationTree as Tree } from 'vuex'
import {
    PostMutation as Mutation,
    IPostState as State,
    IPost

} from './post.types'
import { getDefaultState } from './post.state'

const mutations: Tree<State> = {
    [Mutation.SET_SELECTED_POST](state: State, post: IPost): void
    {
        state.selected_post = post;
    },

    reset(state: State): void
    {
        const s: State = getDefaultState()
        Object.assign(state, s)
    }
}

export default mutations