import { 
    DataResult, 
    IPost,IContentItem, ContentType
} from "../types/client.types";
import fs from "fs"
import path from "path"

const post_path = "/home/adam/repos/ProgrammingBlog/posts";


export module post
{
    export function get_by_title(title: string): DataResult<IPost>
    {
        let result = new DataResult<IPost>();
        let status = "";

        try
        {
            status = "reading file";
            const data = read_post_file("blogposttest.txt");

            status = "building post";
            const post = parse_post(data);

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

    export function get_post(): DataResult<IPost>
    {
        let result = new DataResult<IPost>();
        let status = "";

        try
        {
            status = "reading file";
            const data = read_post_file("blogposttest.txt");

            status = "building post";
            const post = parse_post(data);

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


}


function read_post_file(filename: string): string
{
    const file_path = path.join(post_path, filename);
    const data = fs.readFileSync(file_path, "utf8");

    return data;
}


const enum Flag
{
    Title = "<title>",
    Subtitle = "<subtitle>",
    Tags = "<tags>",
    Text = "<text>",
    Image = "<image>",
    Code = "<code>"
}


function parse_post(data: string): IPost
{
    let title = "";
    let subtitle = "";
    let tags: Array<string> = [];
    let content: Array<IContentItem> = [];

    for(const line of data.split("\n"))
    {
        if(line.startsWith(Flag.Title))
        {
            title = line.substr(Flag.Title.length);
        }
        else if(line.startsWith(Flag.Subtitle))
        {
            subtitle = line.substr(Flag.Subtitle.length);
        }
        else if(line.startsWith(Flag.Tags))
        {
            tags = line.substr(Flag.Tags.length).split(",");
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
        title: title,
        subtitle: subtitle,
        tags: tags,
        content: content
    };
}


function add_text_content(s: string, content: Array<IContentItem>): void
{
    content.push({ content_type: ContentType.Text, content: s});
}


function add_image_content(s: string, content: Array<IContentItem>): void
{
    content.push({ content_type: ContentType.Image, content: s });
}


function add_code_content(s: string, content: Array<IContentItem>): void
{
    content.push({ content_type: ContentType.Code, content: s });
}