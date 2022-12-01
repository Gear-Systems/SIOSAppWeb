<template>
  <div class="mt-12 flex w-full flex-col items-center">
    <div class="flex w-[500px] flex-col">
      <div class="flex w-full justify-center">
        <h1 class="flex flex-col items-center">
          <span class="font-medium">Capturar</span
          ><span class="text-3xl font-semibold">Nuevo folio</span>
        </h1>
      </div>
      <div class="mt-14 flex justify-between">
        <div
          class="group flex cursor-pointer items-center space-x-5"
          @click="toggleModalCorrectivo"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E9F0FC] drop-shadow-lg transition-all duration-500 group-hover:-translate-y-2"
          >
            <FoliosCorrectivos :color="'#101D2D'" />
          </div>
          <div
            class="font-medium transition-all duration-500 group-hover:-translate-y-2"
          >
            Folio Correctivo
          </div>
        </div>
        <div
          class="group flex cursor-pointer items-center space-x-5"
          @click="toggleModalPreventivo"
        >
        <div
            class="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E9F0FC] drop-shadow-lg transition-all duration-500 group-hover:-translate-y-2"
          >
            <FoliosPreventivos :color="'#101D2D'" />
          </div>
          <div class="font-medium transition-all duration-500 group-hover:-translate-y-2">Folio Preventivo</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ModalDatosCorrectivo from "@/views/Correctivo/ModalDatosCorrectivo.vue";
import ModalDatosPreventivo from "@/views/Preventivo/ModalDatosPreventivo.vue";
import FoliosCorrectivos from "@/components/iconos/FoliosCorrectivos.vue";
import FoliosPreventivos from "@/components/iconos/FoliosPreventivos.vue";

const i = ref(0);
const arreglo = ref([]);
const router = useRouter();
const store = useStore();
const isOpen = ref(false);

const folio = ref("");
const tipoFolio = ref(0);
const control = ref(true);

store.commit("cerrarModalCorrectivo");

function toggleModalCorrectivo() {
  store.commit("abrirModalCorrectivo");
}
function toggleModalPreventivo() {
  store.commit("abrirModalPreventivo");
}
</script>
