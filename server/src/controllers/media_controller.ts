import { IRequest, IResponse } from "../types/server.types";
import { DataResult } from "../types/client.types";
import path from "path"

const media_path = "/home/adam/repos/ProgrammingBlog/media";
const error_image = path.join(media_path, "x.jpg");

export module mc
{
    export function send_image(req: IRequest, res: IResponse): void
    {
        if(!req.params.id)
        {
            res.sendFile(error_image);
            return;
        }

        const image_path = get_image_path(req.params.id);
        res.sendFile(image_path);
    }
}


function get_image_path(id: string): string
{
    return path.join(media_path, "corvette.jpg");
}