import { defineStore } from "pinia";


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


export const usePostStore = defineStore("PostStore", {

    state: (): IPostState => ({
        homepage_content: Make.homepage_content(),
        post_list: [],
        selected_post: Make.post(),
        default_cms_branch: "current",
        cms_branch: "current",
        error: ""
    }),
});