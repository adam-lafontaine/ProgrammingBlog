export class DataResult<T>
{
    success: boolean = false;
    message: string = "";
    data: T = null;
}

export interface IPost
{
    content: Array<string>;
}