//======= FUNCTION ENUMS ======================

export const enum PostAction {
    FETCH_SELECTED_POST = "fetchSelectedPost",
}

export const enum PostGet {
    GET_SELECTED_POST = "getSelectedPost"
}

export const enum PostMutation {
    SET_SELECTED_POST = "setSelectedPost"
}

// ^^^^^^^ FUNCTION ENUMS ^^^^^^^^^^^^^^^^^^^^^^

export interface IPostState {
    post_list: Array<string>;
    selected_post: IPost;
}


export class DataResult<T>
{
    success: boolean = false;
    message: string = "";
    data: T = null;
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