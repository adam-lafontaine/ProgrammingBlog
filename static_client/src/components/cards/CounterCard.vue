<script setup lang="ts">
import { useCountingStore } from '@stores/CountingStore'


const counter = useCountingStore();

const props = defineProps({
    title: { type: String, required: true }
});

</script>


<template>

<div class="card card-width">
    <div class="card-body">
        <h5 class="card-title">{{ props.title }}</h5>
        <div class="row">
            <div class="col-12">
                Current Count: {{ counter.get_count }}
            </div>
            <div class="col-12">
                Current Count: {{ counter.get_count_str }}
            </div>
            <div class="col-12">
                <button 
                    type="button" 
                    class="btn btn-primary me-2"
                    @click="counter.increment"
                >
                    Plus
                </button>
                <button 
                    type="button" 
                    class="btn btn-primary me-2"
                    @click="counter.decrement"
                >
                    Minus
                </button>
                <button class="btn btn-my-blue">Blue</button>
            </div>
        </div>
    </div>
</div>

</template>


<style scoped>

.card-width {
    width: 18rem;
}
</style>