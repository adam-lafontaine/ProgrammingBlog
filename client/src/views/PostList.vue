<style lang="css"></style>

<template>
<post-list-component/>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { 
    PostAction, PostGet,
    IPost,
} from '../store/modules/post/post.types'
import PostListComponent from '../components/posts/PostListComponent.vue'

const PostModule = namespace("post_module");

@Component({ components: {
    PostListComponent
} })
export default class PostList extends Vue
{
    
}
</script>