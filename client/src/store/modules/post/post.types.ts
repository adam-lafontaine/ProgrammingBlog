//======= FUNCTION ENUMS ======================

export const enum PostAction {
    FETCH_SELECTED_POST = "fetchSelectedPost",
}


export const enum PostGet {
    GET_POST_LIST = "getPostList",
    GET_SELECTED_POST = "getSelectedPost",

    GET_ERROR = "getError"
}


export const enum PostMutation {
    SET_POST_LIST = "setPostList",
    SET_SELECTED_POST = "setSelectedPost",

    SET_ERROR = "setError"
}


// ^^^^^^^ FUNCTION ENUMS ^^^^^^^^^^^^^^^^^^^^^^


export class DataResult<T>
{
    success: boolean = false;
    message: string = "";
    data: T = null;
}


export interface IPostState {
    post_list: Array<string>;
    selected_post: IPost;

    error: string;
}


export const enum ContentItemType {
    Text = 0,
    Image,
    Code,
}


export interface IContentItem {
    type: ContentItemType;
    content: string;
}


export interface IPost {
    title: string;
    tags: Array<string>;
    content: Array<IContentItem>;
}


export module Make
{
    export function post(): IPost
    {
        return {
            title: "",
            tags: [],
            content: []
        };
    }
}