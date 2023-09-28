<script setup lang="ts">
//import { ref } from "vue";
import { useRoute, /*useRouter*/ } from 'vue-router';

import CounterCard from '@cards/CounterCard.vue'

const props = defineProps({
    page_id: { type: String, required: true },
    slug: { type: String, required: true }
});

//const router = useRouter();
const route = useRoute();


//router.push({ name: "home" });
//router.replace({ name: "home" });


</script>


<template>
<h3>Page {{ $route.params.id }} / {{ $route.params.slug }}</h3>

<p>Page {{ props.page_id }} / {{ props.slug }}</p>

<p>Page {{ route.params.id }} / {{ route.params.slug }}</p>

<CounterCard :title="props.slug"/>

</template>


<style scoped lang="css">
</style>
