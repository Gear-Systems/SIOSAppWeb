<template>
  <div class="mt-5 flex h-full w-full flex-col">
    <!-- Seleccionar distrito -->
    <div class="flex flex-col space-y-6">
      <div>
        <h1 class="text-xl font-semibold">Relación de Distritos</h1>
        <p class="text-sm">Elige un distrito para relacionar y editar</p>
      </div>
      <div class="w-[30%]">
        <Listbox v-model="selectedDistrito">
          <div class="relative">
            <ListboxLabel class="text-sm text-gray-500"
              >Catálogo de Distritos</ListboxLabel
            >
            <ListboxButton
              class="shadow- relative w-full max-w-sm cursor-pointer rounded-md border-[1.5px] border-[#7C8495] py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ selectedDistrito }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <SelectorIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-30 mt-1 max-h-60 w-full max-w-sm rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="item in data"
                  :key="item"
                  :value="item"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'text-gray-900',
                      'relative w-full cursor-default select-none py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block w-full truncate',
                      ]"
                      >{{ item }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="font-semibold">Tabla de relaciones</div>
      <div class="flex flex-col space-y-2 lg:space-y-0 items-center lg:flex-row lg:space-x-12">
        <!-- table relacion -->
        <div class="flex lg:w-[50%] space-x-4">
          <draggable
            class="border-[#E5E6EA]bg-transparent flex max-h-[300px] min-h-[350px] min-w-[200px] lg:min-w-[250px] select-none flex-col overflow-auto rounded-xl border"
            :list="clustersRelacionados"
            group="clusters"
            @change="agregarClusters"
            draggable="false"
            item-key="distrito1"
            :sort="false"
          >
            <template #item="{ element, index }">
              <div class="mt-4 flex h-fit w-full space-x-4 px-4">
                <div
                  class="flex w-full space-x-4 rounded-md bg-[#90B3F2] px-4 py-2 text-white"
                >
                  <div class="flex h-full items-center justify-center">
                    <button
                      @click="eliminarClusters(element, index)"
                      type="button"
                    >
                      <BoteBasuraIco
                        class="h-5 w-5"
                        aria-hidden="true"
                        :colors="'#FFFFFF'"
                      />
                    </button>
                  </div>
                  <div
                    class="w-full max-w-full items-center truncate"
                    :title="element"
                  >
                    {{ element }}
                  </div>
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center rounded-t-xl bg-[#E5E6EA] py-2"
              >
                <h3 class="text-lg font-semibold">Clusters</h3>
              </div>
            </template>
          </draggable>

          <draggable
            class="border-[#E5E6EA]bg-transparent flex max-h-[300px] min-h-[350px] min-w-[200px] lg:min-w-[250px] max-w-[250px] select-none flex-col overflow-auto rounded-xl border"
            :list="supervisoresRelacionados"
            group="supervisores"
            @change="agregarSupervisores"
            draggable="false"
            item-key="supervisores1"
            :sort="false"
          >
            <template #item="{ element, index }">
              <div class="mt-4 flex h-fit w-full space-x-4 px-4">
                <div
                  :class="[
                    'flex w-full space-x-4 rounded-md  px-4 py-2 text-white',
                    element.tipo === 'supervisor ios'
                      ? 'bg-[#90B3F2]'
                      : 'bg-[#184C78]',
                  ]"
                >
                  <div class="flex h-full w-fit items-center justify-center">
                    <button
                      @click="eliminarSupervisores(element, index)"
                      type="button"
                    >
                      <BoteBasuraIco
                        class="h-5 w-5"
                        aria-hidden="true"
                        :colors="'#FFFFFF'"
                      />
                    </button>
                  </div>
                  <div
                    class="w-full max-w-full items-center truncate"
                    :title="element.name"
                  >
                    {{ element.name ? element.name : element.key }}
                  </div>
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center rounded-t-xl bg-[#E5E6EA] py-2"
              >
                <h3 class="text-lg font-semibold">Supervisor/es</h3>
              </div>
            </template>
          </draggable>
        </div>
        <!-- Tabla de datos no relacionados -->
        <div class="flex space-x-4">
          <draggable
            class="border-[#E5E6EA]bg-transparent flex max-h-[300px] min-h-[350px] min-w-[200px] lg:min-w-[250px] select-none flex-col overflow-auto rounded-xl border"
            :list="clustersData"
            group="clusters"
            @change="log"
            item-key="distrito1"
            :sort="false"
          >
            <template #item="{ element }">
              <div class="mt-2 flex h-fit w-full space-x-2 px-4">
                <div
                  class="w-full items-center truncate rounded-md bg-[#E5E6EA] px-4 py-2"
                  :title="element"
                >
                  {{ element }}
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center rounded-t-xl py-2"
              >
                <h3 class="text-lg font-semibold">Clusters</h3>
              </div>
            </template>
          </draggable>
          <draggable
            class="border-[#E5E6EA]bg-transparent flex max-h-[300px] min-h-[350px] min-w-[200px] lg:min-w-[250px] select-none flex-col rounded-xl border"
            :list="supervisoresData"
            group="supervisores"
            @change="log"
            item-key="supervisores"
            :sort="false"
          >
            <template #item="{ element }">
              <div class="mt-2 flex h-fit w-full space-x-2 px-4">
                <div
                  class="w-full items-center truncate rounded-md bg-[#E5E6EA] px-4 py-2"
                  :title="element.name"
                >
                  {{ element.name ? element.name : element.key }}
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center space-x-4 rounded-t-xl py-2"
              >
                <h3 class="text-lg font-semibold">Supervisor/es</h3>
                <!-- Filtro supervisores -->
                <Listbox v-model="selectedSupervisor">
                  <div class="relative">
                    <ListboxButton
                      class="shadow- relative w-full max-w-sm cursor-pointer p-0.5"
                    >
                      <div class="-top-3.5">
                        <FiltroIco class="h-5 w-5" aria-hidden="true" />
                      </div>
                    </ListboxButton>

                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute right-0 z-30 mt-1 max-h-60 max-w-sm rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          v-slot="{ active, selected }"
                          v-for="item in filtroSupervisor"
                          :key="item"
                          :value="item"
                          as="template"
                        >
                          <li
                            :class="[
                              active ? 'bg-gray-100' : 'text-gray-900',
                              'relative w-full cursor-default select-none py-2 pl-10 pr-4',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block w-full truncate',
                              ]"
                              >{{ item }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
} from "@headlessui/vue";
import {
  getDatabase,
  ref as refDB,
  get,
  update,
  set,
  remove,
} from "firebase/database";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { XCircleIcon } from "@heroicons/vue/outline";
import Draggable from "vuedraggable";
import cluster from "cluster";
import BoteBasuraIco from "./iconos/BoteBasuraIco.vue";
import FiltroIco from "./iconos/FiltroIco.vue";

const data = ref([]);
const filtroSupervisor = ["Supervisor IOS", "Supervisor TTP"];
const db = getDatabase();

const clustersRelacionados = ref([]);
const supervisoresRelacionados = ref([]);

const clustersData = ref([]);
const supervisorIOSData = ref([]);
const supervisoresTTPData = ref([]);
const controlOnStart = ref(true);
const idGlobal = ref(8);
// Obtener distritos desde base de datos
await get(refDB(db, `catalogo/distritos`)).then((snapshot) => {
  snapshot.forEach((element) => {
    data.value.push(element.key);
  });
});

const selectedDistrito = ref(data.value[0]);
const selectedSupervisor = ref(filtroSupervisor[0]);

const loadData = async () => {
  clustersRelacionados.value = [];
  supervisoresRelacionados.value = [];
  clustersData.value = [];
  supervisorIOSData.value = [];

  // Obtener clusters ya relacionados
  await get(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/clusters`)
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      console.log(element);
      clustersRelacionados.value.push(element.val());
    });
  });

  // Obtener supervisores ya relacionados
  await get(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/supervisores`)
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      supervisoresRelacionados.value.push({
        key: element.key,
        name: element.val().nombre,
        tipo: "supervisor ios",
      });
    });
  });

  // Obtener supervisores ya relacionados
  await get(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/supervisores ttp`)
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      supervisoresRelacionados.value.push({
        key: element.key,
        name: element.val().nombre,
        tipo: "supervisor ttp",
      });
    });
  });

  // Obtener clusters desde base de datos
  await get(refDB(db, `catalogo/clusters`)).then((snapshot) => {
    let exist = false;
    snapshot.forEach((element) => {
      console.log(element.key);
      exist =
        clustersRelacionados.value.findIndex(
          (value) => value === element.key
        ) != -1
          ? true
          : false;
      if (!exist) {
        clustersData.value.push(element.key);
      }
    });
  });

  //Obtener supervisores desde base de datos
  await get(refDB(db, `catalogo/supervisores`)).then((snapshot) => {
    let exist = false;
    snapshot.forEach((element) => {
      exist =
        supervisoresRelacionados.value.findIndex(
          (value) => value.key === element.key
        ) != -1
          ? true
          : false;
      if (!exist) {
        supervisorIOSData.value.push({
          key: element.key,
          name: element.val().nombre,
          tipo: "supervisor ios",
        });
      }
    });
  });

  //Obtener supervisores ttp desde base de datos
  await get(refDB(db, `catalogo/supervisorTTP`)).then((snapshot) => {
    supervisoresTTPData.value = [];
    let exist = false;
    snapshot.forEach((element) => {
      exist =
        supervisoresRelacionados.value.findIndex(
          (value) => value.key === element.key
        ) != -1
          ? true
          : false;
      if (!exist) {
        supervisoresTTPData.value.push({
          key: element.key,
          name: element.val().nombre,
          tipo: "supervisor ttp",
        });
      }
    });
  });
};

watch(selectedDistrito, async () => {
  await loadData();
});

await loadData();

const log = (evt) => {
  console.log(evt);
};

const eliminarClusters = (element, item) => {
  clustersRelacionados.value.splice(item, 1);
  clustersData.value.push(element);
  set(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/clusters`),
    clustersRelacionados.value
  );
};

