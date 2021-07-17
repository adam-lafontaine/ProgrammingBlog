<style lang="scss"></style>

<template>
    <div class="text-center my-3">
        <b-button
            @click="load_post"
            >
            Load
        </b-button>
        <br>
        <div id="data-content"></div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PostAction, PostGet } from '../store/modules/post/post.types'

const PostModule = namespace("post_module");

@Component({ components: {} })
export default class Posts extends Vue
{
    @PostModule.Getter(PostGet.GET_SELECTED_POST) private st_selected_post: any;
    @PostModule.Action(PostAction.FETCH_SELECTED_POST) private ac_fetch_selected_post: any;

    
    private load_post(): void
    {
        this.ac_fetch_selected_post()
        .then(this.process_selected_post);
    }


    private process_selected_post(): void
    {
        const data = JSON.stringify(this.st_selected_post);
        const div = document.getElementById("data-content");
        if (div)
        {
            div.innerText = data
        }
    }
}
</script>