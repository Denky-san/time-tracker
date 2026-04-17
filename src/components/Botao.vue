<script setup lang="ts">

let props = defineProps({
    icone: {
        type: String,
        required: true,
        default: ''
    },
    cronometroRodando: {
        type: Boolean,
        required: true,
        default: false
    },
    texto: {
        type: String,
        required: true,
        default: ''
    }
})
</script>

<template>
    <button class="button" :disabled="cronometroRodando">
        <span class="icon">
            <font-awesome-icon :icon="props.icone" />
        </span>
        <span>{{ props.texto }}</span>
    </button>
</template>
