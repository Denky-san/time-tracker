<script setup lang="ts">
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import type ITarefa from '../interfaces/ITarefa';
import { OBTER_TAREFAS, ADICIONAR_TAREFAS, ALTERAR_TAREFAS, CONSULTAR_PROJETOS } from '@/store/tipoAcoes';
import { useStore } from '@/store';
import { computed, ref, watch, watchEffect } from 'vue';

const tarefaSelecionada = ref<ITarefa | null>(null);
const tarefaEmEdicao = ref<ITarefa | null>(null);
const filtro = ref('');

const store = useStore();
store.dispatch(OBTER_TAREFAS);
store.dispatch(CONSULTAR_PROJETOS);
const tarefas = computed(() => store.state.tarefa.tarefas);
const projetos = computed(() => store.state.projeto.projetos);

watchEffect(() => {
    store.dispatch(OBTER_TAREFAS, filtro.value);
});

watch(tarefaSelecionada, (tarefa) => {
    tarefaEmEdicao.value = tarefa ? { ...tarefa } : null;
});

function adicionarTarefa(tarefa: ITarefa) {
    if (tarefa.descricao.trim() === '') {
        alert('A descrição da tarefa não pode ser vazia.');
        return;
    }

    if (tarefa.duracaoEmSegundos <= 0) {
        console.log('Tarefa válida:', tarefa);
    } else {
        store.dispatch(ADICIONAR_TAREFAS, tarefa).then(() => {
            console.log('Tarefa adicionada com sucesso:', tarefa);
        }).catch(() => {
            alert('Erro ao criar tarefa.');
        });
    }
}

function salvarTarefa() {
    if (!tarefaEmEdicao.value) return;
    store.dispatch(ALTERAR_TAREFAS, tarefaEmEdicao.value).then(() => {
        tarefaSelecionada.value = null;
    }).catch(() => {
        alert('Erro ao salvar tarefa.');
    });
}
</script>

<template>
    <Formulario @tarefa-criada="adicionarTarefa" />
    <div class="lista">

        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro" />
                <span class="icon is-small is-left">
                    <font-awesome-icon :icon="['fas', 'search']" />
                </span>
            </p>
        </div>

        <Tarefa v-for="tarefa in tarefas" :key="tarefa.descricao" :tarefa="tarefa"
            @tarefa-selecionada="tarefaSelecionada = $event" />

        <div class="modal" :class="{ 'is-active': tarefaSelecionada }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma Tarefa</p>
                    <button @click="tarefaSelecionada = null" class="delete" aria-label="close"></button>
                </header>
                <section v-if="tarefaEmEdicao" class="modal-card-body">
                    <div class="field">
                        <label class="label" for="edit-descricao">Descrição</label>
                        <div class="control">
                            <input id="edit-descricao" v-model="tarefaEmEdicao!.descricao" class="input" type="text" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="edit-projeto">Projeto</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select id="edit-projeto" v-model="tarefaEmEdicao!.projeto">
                                    <option :value="undefined">Nenhum</option>
                                    <option v-for="projeto in projetos" :key="projeto.id" :value="projeto">
                                        {{ projeto.nome }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button @click="salvarTarefa" class="button is-success">Salvar</button>
                        <button @click="tarefaSelecionada = null" class="button">Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<style scoped>
.lista {
    padding: 1rem;
}
</style>