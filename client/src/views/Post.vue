<style lang="scss"></style>

<template>
<post-component/>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
    IPost,
} from '../store/modules/post/post.types'
import PostComponent from '../components/posts/PostComponent.vue'

const PostModule = namespace("post_module");

@Component({ components: {
    PostComponent,
} })
export default class Post extends Vue
{

}

</script>