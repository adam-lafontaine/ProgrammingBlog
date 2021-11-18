<style lang="css" scoped>

.main-content {
    font-size: 17px;
    font-family:'Open Sans', sans-serif;
}

.post-date {
    color: #9EABB3;
    font-size: 1.0rem;
}

.post-header {
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-bottom: 2rem;
    background-color: #e9ecef;
}

.post-header h1 {
    font-size: 4.5rem;
    font-weight: 300;
    line-height: 1.2;
}

.post-header p {
    font-size: 1.25rem;
    font-weight: 300;
    margin-top: 0;
    margin-bottom: 1rem;
}

</style>

<template>
<div>
    <!-- Jumbotron replacement -->
    <b-container fluid class="post-header">
        <b-container fluid="lg">
            <h1>{{post_title}}</h1>
            <p>{{post_subtitle}}</p>
        </b-container>
    </b-container>    

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
                        class="code-font"
                        >
                        {{tag}}
                    </b-badge>
                </b-col>
            </b-row>
                        
        </div>

        <div :id="CONTENT_ID" class="main-content" />
    </b-container>
    <footer-component :id="FOOTER_ID" style="visibility: hidden;"/>

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
import FooterComponent from "../FooterComponent.vue"

import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import '../../styles/code.css';
hljs.registerLanguage('cpp', cpp);

const PostModule = namespace("post_module");

@Component({ components: {
    FooterComponent
} })
export default class PostComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_SELECTED_POST) ac_fetch_selected_post: any;
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;
    @PostModule.Getter(PostGet.GET_SELECTED_POST) st_selected_post: IPost;
    @PostModule.Getter(PostGet.GET_POST_LIST) st_post_list: Array<IPostInfo>;

    private readonly CONTENT_ID = "POST_MAIN_CONTENT";
    private readonly FOOTER_ID = "POST_FOOTER";

    private post_title: string = "";
    private post_subtitle: string = "";
    private post_tags: Array<string> = [];
    private post_date: string = "";
    private content_html: string = "";

    private mounted(): void
    {      
        this.content_html = "";        

        const loaded_from_url = this.st_post_list.length === 0;

        this.ac_fetch_post_list()
            .then(this.load_post);
        
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

        document.getElementById(this.FOOTER_ID).style.visibility = "visible";
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