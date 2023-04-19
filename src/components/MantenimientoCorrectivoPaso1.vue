<template>
  <div class="flex w-[100%]">
    <div
      class="mb-3 flex w-full flex-col items-start justify-start lg:w-[90%] lg:pl-2"
    >
      <Horario/>
      <!-- <div class="mt-2 flex w-[100%] items-center justify-center py-1">
        <span class="text-xs font-semibold text-red-400">{{
          "Campo(s) requerido(s). Selecciona una fecha y horario válido"
        }}</span>
        <ExclamationCircleIcon class="ml-2 h-4 w-4 text-red-400" />
      </div> -->
    </div>
    <div class="flex h-full items-center">
      <button @click="guardarPaso1()" type="button">
        <ChevronRightIcon
          class="h-12 w-12 rounded-full bg-primario p-1.5 text-white"
        />
      </button>
    </div>
    <ModalManejoFolio />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Horario from "@/components/Horario.vue";
import { ChevronRightIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import ModalManejoFolio from "@/components/ModalManejoFolio.vue"
import { useFolios } from "@/store/foliosController";

const foliosController = useFolios();
const { paso1 } = foliosController;

const guardarPaso1 = async () => {
  await paso1();
}
</script>
