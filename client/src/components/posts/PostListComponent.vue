<style lang="scss"></style>

<template>
<div>
    <b-list-group>
        <b-list-group-item v-for="item in list_items" :key="item.id"
            append
            :to="item.route"
            >
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{item.title}}</h5>
            </div>

            <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </p>

            <small>Donec id elit non mi porta.</small>

        </b-list-group-item>
    </b-list-group>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
    IPostInfo
} from '../../store/modules/post/post.types'

const PostModule = namespace("post_module");


@Component({ components: {} })
export default class PostListComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;
    @PostModule.Getter(PostGet.GET_POST_LIST) st_post_list: Array<IPostInfo>;

    private list_items: Array<IPostInfo> = [];


    private mounted(): void
    {
        this.list_items = [];

        this.ac_fetch_post_list()
        .then(this.process_post_list);
    }


    private process_post_list(): void
    {
        this.list_items = this.st_post_list;
    }

    
}

</script>