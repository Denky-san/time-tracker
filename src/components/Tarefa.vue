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
    },
    projeto: {
        type: String,
        required: false
    }
});
</script>

<template>
    <div class="box has-text-weight-bold">
        <div class="columns">
            <div class="column is-4">
                {{ props.tarefa }}
            </div>
            <div class="column is-3">
                {{ props.projeto }}
            </div>
            <div class="column is-flex is-align-items-center" style="gap: 0.4rem;">
                <font-awesome-icon icon="clock" />
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