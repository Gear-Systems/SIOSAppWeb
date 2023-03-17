<template>
  <div>
    <!-- Modal de Coordenadas -->
    <TransitionRoot
      appear
      :show="$store.state.a.modalCorrectivo"
      as="template"
      class="z-50"
    >
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-2xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="div"
                  class="mb-5 flex items-center text-lg font-medium leading-6 text-gray-900"
                >
                  <div class="flex w-[80%] text-2xl font-bold">
                    <h3>Folio Correctivo</h3>
                  </div>
                  <div class="flex w-[20%] justify-end">
                    <XCircleIcon
                      @click="closeModal"
                      class="h-6 w-6 cursor-pointer"
                    />
                  </div>
                </DialogTitle>
                <div class="flex w-[100%] flex-col items-center justify-center">
                  <div class="my-2 flex w-[100%] items-center justify-center">
                    <div
                      class="flex w-2/3 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Ingresar folio
                      <input
                        v-model="infoSelected.folio"
                        placeholder="000"
                        :class="[
                          'mt-1 h-10 w-[95%] rounded-lg border-2 border-[#E5E5E5] bg-white text-black',
                          errores.folio.error ? 'border-red-400' : '',
                          loading
                            ? 'animate-pulse bg-gray-100 text-gray-500'
                            : '',
                        ]"
                        type="text"
                        name="folio"
                        id="folio"
                      />
                      <Transition
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                        enter-active-class="transition duration-200 ease-in"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                      >
                        <span v-if="errores.folio.error" class="text-red-400">
                          {{ errores.folio.message }}
                        </span>
                      </Transition>
                    </div>
                    <div
                      class="flex w-1/3 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Tipo
                      <div class="flex w-[100%]">
                        <ListSelect
                          :dataArray="infoData.tipoFolios"
                          :label="'Tipo de folio'"
                          @inputValue="validarTipoFolio($event)"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-4 flex w-[100%] items-center justify-between">
                    <div
                      class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Distrito
                      <div class="flex w-[100%]">
                        <ListSelect
                          :dataArray="infoData.distritos"
                          :label="'Selecciona un distrito'"
                          @inputValue="infoSelected.distrito = $event"
                        />
                      </div>
                    </div>
                    <div
                      class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Cluster
                      <div class="flex w-[100%]">
                        <ListSelect
                          :dataArray="
                            infoSelected.distrito
                              ? infoSelected.distrito.clusters
                              : []
                          "
                          :label="'Selecciona un cluster'"
                          @inputValue="infoSelected.clusters = $event"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-4 flex w-[100%] items-center justify-between">
                    <div
                      class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Supervisor
                      <div class="flex w-[100%]">
                        <ListSelect
                          :dataArray="
                            infoSelected.distrito
                              ? infoSelected.distrito.supervisores
                              : []
                          "
                          :label="'Selecciona un supervisor'"
                          @inputValue="obtenerTecnicos($event)"
                        />
                      </div>
                    </div>
                    <div
                      class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Técnico
                      <div class="flex w-[100%]">
                        <ListSelect
                          :dataArray="infoData.tecnicos"
                          :label="'Selecciona un técnico'"
                          @inputValue="infoSelected.tecnicos = $event"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-4 flex w-[80%] items-center self-start">
                    <div
                      class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Ingresar OLT
                      <input
                        v-model="infoSelected.olt"
                        placeholder="000"
                        class="mt-1 h-10 w-[100%] rounded-lg border-2 border-[#E5E5E5] text-black"
                        type="text"
                        name="folio"
                        id="folio"
                      />
                      <Transition
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                        enter-active-class="transition duration-200 ease-in"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                      >
                        <span v-if="errores.olt != ''" class="text-red-400">
                          {{ errores.olt }}</span
                        >
                      </Transition>
                    </div>
                    <div
                      class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Falla
                      <div class="flex w-[100%]">
                        <ListSelect
                          :dataArray="infoData.fallas"
                          :label="'Selecciona una falla'"
                          @inputValue="infoSelected.falla = $event"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="mb-4 flex w-[100%] flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:self-start"
                  >
                    <div
                      class="flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4] lg:mr-1.5"
                    >
                      Causa
                      <div class="flex">
                        <ListSelect
                          :dataArray="infoData.causas"
                          :label="'Selecciona una causa'"
                          @inputValue="infoSelected.causa = $event"
                        />
                      </div>
                    </div>
                    <div
                      class="flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4] lg:ml-2"
                    >
                      Clientes afectados
                      <input
                        v-model="infoSelected.clientesAfectados"
                        class="mt-1 h-10 rounded-lg border-2 border-[#E5E5E5] text-black"
                        type="number"
                        name="folio"
                        id="folio"
                        min="0"
                        max="9999"
                      />
                    </div>
                    <div
                      class="flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4] lg:ml-2"
                    >
                      Turno
                      <ListSelect
                        :dataArray="infoData.turnos"
                        :label="'Selecciona un turno'"
                        @inputValue="infoSelected.turno = $event"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex justify-around">
                  <div class="flex w-1/2 justify-center">
                    <button
                      type="button"
                      class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                      @click="closeModal"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div class="flex w-1/2 justify-center">
                    <button
                      :disabled="buttonDisabled || loadingSubmit"
                      type="button"
                      :class="[
                        'flex min-w-[150px] justify-center rounded-md border border-transparent bg-primario px-4 py-2 text-sm   font-medium focus-visible:ring-blue-500',
                        buttonDisabled
                          ? 'cursor-not-allowed bg-gray-300'
                          : 'text-white hover:bg-primario/80',
                        loadingSubmit ? 'bg-primario/80' : '',
                      ]"
                      @click="submitCorrectivo()"
                    >
                      <svg
                        v-if="loadingSubmit"
                        aria-hidden="true"
                        class="duration-900 h-6 w-7 animate-spin fill-secundario text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <div v-else>Siguiente</div>
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { XCircleIcon } from "@heroicons/vue/outline";
import { ref as refDB, get, set, child } from "@firebase/database";
import { httpsCallable } from "firebase/functions";
import { db, functions, auth } from "@/firebase/firebase";
import ListSelect from "@/components/ListSelect.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/vue";
import { useFolios } from "@/store/folios";
import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";

