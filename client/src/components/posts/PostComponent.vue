<style lang="scss"></style>

<template>
<div>
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
    <div v-for="item in content" :key="item.content"
        style="margin-top:30px;"
        >
        <p v-if="item.content_type === text_type">
            {{item.content}}
        </p>
        <b-img-lazy v-if="item.content_type === image_type"
            :src="item.content"
            blank-color="black" >
        </b-img-lazy>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
    IContentItem,
    IPost, ContentType
} from '../../store/modules/post/post.types'

const PostModule = namespace("post_module");

@Component({ components: {} })
export default class PostComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_SELECTED_POST) private ac_fetch_selected_post: any;
    @PostModule.Getter(PostGet.GET_SELECTED_POST) private st_selected_post: IPost;

    private post_title: string = "";
    private post_subtitle: string = "";
    private post_tags: Array<string> = [];
    private content_items: Array<IContentItem> = [];
    

    private mounted(): void
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