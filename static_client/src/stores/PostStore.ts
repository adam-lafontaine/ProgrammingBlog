import { defineStore } from "pinia";
import { marked } from "marked"


export interface IHomepageContent {
    title: string;
    text: string;
}


export interface DataResult<T>
{
    success: boolean;
    message: string;
    data: T;
}


export interface IPost {
    id: string;
    title: string;
    subtitle: string;
    tags: Array<string>;
    content_html: string;
}


export interface IPostInfo {
    number: string;
    id: string;
    title: string;
    tags: Array<string>;
    route: string;
    filename: string;
}


export interface IPostState {
    homepage_content: IHomepageContent;
    
    post_list: Array<IPostInfo>;
    selected_post: IPost;

    default_cms_branch: string;
    cms_branch: string;

    error: string;
}


const Make = {

    post: (): IPost =>
    {
        return {
            id: "",
            title: "",
            subtitle: "",
            tags: [],
            content_html: ""
        };
    },


    post_info: (): IPostInfo =>
    {
        return {
            number: "",
            id: "",
            title: "",
            tags: [],
            route: "",
            filename: ""
        }
    },


    homepage_content: (): IHomepageContent =>
    {
        return {
            title: "",
            text: ""
        };
    }
};


function cms_entry_route(branch_name: string): string
{
    return "https://raw.githubusercontent.com/adam-lafontaine/CMS/" + branch_name + "/blog";
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

    begin = end + 1;
    end = content_md.length;

    let content_html = marked.parse(content_md.substring(begin, end));

    return {
        id: info.id,
        title: title,
        subtitle: subtitle,
        tags: info.tags,
        content_html: content_html
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


export const usePostStore = defineStore("PostStore", {

    state: (): IPostState => ({
        homepage_content: Make.homepage_content(),
        post_list: [],
        selected_post: Make.post(),
        default_cms_branch: "current",
        cms_branch: "current",
        error: ""
    }),

    getters: {
        has_content: state => state.homepage_content.title.length > 0,
        has_posts: state => state.post_list.length > 0,
        is_default_cms_branch: state => state.cms_branch === state.default_cms_branch,
        home_title: state => state.homepage_content.title,
        home_text: state => state.homepage_content.text,
        posts_sorted: state => state.post_list.sort((a: IPostInfo, b: IPostInfo) => { return a.id < b.id ? 1 : -1; }),


    },

    actions: {

        async fetch_homepage_content(): Promise<any>
        {
            const url = cms_entry_route(this.cms_branch) + "/pages/home.json";
            let status = "";
            const empty_content = Make.homepage_content();

            const set_status = (s: string) => { status = `FETCH_HOMEPAGE_CONTENT ${s}`; };
            const report_error = () => 
            { 
                console.error(status);
                this.homepage_content = empty_content;
            };

            try
            {
                
                set_status("fetching content");
                const response = await fetch(url);            

                set_status("checking response data");
                const payload = await response.json();

                if(!has_object_properties(payload, empty_content))
                {
                    report_error();
                    return;
                }

                const data = payload as IHomepageContent;

                this.homepage_content = data;
            }
            catch(error: unknown)
            {                
                report_error();
                console.error(error);
            }
        },


        async fetch_post_list(): Promise<any>
        {
            const url = cms_entry_route(this.cms_branch) + "/posts/post_manifest.json";
            let status = "";
            const empty_list = [] as Array<IPostInfo>;
            const empty_post = Make.post_info();

            const set_status = (s: string) => { status = `FETCH_POST_LIST ${s}`; };
            const report_error = () => 
            { 
                console.error(status);
                this.post_list = empty_list;
            };

            try
            {
                set_status("fetching post list");
                const response = await fetch(url);
                const payload = await response.json();

                set_status("checking response data");
                if(!has_object_properties(payload, { posts: [] }))
                {
                    report_error();
                    return;
                }

                const list = (payload.posts as Array<any>).filter(x => x.id.length > 0);
                const valid_data = 
                    Array.isArray(list) &&
                    list.length > 0 &&
                    array_has_object_properties(list, empty_post);

                if(!valid_data)
                {
                    report_error();
                    return;
                }

                const data = list as Array<IPostInfo>;

                this.post_list = data;
            }
            catch(error: unknown)
            {                
                report_error();
                console.error(error);
            }
        },


        async fetch_selected_post(post_id: string): Promise<any>
        {
            const empty_post = Make.post();
            let status = "";

            const set_status = (s: string) => { status = `FETCH_SELECTED_POST ${s}`; };
            const report_error = () => 
            { 
                console.error(status);
                this.selected_post = empty_post;
            };        
            
            if(this.post_list.length === 0)
            {
                set_status("post list not loaded");
                report_error();
                return;
            }

            try
            {
                set_status("finding post listing");
                const info = this.post_list.find(x => x.id === post_id);
                if(info === undefined)
                {
                    report_error();
                    return;
                }

                const url = cms_entry_route(this.cms_branch) + `/posts/${info.filename}`;

                set_status("fetching blog post");
                const response = await fetch(url);
                const payload = await response.text();

                let content_md = payload;

                if(this.is_default_cms_branch)
                {
                    const regex = /\/CMS\/raw\/[A-Za-z0-9_-]*\//g;
                    content_md = content_md.replace(regex, `/CMS/raw/${this.default_cms_branch}/`)
                }
                
                set_status("building post");
                const post = build_post(info, content_md);

                this.selected_post = post;
            }
            catch (error: unknown)
            {            
                console.error(error);                
                report_error();
            }
        },


        async load_cms_branch(branch: string): Promise<any>
        {
            const url = cms_entry_route(branch) + "/pages/home.json";
            let status = "";
            const empty_content = Make.homepage_content();

            const set_status = (s: string) => { status = `LOAD_CMS_BRANCH ${s}`; };
            const report_error = () => 
            { 
                console.error(status);
                console.log(`No branch ${branch} found`);
                this.homepage_content = empty_content;
            };

            try
            {            
                set_status("fetching content");
                const response = await fetch(url);
                const payload = await response.json();   

                set_status("checking response data");
                if(!has_object_properties(payload, empty_content))
                {
                    report_error();
                    return;
                }

                const data = payload as IHomepageContent;            

                this.homepage_content = data;
                this.cms_branch = branch;
            }
            catch(error: unknown)
            {                
                console.error(error);
                report_error();
            }
        }
    }
});