const router = useRouter();
const folios = useFolios();
const crearFolio = httpsCallable(functions, "crearFolioCorrectivo");
const store = useStore();
const catalogoRef = refDB(db, "catalogo");
const loading = ref(false);
const loadingSubmit = ref(false);
const buttonDisabled = ref(true);
const emit = defineEmits(["abrirModalManejoFolio"]);

const errores = reactive({
  folio: { message: "", error: false },
  tipoFolio: { message: "", error: false },
  distrito: { message: "", error: false },
  cluster: { message: "", error: false },
  supervisor: { message: "", error: false },
  tecnico: { message: "", error: false },
  falla: { message: "", error: false },
  causa: { message: "", error: false },
  clientesAfectados: { message: "", error: false },
});

const oldValues = reactive({
  folio: "",
  tipoFolio: "",
});

const infoData = reactive({
  tipoFolios: [],
  distritos: [],
  fallas: [],
  causas: [],
  tecnicos: [],
  turnos: ["Día", "Noche"],
});

const infoSelected = reactive({
  folio: "",
  tipoFolio: "",
  distrito: "",
  falla: "",
  causa: "",
  clusters: "",
  supervisores: "",
  tecnicos: "",
  olt: "",
  clientesAfectados: 0,
  turno: "",
  despacho: "",
});

const fetchData = async () => {
  get(catalogoRef).then((snapshot) => {
    snapshot.forEach((element) => {
      // tipo de folios
      if (element.key === "tipoFolios") {
        for (let data in element.val().correctivo) {
          infoData.tipoFolios.push({
            name: data,
            ...element.val().correctivo[data],
          });
        }
      }
      // distritos
      if (element.key === "distritos") {
        for (let data in element.val()) {
          infoData.distritos.push({ name: data, ...element.val()[data] });
        }
      }
      // fallas
      if (element.key === "fallas") {
        for (let data in element.val()) {
          infoData.fallas.push({ name: data, ...element.val()[data] });
        }
      }
      //Causas
      if (element.key === "causas") {
        for (let data in element.val()) {
          infoData.causas.push({ name: data, ...element.val()[data] });
        }
      }
      //Closter
    });
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    infoSelected.despacho = user.uid;
  }
});

await fetchData();

const obtenerTecnicos = async (event) => {
  infoSelected.supervisores = event;
  infoSelected.tecnicos = [];
  infoData.tecnicos = [];
  console.log("Tecnicos", event);
  console.log("distritos", infoSelected.distrito);
  await get(refDB(db, `catalogo/supervisores/${event.uid}`)).then(
    (snapshot) => {
      snapshot.forEach((element) => {
        if (element.key === "tecnicos") {
          for (let data in element.val()) {
            infoData.tecnicos.push({
              name: element.val()[data].nombre,
              uid: data,
            });
          }
        }
      });
    }
  );
};

function closeModal() {
  store.commit("cerrarModalCorrectivo");
}

const validarTipoFolio = async (event) => {
  infoSelected.tipoFolio = event;
};

// Validar existencia del folio en la base de datos.
const validarExistencia = async (value) => {
  loading.value = true;
  if (infoSelected.folio.length < 4) {
    Object.assign(errores.folio, {
      message: "El folio no puede ser menor a 4 digitos",
      error: true,
    });
    loading.value = false;
    return false;
  }

  if (infoSelected.folio && infoSelected.tipoFolio) {
    let result = await folios.validarExistencia(
      infoSelected.folio,
      infoSelected.tipoFolio.name
    );
    if (result) {
      Object.assign(errores.folio, {
        message: "El folio ya existe",
        error: true,
      });
      loading.value = false;
      return false;
    }
  }
  loading.value = false;
  return Object.assign(errores.folio, {
    message: "",
    error: false,
  });
};

watch(infoSelected, async () => {
  if (
    oldValues.folio != infoSelected.folio ||
    oldValues.tipoFolio != infoSelected.tipoFolio
  ) {
    await validarExistencia();
    oldValues.folio = infoSelected.folio;
    oldValues.tipoFolio = infoSelected.tipoFolio;
  }

  if (
    infoSelected.folio &&
    !errores.folio.error &&
    infoSelected.clusters &&
    infoSelected.supervisores &&
    infoSelected.distrito &&
    infoSelected.tipoFolio &&
    infoSelected.tecnicos &&
    infoSelected.falla &&
    infoSelected.causa &&
    infoSelected.clientesAfectados > -1
  ) {
    buttonDisabled.value = false;
  } else {
    buttonDisabled.value = true;
  }
});

const submitCorrectivo = async () => {
  loadingSubmit.value = true;
  if (!infoSelected.folio || errores.folio.error) {
    return;
  }
  if (infoSelected.clientesAfectados == "") {
    infoSelected.clientesAfectados = 0;
  }
  
  await crearFolio(infoSelected)
    .then((result) => {
      loading.value = false;
      store.commit("cerrarModalCorrectivo");
      router.push({ name: "capturarCorrectivo", params: { id: result.data } });
    })
    .catch((error) => {
      loading.value = false;
    });
};
</script>
