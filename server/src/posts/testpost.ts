import { ContentType, IPost } from "../types/client.types"

const post: IPost = {
    title: "Test Post",
    tags: ["testing", "physics"],
    content: [
        { content_type: ContentType.Text, content: `First paragraph`},
        { content_type: ContentType.Image, content: `http://localhost:8081/api/image/1`},
        { content_type: ContentType.Text, content: `Second paragraph`}
    ]

};

export default post;