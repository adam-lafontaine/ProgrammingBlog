<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { usePostStore, IPostInfo } from '@stores/PostStore';
import { DateUtil } from '@util/date_util';
import Footer from '@components/Footer.vue';


interface IPostListItem {
    id: string;
    title: string;
    date: string;
    tags: Array<string>;
    route: any;
}


const post_store = usePostStore();

const list_items: Ref<Array<IPostListItem>> = ref([]);


onMounted(async () => 
{
    list_items.value = [];

    await post_store.fetch_post_list();

    list_items.value = post_store.posts_sorted.map(x => to_list_item(x));
});


function to_list_item(post_info: IPostInfo): IPostListItem
    {
        return {
            id: post_info.id,
            title: post_info.title,
            tags: post_info.tags,
            route: { name: "post", params: { title_kebab: post_info.route }},
            date: DateUtil.to_date_string(post_info.id)
        };
    }

</script>


<template>
<div class="container">
    <div class="row">
        <div class="col-12 col-md-8 offset-md-2">
            <h2 class="code-font mt-3">Posts</h2>
            <div class="list-group">
                <div v-for="item in list_items" :key="item.id"
                    class="list-group-item post-header"        
                >
                    <RouterLink :to="item.route" class="post-link">
                        <div class="d-flex w-100">
                            <h5 class="mb-1">{{item.title}}</h5>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <small class="post-date text-start">{{item.date}}</small>
                            </div>
                            <div>
                                <span v-for="tag in item.tags" :key="tag"
                                    class="badge bg-primary code-font ms-2"
                                >
                                    {{ tag }}
                                </span>
                            </div>                 
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>
    
<Footer />
</template>


<style scoped lang="css">

.post-header {
    background-color: rgb(233, 236, 239);
    color:rgb(33, 37, 41);
}

.post-header .post-date {
    color: #9EABB3;
}

.post-link {
    text-decoration: none;
}

</style>