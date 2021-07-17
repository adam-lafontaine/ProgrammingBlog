import axios, { AxiosResponse } from 'axios'
import { ActionTree as Tree } from 'vuex'
import {    
    PostAction as Action,
    PostMutation as Mutation,
    IPostState as State,
    DataResult, 
    IPost,
    Make

} from './post.types'

const ENTRY_ROUTE = "http://localhost:8081/api"

const actions: Tree<State, State> = {

    async [Action.FETCH_SELECTED_POST]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + "/post";
        const empty_post = Make.post();
        let status = "";

        const report_error = () => 
        { 
            console.error(`unexpected response`);
            commit(Mutation.SET_SELECTED_POST, empty_post); 
        };

        try
        {
            status = "fetching blog post";
            const response = await axios.get(url);            
            
            status = "checking response type";
            if(!is_DataResult(response.data))
            {
                report_error();
                return;
            }

            status = "checking response data";
            if(!has_object_properties(response.data.data, empty_post))
            {
                report_error();
                return;
            }
            
            const result = response.data as DataResult<IPost>;

            status = result.message;
            if(!result.success)
            {
                report_error();
                return;
            }

            commit(Mutation.SET_SELECTED_POST, result.data);
        }
        catch (error: unknown)
        {            
            console.error(error);
            commit(Mutation.SET_SELECTED_POST, empty_post);
        }
    },

}


function has_object_properties(val: any, obj: object): boolean
{
    if(val === null || typeof val !== 'object')
    {
        return false;
    }

    for(let prop in Object.keys(obj))
    {
        if(!val.hasOwnProperty(prop))
        {
            return false;
        }
    }

    return true;
}


function is_DataResult(val: any): boolean
{
    return has_object_properties(val, new DataResult<any>());
}

export default actions