<style></style>

<template>
<resources-component/>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ResourcesComponent from '../components/ResourcesComponent.vue'

@Component({
  components: {
    ResourcesComponent
  }
})
export default class Resources extends Vue 
{
  
}
</script>
