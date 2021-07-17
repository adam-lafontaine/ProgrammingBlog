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