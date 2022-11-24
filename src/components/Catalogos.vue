<template>
  <div class="flex w-full flex-col space-y-12 pb-16">
    <div class="flex w-full justify-center">
      <div class="grid w-[50%] grid-flow-col grid-rows-2 gap-4">
        <div v-for="(value, index) in options" class="flex w-full space-x-2">
          <button @click="cambiarComponente(value.component, value.control, index)"
            class="flex h-full w-full items-center p-2 font-semibold">
            <span class="flex justify-center items-center mr-4 h-8 w-8 rounded-md bg-[#D9D9D9]">
              <component :is="value.componentIco" :color="value.active ? '#2166E5' : '#101D2D'" />
            </span>
            <span :class="value.active ? 'text-primario' : 'text-[#101D2D]'">
              {{value.name}}
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex h-full w-full pb-12">
      <component :is="componenteSeleccionado.component" :control="componenteSeleccionado.control"></component>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw, reactive } from "vue";
import Usuarios from "@/components/CatalogosUsuarios.vue";
import Distritos from "@/components/CatalogosDistritos.vue";
import Conceptos from "@/components/CatalogosConceptos.vue";
import CatalogosPestanas from "./CatalogosPestanas.vue";
import UsuariosIco from "./iconos/UsuariosIco.vue";
import DistritosIco from "./iconos/DistritosIco.vue";
import FallasIco from "./iconos/FallasIco.vue";
import ConseptosIco from "./iconos/ConseptosIco.vue";
import CausasIco from "./iconos/CausasIco.vue";
import FoliosIco from "./iconos/FoliosIco.vue";

const options = [
  {
    name: "Usuarios",
    component: markRaw(Usuarios),
    componentIco: markRaw(UsuariosIco),
    active: false,
  },
  {
    name: "Distritos/Clusters",
    component: markRaw(Distritos),
    componentIco: markRaw(DistritosIco),
    active: false,
  },
  {
    name: "Fallas",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(FallasIco),
    control: 0,
    active: false,
  },
  {
    name: "Conceptos",
    component: markRaw(Conceptos),
    componentIco: markRaw(ConseptosIco),
    active: false,
  },

  {
    name: "Causas",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(CausasIco),
    control: 1,
    active: false,
  },
  {
    name: "Folios",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(FoliosIco),
    control: 2,
    active: false,
  },
];

const oldValue = ref(-1);

const componenteSeleccionado = reactive({
  component: markRaw(Usuarios),
  control: 0,
});

const cambiarComponente = (componente, control, index) => {
  console.log(options[index].active)
  if (oldValue.value >= 0) {
    options[oldValue.value].active = false
  }
  options[index].active = true;
  oldValue.value = index;

  componenteSeleccionado.component = componente;
  componenteSeleccionado.control = control;
};


</script>
