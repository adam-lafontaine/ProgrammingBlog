import { GetterTree as Tree } from 'vuex'
import { ITestState as State, TestGet as Get } from './test.types'

const getters: Tree<State, any> = {
    [Get.GET_TEST_DATA]: state => state.data
}

export default getters