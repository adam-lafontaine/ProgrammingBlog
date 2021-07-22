import { DataResult } from "../types/client.types"
import path from "path"
import fs from "fs"

const media_path = "/home/adam/repos/ProgrammingBlog/media";
const image_ext = ".jpg";

export module media
{
    export function get_image_path(id: string): DataResult<string>
    {
        let result = new DataResult<string>();
        let status = "";

        status = "validating image id";
        const timestamp = /^\d{10}$/;
        if(!id.match(timestamp))
        {
            result.success = false;
            result.message = "invalid image id";
            return result;
        }

        try
        {
            status = "searching images";
            const files = fs.readdirSync(media_path).filter(x => path.extname(x) === image_ext);
            if(files.length === 0)
            {
                result.success = false;
                result.message = "No images found";
            }

            status = "searching for image";
            const file = files.find(x => get_image_id(x) === id);
            if(file == null)
            {
                result.success = false;
                result.message = `Image id ${id} not found`;
            }

            result.success = true;
            result.message = "Success";
            result.data = path.join(media_path, file);
        }
        catch(error: unknown)
        {
            result.success = false;
            result.message = `Error: ${status}`;
        }

        return result;
    }
}


function get_image_id(filename: string): string
{
    let begin = filename.indexOf("[") + 1;
    let end = filename.indexOf("]", begin);
    return filename.substring(begin, end);
}