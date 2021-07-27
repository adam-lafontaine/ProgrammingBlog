import { IRequest, IResponse } from "../types/server.types";
import { DataResult } from "../types/client.types";
import { resource } from "../services/resource_service"

export module rc
{
    export function send_video_resources(req: IRequest, res: IResponse): void
    {
        res.send(resource.get_videos());
    }
}