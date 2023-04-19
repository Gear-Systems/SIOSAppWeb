<template>
    <div class="mt-10 flex h-[15%] w-full justify-center">
      <div
        class="flex h-[100%] w-full justify-center rounded-lg shadow-customized"
      >
        <!-- Inicio -->
        <div @click="paso = 1" class="flex w-1/3 flex-col items-center justify-center cursor-pointer">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full"
            :class="[
              paso == 1
                ? '-mt-[13%] bg-white shadow-box'
                : '-mt-[12%] bg-tipografia',
            ]"
          >
            <HoraInicioIco :color="paso == 1 ? '#2166E5' : '#FFFFFF'" />
          </div>
          <p
            :class="[
              paso == 1 ? 'font-medium text-primario' : 'text-tipografia',
              'mt-2',
            ]"
          >
            Hora de inicio
          </p>
          <div class="flex w-full justify-center pt-5">
            <div
              class="flex w-[60%]"
              :class="[
                paso == 1 ? 'border-b-4 border-solid border-primario' : '',
              ]"
            ></div>
          </div>
        </div>
        <!-- Llegada -->
        <div @click="paso = 2" class="flex w-1/3 flex-col items-center justify-center cursor-pointer">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full"
            :class="[
              paso == 2
                ? '-mt-[13%] bg-white shadow-box'
                : '-mt-[12%] bg-tipografia',
            ]"
          >
            <HoraLlegadaIco :color="paso == 2 ? '#2166E5' : '#FFFFFF'" />
          </div>
          <p
            :class="[
              paso == 2 ? 'font-medium text-primario' : 'text-tipografia',
              'mt-2',
            ]"
          >
            Hora de llegada
          </p>
          <div class="flex w-full justify-center pt-5">
            <div
              class="flex w-[60%]"
              :class="[
                paso == 2 ? 'border-b-4 border-solid border-primario' : '',
              ]"
            ></div>
          </div>
        </div>
        <!-- cierre -->
        <div @click="paso = 3" class="flex w-1/3 flex-col items-center justify-center cursor-pointer">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full"
            :class="[
              paso == 3
                ? '-mt-[13%] bg-white shadow-box'
                : '-mt-[12%] bg-tipografia',
            ]"
          >
            <HoraCierreIco :color="paso == 3 ? '#2166E5' : '#FFFFFF'" />
          </div>
          <p
            :class="[
              paso == 3 ? 'font-medium text-primario' : 'text-tipografia',
              'mt-2',
            ]"
          >
            Hora de cierre
          </p>
          <div class="flex w-full justify-center pt-5">
            <div
              class="flex w-[60%]"
              :class="[
                paso == 3 ? 'border-b-4 border-solid border-primario' : '',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import HoraInicioIco from "@/components/iconos/HoraInicioIco.vue";
  import HoraLlegadaIco from "@/components/iconos/HoraLlegadaIco.vue";
  import HoraCierreIco from "@/components/iconos/HoraCierreIco.vue";
  import { useFolios } from "@/store/foliosController";
  import { storeToRefs } from "pinia"

  const foliosController = useFolios();
  const { paso } = storeToRefs(foliosController);
  // const props = defineProps(["state", "pasoDB"]);
  // const emits = defineEmits(["setPaso"]);
  </script>
  