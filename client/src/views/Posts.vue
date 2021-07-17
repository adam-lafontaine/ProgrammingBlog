<style lang="scss"></style>

<template>
    <div class="text-center my-3">
        <b-button
            @click="load_post"
            >
            Load
        </b-button>
        <br>
        <content-component-base
            :content="placeholder"
            />
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
    IContentItem,
    IPost, ContentType
} from '../store/modules/post/post.types'
import ContentComponentBase from '../components/posts/ContentComponentBase.vue'

const PostModule = namespace("post_module");

@Component({ components: {
    ContentComponentBase
} })
export default class Posts extends Vue
{
    @PostModule.Getter(PostGet.GET_SELECTED_POST) private st_selected_post: IPost;
    @PostModule.Action(PostAction.FETCH_SELECTED_POST) private ac_fetch_selected_post: any;

    private placeholder: string = "";

    
    private load_post(): void
    {
        this.ac_fetch_selected_post()
        .then(this.process_selected_post);
    }


    private process_selected_post(): void
    {
        const content = this.st_selected_post.content;
        if(content.length === 0)
        {
            return;
        }

        this.placeholder = content[0].content;

        let content_str = "";
        content.forEach(x => { content_str = content_str.concat(this.build_content(x)); });

        
    }


    private build_content(item: IContentItem): string
    {
        switch(item.content_type)
        {
            case ContentType.Text:
                return this.build_content_paragraph(item.content);

            case ContentType.Image:
                return this.build_content_image(item.content);
        }

        return "";
    }


    private build_content_paragraph(s: string): string
    {
        return `<p>${s}</p>`;
    }


    private build_content_image(s: string): string
    {
        return `<img center src=${s}></img><br>`;
    }
}
</script>