const eliminarSupervisores = (element, item) => {
  if (element.tipo === "supervisor ios") {
    remove(
      refDB(
        db,
        `catalogo/distritos/${selectedDistrito.value}/supervisores/${element.key}`
      )
    ).then(async (snapshot) => {
      await get(refDB(db, `catalogo/supervisores/${element.key}`)).then(
        async (snapshotSupervisor) => {
          let arraySupervisor = snapshotSupervisor.val().distritos.filter((element) => {
            if(element != selectedDistrito.value) return element
          });
          
          await update(refDB(db, `catalogo/supervisores/${element.key}`), {
            distritos: arraySupervisor,
          });
          console.log(arraySupervisor);
          // console.log("indice", index);
        }
      );
      supervisoresRelacionados.value.splice(item, 1);
      supervisorIOSData.value.push(element);
      if (selectedSupervisor.value === "Superviosr IOS") {
        supervisoresData.value.push(element);
      }
    });
  } else {
    remove(
      refDB(
        db,
        `catalogo/distritos/${selectedDistrito.value}/supervisores ttp/${element.key}`
      )
    ).then((snapshot) => {
      supervisoresRelacionados.value.splice(item, 1);
      supervisoresTTPData.value.push(element);
      if (selectedSupervisor.value === "Superviosr TTP") {
        supervisoresData.value.push(element);
      }
    });
  }
};

