<template>
  <div class="z-10 mt-6 flex h-auto w-[100%] lg:pl-2">
    <div class="flex w-[100%] flex-col self-start lg:flex-row">
      <!-- Contenedor de fecha -->
      <div class="flex flex-col lg:w-1/2">
        <div class="flex">
          <div class="flex items-center justify-center pb-1 lg:pr-10">
            <h1 class="select-none font-semibold">Fecha</h1>
          </div>
        </div>
        <div
          class="flex w-full items-center justify-around rounded-lg lg:w-[90%] lg:py-4"
        >
          <div class="flex self-start pt-[2%]">
            <Popover v-slot="{ close }" class="">
              <PopoverButton
                class="group inline-flex items-center rounded-md bg-transparent bg-[#90B3F2] p-2 text-base font-medium text-white"
              >
                <CalendarIcon class="h-6 w-6 self-center" />
              </PopoverButton>
              <PopoverPanel
                class="w-cover absolute z-50 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="z-50 w-[250px] rounded-lg bg-white shadow-lg shadow-black/5 ring-1 ring-black ring-opacity-5"
                >
                  <div class="flex">
                    <DatePicker
                      v-model="horario"
                      is-required
                      mode="datetime"
                      is24hr
                    />
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
          <div
            class="flex select-none flex-col items-center justify-center pl-2"
          >
            <input
              :value="horario.getDate()"
              class="flex h-[56px] w-[56px] rounded-full border-transparent bg-hover text-center font-semibold"
              type="text"
              disabled
            />
            <div
              class="mt-2 flex select-none items-center justify-center self-center text-center text-sm"
            >
              Día
            </div>
          </div>
          <div
            class="mb-5 flex select-none items-center justify-center text-xl font-bold text-gris-claro"
          >
            /
          </div>
          <div class="flex select-none flex-col items-center justify-center">
            <input
              :value="horario.getMonth() + 1"
              class="flex h-[56px] w-[56px] rounded-full border-transparent bg-hover text-center font-semibold"
              type="text"
              disabled
            />
            <div
              class="mt-2 flex select-none items-center justify-center self-center text-center text-sm"
            >
              Mes
            </div>
          </div>
          <div
            class="mb-5 flex select-none items-center justify-center text-xl font-bold text-gris-claro"
          >
            /
          </div>
          <div class="flex w-20 select-none flex-col">
            <input
              :value="horario.getFullYear().toString().slice(-2)"
              class="flex h-[56px] w-[56px] rounded-full border-transparent bg-hover text-center font-semibold"
              type="text"
              disabled
            />
            <div
              class="mt-2 -ml-6 flex select-none items-center justify-center self-center text-center text-sm"
            >
              Año
            </div>
          </div>
        </div>
      </div>
      <!-- Fin Contenedor de fecha -->

      <!-- Contenedor de hora -->
      <div class="flex flex-col lg:w-1/2">
        <div class="flex">
          <div class="flex items-center justify-center pr-10 pb-1">
            <h1 class="select-none font-semibold">Hora</h1>
          </div>
        </div>
        <div
          class="flex w-full items-center justify-around rounded-lg lg:w-[90%] lg:py-4"
        >
          <div class="flex select-none self-start pt-[2%]">
            <div
              class="group inline-flex items-center rounded-md bg-transparent bg-[#90B3F2] p-2 text-base font-medium text-white"
            >
              <ClockIcon class="h-6 w-6 self-center" />
            </div>
          </div>
          <div
            class="flex select-none flex-col items-center justify-center pl-2"
          >
            <input
              :value="horario.getHours()"
              class="flex h-[56px] w-[56px] rounded-full border-transparent bg-hover text-center font-semibold"
              type="text"
              disabled
            />
            <div class="flex items-center justify-center">Hora</div>
          </div>
          <div
            class="mb-5 flex select-none items-center justify-center text-4xl font-bold text-gris-claro"
          >
            :
          </div>
          <div class="flex select-none flex-col">
            <input
              :value="horario.getMinutes()"
              class="flex h-[56px] w-[56px] rounded-full border-transparent bg-hover text-center font-semibold"
              type="text"
              disabled
            />
            <div class="flex items-center justify-center">Min</div>
          </div>
        </div>
      </div>
      <!-- Fin contenedor de hora -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { CalendarIcon, ClockIcon } from "@heroicons/vue/outline";
import { DatePicker } from "v-calendar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { useFolios } from "@/store/foliosController";
import { storeToRefs } from "pinia";

const horario = ref(new Date());
const foliosController = useFolios();
const { horaInicio, horaLlegada, horaActivacion, paso } =
  storeToRefs(foliosController);

onMounted(() => {
  switch (paso.value) {
    case 1:
      horario.value = horaInicio.value;
      break;
    case 2:
      horario.value = horaLlegada.value;
      break;
    case 3:
      horario.value = horaActivacion.value;
      break;
  }
});

watch(horario, (value) => {
  switch (paso.value) {
    case 1:
      if (horario.value != horaInicio.value) {
        horaInicio.value = horario.value;
      }
      break;
    case 2:
      if (horario.value != horaLlegada.value) {
        horaLlegada.value = horario.value;
      }
      break;
    case 3:
      if (horario.value != horaActivacion.value) {
        horaActivacion.value = horario.value;
      }
      break;
  }
});
</script>

<style>
.sin-barra {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}
.sin-barra::-webkit-scrollbar {
  display: none;
}
</style>
