<script setup lang="ts">
let props = defineProps({
    tempoEmSegundos: {
        type: Number,
        default: 0
    }
})

function tempoDecorrido() {
    return new Date(props.tempoEmSegundos * 1000).toISOString().substring(11, 19);
}
</script>

<template>
    <section class="is-flex is-align-items-center" style="gap: 0.4rem;">
        <font-awesome-icon :icon="['fas', 'clock']" />
        <strong class="display">{{ tempoDecorrido() }}</strong>
    </section>
</template>

<style>
.display {
    color: var(--texto-primario);
}
</style>