<style></style>

<template>
<post-component/>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PostComponent from '../components/posts/PostComponent.vue'

@Component({ components: {
    PostComponent,
} })
export default class Post extends Vue
{

}

</script>