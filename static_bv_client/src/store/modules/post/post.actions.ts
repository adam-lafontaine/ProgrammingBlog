import axios from 'axios'
import { ActionTree as Tree } from 'vuex'
import {    
    PostAction as Action,
    PostMutation as Mutation,
    IPostState as State,
    DataResult,
    IPost, IPostInfo,
    Make,
    IVideoResource,
    IHomepageContent
} from './post.types'
import Config from "../../../client_config"


const ENTRY_ROUTE = Config.SERVER_URL + "/api"

const actions: Tree<State, any> = {

    async [Action.FETCH_HOMEPAGE_CONTENT]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + "/home";
        let status = "";
        const empty = Make.homepage_content();

        const set_status = (s: string) => { status = `FETCH_HOMEPAGE_CONTENT ${s}`; };
        const report_error = () => 
        { 
            console.error(status);
            commit(Mutation.SET_HOMEPAGE_CONTENT, empty);
        };

        try
        {
            set_status("fetching content");
            const response = await axios.get(url);

            set_status("checking response type");
            if(!is_DataResult(response.data))
            {
                report_error();
                return;
            }

            const result = response.data as DataResult<IHomepageContent>;

            set_status(result.message);
            if(!result.success)
            {
                report_error();
                return;
            }

            set_status("checking response data");
            if(!has_object_properties(response.data.data, empty))
            {
                report_error();
                return;
            }     

            commit(Mutation.SET_HOMEPAGE_CONTENT, result.data);
        }
        catch(error: unknown)
        {
            console.error(error);
            commit(Mutation.SET_HOMEPAGE_CONTENT, empty);
        }
    },

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

            set_status("checking response type");
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


    async [Action.FETCH_VIDEO_RESOURCES]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + `/resources/videos`;
        const empty = Make.video_resource();
        let status = "";

        const set_status = (s: string) => { status = `FETCH_VIDEO_RESOURCES ${s}`; };
        const report_error = () => 
        { 
            console.error(status);
            commit(Mutation.SET_VIDEO_RESOURCES, []);
        };

        try
        {
            set_status("fetching resources");
            const response = await axios.get(url);
            
            set_status("checking response type");
            if(!is_DataResult(response.data))
            {
                report_error();
                return;
            }

            const result = response.data as DataResult<Array<IVideoResource>>;

            set_status(result.message);
            if(!result.success)
            {
                report_error();
                return;
            }

            set_status("checking response data");
            if(!Array.isArray(response.data.data))
            {
                report_error();
                return;
            }

            if(!array_has_object_properties(result.data, empty))
            {
                report_error();
                return;
            }     

            commit(Mutation.SET_VIDEO_RESOURCES, result.data);
        }
        catch(error: unknown)
        {
            console.error(error);
            commit(Mutation.SET_VIDEO_RESOURCES, []);
        }
    }

}


function has_object_properties(val: any, obj: object): boolean
{
    if(val === null || typeof val !== 'object')
    {
        return false;
    }

    const keys = Object.keys(obj);

    return keys.every(x => val.hasOwnProperty(x));
}


function array_has_object_properties(arr: Array<any>, obj: object): boolean
{
    return arr.every(x => has_object_properties(x, obj));
}


function is_DataResult(val: any): boolean
{
    return has_object_properties(val, new DataResult<any>());
}

export default actions