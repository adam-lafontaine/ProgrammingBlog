<style lang="scss"></style>

<template>
<b-container>
    <b-list-group>
        <b-list-group-item v-for="item in list_items" :key="item.id"
            append
            :to="item.route"
            >
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{item.title}}</h5>
            </div>

            <small>{{item.date}}</small>

        </b-list-group-item>
    </b-list-group>
</b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
    IPostInfo
} from '../../store/modules/post/post.types'
import { DateUtil } from "../../util/date_util"

const PostModule = namespace("post_module");


interface IPostListItem {
    id: string;
    title: string;
    date: string;
    route: string;
}


@Component({ components: {} })
export default class PostListComponent extends Vue
{
    @PostModule.Action(PostAction.FETCH_POST_LIST) ac_fetch_post_list: any;
    @PostModule.Getter(PostGet.GET_POST_LIST) st_post_list: Array<IPostInfo>;

    private list_items: Array<IPostListItem> = [];


    private mounted(): void
    {
        this.list_items = [];

        this.ac_fetch_post_list()
        .then(this.process_post_list);
    }


    private process_post_list(): void
    {
        const desc = (a: IPostInfo, b: IPostInfo) => { return a.id < b.id ? 1 : -1; };
        this.list_items = this.st_post_list
        .sort(desc)
        .map(x => this.to_list_item(x));
    }


    private to_list_item(post_info: IPostInfo): IPostListItem
    {
        return {
            id: post_info.id,
            title: post_info.title,
            route: post_info.route,
            date: DateUtil.to_date_string(post_info.id)
        };
    }



    
}

</script>