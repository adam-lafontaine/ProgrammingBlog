<script setup lang="ts">

</script>


<template>
<footer class="text-start fixed-bottom bg-primary text-white footer-padded">
    <button
        class="btn btn-primary back-button"
        @click="$router.back()"
    >
        <span class="material-icons-outlined back-button-icon">arrow_back</span>
    </button>    
</footer>
</template>


<style scoped lang="css">

.footer-padded {
    padding-top: 0.5rem;
    padding-bottom: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;    
}


.back-button {
    width: 40px;
    height: 40px;
    border-radius: 20px;    
}


.back-button-icon {
    margin-left: -5px;
}

</style>