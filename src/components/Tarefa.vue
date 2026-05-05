<script setup lang="ts">
import Cronometro from './Cronometro.vue';
import type ITarefa from '../interfaces/ITarefa';

const props = defineProps<{ tarefa: ITarefa }>();
</script>

<template>
    <div class="box has-text-weight-bold">
        <div class="columns" style="cursor: pointer;" @click="$emit('tarefa-selecionada', props.tarefa)">
            <div class="column is-4">
                {{ props.tarefa.descricao }}
            </div>
            <div class="column is-3">
                {{ props.tarefa.projeto?.nome }}
            </div>
            <div class="column is-flex is-align-items-center" style="gap: 0.4rem;">
                <Cronometro :tempo-em-segundos="props.tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.box {
    background: #fff06d83;
}
</style>