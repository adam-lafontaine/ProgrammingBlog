<style lang="scss"></style>

<template>
<div>
    <b-list-group>
        <b-list-group-item v-for="item in list_items" :key="item.id"
            append
            :to="item.kebab"
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


interface IPostListItem
{
    id: string;
    title: string;
    tags: Array<string>;
    kebab: string;
}

@Component({ components: {} })
export default class PostListComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;
    @PostModule.Getter(PostGet.GET_POST_LIST) st_post_list: Array<IPostInfo>;

    private list_items: Array<IPostListItem> = [];


    private mounted(): void
    {
        this.ac_fetch_post_list()
        .then(this.process_post_list);
    }


    private process_post_list(): void
    {
        this.list_items = this.st_post_list.map(x => this.to_post_list_item(x));
    }



    private to_post_list_item(post_info: IPostInfo): IPostListItem
    {
        return {
            id: post_info.id,
            title: post_info.title,
            tags: post_info.tags,
            kebab: this.to_kebab(post_info.title)
        }
    }

    private to_kebab(s: string): string
    {
        return s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
    }
}

</script>