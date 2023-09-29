<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { usePostStore } from '@stores/PostStore';
import { DateUtil } from '@util/date_util';
import { routes } from "@/router/router";

import Footer from '@components/Footer.vue';

import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import makefile from 'highlight.js/lib/languages/makefile';
import plaintext from 'highlight.js/lib/languages/plaintext';
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('makefile', makefile);
hljs.registerLanguage('plaintext', plaintext);


const props = defineProps({
    title_kebab: { type: String, required: true }
});

const CONTENT_ID = "POST_MAIN_CONTENT";

const post_store = usePostStore();

const post_loaded = ref(false);
const post_not_found = ref(false);

const post_title = ref("");
const post_subtitle = ref("");
const post_tags: Ref<Array<string>> = ref([]);
const post_date = ref("");

let content_html = "";


onMounted(async () => 
{
    content_html = "";

    if (!post_store.has_posts)
    {
        await post_store.fetch_post_list();
    }

    if (!post_store.has_posts)
    {
        set_post_not_found();
        return;
    }
    
    load_post();
});


function set_post_not_found(): void
{
    document.title = "Post not found";
    post_not_found.value = true;
}


async function load_post(): Promise<void>
{
    const selected_item = post_store.post_list.find(x => x.route === props.title_kebab);

    if (selected_item === undefined)
    {
        set_post_not_found();
        return;
    }

    await post_store.fetch_selected_post(selected_item.id);    

    process_selected_post();
}


function process_selected_post(): void
{
    post_loaded.value = true;

    const post = post_store.selected_post;

    post_title.value = post.title;
    post_subtitle.value = post.subtitle;
    post_tags.value = post.tags;
    post_date.value = DateUtil.to_date_string(post.id);

    document.title = post.title;    

    const elem = document.getElementById(CONTENT_ID);
    if (elem)
    {
        content_html = post.content_html.length > 0 ? post.content_html : "<p>Post content not found</p>";
        
        elem.innerHTML = content_html;

        hljs.highlightAll();
    }
}


const has_content = () => { return content_html.length > 100; }

</script>


<template>

<div v-if="post_loaded">
    <div class="post-header">
        <div class="container">
            <h1>{{post_title}}</h1>
            <p>{{post_subtitle}}</p>
            <div class="d-flex justify-content-between">
                <div class="post-date">
                    {{ post_date }}
                </div>
                <div>
                    <span v-for="tag in post_tags" :key="tag"
                        class="badge bg-primary code-font ms-2"
                    >
                        {{ tag }}
                    </span>
                </div>

            </div>
        </div>
    </div>
</div>

<div v-else-if="post_not_found">
    <div class="container text-center mt-5">
        <h3 class="code-font">Post Not found</h3>
        <p>
            '{{ $route.path }}' could not be found
        </p>
        <p>
            <RouterLink :to="routes.home">
                Home
            </RouterLink>
        </p>
        <p>
            <RouterLink :to="routes.post_list">
                Posts
            </RouterLink>
        </p>
    </div>
</div>

<div v-else>
    <!-- loading -->
</div>

<div class="container">
    <div :id="CONTENT_ID" class="main-content" />
</div>
    
<Footer v-if="has_content()" />
</template>


<style scoped lang="css">

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
    padding-bottom: 1rem;
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