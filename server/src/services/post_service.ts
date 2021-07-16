import { DataResult, IPost } from "../types/client.types";
import testpost from "../posts/testpost";

export module post
{
    export function get_post(): DataResult<IPost>
    {
        let result = new DataResult<IPost>();

        result.data = testpost;
        result.message = "success";
        result.success = true;

        return result;
    }


}

