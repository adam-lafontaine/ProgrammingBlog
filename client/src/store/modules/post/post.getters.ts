import { GetterTree as Tree } from 'vuex'
import { IPostState as State, PostGet as Get } from './post.types'

const getters: Tree<State, any> = {
    [Get.GET_SELECTED_POST]: state => state.selected_post,
}

export default getters