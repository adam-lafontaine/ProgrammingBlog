<script setup lang="ts">
import Navbar from '@components/Navbar.vue';
import Footer from '@components/Footer.vue';
import FooterXS from '@components/FooterXS.vue'

</script>


<template>
    
<Navbar/>

<div class="container">
    <RouterView/>
<!--
    <RouterView v-slot="{Component}">
        <div>
            <Transition name="fade" mode="out-in">                
                    <component :is="Component" :key="$route.path"></component>
            </Transition>
        </div>
    </RouterView>
-->
</div>

<Footer class="d-none d-lg-block"/>
<FooterXS class="d-lg-none" />
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