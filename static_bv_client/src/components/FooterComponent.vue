<style lang="css">
.page-footer {
    color: rgba(255,255,255,.5);
    background-color: #343a40;
    min-height:200px;
}

.footer-content {
    padding-top: 120px;
}
</style>

<template>
<div>
<footer class="page-footer">
    <b-container>
        <b-row class="footer-content">
            <b-col cols="12" class="text-right"><span v-b-modal.branch-modal>Website by Adam Lafontaine</span></b-col>
            <b-col cols="12" class="text-right">Artwork by Emily Lafontaine</b-col>
        </b-row>
    </b-container>    
</footer>

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

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
} from '../store/modules/post/post.types'

import router from '../router/router'

const PostModule = namespace("post_module");

Component({ 
    name: "FooterComponent",
    components: {} })
export default class FooterComponent extends Vue
{
    @PostModule.Action(PostAction.LOAD_CMS_BRANCH) ac_load_cms_branch: any;
    @PostModule.Getter(PostGet.GET_CMS_BRANCH) st_cms_branch: string;
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;

    private branch_name: string = "";


    private process_submit(): void
    {
        if(this.st_cms_branch === this.branch_name)
        {
            router.push("/posts");
        }
        else
        {
            router.push("/");
        }
    }


    private submit_branch_name(): void
    {
        this.ac_load_cms_branch(this.branch_name)
        .then(this.process_submit);
    }
}
</script>