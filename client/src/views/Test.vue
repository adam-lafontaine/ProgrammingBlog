<style lang="scss"></style>

<template>
    <div class="text-center my-3">
        <b-button
            @click="load_test_data"
            >
            Load
        </b-button>
        <br>
        <div id="data-content"></div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { TestAction, TestGet } from '../store/modules/test/test.types'

const TestModule = namespace("test_module")
@Component({ components: {} })
export default class Test extends Vue
{
    @TestModule.Getter(TestGet.GET_TEST_DATA) private state_test_data: any;
    @TestModule.Action(TestAction.LOAD_TEST_DATA) private action_load_data: any;
    
    private load_test_data(): void
    {
        this.action_load_data()
        .then(this.process_test_data)
    }

    private process_test_data(): void
    {
        const data = JSON.stringify(this.state_test_data)
        const div = document.getElementById("data-content")
        if (div)
        {
            div.innerText = data
        }
    }
}
</script>