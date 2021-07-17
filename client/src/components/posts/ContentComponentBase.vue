<style lang="scss"></style>

<template>
<div>{{content}}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({ components: {} })
export default class ContentComponentBase extends Vue
{
    @Prop({default: ""})
    content: string;
}

</script>