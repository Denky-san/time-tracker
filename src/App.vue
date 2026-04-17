<script setup lang="ts">
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
</script>

<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />

    </div>

    <div class="column is-three-quarters">
      <Formulario />
    </div>
  </main>
</template>
