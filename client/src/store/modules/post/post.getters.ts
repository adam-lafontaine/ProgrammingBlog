import { GetterTree as Tree } from 'vuex'
import { IPostState as State, PostGet as Get } from './post.types'

const getters: Tree<State, any> = {
    [Get.GET_HOMEPAGE_CONTENT]: state => state.homepage_content,
    [Get.GET_POST_LIST]: state => state.post_list,
    [Get.GET_SELECTED_POST]: state => state.selected_post,

    [Get.GET_VIDEO_RESOURCES]: state => state.video_resources,

    [Get.GET_ERROR]: state => state.error
}

export default getters