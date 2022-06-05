<style>
.below-navbar {
    margin-top: 60px;
}
</style>

<template>
<b-container class="below-navbar">
    <h1 class="code-font mt-3">{{page_title}}</h1>
    <p v-b-modal.branch-modal>{{page_text}}</p>
    
    <b-row>
        <b-col cols="12" :v-if="has_post" class="mt-3">
            Latest post: <b-link :to="latest_post_route">{{latest_post_title}}</b-link>
        </b-col>
        <b-col cols="12" :v-if="has_post" class="mt-3">
            All posts: <b-link to="/posts">Posts</b-link>
        </b-col>
        <b-col cols="12" class="mt-3">
            Online resources: <b-link to="/resources">Resources</b-link>
        </b-col>
    </b-row>
    <div>
    <b-modal 
        id="branch-modal"
        hide-header
        hide-footer
        >
        <b-row
            no-gutters
            >
            <b-col cols="10">
                <b-form-input
                    type="text"
                    v-model="branch_name"
                    >
                </b-form-input>
            </b-col>
            <b-col cols="2">
                <b-button
                    @click="submit_branch_name"                    
                    >OK</b-button>
            </b-col>
        </b-row> 
        
    </b-modal>
</div>
</b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
    IPostInfo, IHomepageContent
} from '../store/modules/post/post.types'
import VueRouter from 'vue-router'
import router from '../router/router'

const PostModule = namespace("post_module");

@Component({ components: {} })
export default class HomeComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_HOMEPAGE_CONTENT) ac_fetch_homepage_content: any;
    @PostModule.Getter(PostGet.GET_HOMEPAGE_CONTENT) st_homepage_content: IHomepageContent;
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;
    @PostModule.Getter(PostGet.GET_POST_LIST) st_post_list: Array<IPostInfo>;
    @PostModule.Action(PostAction.LOAD_CMS_BRANCH) ac_load_cms_branch: any;
    @PostModule.Getter(PostGet.GET_CMS_BRANCH) st_cms_branch: string;

    private branch_name: string = "";

    private page_title: string = "";
    private page_text: string = "";

    private latest_post_title = "";
    private latest_post_route = "";

    private mounted(): void
    {
        if(this.st_homepage_content.title === "")
        {
            this.ac_fetch_homepage_content()
            .then(this.process_homepage_content);
        }
        else
        {
            this.process_homepage_content();
        }        

        this.ac_fetch_post_list()
        .then(this.process_post_list);
    }


    private process_homepage_content(): void
    {
        this.page_title = this.st_homepage_content.title;
        this.page_text = this.st_homepage_content.text;
    }


    private process_post_list(): void
    {
        const desc = (a: IPostInfo, b: IPostInfo) => { return a.id < b.id ? 1 : -1; };
        const list = this.st_post_list.sort(desc);

        if(list.length > 0)
        {
            const post = list[0];
            this.latest_post_title = post.title;
            this.latest_post_route = "/posts/" + post.route;
        }        
    }    


    private process_submit(): void
    {
        if(this.st_cms_branch === this.branch_name)
        {
            router.push("/posts");
        }
    }


    private submit_branch_name(): void
    {
        this.ac_load_cms_branch(this.branch_name)
        .then(this.process_submit);
    }


    private get has_post(): boolean
    {
        return this.latest_post_route.length > 0;
    }

}
</script>