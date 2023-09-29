<script setup lang="ts">
import { onMounted, ref } from "vue";
//import { useRouter } from 'vue-router';
import { usePostStore, } from '@stores/PostStore';
import { routes } from "@/router/router";

//const router = useRouter();
const post_store = usePostStore();

const post_list_route = routes.post_list;

const page_title = ref("");
const page_text = ref("");
const latest_post_title = ref("");
const latest_post_route = ref({ name: routes.post.name, params: { title_kebab: "x" }});
//const branch_name = ref("");


onMounted(async () =>
{
    if (!post_store.has_content)
    {
        await post_store.fetch_homepage_content();        
    }
    
    process_homepage_content();

    await post_store.fetch_post_list();
    process_post_list();
});


function process_homepage_content(): void
{
    page_title.value = post_store.home_title;
    page_text.value = post_store.home_text;
}


function process_post_list(): void
{
    const list = post_store.posts_sorted;

    if (list.length > 0)
    {
        const post = list[0];
        latest_post_title.value = post.title;
        latest_post_route.value.params.title_kebab = post.route;
    }
}

/*
async function submit_branch_name(): Promise<void>
{
    if (branch_name.value.length === 0)
    {
        return;
    }

    await post_store.load_cms_branch(branch_name.value);

    let success = post_store.cms_branch === branch_name.value;

    if (success)
    {
        router.push(post_list_route);
    }
}
*/

const has_post = () => { return post_store.has_posts; }

</script>


<template>
<div class="container">
    <h1 class="code-font mt-3">{{ page_title }}</h1>
    <p>{{ page_text }}</p>

    <div class="row" v-if="has_post()">
        <div class="col-12 mt-3">
            Latest post: <RouterLink :to="latest_post_route">{{ latest_post_title }}</RouterLink>
        </div>
        <div class="col-12 mt-3">
            All posts: <RouterLink :to="post_list_route">Posts</RouterLink>
        </div>
    </div>

</div>
</template>