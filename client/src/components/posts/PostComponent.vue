<style lang="css" scoped>

.main-content {
    font-size: 17px;
    font-family:'Open Sans', sans-serif;
}

.post-date {
    color: #9EABB3;
    font-size: 1.0rem;
}

</style>

<template>
<div>
    <b-jumbotron fluid container-fluid="lg"
        :header="post_title"
        :lead="post_subtitle"
        >
    </b-jumbotron>    

    <b-container fluid="lg">

        <div style="margin:-70px 0px 40px 0px;">
            <b-row no-gutters>
                <b-col cols="auto" class="mr-auto post-date">
                    {{post_date}}
                </b-col>
                <b-col cols="auto">
                    <b-badge v-for="tag in post_tags" :key="tag"
                        variant="dark"
                        style="margin-left:4px;"
                        >
                        {{tag}}
                    </b-badge>
                </b-col>
            </b-row>
                        
        </div>

        <div :id="CONTENT_ID" class="main-content" />
    </b-container>

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
import { DateUtil } from "../../util/date_util"

import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('cpp', cpp);

const PostModule = namespace("post_module");

@Component({ components: {} })
export default class PostComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_SELECTED_POST) ac_fetch_selected_post: any;
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;
    @PostModule.Getter(PostGet.GET_SELECTED_POST) st_selected_post: IPost;
    @PostModule.Getter(PostGet.GET_POST_LIST) st_post_list: Array<IPostInfo>;

    private readonly CONTENT_ID = "POST_MAIN_CONTENT";

    private post_title: string = "";
    private post_subtitle: string = "";
    private post_tags: Array<string> = [];
    private post_date: string = "";
    private content_html: string = "";
    

    private mounted(): void
    {      
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
            this.post_date = DateUtil.to_date_string(this.st_selected_post.id);            
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