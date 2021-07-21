import { IRequest, IResponse } from "../types/server.types"
import { media } from "../services/media_service"

export module mc
{
    export function send_image(req: IRequest, res: IResponse): void
    {
        if(!req.params.id)
        {
            res.sendFile("error.jpg");
            return;
        }

        const image_path = media.get_image_path(req.params.id);
        res.sendFile(image_path);
    }
}


