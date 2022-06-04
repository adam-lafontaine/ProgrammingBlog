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
            <b-col cols="12" class="text-right"><span v-b-modal.branch-modal>Website by Adam Lafontaine</span></b-col>
            <b-col cols="12" class="text-right">Artwork by Emily Lafontaine</b-col>
        </b-row>
    </b-container>    
</footer>

<div>
    <b-modal 
        id="branch-modal"
        hide-header
        hide-footer
        >
        <b-row
            no-gutters
            >
            <b-col cols="10">
                <b-form-input
                    type="text"
                    >
                </b-form-input>
            </b-col>
            <b-col cols="2">
                <b-button
                    @click="submit_branch_name"
                    >OK</b-button>
            </b-col>
        
            

        </b-row> 
        
    </b-modal>
</div>

</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

Component({ components: {} })
export default class FooterComponent extends Vue
{
    

    private branch_name: string = "";

    private submit_branch_name = () =>
    {
        alert("WAT"); console.log(this.branch_name)
    }
}
</script>