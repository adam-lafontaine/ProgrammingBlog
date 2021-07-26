<style></style>

<template>
<div>
    <h1>Home Component</h1>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import VueRouter from 'vue-router'

@Component({ components: {} })
export default class HomeComponent extends Vue
{

}
</script>