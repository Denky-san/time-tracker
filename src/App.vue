<script setup lang="ts">
import { ref } from 'vue';
import BarraLateral from './components/BarraLateral.vue';

let modoEscuro = ref(false);

</script>

<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuro }">
    <div class="column is-one-quarter">
      <BarraLateral @alternar-tema="modoEscuro = !modoEscuro" />

    </div>
    <div class="column is-three-quarters conteudo">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
main {
  --bg-primario: var(--branco);
  --texto-primario: var(--preto)
}

main.modo-escuro {
  --bg-primario: var(--cinza-escuro);
  --texto-primario: var(--cinza-claro);
}

.conteudo {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>