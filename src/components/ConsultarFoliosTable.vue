<template>
  <div class="flex h-full w-full flex-col">
    <!-- Filtro -->
    <div class="mt-9 flex pl-20">
      <form @submit.prevent="buscar">
        <div class="flex items-end justify-center space-x-8">
          <div>
            <label
              for="folio"
              class="mb-1 block text-xs font-medium text-[#7C8495] dark:text-gray-300"
              >Folio</label
            >
            <input
              v-model="filtro.folio"
              type="text"
              id="folio"
              class="block w-full rounded-lg border border-[#7C8495] bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-[#101010] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Ingresar folio"
            />
          </div>
          <!-- <div>
          <label
            for="tipo"
            class="mb-1 block text-xs font-medium text-[#7C8495] dark:text-gray-300"
            >Tipo</label
          >
          <select
            id="tipo"
            class="block w-full min-w-[80px] rounded-lg border border-[#7C8495] bg-gray-50 p-2.5 text-sm text-[#101010] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          >
            <option selected>OT</option>
          </select>
        </div> -->
          <div>
            <button
              @click="buscar"
              type="submit"
              class="w-full rounded-lg bg-primario px-8 py-3 text-center text-sm font-medium text-white hover:bg-primario/80 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              Buscar
            </button>
          </div>
          <div
            @click="reiniciarFiltro"
            class="flex cursor-pointer items-center justify-center"
          >
            <RefreshIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <!-- Filtro estatus -->
        <div></div>
      </form>
    </div>
    <div class="relative mt-8 px-8 shadow-md">
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-[#F2F2F2] text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-2"></th>
            <th scope="col" class="py-3 px-2"></th>
            <th scope="col" class="py-3 px-6">Folio</th>
            <th scope="col" class="py-3 px-6">Tipo</th>
            <th scope="col" class="py-3 px-6">Ubicación</th>
            <th scope="col" class="py-3 px-6">Detalle</th>
            <th scope="col" class="py-3 px-6">ETA</th>
            <th scope="col" class="py-3 px-6">SLA</th>
            <th scope="col" class="py-3 px-6">Estatus</th>
            <th scope="col" class="py-3 px-6">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filterData"
            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <td class="px-2"><TableMenu :data="item" /></td>
            <th
              scope="row"
              :class="[
                'rounded-l-xl dark:text-white',
                colorsBG(item.estatusId),
              ]"
            ></th>
            <td class="py-1 px-6 font-semibold">{{ item.folio }}</td>
            <td class="py-1 px-6">{{ item.tipoFolio }}</td>
            <td class="py-1 px-6">
              <div class="font-semibold">{{ item.distrito }}</div>
              <div>{{ item.cluster }}</div>
            </td>
            <td class="py-1 px-6">
              <div v-if="item.horaInicio != undefined ? true : false">
                <div>
                  {{
                    `${new Date(item.horaInicio).getDate()}/${new Date(
                      item.horaInicio
                    ).getMonth()}/${new Date(item.horaInicio).getFullYear()}`
                  }}
                </div>
                <div>
                  {{
                    `${new Date(item.horaInicio).getHours()}:${new Date(
                      item.horaInicio
                    ).getMinutes()}`
                  }}
                </div>
              </div>
            </td>
            <td class="py-1 px-6">{{ item.eta }}</td>
            <td class="py-1 px-6">{{ item.sla }}</td>
            <td
              :class="['py-1 px-6 font-semibold', colorsText(item.estatusId)]"
            >
              {{ item.estatus }}
            </td>
            <td class="flex flex-row space-x-4 py-1 px-6 text-right">
              <div
                class="flex cursor-pointer items-center justify-center rounded-full py-5 px-6 hover:bg-[#E9F0FC]"
              >
                <img src="img/enviar_ico.svg" />
              </div>
              <div
                class="flex cursor-pointer items-center justify-center rounded-full py-5 px-5 hover:bg-[#E9F0FC]"
              >
                <img src="img/copiar_ico.svg" />
              </div>
              <div
                @click="
                  $router.push({
                    path: `/mantenimiento/${item.incidencia}/${item.folioKey}`,
                    query: { mantenimiento: true }
                  })
                "
                class="flex cursor-pointer items-center justify-center rounded-full py-5 px-6 hover:bg-[#E9F0FC]"
              >
                <img src="img/actualizar_ico.svg" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import {
  getDatabase,
  ref as refDB,
  get,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
  child,
} from "firebase/database";
import { RefreshIcon } from "@heroicons/vue/outline";
import TableMenu from "./TableMenu.vue";

const db = getDatabase();
const refFolios = refDB(db, "folios");
const filtro = reactive({
  folio: "",
});
const data = ref([]);
const filterData = ref([]);

onChildAdded(child(refDB(db), "folios/correctivos"), (snapshot) => {
  let color = "";
  console.log(snapshot.val());
  // console.log(snapshot.key)
  data.value.push({
    incidencia: "correctivo",
    folioKey: snapshot.key,
    ...snapshot.val(),
  });
});

onChildAdded(child(refDB(db), "folios/preventivos"), (snapshot) => {
  let color = "";
  console.log(snapshot.val());
  // console.log(snapshot.key)
  data.value.push({
    incidencia: "preventivo",
    folioKey: snapshot.key,
    ...snapshot.val(),
  });
});

onMounted(() => {
  filterData.value = data.value;
});

const colorsBG = (estatus) => {
  let color = "";
  switch (estatus) {
    case 1:
      color = "bg-capturado";
      break;
    case 2:
      color = "bg-asignados";
      break;
    case 3:
      color = "bg-en-camino";
      break;
    case 4:
      color = "bg-en-proceso";
      break;
    case 5:
      color = "bg-cerrados";
      break;
    case 6:
      color = "bg-finalizados";
      break;
    case 7:
      color = "bg-pausados";
      break;
    case 8:
      color = "bg-programados";
      break;
    default:
      color = "bg-default";
      break;
  }
  return color;
};

const colorsText = (estatus) => {
  let color = "";
  switch (estatus) {
    case 1:
      color = "text-capturado";
      break;
    case 2:
      color = "text-asignados";
      break;
    case 3:
      color = "text-en-camino";
      break;
    case 4:
      color = "text-en-proceso";
      break;
    case 5:
      color = "text-cerrados";
      break;
    case 6:
      color = "text-finalizados";
      break;
    case 7:
      color = "text-pausados";
      break;
    case 8:
      color = "text-programados";
      break;
    default:
      color = "text-default";
      break;
  }
  return color;
};

const buscar = () => {
  filterData.value = data.value.filter((e) => {
    return e.folio.includes(filtro.folio);
  });
};

const reiniciarFiltro = () => {
  filterData.value = data.value;
  filtro.folio = "";
};

onChildRemoved(child(refDB(db), "folios"));
</script>
