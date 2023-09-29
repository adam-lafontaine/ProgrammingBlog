<script setup lang="ts">
import Footer from '@components/Footer.vue';

const props = defineProps({
    title_kebab: { type: String, required: true }
});

</script>


<template>
<div class="container">
    <h1>Post</h1>

</div>
    
<Footer />
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
    padding-bottom: 4rem;
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