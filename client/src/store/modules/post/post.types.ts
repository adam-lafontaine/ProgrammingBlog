//======= FUNCTION ENUMS ======================

export const enum PostAction {
    FETCH_POST_LIST = "fetchPostList",
    FETCH_SELECTED_POST = "fetchSelectedPost",

    FETCH_VIDEO_RESOURCES = "fetchVideoResources",
}


export const enum PostGet {
    GET_POST_LIST = "getPostList",
    GET_SELECTED_POST = "getSelectedPost",

    GET_VIDEO_RESOURCES = "getVideoResources",

    GET_ERROR = "getError"
}


export const enum PostMutation {
    SET_POST_LIST = "setPostList",
    SET_SELECTED_POST = "setSelectedPost",

    SET_VIDEO_RESOURCES = "setVideoResources",

    SET_ERROR = "setError"
}


// ^^^^^^^ FUNCTION ENUMS ^^^^^^^^^^^^^^^^^^^^^^


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
    id: string;
    title: string;
    tags: Array<string>;
    route: string; 
}


export interface IVideoResource {
    youtube_id: string;
    description: string;
}


export interface IPostState {
    post_list: Array<IPostInfo>;
    selected_post: IPost;

    video_resources: Array<IVideoResource>;

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
}