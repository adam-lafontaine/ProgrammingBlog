import axios, { AxiosResponse } from 'axios'
import { ActionTree as Tree } from 'vuex'
import {    
    PostAction as Action,
    PostMutation as Mutation,
    IPostState as State,
    IPost, IPostInfo,
    Make,
    IVideoResource,
    IHomepageContent,
    IWebsiteResource
} from './post.types'
import marked from "marked"

const CMS_BRANCH = "current";
const ENTRY_ROUTE = "https://raw.githubusercontent.com/adam-lafontaine/CMS/" + CMS_BRANCH + "/blog";

const actions: Tree<State, any> = {

    async [Action.FETCH_HOMEPAGE_CONTENT]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + "/pages/home.json";
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
            const response = await axios_get(url);            

            set_status("checking response data");
            if(!has_object_properties(response.data, empty))
            {
                report_error();
                return;
            }

            const data = response.data as IHomepageContent;

            commit(Mutation.SET_HOMEPAGE_CONTENT, data);
        }
        catch(error: unknown)
        {
            console.error(error);
            commit(Mutation.SET_HOMEPAGE_CONTENT, empty);
        }
    },


    async [Action.FETCH_POST_LIST]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + "/posts/post_manifest.json";
        let status = "";
        const empty = Make.post_info();

        const set_status = (s: string) => { status = `FETCH_POST_LIST ${s}`; };
        const report_error = () => 
        { 
            console.error(status);
            commit(Mutation.SET_POST_LIST, []);
        };

        try
        {
            set_status("fetching post list");
            const response = await axios_get(url);

            set_status("checking response data");
            if(!has_object_properties(response.data, { posts: [] }))
            {
                report_error();
                return;
            }

            const list = (response.data.posts as Array<any>).filter(x => x.id.length > 0);
            const valid_data = 
                Array.isArray(list) &&
                list.length > 0 &&
                array_has_object_properties(list, empty);

            if(!valid_data)
            {
                report_error();
                return;
            }

            const data = list as Array<IPostInfo>;

            commit(Mutation.SET_POST_LIST, data);
        }
        catch(error: unknown)
        {
            console.error(error);
            commit(Mutation.SET_POST_LIST, []);
        }

    },


    async [Action.FETCH_SELECTED_POST]({ commit, state }, post_id: string): Promise<any>
    {
        
        const empty_post = Make.post();
        let status = "";

        const set_status = (s: string) => { status = `FETCH_SELECTED_POST ${s}`; };
        const report_error = () => 
        { 
            console.error(status);
            commit(Mutation.SET_SELECTED_POST, empty_post); 
        };        
        
        if(state.post_list.length === 0)
        {
            set_status("post list not loaded");
            report_error();
            return;
        }

        try
        {
            set_status("finding post listing");
            const info = state.post_list.find(x => x.id === post_id);
            if(info == null)
            {
                report_error();
                return;
            }

            const url = ENTRY_ROUTE + `/posts/${info.filename}`;

            set_status("fetching blog post");
            const response = await axios_get(url);
            
            set_status("building post");
            const post = build_post(info, response.data);

            commit(Mutation.SET_SELECTED_POST, post);
        }
        catch (error: unknown)
        {            
            console.error(error);
            commit(Mutation.SET_SELECTED_POST, empty_post);
        }
    },


    async [Action.FETCH_VIDEO_RESOURCES]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + `/resources/youtube_videos.json`;
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
            const response = await axios_get(url);
            
            set_status("checking response data");
            if(!has_object_properties(response.data, { videos: [] }))
            {
                report_error();
                return;
            }

            const list = response.data.videos as Array<any>;

            const valid_data = 
                Array.isArray(list) &&
                list.length > 0 &&
                array_has_object_properties(list, empty);

            if(!valid_data)
            {
                report_error();
                return;
            }

            const data = list as Array<IVideoResource>;

            commit(Mutation.SET_VIDEO_RESOURCES, data);
        }
        catch(error: unknown)
        {
            console.error(error);
            commit(Mutation.SET_VIDEO_RESOURCES, []);
        }
    },


    async [Action.FETCH_WEBSITE_RESOURCES]({ commit, state }): Promise<any>
    {
        const url = ENTRY_ROUTE + "/resources/websites.json";
        const empty = Make.website_resource();
        let status = "";

        const set_status = (s: string) => { status = `FETCH_WEBSITE_RESOURCES ${s}`; };
        const report_error = () => 
        { 
            console.error(status);
            commit(Mutation.SET_WEBSITE_RESOURCES, []);
        };

        try
        {
            set_status("fetching resources");
            const response = await axios_get(url);
            
            set_status("checking response data");
            if(!has_object_properties(response.data, { websites: [] }))
            {
                report_error();
                return;
            }

            const list = response.data.websites as Array<any>;            

            const valid_data = 
                Array.isArray(list) &&
                list.length > 0 &&
                array_has_object_properties(list, empty);

            if(!valid_data)
            {
                report_error();
                return;
            }

            const data = list as Array<IWebsiteResource>;
            commit(Mutation.SET_WEBSITE_RESOURCES, data);
        }
        catch(error: unknown)
        {
            console.error(status);
            console.error(error);
            commit(Mutation.SET_WEBSITE_RESOURCES, []);
        }
    }

}


function axios_get(url: string): Promise<AxiosResponse<any>>
{
    let response = axios.get(url/*, { headers: { 'Access-Control-Allow-Origin': '*' }}*/);

    return response;
}


function build_post(info: IPostInfo, content_md: string): IPost
{
    const title_flag = "#";
    const subtitle_flag = "##";

    let begin = content_md.indexOf(title_flag) + title_flag.length + 1;
    let end = content_md.indexOf("\n", begin);
    const title = content_md.substring(begin, end);

    begin = content_md.indexOf(subtitle_flag) + subtitle_flag.length + 1;
    end = content_md.indexOf("\n", begin);
    const subtitle = content_md.substring(begin, end);

    return {
        id: info.id,
        title: title,
        subtitle: subtitle,
        tags: info.tags,
        content_html: marked(content_md.substr(end + 1))
    };
}


function has_object_properties(val: any, obj: any): boolean
{
    if(val === null || typeof val !== 'object' || typeof obj !== 'object')
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


export default actions