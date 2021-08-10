<style lang="css"></style>

<template>
<post-list-component/>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PostListComponent from '../components/posts/PostListComponent.vue'

@Component({ components: {
    PostListComponent
} })
export default class PostList extends Vue
{
    
}
</script>