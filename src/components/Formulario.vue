<script setup lang="ts">
import { ref } from 'vue';
import Temporizador from './Temporizador.vue';
import type ITarefa from '../interfaces/ITarefa';

let tarefa = ref('');
let campoInvalido = ref(false);
const emit = defineEmits(['TarefaCriada']);

function finalizarTarefa(tempoEmSegundos: number) {
    const novaTarefa: ITarefa = {
        descricao: tarefa.value,
        duracaoEmSegundos: tempoEmSegundos
    };
    emit('TarefaCriada', novaTarefa);
    tarefa.value = '';
}

</script>

<template>
    <div class="box">
        <div class="columns">
            <form class="column is-8" aria-label="Formulário para criação de uma nova tarefa">
                <input
                    type="text"
                    class="input"
                    :class="{ 'is-danger': campoInvalido }"
                    placeholder="Qual tarefa você quer criar?"
                    v-model="tarefa"
                    @input="campoInvalido = false"
                    required
                >
            </form>

            <div class="column">
                <Temporizador
                    :pode-iniciar="tarefa.trim().length > 0"
                    @tempo-finalizado="finalizarTarefa"
                    @tentativa-inicio-invalida="campoInvalido = true"
                />
            </div>
        </div>
    </div>
</template>