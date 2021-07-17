import { IPostState as State } from './post.types'

export function getDefaultState(): State
{
    const s: State = {
        post_list: [],
        selected_post: null,

        error: null,
    }

    return s
}

const state = getDefaultState()

export default state