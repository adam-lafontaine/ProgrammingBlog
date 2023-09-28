<script setup lang="ts">
import { ref } from "vue";


const brand = "Brand";


const menu_items = ref([
    { id: 1, label: "Home", route: { name: "home" } },
    { id: 2, label: "About", route: { name: "about" } }
]);


const pages = [
    { id: 1, label: "Page 1", route: { name: "page", params: { id: 1, slug: "page_01" } } },
    { id: 2, label: "Page 2", route: { name: "page", params: { id: 2, slug: "page_02" } } },
    { id: 3, label: "Page 3", route: { name: "page", params: { id: 3, slug: "page_03" } } }
];

</script>


<template>
<nav class="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
    <div class="container-fluid">
        <RouterLink class="navbar-brand" :to="{name: 'home'}">{{ brand }}</RouterLink>
        <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarLinks" 
            aria-controls="navbarLinks" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarLinks"> 
            <ul class="navbar-nav ms-auto">
                <li class="nav-item" v-for="item in menu_items" :key="item.id">
                    <RouterLink class="nav-link text-end" :to="item.route">{{ item.label }}</RouterLink>
                </li>
                <li class="nav-item" v-for="item in pages" :key="item.id">
                    <RouterLink class="nav-link text-end" :to="item.route">{{ item.label }}</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>


<style lang="css">

</style>