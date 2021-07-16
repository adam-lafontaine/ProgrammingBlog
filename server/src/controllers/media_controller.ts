import { IRequest, IResponse, DataResult } from "../server_types"
import path from "path"

const media_path = path.join(__dirname, "../../media");


export module mc
{
    export function send_image(req: IRequest, res: IResponse): void
    {
        const image_path = path.join(media_path, "corvette.jpg");
        res.sendFile(image_path);
    }
}