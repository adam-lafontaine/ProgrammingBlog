<style></style>

<template>
<div>
    <h1>Resources Component</h1>

    <div v-for="item in video_links" :key="item.youtube_id">
        <b-embed
            type="iframe"
            aspect="16by9"
            :src="item.url"
            allowfullscreen
        ></b-embed>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import {
    PostAction, PostGet,
    IVideoResource
} from '../store/modules/post/post.types'

const PostModule = namespace("post_module");

interface IVideoReference
{
    url: string;
    description: string;
}

@Component({ components: {} })
export default class ResourcesComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_VIDEO_RESOURCES) ac_fetch_video_resources: any;
    @PostModule.Getter(PostGet.GET_VIDEO_RESOURCES) st_video_resources: Array<IVideoResource>;

    private video_links: Array<IVideoReference> = [];

    private mounted(): void
    {
        this.video_links = [];

        this.ac_fetch_video_resources()
        .then(this.process_video_resources);
    }


    private process_video_resources(): void
    {
        this.video_links = this.st_video_resources.map(x => this.to_youtube_reference(x));
    }


    private to_youtube_reference(resource: IVideoResource): IVideoReference
    {
        return {
            url: `https://www.youtube.com/embed/${resource.youtube_id}`,
            description: resource.description
        };
    }


}
</script>