<script setup lang="ts">
import { ref } from 'vue';
import type IProjeto from '../interfaces/IProjeto';

let nomeDoProjeto = ref('');
let projetos = ref<IProjeto[]>([]);


function salvar() {
    if (nomeDoProjeto.value.trim() === '') {
        alert('O nome do projeto não pode ser vazio.');
        return;
    }

    const novoProjeto: IProjeto = {
        id: Date.now().toString(),
        nome: nomeDoProjeto.value
    };

    projetos.value.push(novoProjeto);
    nomeDoProjeto.value = '';
}
</script>

<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
                <input type="text" id="nomeDoProjeto" class="input" v-model="nomeDoProjeto" />
            </div>

            <div class="field">
                <button class="button is-primary" type="submit">Salvar</button>
            </div>
        </form>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>