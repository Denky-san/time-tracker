<script setup lang="ts">
import { computed, ref } from 'vue';

let tempoEmSegundos = ref(0);
let cronometro = ref(0);

function iniciar() {
    cronometro.value = setInterval(() => {
        tempoEmSegundos.value++;
    }, 1000);
}

function finalizar() {
    clearInterval(cronometro.value);
}

function tempoDecorrido() {
    return new Date(tempoEmSegundos.value * 1000).toISOString().substring(11, 19);
}
</script>

<template>
    <div class="box">
        <div class="columns">
            <form class="column is-8" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você quer criar?">
            </form>

            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <section>
                        <strong>{{ tempoDecorrido() }}</strong>
                    </section>
                    <button class="button" @click="iniciar">
                        <span class="icon">
                            <font-awesome-icon icon="fa-solid fa-play" />
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button" @click="finalizar">
                        <span class="icon">
                            <font-awesome-icon icon="fa-solid fa-stop" />
                        </span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>