<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { usePostStore, } from '@stores/PostStore';

const router = useRouter();
const post_store = usePostStore();


const page_title = ref("");
const page_text = ref("");
const latest_post_title = ref("");
const latest_post_route = ref({ name: "posts", params: { title_kebab: "" }});
const branch_name = ref("");




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
        router.push({ name: "posts" });
    }
}


const has_post = () => { return post_store.has_post; }

</script>


<template>
<div class="container">
    <h1 class="code-font mt-3">{{ page_title }}</h1>
    <p>{{ page_text }}</p>

    <div class="row">

    </div>

</div>
</template>