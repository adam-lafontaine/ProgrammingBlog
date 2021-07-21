import { IRequest, IResponse } from "../types/server.types";
import { DataResult } from "../types/client.types";
import { post } from "../services/post_service";
import path from "path";


export module pc
{
    export function send_post(req: IRequest, res: IResponse): void
    {
        res.send(post.get_by_title("Post from a file"));
    }
}