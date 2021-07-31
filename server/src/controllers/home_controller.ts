import { IRequest, IResponse } from "../types/server.types";
import { home } from "../services/home_service";

export module hc
{
    export function send_content(req: IRequest, res: IResponse): void
    {
        res.send(home.get_content());
    }


}