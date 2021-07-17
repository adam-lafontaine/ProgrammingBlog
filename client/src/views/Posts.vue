<style lang="scss"></style>

<template>
    <div class="text-center my-3">
        <b-button
            @click="load_post"
            >
            Load
        </b-button>
        <br>
        <content-component
            :content="loaded_content"
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
import ContentComponent from '../components/posts/ContentComponent.vue'

const PostModule = namespace("post_module");

@Component({ components: {
    ContentComponent
} })
export default class Posts extends Vue
{
    @PostModule.Getter(PostGet.GET_SELECTED_POST) private st_selected_post: IPost;
    @PostModule.Action(PostAction.FETCH_SELECTED_POST) private ac_fetch_selected_post: any;

    private loaded_content: Array<IContentItem> = [];

    
    private load_post(): void
    {
        this.loaded_content = [];

        this.ac_fetch_selected_post()
        .then(this.process_selected_post);
    }


    private process_selected_post(): void
    {
        const content = this.st_selected_post.content;
        if(content.length === 0)
        {
            this.loaded_content = [{ 
                content_type: ContentType.Text,
                content: "post not found" 
                }];

            return;
        }
        
        this.loaded_content = this.st_selected_post.content;
    }
}
</script>