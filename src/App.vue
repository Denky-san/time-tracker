<script setup lang="ts">
import { ref } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import type ITarefa from './interfaces/ITarefa';

let tarefas = ref<ITarefa[]>([]);

function adicionarTarefa(tarefa: ITarefa) {
  tarefas.value.push(tarefa);
}
</script>

<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />

    </div>

    <div class="column is-three-quarters">
      <Formulario @tarefa-criada="adicionarTarefa" />
      <div class="lista">
        <Tarefa v-for="tarefa in tarefas" :key="tarefa.descricao" :tarefa="tarefa.descricao"
          :tempo-em-segundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.lista {
  padding: 1rem;
}
</style>