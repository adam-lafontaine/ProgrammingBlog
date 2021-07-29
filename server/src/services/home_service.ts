import { DataResult, IHomepageContent } from "../types/client.types"
import fs from "fs"

const root_path = "/home/adam/repos/ProgrammingBlog";
const home_content_path = root_path + "/content/pages/home.json";

export module home
{
    export function get_content(): DataResult<IHomepageContent>
    {
        let result = new DataResult<IHomepageContent>();
        let status = "";

        try
        {
            status = "reading file";
            const json_str = fs.readFileSync(home_content_path, 'utf8');

            status = "parsing json";
            const obj = JSON.parse(json_str);

            status = "getting content data";
            result.data = 
            {
                title: obj.title,
                text: obj.text
            };

            result.success = true;
            result.message = "Success";
        }
        catch(error: unknown)
        {
            result.success = false;
            result.message = `Error: ${status}`;
        }

        return result;
    }
}