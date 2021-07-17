import axios, { AxiosResponse } from 'axios'
import { ActionTree as Tree } from 'vuex'
import {
    PostAction as Action,
    PostMutation as Mutation,
    IPostState as State,
    DataResult, IPost,

} from './post.types'

const ENTRY_ROUTE = "http://localhost:8081/api"

const actions: Tree<State, State> = {

    async [Action.FETCH_SELECTED_POST]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + "/post";

        let post: IPost = null;

        try
        {
            const response = await axios.get(url);
            const data = response.data;
            data.success;
            data.message;
            data.data;
            

            commit(Mutation.SET_TEST_DATA, response.data);
        }
        catch (error: unknown)
        {
            commit(Mutation.SET_TEST_DATA, error)
        }

        commit(Mutation.SET_SELECTED_POST, post);
    },

}


function validate(res: AxiosResponse<any>): boolean
{

}

export default actions