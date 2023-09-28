<script setup lang="ts">
import { ref } from "vue";


const data = ref("Footer");

</script>


<template>
<footer class="text-start fixed-bottom bg-primary text-white footer-padded">
    <div>
        {{ data }}
    </div>
</footer>
</template>


<style scoped lang="css">

.footer-padded {
    padding-top: 2rem;
    padding-bottom: 4rem;
    padding-left: 2rem;
    padding-right: 2rem;    
}

</style>