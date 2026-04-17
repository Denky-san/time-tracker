<script setup lang="ts">
import Cronometro from './Cronometro.vue';

let props = defineProps({
    tarefa: {
        type: String,
        required: true
    },
    tempoEmSegundos: {
        type: Number,
        required: true
    }
});
</script>

<template>
    <div class="box has-text-weight-bold">
        <div class="columns">
            <div class="column is-7">
                {{ props.tarefa }}
            </div>
            <div class="column">
                <Cronometro :tempo-em-segundos="props.tempoEmSegundos" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.box {
    background: #fff06d83;
}
</style>