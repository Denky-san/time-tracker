import type IProjeto from "@/interfaces/IProjeto";
import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONA_PROJETO,
  EDITA_PROJETO,
  EXCLUIR_PROJETO,
} from "./tipoMutacoes";

interface Estado {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: Date.now().toString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [EDITA_PROJETO](state, projetoEditado: IProjeto) {
      const indice = state.projetos.findIndex(
        (projeto) => projeto.id === projetoEditado.id,
      );

      if (indice !== -1) {
        state.projetos[indice] = projetoEditado;
      }
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((projeto) => projeto.id !== id);
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
