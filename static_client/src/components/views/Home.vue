<script setup lang="ts">
import { onMounted, ref } from "vue";


const page_title = ref("");
const page_text = ref("");
const latest_post_title = ref("");
const latest_post_route = ref("");




onMounted(() =>{

});


function process_homepage_content(): void
{

}


function process_post_list(): void
{

}


function process_submit(): void
{

}


const has_post = () => { return false; }

</script>


<template>
<div class="container">
    <h1 class="code-font mt-3">{{ page_title }}</h1>
    <p>{{ page_text }}</p>

    <div class="row">

    </div>

</div>
</template>