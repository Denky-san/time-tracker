<script setup lang="ts">
import { ref } from 'vue';
import Temporizador from './Temporizador.vue';

let tarefa = ref('');

function finalizarTarefa(tempoEmSegundos: number) {
    console.log(`Tarefa: ${tarefa.value} finalizada em ${tempoEmSegundos} segundos.`);
    tarefa.value = '';
}

</script>

<template>
    <div class="box">
        <div class="columns">
            <form class="column is-8" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você quer criar?" v-model="tarefa" required>
            </form>

            <div class="column">
                <Temporizador @tempo-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>