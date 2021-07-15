import { IRequest, IResponse, DataResult } from "../server_types"
import { echo_id, get_object_properties, update_something } from "../services/home_service"
import { post } from "../services/post_service";


export module hc
{
    export function home(req: IRequest, res: IResponse): void
    {
        res.send("Home page");
    }


    export function try_echo(req: IRequest, res: IResponse): void
    {
        if(!req.params.id)
        {
            send_error(res, "No Id sent");
            return;
        }

        const id_str = req.params.id;
        const positive_int = /^[1-9]\d*$/;

        if(!id_str.match(positive_int))
        {
            send_error(res, `Id: '${id_str}' is not an integer`);
            return;
        }

        const radix_base = 10; // decimal
        const id = parseInt(req.params.id, radix_base);

        const payload = echo_id(id);

        res.send(payload);
    }


    export function request_props(req: IRequest, res: IResponse): void
    {
        const payload = get_object_properties(req);

        res.send(payload);
    }


    export function update_data(req: IRequest, res: IResponse): void
    {
        const data = req.body;
        const payload = update_something(data);

        res.send(payload);
    }


    export function get_post(req: IRequest, res: IResponse): void
    {
        res.send(post.get_post());
    }

}


function send_error(res: IResponse, message: string): void
{
    const result: DataResult<number> = {
        success: false,
        message,
        data: 0
    };

    res.send(result);
}