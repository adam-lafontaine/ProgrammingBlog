<script setup lang="ts">
import Navbar from '@components/Navbar.vue';


</script>


<template>
    
<Navbar class="mb-3"/>

<RouterView/>

</template>


<style scoped lang="css">

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>