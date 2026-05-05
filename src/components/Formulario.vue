<script setup lang="ts">
import { computed, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import type ITarefa from '../interfaces/ITarefa';
import { useStore } from 'vuex';
import { key } from '../store';

let tarefa = ref('');
let idProjeto = ref('');
let campoInvalido = ref(false);
const store = useStore(key);

const projetos = computed(() => store.state.projeto.projetos);

const emit = defineEmits(['TarefaCriada']);

function finalizarTarefa(tempoEmSegundos: number) {
    const novaTarefa: ITarefa = {
        descricao: tarefa.value,
        duracaoEmSegundos: tempoEmSegundos,
        projeto: projetos.value.find(proj => proj.id === idProjeto.value)
    };
    emit('TarefaCriada', novaTarefa);
    tarefa.value = '';
}

</script>

<template>
    <div class="box formulario">
        <div class="columns">
            <form class="column is-5" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" :class="{ 'is-danger': campoInvalido }"
                    placeholder="Qual tarefa você quer criar?" v-model="tarefa" @input="campoInvalido = false" required>
            </form>

            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione um projeto</option>
                        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="column">
                <Temporizador :pode-iniciar="tarefa.trim().length > 0" @tempo-finalizado="finalizarTarefa"
                    @tentativa-inicio-invalida="campoInvalido = true" />
            </div>
        </div>
    </div>
</template>

<style>
.formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>