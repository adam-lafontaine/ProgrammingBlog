import { IRequest, IResponse } from "../types/server.types"
import { media } from "../services/media_service"

export module mc
{
    export function send_image(req: IRequest, res: IResponse): void
    {
        if(!req.params.id)
        {
            res.send("error");
            return;
        }

        const result = media.get_image_path(req.params.id);
        if(!result.success)
        {
            res.send(result.message);
        }

        res.sendFile(result.data);
    }
}


