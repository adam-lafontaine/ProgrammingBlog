import { 
    DataResult, 
    IPost,IContentItem, ContentType
} from "../types/client.types"
import { IPostFileInfo } from "../types/server.types"
import { IPostInfo } from "../types/client.types"
import fs from "fs"
import path from "path"

const post_path = "/home/adam/repos/ProgrammingBlog/posts";
const image_url = "http://localhost:8081/api/image";


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
        tags: file_info.tags
    };
}


const enum Flag
{
    Subtitle = "<subtitle>",
    Text = "<text>",
    Image = "<image>",
    Code = "<code>"
}


function read_post_file(filename: string): IPost
{
    const info = to_post_file_info(filename);
    
    let subtitle = "";
    let content: Array<IContentItem> = [];

    const file_path = path.join(post_path, filename);
    const data = fs.readFileSync(file_path, "utf8");

    for(const line of data.split("\n"))
    {
        if(line.startsWith(Flag.Subtitle))
        {
            subtitle = line.substr(Flag.Subtitle.length);
        }
        else if(line.startsWith(Flag.Text))
        {
            add_text_content(line.substr(Flag.Text.length), content);
        }
        else if(line.startsWith(Flag.Image))
        {
            add_image_content(line.substr(Flag.Image.length), content);
        }
        else if(line.startsWith(Flag.Code))
        {
            add_code_content(line.substr(Flag.Code.length), content);
        }        
    }

    return {
        id: info.timestamp,
        title: info.title,
        subtitle: subtitle,
        tags: info.tags,
        content: content
    };
}


function add_text_content(s: string, content: Array<IContentItem>): void
{
    content.push({ content_type: ContentType.Text, content: s});
}


function add_image_content(s: string, content: Array<IContentItem>): void
{
    content.push({ content_type: ContentType.Image, content: `${image_url}/${s}` });
}


function add_code_content(s: string, content: Array<IContentItem>): void
{
    content.push({ content_type: ContentType.Code, content: s });
}


function to_kebab(s: string): string
{
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
}