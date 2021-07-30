import { IRequest, IResponse } from "../types/server.types";
import { DataResult } from "../types/client.types";
import { home } from "../services/home_service";
import path from "path";

//const client_path = path.join(__dirname, "../client");

export module hc
{
    /*
    export function send_client(req: IRequest, res: IResponse): void
    {

        console.log(client_path)
        
        res.sendFile(path.join(client_path, "index.html"));
    }*/


    export function send_content(req: IRequest, res: IResponse): void
    {
        res.send(home.get_content());
    }


}