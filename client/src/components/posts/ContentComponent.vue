<style lang="scss"></style>

<template>
<div>
    <div v-for="item in content" :key="item.content"
        style="margin-top:30px;"
        >
        <p v-if="item.content_type === text_type">
            {{item.content}}
        </p>
        <b-img-lazy v-if="item.content_type === image_type"
            :src="item.content"
            blank-color="black" >
        </b-img-lazy>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IContentItem, ContentType } from '../../store/modules/post/post.types'

@Component({ components: {} })
export default class ContentComponent extends Vue
{
    @Prop({default: []})
    content: Array<IContentItem>;

    private readonly text_type: number = ContentType.Text;
    private readonly image_type: number = ContentType.Image;
    private readonly code_type: number = ContentType.Code;
}

</script>