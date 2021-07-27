import { IRequest, IResponse } from "../types/server.types";
import { DataResult } from "../types/client.types";
import { post } from "../services/post_service";


export module pc
{
    export function send_post(req: IRequest, res: IResponse): void
    {
        if(!req.params.id)
        {
            const result: DataResult<any> = {
                success: false,
                message: "No post id provided",
                data: {}
            };

            res.send(result);
            return;
        }

        res.send(post.get_by_id(req.params.id));
    }


    export function send_post_list(req: IRequest, res: IResponse): void
    {
        res.send(post.get_list());
    }
}