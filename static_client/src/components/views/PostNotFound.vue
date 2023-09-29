<script setup lang="ts">
import { routes } from "@/router/router";
import { onMounted } from "vue";


onMounted(() => 
{
    document.title = "Post not found";
});
</script>


<template>

<div class="container">
    <div class="text-center mt-5">
        <h3 class="code-font">Post Not found</h3>
        <p>
            We could not find the post '{{ $route.path }}'
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
</template>


<style scoped lang="css">

</style>