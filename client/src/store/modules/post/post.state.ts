import { 
    IPostState as State,
    Make,

} from './post.types'

export function getDefaultState(): State
{
    const s: State = {
        post_list: [],
        selected_post: Make.post(),

        video_resources: [],

        error: "",
    }

    return s
}

const state = getDefaultState()

export default state