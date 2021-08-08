export interface IRequestParams
{
    id: string;
    body: any;
}

export interface IRequest
{
    params: IRequestParams;
    body: any;

    httpVersionMajor: number;
    httpVersionMinor: number;
    httpVersion: string;
    complete: boolean;
    aborted: boolean;
    url: string;
    method: string;
    baseUrl: string;
    originalUrl: string;

    socket: any;
    rawHeaders: any;
    rawTrailers: any;
    query: any;
    route: any;

    // upgrade: boolean;
    // statusCode: any;
    // statusMessage: any;
    // client: any;
    // next: any;
    // res: any;
    // _readableState: any;
    // _events: any;
    // _eventsCount: number;
    // _maxListeners: any;
    // _consuming: boolean;
    // _dumped: boolean;
    // _parsedUrl: any;
}

export interface IResponse
{
    send: (payload: any) => void;
    sendFile: (filePath: string) => void;
}

export interface IPostFileInfo
{
    filename: string; // "[timestamp][title].md"

    // properties in posts/post_manifest.json
    timestamp: string;
    title: string;
    route: string;
    tags: Array<string>;
}

