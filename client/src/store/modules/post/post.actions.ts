import axios from 'axios'
import { ActionTree as Tree } from 'vuex'
import {    
    PostAction as Action,
    PostMutation as Mutation,
    IPostState as State,
    DataResult,
    IPost, IPostInfo,
    Make
} from './post.types'

const ENTRY_ROUTE = "http://localhost:8081/api"

const actions: Tree<State, any> = {

    async [Action.FETCH_POST_LIST]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + "/post/list";
        let status = "";

        const set_status = (s: string) => { status = `FETCH_POST_LIST ${s}`; };
        const report_error = () => 
        { 
            console.error(status);
            commit(Mutation.SET_POST_LIST, []);
        };

        try
        {
            set_status("fetching post list");
            const response = await axios.get(url);

            status = "checking response type";
            if(!is_DataResult(response.data))
            {
                report_error();
                return;
            }

            const result = response.data as DataResult<IPostInfo>;

            set_status(result.message);
            if(!result.success)
            {
                report_error();
                return;
            }

            if(!Array.isArray(response.data.data))
            {
                report_error();
                return;
            }

            commit(Mutation.SET_POST_LIST, result.data);
        }
        catch(error: unknown)
        {
            console.error(error);
            commit(Mutation.SET_POST_LIST, []);
        }

    },


    async [Action.FETCH_SELECTED_POST]({ commit, state }, post_id: string): Promise<any>
    {
        const url = ENTRY_ROUTE + `/post/${post_id}`;
        const empty_post = Make.post();
        let status = "";

        const set_status = (s: string) => { status = `FETCH_SELECTED_POST ${s}`; };
        const report_error = () => 
        { 
            console.error(status);
            commit(Mutation.SET_SELECTED_POST, empty_post); 
        };

        try
        {
            set_status("fetching blog post");
            const response = await axios.get(url);
            
            status = "checking response type";
            if(!is_DataResult(response.data))
            {
                report_error();
                return;
            }

            const result = response.data as DataResult<IPost>;

            set_status(result.message);
            if(!result.success)
            {
                report_error();
                return;
            }

            set_status("checking response data");
            if(!has_object_properties(response.data.data, empty_post))
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

    for(let prop of Object.keys(obj))
    {
        if(!val.hasOwnProperty(prop))
        {
            console.log(prop)
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