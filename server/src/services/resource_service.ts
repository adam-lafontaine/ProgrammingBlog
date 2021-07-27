import { 
    DataResult, 
    IVideoResource,
} from "../types/client.types"
import fs from "fs"
import path from "path"

const root_path = "/home/adam/repos/ProgrammingBlog";
const video_file_path = root_path + "/content/resources/youtube_videos.json";

export module resource
{
    export function get_videos(): DataResult<Array<IVideoResource>>
    {
        let result = new DataResult<Array<IVideoResource>>();
        let status = "";

        try
        {
            status = "reading file";
            const json_str = fs.readFileSync(video_file_path, 'utf8');

            status = "parsing json";
            const obj = JSON.parse(json_str);

            status = "validating json";
            if(!obj.hasOwnPropery("videos") || !Array.isArray(obj.videos))
            {

            }

            status = "getting video data";
            const data = build_video_resources(obj.videos);

            result.success = true;
            result.data = data;
        }
        catch(error: unknown)
        {
            result.success = false;
            result.message = `Error: ${status}`;
        }

        return result;
    }
}


function build_video_resources(videos: Array<any>): Array<IVideoResource>
{
    let list: Array<IVideoResource> = [];

    for (let item of videos)
    {
        list.push({
            youtube_id: item.youtube_id,
            description: item.description
        });
    }    

    return list;
}