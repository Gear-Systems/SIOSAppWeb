<template>
  <div class="flex w-full flex-col space-y-12 pb-16">
    <div class="flex w-full justify-center ">
      <div class="grid grid-flow-col">
        <div v-for="(value, index) in options" class="flex w-full">
          <button @click="cambiarComponente(value.component, value.control, index)"
            class="h-full items-center font-semibold m-2 w-28 h-28 rounded-lg hover:bg-[#E9F0FC]">
            <div class="flex flex-col items-center max-w-12">
            <span class="flex justify-center items-center rounded-md  hover:bg-[#FFFFFF] bg-[#E9F0FC] w-10 h-10 shadow-md">
              <component :is="value.componentIco" :color="value.active ? '#2166E5' : '#101D2D'" />
            </span>
            <span :class="[value.active ? 'text-primario' : 'text-[#101D2D]', 'mt-2 w-20 break-words text-base hover:text-primario']">
              {{ value.name }}
            </span>
          </div>
          </button>
        </div>
      </div>
    </div>
    <div class="flex h-full w-full pb-12">
      <component :is="componenteSeleccionado.component" :control="componenteSeleccionado.control" />
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
    name: "Folios",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(FoliosIco),
    control: 2,
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
    name: "Causas",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(CausasIco),
    control: 1,
    active: false,
  },
  {
    name: "Concepto",
    component: markRaw(Conceptos),
    componentIco: markRaw(ConseptosIco),
    active: false,
  },
  {
    name: "Distritos/ Clusters",
    component: markRaw(Distritos),
    componentIco: markRaw(DistritosIco),
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
