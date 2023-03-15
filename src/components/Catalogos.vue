<template>
  <div class="flex w-full flex-col space-y-12">
    <div class="flex w-full justify-center">
      <div class="grid lg:grid-flow-col grid-cols-2">
        <div v-for="(value, index) in options" class="flex w-full">
          <button
            @click="cambiarComponente(value.component, value.control, index)"
            class="group m-2 h-28 w-28 items-center rounded-lg font-semibold hover:bg-[#E9F0FC]"
            @mouseover="value.hover = true"
            @mouseleave="value.hover = false"
          >
            <div class="max-w-12 flex flex-col items-center">
              <span
                class="flex h-14 w-14 lg:h-10 lg:w-10 items-center justify-center rounded-md bg-[#E9F0FC] shadow-md group-hover:bg-[#FFFFFF]"
              >
                <component
                  :is="value.componentIco"
                  :color="value.active || value.hover ? '#2166E5' : '#101D2D'"
                />
              </span>
              <span
                :class="[
                  value.active ? 'text-primario' : 'text-[#101D2D]',
                  'mt-2 w-24 break-words text-base lg:text-clip group-hover:text-primario',
                ]"
              >
                {{ value.name }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="flex h-full w-full">
      <component
        :is="componenteSeleccionado.component"
        :control="componenteSeleccionado.control"
      />
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

const options = reactive([
  {
    name: "Usuarios",
    component: markRaw(Usuarios),
    componentIco: markRaw(UsuariosIco),
    active: true,
    hover: false,
  },
  {
    name: "Folios",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(FoliosIco),
    control: 0,
    active: false,
    hover: false,
  },
  {
    name: "Fallas",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(FallasIco),
    control: 1,
    active: false,
    hover: false,
  },
  {
    name: "Causas",
    component: markRaw(CatalogosPestanas),
    componentIco: markRaw(CausasIco),
    control: 2,
    active: false,
    hover: false,
  },
  {
    name: "Concepto",
    component: markRaw(Conceptos),
    componentIco: markRaw(ConseptosIco),
    active: false,
    hover: false,
  },
  {
    name: "Distritos/ Clusters",
    component: markRaw(Distritos),
    componentIco: markRaw(DistritosIco),
    active: false,
    hover: false,
  },
]);

const oldValue = ref(0);
const isHover = ref(false);

const componenteSeleccionado = reactive({
  component: markRaw(Usuarios),
  control: 0,
});

const cambiarComponente = (componente, control, index) => {
  if (oldValue.value >= 0) {
    options[oldValue.value].active = false;
  }
  options[index].active = true;
  oldValue.value = index;

  componenteSeleccionado.component = componente;
  componenteSeleccionado.control = control;
};
</script>
