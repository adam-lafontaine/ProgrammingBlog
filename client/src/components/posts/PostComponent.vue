<style lang="scss">

</style>

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

    <div :id="CONTENT_ID" />

</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import VueRouter from 'vue-router'
import {
    PostAction, PostGet,
    IPost, IPostInfo
} from '../../store/modules/post/post.types'

import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import 'highlight.js/styles/atom-one-dark.css';

const PostModule = namespace("post_module");

@Component({ components: {} })
export default class PostComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_SELECTED_POST) private ac_fetch_selected_post: any;
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;
    @PostModule.Getter(PostGet.GET_SELECTED_POST) private st_selected_post: IPost;
    @PostModule.Getter(PostGet.GET_POST_LIST) st_post_list: Array<IPostInfo>;

    private readonly CONTENT_ID = "ABCDXYZ";

    private post_title: string = "";
    private post_subtitle: string = "";
    private post_tags: Array<string> = [];
    private content_html: string = "";
    

    private mounted(): void
    {
        hljs.registerLanguage('cpp', cpp);

        this.content_html = "";

        const loaded_from_url = this.st_post_list.length === 0;

        if(loaded_from_url)
        {
            this.ac_fetch_post_list()
            .then(this.load_post);
        }
        else
        {
            this.load_post();
        }
        
    }


    private process_selected_post(): void
    { 
        this.post_title = this.st_selected_post.title;
        this.post_subtitle = this.st_selected_post.subtitle;
        this.post_tags = this.st_selected_post.tags;

        const content = this.st_selected_post.content_html;
        if(content.length === 0)
        {
            this.content_html = "<p>Post content not found</p>";
        }
        else
        {
            this.content_html = content;
        }        
        
        document.getElementById(this.CONTENT_ID).innerHTML = this.content_html;

        hljs.highlightAll();
    }


    private load_post(): void
    {
        const kebab = this.$route.params.title_kebab;
        const selected_item = this.st_post_list.find(x => x.route === kebab);

        if(selected_item == null)
        {
            // post not found
        }
        else
        {
            this.ac_fetch_selected_post(selected_item.id)
            .then(this.process_selected_post);
        }
    }

}

</script>