import path from "path"
import fs from "fs"

const media_path = "/home/adam/repos/ProgrammingBlog/media";
const image_ext = ".jpg";

export module media
{
    export function get_image_path(id: string): string
    {
        //1626830000
        // TODO: validate with regex
        const timestamp = /^\d{10}$/;
        if(!id.match(timestamp))
        {
            return "invalid-id.jpg";
        }

        let status = "";
        let image_path = "";

        try
        {
            status = "getting image";
            image_path = get_file_path(id);

            console.log(image_path)
        }
        catch(error: unknown)
        {
            image_path = `error-${status.replace(/\s/g, "")}.jpg`;
        }

        return image_path;
    }
}


function get_file_path(timestamp: string): string
{
    const files = fs.readdirSync(media_path).filter(x => path.extname(x) === image_ext);
    if(files.length === 0)
    {
        return "no-image-files.jpg";
    }

    const file = files.find(x => x.startsWith(timestamp));
    if(file == null)
    {
        return "file-not-found.jpg";
    }

    return path.join(media_path, file);
}