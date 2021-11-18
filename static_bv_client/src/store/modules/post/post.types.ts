
export const enum PostAction {
    FETCH_HOMEPAGE_CONTENT = "fetchHomepageContent",

    FETCH_POST_LIST = "fetchPostList",
    FETCH_SELECTED_POST = "fetchSelectedPost",

    FETCH_VIDEO_RESOURCES = "fetchVideoResources",
    FETCH_WEBSITE_RESOURCES = "fetchWebsiteResources",
}


export const enum PostGet {
    GET_HOMEPAGE_CONTENT = "getHomepageContent",

    GET_POST_LIST = "getPostList",
    GET_SELECTED_POST = "getSelectedPost",

    GET_VIDEO_RESOURCES = "getVideoResources",
    GET_WEBSITE_RESOURCES = "getWebsiteResources",

    GET_ERROR = "getError"
}


export const enum PostMutation {
    SET_HOMEPAGE_CONTENT = "setHomepageContent",

    SET_POST_LIST = "setPostList",
    SET_SELECTED_POST = "setSelectedPost",

    SET_VIDEO_RESOURCES = "setVideoResources",
    SET_WEBSITE_RESOURCES = "setWebsiteResources",

    SET_ERROR = "setError"
}



export class DataResult<T>
{
    success: boolean = false;
    message: string = "";
    data: T = null;
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


export interface IVideoResource {
    youtube_id: string;
    description: string;
}


export interface IWebsiteResource {
    url: string;
    title: string;
    description: string
}


export interface IHomepageContent {
    title: string;
    text: string;
}


export interface IPostState {
    homepage_content: IHomepageContent;
    
    post_list: Array<IPostInfo>;
    selected_post: IPost;

    video_resources: Array<IVideoResource>;
    website_resources: Array<IWebsiteResource>;

    error: string;
}





export module Make
{
    export function post(): IPost
    {
        return {
            id: "",
            title: "",
            subtitle: "",
            tags: [],
            content_html: ""
        };
    }


    export function video_resource(): IVideoResource
    {
        return {
            youtube_id: "",
            description: ""
        };
    }


    export function website_resource(): IWebsiteResource
    {
        return {
            url: "",
            title: "",
            description: ""
        };
    }


    export function post_info(): IPostInfo
    {
        return {
            number: "",
            id: "",
            title: "",
            tags: [],
            route: "",
            filename: ""
        }
    }


    export function homepage_content(): IHomepageContent
    {
        return {
            title: "",
            text: ""
        };
    }
}