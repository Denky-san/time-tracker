<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { EXCLUIR_PROJETO } from '@/store/tipoMutacoes';

const store = useStore();
const projetos = computed(() => store.state.projetos); 
</script>

<template>
    <section>

        <router-link to="/projetos/novo" class="button mb-4">
            <font-awesome-icon icon="plus" class="icon" />
            <span>Novo Projeto</span>
        </router-link>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button is-warning is-small">
                            <font-awesome-icon icon="edit" class="icon" />
                        </router-link>
                        <button class="button ml-2 is-danger is-small"
                            @click="store.commit(EXCLUIR_PROJETO, projeto.id)">
                            <font-awesome-icon icon="trash" class="icon" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>