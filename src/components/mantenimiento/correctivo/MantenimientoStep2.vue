<template>
  <div class="flex w-[100%]">
    <div
      class="mb-3 flex w-full flex-col items-start justify-start lg:w-[90%] lg:pl-2"
    >
      <Horario
        :state="props.estado"
        :incidencia="props.incidencia"
        :folio="props.folio"
        :tipoFolio="props.tipoFolio"
        :fechaInicioBD="props.data.horaLlegada"
        :horaInicioBD="props.data.horaLlegada"
        @validarFecha="validarFecha"
        @validarHora="validarHora"
        @validarMinuto="validarMinuto"
      ></Horario>
      <div
        v-if="error"
        class="mt-2 flex w-[100%] items-center justify-center py-1"
        :class="rebotar"
      >
        <span class="text-xs font-semibold text-red-400">{{
          "Campo(s) requerido(s). Selecciona una fecha y horario válido"
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
                  @blur="validarCoordenadas()"
                  @focus="vaciarErrores()"
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
              v-if="store.state.a.errores.coordenadas != ''"
              class="text-xs font-semibold text-red-400"
              >{{ store.state.a.errores.coordenadas }}</span
            >
          </div>
        </div>
        <div v-if="props.incidencia == 1" class="mt-5 mr-10 ml-10 flex w-[50%]">
          <div class="mr-5 flex h-auto w-full flex-col items-center">
            <span class="mb-2 font-semibold">Foto antes</span>
            <div
              :class="errores.fotoAntes ? 'border-2 border-red-400' : ''"
              class="flex h-36 w-full items-center justify-center rounded-xl bg-gray-100"
            >
              <label
                v-if="!fotos.antes.file"
                for="foto-antes"
                class="flex w-full cursor-pointer justify-around"
              >
                <div
                  @change="selectFileAntes"
                  class="flex w-[65%] justify-around rounded-md bg-gray-400 py-1 px-4 text-white"
                >
                  <input
                    ref="file1"
                    type="file"
                    accept=".png,.jpg,.heic"
                    class="file:border file:border-solid"
                    id="foto-antes"
                    hidden
                  />
                  <UploadIcon class="h-5 w-5 text-lg"></UploadIcon>
                  <span>Subir</span>
                </div>
              </label>
              <div v-else class="flex h-28 w-[80%] justify-around">
                <img :src="fotos.antes.file64" class="rounded-md" />
              </div>
            </div>
            <div
              v-if="fotos.antes.file"
              class="mt-2 flex w-full items-center rounded-md bg-gray-200 py-2"
            >
              <div
                class="ml-1 flex w-[100%] justify-between truncate px-2 text-sm"
                :title="fotos.antes.file.name"
              >
                {{ fotos.antes.file.name }}
                <TrashIcon
                  class="mr-1 h-5 w-5 cursor-pointer"
                  @click="eliminarImgAntes"
                ></TrashIcon>
              </div>
            </div>
          </div>
          <div class="ml-5 flex h-auto w-full flex-col items-center">
            <span class="mb-2 font-semibold">Foto durante</span>
            <div
              :class="errores.fotoDurante ? 'border-2 border-red-400' : ''"
              class="flex h-36 w-full items-center justify-center rounded-xl bg-gray-100"
            >
              <label
                v-if="!fotos.durante.file"
                for="foto-durante"
                class="flex w-full cursor-pointer justify-around"
              >
                <div
                  @change="selectFileDurante"
                  class="flex w-[65%] justify-around rounded-md bg-gray-400 py-1 px-4 text-white"
                >
                  <input
                    ref="file2"
                    type="file"
                    accept=".png,.jpg,.heic"
                    class="file:border file:border-solid"
                    id="foto-durante"
                    hidden
                  />
                  <UploadIcon class="h-5 w-5 text-lg"></UploadIcon>
                  <span>Subir</span>
                </div>
              </label>
              <div v-else class="flex h-28 w-[80%] justify-around">
                <img :src="fotos.durante.file64" class="rounded-md" />
              </div>
            </div>
            <div
              v-if="fotos.durante.file"
              class="mt-2 flex w-full items-center rounded-md bg-gray-200 py-2"
            >
              <div
                class="ml-1 flex w-[100%] justify-between truncate px-2 text-sm"
                :title="fotos.durante.file.name"
              >
                {{ fotos.durante.file.name }}
                <TrashIcon
                  class="mr-1 h-5 w-5 cursor-pointer"
                  @click="eliminarImgDurante"
                ></TrashIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex h-full items-center">
      <ChevronRightIcon
        @click="cambiarEstado()"
        class="h-12 w-12 cursor-pointer rounded-full bg-primario p-1.5 text-white"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import {
  getDatabase,
  ref as refDB,
  get,
  set,
  child,
  update,
} from "@firebase/database";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import {
  LocationMarkerIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/vue/outline";
import Horario from "@/views/Preventivo/Horario.vue";
import { ChevronRightIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { validacionCoordenadas } from "@/validaciones/coordenadas.js";
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
import { useStore } from "vuex";
import { store } from "@/store";
import moment from "moment";

const auth = getAuth();
const router = useRouter();
const db = getDatabase();
const route = useRoute();
const storeVuex = useStore();
const storage = getStorage();
const props = defineProps([
  "incidencia",
  "folio",
  "estado",
  "tipoFolio",
  "data",
  "pasoDB",
]);
const emit = defineEmits(["validarCoordenadasReturn", "setPaso"]);
// storeVuex.commit('cerrarModalCorrectivo');

const coordenadas = ref("");
const errores = ref({ coordenadas: "", fotoAntes: false, fotoDurante: false });
const fecha = ref();
const hora = ref();
const minuto = ref();
const error = ref(false);
const rebotar = ref("");
const validacionHorario = ref([false, false, false]);
const fechaData = ref("");
const coordenada = ref();
const fotos = ref({
  antes: {
    file: null,
    file64: null,
  },
  durante: {
    file: null,
    file64: null,
  },
});

onMounted(() => {
  coordenadas.value = props.data.coordenadas.trim();
});

watch(
  () => fotos.value.antes.file,
  () => {
    errores.value.fotoAntes = fotos.value.antes.file ? false : true;
  }
);

watch(
  () => fotos.value.durante.file,
  () => {
    errores.value.fotoDurante = fotos.value.durante.file ? false : true;
  }
);

const validarFecha = async (data) => {
  if (data) {
    fecha.value = true;
    fechaData.value = data[5];
    validacionHorario.value[0] = true;
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
    } else {
      // error.value = true;
    }
  }
};

const validarHora = async (data) => {
  if (data) {
    hora.value = true;
    validacionHorario.value[1] = true;
    // storeVuex.commit("cambiarEstadoJustificacion", 2);
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
    } else {
      // error.value = true;
    }
  }
};

const validarMinuto = async (data) => {
  if (data) {
    minuto.value = true;
    validacionHorario.value[2] = true;
    // storeVuex.commit("cambiarEstadoJustificacion", 3);
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
    } else {
      // error.value = true;
    }
  }
};

const validarCoordenadas = async () => {
  errores.value.coordenadas = await validacionCoordenadas(
    route.params.id,
    props.incidencia,
    props.tipoFolio,
    coordenadas.value
  );
  store.commit("agregarErroresCoord", errores.value.coordenadas);
  if (store.state.a.errores.coordenadas == "") {
    coordenada.value = true;
  }
};

const selectFileAntes = async (e) => {
  fotos.value.antes.file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(fotos.value.antes.file);
  reader.onload = (event) => {
    fotos.value.antes.file64 = reader.result;
  };
};
const selectFileDurante = async (e) => {
  fotos.value.durante.file = e.target.files[0];
  let reader = new FileReader();
  // fotos.value.durante.file64 = URL.createObjectURL(fotos.value.durante.file)
  reader.readAsDataURL(fotos.value.durante.file);
  reader.onload = (event) => {
    fotos.value.durante.file64 = reader.result;
  };
};
const eliminarImgAntes = () => {
  fotos.value.antes.file = null;
  fotos.value.antes.file64 = null;
};
const eliminarImgDurante = () => {
  fotos.value.durante.file = null;
  fotos.value.durante.file64 = null;
};

const vaciarErrores = () => {
  errores.value.coordenadas = "";
  store.commit("agregarErroresCoord");
};

const cambiarEstado = async () => {
  if (!coordenadas.value || errores.value.coordenadas) {
    alert("Por favor validar coordenadas.");
    return false;
  }
  if (
    coordenadas.value && coordenada.value && props.incidencia == 1
      ? fotos.value.antes.file && fotos.value.durante.file
      : true
  ) {
    await actualizarEstado();
    // error.value = await actualizarEstado(2, 3);
    // //Almacenamiento en base de datos del nombre de la imágen "Antes"
    // //Almacenamiento en storage de la imágen "Antes"

    // await uploadBytes(refStorage(storage, `imagenes/preventivos/antes/${props.tipoFolio}/${props.folio}`), fotos.value.antes.file)
    // .then(async (snapshot) => {
    //   await update(child(refDB(db), `folios/preventivos/${props.tipoFolio}/${props.folio}/fotos/antes`), {
    //     nombre: fotos.value.antes.file.name,
    //   });
    // });
    // //Almacenamiento en base de datos del nombre de la imágen "Durante"
    // //Almacenamiento en storage de la imágen "Durante"
    // await uploadBytes(refStorage(storage, `imagenes/preventivos/durante/${props.tipoFolio}/${props.folio}`), fotos.value.durante.file)
    // .then(async (snapshot) => {
    //   await update(child(refDB(db), `folios/preventivos/${props.tipoFolio}/${props.folio}/fotos/durante`), {
    //     nombre: fotos.value.durante.file.name,
    //   });
    // });
    // limpiarValores();
  } else {
    if (!fecha.value || !hora.value || !minuto.value) {
      error.value = true;
      if (!coordenada.value) {
        storeVuex.commit("agregarErroresCoord", "Campo requerido");
      }
      rebotar.value = "animate-[bounce_200ms_ease-in-out_infinite]";
      setTimeout(() => {
        rebotar.value = "";
      }, 300);
    }
    if (!coordenada.value) {
      storeVuex.commit("agregarErroresCoord", "Campo requerido");
    }
    if (!fotos.value.antes.file || !fotos.value.durante.file) {
      errores.value.fotoAntes = fotos.value.antes.file ? false : true;
      errores.value.fotoDurante = fotos.value.durante.file ? false : true;
    }
  }
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

const limpiarValores = () => {
  arrayActiveHora.forEach((value, index) => {
    arrayActiveHora[index] = "";
  });
  arrayActiveMinuto.forEach((value, index) => {
    arrayActiveMinuto[index] = "";
  });
  fecha.value = null;
  hora.value = null;
  minuto.value = null;
  coordenada.value = null;
  error.value = false;
  rebotar.value = "";
  validacionHorario.value = [false, false, false];
};
</script>
