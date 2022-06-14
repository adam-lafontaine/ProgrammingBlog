<style>
.below-navbar {
    margin-top: 60px;
}
</style>

<template>
<div class="below-navbar">
    <b-container>        
        <b-row>
            <b-col cols="12" lg="6">
                <h2 class="code-font mt-3">Videos</h2>
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
                            <b-col cols="12" lg="6">
                                <small>{{item.description}}</small>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="12" lg="6">
                <h2 class="code-font mt-3">Websites</h2>
                <b-list-group>
                    <b-list-group-item v-for="item in website_links" :key="item.id" :href="item.url" target="_blank">
                        <b-row>
                            <b-col cols="12"><span>{{item.title}}</span></b-col>
                            <b-col cols="12">
                                <small>{{item.description}}</small>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>

            </b-col>
        </b-row>
        
    </b-container>
    <FooterComponent :id="FOOTER_ID" style="opacity: 0;"/>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import {
    PostAction, PostGet,
    IVideoResource, IWebsiteResource
} from '../store/modules/post/post.types'
import FooterComponent from "./FooterComponent.vue"

const PostModule = namespace("post_module");

interface IVideo
{
    id: string;
    url: string;
    description: string;
}

interface IWebsite 
{
    id: string;
    url: string;
    title: string;
    description: string;
}

@Component({ components: {
    FooterComponent
}})
export default class ResourcesComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_VIDEO_RESOURCES) ac_fetch_video_resources: any;
    @PostModule.Getter(PostGet.GET_VIDEO_RESOURCES) st_video_resources: Array<IVideoResource>;
    @PostModule.Action(PostAction.FETCH_WEBSITE_RESOURCES) ac_fetch_website_resources: any;
    @PostModule.Getter(PostGet.GET_WEBSITE_RESOURCES) st_website_resources: Array<IWebsiteResource>;

    private readonly FOOTER_ID = "POST_FOOTER";

    private video_links: Array<IVideo> = [];
    private website_links: Array<IWebsite> = [];

    private mounted(): void
    {
        this.video_links = [];
        this.website_links = [];
        
        this.ac_fetch_video_resources()
        .then(this.process_video_resources);

        this.ac_fetch_website_resources()
        .then(this.process_website_resources);
    }


    private process_video_resources(): void
    {
        this.video_links = this.st_video_resources.map(x => this.to_youtube_reference(x));
        document.getElementById(this.FOOTER_ID).style.opacity = "1";
    }


    private process_website_resources(): void
    {
        this.website_links = [];
        let id = 1;

        for(let res of this.st_website_resources)
        {
            this.website_links.push(this.to_website_reference(res, id));
            id++;
        }        
    }


    private to_youtube_reference(resource: IVideoResource): IVideo
    {
        return {
            id: resource.youtube_id,
            url: `https://www.youtube.com/embed/${resource.youtube_id}`,
            description: resource.description
        };
    }


    private to_website_reference(resource: IWebsiteResource, id: number): IWebsite
    {
        return {
            id: `${id}`,
            url: resource.url,
            title: resource.title,
            description: resource.description
        };
    }


}
</script>