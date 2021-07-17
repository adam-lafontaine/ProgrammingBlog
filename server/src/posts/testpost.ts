import { ContentItemType, IPost } from "../types/client.types"

const post: IPost = {
    title: "test post",
    tags: [],
    content: [
        { type: ContentItemType.Text, content: `<p>First paragraph</p>`},
        { type: ContentItemType.Text, content: `<p><img src="http://localhost:8081/api/image/"/></p>`},
        { type: ContentItemType.Text, content: `<p>Second paragraph</p>`}
    ]

};

export default post;