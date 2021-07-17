import { 
    DataResult, 
    IPost,IContentItem, ContentType
} from "../types/client.types";
import fs from "fs"
import path from "path"

const post_path = "/home/adam/repos/ProgrammingBlog/posts";


const enum Flag
{
    Title = "<title>",
    Tags = "<tags>",
    Text = "<text>",
    Image = "<image>",
    Code = "<code>"
}

export module post
{
    export function get_post(): DataResult<IPost>
    {
        let result = new DataResult<IPost>();
        let status = "/home/adam/repos/ProgrammingBlog/server/dist/posts";

        try
        {
            status = "reading file";
            const file_path = path.join(post_path, "blogposttest.txt");
            status = file_path;
            const data = fs.readFileSync(file_path, "utf8");

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


function parse_post(data: string): IPost
{
    let title = "";
    let tags: Array<string> = [];
    let content: Array<IContentItem> = [];

    for(const line of data.split("\n"))
    {
        if(line.startsWith(Flag.Title))
        {
            title = line.substr(Flag.Title.length);
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

        }        
    }

    return {
        title: title,
        tags: tags,
        content: content
    };
}


function add_text_content(s: string, content: Array<IContentItem>)
{
    content.push({ content_type: ContentType.Text, content: s});
}


function add_image_content(s: string, content: Array<IContentItem>)
{
    content.push({ content_type: ContentType.Image, content: s });
}