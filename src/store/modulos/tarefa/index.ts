import type ITarefa from "@/interfaces/ITarefa";
import type { Estado } from "@/store";
import type { Module } from "vuex";
import {
  ADICIONA_TAREFAS,
  BUSCA_TAREFAS,
  EDITA_TAREFAS,
} from "@/store/tipoMutacoes";
import {
  ADICIONAR_TAREFAS,
  ALTERAR_TAREFAS,
  OBTER_TAREFAS,
} from "@/store/tipoAcoes";
import api from "@/api";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [BUSCA_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFAS](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [EDITA_TAREFAS](state, tarefaEditada: ITarefa) {
      const indice = state.tarefas.findIndex((t) => t.id === tarefaEditada.id);
      if (indice !== -1) {
        state.tarefas[indice] = tarefaEditada;
      }
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "/tarefas";

      if (filtro) {
        url += "?descricao" + filtro;
      }

      api
        .get<ITarefa[]>(url)
        .then((response) => {
          commit(BUSCA_TAREFAS, response.data);
        })
        .catch((error) => {
          console.error("Erro ao obter tarefas:", error);
        });
    },
    [ADICIONAR_TAREFAS]({ commit }, tarefa: ITarefa) {
      return api
        .post<ITarefa>("/tarefas", tarefa)
        .then(() => {
          commit(ADICIONA_TAREFAS, tarefa);
        })
        .catch((error) => {
          console.error("Erro ao criar tarefa:", error);
        });
    },
    [ALTERAR_TAREFAS]({ commit }, tarefa: ITarefa) {
      return api
        .put<ITarefa>(`/tarefas/${tarefa.id}`, tarefa)
        .then((response) => {
          commit(EDITA_TAREFAS, response.data);
        })
        .catch((error) => {
          console.error("Erro ao atualizar tarefa:", error);
        });
    },
  },
};
