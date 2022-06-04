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
<footer class="page-footer">
    <b-container>
        <b-row class="footer-content">
            <b-col cols="12" class="text-right"><span @dblclick="show_branch_name_modal">Website by Adam Lafontaine</span></b-col>
            <b-col cols="12" class="text-right">Artwork by Emily Lafontaine</b-col>
        </b-row>
    </b-container>
</footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

Component({ components: {} })
export default class FooterComponent extends Vue
{


    private show_branch_name_modal = () => 
    {
        alert("Modal");
    }
}
</script>