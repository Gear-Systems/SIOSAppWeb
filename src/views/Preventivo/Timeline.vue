<template>
  <div class="mt-10 flex h-[15%] w-full justify-center">
    <div
      class="flex h-[100%] w-full justify-center rounded-lg shadow-customized"
    >
      <div class="flex w-1/3 flex-col items-center justify-center">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full"
          :class="[
            props.state == 1
              ? '-mt-[13%] bg-white shadow-box'
              : '-mt-[12%] bg-tipografia',
          ]"
        >
          <HoraInicioIco :color="props.state == 1 ? '#2166E5' : '#FFFFFF'" />
        </div>
        <p
          :class="[
            props.state == 1 ? 'font-medium text-primario' : 'text-tipografia',
            'mt-2',
          ]"
        >
          Hora de inicio
        </p>
        <div class="flex w-full justify-center pt-5">
          <div
            class="flex w-[60%]"
            :class="[
              props.state == 1 ? 'border-b-4 border-solid border-primario' : '',
            ]"
          ></div>
        </div>
      </div>
      <div class="flex w-1/3 flex-col items-center justify-center">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full"
          :class="[
            props.state == 2
              ? '-mt-[13%] bg-white shadow-box'
              : '-mt-[12%] bg-tipografia',
          ]"
        >
          <HoraLlegadaIco :color="props.state == 2 ? '#2166E5' : '#FFFFFF'" />
        </div>
        <p
          :class="[
            props.state == 2 ? 'font-medium text-primario' : 'text-tipografia',
            'mt-2',
          ]"
        >
          Hora de llegada
        </p>
        <div class="flex w-full justify-center pt-5">
          <div
            class="flex w-[60%]"
            :class="[
              props.state == 2 ? 'border-b-4 border-solid border-primario' : '',
            ]"
          ></div>
        </div>
      </div>
      <div class="flex w-1/3 flex-col items-center justify-center">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full"
          :class="[
            props.state == 3
              ? '-mt-[13%] bg-white shadow-box'
              : '-mt-[12%] bg-tipografia',
          ]"
        >
          <HoraCierreIco :color="props.state == 3 ? '#2166E5' : '#FFFFFF'" />
        </div>
        <p
          :class="[
            props.state == 3 ? 'font-medium text-primario' : 'text-tipografia',
            'mt-2',
          ]"
        >
          Hora de cierre
        </p>
        <div class="flex w-full justify-center pt-5">
          <div
            class="flex w-[60%]"
            :class="[
              props.state == 3 ? 'border-b-4 border-solid border-primario' : '',
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
const props = defineProps(["state"]);
</script>
