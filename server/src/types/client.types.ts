export class DataResult<T>
{
    success: boolean = false;
    message: string = "";
    data: T = null;
}

export const enum ContentType {
    Text = 0,
    Image,
    Code,
}

export interface IContentItem {
    content_type: ContentType;
    content: string;
}

export interface IPost {
    title: string;
    subtitle: string;
    tags: Array<string>;
    content: Array<IContentItem>;
}