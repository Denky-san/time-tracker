import type IProjeto from "@/interfaces/IProjeto";
import type { Estado } from "@/store";
import type { Module } from "vuex";
import {
  ADICIONA_PROJETO,
  BUSCA_PROJETOS,
  EDITA_PROJETO,
  EXCLUIR_PROJETO,
} from "@/store/tipoMutacoes";
import {
  ADICIONAR_PROJETO,
  ALTERAR_PROJETO,
  CONSULTAR_PROJETOS,
  REMOVER_PROJETO,
} from "@/store/tipoAcoes";
import api from "@/api";

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
  state: {
    projetos: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, projeto: IProjeto) {
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
    [BUSCA_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
  },
  actions: {
    [CONSULTAR_PROJETOS]({ commit }) {
      api
        .get<IProjeto[]>("/projetos")
        .then((response) => {
          const projetos = response.data;
          commit(BUSCA_PROJETOS, projetos);
        })
        .catch((error) => {
          console.error("Erro ao obter projetos:", error);
        });
    },
    [ADICIONAR_PROJETO]({ commit }, nomeDoProjeto: string) {
      const projeto: IProjeto = {
        id: Date.now().toString(),
        nome: nomeDoProjeto,
      };
      return api
        .post<IProjeto>("/projetos", projeto)
        .then(() => {
          commit(ADICIONA_PROJETO, projeto);
        })
        .catch((error) => {
          console.error("Erro ao criar projeto:", error);
        });
    },
    [ALTERAR_PROJETO]({ commit }, projetoEditado: IProjeto) {
      return api
        .put<IProjeto>(`/projetos/${projetoEditado.id}`, projetoEditado)
        .then((response) => {
          const projetoAtualizado = response.data;
          commit(EDITA_PROJETO, projetoAtualizado);
        })
        .catch((error) => {
          console.error("Erro ao atualizar projeto:", error);
        });
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return api
        .delete(`/projetos/${id}`)
        .then(() => {
          commit(EXCLUIR_PROJETO, id);
        })
        .catch((error) => {
          console.error("Erro ao excluir projeto:", error);
        });
    },
  },
};
