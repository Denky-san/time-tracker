<script setup lang="ts">
let props = defineProps({
    tempoEmSegundos: {
        type: Number,
        required: true,
        default: 0
    }
})

function tempoDecorrido() {
    return new Date(props.tempoEmSegundos * 1000).toISOString().substring(11, 19);
}
</script>

<template>
    <section>
        <strong>{{ tempoDecorrido() }}</strong>
    </section>
</template>