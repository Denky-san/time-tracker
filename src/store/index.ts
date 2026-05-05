import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { EstadoProjeto } from "./modulos/projeto";
import { projeto } from "./modulos/projeto";
import type { EstadoTarefa } from "./modulos/tarefa";
import { tarefa } from "./modulos/tarefa";

export interface Estado {
  projeto: EstadoProjeto;
  tarefa: EstadoTarefa;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  modules: { projeto, tarefa },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
