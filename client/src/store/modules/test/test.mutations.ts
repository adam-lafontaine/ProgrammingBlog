import { MutationTree as Tree } from 'vuex'
import {
    TestMutation as Mutation,
    ITestState as State

} from './test.types'
import { getDefaultState } from './test.state'

const mutations: Tree<State> = {
    [Mutation.SET_TEST_DATA](state: State, data: any): void
    {
        state.data = data
    },

    reset(state: State): void
    {
        const s: State = getDefaultState()
        Object.assign(state, s)
    }
}

export default mutations