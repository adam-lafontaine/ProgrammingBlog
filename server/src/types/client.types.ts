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