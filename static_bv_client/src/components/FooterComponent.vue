<style lang="css">
.page-footer {
    color: rgba(255,255,255,.5);
    background-color: #343a40;
    min-height:200px;
}

.footer-content {
    padding-top: 120px;
}
</style>

<template>
<div>
<footer class="page-footer">
    <b-container>
        <b-row class="footer-content">
            <b-col cols="12" class="text-right">Website by Adam Lafontaine</b-col>
            <b-col cols="12" class="text-right">Artwork by Emily Lafontaine</b-col>
        </b-row>
    </b-container>    
</footer>



</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

Component({ 
    name: "FooterComponent",
    components: {} })
export default class FooterComponent extends Vue
{
    
}
</script>