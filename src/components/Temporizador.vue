<script setup lang="ts">
import { ref } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';

let props = defineProps({
    podeIniciar: {
        type: Boolean,
        default: true
    }
});

let tempoEmSegundos = ref(0);
let cronometro = ref(0);
let cronometroRodando = ref(false);
const emit = defineEmits(['tempoFinalizado', 'tentativaInicioInvalida']);

function iniciar() {
    if (!props.podeIniciar) {
        emit('tentativaInicioInvalida');
        return;
    }
    if (!cronometroRodando.value) {
        cronometro.value = setInterval(() => {
            tempoEmSegundos.value++;
        }, 1000);
        cronometroRodando.value = true;
    }
}

function finalizar() {
    clearInterval(cronometro.value);
    cronometroRodando.value = false;
    emit('tempoFinalizado', tempoEmSegundos.value);
    tempoEmSegundos.value = 0;
}

</script>

<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos" />
        <Botao :icone="['fas', 'play']" :texto="'play'" :cronometroRodando="cronometroRodando" @click="iniciar" />
        <Botao :icone="['fas', 'stop']" :texto="'stop'" :cronometroRodando="!cronometroRodando" @click="finalizar" />
    </div>
</template>
