import { MutationTree as Tree } from 'vuex'
import {
    PostMutation as Mutation,
    IPostState as State,
    IPost, IPostInfo, IVideoResource, IWebsiteResource, IHomepageContent

} from './post.types'
import { getDefaultState } from './post.state'

const mutations: Tree<State> = {

    [Mutation.SET_HOMEPAGE_CONTENT](state: State, content: IHomepageContent): void
    {
        state.homepage_content = content;
    },

    [Mutation.SET_POST_LIST](state: State, list: Array<IPostInfo>): void
    {
        state.post_list = list;
    },


    [Mutation.SET_SELECTED_POST](state: State, post: IPost): void
    {
        state.selected_post = post;
    },


    [Mutation.SET_VIDEO_RESOURCES](state: State, resources: Array<IVideoResource>): void
    {
        state.video_resources = resources;
    },

    [Mutation.SET_WEBSITE_RESOURCES](state: State, resources: Array<IWebsiteResource>): void
    {
        state.website_resources = resources;
    },


    [Mutation.SET_CMS_BRANCH](state: State, branch: string): void
    {
        state.cms_branch = branch;
    },


    [Mutation.SET_ERROR](state: State, error: string): void
    {
        state.error = error;
    },


    reset(state: State): void
    {
        const s: State = getDefaultState()
        Object.assign(state, s)
    }
}

export default mutations