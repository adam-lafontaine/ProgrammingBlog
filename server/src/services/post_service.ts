import { 
    DataResult, 
    IPost, IPostInfo
} from "../types/client.types"
import { IPostFileInfo } from "../types/server.types"
import fs from "fs"
import path from "path"
import marked from "marked"

const root_path = "/home/adam/repos/ProgrammingBlog";
const post_path = root_path + "/content/posts";


export module post
{
    export function get_by_id(id: string): DataResult<IPost>
    {
        let result = new DataResult<IPost>();
        let status = "";

        try
        {
            status = "locating posts";
            const post_data = get_post_info();

            status = "finding post id";
            const item = post_data.find(x => x.timestamp === id);
            if(item == null)
            {
                result.success = false;
                result.message = `Post id '${id}' not found`;
                return result;
            }

            status = "reading file";
            const post = read_post_file(item.filename);

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
            const post_data = get_post_info();

            status = "finding post title";
            const item = post_data.find(x => x.title === title);
            if(item == null)
            {
                result.success = false;
                result.message = `Post '${title}' not found`;
                return result;
            }

            status = "reading file";
            const post = read_post_file(item.filename);

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


    export function get_list(): DataResult<Array<IPostInfo>>
    {
        let result = new DataResult<Array<IPostInfo>>();
        let status = "";

        let desc = (a: IPostFileInfo, b: IPostFileInfo) => { return a.timestamp < b.timestamp ? 1 : -1; };

        try
        {
            status = "getting post info";
            const all_posts = get_post_info();

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


function get_post_info(): Array<IPostFileInfo>
{
    const files = fs.readdirSync(post_path);

    // "[timestamp][title][tags]"
    // TODO: validate with regex
    const is_valid = (s: string) => { return true; };

    return files.filter(x => is_valid(x)).map(x => to_post_file_info(x));
}


function to_post_file_info(filename: string): IPostFileInfo
{
    let begin = filename.indexOf("[") + 1;
    let end = filename.indexOf("]", begin);
    const timestamp = filename.substring(begin, end);

    begin = filename.indexOf("[", end) + 1;
    end = filename.indexOf("]", begin);
    const title = filename.substring(begin, end);

    begin = filename.indexOf("[", end) + 1;
    end = filename.indexOf("]", begin);
    const tag_csv = filename.substring(begin, end);
    const tags = tag_csv.split(",");

    return {
        filename: filename,
        timestamp: timestamp,
        title : title,
        tags: tags
    };
}


function to_post_info(file_info: IPostFileInfo): IPostInfo
{
    return {
        id: file_info.timestamp,
        title: file_info.title,
        tags: file_info.tags,
        route: to_kebab(file_info.title)
    };
}


function read_post_file(filename: string): IPost
{
    const info = to_post_file_info(filename);

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





function to_kebab(s: string): string
{
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
}