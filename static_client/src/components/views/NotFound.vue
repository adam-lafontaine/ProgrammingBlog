<script setup lang="ts">
</script>


<template>

<div class="container">
    <div class="text-center mt-5">
        <h3>Not found</h3>
        <p>
            We could not find the page at '{{ $route.path }}'
        </p>
        <p class="text-center mt-5">
            <RouterLink :to="{name: 'home'}">
                <span class="material-icons-outlined home-icon">home</span>
                <br>
                Back to Home
            </RouterLink>        
        </p>

    </div>
    
    
        
</div>
</template>


<style scoped lang="css">

.home-icon {
    font-size: 48px;
}

</style>