import { 
    IPostState as State,
    Make,

} from './post.types'

export function getDefaultState(): State
{
    const s: State = {
        post_list: [],
        selected_post: Make.post(),

        error: "",
    }

    return s
}

const state = getDefaultState()

export default state