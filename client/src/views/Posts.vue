<style lang="scss"></style>

<template>
    <div>
        <b-button
            @click="load_post"
            >
            Load
        </b-button>
        <br>
        <b-jumbotron
            :header="post_title"
            :lead="post_subtitle"
            >
        </b-jumbotron>
        <div align="right">
            <b-badge v-for="tag in post_tags" :key="tag"
                variant="dark"
                style="margin-right:4px;"
                >
                {{tag}}
            </b-badge>
        </div>
        <content-component
            :content="content_items"
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

    private post_title: string = "";
    private post_subtitle: string = "";
    private post_tags: Array<string> = [];
    private content_items: Array<IContentItem> = [];
    
    private load_post(): void
    {
        this.content_items = [];

        this.ac_fetch_selected_post()
        .then(this.process_selected_post);
    }


    private process_selected_post(): void
    { 
        this.post_title = this.st_selected_post.title;
        this.post_subtitle = this.st_selected_post.subtitle;
        this.post_tags = this.st_selected_post.tags;

        const content = this.st_selected_post.content;
        if(content.length === 0)
        {
            this.content_items = [{ 
                content_type: ContentType.Text,
                content: "post not found" 
                }];

            return;
        }
        
        this.content_items = content;
    }
}
</script>