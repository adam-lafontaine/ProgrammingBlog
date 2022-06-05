import { 
    IPostState as State,
    Make,

} from './post.types'

export function getDefaultState(): State
{
    const s: State = {
        homepage_content: Make.homepage_content(),
        post_list: [],
        selected_post: Make.post(),

        video_resources: [],
        website_resources: [],

        default_cms_branch: "current",

        cms_branch: "current",

        error: "",
    }

    return s
}

const state = getDefaultState()

export default state