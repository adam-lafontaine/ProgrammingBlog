<script setup lang="ts">
import { routes } from "@/router/router";
import { onMounted } from "vue";


onMounted(() => 
{
    document.title = "Page not found";
});
</script>


<template>

<div class="container text-center mt-5">
    <h3 class="code-font">Page Not found</h3>
    <p>
        We could not find the page at '{{ $route.path }}'
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
</template>


<style scoped lang="css">

</style>