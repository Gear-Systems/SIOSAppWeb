<template>
  <div class="flex w-[100%]">
    <div
      class="mb-3 flex w-full flex-col items-start justify-start lg:w-[90%] lg:pl-2"
    >
      <Horario />
      <div
        v-if="error.code == 1"
        class="mt-2 flex w-[100%] items-center justify-center py-1"
        :class="rebotar"
      >
        <span class="text-xs font-semibold text-red-400">{{
          error.message
        }}</span>
        <ExclamationCircleIcon class="ml-2 h-4 w-4 text-red-400" />
      </div>
      <div class="mt-5 flex w-[100%]">
        <div class="mt-5 flex flex-col lg:w-[50%]">
          <div class="flex w-[100%] pb-1 font-semibold">Coordenadas</div>
          <div
            class="flex flex-col items-center justify-around rounded-lg py-4 shadow-customized lg:w-[95%]"
          >
            <div class="flex items-center lg:w-[90%]">
              <div class="flex w-[90%] justify-center">
                <input
                  v-model="coordenadas"
                  id="coord"
                  placeholder="00.000000, -00.000000"
                  class="flex w-[90%] rounded-lg border-[#C4C4C4] border-transparent text-left text-sm font-semibold"
                  type="text"
                  @change="validarCoordenadas()"
                />
              </div>
              <div class="flex w-[10%] items-start justify-start">
                <label for="coord">
                  <LocationMarkerIcon
                    class="flex h-5 w-5 hover:cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
          <div class="ml-[10%] mt-2 flex w-[90%] justify-start">
            <span
              v-if="error.code == 2"
              class="text-xs font-semibold text-red-400"
              >{{ error.message }}</span
            >
          </div>
        </div>
        <div class="flex w-[30%] flex-col pl-2 justify-center">
            <div class="flex pb-2 text-xs text-gray-500 font-bold">ETA</div>
            <div
              :class="['w-[60%] items-center justify-center rounded-md border-2 bg-white p-1 text-center', foliosController.eta > 30 ? 'border-red-400' : '']"
            >
              {{
                foliosController.eta
              }}
            </div>
          </div>
      </div>
    </div>
    <div class="flex h-full items-center">
      <button @click="guardarPaso2()" type="button">
        <ChevronRightIcon
          class="h-12 w-12 cursor-pointer rounded-full bg-primario p-1.5 text-white"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getDatabase, ref as refDB, child, update } from "@firebase/database";
import { LocationMarkerIcon } from "@heroicons/vue/outline";
import Horario from "@/components/Horario.vue";
import { ChevronRightIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { validacionCoordenadas } from "@/validaciones/coordenadas.js";
import { store } from "@/store";
import { useFolios } from "@/store/foliosController";
import { storeToRefs } from "pinia";
import moment from "moment";

const foliosController = useFolios();
const { coordenadas, error } = storeToRefs(foliosController);
const { paso2 } = foliosController;
const router = useRouter();
const db = getDatabase();
const route = useRoute();
const props = defineProps([
  "incidencia",
  "folio",
  "estado",
  "tipoFolio",
  "data",
  "pasoDB",
]);
const emit = defineEmits(["validarCoordenadasReturn", "setPaso"]);

const errores = ref({ coordenadas: "", fotoAntes: false, fotoDurante: false });
const fecha = ref();
const hora = ref();
const minuto = ref();
const rebotar = ref("");
const coordenada = ref();

onMounted(() => {
  // coordenadas.value = props.data.coordenadas.trim();
});

const validarCoordenadas = async () => {
  if (
    !/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
      coordenadas.value
    ) ||
    coordenadas.value == ""
  ) {
    if (!error.value.isError) {
      Object.assign(error.value, {
        code: 2,
        isError: true,
        message: "El formato es invalido o vacío",
      });
    }
  } else {
    if (error.value.code == 2) {
      Object.assign(error.value, {
        code: 0,
        isError: false,
        message: "",
      });
    }
  }
};

const vaciarErrores = () => {
  errores.value.coordenadas = "";
  store.commit("agregarErroresCoord");
};

const actualizarEstado = async (
  actualizacion_estatus,
  actualizacion_estado
) => {
  if (props.data.paso == props.pasoDB) {
    await update(child(refDB(db), `folios/correctivos/${route.params.id}`), {
      paso: 3,
      estatus: "En proceso",
      estatusId: 4,
    }).then(() => {
      router.go(0);
    });
  } else {
    emit("setPaso", 3);
  }
  return false;
};

const guardarPaso2 = async () => {
  validarCoordenadas();
  if (!error.value.isError && coordenadas.value != "") {
    await paso2();
  } else {
    validarCoordenadas();
    alert("Existen errores");
  }
};
</script>
