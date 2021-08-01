import { 
    DataResult, 
    IPost, IPostInfo
} from "../types/client.types"
import { IPostFileInfo } from "../types/server.types"
import path from "path"
import fs from "fs"
import marked from "marked"
import Config from "../server_config"

const post_path = Config.POSTS_PATH;
const manifest_path = post_path + "/post_manifest.json";


export module post
{
    export function get_by_id(id: string): DataResult<IPost>
    {
        let result = new DataResult<IPost>();
        let status = "";

        try
        {
            status = "locating posts";
            const post_data = get_post_file_info();

            status = "finding post id";
            const item = post_data.find(x => x.timestamp === id);
            if(item == null)
            {
                result.success = false;
                result.message = `Post id '${id}' not found`;
                return result;
            }

            status = "reading file";
            const post = read_post_file(item.filename, post_data);

            result.data = post;
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


    export function get_by_title(title: string): DataResult<IPost>
    {
        let result = new DataResult<IPost>();
        let status = "";

        try
        {
            status = "locating posts";
            const post_data = get_post_file_info();

            status = "finding post title";
            const item = post_data.find(x => x.title === title);
            if(item == null)
            {
                result.success = false;
                result.message = `Post '${title}' not found`;
                return result;
            }

            status = "reading file";
            const post = read_post_file(item.filename, post_data);

            result.data = post;
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


    export function get_info_list(): DataResult<Array<IPostInfo>>
    {
        let result = new DataResult<Array<IPostInfo>>();
        let status = "";

        const desc = (a: IPostFileInfo, b: IPostFileInfo) => { return a.timestamp < b.timestamp ? 1 : -1; };

        try
        {
            status = "getting post info";
            const all_posts = get_post_file_info();

            result.success = true;
            result.message = "Success";
            result.data = all_posts.sort(desc).map(x => to_post_info(x));
        }
        catch(error: unknown)
        {
            result.success = false;
            result.message = `Error: ${status}`;
        }

        return result;
    }
}


function get_post_file_info(): Array<IPostFileInfo>
{
    const files = fs.readdirSync(post_path);

    const json_str = fs.readFileSync(manifest_path, 'utf8');
    const obj = JSON.parse(json_str);
    const manifest_data = (obj.posts as Array<any>).filter(x => x.id.length > 0);

    let list: Array<IPostFileInfo> = [];

    for(const item of manifest_data)
    {
        const file = files.find(x => x.includes(item.id));
        if(file == null)
        {
            continue;
        }

        list.push({
            filename: file,
            timestamp: item.id,
            title: item.title,
            route: item.route,
            tags: item.tags
        });
    }

    return list;
}


function to_post_info(file_info: IPostFileInfo): IPostInfo
{
    return {
        id: file_info.timestamp,
        title: file_info.title,
        tags: file_info.tags,
        route: file_info.route
    };
}


function read_post_file(filename: string, posts: Array<IPostFileInfo>): IPost
{
    const info = posts.find(x => x.filename === filename);

    const file_path = path.join(post_path, filename);
    const data = fs.readFileSync(file_path, "utf8");

    const title_flag = "#";
    const subtitle_flag = "##";

    let begin = data.indexOf(title_flag) + title_flag.length + 1;
    let end = data.indexOf("\n", begin);
    const title = data.substring(begin, end);

    begin = data.indexOf(subtitle_flag) + subtitle_flag.length + 1;
    end = data.indexOf("\n", begin);
    const subtitle = data.substring(begin, end);

    return {
        id: info.timestamp,
        title: title,
        subtitle: subtitle,
        tags: info.tags,
        content_html: marked(data.substr(end + 1))
    };
}