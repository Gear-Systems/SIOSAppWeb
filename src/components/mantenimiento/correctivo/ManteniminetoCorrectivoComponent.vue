<template>
  <div class="flex w-full pb-4">
    <Suspense>
      <template #default>
        <div
          class="relative mt-6 flex h-full w-[100%] flex-col items-center px-6 lg:px-10"
        >
          <div class="mb-7 w-full">
            <div
              v-if="$route.query.mantenimiento"
              @click="$router.push({ name: 'consultarFolios' })"
              class="flex cursor-pointer items-center space-x-2"
            >
              <ChevronLeftIcon class="h-5 w-5" />
              <p>Consulta de folios</p>
            </div>
          </div>
          <div class="flex h-[70%] w-full flex-col lg:flex-row">
            <div class="flex flex-col space-y-3 lg:w-[20%]">
              <div class="flex w-[100%] select-none items-center">
                <div class="lg:ww-[60%] flex">
                  <h1 class="select-none font-semibold">Folio Correctivo</h1>
                </div>
                <div class="flex lg:w-[40%]">
                  <div class="flex">
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          <CogIcon class="h-5 w-5 cursor-pointer text-black" />
                        </MenuButton>
                      </div>
                      <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                      >
                        <MenuItems
                          class="absolute left-0 z-50 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                              <button
                                @click="openEdicion()"
                                class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-100"
                              >
                                <PencilAltIcon
                                  class="mr-2 h-5 w-5 text-black"
                                  aria-hidden="true"
                                />
                                Editar folio
                              </button>
                            </MenuItem>
                            <MenuItem
                              v-slot="{ active }"
                              v-if="infoData2.paso == 2 && !infoData2.asignado"
                            >
                              <button
                                @click="openManejoFolio()"
                                class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-100"
                              >
                                <ClipboardCheckIcon
                                  class="mr-2 h-5 w-5 text-black"
                                  aria-hidden="true"
                                />
                                Asignar folio a técnico
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                </div>
              </div>
              <div class="flex flex-col max-w-[250px] space-y-4">
                <div class="flex w-[90%] select-none">
                  Tipo:
                  <span class="pl-5 font-semibold">{{
                    infoData2.tipoFolio
                  }}</span>
                </div>
                <!-- Número de folio -->
                <div class="flex w-[50%] flex-col lg:w-[90%]">
                  <span class="text-sm text-gray-500">Número de folio:</span>
                  <div
                    class="mt-2 flex w-[100%] items-center justify-center rounded-lg border py-2 tracking-wider"
                  >
                    {{ infoData2.folio }}
                  </div>
                </div>
                <Notas
                  v-if="
                    infoData2.paso >= 2 && infoData2.paso <= 3 && !loadingData
                  "
                  :folio="$route.params.id"
                  :incidencia="2"
                  :tipoFolio="infoData2.tipoFolio"
                  :notasData="infoData2.notas"
                ></Notas>
              </div>
            </div>
            <div class="flex max-h-[95%] w-full lg:w-[80%] lg:px-0">
              <MantenimientoStep1
                v-if="infoData2.paso == 1 && !loadingData"
                :incidencia="2"
                :folio="$route.params.id"
                :pasoDB="pasoDB"
                :estado="infoData2.paso"
                :tipoFolio="infoData2.tipo"
                :data="infoData2"
                @capturarFolio="capturarFolio"
                @setPaso="setPasoFunction"
              />
              <MantenimientoStep2
                v-if="infoData2.paso == 2 && !loadingData"
                :incidencia="2"
                :pasoDB="pasoDB"
                :folio="infoData.folio"
                :estado="infoData2.paso"
                :tipoFolio="infoData.tipo"
                :data="infoData2"
                @setPaso="setPasoFunction"
              />
              <MantenimientoStep3
                v-if="infoData2.paso == 3 && !loadingData"
                :incidencia="2"
                :folio="infoData.folio"
                :estado="infoData2.paso"
                :tipoFolio="infoData.tipo"
                :data="infoData2"
              />
            </div>
          </div>

          <MantenimientoTimeline
            :state="infoData2.paso"
            :pasoDB="pasoDB"
            @setPaso="setPasoFunction"
          />

          <Suspense>
            <ModalManejoFolio
              :botonCapturar="infoData2.paso === 2 ? false : true"
              :permitirCierre="true"
              @asignarFolio="asignarFolio"
              @capturarFolio="capturarFolio"
            >
              <template v-slot:mensaje>
                <span v-html="mensajeAsignacion"></span>
              </template>
            </ModalManejoFolio>
          </Suspense>
          <Suspense>
            <ModalEdicionFolio
              :folio="infoData2.folio"
              :incidencia="'correctivo'"
              :infoData="infoData2"
              :folioKey="$route.params.id"
              @actualizarFolio="actualizarFolio"
            ></ModalEdicionFolio>
          </Suspense>
        </div>
      </template>
      <template #fallback>
        <span>Cargando...</span>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import MantenimientoTimeline from "@/components/mantenimiento/MantenimientoTimeLine.vue";