const agregarSupervisores = (evt) => {
  console.log(evt.added.element);
  if (evt.added.element.tipo === "supervisor ios") {
    update(
      refDB(
        db,
        `catalogo/distritos/${selectedDistrito.value}/supervisores/${evt.added.element.key}`
      ),
      {
        nombre: evt.added.element.name,
        uid: evt.added.element.key,
      }
    ).then(async () => {
      await get(
        refDB(db, `catalogo/supervisores/${evt.added.element.key}`)
      ).then((snapshot) => {
        let arrayDistritos = [];
        if (snapshot.hasChild("distritos")) {
          arrayDistritos = snapshot.val().distritos;
        }
        arrayDistritos.push(selectedDistrito.value);
        update(refDB(db, `catalogo/supervisores/${evt.added.element.key}`), {
          distritos: arrayDistritos,
        });
      });
    });
  } else {
    update(
      refDB(
        db,
        `catalogo/distritos/${selectedDistrito.value}/supervisores ttp/${evt.added.element.key}`
      ),
      {
        creado: new Date().getTime(),
      }
    );
  }
};

const agregarClusters = (evt) => {
  set(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/clusters`),
    clustersRelacionados.value
  );
};

const supervisoresData = computed(() => {
  return selectedSupervisor.value === "Supervisor IOS"
    ? supervisorIOSData.value
    : supervisoresTTPData.value;
});
</script>
