<style>
</style>

<template>
<home-component/>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeComponent from '../components/HomeComponent.vue'

@Component({
  components: {
    HomeComponent
  }
})
export default class Home extends Vue 
{
  
}
</script>