import ModalEdicionFolio from "@/views/Correctivo/ModalEdicionFolio.vue";
import ModalManejoFolio from "@/views/Correctivo/ModalManejoFolio.vue";
import { useStore } from "vuex";
import {
  getDatabase,
  ref as refDB,
  update,
  child,
  runTransaction,
  onChildChanged,
  get,
  off,
} from "@firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";
import { infoCapturadaModal } from "@/consultasBD/consultaSelectFolio.js";
import { eliminarCapturaStep2 } from "@/consultasBD/eliminarHorarios.js";
import { PencilAltIcon } from "@heroicons/vue/solid";
import {
  CogIcon,
  ClipboardCheckIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import Notas from "@/views/Notas.vue";
import MantenimientoStep1 from "@/components/mantenimiento/correctivo/MantenimientoStep1.vue";
import MantenimientoStep2 from "@/components/mantenimiento/correctivo/MantenimientoStep2.vue";
import MantenimientoStep3 from "@/components/mantenimiento/correctivo/MantenimientoStep3.vue";
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
import { db, auth } from "@/firebase/firebase";
import {
  actualizarFolioBD,
  eliminarFolioPrevio,
} from "@/consultasBD/guardarFolio.js";
import { store } from "@/store";

const infoData2 = reactive({
  folio: "",
  tipoFolio: "",
  distrito: "",
  estatus: "",
  causa: "",
  clientesAfectados: 0,
  cluster: "",
  falla: "",
  olt: "",
  supervisor: "",
  tecnico: "",
  asignado: false,
  horaInicio: 0,
  horaLlegada: 0,
  horaActivacion: 0,
  notas: {},
  paso: 1,
  coordenadas: "",
});
const router = useRouter();
const route = useRoute();
const functions = getFunctions();
const storeVuex = useStore();
const loadingData = ref(true);
const pasoDB = ref();

const infoData = ref({
  folio: route.params.id,
  tipo: route.params.tipoFolio,
  estado: 1,
});

const fetchData = async () => {
  await get(refDB(db, `folios/correctivos/${route.params.id}`)).then(
    (snapshot) => {
      Object.assign(infoData2, snapshot.val());
      pasoDB.value = snapshot.val().paso;
      loadingData.value = false;
    }
  );
};

await fetchData();

// Función que se encarga de escuchar el nodo del folio creado previamente
const escucharFolio = () => {
  onChildChanged(
    refDB(
      db,
      `folios/correctivos/${infoData.value.tipo}/${infoData.value.folio}`
    ),
    (snapshot) => {
      infoData.value[snapshot.key] = snapshot.val();
    }
  );
};

const inicializarFolioEscucha = async () => {
  await get(
    child(
      refDB(db),
      `folios/correctivos` + `/${route.params.tipoFolio}/${route.params.id}`
    )
  ).then((snapshot) => {
    snapshot.forEach((dato) => {
      infoData.value[dato.key] = dato.exportVal();
    });
    escucharFolio();
  });
};

inicializarFolioEscucha();
const asignarFolioCorrectivo = httpsCallable(
  functions,
  "asignarFolioCorrectivo"
);

onMounted(() => {
  infoData.value.folio =
    infoData.value.folio == undefined ? infoData2.folio : infoData.value.folio;
  infoData.value.tipo =
    infoData.value.tipo == undefined
      ? route.params.tipoFolio
      : infoData.value.tipo;
});

const id_tecnico = ref(route.params.tecnico);

const mensajeAsignacion = computed(() => {
  return infoData.value.estado === 2
    ? "Esta acción <b>eliminará la hora de llegada</b> en caso de haberla capturado previamente."
    : "";
});

const logout = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
const openEdicion = () => {
  storeVuex.commit("abrirModalEdicion");
};
const openManejoFolio = () => {
  storeVuex.commit("abrirModalManejoFolio");
};
const actualizarFolio = async (data) => {
  let llave = infoData.value.folio;
  let tipoFolio = infoData.value.tipo;

  if (data[0].folio != llave || data[0].tipoFolio != tipoFolio) {
    off(
      refDB(db, `folios/correctivos/${tipoFolio}/${llave}`),
      "child_changed",
      (snapshot) => {}
    );

    infoData.value.folio = data[0].folio;
    infoData.value.tipo = data[0].tipoFolio;

    await actualizarFolioBD(data[0], 2, llave, tipoFolio);

    if (llave != infoData.value.folio) {
      await eliminarFolioPrevio(llave, 2, tipoFolio);
    }
    escucharFolio();
  } else {
    await actualizarFolioBD(data[0], 2, llave, tipoFolio);
  }
};

const setPasoFunction = (e) => {
  if (e > pasoDB.value) {
    return null;
  }
  infoData2.paso = e;
};

// Función para asignar folio al técnico
const asignarFolio = async () => {
  await asignarFolioCorrectivo({
    key: route.params.id,
    tecnicoUid: infoData2.tecnico,
  })
    .then(async (result) => {
      store.commit("cerrarModalManejoFolio");
      router.push("/capturar-folio");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

// Función para capturar el folio por despacho
const capturarFolio = async () => {
  await update(refDB(db, `folios/correctivos/${route.params.id}`), {
    paso: 2,
  }).then(() => {
    store.commit("cerrarModalManejoFolio");
    router.go(0);
  });
};

const limpiarArreglosHorario = () => {
  arrayActiveHora.forEach((value, index) => {
    arrayActiveHora[index] = "";
  });
  arrayActiveMinuto.forEach((value, index) => {
    arrayActiveMinuto[index] = "";
  });
};
</script>
