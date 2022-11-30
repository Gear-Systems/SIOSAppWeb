<template>
  <div class="z-10 mt-6 flex h-auto w-[100%] pl-2">
    <div class="flex w-[100%] self-start">
      <!-- Contenedor de fecha -->
      <div class="flex w-1/2 flex-col">
        <div class="flex">
          <div class="flex items-center justify-center pr-10 pb-1">
            <h1 class="select-none font-semibold">Fecha</h1>
          </div>
        </div>
        <div class="flex w-[90%] items-center justify-around rounded-lg py-4">
          <!-- AQUI -->
          <div class="flex self-start pt-[2%]">
            <Popover v-slot="{ close }" class="relative">
              <PopoverButton
                class="group inline-flex items-center rounded-md bg-transparent bg-[#90B3F2] p-2 text-base font-medium text-white"
              >
                <CalendarIcon class="h-6 w-6 self-center" />
              </PopoverButton>
              <PopoverPanel
                class="w-cover absolute max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="w-[250px] rounded-lg bg-white shadow-lg shadow-black/5 ring-1 ring-black ring-opacity-5"
                >
                  <div class="flex">
                    <DatePicker
                      style="border: #000000"
                      class="flex"
                      v-model="horario"
                      @dayclick="imprimir()"
                    />
                  </div>
                  <div class="h-15 flex w-[100%] items-center justify-center">
                    <button
                      as="button"
                      class="z-[100] mb-3 -mt-3 flex rounded-md bg-[#E9F0FC] px-6 py-1"
                      @click="obtenerFechaActual(close)"
                    >
                      Aceptar
                    </button>
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
      <div class="flex w-1/2 flex-col">
        <div class="flex">
          <div class="flex items-center justify-center pr-10 pb-1">
            <h1 class="select-none font-semibold">Hora</h1>
          </div>
        </div>
        <div class="flex w-[90%] items-center space-x-4 rounded-lg py-4">
          <!-- AQUI -->
          <div class="flex select-none self-start pt-[2%]">
            <Popover v-slot="{ inputValue, open }" class="relative">
              <PopoverButton
                class="group inline-flex items-center rounded-md bg-transparent bg-[#90B3F2] p-2 text-base font-medium text-white"
              >
                <ClockIcon class="h-6 w-6 self-center" />
              </PopoverButton>
              <PopoverPanel
                class="absolute -left-[150%] w-full max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="w-[250px] rounded-lg bg-white shadow-lg shadow-black/5 ring-1 ring-black ring-opacity-5"
                >
                  <div class="flex">
                    <DatePicker
                      style="border: #000000"
                      mode="time"
                      :is24hr="true"
                      class="flex"
                      v-model="horario"
                      @change="imprimir()"
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
import { ref, onMounted, reactive, computed } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import {
  getDatabase,
  ref as refDB,
  get,
  set,
  child,
  serverTimestamp,
} from "@firebase/database";
import { CalendarIcon, ClockIcon } from "@heroicons/vue/outline";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
import {
  guardarFechaInicio,
  guardarFechaLlegada,
  guardarFechaActivacion,
} from "@/consultasBD/guardarHorario";
import { useStore } from "vuex";

const auth = getAuth();
const timestamps = reactive({
  fecha: "",
  hora: "",
});
const router = useRouter();
const db = getDatabase();
const route = useRoute();
const store = useStore();
const props = defineProps({
  state: Number,
  incidencia: Number,
  folio: String,
  tipoFolio: String,
  fechaInicioBD: Number,
});


const horario = ref(new Date());
const emit = defineEmits(["guardarFecha"]);
const horarioCaptura = ref({
  dia: "dd",
  mes: "mm",
  anio: "yy",
  hora: "HH",
  minuto: "MM",
});
const horaMinuto = ref({
  hora: arrayActiveHora,
  minuto: arrayActiveMinuto,
});

onMounted(() => {
  horaMinuto.value.hora = arrayActiveHora;
  horaMinuto.value.minuto = arrayActiveMinuto;
  if (props.fechaInicioBD) {
    horario.value = new Date(props.fechaInicioBD);
    emit("guardarFecha", horario.value);
  } else {
    imprimir();
  }
});

const imprimir = () => {
  emit("guardarFecha", horario.value)
  switch (props.state) {
    case 1:
      guardarFechaInicio(props.folio, props.incidencia, horario.value);
      break;
    case 2:
      guardarFechaLlegada(props.folio, props.incidencia, horario.value);
      break;
    case 3:
      store.commit("asignarMuestraJustificacion", 0);
      guardarFechaActivacion(props.folio, props.incidencia, horario.value);
      break;
  }
};
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
