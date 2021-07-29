<style></style>

<template>
<b-container>
    <h1>Resources - Videos</h1>
    <b-list-group>
        <b-list-group-item v-for="item in video_links" :key="item.id">

            <b-row no-gutters>
                
                <b-col cols="12" sm="9" md="6" lg="4" xl="3" class="mr-auto">
                    <b-embed
                        type="iframe"
                        aspect="16by9"
                        :src="item.url"
                        allowfullscreen
                    ></b-embed>
                </b-col>
                <b-col cols="auto">
                    <span>{{item.description}}</span>
                </b-col>
            </b-row>

        </b-list-group-item>
    </b-list-group>
</b-container>
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
    id: string;
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
            id: resource.youtube_id,
            url: `https://www.youtube.com/embed/${resource.youtube_id}`,
            description: resource.description
        };
    }


}
</script>