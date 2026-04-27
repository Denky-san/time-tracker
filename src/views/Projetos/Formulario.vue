<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { EDITA_PROJETO, ADICIONA_PROJETO } from '@/store/tipoMutacoes';

let nomeDoProjeto = ref('');

const store = useStore();
const router = useRouter();

let props = defineProps({
    id: String
})

onMounted(() => {
    if (props.id) {
        const projeto = store.state.projetos.find((p: any) => p.id === props.id);
        if (projeto) {
            nomeDoProjeto.value = projeto.nome;
        } else {
            alert('Projeto não encontrado!');
            router.push('/projetos');
        }
    }
});

function salvar() {
    if (nomeDoProjeto.value.trim() === '') {
        alert('O nome do projeto não pode ser vazio.');
        return;
    }

    if (props.id) {
        store.commit(EDITA_PROJETO, { id: props.id, nome: nomeDoProjeto.value });
    } else {
        store.commit(ADICIONA_PROJETO, nomeDoProjeto.value);
    }
    nomeDoProjeto.value = '';

    router.push('/projetos');
}
</script>

<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
                <input type="text" id="nomeDoProjeto" class="input" v-model="nomeDoProjeto" />
            </div>

            <div class="field">
                <button class="button is-primary" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>