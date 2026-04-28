<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { ADICIONAR_PROJETO, ALTERAR_PROJETO } from '../../store/tipoAcoes';

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
        store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value }).then(() => {
            nomeDoProjeto.value = '';
            router.push('/projetos');
        }).catch(() => {
            alert('Erro ao alterar projeto.');
        });
    } else {
        store.dispatch(ADICIONAR_PROJETO, nomeDoProjeto.value).then(() => {
            nomeDoProjeto.value = '';
            router.push('/projetos');
        }).catch(() => {
            alert('Erro ao criar projeto.');
        });
    }
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